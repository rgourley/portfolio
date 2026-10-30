import { NextResponse } from "next/server";
import { countRide, isSessionToken } from "@/lib/coaster-counts";

// Market Coaster ride count: the page posts here when a ride starts.
// The body is {"ride": "<share token>", "shared": true} for a ride opened from a shared link.
// A token counts only when it names a famous ride on the page or a finished session, so made-up rides never reach the lists.

type CountBody = { ride?: unknown; shared?: unknown };
type FamousRide = { name: string };

const slugOf = (s: string): string => s.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-|-$/g, "");

// The famous ride names live in the page's ride-data script. Each function instance reads the page once.
let famousSlugs: Promise<Set<string>> | null = null;
async function loadFamousSlugs(origin: string): Promise<Set<string>> {
  const res = await fetch(`${origin}/coaster/index.html`);
  if (!res.ok) throw new Error(`coaster page fetch failed: status=${res.status}`);
  const m = /<script type="application\/json" id="ride-data">([\s\S]*?)<\/script>/.exec(await res.text());
  if (!m) throw new Error("coaster page has no ride-data script");
  return new Set(Object.values(JSON.parse(m[1]) as Record<string, FamousRide>).map((r) => slugOf(r.name)));
}
function famous(origin: string): Promise<Set<string>> {
  famousSlugs ??= loadFamousSlugs(origin).catch((err: unknown) => {
    famousSlugs = null;
    throw err;
  });
  return famousSlugs;
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json().catch(() => ({}))) as CountBody;
  const ride = typeof body.ride === "string" ? body.ride : "";
  const shared = body.shared === true;
  const now = Date.now();
  try {
    if (!isSessionToken(ride, now) && !(await famous(new URL(request.url).origin)).has(ride)) {
      return NextResponse.json({ error: `Unknown ride token: ${JSON.stringify(body.ride).slice(0, 80)}` }, { status: 400 });
    }
    const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    return NextResponse.json({ counted: await countRide(ride, shared, address, now) });
  } catch (err) {
    console.error(JSON.stringify({ event: "coaster_count_failed", ride, shared, error: String(err) }));
    return NextResponse.json({ error: "Ride counts are unavailable right now." }, { status: 502 });
  }
}
