"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { R } from "@/lib/links";
import AgentText from "@/components/AgentText";

/** The home page: the hero, the five work lines and the closing line over one fixed field of dots. The field itself
    lives in lib/bloom-field.js and mounts once Three.js has loaded, so the copy is there before the dots are.
    `agent` is the home page's /md document, the exact string that route serves; the server page passes it in. */
export default function BloomHome({ agent }: { agent: string }) {
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
          <p className="line" data-fig="claw"><Link href={R.clawstreet}><span>A training flywheel for AI financial agents.<small>ClawStreet <i>&rarr;</i></small></span></Link></p>
          <p className="line" data-fig="proxy"><Link href={R.proxies}><span>An AI harness for structured concept feedback.<small>Proxies, a Claude Code skill <i>&rarr;</i></small></span></Link></p>
          <p className="line" data-fig="point"><span><span className="p1">Agents made building cheap. They did not make it good.</span> <span className="p2">The job is what it always was: <em>take the technical thing and make it feel effortless<i className="fs" id="fs">.</i></em></span><small className="after"><Link href={R.work}>See the work <i>&rarr;</i></Link></small></span></p>
        </section>

        <section className="agent" id="agent" aria-label="For agents">
          <span className="k">For agents. The same page, as data.</span>
          <pre><AgentText text={agent} /></pre>
        </section>
      </main>
    </>
  );
}
