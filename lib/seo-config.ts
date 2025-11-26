const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zustand-site.vercel.app';

export const defaultSEO = {
  titleTemplate: '%s | Zustand Tutorial',
  defaultTitle: 'Zustand - Simple and Scalable State Management for React',
  description: 'Learn Zustand, a small, fast and scalable state management solution for React. Complete documentation, tutorials, and examples.',
  canonical: siteUrl,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    site_name: 'Zustand Tutorial',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Zustand State Management',
      },
    ],
  },
  twitter: {
    handle: '@zustand',
    site: '@zustand',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'zustand, react, state management, hooks, tutorial, documentation',
    },
    {
      name: 'author',
      content: 'Zustand Tutorial',
    },
  ],
};
