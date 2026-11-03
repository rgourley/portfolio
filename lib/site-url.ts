/* The site's origin, on its own so the middleware (edge runtime, no fs) can import it without the content loaders. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.robertcreative.com";
