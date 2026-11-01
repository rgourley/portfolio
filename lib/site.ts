import { getAllBlogPosts, getAllWork } from "@/lib/content";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.robertcreative.com";

export const SITE_SUMMARY =
  "Robert Gourley is Director of Product Design at Shield AI, with 20+ years designing complex technical products: AI/ML interfaces, autonomous systems and fintech. Previously at Kraken, Crunchyroll, Federato and Axure.";

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

export function workMarkdown(slug: string): string | null {
  const item = getAllWork().find((w) => w.slug === slug);
  if (!item) return null;
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
