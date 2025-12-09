import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
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
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Robert Gourley - Product Design & Strategy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Gourley - Product Design & Strategy",
    description: "Product designer and design leader specializing in complex technical products.",
    images: ["/images/og-image.jpg"],
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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} data-theme="dark">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MC70FP4W2T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MC70FP4W2T');
          `}
        </Script>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

