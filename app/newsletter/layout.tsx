import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/newsletter" },
  title: "The Autonomy Report | Rob Gourley's Weekly Briefing on Agentic AI",
  description: "Daily briefing on agentic AI. Agent releases, model launches, infrastructure changes, and the work transition ahead. Join 2,000+ builders getting actionable takes.",
  keywords: ["agentic AI", "AI agents", "autonomous systems", "AI newsletter", "agent readout", "Rob Gourley"],
  openGraph: {
    title: "The Autonomy Report | Weekly Briefing on Agentic AI",
    description: "Daily briefing on agentic AI. Agent releases, model launches, infrastructure changes, and the work transition ahead.",
    url: "/newsletter",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Autonomy Report",
    description: "Rob Gourley's weekly briefing on agentic AI.",
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={pageSchema({ path: "/newsletter", name: "The Autonomy Report", description: "Daily briefing on agentic AI: agent releases, model launches and infrastructure changes.", extra: { about: "Agentic AI" } })} />
      {children}
    </>
  );
}
