import Link from "next/link";
import type { Metadata } from "next";
import Page from "@/components/Page";
import Pic from "@/components/Pic";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { R } from "@/lib/links";
import { PROJ } from "@/lib/projects";
import { agentMarkdown } from "@/lib/agent-views";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "Projects | Tools, Plugins and Experiments",
  description: "Tools, plugins, games and experiments by Robert Gourley: ClawStreet, Market City, Amphora, Git Kingdom, quant-garage, financial-ui-suite, geofaces, smells-like-alpha and Proxies.",
  openGraph: { title: "Projects | Tools, Plugins and Experiments", description: "Things I build outside work, mostly for agents and markets.", url: "/projects" },
};

export default function ProjectsPage() {
  const md = agentMarkdown("/projects");
  return (
    <Page agent={md}>
      <StructuredData data={pageSchema({ type: "CollectionPage", path: "/projects", name: "Projects", description: "Tools, plugins and experiments by Robert Gourley.", extra: { mainEntity: { "@type": "ItemList", itemListElement: PROJ.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: p.internal ? SITE_URL + p.url : p.url, name: p.name })) } } })} />
      <header className="hd">
        <h1>Projects</h1>
        <div className="k"><span><b>9</b> projects</span><span>Tools, plugins, games and experiments</span></div>
        <p>Things I build outside work, mostly for agents and markets. Most are open source. All of them taught me something I used the next week.</p>
      </header>
      <div className="cards">
        {PROJ.map((p, i) => {
          const inner = (
            <>
              <Pic src={p.img} w={p.w} h={p.h} alt={p.name} className="same" aspect="16/10" priority={i === 0} sizes="(max-width: 760px) 100vw, 570px" />
              <div className="meta"><i>{p.name}</i> &nbsp; {p.meta}</div>
              <h3>{p.tag}</h3>
              <p>{p.blurb}</p>
              <span className="go">{p.cta} &rarr;</span>
            </>
          );
          return p.internal
            ? <Link key={p.name} className="card" href={p.url}>{inner}</Link>
            : <a key={p.name} className="card" href={p.url} target="_blank" rel="noopener">{inner}</a>;
        })}
      </div>
      <section className="sec">
        <h2><small>Also</small></h2>
        <ul className="links">
          <li><Link href={R.coaster}><span>Market Coaster</span>Ride a real stock chart as a 3D roller coaster</Link></li>
          <li><Link href={R["font-sizes"]}><span>Font size checker</span>Every font size, weight and line height on any page, one click</Link></li>
        </ul>
      </section>
    </Page>
  );
}
