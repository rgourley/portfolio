import { renderOgCard, ogSize } from "@/lib/og-card";

export const alt = "Font Size Checker | Robert Gourley";
export const runtime = "edge";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return renderOgCard("Font Size Checker", "A free bookmarklet to find every font size on a web page.");
}
