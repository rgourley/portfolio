import { renderOgCard, ogSize } from "@/lib/og-card";

export const alt = "About | Robert Gourley";
export const runtime = "edge";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return renderOgCard("About", "Product designer and design leader. 20+ years on complex technical products.");
}
