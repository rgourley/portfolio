"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { R } from "@/lib/links";

/** The home page: the hero, the five work lines and the closing line over one fixed field of dots. The field itself
    lives in lib/bloom-field.js and mounts once Three.js has loaded, so the copy is there before the dots are. */
export default function BloomHome() {
  const field = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    let dead = false, scene: { destroy: () => void } | null = null;
    document.documentElement.classList.add("bloom-home");
    import("@/lib/bloom-field").then((m) => {
      if (dead || !field.current || !root.current) return;
      scene = m.mountField(field.current, root.current);
    });
    return () => {
      dead = true;
      scene?.destroy();
      document.documentElement.classList.remove("bloom-home");
    };
  }, []);
  return (
    <>
      <div ref={field} className="field" aria-hidden="true" />
      <div className="corner bl"><b id="counter">01</b><i id="total">/ 07</i><span>Drag to turn, scroll for the next</span></div>
      <ul className="hrail" id="hrail" aria-label="Sections" />
      <main ref={root} className="page home">
        <section className="hhero">
          <h1>Turning complexity into products <em>people love.</em></h1>
          <p>Robert Gourley. Product designer building AI agents, and the systems teams ship them with. Designing the behaviour, not just the screen.</p>
        </section>

        <section className="lines" id="lines">
          <p className="line" data-fig="terrain"><Link href={R.hivemind}><span>Autonomous AI pilots.<small>Hivemind, Shield AI <i>&rarr;</i></small></span></Link></p>
          <p className="line" data-fig="grid"><Link href={R.work}><span>AI-native insurance platform.<small>Federato <i>&rarr;</i></small></span></Link></p>
          <p className="line" data-fig="chart"><Link href={R.kraken}><span>Traders moving billions, with confidence.<small>Kraken <i>&rarr;</i></small></span></Link></p>
          <p className="line" data-fig="claw"><Link href={R.projects}><span>A training flywheel for AI financial agents.<small>ClawStreet <i>&rarr;</i></small></span></Link></p>
          <p className="line" data-fig="proxy"><Link href={R.proxies}><span>An AI harness for structured concept feedback.<small>Proxies, a Claude Code skill <i>&rarr;</i></small></span></Link></p>
          <p className="line" data-fig="point"><span><span className="p1">Agents made building cheap. They did not make it good.</span> <span className="p2">The job is what it always was: <em>take the technical thing and make it feel effortless<i className="fs" id="fs">.</i></em></span><small className="after"><Link href={R.work}>See the work <i>&rarr;</i></Link></small></span></p>
        </section>

        <section className="agent" id="agent" aria-label="For agents">
          <span className="k">For agents. The same page, as data.</span>
          <pre><b># Robert Gourley</b>{"\n"}&gt; Designs products, and the agent systems teams use to build them. Autonomy, machine learning, markets.{"\n\n"}<b>## Now</b>{"\n"}- role: Principal Product Engineer, Massive{"\n"}- product: the team&apos;s agent layer: skills, subagents and workflows on Massive&apos;s financial data API{"\n"}- before: Director of Product Design, Shield AI; led design for Hivemind, a low-code platform where engineers build, test, and deploy AI pilots{"\n"}- years_in_practice: 20+{"\n\n"}<b>## Before</b>{"\n"}- Kraken: trading systems processing $200B in volume{"\n"}- Federato: ML underwriting platform{"\n"}- Crunchyroll: video streaming across web, mobile, and TV{"\n"}- Apple, Axure, AI music production, autonomous robotics{"\n\n"}<b>## Projects</b>{"\n"}- ClawStreet: a training flywheel for AI trading agents on live US markets, https://www.clawstreet.io{"\n"}- Proxies: simulated stakeholders that review concepts inside Claude Code, https://www.robertcreative.com/projects/proxies{"\n\n"}<b>## Links</b>{"\n"}- site: https://www.robertcreative.com{"\n"}- work: https://www.robertcreative.com/work{"\n"}- contact: https://www.robertcreative.com/contact{"\n"}- github: https://github.com/rgourley{"\n"}- linkedin: https://www.linkedin.com/in/rob-gourley/{"\n\n"}<b>## Endpoints</b>{"\n"}- /llms.txt and /llms-full.txt{"\n"}- /md/blog/&#123;slug&#125; and /md/work/&#123;slug&#125;: every post and case study as markdown{"\n"}- /feed.xml</pre>
        </section>
      </main>
    </>
  );
}
