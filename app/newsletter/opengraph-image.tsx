import { renderOgCard, ogSize } from "@/lib/og-card";

export const alt = "The Autonomy Report | Robert Gourley";
export const runtime = "edge";
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return renderOgCard("The Autonomy Report", "A weekly briefing on autonomous systems and AI.");
}
