import { renderOgCard, ogSize } from "@/lib/og-card";

export const alt = "Design Leadership | Robert Gourley";
export const runtime = "edge";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return renderOgCard("Design Leadership", "Fractional design leadership for teams building complex products.");
}
