import { NextResponse } from "next/server";

// Market Coaster bars: regular-session 1-minute bars for one ticker and one finished session, from Massive.
// A finished session never changes, so the edge caches a good response for a year.
// The encoding matches the page: prices are integer cents, and each bar is
// [minute after 9:30 ET, open - previous close, high - max(open, close), min(open, close) - low, close - open, volume].

type Agg = { t: number; o: number; h: number; l: number; c: number; v: number };
type AggsResponse = { status?: string; results?: Agg[]; error?: string; message?: string };
type Bar = [number, number, number, number, number, number];
type Ride = { ticker: string; date: string; t0: number; p0: number; b: Bar[] };

const MASSIVE = "https://api.massive.com";
const TICKER = /^[A-Z][A-Z0-9.]{0,9}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const YEAR = "public, s-maxage=31536000, immutable";
const DAY = "public, s-maxage=86400";

function fail(error: string, status: number, cache: string | null): NextResponse {
  return NextResponse.json({ error }, { status, headers: cache ? { "Cache-Control": cache } : {} });
}

// The epoch second of 9:30 ET on the date, for both standard and daylight time.
function sessionOpen(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  const hour = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", hour: "numeric", hourCycle: "h23" });
  for (const utcHour of [13, 14]) {
    const t = Date.UTC(y, m - 1, d, utcHour, 30);
    if (Number(hour.format(new Date(t))) === 9) return t / 1000;
  }
  throw new Error(`no 9:30 ET found for date=${date}`);
}

async function fetchAggs(ticker: string, date: string, apiKey: string): Promise<Agg[]> {
  const url = `${MASSIVE}/v2/aggs/ticker/${encodeURIComponent(ticker)}/range/1/minute/${date}/${date}?adjusted=true&sort=asc&limit=50000`;
  let last = "";
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` }, cache: "no-store" });
    const body = (await res.json().catch(() => ({}))) as AggsResponse;
    if (res.ok && (body.status === "OK" || body.status === "DELAYED")) return body.results ?? [];
    last = `status=${res.status} body=${JSON.stringify(body).slice(0, 200)}`;
    console.warn(JSON.stringify({ event: "massive_retry", ticker, date, attempt, detail: last }));
    if (res.status < 500 && res.status !== 429) break;
    await new Promise((r) => setTimeout(r, 400 * attempt));
  }
  throw new Error(`Massive aggregates failed for ticker=${ticker} date=${date}: ${last}`);
}

function encode(ticker: string, date: string, aggs: Agg[]): Ride | null {
  const t0 = sessionOpen(date);
  const bars = aggs
    .map((a): [number, number, number, number, number, number] => [
      Math.floor((a.t / 1000 - t0) / 60),
      Math.round(a.o * 100),
      Math.round(a.h * 100),
      Math.round(a.l * 100),
      Math.round(a.c * 100),
      Math.round(a.v),
    ])
    .filter(([m]) => m >= 0 && m < 390);
  if (bars.length < 30) return null;
  const p0 = bars[0][1];
  let prev = p0;
  const b = bars.map(([m, o, h, l, c, v]): Bar => {
    const row: Bar = [m, o - prev, h - Math.max(o, c), Math.min(o, c) - l, c - o, v];
    prev = c;
    return row;
  });
  return { ticker, date, t0, p0, b };
}

export async function GET(request: Request): Promise<NextResponse> {
  const params = new URL(request.url).searchParams;
  const ticker = (params.get("ticker") ?? "").toUpperCase();
  const date = params.get("date") ?? "";
  if (!TICKER.test(ticker)) return fail("Use a ticker like AAPL or BRK.B.", 400, DAY);
  if (!DATE.test(date)) return fail("Use a date like 2026-10-26.", 400, DAY);

  // only finished sessions: the close plus 20 minutes must be in the past
  const open = sessionOpen(date);
  if (open + 390 * 60 + 20 * 60 > Date.now() / 1000) return fail(`The ${date} session is not finished yet.`, 400, null);

  const apiKey = process.env.MASSIVE_API_KEY;
  if (!apiKey) return fail("Market data is not configured.", 503, null);

  try {
    const ride = encode(ticker, date, await fetchAggs(ticker, date, apiKey));
    if (!ride) return fail(`No regular-session trading for ${ticker} on ${date}.`, 404, DAY);
    return NextResponse.json(ride, { headers: { "Cache-Control": YEAR } });
  } catch (err) {
    console.error(JSON.stringify({ event: "coaster_bars_failed", ticker, date, error: String(err) }));
    return fail("Market data is unavailable right now. Try again in a minute.", 502, null);
  }
}
