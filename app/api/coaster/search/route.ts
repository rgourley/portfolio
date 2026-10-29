import { NextResponse } from "next/server";
import { CRYPTO_TICKER } from "@/lib/coaster";

// Market Coaster ticker search: matches symbols and company names through Massive, then ranks the matches.
// Massive returns matches in ticker order, so "appl" would list Applied Aerospace before Apple.
// The route ranks an exact symbol first, then symbol prefixes, then names that start with the query.
// Crypto comes from the crypto market. Only US-dollar pairs are kept, and "X:BTCUSD" ranks as "btc".
// Each query is cached at the edge for a day.

type TickerRef = { ticker: string; name?: string; type?: string; active?: boolean; market?: string };
type TickersResponse = { status?: string; results?: TickerRef[]; error?: string };
type Match = { ticker: string; name: string };

const MASSIVE = "https://api.massive.com";
const QUERY = /^[A-Za-z0-9 .&'-]{1,40}$/;
const RIDEABLE = new Set(["CS", "ETF", "ETN", "ETS", "ADRC", "PFD", "FUND"]);
const DAY = "public, s-maxage=86400, stale-while-revalidate=604800";

// Lower ranks first. Inside a tier, a closer match wins: "apple" beats "applied" for "appl",
// and common stock beats funds that track it.
function rank(q: string, m: TickerRef): number {
  const crypto = m.market === "crypto";
  const sym = crypto ? m.ticker.slice(2, -3).toLowerCase() : m.ticker.toLowerCase();
  const name = (m.name ?? "").toLowerCase();
  const fund = m.type === "CS" || crypto ? 0 : 0.3;
  if (sym === q) return 0;
  if (sym.split(".")[0] === q) return 0.5 + fund;
  if (sym.startsWith(q)) return 1 + (sym.length - q.length) * 0.05 + fund;
  const word = name.split(/[^a-z0-9]+/).find((w) => w.startsWith(q));
  if (!word) return 4;
  return (name.startsWith(q) ? 2 : 3) + (word.length - q.length) * 0.05 + fund + name.length * 0.001;
}

export async function GET(request: Request): Promise<NextResponse> {
  const q = (new URL(request.url).searchParams.get("q") ?? "").trim().toLowerCase();
  if (!QUERY.test(q)) return NextResponse.json({ results: [] }, { headers: { "Cache-Control": DAY } });

  const apiKey = process.env.MASSIVE_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Market data is not configured." }, { status: 503 });

  const lookup = async (market: string): Promise<TickersResponse & { ok: boolean; code: number }> => {
    const url = `${MASSIVE}/v3/reference/tickers?search=${encodeURIComponent(q)}&active=true&market=${market}&limit=50`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` }, cache: "no-store" });
    const body = (await res.json().catch(() => ({}))) as TickersResponse;
    return { ...body, ok: res.ok && body.status === "OK", code: res.status };
  };
  const [stocks, crypto] = await Promise.all([lookup("stocks"), lookup("crypto")]);
  if (!stocks.ok && !crypto.ok) {
    console.error(JSON.stringify({ event: "coaster_search_failed", q, stocks: stocks.code, crypto: crypto.code }));
    return NextResponse.json({ error: "Search is unavailable right now." }, { status: 502 });
  }

  const found: TickerRef[] = [
    ...(stocks.ok ? stocks.results ?? [] : []).filter((m) => RIDEABLE.has(m.type ?? "") && /^[A-Z][A-Z0-9.]{0,9}$/.test(m.ticker)),
    ...(crypto.ok ? crypto.results ?? [] : []).filter((m) => CRYPTO_TICKER.test(m.ticker)).map((m) => ({ ...m, market: "crypto" })),
  ];
  const results: Match[] = found
    .sort((a, b) => rank(q, a) - rank(q, b))
    .slice(0, 8)
    .map((m) => ({ ticker: m.ticker, name: (m.name ?? m.ticker).replace(/ - United States dollar$/i, "") }));
  return NextResponse.json({ results }, { headers: { "Cache-Control": DAY } });
}
