import { getAllBlogPosts, getAllWork } from "@/lib/content";
import { SITE_URL, SITE_SUMMARY, blogMarkdown, workMarkdown } from "@/lib/site";
import { agentMarkdown } from "@/lib/agent-views";
import type { MdRoute } from "@/lib/md-routes";

export const dynamic = "force-static";

// The pages worth reading in full. The work and blog indexes are left out: their items follow in full.
const PAGES: MdRoute[] = [
  "/about",
  "/resume",
  "/contact",
  "/leadership",
  "/services",
  "/newsletter",
  "/projects",
  "/projects/proxies",
  "/projects/quant-garage",
  "/projects/financial-ui-suite",
  "/coaster/about",
  "/tools/font-sizes",
];

export function GET() {
  const sections = [
    `# Robert Gourley\n\n> ${SITE_SUMMARY}\n\nSite: ${SITE_URL}`,
    ...PAGES.map((r) => agentMarkdown(r).trim()),
    ...getAllWork().map((w) => workMarkdown(w.slug)),
    ...getAllBlogPosts().map((p) => blogMarkdown(p.slug)),
  ].filter(Boolean);

  return new Response(sections.join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
