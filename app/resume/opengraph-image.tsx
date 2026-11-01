import { renderOgCard, ogSize } from "@/lib/og-card";

export const alt = "Resume | Robert Gourley";
export const runtime = "edge";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return renderOgCard("Resume", "Director of Product Design at Shield AI. Experience, skills and roles.");
}
