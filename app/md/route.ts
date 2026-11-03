import { agentMarkdown } from "@/lib/agent-views";

export const dynamic = "force-static";

/** The home page as markdown: the profile, the links and every endpoint. The same text the home shows for agents. */
export function GET() {
  return new Response(agentMarkdown("/"), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
