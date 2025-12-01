import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: 'Blog - ' + t('title'),
    description: 'Latest articles, tutorials, and tips about Zustand state management for React applications.',
    keywords: 'zustand blog, react state management tips, zustand tutorials, zustand best practices',
  };
}

// Blog posts data
const blogPosts = [
  {
    id: 'zustand-vs-context',
    date: '2025-11-28',
    readTime: 5,
  },
  {
    id: 'performance-optimization',
    date: '2025-11-25',
    readTime: 7,
  },
  {
    id: 'typescript-patterns',
    date: '2025-11-20',
    readTime: 8,
  },
  {
    id: 'testing-zustand',
    date: '2025-11-15',
    readTime: 6,
  },
  {
    id: 'server-side-rendering',
    date: '2025-11-10',
    readTime: 5,
  },
];

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-theme-secondary mb-12">
          {t('description')}
        </p>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="border border-theme rounded-lg p-6 bg-theme-card hover:shadow-theme-md transition-shadow"
            >
              <div className="flex items-center text-sm text-theme-tertiary mb-3">
                <time dateTime={post.date}>{post.date}</time>
                <span className="mx-2">•</span>
                <span>{post.readTime} {t('minRead')}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3 text-theme-primary">
                <Link 
                  href={`/${locale}/blog/${post.id}`}
                  className="hover:underline"
                  style={{ color: 'var(--primary-600)' }}
                >
                  {t(`posts.${post.id}.title`)}
                </Link>
              </h2>
              <p className="text-theme-secondary mb-4">
                {t(`posts.${post.id}.excerpt`)}
              </p>
              <Link 
                href={`/${locale}/blog/${post.id}`}
                className="inline-flex items-center font-medium"
                style={{ color: 'var(--primary-600)' }}
              >
                {t('readMore')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 p-8 rounded-lg bg-theme-secondary border border-theme text-center">
          <h2 className="text-2xl font-bold mb-4">{t('newsletter.title')}</h2>
          <p className="text-theme-secondary mb-6">{t('newsletter.description')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('newsletter.placeholder')}
              className="flex-1 px-4 py-2 rounded-lg border border-theme bg-theme-primary text-theme-primary focus:outline-none focus:ring-2"
            />
            <button className="btn-primary">
              {t('newsletter.button')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
