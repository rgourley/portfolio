import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import BloomHome from "@/components/BloomHome";
import { agentView } from "@/lib/agent-views";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: "Robert Gourley | Head of Agentic Systems, Product Designer" },
  description: "Robert Gourley designs products, and the agent systems teams use to build them. Autonomy, machine learning, markets. 20+ years across Shield AI, Kraken, Federato, Crunchyroll and Apple.",
  keywords: ["product design", "UX design", "design leadership", "autonomous systems", "AI product design", "AI agents", "agentic systems", "fintech design", "design strategy", "Shield AI", "Massive"],
  openGraph: {
    title: "Robert Gourley - Product Design & Strategy",
    description: "Turning complexity into products people love. Product designer building AI agents, and the systems teams ship them with.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Gourley - Product Design & Strategy",
    description: "Turning complexity into products people love.",
  },
};

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.robertcreative.com';

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Robert Gourley",
    alternateName: ["Rob Gourley"],
    image: `${baseUrl}/opengraph-image`,
    knowsAbout: ["Product design", "Design leadership", "Design systems", "AI product design", "AI agents", "Autonomous systems", "Fintech UX"],
    jobTitle: "Head of Agentic Systems",
    worksFor: {
      "@type": "Organization",
      name: "Massive",
    },
    url: baseUrl,
    sameAs: [
      "https://www.linkedin.com/in/rob-gourley/",
      "https://github.com/rgourley",
      "https://uxcreative.medium.com/",
      "https://www.instagram.com/whats.up.rob/",
    ],
    description: "Product designer building AI agents, and the systems teams ship them with. Experience building design teams and shipping products at scale.",
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
      <BloomHome agent={agentView("/")} />
    </>
  );
}
