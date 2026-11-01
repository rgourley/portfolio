import { SITE_URL } from "@/lib/site";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absUrl(pathOrUrl: string | undefined): string | undefined {
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

// Points at the Person defined on the homepage, so every page describes the same author.
export const personRef = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Robert Gourley",
  url: SITE_URL,
};

export function breadcrumbSchema(items: [name: string, path: string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"], ...items].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path === "/" ? "" : path}`,
    })),
  };
}

interface PageSchemaOptions {
  type?: string;
  path: string;
  name: string;
  description: string;
  crumbs?: [name: string, path: string][];
  extra?: Record<string, unknown>;
}

// One JSON-LD graph per page: the page itself, its breadcrumb, and anything page-specific.
export function pageSchema({ type = "WebPage", path, name, description, crumbs, extra }: PageSchemaOptions) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        ...extra,
      },
      breadcrumbSchema(crumbs ?? [[name, path]]),
    ],
  };
}
