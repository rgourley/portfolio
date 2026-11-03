import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllBlogPosts, type BlogPost } from "@/lib/content";
import { fileDims } from "@/lib/image-dims";
import { fdate, mins, tagOf } from "@/lib/blog";
import Page from "@/components/Page";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Writing | Design, Agents and the Tools",
  description: "Design blog by Robert Gourley covering product design, UX strategy, AI-powered design tools, design team building, design systems, and design leadership. Practical insights from 20+ years of shipping products at scale. Read articles on design trends, team processes, and building complex technical products.",
  keywords: ["design blog", "product design blog", "UX design", "design thinking", "design leadership", "AI design tools", "design systems", "design team building", "product development", "design strategy"],
  openGraph: { title: "Writing | Design, Agents and the Tools", description: "Notes from the work: what I learned building for pilots, underwriters, traders, and now for agents.", url: "/blog" },
};


function Pic({ post, priority, sizes }: { post: BlogPost; priority?: boolean; sizes: string }) {
  if (!post.image) return <div className="pic" style={{ aspectRatio: "16/10" }} />;
  const d = fileDims(post.image) || { w: 16, h: 10 };
  return <Image className="pic" src={post.image} alt="" width={d.w} height={d.h} sizes={sizes} priority={priority} quality={82} />;
}

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const f = posts[0];
  const years = posts.map((p) => +p.date.slice(0, 4));
  const agent = (
    <>
      {`GET ${SITE_URL}/api/blog\nAccept: application/json\n\n[\n`}
      {posts.map((p) => `  {"slug": "${p.slug}", "date": "${p.date}", "title": "${p.title.replace(/"/g, '\\"')}",\n   "markdown": "${SITE_URL}/md/blog/${p.slug}"}`).join(",\n")}
      {"\n]\n\n"}
      <b># Every post has a markdown twin at /md/blog/{"{slug}"}. Same words, no layout.</b>
    </>
  );
  return (
    <Page agentTitle="Writing, as the agent sees it" agent={agent}>
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
      <ol className="rows">
        {posts.slice(1).map((p, i) => (
          <li key={p.slug}>
            <Link className="row" href={`/blog/${p.slug}`}>
              <span className="n">{String(i + 2).padStart(2, "0")}</span>
              <Pic post={p} sizes="(max-width: 760px) 260px, 176px" />
              <h3>{p.title}</h3>
              <span className="meta"><span>{fdate(p.date)}</span><span>{tagOf(p)} &nbsp; {mins(p)} min</span></span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="foot"><span className="k">Also as <a href="/feed.xml">RSS</a></span><span className="k">Written for people. Served to agents as plain text.</span></div>
    </Page>
  );
}
