import { NextResponse } from "next/server";

// Market Coaster ride links: /coaster/r/orcl-oct-28-2026, /coaster/r/crypto-btcusd-oct-27-2026 or /coaster/r/flash-crash.
// Link previews (Slack, iMessage, X) never see the part after "#", so each ride gets a real path.
// The route serves the game page with that ride's title and description, and the page opens the ride from the hash.
// The numbers in the description come from the same bars the ride uses. When they do not load, the description has no numbers.

type FamousRide = { name: string; label: string; range: string; blurb: string };
type Bars = { p0: number; b: Array<[number, number, number, number, number, number]> };
type Meta = { title: string; ogTitle: string; description: string };

const SITE = "https://www.robertcreative.com";
const MASSIVE = "https://api.massive.com";
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const SESSION = /^(crypto-)?([a-z0-9.]{1,15})-([a-z]{3})-(\d{1,2})-(\d{4})$/;
const SLUG = /^[a-z0-9.-]{1,60}$/;
const DAY = "public, s-maxage=86400, stale-while-revalidate=604800";

const esc = (s: string): string => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pct = (x: number): string => `${Math.abs(x * 100).toFixed(1)}%`;
const slugOf = (s: string): string => s.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-|-$/g, "");

function jsonScript<T>(html: string, id: string): T | null {
  const m = new RegExp(`<script type="application/json" id="${id}">([\\s\\S]*?)</script>`).exec(html);
  return m ? (JSON.parse(m[1]) as T) : null;
}

async function companyName(ticker: string): Promise<string | null> {
  const apiKey = process.env.MASSIVE_API_KEY;
  if (!apiKey) return null;
  const res = await fetch(`${MASSIVE}/v3/reference/tickers/${encodeURIComponent(ticker)}`, { headers: { Authorization: `Bearer ${apiKey}` }, cache: "no-store" });
  if (!res.ok) return null;
  const body = (await res.json().catch(() => ({}))) as { results?: { name?: string } };
  // "Akari Therapeutics plc ADR (0.01 USD)" carries a share-class detail that does not belong in a share title
  return body.results?.name?.replace(/ - United States dollar$/i, "").replace(/\s*\([^)]*\)$/, "") ?? null;
}

// A crypto ride (X:BTCUSD) is one ET calendar day. A stock ride is the regular session.
async function sessionMeta(origin: string, ticker: string, date: string, label: string): Promise<Meta> {
  const crypto = ticker.startsWith("X:");
  const shown = crypto ? `${ticker.slice(2, -3)}/USD` : ticker;
  const span = crypto ? "from midnight to midnight ET" : "from the open to the close";
  const day = new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  const [barsRes, name] = await Promise.all([
    fetch(`${origin}/api/coaster/bars?ticker=${encodeURIComponent(ticker)}&date=${date}`),
    companyName(ticker),
  ]);
  const who = name ? `${name} (${shown})` : shown;
  const subject = name ?? label;
  const plain: Meta = {
    title: `${shown} on ${day} | Market Coaster`,
    ogTitle: `Ride ${who} on ${day}`,
    description: `Ride ${subject}'s real ${day} ${crypto ? "day" : "session"} as a roller coaster, built from 1-minute market data from Massive.`,
  };
  if (!barsRes.ok) return plain;
  const bars = (await barsRes.json()) as Bars;
  if (!bars.b?.length) return plain;
  let prev = bars.p0, hi = -Infinity, lo = Infinity;
  for (const [, dO, dH, dL, dC] of bars.b) {
    const o = prev + dO, c = o + dC;
    hi = Math.max(hi, Math.max(o, c) + dH);
    lo = Math.min(lo, Math.min(o, c) - dL);
    prev = c;
  }
  const move = prev / bars.p0 - 1, swing = hi / lo - 1;
  const dir = move >= 0 ? "up" : "down";
  return {
    title: `${shown} on ${day}: ${dir} ${pct(move)} | Market Coaster`,
    ogTitle: `Ride ${who} on ${day}: ${dir} ${pct(move)}`,
    description: `${subject} went ${dir} ${pct(move)} ${span}, with a ${pct(swing)} swing from high to low. Ride the real 1-minute chart as a roller coaster.`,
  };
}

function withMeta(html: string, meta: Meta, url: string, token: string): string {
  const t = esc(meta.title), og = esc(meta.ogTitle), d = esc(meta.description);
  return html
    .replace("<head>", `<head>\n<script>if (location.hash !== "#${token}") history.replaceState(null, "", "/coaster/r/${token}#${token}");</script>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${d}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${og}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${d}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${og}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${d}">`);
}

export async function GET(request: Request, { params }: { params: { slug: string } }): Promise<NextResponse> {
  const origin = new URL(request.url).origin;
  const token = decodeURIComponent(params.slug).toLowerCase();
  if (!SLUG.test(token)) return NextResponse.redirect(new URL("/coaster", request.url), 307);

  const pageRes = await fetch(`${origin}/coaster/index.html`);
  if (!pageRes.ok) {
    console.error(JSON.stringify({ event: "coaster_ride_page_failed", status: pageRes.status }));
    return NextResponse.redirect(new URL(`/coaster#${token}`, request.url), 307);
  }
  const html = await pageRes.text();
  const url = `${SITE}/coaster/r/${token}`;

  const famous = (Object.values(jsonScript<Record<string, FamousRide>>(html, "ride-data") ?? {})).find((r) => slugOf(r.name) === token);
  let meta: Meta | null = null;
  if (famous) {
    // "May 6, 2010, 1-minute bars" reads better in a title as "May 6, 2010"
    const when = famous.range.replace(/, [\w-]+ bars$/, "");
    meta = {
      title: `${famous.name}: ${famous.label}, ${when} | Market Coaster`,
      ogTitle: `Ride the ${famous.name}: ${famous.label}, ${when}`,
      description: `${famous.blurb} Ride it as a roller coaster built from real market data.`,
    };
  } else {
    const m = SESSION.exec(token);
    if (m && MONTHS.includes(m[3])) {
      const ticker = (m[1] ? "X:" : "") + m[2].toUpperCase();
      const date = `${m[5]}-${String(MONTHS.indexOf(m[3]) + 1).padStart(2, "0")}-${m[4].padStart(2, "0")}`;
      const names = jsonScript<{ tickers: Record<string, { name: string }> }>(html, "intraday-data");
      meta = await sessionMeta(origin, ticker, date, names?.tickers[ticker]?.name ?? ticker);
    }
  }
  if (!meta) return NextResponse.redirect(new URL("/coaster", request.url), 307);

  return new NextResponse(withMeta(html, meta, url, token), {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": DAY },
  });
}
