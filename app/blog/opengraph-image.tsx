import { renderOgCard, ogSize } from "@/lib/og-card";

export const alt = "Blog | Robert Gourley";
export const runtime = "edge";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return renderOgCard("Blog", "Design, product development and AI.");
}
