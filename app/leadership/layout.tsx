import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Leadership & Consulting | Fractional Design Leadership",
  description: "Strategic design leadership for growing organizations. Fractional design leadership, design strategy & advisory, team building & hiring, and design operations & systems. Experience building teams at Shield AI, Kraken, Federato, and Crunchyroll.",
  keywords: ["fractional design leadership", "design leadership consulting", "interim design director", "design team building", "design strategy advisory", "design hiring", "design operations"],
  openGraph: {
    title: "Design Leadership & Consulting | Fractional Design Leadership",
    description: "Strategic design leadership for growing organizations. Build design teams that ship products at scale.",
    url: "/leadership",
    images: [
      {
        url: "/images/og-leadership.jpg",
        width: 1200,
        height: 630,
        alt: "Design Leadership & Consulting",
      },
    ],
  },
};

export default function LeadershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

