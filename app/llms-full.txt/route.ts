import { getAllBlogPosts, getAllWork } from "@/lib/content";
import { SITE_URL, SITE_SUMMARY, blogMarkdown, workMarkdown } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const sections = [
    `# Robert Gourley\n\n> ${SITE_SUMMARY}\n\nSite: ${SITE_URL}`,
    ...getAllWork().map((w) => workMarkdown(w.slug)),
    ...getAllBlogPosts().map((p) => blogMarkdown(p.slug)),
  ].filter(Boolean);

  return new Response(sections.join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
