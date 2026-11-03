import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PostBody from "@/components/PostBody";
import Page from "@/components/Page";
import StructuredData from "@/components/StructuredData";
import { absUrl, breadcrumbSchema, personRef, WEBSITE_ID } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { blogAgentMarkdown } from "@/lib/agent-views";
import { fileDims, imageDims } from "@/lib/image-dims";
import { R } from "@/lib/links";
import { fdate, mins } from "@/lib/blog";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  // Use the post's description if available (should be written specifically for that post)
  // Otherwise create a simple, natural fallback
  const metaDescription = post.description ||
    `${post.title}. ${post.tags?.length ? `Insights on ${post.tags.slice(0, 2).join(" and ")}. ` : ""}By Robert Gourley.`;
  const ogDescription = post.description || metaDescription;

  return {
    title: post.seoTitle || post.title,
    description: metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: { "text/markdown": `/blog/${post.slug}.md` },
    },
    keywords: [...(post.tags || []), "design blog", "product design blog", "UX design", "design thinking", "design leadership", "AI design tools", "Robert Gourley"].filter(Boolean),
    openGraph: {
      title: post.title,
      description: ogDescription,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Robert Gourley"],
      // Posts with `ogArt` use the generated card from opengraph-image.tsx. Older posts use their own image.
      ...(!post.ogArt && post.image ? { images: [{ url: post.image, width: 1200, height: 630, alt: post.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: ogDescription,
      ...(!post.ogArt && post.image ? { images: [post.image] } : {}),
    },
  };
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const posts = getAllBlogPosts();
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const nx = posts[(idx + 1) % posts.length];
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  // Posts with `ogArt` and posts without an image both use the generated card.
  const postImage = !post.ogArt && post.image ? absUrl(post.image) : `${postUrl}/opengraph-image`;
  const cover = post.image ? fileDims(post.image) : null;
  const nextCover = nx.image ? fileDims(nx.image) : null;
  const dims = imageDims(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
        url: postUrl,
        headline: post.title,
        description: post.description,
        image: [postImage],
        datePublished: post.date,
        dateModified: post.updated || post.date,
        inLanguage: "en-US",
        keywords: post.tags?.join(", "),
        wordCount: post.content.split(/\s+/).filter(Boolean).length,
        isPartOf: { "@id": WEBSITE_ID },
        author: personRef,
        publisher: personRef,
      },
      breadcrumbSchema([["Blog", "/blog"], [post.title, `/blog/${post.slug}`]]),
    ],
  };

  return (
    <Page agent={blogAgentMarkdown(post.slug) || ""}>
      <StructuredData data={articleSchema} />
      <article className="post">
        <div className="wide">
          <Link className="back" href={R.blog}>&larr; Writing</Link>
          <h1>{post.title}</h1>
        </div>
        <div className="col">
          <p className="dek">{post.description}</p>
          <div className="meta"><span>{fdate(post.date)}</span><span>{post.tags.join(", ")}</span><span>{mins(post)} min read</span></div>
        </div>
        {post.image && (
          <figure className="hero">
            {cover
              ? <Image className="pic" src={post.image} alt={post.title} width={cover.w} height={cover.h} priority sizes="(max-width: 1200px) 100vw, 1184px" quality={88} />
              : <div className="pic" style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}><Image src={post.image} alt={post.title} fill priority sizes="(max-width: 1200px) 100vw, 1184px" style={{ objectFit: "cover" }} /></div>}
          </figure>
        )}
        <div className="col">
          <div className="body">
            <PostBody content={post.content} dims={dims} />
          </div>
          <Link className="next" href={`/blog/${nx.slug}`}>
            <div><span className="k">Next</span><h3>{nx.title}</h3></div>
            {nx.image && nextCover && <Image className="pic" src={nx.image} alt="" width={nextCover.w} height={nextCover.h} sizes="200px" quality={75} />}
          </Link>
        </div>
      </article>
    </Page>
  );
}
