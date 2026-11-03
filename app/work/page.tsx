import Link from "next/link";
import type { Metadata } from "next";
import Page from "@/components/Page";
import DotImage from "@/components/DotImage";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { IMG, WORK_LIST } from "@/lib/cases";
import { agentMarkdown } from "@/lib/agent-views";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  title: "Work | Product Design Projects & Case Studies",
  description: "Product design case studies and portfolio work by Robert Gourley. Explore design projects from Shield AI's Hivemind autonomy platform, Kraken's cryptocurrency trading platform, Federato's machine learning underwriting system, Axure's design tooling, and more. Detailed case studies showing design process, solutions, and outcomes.",
  keywords: ["product design portfolio", "UX case studies", "design projects", "autonomy platform design", "trading platform UX", "fintech design", "enterprise product design", "design case studies", "Hivemind design", "Kraken UX"],
  openGraph: { title: "Work | Product Design Projects & Case Studies", description: "Case studies in AI, autonomous systems, fintech and streaming.", url: "/work" },
};

export default function WorkPage() {
  const md = agentMarkdown("/work");
  return (
    <Page agent={md}>
      <StructuredData data={pageSchema({ type: "CollectionPage", path: "/work", name: "Work: Product Design Projects & Case Studies", description: "Case studies in AI, autonomous systems, fintech and streaming by Robert Gourley.", extra: { mainEntity: { "@type": "ItemList", itemListElement: WORK_LIST.map((w, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/work/${w.key}`, name: w.title })) } } })} />
      <header className="hd">
        <h1>Work</h1>
        <div className="k"><span><b>8</b> case studies</span><span>Autonomy, fintech, streaming, tools</span></div>
        <p>Case studies in AI, autonomous systems, fintech and streaming. The detailed ones are under NDA in places; the process, the team and the decisions are not.</p>
      </header>
      <div className="feat">
        {WORK_LIST.slice(0, 3).map((w, i) => {
          const im = IMG[w.img];
          return (
            <Link key={w.key} href={`/work/${w.key}`}>
              <DotImage src={im.src} w={im.w} h={im.h} cell={5} alt={w.title} priority={i === 0} hero={i === 0} sizes={i === 0 ? "(max-width: 1200px) 100vw, 1184px" : "(max-width: 760px) 100vw, 570px"} />
              <h2>{w.title}</h2>
              <div className="meta"><span>{w.client}</span><span>{w.year}</span></div>
            </Link>
          );
        })}
      </div>
      <ol className="rows">
        {WORK_LIST.slice(3).map((w, i) => {
          const im = IMG[w.img];
          return (
            <li key={w.key}>
              <Link className="row" href={`/work/${w.key}`}>
                <span className="n">{String(i + 4).padStart(2, "0")}</span>
                <DotImage src={im.src} w={im.w} h={im.h} cell={4} alt={w.title} sizes="(max-width: 760px) 260px, 176px" />
                <h3>{w.title}</h3>
                <span className="meta"><span>{w.client}</span><span>{w.year || "Case study"}</span></span>
              </Link>
            </li>
          );
        })}
      </ol>
    </Page>
  );
}
