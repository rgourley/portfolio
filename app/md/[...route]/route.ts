import { agentMarkdown } from "@/lib/agent-views";
import { MD_ROUTES, isMdRoute } from "@/lib/md-routes";

export const dynamic = "force-static";

export function generateStaticParams() {
  return MD_ROUTES.filter((r) => r !== "/").map((r) => ({ route: r.slice(1).split("/") }));
}

/** A page's agent text as markdown: /md/about, /md/projects/proxies and so on. The home is /md; posts and case studies have their own routes beside this one. */
export function GET(_req: Request, { params }: { params: { route: string[] } }) {
  const route = "/" + params.route.join("/");
  if (!isMdRoute(route)) return new Response("Not found", { status: 404 });
  return new Response(agentMarkdown(route), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
