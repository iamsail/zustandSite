import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zustand.site';
  const locales = ['en', 'zh', 'ja'];
  const pages = [
    '',
    '/docs',
    '/tutorial',
    '/examples',
    '/api',
    '/docs/middleware',
    '/docs/persist',
    '/docs/devtools',
    '/docs/immer',
    '/blog',
    '/faq',
    '/compare',
    '/comparison/redux-vs-zustand',
    '/guides',
    '/guides/nextjs-app-router',
    '/guides/persistence-and-middleware',
    '/guides/typescript-best-practices'
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      });
    });
  });

  return sitemap;
}
