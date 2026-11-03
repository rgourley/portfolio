import { ImageResponse } from "next/og";

/* The share image, in the Bloom language: the page itself at 1200 by 630 rather than a card. Near-white paper with the
   grey ink tokens (light mode only), Manrope light for the title at a size that fills the frame the way the page headlines
   do, the corner header top left and the domain bottom left in mono, and the dot field as the only picture: a still
   scatter of grey dots like the home field at rest, denser toward the right, drawn into the image. No photographs, no
   logos, no gradients. Every route calls renderBloomCard with the fonts its runtime can load (see ogFonts). */

export const ogSize = { width: 1200, height: 630 };

// the tokens, light mode
const PAPER = "#F2F1EE", INK = "#161616", INK_MID = "#6E6E6A", INK_DIM = "rgba(22,22,22,0.6)";

export interface OgFont { name: string; data: ArrayBuffer; weight: 300 | 400 | 600; style: "normal" }

/** The three faces the card uses, for an edge route: the files sit beside this module and are named with fixed strings, so the
    bundler ships them with the route. A Node route reads the same files from disk with ogFontsFromDisk. */
export async function ogFonts(): Promise<OgFont[]> {
  const [light, regular, mono] = await Promise.all([
    fetch(new URL("./og-fonts/manrope-300.woff", import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL("./og-fonts/manrope-400.woff", import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL("./og-fonts/mono-600.woff", import.meta.url)).then((r) => r.arrayBuffer()),
  ]);
  return [
    { name: "Manrope", data: light, weight: 300, style: "normal" },
    { name: "Manrope", data: regular, weight: 400, style: "normal" },
    { name: "Mono", data: mono, weight: 600, style: "normal" },
  ];
}

/** A small deterministic generator, so a page's dots are the same on every render. */
function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
function gauss(r: () => number) { const u = 1 - r(), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.2832 * v); }

/** The dot field as an SVG data URL: a thin scatter over the whole frame that thickens toward the right, and a soft
    cluster right of centre like the galaxy's core at rest. Greys only, from the ink at a few opacities. */
function dotField(seed: number): string {
  const r = rng(seed), parts: string[] = [];
  const W = ogSize.width, H = ogSize.height;
  const dot = (x: number, y: number, rad: number, a: number) => {
    if (x < -4 || x > W + 4 || y < -4 || y > H + 4) return;
    parts.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(2)}" fill="#161616" fill-opacity="${a.toFixed(2)}"/>`);
  };
  // the scatter: position drawn with a bias to the right, size and opacity small
  for (let i = 0; i < 1100; i++) {
    const x = W * Math.pow(r(), 0.55), y = H * r();
    dot(x, y, 1.1 + r() * 1.6, 0.12 + r() * 0.3);
  }
  // the cluster: a flattened ball right of centre, dense at the heart, with two loose arms
  const cx = 880, cy = 310;
  for (let i = 0; i < 900; i++) {
    const t = Math.pow(Math.abs(gauss(r)), 1.25);
    const a = r() * 6.2832, d = t * 150;
    dot(cx + Math.cos(a) * d * 1.15, cy + Math.sin(a) * d * 0.55, 1.2 + r() * 2 * (1 - Math.min(1, d / 170)), 0.18 + 0.5 * (1 - Math.min(1, d / 170)));
  }
  for (let i = 0; i < 700; i++) {
    const arm = i % 2, th = r() * 3.4, rad = 60 + th * 62 + gauss(r) * 9;
    const ang = th + arm * Math.PI, x = cx + Math.cos(ang) * rad * 1.2, y = cy + Math.sin(ang) * rad * 0.5;
    dot(x, y, 1.0 + r() * 1.6, 0.14 + r() * 0.3);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${parts.join("")}</svg>`;
  return "data:image/svg+xml;base64," + btoa(svg);
}

/** The title's size: the largest step whose wrapped lines fit the frame between the corner header and the domain line.
    Lines are estimated from the measure and Manrope light's average advance, with room for ragged wrapping. */
function titleSize(title: string, measure: number): number {
  const room = 340;
  for (const size of [132, 116, 100, 88, 78, 68, 60]) {
    const perLine = Math.floor(measure / (size * 0.52));
    const lines = Math.ceil((title.length * 1.12) / perLine);
    if (lines * size <= room) return size;
  }
  return 54;
}

export interface BloomCard {
  /** the small mono line above the title: the client, the section, or a post's date */
  label?: string;
  title: string;
  /** a seed for the dot field, so each page keeps its own scatter */
  seed?: number;
  /** a cover image as a data URL: it fills the right part of the frame in place of the dot field, with a soft paper edge
      where it meets the text column, and the title keeps to the column */
  art?: string;
}

const mono = { fontFamily: "Mono", fontSize: 18, letterSpacing: "0.14em", textTransform: "uppercase" as const, fontWeight: 600 };

/** Renders the card. The fonts come from the route, which knows its runtime. */
export function renderBloomCard({ label, title, seed = 7, art }: BloomCard, fonts: OgFont[]): ImageResponse {
  // with a cover the text keeps to the left column; the cover takes the right 55 percent, edge to edge
  const measure = art ? 460 : 780, artLeft = 540, edge = 150;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: PAPER, position: "relative", fontFamily: "Manrope", color: INK }}>
        {art ? (
          <div style={{ position: "absolute", left: artLeft, top: 0, width: ogSize.width - artLeft, height: "100%", display: "flex" }}>
            <img src={art} width={ogSize.width - artLeft} height={ogSize.height} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: edge, height: "100%", display: "flex", backgroundImage: `linear-gradient(to right, ${PAPER} 0%, ${PAPER}00 100%)` }} />
          </div>
        ) : (
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", backgroundImage: `url("${dotField(seed)}")`, backgroundSize: "1200px 630px", display: "flex" }} />
        )}
        <div style={{ position: "absolute", left: 64, top: 56, display: "flex", flexDirection: "column", ...mono, lineHeight: 1.6 }}>
          <div style={{ display: "flex", color: INK }}>Robert Gourley</div>
          <div style={{ display: "flex", color: INK_DIM }}>CXO, Agentic Systems</div>
        </div>
        <div style={{ position: "absolute", left: 64, right: 64, bottom: 96, display: "flex", flexDirection: "column", maxWidth: measure }}>
          {label ? <div style={{ display: "flex", ...mono, color: INK_MID, marginBottom: 26 }}>{label}</div> : null}
          <div style={{ display: "flex", fontSize: titleSize(title, measure), fontWeight: 300, lineHeight: 1.0, letterSpacing: "-0.035em", color: INK, textWrap: "balance" }}>{title}</div>
        </div>
        <div style={{ position: "absolute", left: 64, bottom: 52, display: "flex", ...mono, color: INK_DIM }}>robertcreative.com</div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
