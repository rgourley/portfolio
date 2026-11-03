import { getAllBlogPosts, getAllWork } from "@/lib/content";
import { CASES, caseMarkdown } from "@/lib/cases";

export { SITE_URL } from "@/lib/site-url";
import { SITE_URL } from "@/lib/site-url";

import { POSITIONING } from "@/lib/profile";

/** The one-line summary agents see first, in llms.txt, llms-full.txt and the home /md document. */
export const SITE_SUMMARY = POSITIONING;

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function compact(lines: string[]): string {
  return lines
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n");
}

export function blogMarkdown(slug: string): string | null {
  const post = getAllBlogPosts().find((p) => p.slug === slug);
  if (!post) return null;
  return compact([
    `# ${post.title}`,
    "",
    "Author: Robert Gourley",
    `Published: ${post.date}`,
    post.updated ? `Updated: ${post.updated}` : "",
    `URL: ${SITE_URL}/blog/${post.slug}`,
    "",
    post.description ? `> ${post.description}` : "",
    "",
    post.content.trim(),
    "",
  ]);
}

/** A case study as markdown. Six of the seven are the Bloom copy (lib/cases.ts), the same text the page shows for agents;
    Hivemind is its own content file. The /md/work route, the agent view and llms-full.txt all read this. */
export function workMarkdown(slug: string): string | null {
  const item = getAllWork().find((w) => w.slug === slug);
  if (!item) return null;
  const c = CASES[slug];
  if (c && slug !== "hivemind") {
    return compact([
      `# ${c.title}`,
      "",
      `URL: ${SITE_URL}/work/${slug}`,
      "",
      caseMarkdown(c).replace(/^# [^\n]*\n/, "").trim(),
      "",
    ]);
  }
  return compact([
    `# ${item.title}`,
    "",
    item.client ? `Client: ${item.client}` : "",
    item.year ? `Year: ${item.year}` : "",
    item.role ? `Role: ${item.role}` : "",
    `URL: ${SITE_URL}/work/${item.slug}`,
    "",
    item.description ? `> ${item.description}` : "",
    "",
    item.content.trim(),
    "",
  ]);
}
