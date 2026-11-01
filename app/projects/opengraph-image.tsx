import { renderOgCard, ogSize } from "@/lib/og-card";

export const alt = "Projects | Robert Gourley";
export const runtime = "edge";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return renderOgCard("Projects", "Tools, games and experiments from Robert Gourley.");
}
