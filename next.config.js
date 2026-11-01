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
    return [
      // Market Coaster sounds never change in place, so browsers keep them for 30 days
      {
        source: '/coaster/:file(.*\\.(?:mp3|mp4))',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, immutable' }],
      },
    ];
  },
  async rewrites() {
    return [
      // Markdown copies of posts and case studies for LLMs and agents: /blog/<slug>.md
      { source: '/blog/:slug.md', destination: '/md/blog/:slug' },
      { source: '/work/:slug.md', destination: '/md/work/:slug' },
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

