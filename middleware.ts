import { NextResponse, type NextRequest } from "next/server";
import { markdownTwin } from "@/lib/md-routes";
import { SITE_URL } from "@/lib/site-url";

/** True when the request asks for markdown ahead of HTML: text/markdown is listed and text/html is not listed before it. */
function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  const types = accept.split(",").map((t) => t.split(";")[0].trim().toLowerCase());
  const md = types.indexOf("text/markdown");
  const html = types.indexOf("text/html");
  return md >= 0 && (html < 0 || md < html);
}

/** Content negotiation for agents. A page with a markdown twin answers `Accept: text/markdown` with the twin,
    and otherwise names it in a Link header so an agent that got HTML knows where the plain text is. */
export function middleware(req: NextRequest) {
  const twin = markdownTwin(req.nextUrl.pathname);
  if (!twin) return NextResponse.next();
  if (wantsMarkdown(req.headers.get("accept"))) {
    const url = req.nextUrl.clone();
    url.pathname = twin;
    const res = NextResponse.rewrite(url);
    res.headers.set("Vary", "Accept");
    return res;
  }
  const res = NextResponse.next();
  res.headers.set("Link", `<${SITE_URL}${twin}>; rel="alternate"; type="text/markdown"`);
  return res;
}

// Every page path; the code above answers at once when the path has no twin. Assets, API, the /md routes and any path
// with a file extension (so /about.md reaches the rewrite untouched) never enter.
export const config = {
  matcher: ["/((?!_next/|api/|md/|.*\\..*).*)"],
};
