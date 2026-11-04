import { ogFonts, ogSize, renderBloomCard } from "@/lib/og-bloom";

export const runtime = "edge";
export const alt = "Robert Gourley. Turning complexity into products people love.";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return renderBloomCard({ label: "Product designer building AI agents", title: "Turning complexity into products people love.", seed: 1 }, await ogFonts());
}
