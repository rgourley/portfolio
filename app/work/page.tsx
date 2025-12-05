import { getAllWork } from "@/lib/content";
import WorkGrid from "@/components/WorkGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | Product Design Projects & Case Studies",
  description: "Selected projects showcasing design leadership and product innovation. Case studies from Shield AI's Hivemind autonomy platform, Kraken's trading platform, Federato's ML underwriting platform, and more.",
  keywords: ["product design portfolio", "UX case studies", "design projects", "autonomy platform design", "trading platform UX", "fintech design", "enterprise product design"],
  openGraph: {
    title: "Work | Product Design Projects & Case Studies",
    description: "Selected projects showcasing design leadership and product innovation.",
    url: "/work",
    images: [
      {
        url: "/images/og-work.jpg",
        width: 1200,
        height: 630,
        alt: "Product Design Projects & Case Studies",
      },
    ],
  },
};

export default function WorkPage() {
  const work = getAllWork();

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-12 lg:px-16">
        <div className="mb-16">
          <p className="text-base text-foreground/60 max-w-2xl">
            Selected projects showcasing design leadership and product innovation.
          </p>
        </div>
        <WorkGrid work={work} />
      </div>
    </div>
  );
}

