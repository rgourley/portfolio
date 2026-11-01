"use client";

import { useEffect, useState } from "react";

// Data file shape: one group per setting that was tested, each value with its two seeds' timings and a short note.
type Value = { value: string; label: string; secs: number; note?: string };
type Group = { key: string; label: string; base: string; baseGroup?: string; values: Value[] };
// aspect, zoomLabel, zoomOrigin and layout are optional; without them the tool shows 16:9 frames in a drag slider and zooms on the hands.
// layout "side" shows the default and the pick next to each other instead, zoomed together.
type Data = { dir: string; seeds: number[]; groups: Group[]; aspect?: string; zoomLabel?: string; zoomOrigin?: string; layout?: "slider" | "side" };

// Pick a setting, pick a value, then drag across the image to compare it with the default.
export default function SettingsExplorer({ src }: { src: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [groupKey, setGroupKey] = useState("");
  const [value, setValue] = useState("");
  const [seed, setSeed] = useState(0);
  const [split, setSplit] = useState(50);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    fetch(src)
      .then((r) => r.json())
      .then((d: Data) => {
        setData(d);
        setGroupKey(d.groups[0].key);
        setValue(d.groups[0].values[0].value);
        setSeed(d.seeds[0]);
      });
  }, [src]);

  if (!data) return <div className="my-10 aspect-video rounded-lg bg-muted/20 animate-pulse" />;

  const group = data.groups.find((g) => g.key === groupKey)!;
  const current = group.values.find((v) => v.value === value) || group.values[0];
  const baseGroup = data.groups.find((g) => g.key === (group.baseGroup || group.key))!;
  const base = baseGroup.values.find((v) => v.value === group.base)!;
  const path = (g: string, v: string) => `${data.dir}/${g}-${v}-${seed}.jpg`;
  const pill = (on: boolean) =>
    `rounded-full border px-3 py-1 text-sm transition-colors ${
      on ? "border-foreground bg-foreground text-background" : "border-foreground/20 text-foreground/70 hover:text-foreground"
    }`;
  // Zooms both images on the same fixed spot, where the settings show their differences first.
  const imgStyle = zoom ? { transform: "scale(2.2)", transformOrigin: data.zoomOrigin || "50% 45%" } : undefined;
  const side = data.layout === "side";
  const frame = { className: `relative overflow-hidden rounded-lg bg-foreground/5 ${data.aspect ? "" : "aspect-video"}`, style: data.aspect ? { aspectRatio: data.aspect } : undefined };
  // Portrait frames are capped in width so they fit on screen.
  const portrait = !!data.aspect && Number(data.aspect.split("/")[0]) < Number(data.aspect.split("/")[1]);

  return (
    <div className="my-10 w-full md:w-[min(1100px,calc(100vw-8rem))] md:relative md:left-1/2 md:-translate-x-1/2">
      {data.groups.length > 1 && (
        <div className="mb-4 flex gap-6 border-b border-foreground/15">
          {data.groups.map((g) => (
            <button
              key={g.key}
              type="button"
              className={`-mb-px border-b-2 pb-2 text-base transition-colors ${
                g.key === groupKey ? "border-foreground text-foreground" : "border-transparent text-foreground/50 hover:text-foreground"
              }`}
              onClick={() => {
                setGroupKey(g.key);
                setValue(g.values.find((v) => v.value !== g.base)?.value || g.values[0].value);
              }}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}
      <p className="mb-3 text-sm text-foreground/60">
        {side
          ? "Left is the default, right is the option you pick. Switch View to Close-up to zoom into the same spot on both."
          : "Left is the default, right is the option you pick. Drag across the image to compare."}
      </p>
      {group.values.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {group.values.map((v) => (
            <button key={v.value} type="button" className={pill(v.value === current.value)} onClick={() => setValue(v.value)}>
              {v.label}
            </button>
          ))}
        </div>
      )}

      {side ? (
        <div className="grid grid-cols-2 gap-3">
          {[
            { src: path(baseGroup.key, base.value), tag: `Default: ${base.label} · ${base.secs}s` },
            { src: path(group.key, current.value), tag: `${current.label} · ${current.secs}s` },
          ].map((f) => (
            <div key={f.tag} {...frame}>
              {/* Plain img on purpose: these swap on every click and should show the file as exported */}
              <img src={f.src} alt={f.tag} style={imgStyle} className="absolute inset-0 h-full w-full object-cover" />
              <span className="pointer-events-none absolute top-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white">{f.tag}</span>
            </div>
          ))}
        </div>
      ) : (
      <div
        className={`relative overflow-hidden rounded-lg bg-foreground/5 select-none ${data.aspect ? "" : "aspect-video"} ${portrait ? "mx-auto max-w-[560px]" : ""}`}
        style={data.aspect ? { aspectRatio: data.aspect } : undefined}
      >
        {/* Plain img on purpose: these swap on every click and should show the file as exported */}
        <img src={path(group.key, current.value)} alt={`${group.label}: ${current.label}`} style={imgStyle} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
          <img src={path(baseGroup.key, base.value)} alt={`Default: ${base.label}`} style={imgStyle} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/80" style={{ left: `${split}%` }} />
        <span className="pointer-events-none absolute top-3 left-3 rounded bg-black/60 px-2 py-1 text-xs text-white">
          Default: {base.label} · {base.secs}s
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded bg-black/60 px-2 py-1 text-xs text-white">
          {current.label} · {current.secs}s
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-label="Drag to compare with the default"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      )}

      <div className={`mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/60 ${portrait ? "mx-auto max-w-[560px]" : ""}`}>
        <Segmented label="Seed" options={data.seeds.map((x) => ({ key: String(x), label: String(x) }))} value={String(seed)} onChange={(k) => setSeed(Number(k))} />
        <Segmented
          label="View"
          options={[{ key: "full", label: "Full frame" }, { key: "zoom", label: data.zoomLabel || "Hands close-up" }]}
          value={zoom ? "zoom" : "full"}
          onChange={(k) => setZoom(k === "zoom")}
        />
      </div>
      {current.note && <p className={`mt-3 text-base text-foreground/75 ${portrait ? "mx-auto max-w-[560px]" : ""}`}>{current.note}</p>}
    </div>
  );
}

// A labeled row of joined buttons, one of which is on. Used for seed and view so they read as settings, not options to compare.
export function Segmented({ label, options, value, onChange }: { label: string; options: { key: string; label: string }[]; value: string; onChange: (key: string) => void }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span>{label}</span>
      <span className="inline-flex rounded-full border border-foreground/20 p-0.5">
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            aria-pressed={o.key === value}
            onClick={() => onChange(o.key)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${o.key === value ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"}`}
          >
            {o.label}
          </button>
        ))}
      </span>
    </span>
  );
}
