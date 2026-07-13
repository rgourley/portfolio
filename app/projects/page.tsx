import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open source tools and libraries by Robert Gourley. Financial UI systems, quant research tooling, and design-led product work.",
  openGraph: {
    title: "Projects | Robert Gourley",
    description:
      "Open source tools and libraries by Robert Gourley.",
    url: "/projects",
    type: "website",
  },
};

type Project = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  meta: string;
};

const PROJECTS: Project[] = [
  {
    slug: "quant-garage",
    name: "quant-garage",
    tagline: "Analyst workflows as Claude skills.",
    blurb:
      "Forty-one Python tools and eight one-command workflows for equity research, sizing, and risk. Ask Claude or import the same function into a notebook. Every number cites the live API call it came from.",
    meta: "Python · Claude Code · Massive API · MIT",
  },
  {
    slug: "financial-ui-suite",
    name: "financial-ui-suite",
    tagline: "Financial UI that looks like the product it ships in.",
    blurb:
      "Two Claude Code skills, 17 reference docs, and 10 visual systems modeled on Bloomberg, TradingView, Kraken Pro, Robinhood, the FT, and more. Drops generic AI dashboards on the floor.",
    meta: "Claude Code plugin · React · Tailwind · MIT",
  },
];

export default function ProjectsIndexPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="mb-16 max-w-3xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-6">
            Projects
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[0.98] tracking-[-0.035em] mb-6">
            Open source tools I built and use.
          </h1>
          <p className="text-lg text-foreground/65 font-light leading-relaxed">
            Design-led product work for people who ship. Each is used in real workflows before it goes public.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group block border border-foreground/10 bg-[color:var(--muted)] p-8 hover:border-foreground/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="font-mono text-sm text-foreground/85">
                  {p.name}
                </div>
                <ArrowUpRight className="w-4 h-4 text-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-medium leading-[1.1] tracking-[-0.02em] mb-4">
                {p.tagline}
              </h2>
              <p className="text-sm text-foreground/60 font-light leading-relaxed mb-6">
                {p.blurb}
              </p>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
                {p.meta}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
