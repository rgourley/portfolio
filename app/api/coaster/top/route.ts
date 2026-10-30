import { NextResponse } from "next/server";
import { topRides } from "@/lib/coaster-counts";

// Market Coaster top rides: the most ridden and the most shared rides of the last 7 days.
// The edge caches the answer for 5 minutes, so the start screen costs one Redis read per 5 minutes per region.

export const dynamic = "force-dynamic";
const FRESH = "public, s-maxage=300, stale-while-revalidate=3600";

export async function GET(): Promise<NextResponse> {
  try {
    return NextResponse.json(await topRides(Date.now()), { headers: { "Cache-Control": FRESH } });
  } catch (err) {
    console.error(JSON.stringify({ event: "coaster_top_failed", error: String(err) }));
    return NextResponse.json({ error: "Ride counts are unavailable right now." }, { status: 502 });
  }
}
