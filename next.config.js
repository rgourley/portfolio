// Pages with a markdown twin at /md/<page>; the same list as lib/md-routes.ts.
const MD_PAGES = [
  'about', 'resume', 'contact', 'newsletter', 'leadership', 'services', 'projects', 'projects/proxies',
  'projects/quant-garage', 'projects/financial-ui-suite', 'coaster/about', 'tools/font-sizes', 'work', 'blog',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'uploads-ssl.webflow.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression
  compress: true,
  // Optimize production builds
  swcMinify: true,
  // Enable React strict mode for better performance
  reactStrictMode: true,
  // Optimize fonts
  optimizeFonts: true,
  // Enable static page generation optimizations
  poweredByHeader: false,
  // Optimize bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  async headers() {
    // The markdown twins, llms.txt, the feed and the sitemap are built with the site and change only on deploy: a CDN
    // keeps them for a day and serves the old copy while it fetches a new one; a client keeps them for five minutes.
    const text = { key: 'Cache-Control', value: 'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800' };
    return [
      // Market Coaster sounds never change in place, so browsers keep them for 30 days
      {
        source: '/coaster/:file(.*\\.(?:mp3|mp4))',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, immutable' }],
      },
      // The site's font, self-hosted; a new file gets a new name, so this one can be kept for a year
      { source: '/fonts/:file*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/md', headers: [text] },
      { source: '/md/:path*', headers: [text] },
      { source: '/:path*.md', headers: [text] },
      { source: '/llms.txt', headers: [text] },
      { source: '/llms-full.txt', headers: [text] },
      { source: '/feed.xml', headers: [text] },
      { source: '/sitemap.xml', headers: [text] },
      { source: '/.well-known/mcp.json', headers: [text] },
    ];
  },
  async rewrites() {
    return [
      // Markdown copies of posts and case studies for LLMs and agents: /blog/<slug>.md
      { source: '/blog/:slug.md', destination: '/md/blog/:slug' },
      { source: '/work/:slug.md', destination: '/md/work/:slug' },
      // Every other page too: /about.md, /projects/proxies.md and so on; the home is /md and /index.md
      { source: '/index.md', destination: '/md' },
      ...MD_PAGES.map((p) => ({ source: `/${p}.md`, destination: `/md/${p}` })),
      { source: '/amphora', destination: '/amphora/index.html' },
      { source: '/amphora/updates', destination: '/amphora/updates/index.html' },
      { source: '/coaster', destination: '/coaster/index.html' },
      // Market City is its own Vercel project. The rewrite serves it at /city on this domain.
      { source: '/city', destination: 'https://market-city-tau.vercel.app/' },
      { source: '/city/:path*', destination: 'https://market-city-tau.vercel.app/:path*' },
    ];
  },
  async redirects() {
    return [
      {
        source: '/financial-ui-suite',
        destination: '/projects/financial-ui-suite',
        permanent: true,
      },
      {
        source: '/quant-garage',
        destination: '/projects/quant-garage',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

