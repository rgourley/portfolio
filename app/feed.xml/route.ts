import { getAllBlogPosts } from "@/lib/content";
import { rssFeed } from "@/lib/rss";

export const dynamic = "force-static";

export function GET() {
  return rssFeed({
    title: "Robert Gourley",
    link: "/blog",
    description: "Design, product development and AI, by Robert Gourley.",
    self: "/feed.xml",
    posts: getAllBlogPosts(),
  });
}
