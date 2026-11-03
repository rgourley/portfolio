import { blogAgentMarkdown } from "@/lib/agent-views";

export const dynamic = "force-static";

/** A post as markdown, with the agent footer: the same string the post's valve view shows. */
export function GET(_req: Request, { params }: { params: { slug: string } }) {
  const md = blogAgentMarkdown(params.slug);
  if (!md) return new Response("Not found", { status: 404 });
  return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
