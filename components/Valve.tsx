"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { trackValveToggle } from "@/lib/analytics";

/** The valve: one switch between the view for humans and the view for agents. It flips a class on the body;
    every page renders both views and the stylesheet shows one. A new page starts on the human side. */
export default function Valve() {
  const [agents, setAgents] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setAgents(false); }, [pathname]);
  useEffect(() => {
    document.body.classList.toggle("agents", agents);
    return () => { document.body.classList.remove("agents"); };
  }, [agents]);
  return (
    <button
      type="button"
      className="valve"
      role="switch"
      aria-checked={agents}
      aria-label="Switch between the view for humans and the view for agents"
      onClick={() => { trackValveToggle(agents ? "humans" : "agents"); setAgents((a) => !a); window.scrollTo(0, 0); }}
    >
      <span className={agents ? undefined : "on"}>For humans</span>
      <i />
      <span className={agents ? "on" : undefined}>For agents</span>
    </button>
  );
}
