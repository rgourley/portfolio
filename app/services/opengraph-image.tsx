import { renderOgCard, ogSize } from "@/lib/og-card";

export const alt = "Services | Robert Gourley";
export const runtime = "edge";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return renderOgCard("Services", "Product design and strategy consulting for complex products.");
}
