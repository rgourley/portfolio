import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Check, Github, Terminal } from "lucide-react";

const PAGE_PATH = "/projects/proxies";
const GITHUB_URL = "https://github.com/rgourley/proxies";
const PAGE_TITLE = "Proxies: test your idea on simulated stakeholders";
const PAGE_DESCRIPTION =
  "Proxies is a free Claude Code skill. It makes a room of simulated stakeholders, each with their own role, goals, and hard lines. Show them an idea, a prototype, or a design, and each one tells you where it breaks for them, before the real meeting.";
const OG_IMAGE = "/images/projects/proxies-run.webp";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Proxies",
    "simulated stakeholders",
    "stakeholder review",
    "design review",
    "concept review",
    "red team",
    "Claude Code skill",
    "AI personas",
    "product review",
    "Robert Gourley",
  ],
  authors: [{ name: "Robert Gourley", url: "https://github.com/rgourley" }],
  creator: "Robert Gourley",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Proxies. Ask your stakeholders before the meeting.",
    description:
      "Simulated stakeholders review your idea, prototype, or design and tell you where it breaks for them.",
    url: PAGE_PATH,
    siteName: "Robert Gourley",
    type: "website",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 2000, height: 1544, alt: "A Proxies results page" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proxies. Ask your stakeholders before the meeting.",
    description:
      "Simulated stakeholders review your idea, prototype, or design and tell you where it breaks for them.",
    creator: "@rgourley",
    images: [OG_IMAGE],
  },
};

const REASONS = [
  {
    title: "Each person is a separate agent",
    body: "Every person only sees their own card. They do not blur into one agreeable voice.",
  },
  {
    title: "People are saved and reused",
    body: "You build your team once. When a real person says something different, you correct the card.",
  },
  {
    title: "They read the real documents",
    body: "They review against your real spec and decision docs, not an old draft.",
  },
  {
    title: "Every run has a clear outcome",
    body: "First everyone gives a view on their own. Then they answer each other. Then someone decides. Disagreement is written down.",
  },
  {
    title: "One page with the answer",
    body: "Every run ends on one results page: who blocks it, what is critical, and what fixes it.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Pick a team",
    body: "Choose a company and its people. Three sample teams come with the project, or you can describe your own and Claude drafts it.",
  },
  {
    n: "02",
    title: "Give them something to review",
    body: "Hand over a flow, a spec, a prototype, or a design idea. Add one line about the situation.",
  },
  {
    n: "03",
    title: "Read the results page",
    body: "See who would block it, the problems ranked from critical to minor, and what to fix first. Click any name to read their full answer.",
  },
];

const COMMANDS = [
  {
    cmd: "redteam",
    body: "Everyone tries to break your idea.",
  },
  {
    cmd: "meeting",
    body: "They debate it, then the person who decides makes the call.",
  },
  {
    cmd: "prep",
    body: "Get each person's top questions before you walk in.",
  },
  {
    cmd: "followup",
    body: "Check whether your new version answered their objections.",
  },
  {
    cmd: "compare",
    body: "Show two versions. Each person picks one.",
  },
  {
    cmd: "ask / talk",
    body: "Ask one person a question, or have a longer chat.",
  },
];

const CARD_FIELDS = [
  "Role and who they report to",
  "What they are measured on",
  "Hard lines they will not cross",
  "Blind spots they have",
  "How they like to review",
  "Their voice, in one line",
];

const INSTALL_LINES: Array<{ kind: "comment" | "cmd" | "prompt"; text: string }> = [
  { kind: "comment", text: "# You need Node 22 or newer and Claude Code" },
  { kind: "cmd", text: "git clone https://github.com/rgourley/proxies.git" },
  { kind: "cmd", text: "cd proxies" },
  { kind: "cmd", text: "claude" },
  { kind: "comment", text: "# Then, inside Claude Code" },
  { kind: "prompt", text: "/proxies use tilt" },
  {
    kind: "prompt",
    text: '/proxies redteam your-flow.mmd "an agency invites 30 client reviewers"',
  },
];

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-16">
      {children}
    </div>
  );
}

function SectionEyebrow({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8 text-[11px] uppercase tracking-[0.18em] text-foreground/45 font-mono">
      <span className="text-foreground/70">{number}</span>
      <span className="h-px w-8 bg-foreground/20" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="border-b border-border pb-20 pt-12">
      <Container>
        <div className="mb-12 lg:mb-16 max-w-5xl">
          <div className="inline-flex items-center gap-2 mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent-cyan)]" />
            <span>open source · Claude Code skill</span>
          </div>
          <h1 className="font-display font-black leading-[0.92] tracking-[-0.05em] text-6xl sm:text-7xl md:text-8xl lg:text-[112px]">
            <span className="block">Proxies.</span>
            <span className="block">Ask your stakeholders</span>
            <span className="block">before the meeting.</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="max-w-xl mb-10 space-y-4">
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                Proxies are simulated people you test an idea on. Each one has a
                role, goals, and hard lines. You show them a flow, a spec, or a
                prototype, and each one tells you where it breaks for them.
              </p>
              <p className="text-lg md:text-xl text-foreground/90 font-semibold leading-snug tracking-tight">
                Find the problems before the real meeting does.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                <Github className="w-4 h-4" />
                View on GitHub
                <ArrowUpRight className="w-4 h-4 -mr-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#start"
                className="inline-flex items-center gap-2 border border-foreground/20 px-5 py-3 text-sm font-light text-foreground/80 hover:border-foreground/40 hover:text-foreground transition-colors"
              >
                <Terminal className="w-4 h-4" />
                Get started
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">
              <span>Free</span>
              <span className="text-foreground/20">·</span>
              <span>Nothing to install</span>
              <span className="text-foreground/20">·</span>
              <span>Plain markdown files</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-[color:var(--muted)]">
            <Image
              src={OG_IMAGE}
              alt="A Proxies results page: twelve simulated stakeholders, who blocks the idea and why, and a ranked list of findings"
              width={2000}
              height={1544}
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HonestNote() {
  return (
    <section className="border-b border-border py-16">
      <Container>
        <div className="max-w-3xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-4">
            A fair warning
          </div>
          <p className="text-xl md:text-2xl text-foreground/85 leading-snug tracking-tight">
            Proxies are simulations. They show the worries a role would likely
            raise. They do not predict what a real person will say.
          </p>
        </div>
      </Container>
    </section>
  );
}

function WhySection() {
  return (
    <section className="border-b border-border py-24">
      <Container>
        <SectionEyebrow number="01" label="Why not just ask for five personas?" />
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em]">
            One prompt gives you one agreeable voice.
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {REASONS.map((r, i) => (
              <li
                key={r.title}
                className={`rounded-xl border border-border bg-[color:var(--muted)] p-6 ${i === REASONS.length - 1 ? "sm:col-span-2" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[color:var(--accent-cyan)] mt-1 shrink-0" />
                  <div>
                    <h3 className="text-base font-medium text-foreground/90 mb-2">
                      {r.title}
                    </h3>
                    <p className="text-sm text-foreground/60 font-light leading-relaxed">
                      {r.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="border-b border-border py-24">
      <Container>
        <SectionEyebrow number="02" label="How it works" />
        <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-12 max-w-3xl">
          Three steps. One page of answers.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-xl border border-border bg-[color:var(--muted)] p-8"
            >
              <div className="font-mono text-sm text-foreground/45 mb-6">{s.n}</div>
              <h3 className="font-display text-2xl font-medium tracking-[-0.02em] mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-foreground/60 font-light leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PersonCardSection() {
  return (
    <section className="border-b border-border py-24">
      <Container>
        <SectionEyebrow number="03" label="The people" />
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Every person has a card.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed mb-6">
              The card says who they are and what they care about. It is just a
              markdown file, so you can read it and edit it by hand.
            </p>
            <ul className="space-y-3 text-sm text-foreground/70 font-light mb-6">
              {CARD_FIELDS.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[color:var(--accent-cyan)] mt-0.5 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-foreground/55 font-light leading-relaxed">
              Each person also gets an avatar. The same person always gets the
              same one.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-[color:var(--muted)]">
            <Image
              src="/images/projects/proxies-person-card.webp"
              alt="A Proxies person card for Sam, an engineering lead who can veto. It lists what he is measured on, his hard lines, his blind spots, and how he reviews"
              width={1470}
              height={720}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function CommandsSection() {
  return (
    <section className="border-b border-border py-24">
      <Container>
        <SectionEyebrow number="04" label="What you can do" />
        <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-12 max-w-3xl">
          Pick the kind of review you need.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMANDS.map((c) => (
            <div
              key={c.cmd}
              className="rounded-xl border border-border bg-[color:var(--muted)] p-6"
            >
              <div className="font-mono text-sm text-foreground/85 mb-3">
                <span className="text-[color:var(--accent-cyan)]">/proxies </span>
                {c.cmd}
              </div>
              <p className="text-sm text-foreground/60 font-light leading-relaxed">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function OwnTeamSection() {
  return (
    <section className="border-b border-border py-24">
      <Container>
        <SectionEyebrow number="05" label="Make it yours" />
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Describe your company. Get your team.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed">
              Write a few lines about the business, and Claude drafts it for
              you: the rules, who decides what, and the words people use. Then
              add people one at a time. Anything Claude guessed is marked, and you
              see the draft before it is saved.
            </p>
          </div>
          <div className="space-y-4 text-foreground/70 font-light leading-relaxed">
            <p>
              Each person has a decision level. Some decide. Some can block.
              Some must sign off. Some give advice. Some just want to be kept in
              the loop.
            </p>
            <p>
              When the real person says something different, tell Proxies. It
              suggests changes to the card and keeps a log, so your team gets
              closer to the real people over time.
            </p>
            <p>
              You can also share a whole team as one file, or copy a person into
              another company and adjust them. Three sample teams come with the
              project: a project planning tool, a clinic network, and a game
              studio.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StartSection() {
  return (
    <section id="start" className="border-b border-border py-24">
      <Container>
        <SectionEyebrow number="06" label="Get started" />
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Nothing to install.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed mb-6">
              Download the project, open Claude Code inside it, and the skill is
              ready. Start a new session after you download or update it.
            </p>
            <ul className="space-y-3 text-sm text-foreground/70 font-light">
              {[
                "Needs Node 22 or newer and Claude Code",
                "Results open as a page on their own after each run",
                "Everything is plain markdown, so it is easy to read and change",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[color:var(--accent-cyan)] mt-0.5 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[color:var(--muted)] border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
              <span className="flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                terminal
              </span>
              <span>zsh</span>
            </div>
            <pre className="p-5 text-[13px] leading-relaxed font-mono overflow-x-auto">
              {INSTALL_LINES.map((l, i) => {
                if (l.kind === "comment") {
                  return (
                    <div key={i} className="text-foreground/40">
                      {l.text}
                    </div>
                  );
                }
                if (l.kind === "prompt") {
                  return (
                    <div key={i} className="text-foreground/85">
                      <span className="text-[#c084fc] mr-2">&gt;</span>
                      {l.text}
                    </div>
                  );
                }
                return (
                  <div key={i} className="text-foreground/90">
                    <span className="text-[color:var(--accent-cyan)] mr-2">$</span>
                    {l.text}
                  </div>
                );
              })}
            </pre>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-32">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-6">
            Free to use · by Robert Gourley
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black leading-[1.0] tracking-[-0.04em] mb-8">
            Hear the pushback first.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              <Github className="w-4 h-4" />
              github.com/rgourley/proxies
              <ArrowUpRight className="w-4 h-4 -mr-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3.5 text-sm font-light text-foreground/80 hover:border-foreground/40 hover:text-foreground transition-colors"
            >
              See more projects
            </Link>
          </div>
          <p className="text-xs text-foreground/45 font-light leading-relaxed">
            Licensed under PolyForm Shield 1.0.0. You can use, change, and share
            Proxies for any purpose, including inside your company, except to
            build a product that competes with it.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default function ProxiesPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.robertcreative.com";
  const pageUrl = `${siteUrl}${PAGE_PATH}`;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "Proxies",
    description: PAGE_DESCRIPTION,
    url: pageUrl,
    image: `${siteUrl}${OG_IMAGE}`,
    codeRepository: GITHUB_URL,
    runtimePlatform: ["Claude Code", "Node.js 22+"],
    license: "https://polyformproject.org/licenses/shield/1.0.0/",
    author: {
      "@type": "Person",
      name: "Robert Gourley",
      url: "https://github.com/rgourley",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="pt-24">
        <Hero />
        <HonestNote />
        <WhySection />
        <HowItWorks />
        <PersonCardSection />
        <CommandsSection />
        <OwnTeamSection />
        <StartSection />
        <FinalCTA />
      </div>
    </>
  );
}
