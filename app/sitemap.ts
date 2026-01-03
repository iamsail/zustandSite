import { MetadataRoute } from 'next';

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
    '/compare'
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
