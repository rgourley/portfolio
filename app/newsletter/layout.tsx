import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | Design Mind - Product Design, AI & Team Leadership",
  description: "Rob Gourley's weekly newsletter on product design, AI, and team leadership. Join 2,000+ designers getting actionable insights. Read by designers at Google, Airbnb, and startups worldwide.",
  keywords: ["design newsletter", "product design newsletter", "AI design tools", "design leadership", "design team building", "Design Mind newsletter"],
  openGraph: {
    title: "Design Mind Newsletter | Product Design, AI & Team Leadership",
    description: "Weekly insights on product design, AI tools, and team leadership. Join 2,000+ designers getting actionable insights.",
    url: "/newsletter",
    images: [
      {
        url: "/images/og-newsletter.jpg",
        width: 1200,
        height: 630,
        alt: "Design Mind Newsletter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Mind Newsletter",
    description: "Weekly insights on product design, AI tools, and team leadership.",
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}




