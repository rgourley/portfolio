import type { Metadata } from "next";
import Link from "next/link";
import FontAuditTool from "@/components/FontAuditTool";
import StructuredData from "@/components/StructuredData";

const PAGE_PATH = "/tools/font-sizes";

export const metadata: Metadata = {
  title: "Font Size Checker Bookmarklet",
  description:
    "Drag one button to your bookmarks bar, click it on any web page, and see every font size, weight, family and line height in use, with a count for each. Copy the result as CSS or JSON.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Font Size Checker Bookmarklet",
    description: "List every font size, weight and line height on any web page. One click, no extension.",
    url: PAGE_PATH,
  },
};

export default function FontSizesPage(): JSX.Element {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.robertcreative.com";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Font size checker bookmarklet",
    url: `${baseUrl}${PAGE_PATH}`,
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Person", name: "Robert Gourley", url: baseUrl },
  };

  return (
    <article className="pt-32 pb-20">
      <StructuredData data={appSchema} />
      <div className="max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-16">
        <h1 className="font-display text-6xl md:text-7xl font-semibold mb-8 leading-[1.0] tracking-[-0.02em]">
          Font size checker
        </h1>
        <p className="text-[21px] text-foreground/65 font-light leading-[1.7] max-w-[900px] mb-10">
          Drag the Font audit button to your bookmarks bar. Open any page, click the bookmark, and a panel lists every
          font size, weight, family and line height in use, with how many text elements use each. Click it again to
          close the panel.
        </p>

        <FontAuditTool />

        <h2 className="font-display text-3xl font-semibold mt-16 mb-4">What it counts</h2>
        <p className="text-[21px] text-foreground/65 font-light leading-[1.7] max-w-[900px] mb-6">
          Only elements that hold text directly. A wrapper div with no words of its own is skipped, so the counts
          reflect what a reader sees. Hidden elements are skipped too. Sizes are the computed pixel values, so a
          heading set in rem shows as the pixels it renders at.
        </p>
        <p className="text-[21px] text-foreground/65 font-light leading-[1.7] max-w-[900px] mb-6">
          I ran it on 95 software pricing pages. The median page uses 13 distinct font sizes. The range is 6 to 29,
          and Vantage Fit sits at the top. A type scale usually has 6 to 9 steps, so more than half of those pages use
          more sizes than a scale would give them.
        </p>

        <h2 className="font-display text-3xl font-semibold mt-16 mb-4">If the bookmark does nothing</h2>
        <p className="text-[21px] text-foreground/65 font-light leading-[1.7] max-w-[900px] mb-6">
          Some sites block bookmarklets with a content security policy. On those, use the console snippet instead:
          copy it with the button above, open DevTools, paste it into the Console and press Enter. The write-up
          for the console route is in{" "}
          <Link href="/blog/find-all-font-sizes" className="underline hover:text-foreground">
            Quickly find all font sizes used on a web page
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
