import { getAllBlogPosts } from "@/lib/content";
import { rssFeed } from "@/lib/rss";
import { OPEN_MODELS, inOpenModels } from "@/lib/sections";

export const dynamic = "force-static";

/** The Open models section on its own, for readers who want the model posts without the rest of the writing. */
export function GET() {
  return rssFeed({
    title: "Open models, by Robert Gourley",
    link: OPEN_MODELS.path,
    description: "Open models you can run yourself: image generation, diffusion models, local LLMs and the tools around them.",
    self: `${OPEN_MODELS.path}/feed.xml`,
    posts: getAllBlogPosts().filter(inOpenModels),
  });
}
