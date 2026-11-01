import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import { getFeaturedWork } from "@/lib/content";
import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import dynamic from "next/dynamic";

// Dynamically import below-the-fold components for better initial load
const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="h-96 bg-transparent" />,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-96 bg-transparent" />,
});
const DesignApproach = dynamic(() => import("@/components/DesignApproach"), {
  loading: () => <div className="h-96 bg-transparent" />,
});
const CTA = dynamic(() => import("@/components/CTA"), {
  loading: () => <div className="h-64 bg-transparent" />,
});

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: "Robert Gourley | Product Design Director & Design Leader" },
  description: "Robert Gourley is Director of Product Design at Shield AI. 20+ years designing complex technical products: AI/ML, autonomous systems and fintech.",
  keywords: ["product design", "UX design", "design leadership", "autonomous systems", "AI product design", "fintech design", "design strategy", "product strategy", "Shield AI", "design consulting"],
  openGraph: {
    title: "Robert Gourley - Product Design & Strategy",
    description: "Turning complexity into products people love. Product designer and design leader specializing in complex technical products.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Gourley - Product Design & Strategy",
    description: "Turning complexity into products people love.",
  },
};

export default function Home() {
  const featuredWork = getFeaturedWork();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.robertcreative.com';

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Robert Gourley",
    alternateName: ["Rob Gourley"],
    image: `${baseUrl}/opengraph-image`,
    knowsAbout: ["Product design", "Design leadership", "Design systems", "AI product design", "Autonomous systems", "Fintech UX"],
    jobTitle: "Director of Product Design",
    worksFor: {
      "@type": "Organization",
      name: "Shield AI",
    },
    url: baseUrl,
    sameAs: [
      "https://www.linkedin.com/in/rob-gourley/",
      "https://github.com/rgourley",
      "https://uxcreative.medium.com/",
      "https://www.instagram.com/whats.up.rob/",
    ],
    description: "Product designer and design leader specializing in complex technical products. Experience building design teams and shipping products at scale.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: "Robert Gourley",
    alternateName: ["Rob Gourley", "robertcreative.com", "Robert Gourley - Product Design & Strategy"],
    url: baseUrl,
    inLanguage: "en-US",
    publisher: { "@id": `${baseUrl}/#person` },
    description: "Product designer and design leader specializing in complex technical products.",
  };

  return (
    <>
      <StructuredData data={personSchema} />
      <StructuredData data={websiteSchema} />
      <div className="flex flex-col">
        <Hero />
        <FeaturedWork featuredWork={featuredWork} />
        <About />
        <DesignApproach />
        <Testimonials />
        <CTA />
      </div>
    </>
  );
}

