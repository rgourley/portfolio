import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import type { Element, ElementContent, Properties, Root } from "hast";
import type { Dims } from "./image-dims";
import type { LinkCard } from "@/components/LinkCards";

/*
 * A blog post, rendered on the server. The markdown becomes HTML here, so the browser never
 * loads a markdown library. Only the tools (:::settings, :::models, and so on) are React
 * components. The zoom and copy buttons are plain HTML; PostShell wires them up after the page loads.
 */

export type Testimonial = { image: string; name: string; bio: string; quote: string };
export type Highlight = { title: string; description: string; image?: string };

export type PostPart =
  | { type: "html"; html: string }
  | { type: "highlights"; highlights: Highlight[] }
  | { type: "testimonial"; testimonial: Testimonial }
  | { type: "cards"; cards: LinkCard[] }
  | { type: "settings"; src: string }
  | { type: "models"; src: string; scene: string }
  | { type: "combo"; src: string }
  | { type: "crops"; src: string };

type Block = { type: "markdown"; content: string } | Exclude<PostPart, { type: "html" | "highlights" }>;

/** The post as a list of parts: HTML for the prose, and one part per interactive block. */
export async function renderPost(content: string, dims: Dims): Promise<PostPart[]> {
  const parts: PostPart[] = [];
  for (const block of splitBlocks(content)) {
    if (block.type !== "markdown") {
      parts.push(block);
      continue;
    }
    if (!block.content) continue;
    const { highlights, restContent, contentAfter } = parseSolutionHighlights(block.content);
    if (restContent) parts.push({ type: "html", html: await toHtml(restContent, dims) });
    if (highlights.length > 0) parts.push({ type: "highlights", highlights });
    if (contentAfter) parts.push({ type: "html", html: await toHtml(contentAfter, dims) });
  }
  return parts;
}

// Custom blocks in the markdown.
// Testimonial: :::testimonial\nimage: ...\nname: ...\nbio: ...\nquote: ...\n:::
// Link cards: :::cards\ntitle: ...\nurl: ...\nmeta: ...\ndescription: ...\n---\n(next card)\n:::
// Settings explorer: :::settings\nsrc: /data/file.json\n:::
// Model toggle: :::models\nsrc: /data/file.json\nscene: key\n:::
// Two-axis compare: :::combo\nsrc: /data/file.json\n:::
// Close-up grid: :::crops\nsrc: /data/file.json\n:::
function splitBlocks(content: string): Block[] {
  const blockRegex = /:::(testimonial|cards|settings|models|combo|crops)\n([\s\S]*?)\n:::/g;
  const blocks: Block[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const parseFields = (block: string): Record<string, string> => {
    const fields: Record<string, string> = {};
    for (const line of block.split("\n")) {
      const m = line.match(/^(\w+):\s*(.+)$/);
      if (m) fields[m[1]] = m[2].trim();
    }
    return fields;
  };

  while ((match = blockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) blocks.push({ type: "markdown", content: content.substring(lastIndex, match.index) });

    const kind = match[1];
    const f = parseFields(match[2]);
    if (kind === "testimonial") {
      blocks.push({ type: "testimonial", testimonial: { image: f.image || "", name: f.name || "", bio: f.bio || "", quote: f.quote || "" } });
    } else if (kind === "settings") {
      blocks.push({ type: "settings", src: f.src || "" });
    } else if (kind === "combo" || kind === "crops") {
      blocks.push({ type: kind, src: f.src || "" });
    } else if (kind === "models") {
      blocks.push({ type: "models", src: f.src || "", scene: f.scene || "" });
    } else {
      const cards: LinkCard[] = match[2]
        .split(/\n---\n/)
        .map((chunk) => parseFields(chunk))
        .filter((c) => c.title && c.url)
        .map((c) => ({ title: c.title, url: c.url, meta: c.meta, description: c.description }));
      blocks.push({ type: "cards", cards });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) blocks.push({ type: "markdown", content: content.substring(lastIndex) });
  if (blocks.length === 0) blocks.push({ type: "markdown", content });
  return blocks;
}

// A "## Solution Highlights" section becomes a carousel: each **Title**, an optional image, then its paragraph.
function parseSolutionHighlights(content: string): { highlights: Highlight[]; restContent: string; contentAfter: string } {
  const solutionHighlightsIndex = content.indexOf("## Solution Highlights");
  if (solutionHighlightsIndex === -1) return { highlights: [], restContent: content, contentAfter: "" };

  // The section ends at the next ## heading or the end of the content
  const afterHighlights = content.substring(solutionHighlightsIndex);
  const nextSectionMatch = afterHighlights.match(/\n## /);
  const highlightsEndIndex = nextSectionMatch ? solutionHighlightsIndex + nextSectionMatch.index! : content.length;

  const highlightsSection = content.substring(solutionHighlightsIndex + "## Solution Highlights\n\n".length, highlightsEndIndex);
  const restContent = content.substring(0, solutionHighlightsIndex).trim();
  const contentAfter = content.substring(highlightsEndIndex).trim();

  const highlights: Highlight[] = [];
  let currentTitle = "";
  let currentDescription = "";
  let currentImage = "";

  for (const line of highlightsSection.split("\n")) {
    const boldMatch = line.match(/^\*\*(.+?)\*\*$/);
    const imageMatch = line.match(/^!\[.*?\]\((.+?)\)$/);

    if (boldMatch) {
      if (currentTitle && currentDescription) {
        highlights.push({ title: currentTitle, description: currentDescription.trim(), image: currentImage || undefined });
      }
      currentTitle = boldMatch[1].trim();
      currentDescription = "";
      currentImage = "";
    } else if (imageMatch && currentTitle) {
      currentImage = imageMatch[1].trim();
    } else if (line.trim() && currentTitle && !imageMatch) {
      currentDescription += (currentDescription ? "\n" : "") + line;
    }
  }
  if (currentTitle && currentDescription) {
    highlights.push({ title: currentTitle, description: currentDescription.trim(), image: currentImage || undefined });
  }

  return { highlights, restContent, contentAfter };
}

async function toHtml(markdown: string, dims: Dims): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(articleHast, dims)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

// How wide each kind of image renders, so the browser picks the right file
const COLUMN_SIZES = "(max-width: 760px) 100vw, 760px";
const WIDE_SIZES = "(max-width: 900px) 100vw, 1100px";
const GRID_SIZES = "(max-width: 640px) 100vw, 550px";

const h = (tagName: string, properties: Properties = {}, children: ElementContent[] = []): Element => ({ type: "element", tagName, properties, children });
const text = (value: string): ElementContent => ({ type: "text", value });

function textOf(node: ElementContent | Root): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map((c) => textOf(c as ElementContent)).join("");
  return "";
}

const SAFE_PROTOCOL = /^(https?|ircs?|mailto|xmpp)$/i;
// The URL check react-markdown applied: relative URLs and a few protocols pass, anything else is dropped.
function safeUrl(value: string): string {
  const colon = value.indexOf(":");
  const questionMark = value.indexOf("?");
  const numberSign = value.indexOf("#");
  const slash = value.indexOf("/");
  if (
    colon === -1 ||
    (slash !== -1 && colon > slash) ||
    (questionMark !== -1 && colon > questionMark) ||
    (numberSign !== -1 && colon > numberSign) ||
    SAFE_PROTOCOL.test(value.slice(0, colon))
  ) {
    return value;
  }
  return "";
}

// An inline style the way React writes one: kebab-case, numbers in px, no spaces
function styleString(style: CSSProperties | undefined): string | undefined {
  if (!style) return undefined;
  const out: string[] = [];
  for (const [key, value] of Object.entries(style)) {
    if (value === undefined || value === null || value === "") continue;
    const name = key.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
    out.push(`${name}:${typeof value === "number" && value !== 0 ? `${value}px` : value}`);
  }
  return out.length ? out.join(";") : undefined;
}

// The <img> next/image would render, from its own props
function nextImg(alt: string, props: ReturnType<typeof getImageProps>["props"], nimg: "1" | "fill"): Element {
  return h("img", {
    alt,
    loading: props.loading,
    width: props.width,
    height: props.height,
    decoding: props.decoding,
    dataNimg: nimg,
    className: props.className ? [props.className] : undefined,
    style: styleString(props.style),
    sizes: props.sizes,
    srcSet: props.srcSet,
    src: props.src,
  });
}

/**
 * Turns the generic HTML into the article's markup: images in figures with a zoom button, image
 * pairs in a grid, code in a copy wrapper, tables in a scroll wrapper, external links in a new tab.
 */
function articleHast(dims: Dims) {
  // Which element replaced an image, and the source as written (so "#grid" is still visible to the paragraph check)
  const images = new WeakMap<ElementContent, string>();

  // A local image at its own shape when the page knows it, otherwise in a 16:9 frame
  const picture = (src: string, alt: string, sizes: string): Element => {
    const d = dims[src];
    if (d) {
      const { props } = getImageProps({ src, alt, width: d.w, height: d.h, sizes, className: "pic", quality: 85, loading: "lazy" });
      return nextImg(alt, props, "1");
    }
    const { props } = getImageProps({ src, alt, fill: true, sizes, style: { objectFit: "cover" }, quality: 85, loading: "lazy" });
    return h("div", { className: ["pic"], style: "position:relative;aspect-ratio:16/9;overflow:hidden" }, [nextImg(alt, props, "fill")]);
  };

  const caption = (alt: string): ElementContent[] => (alt ? [h("figcaption", {}, [text(alt)])] : []);

  // Click-to-enlarge: the button carries the original file, which the lightbox shows at full size
  const figure = (src: string, alt: string, sizes: string): Element =>
    h("figure", {}, [
      h("button", { type: "button", ariaLabel: alt ? `Enlarge image: ${alt}` : "Enlarge image", className: ["zoom"], dataSrc: src }, [picture(src, alt, sizes)]),
      ...caption(alt),
    ]);

  const image = (el: Element): Element => {
    const rawSrc = safeUrl(String(el.properties.src ?? ""));
    const alt = String(el.properties.alt ?? "");
    // "#wide" opts an image out of the reading column: full natural ratio, up to 1100px, centered on the page.
    const wide = rawSrc.endsWith("#wide");
    // "#grid" images that share a paragraph are laid out two across; each one still opens on its own.
    const grid = rawSrc.endsWith("#grid");
    const src = wide || grid ? rawSrc.replace(/#(wide|grid)$/, "") : rawSrc;

    let out: Element;
    if (grid && src.startsWith("/")) {
      out = figure(src, alt, GRID_SIZES);
    } else if (wide && src.startsWith("/")) {
      out = h("div", { className: ["wideimg"] }, [figure(src, alt, WIDE_SIZES)]);
    } else if (src.startsWith("/") || src.startsWith("./") || src.startsWith("../")) {
      const normalized = src.startsWith("./") || src.startsWith("../") ? src.replace(/^\.\//, "/").replace(/^\.\.\//, "/") : src;
      out = figure(normalized, alt, COLUMN_SIZES);
    } else {
      // External image: a plain tag
      out = h("figure", {}, [h("img", { src, alt, className: ["pic"], loading: "lazy", decoding: "async", fetchPriority: "low" }), ...caption(alt)]);
    }
    images.set(out, rawSrc);
    return out;
  };

  const isImage = (c: ElementContent) => c.type === "element" && Boolean(images.get(c) || c.properties.src || c.tagName === "img");

  const convert = (el: Element): ElementContent[] => {
    switch (el.tagName) {
      case "img":
        return [image(el)];
      case "a": {
        if (el.properties.href != null) el.properties.href = safeUrl(String(el.properties.href));
        if (String(el.properties.href ?? "").startsWith("http")) {
          el.properties.target = "_blank";
          el.properties.rel = ["noopener", "noreferrer"];
        }
        return [el];
      }
      case "pre":
        return [
          h("div", { className: ["codewrap"] }, [
            h("pre", {}, [h("code", {}, [text(textOf(el))])]),
            h("button", { type: "button", className: ["copy"] }, [text("Copy")]),
          ]),
        ];
      case "table":
        return [h("div", { className: ["tablewrap"] }, [el])];
      case "p": {
        // Images don't sit in paragraphs: a row of "#grid" images becomes a grid, any other image stands alone
        const meaningful = el.children.filter((c) => c.type !== "text" || c.value.trim());
        if (meaningful.length > 1 && meaningful.every((c) => (images.get(c) ?? "").endsWith("#grid"))) {
          return [h("div", { className: ["imggrid"] }, meaningful)];
        }
        if (el.children.some(isImage)) return el.children;
        return [el];
      }
      default:
        return [el];
    }
  };

  // Children first, so a converted element is never visited again
  const walk = (node: Root | Element): void => {
    const out: ElementContent[] = [];
    for (const child of node.children) {
      if (child.type === "element") {
        walk(child);
        out.push(...convert(child));
      } else {
        out.push(child as ElementContent);
      }
    }
    node.children = out;
  };

  return (tree: Root) => walk(tree);
}
