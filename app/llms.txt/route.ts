import { getAllBlogPosts, getAllWork } from "@/lib/content";
import { SITE_URL, SITE_SUMMARY } from "@/lib/site";
import { CASES } from "@/lib/cases";
import { profileBlock } from "@/lib/profile";

export const dynamic = "force-static";

export function GET() {
  // each case study's own dek, as its page says it; the content file's description is the fallback
  const work = getAllWork()
    .map((w) => `- [${CASES[w.slug]?.title || w.title}](${SITE_URL}/work/${w.slug}.md): ${CASES[w.slug]?.dek || w.description}`)
    .join("\n");
  const posts = getAllBlogPosts()
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}.md): ${p.description}`)
    .join("\n");

  const body = `# Robert Gourley

> ${SITE_SUMMARY}

Every page below is also plain Markdown: add .md to its URL, or request the page with \`Accept: text/markdown\`. HTML responses carry a \`Link: <...>; rel="alternate"; type="text/markdown"\` header naming the twin. The full text of every page, post and case study is in ${SITE_URL}/llms-full.txt.

${profileBlock()}

## About
- [Home](${SITE_URL}/md): The profile, the links and every endpoint
- [About](${SITE_URL}/about.md): Background and how I work
- [Resume](${SITE_URL}/resume.md): Experience, skills and roles
- [Services](${SITE_URL}/services.md): Product design consulting
- [Leadership](${SITE_URL}/leadership.md): Fractional design leadership
- [Newsletter](${SITE_URL}/newsletter.md): The Autonomy Report, a weekly briefing on agentic AI
- [Contact](${SITE_URL}/contact.md): How to reach me

## Case studies
- [All work](${SITE_URL}/work.md): The index, with a JSON twin at ${SITE_URL}/api/work
${work}

## Projects
- [All projects](${SITE_URL}/projects.md): The index, with a JSON twin at ${SITE_URL}/api/projects
- [Quant Garage](${SITE_URL}/projects/quant-garage.md): Pro market research without a terminal
- [Financial UI Suite](${SITE_URL}/projects/financial-ui-suite.md): A Claude Code plugin for financial interfaces
- [Proxies](${SITE_URL}/projects/proxies.md): Simulated stakeholder reviews
- [Market Coaster](${SITE_URL}/coaster/about.md): Ride a real stock chart as a roller coaster (the ride is at ${SITE_URL}/coaster)
- [Font size checker](${SITE_URL}/tools/font-sizes.md): Every font size, weight and line height on any page, one click
- [Market City](${SITE_URL}/city): The stock market as a living 3D city
- [Amphora](${SITE_URL}/amphora): A Mediterranean trading game

## Writing
- [All posts](${SITE_URL}/blog.md): The index, with a JSON twin at ${SITE_URL}/api/blog
${posts}

## Optional
- [Manifest](${SITE_URL}/.well-known/mcp.json): Every resource with its HTML, Markdown and JSON URL
- [RSS feed](${SITE_URL}/feed.xml)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
