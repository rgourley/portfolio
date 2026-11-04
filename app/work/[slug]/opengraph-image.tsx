import { CASES, WORK_LIST } from "@/lib/cases";
import { ogFonts, ogSize, renderBloomCard } from "@/lib/og-bloom";

export const runtime = "edge";
export const alt = "A case study by Robert Gourley";
export const size = ogSize;
export const contentType = "image/png";

/** The case study's share image: the client as the mono label, the study's title filling the frame. */
export default async function OGImage({ params }: { params: { slug: string } }) {
  const c = CASES[params.slug];
  const client = WORK_LIST.find((w) => w.key === params.slug)?.client;
  const title = c?.title || "Case study";
  const seed = [...params.slug].reduce((s, ch) => s * 31 + ch.charCodeAt(0), 7) % 100000;
  return renderBloomCard({ label: client ? `Case study. ${client}` : "Case study", title, seed }, await ogFonts());
}
