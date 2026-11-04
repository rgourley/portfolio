"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export type SceneKind = "pilots" | "drone" | "dash" | "flow" | "race" | "lanes" | "hold";

interface PilotsSceneProps {
  kind: SceneKind;
  /** the label on a placeholder scene */
  label?: string;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** A Three.js dot scene for a case study. Three.js and the scenes load only once the scene's box comes within a screen of
    the viewport, after the copy is on the page, so a reader who never scrolls that far never downloads them. */
export default function PilotsScene({ kind, label, ariaLabel, className = "", style, children }: PilotsSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let dead = false, scene: { setMode: (d: boolean) => void; destroy: () => void } | null = null, obs: MutationObserver | null = null, io: IntersectionObserver | null = null;
    const isDark = () => document.documentElement.getAttribute("data-mode") === "dark";
    const mount = () => {
      io?.disconnect(); io = null;
      import("@/lib/pilots").then((m) => {
        if (dead || !ref.current) return;
        scene = m.mountScene(kind, ref.current, label);
        scene.setMode(isDark());
        obs = new MutationObserver(() => scene?.setMode(isDark()));
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });
      });
    };
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) mount(); }, { rootMargin: "100% 0px" });
      io.observe(el);
    } else mount();
    return () => { dead = true; io?.disconnect(); obs?.disconnect(); scene?.destroy(); };
  }, [kind, label]);
  return (
    <div ref={ref} className={`pilots ${className}`} style={style} aria-label={ariaLabel}>
      {children}
    </div>
  );
}
