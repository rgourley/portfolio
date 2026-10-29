import { NextResponse } from "next/server";

// Market Coaster ticker search: matches symbols and company names through Massive, then ranks the matches.
// Massive returns matches in ticker order, so "appl" would list Applied Aerospace before Apple.
// The route ranks an exact symbol first, then symbol prefixes, then names that start with the query.
// Each query is cached at the edge for a day.

type TickerRef = { ticker: string; name?: string; type?: string; active?: boolean };
type TickersResponse = { status?: string; results?: TickerRef[]; error?: string };
type Match = { ticker: string; name: string };

const MASSIVE = "https://api.massive.com";
const QUERY = /^[A-Za-z0-9 .&'-]{1,40}$/;
const RIDEABLE = new Set(["CS", "ETF", "ETN", "ETS", "ADRC", "PFD", "FUND"]);
const DAY = "public, s-maxage=86400, stale-while-revalidate=604800";

// Lower ranks first. Inside a tier, a closer match wins: "apple" beats "applied" for "appl",
// and common stock beats funds that track it.
function rank(q: string, m: TickerRef): number {
  const sym = m.ticker.toLowerCase();
  const name = (m.name ?? "").toLowerCase();
  const fund = m.type === "CS" ? 0 : 0.3;
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

  const url = `${MASSIVE}/v3/reference/tickers?search=${encodeURIComponent(q)}&active=true&market=stocks&limit=50`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` }, cache: "no-store" });
  const body = (await res.json().catch(() => ({}))) as TickersResponse;
  if (!res.ok || body.status !== "OK") {
    console.error(JSON.stringify({ event: "coaster_search_failed", q, status: res.status, body: JSON.stringify(body).slice(0, 200) }));
    return NextResponse.json({ error: "Search is unavailable right now." }, { status: 502 });
  }

  const results: Match[] = (body.results ?? [])
    .filter((m) => RIDEABLE.has(m.type ?? "") && /^[A-Z][A-Z0-9.]{0,9}$/.test(m.ticker))
    .sort((a, b) => rank(q, a) - rank(q, b))
    .slice(0, 8)
    .map((m) => ({ ticker: m.ticker, name: m.name ?? m.ticker }));
  return NextResponse.json({ results }, { headers: { "Cache-Control": DAY } });
}
