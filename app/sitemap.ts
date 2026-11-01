import { MetadataRoute } from 'next';
import { getAllWork } from '@/lib/content';
import { getAllBlogPosts } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.robertcreative.com';
  
  const toDate = (d?: string) => (d ? new Date(d) : undefined);
  const latest = (dates: (string | undefined)[]) => {
    const times = dates.filter(Boolean).map((d) => new Date(d as string).getTime()).filter((t) => !isNaN(t));
    return times.length ? new Date(Math.max(...times)) : undefined;
  };
  const allWork = getAllWork();
  const allPosts = getAllBlogPosts();
  const workUpdated = latest(allWork.map((w) => w.date));
  const blogUpdated = latest(allPosts.map((p) => p.updated || p.date));
  const siteUpdated = latest([workUpdated?.toISOString(), blogUpdated?.toISOString()]);
  // Only pages whose freshness we can derive get a lastmod; a made-up date is worse than none.
  const lastModifiedFor: Record<string, Date | undefined> = {
    '': siteUpdated,
    '/work': workUpdated,
    '/blog': blogUpdated,
  };

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
            changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
            changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
            changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
            changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/leadership`,
            changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/coaster`,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/coaster/about`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/city`,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
            changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resume`,
            changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
            changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/newsletter`,
            changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
            changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/quant-garage`,
            changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/financial-ui-suite`,
            changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/proxies`,
            changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/font-sizes`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/amphora`,
            changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/amphora/updates`,
            changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Dynamic work pages
  const workPages = allWork.map((work) => ({
    url: `${baseUrl}/work/${work.slug}`,
    lastModified: work.date ? new Date(work.date) : undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic blog pages
  const blogPages = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: toDate(post.updated || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const staticWithDates = staticPages.map((page) => ({
    ...page,
    lastModified: lastModifiedFor[page.url.slice(baseUrl.length)],
  }));

  return [...staticWithDates, ...workPages, ...blogPages];
}

