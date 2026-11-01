import { getAllBlogPosts } from "@/lib/content";
import { SITE_URL, escapeXml } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const items = getAllBlogPosts()
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const date = new Date(post.updated || post.date);
      const pubDate = isNaN(date.getTime()) ? "" : `\n      <pubDate>${date.toUTCString()}</pubDate>`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>${pubDate}
      <description>${escapeXml(post.description || "")}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Robert Gourley</title>
    <link>${SITE_URL}/blog</link>
    <description>Design, product development and AI, by Robert Gourley.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
