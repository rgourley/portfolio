import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Corner from "@/components/Corner";
import Valve from "@/components/Valve";
import { ModeProvider } from "@/components/ModeProvider";
import PostHogProvider from "@/components/PostHogProvider";
import Analytics from "@/components/Analytics";

// Manrope, self-hosted so no build depends on a font download: the Latin subset, with the weight axis cut to the 300 to 600
// the stylesheet uses (the corner header and labels at 600, the headlines at 300, the emphasis at 400).
const manrope = localFont({
  src: "../public/fonts/manrope.woff2",
  weight: "300 600",
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.robertcreative.com'),
  title: {
    default: "Robert Gourley - Product Design & Strategy",
    template: "%s | Robert Gourley"
  },
  description: "Product designer and design leader specializing in complex technical products. Experience building design teams and shipping products at scale for companies like Shield AI, Kraken, Federato, and Crunchyroll.",
  keywords: ["product design", "UX design", "design leadership", "product strategy", "design systems", "user experience", "autonomous systems", "fintech design", "design consulting"],
  authors: [{ name: "Robert Gourley" }],
  creator: "Robert Gourley",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Robert Gourley - Product Design & Strategy",
    title: "Robert Gourley - Product Design & Strategy",
    description: "Product designer and design leader specializing in complex technical products. Experience building design teams and shipping products at scale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Gourley - Product Design & Strategy",
    description: "Product designer and design leader specializing in complex technical products.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "Robert Gourley" }] },
  },
};

// Runs before paint, so a dark-mode reader never sees a flash of paper. A ?mode=dark or ?mode=light in a shared link
// wins for that visit without being saved; then a choice made with the dot; otherwise the page follows the system,
// which already switches with the day on most devices.
const modeScript = `try{var q=new URLSearchParams(location.search).get('mode'),m=q==='dark'||q==='light'?q:localStorage.getItem('mode');if(m!=='dark'&&m!=='light')m=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(m==='dark')document.documentElement.setAttribute('data-mode','dark')}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      </head>
      <body>
        <PostHogProvider>
          <Analytics />
          <ModeProvider>
            <Corner />
            {children}
            <Valve />
          </ModeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
