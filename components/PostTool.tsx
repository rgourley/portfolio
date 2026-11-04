"use client";

import dynamic from "next/dynamic";
import LinkCards from "./LinkCards";
import type { PostPart } from "@/lib/post-html";

// Each tool is its own chunk, fetched only on the posts that use it. The dynamic imports live in
// a client component on purpose: in a server component Next bundles them into the route instead.
const SettingsExplorer = dynamic(() => import("./SettingsExplorer"));
const ModelToggle = dynamic(() => import("./ModelToggle"));
const ComboExplorer = dynamic(() => import("./ComboExplorer"));
const CropGrid = dynamic(() => import("./CropGrid"));
const IterationDots = dynamic(() => import("./IterationDots"), { ssr: false });
const PhotoSwitch = dynamic(() => import("./PhotoSwitch"));
const TestimonialBlock = dynamic(() => import("./TestimonialBlock"), {
  loading: () => <div className="h-48 bg-muted/20 animate-pulse rounded-lg" />,
});
const SolutionHighlightsCarousel = dynamic(() => import("./SolutionHighlightsCarousel"), {
  loading: () => <div className="h-64 bg-muted/20 animate-pulse rounded-lg" />,
});

export type ToolPart = Exclude<PostPart, { type: "html" }>;

/** One interactive block of a post: a settings explorer, a model toggle, link cards, and so on. */
export default function PostTool({ part }: { part: ToolPart }) {
  switch (part.type) {
    case "settings":
      return <SettingsExplorer src={part.src} />;
    case "models":
      return <ModelToggle src={part.src} scene={part.scene} />;
    case "combo":
      return <ComboExplorer src={part.src} />;
    case "crops":
      return <CropGrid src={part.src} />;
    case "iterations":
      return <IterationDots />;
    case "photos":
      return <PhotoSwitch base={part.base} alt={part.alt} />;
    case "cards":
      return <LinkCards cards={part.cards} />;
    case "testimonial":
      return <TestimonialBlock {...part.testimonial} />;
    case "highlights":
      return (
        <>
          <h2>Solution Highlights</h2>
          <SolutionHighlightsCarousel highlights={part.highlights} />
        </>
      );
  }
}
