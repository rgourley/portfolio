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

/** The post's cover from the public folder as a data URL, or null when the post has none or the path is not a local image. */
async function cover(image: string | undefined): Promise<string | null> {
  if (!image || !/^\/images\/[\w./-]+\.(jpe?g|png|webp)$/i.test(image)) return null;
  const publicDir = path.join(process.cwd(), "public"), file = path.join(publicDir, image);
  if (!file.startsWith(publicDir + path.sep)) return null;
  try {
    const data = await readFile(file);
    const mime = image.toLowerCase().endsWith(".png") ? "image/png" : image.toLowerCase().endsWith(".webp") ? "image/webp" : "image/jpeg";
    return `data:${mime};base64,${data.toString("base64")}`;
  } catch { return null; }
}

/** A post's share image: its date as the mono label, its title in the left column, and its cover filling the right part of
    the frame; a post without a cover keeps the dot field. */
export default async function OGImage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  const title = post?.title || "Writing";
  const label = post?.date ? `Writing. ${fdate(post.date)}` : "Writing";
  const seed = [...params.slug].reduce((s, ch) => s * 31 + ch.charCodeAt(0), 11) % 100000;
  const art = (await cover(post?.image)) || undefined;
  return renderBloomCard({ label, title, seed, art }, await fonts());
}
