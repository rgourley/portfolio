import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  alternates: { canonical: "/resume" },
  title: "Product Design Director Resume",
  description: "Resume and experience of Robert Gourley, Director of Product Design at Shield AI. 20+ years of product design leadership experience at companies including Kraken, Federato, Crunchyroll, and more. Specializing in AI/ML products, design systems, and team building.",
  keywords: ["product design resume", "UX design experience", "design leader resume", "product design portfolio", "design director experience"],
  openGraph: {
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.robertcreative.com";

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${baseUrl}/resume`,
    name: "Robert Gourley Resume",
    mainEntity: {
      "@type": "Person",
      name: "Robert Gourley",
      url: baseUrl,
      jobTitle: "Director of Product Design",
      knowsAbout: ["Product design", "Design systems", "Design leadership", "Fintech UX", "AI product design"],
      sameAs: ["https://www.linkedin.com/in/rob-gourley/", "https://github.com/rgourley"],
    },
  };

  return (
    <>
      <StructuredData data={profileSchema} />
      {children}
    </>
  );
}

