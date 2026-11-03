import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllWork, getWorkBySlug } from "@/lib/content";
import { CASES, IMG, NEXT_META } from "@/lib/cases";
import { R } from "@/lib/links";
import { SITE_URL } from "@/lib/site";
import { workAgentMarkdown } from "@/lib/agent-views";
import Page from "@/components/Page";
import Pic from "@/components/Pic";
import StoryRail from "@/components/StoryRail";
import CaseBlocks from "@/components/CaseBlocks";
import PilotsScene from "@/components/PilotsScene";
import StructuredData from "@/components/StructuredData";
import ProjectViewTracker from "@/components/ProjectViewTracker";
import { absUrl, breadcrumbSchema, personRef, WEBSITE_ID } from "@/lib/schema";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const work = await getWorkBySlug(params.slug);
  const c = CASES[params.slug];
  if (!work || !c) return { title: "Work Not Found" };
  const description = c.dek;
  return {
    title: `${c.title}${work.client ? ` (${work.client})` : ""} | Case Study`,
    description,
    alternates: { canonical: `/work/${work.slug}`, types: { "text/markdown": `/work/${work.slug}.md` } },
    keywords: [...(work.tags || []), "product design case study", "UX design case study", "product design portfolio", work.client || "", work.role || "", "Robert Gourley", "design leadership"].filter(Boolean),
    openGraph: {
      title: `${c.title} | Product Design Case Study`, description, url: `/work/${work.slug}`, type: "article",
      publishedTime: work.date, authors: ["Robert Gourley"],
    },
    twitter: { card: "summary_large_image", title: c.title, description },
  };
}

export async function generateStaticParams() {
  return getAllWork().filter((w) => CASES[w.slug]).map((w) => ({ slug: w.slug }));
}

export default async function WorkDetailPage({ params }: { params: { slug: string } }) {
  const work = await getWorkBySlug(params.slug);
  const c = CASES[params.slug];
  if (!work || !c) notFound();

  const workUrl = `${SITE_URL}/work/${c.slug}`;
  const hero = IMG[c.hero];
  const [nt, nd, nm] = NEXT_META[c.next];
  // The agent view is the same markdown /md/work/<slug> serves
  const raw = workAgentMarkdown(c.slug) || "";

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork", "@id": `${workUrl}#work`, mainEntityOfPage: { "@type": "WebPage", "@id": workUrl }, url: workUrl,
        name: c.title, headline: c.title, description: c.dek, image: absUrl(work.image), datePublished: work.date, dateModified: work.date,
        inLanguage: "en-US", keywords: c.tags.join(", "), isPartOf: { "@id": WEBSITE_ID }, author: personRef, creator: personRef,
        ...(work.client ? { sourceOrganization: { "@type": "Organization", name: work.client } } : {}),
      },
      breadcrumbSchema([["Work", "/work"], [c.title, `/work/${c.slug}`]]),
    ],
  };

  return (
    <Page agent={raw}>
      <ProjectViewTracker slug={c.slug} title={c.title} />
      <StructuredData data={articleSchema} />
      <header className="head">
        <Link className="back" href={R.work}>&larr; Work</Link>
        <h1>{c.title}</h1>
        <p className="dek">{c.dek}</p>
        <div className="facts">{c.facts.map(([k, v]) => <div key={k}><span className="k">{k}</span><b>{v}</b></div>)}</div>
        <div className="tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
      </header>
      <figure className="hero">
        {c.heroScene
          ? <PilotsScene kind={c.heroScene.kind} style={{ aspectRatio: "16/8" }} ariaLabel={c.heroScene.aria} />
          : <Pic src={hero.src} w={hero.w} h={hero.h} alt={c.heroAlt} priority sizes="(max-width: 1200px) 100vw, 1184px" />}
        <figcaption>{c.heroCap}</figcaption>
      </figure>
      <div className="story">
        <StoryRail chapters={c.chapters.map((ch) => ({ id: ch.id, name: ch.name }))} />
        <div className="body">
          {c.chapters.map((ch, i) => (
            <section key={ch.id} id={ch.id}>
              <h2><small>{String(i + 1).padStart(2, "0")}</small>{ch.name}</h2>
              <CaseBlocks blocks={ch.blocks} />
            </section>
          ))}
        </div>
      </div>
      <Link className="next" href={`/work/${c.next}`}>
        <div><span className="k">Next case study</span><h3>{nt}</h3><p>{nd}</p></div>
        <span className="k">{nm}</span>
      </Link>
    </Page>
  );
}
