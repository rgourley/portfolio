import fs from "fs";
import path from "path";
import sizeOf from "image-size";

export type Dims = Record<string, { w: number; h: number }>;

/** The pixel size of every local image a markdown document refers to, so the page can lay each one out at its own shape. */
export function imageDims(markdown: string): Dims {
  const dims: Dims = {};
  const re = /!\[[^\]]*\]\(([^)\s]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(markdown))) {
    const src = m[1].split("#")[0];
    if (!src.startsWith("/") || dims[src]) continue;
    try {
      const s = sizeOf(path.join(process.cwd(), "public", src));
      if (s.width && s.height) dims[src] = { w: s.width, h: s.height };
    } catch {}
  }
  return dims;
}

export function fileDims(src: string): { w: number; h: number } | null {
  try {
    const s = sizeOf(path.join(process.cwd(), "public", src));
    return s.width && s.height ? { w: s.width, h: s.height } : null;
  } catch { return null; }
}

export function fileExists(src: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}
