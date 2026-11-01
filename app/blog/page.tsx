import { getAllBlogPosts } from "@/lib/content";
import BlogGrid from "@/components/BlogGrid";
import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "What I'm Thinking About | Design, Product Development & Creative Process",
  description: "Design blog by Robert Gourley covering product design, UX strategy, AI-powered design tools, design team building, design systems, and design leadership. Practical insights from 20+ years of shipping products at scale. Read articles on design trends, team processes, and building complex technical products.",
  keywords: ["design blog", "product design blog", "UX design", "design thinking", "design leadership", "AI design tools", "design systems", "design team building", "product development", "design strategy"],
  openGraph: {
    title: "What I'm Thinking About | Design, Product Development & Creative Process",
    description: "Thoughts on design, product development, and the creative process.",
    url: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="pt-32 pb-20">
      <StructuredData data={pageSchema({ type: "CollectionPage", path: "/blog", name: "Blog", description: "Design, product development and AI, by Robert Gourley.", extra: { mainEntity: { "@type": "ItemList", itemListElement: getAllBlogPosts().map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/blog/${p.slug}`, name: p.title })) } } })} />
      <div className="max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-16">
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

