"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { trackThemeToggle } from "@/lib/analytics";

interface Mode { dark: boolean; setDark: (d: boolean) => void; toggle: () => void }
const ModeContext = createContext<Mode>({ dark: false, setDark: () => {}, toggle: () => {} });

/** Light or dark. A script in the document head sets data-mode before paint, from a ?mode= in the link, a choice made with
    the dot, or else the system preference; this keeps React in step with it, and follows the system when it changes and
    neither a link nor the reader chose. */
export function ModeProvider({ children }: { children: ReactNode }) {
  const [dark, setDarkState] = useState(false);
  useEffect(() => {
    setDarkState(document.documentElement.getAttribute("data-mode") === "dark");
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const follow = (e: MediaQueryListEvent) => {
      let chosen = new URLSearchParams(location.search).get("mode");
      try { if (chosen !== "dark" && chosen !== "light") chosen = localStorage.getItem("mode"); } catch {}
      if (chosen === "dark" || chosen === "light") return;
      setDarkState(e.matches);
      document.documentElement.setAttribute("data-mode", e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", follow);
    return () => mq.removeEventListener("change", follow);
  }, []);
  const setDark = useCallback((d: boolean) => {
    setDarkState(d);
    document.documentElement.setAttribute("data-mode", d ? "dark" : "light");
    try { localStorage.setItem("mode", d ? "dark" : "light"); } catch {}
    trackThemeToggle(d ? "dark" : "light");   // only a choice made by the reader lands here; following the system does not
  }, []);
  const toggle = useCallback(() => setDark(!dark), [dark, setDark]);
  return <ModeContext.Provider value={{ dark, setDark, toggle }}>{children}</ModeContext.Provider>;
}

export function useMode() { return useContext(ModeContext); }

/** The old name, kept for anything that still asks for it. */
export function useTheme() {
  const { dark, toggle } = useMode();
  return { theme: dark ? "dark" : "light", toggleTheme: toggle };
}
