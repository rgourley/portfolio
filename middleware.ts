import { NextResponse, type NextRequest } from "next/server";
import { markdownTwin } from "@/lib/md-routes";
import { SITE_URL } from "@/lib/site-url";

/** The media types in an Accept header, in order, without parameters. */
function accepted(accept: string | null): string[] {
  return (accept || "").split(",").map((t) => t.split(";")[0].trim().toLowerCase()).filter(Boolean);
}

/** True when the request asks for markdown ahead of HTML: text/markdown is listed and text/html is not listed before it. */
function wantsMarkdown(accept: string | null): boolean {
  const types = accepted(accept);
  const md = types.indexOf("text/markdown");
  const html = types.indexOf("text/html");
  return md >= 0 && (html < 0 || md < html);
}

/** True when the request names text/html itself, as every browser does and as a person on curl can to opt out. */
function asksForHtml(accept: string | null): boolean {
  return accepted(accept).includes("text/html");
}

// Command-line and library clients, and the fetchers the AI assistants and their crawlers identify themselves with.
// Ordinary search crawlers (Googlebot, Bingbot) are not here: they index the HTML.
const AGENT_UA = /^(curl|wget|httpie|python-requests|python-urllib|python-httpx|go-http-client|node-fetch|undici|node|axios|okhttp|java|libwww|lwp)\b|claudebot|claude-user|claude-searchbot|anthropic-ai|gptbot|oai-searchbot|chatgpt-user|openai|perplexitybot|perplexity-user|ccbot|google-extended|applebot-extended|cohere-ai|bytespider|meta-externalagent|amazonbot|mistralai|duckassistbot/i;

/** True when the caller is a program rather than a browser: no User-Agent, or one of the clients above. */
function isAgent(ua: string | null): boolean {
  return !ua || AGENT_UA.test(ua.trim());
}

/** Content negotiation for agents. A page with a markdown twin answers with the twin when the request asks for
    text/markdown, or comes from a program rather than a browser; an Accept header that names text/html always wins.
    Either way the response names the other form in a Link header, so a client that got one knows where the other is. */
export function middleware(req: NextRequest) {
  const twin = markdownTwin(req.nextUrl.pathname);
  if (!twin) return NextResponse.next();
  const accept = req.headers.get("accept");
  const serveMarkdown = !asksForHtml(accept) && (wantsMarkdown(accept) || isAgent(req.headers.get("user-agent")));
  if (serveMarkdown) {
    const url = req.nextUrl.clone();
    url.pathname = twin;
    const res = NextResponse.rewrite(url);
    res.headers.set("Vary", "Accept, User-Agent");
    res.headers.set("Link", `<${SITE_URL}${req.nextUrl.pathname}>; rel="alternate"; type="text/html"`);
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
