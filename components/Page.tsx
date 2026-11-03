import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";

interface PageProps {
  children: ReactNode;
  /** the heading of the agent view, set after a hash */
  agentTitle: string;
  /** the plain text an agent gets, under the heading */
  agent: ReactNode;
  className?: string;
}

/** Every page is two views in one: the human view with the site footer, and the plain-text view for agents the valve switches to. */
export default function Page({ children, agentTitle, agent, className = "" }: PageProps) {
  return (
    <main className={`page ${className}`}>
      <div className="human">
        {children}
        <SiteFooter />
      </div>
      <section className="agent" aria-label="For agents">
        <span className="k">For agents</span>
        <pre><b># {agentTitle}</b>{"\n\n"}{agent}</pre>
      </section>
    </main>
  );
}
