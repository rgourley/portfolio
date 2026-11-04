import { ogFonts, ogSize, renderBloomCard } from "@/lib/og-bloom";

export const runtime = "edge";
export const alt = "Projects | Robert Gourley";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return renderBloomCard({ label: "Projects", title: "Things I build outside work, mostly for agents and markets.", seed: 16 }, await ogFonts());
}
