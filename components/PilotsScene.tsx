"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export type SceneKind = "pilots" | "drone" | "dash" | "flow" | "hold";

interface PilotsSceneProps {
  kind: SceneKind;
  /** the label on a placeholder scene */
  label?: string;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** A Three.js dot scene for a case study. Three.js and the scenes load on demand, after the copy is on the page. */
export default function PilotsScene({ kind, label, ariaLabel, className = "", style, children }: PilotsSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let dead = false, scene: { setMode: (d: boolean) => void; destroy: () => void } | null = null, obs: MutationObserver | null = null;
    const isDark = () => document.documentElement.getAttribute("data-mode") === "dark";
    import("@/lib/pilots").then((m) => {
      if (dead || !ref.current) return;
      scene = m.mountScene(kind, ref.current, label);
      scene.setMode(isDark());
      obs = new MutationObserver(() => scene?.setMode(isDark()));
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });
    });
    return () => { dead = true; obs?.disconnect(); scene?.destroy(); };
  }, [kind, label]);
  return (
    <div ref={ref} className={`pilots ${className}`} style={style} aria-label={ariaLabel}>
      {children}
    </div>
  );
}
