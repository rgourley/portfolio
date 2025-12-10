import { getWorkBySlug, getAllWork } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import MarkdownContent from "@/components/MarkdownContent";
import Image from "next/image";
import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import ProjectViewTracker from "@/components/ProjectViewTracker";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const work = await getWorkBySlug(params.slug);
  
  if (!work) {
    return {
      title: "Work Not Found",
    };
  }

  // Use the work's description if available (should be written specifically for that project)
  // Otherwise create a simple, natural fallback
  let metaDescription = work.description;
  
  if (!metaDescription) {
    // Create a natural description from available context
    const parts = [work.title];
    
    if (work.client) {
      parts.push(`for ${work.client}`);
    }
    
    if (work.tags?.length) {
      parts.push(`— ${work.tags.slice(0, 2).join(" and ")} design`);
    }
    
    parts.push("by Robert Gourley.");
    
    metaDescription = parts.join(" ");
  }
  
  const ogDescription = work.description || metaDescription;

  return {
    title: `${work.title} | Product Design Case Study${work.client ? ` - ${work.client}` : ""}`,
    description: metaDescription,
    keywords: [
      ...(work.tags || []), 
      "product design case study", 
      "UX design case study", 
      "product design portfolio",
      work.client || "",
      work.role || "",
      "Robert Gourley",
      "design leadership"
    ].filter(Boolean),
    openGraph: {
      title: `${work.title} | Product Design Case Study`,
      description: ogDescription,
      url: `/work/${work.slug}`,
      type: "article",
      publishedTime: work.date,
      authors: ["Robert Gourley"],
      images: work.image ? [
        {
          url: work.image,
          width: 1200,
          height: 630,
          alt: work.title,
        },
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: work.title,
      description: ogDescription,
      images: work.image ? [work.image] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const work = getAllWork();
  return work.map((item) => ({
    slug: item.slug,
  }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const work = await getWorkBySlug(params.slug);

  if (!work) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${baseUrl}/work/${work.slug}`,
    name: work.title,
    description: work.description,
    image: work.image,
    datePublished: work.date,
    author: {
      "@type": "Person",
      name: "Robert Gourley",
    },
    keywords: work.tags?.join(", "),
  };

  return (
    <article className="pt-32 pb-20">
      <ProjectViewTracker slug={work.slug} title={work.title} />
      <StructuredData data={articleSchema} />
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to work
        </Link>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.0] tracking-[-0.02em] mb-8">{work.title}</h1>

        {/* Subhead Above Image */}
        <p className="text-lg md:text-xl text-foreground/65 font-light leading-relaxed max-w-2xl mb-8">{work.description}</p>

        {/* Large Image */}
        {work.image && (
          <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5 mb-8">
            <Image
              src={work.image}
              alt={work.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              quality={90}
            />
          </div>
        )}

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-muted text-foreground/70 font-light"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="space-y-1">
            {work.date && (
              <div className="text-sm text-foreground/50">
                {format(new Date(work.date), "MMMM d, yyyy")}
              </div>
            )}
            {work.role && (
              <div className="text-sm text-foreground/50">
                Role: {work.role}
              </div>
            )}
            {work.timeline && (
              <div className="text-sm text-foreground/50">
                Timeline: {work.timeline}
              </div>
            )}
            {work.platform && (
              <div className="text-sm text-foreground/50">
                Platform: {work.platform}
              </div>
            )}
          </div>
        </header>

        <MarkdownContent content={work.content} />
      </div>
    </article>
  );
}

