import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import MarkdownContent from "@/components/MarkdownContent";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Use the post's description if available (should be written specifically for that post)
  // Otherwise create a simple, natural fallback
  const metaDescription = post.description || 
    `${post.title}. ${post.tags?.length ? `Insights on ${post.tags.slice(0, 2).join(" and ")}. ` : ""}By Robert Gourley.`;

  const ogDescription = post.description || metaDescription;

  return {
    title: `${post.title} | Design Blog by Robert Gourley`,
    description: metaDescription,
    keywords: [...(post.tags || []), "design blog", "product design blog", "UX design", "design thinking", "design leadership", "AI design tools", "Robert Gourley"].filter(Boolean),
    openGraph: {
      title: post.title,
      description: ogDescription,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Robert Gourley"],
      images: post.image ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: ogDescription,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full bg-muted text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold mb-8 leading-[1.0] tracking-[-0.02em]">{post.title}</h1>
        </header>

        {post.image && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              quality={90}
            />
          </div>
        )}

        <div className="mb-8">
          <p className="text-xl text-foreground/60 mb-6">{post.description}</p>
          {post.date && (
            <span className="text-sm text-foreground/50">
              {format(new Date(post.date), "MMMM d, yyyy")}
            </span>
          )}
        </div>

        <MarkdownContent content={post.content} />
      </div>
    </article>
  );
}

