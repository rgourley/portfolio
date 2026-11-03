import { ogFonts, ogSize, renderBloomCard } from "@/lib/og-bloom";

export const runtime = "edge";
export const alt = "Resume | Robert Gourley";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return renderBloomCard({ label: "Resume", title: "Product designer who builds the agent systems teams ship with.", seed: 20 }, await ogFonts());
}
