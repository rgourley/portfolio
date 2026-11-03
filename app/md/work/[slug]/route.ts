import { workMarkdown } from "@/lib/site";
import { withFooter } from "@/lib/agent-views";

export const dynamic = "force-static";

export function GET(_req: Request, { params }: { params: { slug: string } }) {
  const md = workMarkdown(params.slug);
  if (!md) return new Response("Not found", { status: 404 });
  return new Response(withFooter(md), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
