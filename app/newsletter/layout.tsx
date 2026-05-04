import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Autonomy Report | Rob Gourley's Weekly Briefing on Agentic AI",
  description: "Daily briefing on agentic AI. Agent releases, model launches, infrastructure changes, and the work transition ahead. Join 2,000+ builders getting actionable takes.",
  keywords: ["agentic AI", "AI agents", "autonomous systems", "AI newsletter", "agent readout", "Rob Gourley"],
  openGraph: {
    title: "The Autonomy Report | Weekly Briefing on Agentic AI",
    description: "Daily briefing on agentic AI. Agent releases, model launches, infrastructure changes, and the work transition ahead.",
    url: "/newsletter",
    images: [
      {
        url: "/images/og-newsletter.jpg",
        width: 1200,
        height: 630,
        alt: "The Autonomy Report",
      },
    ],
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
  return children;
}
