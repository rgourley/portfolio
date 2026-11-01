import { getAllBlogPosts, getAllWork } from "@/lib/content";
import { SITE_URL, SITE_SUMMARY } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const work = getAllWork()
    .map((w) => `- [${w.title}](${SITE_URL}/work/${w.slug}.md): ${w.description}`)
    .join("\n");
  const posts = getAllBlogPosts()
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}.md): ${p.description}`)
    .join("\n");

  const body = `# Robert Gourley

> ${SITE_SUMMARY}

Case studies and blog posts are also available as plain Markdown by adding .md to the URL. The full text of all of them is in ${SITE_URL}/llms-full.txt.

## About
- [Home](${SITE_URL}/): Overview, selected work and approach
- [About](${SITE_URL}/about): Background and how I work
- [Resume](${SITE_URL}/resume): Experience, skills and roles
- [Services](${SITE_URL}/services): Product design consulting
- [Leadership](${SITE_URL}/leadership): Fractional design leadership
- [Contact](${SITE_URL}/contact): How to reach me

## Case studies
${work}

## Projects
- [Quant Garage](${SITE_URL}/projects/quant-garage): Pro market research without a terminal
- [Financial UI Suite](${SITE_URL}/projects/financial-ui-suite): A Claude Code plugin for financial interfaces
- [Proxies](${SITE_URL}/projects/proxies): Simulated stakeholder reviews
- [Market Coaster](${SITE_URL}/coaster): Ride a real stock chart as a roller coaster
- [Market City](${SITE_URL}/city): The stock market as a living 3D city
- [Amphora](${SITE_URL}/amphora): A Mediterranean trading game

## Writing
${posts}

## Optional
- [RSS feed](${SITE_URL}/feed.xml)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
