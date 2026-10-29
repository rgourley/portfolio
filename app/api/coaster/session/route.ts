import { NextResponse } from "next/server";
import { recentWeekdays, sessionOpen } from "@/lib/coaster";

// Market Coaster latest session: the newest finished regular session and the day's prices for the page's ticker list.
// One Massive grouped-daily call covers every US stock, so a new session costs one request.
// The edge caches the answer for 5 minutes, so the page moves to a new session soon after each close.

type DailyBar = { T: string; o: number; h: number; l: number; c: number };
type GroupedResponse = { status?: string; resultsCount?: number; results?: DailyBar[] };
type Quote = { mv: number; range: number };
type Session = { date: string; t0: number; quotes: Record<string, Quote> };

const MASSIVE = "https://api.massive.com";
const SYMBOL = /^[A-Z][A-Z0-9.]{0,9}$/;
const MAX_SYMBOLS = 80;
// A full trading day has thousands of tickers. Fewer than this means a holiday or a partial file.
const MIN_TICKERS = 1000;
const FRESH = "public, s-maxage=300, stale-while-revalidate=3600";

async function grouped(date: string, apiKey: string): Promise<DailyBar[]> {
  const url = `${MASSIVE}/v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` }, cache: "no-store" });
  const body = (await res.json().catch(() => ({}))) as GroupedResponse;
  if (!res.ok || !["OK", "DELAYED"].includes(body.status ?? "")) {
    throw new Error(`Massive grouped daily failed for date=${date}: status=${res.status} body=${JSON.stringify(body).slice(0, 200)}`);
  }
  return body.results ?? [];
}

export async function GET(request: Request): Promise<NextResponse> {
  const symbols = (new URL(request.url).searchParams.get("symbols") ?? "")
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter((s) => SYMBOL.test(s))
    .slice(0, MAX_SYMBOLS);
  if (!symbols.length) return NextResponse.json({ error: "Pass symbols, like symbols=SPY,AAPL." }, { status: 400 });

  const apiKey = process.env.MASSIVE_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Market data is not configured." }, { status: 503 });

  try {
    for (const date of recentWeekdays(Date.now() / 1000, 6)) {
      const bars = await grouped(date, apiKey);
      if (bars.length < MIN_TICKERS) continue;
      const wanted = new Set(symbols);
      const quotes: Record<string, Quote> = {};
      for (const b of bars) {
        if (!wanted.has(b.T) || !(b.o > 0) || !(b.l > 0)) continue;
        quotes[b.T] = { mv: b.c / b.o - 1, range: b.h / b.l - 1 };
      }
      const session: Session = { date, t0: sessionOpen(date), quotes };
      return NextResponse.json(session, { headers: { "Cache-Control": FRESH } });
    }
    return NextResponse.json({ error: "No finished session in the last week." }, { status: 404 });
  } catch (err) {
    console.error(JSON.stringify({ event: "coaster_session_failed", error: String(err) }));
    return NextResponse.json({ error: "Market data is unavailable right now." }, { status: 502 });
  }
}
