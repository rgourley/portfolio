import { getWorkBySlug, getAllWork } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

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

  return (
    <article className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-12 lg:px-16">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to work
        </Link>

        {work.image && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img
              src={work.image}
              alt={work.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full bg-muted text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-light mb-4">{work.title}</h1>
          <p className="text-xl text-foreground/60 mb-6">{work.description}</p>
          {work.date && (
            <span className="text-sm text-foreground/50">
              {format(new Date(work.date), "MMMM d, yyyy")}
            </span>
          )}
        </header>

        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: work.contentHtml || work.content }}
        />
      </div>
    </article>
  );
}

