import type { ReactNode } from "react";
import type { Metadata } from "next";
import Page from "@/components/Page";
import Pic from "@/components/Pic";
import StructuredData from "@/components/StructuredData";
import Term, { type TermLine } from "@/components/Term";
import { pageSchema } from "@/lib/schema";
import { GH, PSTEPS, CMDS } from "@/lib/proxies";
import { agentMarkdown } from "@/lib/agent-views";

const DESCRIPTION =
  "Proxies is a free Claude Code skill: simulated personas review your idea, prototype or design and tell you where it breaks, before the real meeting.";

export const metadata: Metadata = {
  title: "Proxies | Ask Your Stakeholders Before the Meeting",
  description: DESCRIPTION,
  alternates: { canonical: "/projects/proxies" },
  openGraph: {
    title: "Proxies",
    description: DESCRIPTION,
    url: "/projects/proxies",
    images: [{ url: "/images/proxies/og-proxies.jpg", width: 1200, height: 630 }],
  },
};

const REASONS: [string, string][] = [
  ["Real disagreement, not polite agreement", "Each persona runs as a separate agent and only sees their own card, so they cannot blur into one agreeable voice."],
  ["Personas that get closer to the real people", "You build your team of personas once and reuse it. When a real person says something different, you correct the card."],
  ["Feedback on your real work", "They read your real spec and decision docs, not an old draft."],
  ["A clear outcome, not a long chat", "Everyone gives a view on their own. Then they answer each other. Then someone decides, and any disagreement is written down."],
  ["One page that tells you what to fix", "Every run ends on one results page: who blocks it, what is critical, and what fixes it."],
];

const CARD = [
  "Role and who they report to",
  "What they are measured on",
  "Hard lines they will not cross",
  "Blind spots they have",
  "How they like to review",
  "Their voice, in one line",
];

const TERM: TermLine[] = [
  ["c", "# You need Node 22 or newer and Claude Code"],
  ["$", "git clone https://github.com/rgourley/proxies.git"],
  ["$", "cd proxies"],
  ["$", "claude"],
  ["c", "# Then, inside Claude Code"],
  ["p", "/proxies use tilt"],
  ["p", '/proxies redteam your-flow.mmd "an agency invites 30 client reviewers"'],
];

const md = agentMarkdown("/projects/proxies");

function Sec({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="sec">
      <h2>
        <small>{n}</small>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ProxiesPage() {
  return (
    <Page agent={md}>
      <StructuredData
        data={pageSchema({
          path: "/projects/proxies",
          name: "Proxies",
          description: DESCRIPTION,
          crumbs: [
            ["Projects", "/projects"],
            ["Proxies", "/projects/proxies"],
          ],
        })}
      />
      <article className="sheet">
        <span className="k lead-k">Proxies · open source · a Claude Code skill</span>
        <h1>Ask your stakeholders before the meeting.</h1>
        <p className="dek">
          Proxies are simulated personas you test an idea on. Each one has a role, goals and hard lines. You show them a flow, a spec or a prototype, and each one tells you where it breaks for them. Find the problems before the real meeting does.
        </p>
        <div className="chips">
          <span>Free</span>
          <span>Nothing to install</span>
          <span>Plain markdown files</span>
        </div>
        <p style={{ marginTop: 28 }}>
          <a className="big" href={GH} target="_blank" rel="noopener">
            View on GitHub<i>&rarr;</i>
          </a>
        </p>

        <figure>
          <Pic
            src="/images/proxies/hero-room-clean.webp"
            w={1456}
            h={816}
           
            priority
            alt="Six personas round the table: Sam, engineering lead; Ken, head of support; Rita, VP sales; Jo, head of product; Ana, operations director; Theo, AI engineer."
            sizes="(max-width: 900px) 100vw, 880px"
          />
          <figcaption>
            Six personas round the table: Sam, engineering lead; Ken, head of support; Rita, VP sales; Jo, head of product; Ana, operations director; Theo, AI engineer.
          </figcaption>
        </figure>

        <Sec n="01" title="See who thinks what, and what changed">
          <div className="body2">
            <p>
              Each persona gives a first take, then answers the room. You can see at a glance who moved and who held their ground. Hover over a persona to see their hard lines. Open a persona to read their rounds in order.
            </p>
          </div>
          <figure>
            <Pic
              src="/images/proxies/results-dark.webp"
              w={2000}
              h={1349}
             
              alt="The results page: who blocks it, what is critical, what fixes it."
              sizes="(max-width: 900px) 100vw, 880px"
            />
            <figcaption>The results page: who blocks it, what is critical, what fixes it.</figcaption>
          </figure>
          <p className="warn">
            A fair warning. Proxies are simulations. They show the worries a role would likely raise. They do not predict what a real person will say.
          </p>
        </Sec>

        <Sec n="02" title="Five personas in one prompt is still one voice. Proxies keeps them apart.">
          <div className="grid3">
            {REASONS.map(([t, d]) => (
              <div key={t}>
                <b>{t}</b>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </Sec>

        <Sec n="03" title="Three steps. One page of answers.">
          <ol className="steps">
            {PSTEPS.map(([t, d], i) => (
              <li key={t}>
                <b>
                  {String(i + 1).padStart(2, "0")} &nbsp; {t}
                </b>
                <p>{d}</p>
              </li>
            ))}
          </ol>
          <div className="grid2">
            <figure>
              <Pic
                src="/images/proxies/each-view.webp"
                w={1654}
                h={1204}
               
                alt="Each persona’s view, one at a time."
                sizes="(max-width: 860px) 100vw, 430px"
              />
              <figcaption>Each persona’s view, one at a time.</figcaption>
            </figure>
            <figure>
              <Pic
                src="/images/proxies/dialogue.webp"
                w={1024}
                h={1024}
               
                alt="The dialogue: first takes, then answers to the room."
                sizes="(max-width: 860px) 100vw, 430px"
              />
              <figcaption>The dialogue: first takes, then answers to the room.</figcaption>
            </figure>
          </div>
        </Sec>

        <Sec n="04" title="Every persona has a card">
          <div className="body2">
            <p>
              The card says who they are and what they care about. It is just a markdown file, so you can read it and edit it by hand. Each persona also gets an avatar. The same persona always gets the same one.
            </p>
          </div>
          <ul className="list2">
            {CARD.map((x, i) => (
              <li key={x}>
                <i>{String(i + 1).padStart(2, "0")}</i>
                {x}
              </li>
            ))}
          </ul>
          <figure>
            <Pic
              src="/images/proxies/card-kofi-dark.webp"
              w={2000}
              h={1222}
             
              alt="A persona card."
              sizes="(max-width: 900px) 100vw, 880px"
            />
            <figcaption>A persona card.</figcaption>
          </figure>
        </Sec>

        <Sec n="05" title="Pick the kind of review you need">
          <ul className="kv">
            {CMDS.map(([c, d]) => (
              <li key={c}>
                <b className="code">/proxies {c}</b>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Sec>

        <Sec n="06" title="Describe your company. Get your team.">
          <div className="body2">
            <p>
              Write a few lines about the business, and Claude drafts it for you: the rules, who decides what, and the words people use. Then add personas one at a time. Anything Claude guessed is marked, and you see the draft before it is saved.
            </p>
            <p>
              Each persona has a decision level. Some decide. Some can block. Some must sign off. Some give advice. Some just want to be kept in the loop.
            </p>
            <p>
              When the real person says something different, tell Proxies. It suggests changes to the card and keeps a log, so your team gets closer to the real people over time. You can also share a whole team as one file, or copy a persona into another company and adjust them. Three sample teams come with the project: a project planning tool, a clinic network, and a game studio.
            </p>
          </div>
          <figure>
            <Pic
              src="/images/proxies/people-list.webp"
              w={558}
              h={1126}
             
              alt="A team of eleven personas, from decision owner to informed."
              sizes="(max-width: 900px) 100vw, 880px"
            />
            <figcaption>A team of eleven personas, from decision owner to informed.</figcaption>
          </figure>
        </Sec>

        <Sec n="07" title="Nothing to install">
          <div className="body2">
            <p>
              Download the project, open Claude Code inside it, and the skill is ready. Start a new session after you download or update it. It needs Node 22 or newer and Claude Code. Results open as a page on their own after each run. Everything is plain markdown, so it is easy to read and change.
            </p>
          </div>
          <Term lines={TERM} />
        </Sec>

        <Sec n="08" title="Hear the pushback first">
          <p>
            <a className="big" href={GH} target="_blank" rel="noopener">
              github.com/rgourley/proxies<i>&rarr;</i>
            </a>
          </p>
          <p className="nda">
            Free to use. Licensed under PolyForm Shield 1.0.0: you can use, change and share Proxies for any purpose, including inside your company, except to build a product that competes with it.
          </p>
        </Sec>
      </article>
    </Page>
  );
}
