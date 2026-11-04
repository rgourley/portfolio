import { ogFonts, ogSize, renderBloomCard } from "@/lib/og-bloom";

export const runtime = "edge";
export const alt = "Market Coaster. Ride a real stock chart as a 3D roller coaster.";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return renderBloomCard({ label: "Project. Market Coaster", title: "Ride a real stock chart as a 3D roller coaster.", seed: 24 }, await ogFonts());
}
