import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";

interface PageProps {
  children: ReactNode;
  /** the heading of the agent view, set after a hash */
  agentTitle: string;
  /** the plain text an agent gets, under the heading; the same text /md/<route> serves */
  agent: string;
  className?: string;
}

/** Markdown heading lines in the agent text render like the title: a little heavier. */
function AgentText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => {
        const nl = i ? "\n" : "";
        return line.startsWith("#") ? <b key={i}>{nl}{line}</b> : nl + line;
      })}
    </>
  );
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
        <pre><b># {agentTitle}</b>{"\n\n"}<AgentText text={agent} /></pre>
      </section>
    </main>
  );
}
