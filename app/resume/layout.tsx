import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/resume" },
  title: "Resume | Product Design Leader Experience & Skills",
  description: "Resume and experience of Robert Gourley, Director of Product Design at Shield AI. 20+ years of product design leadership experience at companies including Kraken, Federato, Crunchyroll, and more. Specializing in AI/ML products, design systems, and team building.",
  keywords: ["product design resume", "UX design experience", "design leader resume", "product design portfolio", "design director experience"],
  openGraph: {
    images: ["/opengraph-image"],
    title: "Resume | Product Design Leader Experience & Skills",
    description: "20+ years of product design leadership experience. Currently Director of Product Design at Shield AI.",
    url: "/resume",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

