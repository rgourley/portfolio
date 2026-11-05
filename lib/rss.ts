import type { BlogPost } from "@/lib/content";
import { SITE_URL, escapeXml } from "@/lib/site";

/** An RSS 2.0 feed of posts: the site feed (/feed.xml) and the section feeds (/blog/open-models/feed.xml) share it. */
export function rssFeed({ title, link, description, self, posts }: { title: string; link: string; description: string; self: string; posts: BlogPost[] }): Response {
  const items = posts
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
    <title>${escapeXml(title)}</title>
    <link>${SITE_URL}${link}</link>
    <description>${escapeXml(description)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}${self}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
