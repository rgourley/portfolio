import { ogFonts, ogSize, renderBloomCard } from "@/lib/og-bloom";

export const runtime = "edge";
export const alt = "Quant Garage. Pro research. No terminal.";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return renderBloomCard({ label: "Project. Quant Garage", title: "Pro research. No terminal.", seed: 18 }, await ogFonts());
}
