import { NextResponse } from "next/server";
import { countRide } from "@/lib/coaster-counts";

// Market Coaster ride count: the page posts here when a ride starts.
// The body is {"ride": "<share token>", "shared": true} for a ride opened from a shared link.
// Share tokens look like "flash-crash", "orcl-oct-28-2026" or "crypto-btcusd-oct-27-2026".

const RIDE = /^[a-z0-9][a-z0-9.-]{0,59}$/;

type CountBody = { ride?: unknown; shared?: unknown };

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json().catch(() => ({}))) as CountBody;
  const ride = typeof body.ride === "string" ? body.ride : "";
  if (!RIDE.test(ride)) return NextResponse.json({ error: `Unknown ride token: ${JSON.stringify(body.ride)}` }, { status: 400 });
  const shared = body.shared === true;
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  try {
    const counted = await countRide(ride, shared, address, Date.now());
    return NextResponse.json({ counted });
  } catch (err) {
    console.error(JSON.stringify({ event: "coaster_count_failed", ride, shared, error: String(err) }));
    return NextResponse.json({ error: "Ride counts are unavailable right now." }, { status: 502 });
  }
}
