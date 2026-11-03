import { ogFonts, ogSize, renderBloomCard } from "@/lib/og-bloom";

export const runtime = "edge";
export const alt = "Font Size Checker | Robert Gourley";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return renderBloomCard({ label: "Tool", title: "A free bookmarklet to find every font size on a web page.", seed: 22 }, await ogFonts());
}
