import { blogAgentMarkdown, openModelsAgentMarkdown } from "@/lib/agent-views";
import { OPEN_MODELS } from "@/lib/sections";

export const dynamic = "force-static";

/** A post as markdown, with the agent footer: the same string the post's valve view shows. */
export function GET(_req: Request, { params }: { params: { slug: string } }) {
  // The Open models hub lives at /blog/open-models beside the posts, so its markdown twin comes through here too
  const md = params.slug === OPEN_MODELS.slug ? openModelsAgentMarkdown() : blogAgentMarkdown(params.slug);
  if (!md) return new Response("Not found", { status: 404 });
  return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
