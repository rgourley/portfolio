import { renderOgCard, ogSize } from "@/lib/og-card";

export const alt = "Work | Robert Gourley";
export const runtime = "edge";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return renderOgCard("Work", "Case studies in AI, autonomous systems, fintech and streaming.");
}
