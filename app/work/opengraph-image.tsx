import { ogFonts, ogSize, renderBloomCard } from "@/lib/og-bloom";

export const runtime = "edge";
export const alt = "Work | Robert Gourley";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return renderBloomCard({ label: "Work", title: "Case studies in AI, autonomous systems, fintech and streaming.", seed: 23 }, await ogFonts());
}
