"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

interface Mode { dark: boolean; setDark: (d: boolean) => void; toggle: () => void }
const ModeContext = createContext<Mode>({ dark: false, setDark: () => {}, toggle: () => {} });

/** Light or dark. A script in the document head sets data-mode before paint from localStorage; this keeps React in step with it. */
export function ModeProvider({ children }: { children: ReactNode }) {
  const [dark, setDarkState] = useState(false);
  useEffect(() => {
    setDarkState(document.documentElement.getAttribute("data-mode") === "dark");
  }, []);
  const setDark = useCallback((d: boolean) => {
    setDarkState(d);
    document.documentElement.setAttribute("data-mode", d ? "dark" : "light");
    try { localStorage.setItem("mode", d ? "dark" : "light"); } catch {}
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
