import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site-url";
import { SITE_SUMMARY } from "@/lib/site";

export const dynamic = "force-static";

/** A manifest for agents: what the site holds and the URL each piece has as HTML, markdown and JSON.
    There is no live MCP server behind it; every resource is a plain GET. */
export function GET() {
  const u = (p: string) => `${SITE_URL}${p}`;
  const manifest = {
    name: "robertcreative.com",
    title: "Robert Gourley",
    description: SITE_SUMMARY,
    url: SITE_URL,
    owner: { name: "Robert Gourley", url: SITE_URL, github: "https://github.com/rgourley", linkedin: "https://www.linkedin.com/in/rob-gourley/", contact: u("/contact") },
    server: null,
    note: "A manifest only. No MCP server runs here; every URL below answers a plain GET. Any page URL also answers Accept: text/markdown, or the same path with .md added, with its markdown twin.",
    resources: [
      {
        name: "profile",
        description: "Who Robert Gourley is, what he has done and how to reach him.",
        html: u("/about"),
        markdown: u("/md/about"),
        also: { resume: u("/md/resume"), contact: u("/md/contact"), leadership: u("/md/leadership"), services: u("/md/services"), newsletter: u("/md/newsletter") },
      },
      {
        name: "work",
        description: "Seven product design case studies: Shield AI, Kraken, Boombox, Axure, Crunchyroll, Apple, Paul Frank.",
        html: u("/work"),
        markdown: u("/md/work"),
        json: u("/api/work"),
        items: { html: u("/work/{slug}"), markdown: u("/md/work/{slug}"), json: u("/api/work/{slug}") },
      },
      {
        name: "projects",
        description: "Tools, plugins, games and experiments, mostly for agents and markets.",
        html: u("/projects"),
        markdown: u("/md/projects"),
        json: u("/api/projects"),
        pages: {
          proxies: u("/md/projects/proxies"),
          "quant-garage": u("/md/projects/quant-garage"),
          "financial-ui-suite": u("/md/projects/financial-ui-suite"),
          "market-coaster": u("/md/coaster/about"),
          "font-sizes": u("/md/tools/font-sizes"),
        },
      },
      {
        name: "writing",
        description: "Blog posts on design, agents and the tools.",
        html: u("/blog"),
        markdown: u("/md/blog"),
        json: u("/api/blog"),
        feed: u("/feed.xml"),
        items: { html: u("/blog/{slug}"), markdown: u("/md/blog/{slug}"), json: u("/api/blog/{slug}") },
      },
    ],
    discovery: { llms: u("/llms.txt"), llmsFull: u("/llms-full.txt"), sitemap: u("/sitemap.xml"), feed: u("/feed.xml") },
    contentNegotiation: {
      accept: "text/markdown",
      suffix: ".md",
      link: 'every page with a twin sends Link: <twin>; rel="alternate"; type="text/markdown"',
    },
  };
  return NextResponse.json(manifest);
}
