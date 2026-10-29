import { NextResponse } from "next/server";
import { CRYPTO_TICKER, dayEnd, dayStart, isDayFinished, isFinished, priceScale, sessionOpen } from "@/lib/coaster";

// Market Coaster bars for one ticker and one finished day, from Massive.
// A stock ride is the regular session in 1-minute bars. A crypto ride (X:BTCUSD) is one ET calendar day, also in 1-minute bars.
// A finished day never changes, so the edge caches a good response for a year.
// The encoding matches the page: prices are integers in units of 1/scale dollars, and each bar is
// [minute after t0, open - previous close, high - max(open, close), min(open, close) - low, close - open, volume].

type Agg = { t: number; o: number; h: number; l: number; c: number; v: number };
type AggsResponse = { status?: string; results?: Agg[]; error?: string; message?: string };
type Bar = [number, number, number, number, number, number];
type Ride = { ticker: string; date: string; t0: number; p0: number; scale: number; b: Bar[] };
type Window = { t0: number; end: number; span: string; minutes: number; minBars: number };

const MASSIVE = "https://api.massive.com";
const STOCK_TICKER = /^[A-Z][A-Z0-9.]{0,9}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const YEAR = "public, s-maxage=31536000, immutable";
const DAY = "public, s-maxage=86400";

function fail(error: string, status: number, cache: string | null): NextResponse {
  return NextResponse.json({ error }, { status, headers: cache ? { "Cache-Control": cache } : {} });
}

// The time window and bar size for each kind of ride.
function windowFor(crypto: boolean, date: string): Window {
  if (crypto) {
    const t0 = dayStart(date), end = dayEnd(date);
    return { t0, end, span: "1/minute", minutes: (end - t0) / 60, minBars: 200 };
  }
  const t0 = sessionOpen(date);
  return { t0, end: t0 + 390 * 60, span: "1/minute", minutes: 390, minBars: 30 };
}

async function fetchAggs(ticker: string, date: string, w: Window, apiKey: string): Promise<Agg[]> {
  // a crypto day starts at midnight ET, so its range is in epoch milliseconds, not dates
  const range = w.minutes > 390 ? `${w.t0 * 1000}/${w.end * 1000 - 1}` : `${date}/${date}`;
  const url = `${MASSIVE}/v2/aggs/ticker/${encodeURIComponent(ticker)}/range/${w.span}/${range}?adjusted=true&sort=asc&limit=50000`;
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

function encode(ticker: string, date: string, w: Window, aggs: Agg[]): Ride | null {
  const inside = aggs.filter((a) => {
    const m = (a.t / 1000 - w.t0) / 60;
    return m >= 0 && m < w.minutes;
  });
  if (inside.length < w.minBars) return null;
  const scale = priceScale(inside[0].o);
  const bars = inside.map((a): Bar => [
    Math.floor((a.t / 1000 - w.t0) / 60),
    Math.round(a.o * scale),
    Math.round(a.h * scale),
    Math.round(a.l * scale),
    Math.round(a.c * scale),
    Math.round(a.v),
  ]);
  const p0 = bars[0][1];
  let prev = p0;
  const b = bars.map(([m, o, h, l, c, v]): Bar => {
    const row: Bar = [m, o - prev, h - Math.max(o, c), Math.min(o, c) - l, c - o, v];
    prev = c;
    return row;
  });
  return { ticker, date, t0: w.t0, p0, scale, b };
}

export async function GET(request: Request): Promise<NextResponse> {
  const params = new URL(request.url).searchParams;
  const ticker = (params.get("ticker") ?? "").toUpperCase();
  const date = params.get("date") ?? "";
  const crypto = CRYPTO_TICKER.test(ticker);
  if (!crypto && !STOCK_TICKER.test(ticker)) return fail("Use a ticker like AAPL, BRK.B or X:BTCUSD.", 400, DAY);
  if (!DATE.test(date)) return fail("Use a date like 2026-10-26.", 400, DAY);

  // only finished days: the close (or midnight ET for crypto) plus 20 minutes must be in the past
  const now = Date.now() / 1000;
  if (crypto ? !isDayFinished(date, now) : !isFinished(date, now)) return fail(`The ${date} ${crypto ? "day" : "session"} is not finished yet.`, 400, null);

  const apiKey = process.env.MASSIVE_API_KEY;
  if (!apiKey) return fail("Market data is not configured.", 503, null);

  try {
    const w = windowFor(crypto, date);
    const ride = encode(ticker, date, w, await fetchAggs(ticker, date, w, apiKey));
    if (!ride) return fail(`No ${crypto ? "" : "regular-session "}trading for ${ticker} on ${date}.`, 404, DAY);
    return NextResponse.json(ride, { headers: { "Cache-Control": YEAR } });
  } catch (err) {
    console.error(JSON.stringify({ event: "coaster_bars_failed", ticker, date, error: String(err) }));
    return fail("Market data is unavailable right now. Try again in a minute.", 502, null);
  }
}
