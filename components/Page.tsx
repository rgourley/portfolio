import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";
import AgentText from "@/components/AgentText";

interface PageProps {
  children: ReactNode;
  /** the page's markdown for agents: the exact string its /md route serves, from lib/agent-views.ts */
  agent: string;
  className?: string;
}

/** Every page is two views in one: the human view with the site footer, and the plain-text view for agents the valve
    switches to. The agent view is the page's /md document, byte for byte; scripts/check-agent-views.mjs holds it to that. */
export default function Page({ children, agent, className = "" }: PageProps) {
  return (
    <main className={`page ${className}`}>
      <div className="human">
        {children}
        <SiteFooter />
      </div>
      <section className="agent" aria-label="For agents">
        <span className="k">For agents</span>
        <pre><AgentText text={agent} /></pre>
      </section>
    </main>
  );
}
