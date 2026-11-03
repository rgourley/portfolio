import { readFile } from "node:fs/promises";
import path from "node:path";
import { getBlogPostBySlug } from "@/lib/content";
import { fdate } from "@/lib/blog";
import { ogSize, renderBloomCard, type OgFont } from "@/lib/og-bloom";

export const alt = "A post by Robert Gourley";
export const size = ogSize;
export const contentType = "image/png";

// This route reads the post from the content folder, so it runs on Node and reads the fonts from disk the same way.
async function fonts(): Promise<OgFont[]> {
  const dir = path.join(process.cwd(), "lib", "og-fonts");
  const [light, regular, mono] = await Promise.all(["manrope-300.woff", "manrope-400.woff", "mono-600.woff"].map((f) => readFile(path.join(dir, f))));
  const buf = (b: Buffer) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;
  return [
    { name: "Manrope", data: buf(light), weight: 300, style: "normal" },
    { name: "Manrope", data: buf(regular), weight: 400, style: "normal" },
    { name: "Mono", data: buf(mono), weight: 600, style: "normal" },
  ];
}

/** A post's share image: its date as the mono label, its title filling the frame. */
export default async function OGImage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  const title = post?.title || "Writing";
  const label = post?.date ? `Writing. ${fdate(post.date)}` : "Writing";
  const seed = [...params.slug].reduce((s, ch) => s * 31 + ch.charCodeAt(0), 11) % 100000;
  return renderBloomCard({ label, title, seed }, await fonts());
}
