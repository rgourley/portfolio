import Link from "next/link";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import Page from "@/components/Page";
import PostRows from "@/components/PostRows";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { openModelsAgentMarkdown } from "@/lib/agent-views";
import { OPEN_MODELS, inOpenModels, openModelGroups } from "@/lib/sections";
import { R } from "@/lib/links";

const DESCRIPTION =
  "Open models you can download and run yourself: image generation with diffusion models like Z-Image, FLUX and MOSS-Image, local LLMs, ComfyUI, model files and settings, tested on an ordinary 16 GB GPU.";

export const metadata: Metadata = {
  alternates: { canonical: OPEN_MODELS.path, types: { "text/markdown": `${OPEN_MODELS.path}.md` } },
  title: "Open Models: Image Generation, Diffusion Models and Local AI, Tested",
  description: DESCRIPTION,
  openGraph: { title: "Open models", description: DESCRIPTION, url: OPEN_MODELS.path },
};

/** The Open models section of the blog: the hub that groups its posts by topic. The posts keep their /blog/<slug> URLs. */
export default function OpenModelsPage() {
  const all = getAllBlogPosts();
  const groups = openModelGroups(all);
  const count = all.filter(inOpenModels).length;
  const flat = groups.flatMap((g) => g.posts);
  let n = 1;
  return (
    <Page agent={openModelsAgentMarkdown()}>
      <StructuredData
        data={pageSchema({
          type: "CollectionPage",
          path: OPEN_MODELS.path,
          name: OPEN_MODELS.title,
          description: DESCRIPTION,
          crumbs: [["Blog", "/blog"], [OPEN_MODELS.title, OPEN_MODELS.path]],
          extra: { mainEntity: { "@type": "ItemList", itemListElement: flat.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/blog/${p.slug}`, name: p.title })) } },
        })}
      />
      <header className="bhead">
        <Link className="back" href={R.blog}>&larr; Writing</Link>
        <h1>Open models</h1>
        <div className="k"><span><b>{count}</b> posts</span><span>Image generation</span><span>Local LLMs</span><span>Run it yourself</span></div>
        <p>
          The models you can download and run on your own hardware: diffusion models for images and video, local LLMs, and the
          tools around them, like ComfyUI. What they&rsquo;re good at, how they compare with each other and with closed models,
          and what it takes to run them on an ordinary GPU. Every test shows its prompts, settings and results.
        </p>
      </header>
      {groups.map((g) => {
        const start = n;
        n += g.posts.length;
        return (
          <section className="lane" key={g.title}>
            <div className="lanehead">
              <h2>{g.title}</h2>
              {g.blurb && <p>{g.blurb}</p>}
            </div>
            <PostRows posts={g.posts} start={start} />
          </section>
        );
      })}
      <div className="foot"><span className="k"><Link href={R.blog}>All writing</Link></span><span className="k">Also as <a href={`${OPEN_MODELS.path}.md`}>markdown</a></span></div>
    </Page>
  );
}
