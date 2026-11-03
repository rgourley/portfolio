import { NextResponse } from "next/server";
import { PROJ } from "@/lib/projects";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";

/** The projects index as JSON: the same list the /projects page and its agent view show. */
export function GET() {
  return NextResponse.json(
    PROJ.map((p) => ({ name: p.name, tag: p.tag, blurb: p.blurb, meta: p.meta, url: p.internal ? SITE_URL + p.url : p.url, image: SITE_URL + p.img })),
  );
}
