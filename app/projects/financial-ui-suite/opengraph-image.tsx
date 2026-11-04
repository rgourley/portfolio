import { ogFonts, ogSize, renderBloomCard } from "@/lib/og-bloom";

export const runtime = "edge";
export const alt = "Financial UI Suite: a Claude Code plugin";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return renderBloomCard({ label: "Project. Financial UI Suite", title: "Financial UI, 14 styles. No AI defaults.", seed: 17 }, await ogFonts());
}
