import { getAllBlogPosts } from "@/lib/content";
import BlogGrid from "@/components/BlogGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Design, Product Development & Creative Process",
  description: "Thoughts on design, product development, and the creative process. Insights on AI tools, design team building, design systems, and trends that matter.",
  keywords: ["design blog", "product design", "UX design", "design thinking", "design leadership", "AI design tools", "design systems"],
  openGraph: {
    title: "Blog | Design, Product Development & Creative Process",
    description: "Thoughts on design, product development, and the creative process.",
    url: "/blog",
    images: [
      {
        url: "/images/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Design Blog",
      },
    ],
  },
};

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

