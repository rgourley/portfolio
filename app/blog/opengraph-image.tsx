import { ogFonts, ogSize, renderBloomCard } from "@/lib/og-bloom";

export const runtime = "edge";
export const alt = "Blog | Robert Gourley";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return renderBloomCard({ label: "Writing", title: "Notes from the work: what I learned building for pilots, underwriters, traders, and now for agents.", seed: 12 }, await ogFonts());
}
