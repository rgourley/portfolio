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

  return {
    title: `${post.title} | Design Blog`,
    description: post.description || `Read ${post.title} on design, product development, and the creative process.`,
    keywords: [...(post.tags || []), "design blog", "product design", "UX design", "design thinking"].filter(Boolean),
    openGraph: {
      title: post.title,
      description: post.description || `Design blog post by Robert Gourley`,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
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
      description: post.description || `Design blog post`,
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
      <div className="max-w-[1200px] mx-auto px-12 lg:px-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

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
          <h1 className="font-display text-4xl md:text-5xl font-light mb-4">{post.title}</h1>
          <p className="text-xl text-foreground/60 mb-6">{post.description}</p>
          {post.date && (
            <span className="text-sm text-foreground/50">
              {format(new Date(post.date), "MMMM d, yyyy")}
            </span>
          )}
        </header>

        <MarkdownContent content={post.content} />
      </div>
    </article>
  );
}

