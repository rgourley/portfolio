import { ogFonts, ogSize, renderBloomCard } from "@/lib/og-bloom";

export const runtime = "edge";
export const alt = "Open models | Robert Gourley";
export const size = ogSize;
export const contentType = "image/png";

/** The share card for the Open models hub, in the same style as the blog's and the posts'. */
export default async function OGImage() {
  return renderBloomCard(
    { label: "Open models", title: "Image generation, diffusion models and local LLMs: open models you can run yourself, tested.", seed: 7 },
    await ogFonts()
  );
}
