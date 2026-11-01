"use client";

import { useEffect, useState } from "react";
import { Segmented } from "./SettingsExplorer";

// Data file shape: any number of axes (say checkpoint, setting, LoRA), the default pick on each, and per combination its time.
// Images live at `${dir}/combo-${key on each axis, joined by -}-${seed}.jpg`, and secs is keyed the same way without the seed.
type Option = { key: string; label: string; note?: string };
type Axis = { label: string; base: string; options: Option[] };
type Data = { dir: string; seeds: number[]; axes: Axis[]; secs: Record<string, number>; aspect?: string; zoomLabel?: string; zoomOrigin?: string };

// Pick one option on each axis. The default combination stays on the left, the pick on the right.
export default function ComboExplorer({ src }: { src: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [picks, setPicks] = useState<string[]>([]);
  const [seed, setSeed] = useState(0);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    fetch(src)
      .then((r) => r.json())
      .then((d: Data) => {
        setData(d);
        // Start one step away from the default on the second axis, so the two sides differ.
        setPicks(d.axes.map((ax, i) => (i === 1 ? ax.options.find((o) => o.key !== ax.base)?.key || ax.base : ax.base)));
        setSeed(d.seeds[0]);
      });
  }, [src]);

  if (!data || !picks.length) return <div className="my-10 aspect-video rounded-lg bg-muted/20 animate-pulse" />;

  const bases = data.axes.map((ax) => ax.base);
  const path = (keys: string[]) => `${data.dir}/combo-${keys.join("-")}-${seed}.jpg`;
  const describe = (keys: string[]) => keys.map((k, i) => data.axes[i].options.find((o) => o.key === k)?.label || k).join(", ");
  const time = (keys: string[]) => data.secs[keys.join("-")];
  const pill = (on: boolean) =>
    `rounded-full border px-3 py-1 text-sm transition-colors ${
      on ? "border-foreground bg-foreground text-background" : "border-foreground/20 text-foreground/70 hover:text-foreground"
    }`;
  const imgStyle = zoom ? { transform: "scale(2.2)", transformOrigin: data.zoomOrigin || "50% 45%" } : undefined;
  const frame = { className: `relative overflow-hidden rounded-lg bg-foreground/5 ${data.aspect ? "" : "aspect-video"}`, style: data.aspect ? { aspectRatio: data.aspect } : undefined };
  const frames = [
    { src: path(bases), tag: `Default: ${describe(bases)} · ${time(bases)}s` },
    { src: path(picks), tag: `${describe(picks)} · ${time(picks)}s` },
  ];
  const notes = picks.map((k, i) => data.axes[i].options.find((o) => o.key === k)?.note).filter(Boolean);

  return (
    <div className="my-10 w-full md:w-[min(1100px,calc(100vw-8rem))] md:relative md:left-1/2 md:-translate-x-1/2">
      <p className="mb-3 text-sm text-foreground/60">
        Left is the default, right is the combination you pick. Switch View to Close-up to zoom into the same spot on both.
      </p>
      {data.axes.map((ax, i) => (
        <div key={ax.label} className="mb-3 flex flex-wrap items-center gap-2">
          <span className="w-24 text-sm text-foreground/60">{ax.label}</span>
          {ax.options.map((o) => (
            <button key={o.key} type="button" className={pill(o.key === picks[i])} onClick={() => setPicks(picks.map((p, j) => (j === i ? o.key : p)))}>
              {o.label}
            </button>
          ))}
        </div>
      ))}

      <div className="mt-4 grid grid-cols-2 gap-3">
        {frames.map((f, i) => (
          <div key={i} {...frame}>
            {/* Plain img on purpose: these swap on every click and should show the file as exported */}
            <img src={f.src} alt={f.tag} style={imgStyle} className="absolute inset-0 h-full w-full object-cover" />
            <span className="pointer-events-none absolute top-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white">{f.tag}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/60">
        <Segmented label="Seed" options={data.seeds.map((x) => ({ key: String(x), label: String(x) }))} value={String(seed)} onChange={(k) => setSeed(Number(k))} />
        <Segmented
          label="View"
          options={[{ key: "full", label: "Full frame" }, { key: "zoom", label: data.zoomLabel || "Close-up" }]}
          value={zoom ? "zoom" : "full"}
          onChange={(k) => setZoom(k === "zoom")}
        />
      </div>
      {notes.map((n) => (
        <p key={n} className="mt-2 text-base text-foreground/75">{n}</p>
      ))}
    </div>
  );
}
