import { ogFonts, ogSize, renderBloomCard } from "@/lib/og-bloom";

export const runtime = "edge";
export const alt = "The Autonomy Report | Robert Gourley";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return renderBloomCard({ label: "Newsletter", title: "The Autonomy Report: a weekly briefing on agentic AI.", seed: 15 }, await ogFonts());
}
