import { getTranslations, getMessages, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Blog posts data with full content
const blogPosts: Record<string, { date: string; readTime: number }> = {
  'zustand-vs-context': {
    date: '2025-11-28',
    readTime: 5,
  },
  'performance-optimization': {
    date: '2025-11-25',
    readTime: 7,
  },
  'typescript-patterns': {
    date: '2025-11-20',
    readTime: 8,
  },
  'testing-zustand': {
    date: '2025-11-15',
    readTime: 6,
  },
  'server-side-rendering': {
    date: '2025-11-10',
    readTime: 5,
  },
};

export async function generateStaticParams() {
  const slugs = Object.keys(blogPosts);
  const locales = ['en', 'zh', 'ja'];
  
  return locales.flatMap(locale => 
    slugs.map(slug => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  if (!blogPosts[slug]) {
    return { title: 'Not Found' };
  }
  
  const t = await getTranslations({ locale, namespace: 'blog' });
  const metaT = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: `${t(`posts.${slug}.title`)} - ${metaT('title')}`,
    description: t(`posts.${slug}.excerpt`),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  if (!blogPosts[slug]) {
    notFound();
  }
  
  const post = blogPosts[slug];
  const t = await getTranslations({ locale, namespace: 'blog' });
  const messages = await getMessages({ locale }) as Record<string, Record<string, string>>;
  const blogContent = messages.blogContent?.[slug] || '';

  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link 
          href={`/${locale}/blog`}
          className="inline-flex items-center text-theme-secondary hover:text-theme-primary mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('backToBlog')}
        </Link>

        {/* Article header */}
        <article>
          <header className="mb-8">
            <div className="flex items-center text-sm text-theme-tertiary mb-4">
              <time dateTime={post.date}>{post.date}</time>
              <span className="mx-2">•</span>
              <span>{post.readTime} {t('minRead')}</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-theme-primary">
              {t(`posts.${slug}.title`)}
            </h1>
            <p className="text-xl text-theme-secondary">
              {t(`posts.${slug}.excerpt`)}
            </p>
          </header>

          {/* Article content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="blog-content text-theme-primary"
              dangerouslySetInnerHTML={{ __html: blogContent }}
            />
          </div>

          {/* Share section */}
          <div className="mt-12 pt-8 border-t border-theme">
            <h3 className="text-lg font-semibold mb-4">{t('shareArticle')}</h3>
            <div className="flex gap-4">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(t(`posts.${slug}.title`))}&url=${encodeURIComponent(`https://zustand.site/${locale}/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
              >
                Twitter
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://zustand.site/${locale}/blog/${slug}`)}&title=${encodeURIComponent(t(`posts.${slug}.title`))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#0A66C2] text-white hover:opacity-90 transition-opacity"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </article>

        {/* Related posts */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{t('relatedPosts')}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(blogPosts)
              .filter(([key]) => key !== slug)
              .slice(0, 2)
              .map(([key, value]) => (
                <Link 
                  key={key}
                  href={`/${locale}/blog/${key}`}
                  className="block p-6 border border-theme rounded-lg hover:shadow-theme-md transition-shadow bg-theme-card"
                >
                  <div className="text-sm text-theme-tertiary mb-2">
                    {value.date} • {value.readTime} {t('minRead')}
                  </div>
                  <h3 className="text-lg font-semibold text-theme-primary hover:underline">
                    {t(`posts.${key}.title`)}
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
