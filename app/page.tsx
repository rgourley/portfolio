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
  title: "Product Design & Strategy | Turning Complexity Into Products People Love",
  description: "Product designer and design leader with 20 years of experience building systems that make the complex feel effortless. Specializing in autonomous AI, fintech, and enterprise products. Formerly at Shield AI, Kraken, Federato, and Crunchyroll.",
  keywords: ["product design", "UX design", "design leadership", "autonomous systems", "AI product design", "fintech design", "design strategy", "product strategy"],
  openGraph: {
    title: "Robert Gourley - Product Design & Strategy",
    description: "Turning complexity into products people love. Product designer and design leader specializing in complex technical products.",
    url: "/",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Robert Gourley - Product Design Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Gourley - Product Design & Strategy",
    description: "Turning complexity into products people love.",
  },
};

export default function Home() {
  const featuredWork = getFeaturedWork();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Robert Gourley",
    jobTitle: "Director of Product Design",
    worksFor: {
      "@type": "Organization",
      name: "Shield AI",
    },
    url: baseUrl,
    sameAs: [
      "https://linkedin.com/in/robertgourley",
      "https://github.com/rgourley",
    ],
    description: "Product designer and design leader specializing in complex technical products. Experience building design teams and shipping products at scale.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Robert Gourley - Product Design & Strategy",
    url: baseUrl,
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

