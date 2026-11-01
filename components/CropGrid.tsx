"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Segmented } from "./SettingsExplorer";

// Data file shape: rows of tiles, each with a close-up crop and the full frame it came from.
type Tile = { crop: string; full: string; label: string };
type Row = { title: string; tiles: Tile[] };
type Data = { rows: Row[] };

// Small close-ups in a grid. Clicking one opens it large, with a switch to see the full frame.
export default function CropGrid({ src }: { src: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [open, setOpen] = useState<Tile | null>(null);
  const [view, setView] = useState("crop");

  useEffect(() => {
    fetch(src).then((r) => r.json()).then(setData);
  }, [src]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!data) return null;

  return (
    <div className="my-10 w-full md:w-[min(1100px,calc(100vw-8rem))] md:relative md:left-1/2 md:-translate-x-1/2">
      {data.rows.map((row) => (
        <div key={row.title} className="mb-8">
          <h3 className="mb-3 text-base font-medium text-foreground/80">{row.title}</h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {row.tiles.map((t) => (
              <button
                key={t.crop}
                type="button"
                onClick={() => {
                  setOpen(t);
                  setView("crop");
                }}
                aria-label={`Open ${t.label}`}
                className="text-left cursor-zoom-in"
              >
                <img src={t.crop} alt={t.label} loading="lazy" className="aspect-square w-full rounded object-cover" />
                <span className="mt-1 block text-xs text-foreground/60">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Portal to body: the grid's wrapper uses a transform, which would trap a fixed overlay inside it */}
      {open && createPortal(
        <div role="dialog" aria-modal="true" aria-label={open.label} onClick={() => setOpen(null)} className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-black/90 p-4">
          {/* Plain img on purpose: the original file. The close-up crop is small, so it's scaled up to fill the screen. */}
          <img
            src={view === "crop" ? open.crop : open.full}
            alt={open.label}
            onClick={(e) => e.stopPropagation()}
            className={`max-w-full w-auto object-contain rounded ${view === "crop" ? "h-[75vh]" : "max-h-[80vh] h-auto"}`}
          />
          <div className="flex items-center gap-4 text-sm text-white/80" onClick={(e) => e.stopPropagation()}>
            <span>{open.label}</span>
            <Segmented label="View" options={[{ key: "crop", label: "Close-up" }, { key: "full", label: "Full frame" }]} value={view} onChange={setView} />
          </div>
          <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute top-4 right-5 text-3xl leading-none text-white/80 hover:text-white">
            ×
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
