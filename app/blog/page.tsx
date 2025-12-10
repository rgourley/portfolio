import { getAllBlogPosts } from "@/lib/content";
import BlogGrid from "@/components/BlogGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What I'm Thinking About | Design, Product Development & Creative Process",
  description: "Design blog by Robert Gourley covering product design, UX strategy, AI-powered design tools, design team building, design systems, and design leadership. Practical insights from 20+ years of shipping products at scale. Read articles on design trends, team processes, and building complex technical products.",
  keywords: ["design blog", "product design blog", "UX design", "design thinking", "design leadership", "AI design tools", "design systems", "design team building", "product development", "design strategy"],
  openGraph: {
    title: "What I'm Thinking About | Design, Product Development & Creative Process",
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
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="mb-16">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.0] tracking-[-0.02em] md:tracking-[-0.02em] lg:tracking-[-0.02em] mb-4">
            What I'm
            <br />
            Thinking About
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl">
            Thoughts on design, product development, and the creative process.
          </p>
        </div>
        <BlogGrid posts={posts} />
      </div>
    </div>
  );
}

