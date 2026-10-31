"use client";

import { useEffect, useState } from "react";

// Data file shape: one group per setting that was tested, each value with its two seeds' timings and a short note.
type Value = { value: string; label: string; secs: number; note?: string };
type Group = { key: string; label: string; base: string; baseGroup?: string; values: Value[] };
type Data = { dir: string; seeds: number[]; groups: Group[] };

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
  // Zooms both images on the hands and ring, where the settings show their differences first.
  const imgStyle = zoom ? { transform: "scale(2.2)", transformOrigin: "50% 45%" } : undefined;

  return (
    <div className="my-10 w-full md:w-[min(1100px,calc(100vw-8rem))] md:relative md:left-1/2 md:-translate-x-1/2">
      <div className="flex flex-wrap gap-2 mb-3">
        {data.groups.map((g) => (
          <button
            key={g.key}
            type="button"
            className={pill(g.key === groupKey)}
            onClick={() => {
              setGroupKey(g.key);
              setValue(g.values.find((v) => v.value !== g.base)?.value || g.values[0].value);
            }}
          >
            {g.label}
          </button>
        ))}
      </div>
      {group.values.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {group.values.map((v) => (
            <button key={v.value} type="button" className={pill(v.value === current.value)} onClick={() => setValue(v.value)}>
              {v.label}
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-video overflow-hidden rounded-lg bg-foreground/5 select-none">
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

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/60">
        <span>Seed</span>
        {data.seeds.map((s) => (
          <button key={s} type="button" className={pill(s === seed)} onClick={() => setSeed(s)}>
            {s}
          </button>
        ))}
        <button type="button" className={pill(zoom)} onClick={() => setZoom(!zoom)}>
          Zoom on the hands
        </button>
      </div>
      {current.note && <p className="mt-3 text-base text-foreground/75">{current.note}</p>}
    </div>
  );
}
