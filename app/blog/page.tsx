import { getAllBlogPosts } from "@/lib/content";
import BlogGrid from "@/components/BlogGrid";

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-12 lg:px-16">
        <div className="mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-light mb-4">Blog</h1>
          <p className="text-xl text-foreground/60 max-w-2xl">
            Thoughts on design, product development, and the creative process.
          </p>
        </div>
        <BlogGrid posts={posts} />
      </div>
    </div>
  );
}

