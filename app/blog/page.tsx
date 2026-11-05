import Link from "next/link";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import { fdate, mins } from "@/lib/blog";
import PostRows, { PostPic as Pic } from "@/components/PostRows";
import { OPEN_MODELS, inOpenModels } from "@/lib/sections";
import Page from "@/components/Page";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { agentMarkdown } from "@/lib/agent-views";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Writing | Design, Agents and the Tools",
  description: "Design blog by Robert Gourley covering product design, UX strategy, AI-powered design tools, design team building, design systems, and design leadership. Practical insights from 20+ years of shipping products at scale. Read articles on design trends, team processes, and building complex technical products.",
  keywords: ["design blog", "product design blog", "UX design", "design thinking", "design leadership", "AI design tools", "design systems", "design team building", "product development", "design strategy"],
  openGraph: { title: "Writing | Design, Agents and the Tools", description: "Notes from the work: what I learned building for pilots, underwriters, traders, and now for agents.", url: "/blog" },
};


export default function BlogPage() {
  const posts = getAllBlogPosts();
  // Two lanes: the writing, and the Open models section (its latest three here, all of them on its hub)
  const writing = posts.filter((p) => !inOpenModels(p));
  const models = posts.filter(inOpenModels);
  const f = writing[0];
  const years = posts.map((p) => +p.date.slice(0, 4));
  const md = agentMarkdown("/blog");
  return (
    <Page agent={md}>
      <StructuredData data={pageSchema({ type: "CollectionPage", path: "/blog", name: "Blog", description: "Design, product development and AI, by Robert Gourley.", extra: { mainEntity: { "@type": "ItemList", itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/blog/${p.slug}`, name: p.title })) } } })} />
      <header className="bhead">
        <h1>Writing</h1>
        <div className="k"><span><b>{posts.length}</b> posts</span><span>{Math.min(...years)} to {Math.max(...years)}</span><span>Design, agents, the tools</span></div>
        <p>Notes from the work: what I learned building for pilots, underwriters, traders, and now for agents. Written for people. Served to agents as plain text, one switch away.</p>
      </header>
      {f && (
        <Link className="bfeat" href={`/blog/${f.slug}`}>
          <Pic post={f} priority sizes="(max-width: 760px) 100vw, 690px" />
          <div>
            <div className="meta"><i>Latest</i> &nbsp; {fdate(f.date)} &nbsp; {mins(f)} min</div>
            <h2>{f.title}</h2>
            <p>{f.description}</p>
            <span className="meta">Read &rarr;</span>
          </div>
        </Link>
      )}
      {models.length > 0 && (
        <section className="lane">
          <div className="lanehead">
            <h2><Link href={OPEN_MODELS.path}>{OPEN_MODELS.title}</Link></h2>
            <p>Models you can download and run yourself: image generation, diffusion models, local LLMs and the tools around them.</p>
            <Link className="k all" href={OPEN_MODELS.path}>All {models.length} posts &rarr;</Link>
          </div>
          <PostRows posts={models.slice(0, 3)} />
        </section>
      )}
      <section className="lane">
        <div className="lanehead"><h2>Design and agents</h2></div>
        <PostRows posts={writing.slice(1)} start={2} />
      </section>
      <div className="foot"><span className="k">Also as <a href="/feed.xml">RSS</a></span><span className="k">Written for people. Served to agents as plain text.</span></div>
    </Page>
  );
}
