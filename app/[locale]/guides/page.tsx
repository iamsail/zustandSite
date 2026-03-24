import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'guidesPage.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function GuidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'guides' });
  const tPage = await getTranslations({ locale, namespace: 'guidesPage' });
  const tComparison = await getTranslations({ locale, namespace: 'comparison' });

  const guides = [
    {
      title: t('nextjs.title'),
      description: t('nextjs.description'),
      href: `/${locale}/guides/nextjs-app-router`,
      color: 'bg-black',
    },
    {
      title: t('middleware.title'),
      description: t('middleware.description'),
      href: `/${locale}/guides/persistence-and-middleware`,
      color: 'bg-purple-600',
    },
    {
      title: t('typescript.title'),
      description: t('typescript.description'),
      href: `/${locale}/guides/typescript-best-practices`,
      color: 'bg-blue-600',
    },
    {
      title: tComparison('reduxVsZustand.title'),
      description: tComparison('reduxVsZustand.description'),
      href: `/${locale}/comparison/redux-vs-zustand`,
      color: 'bg-red-600',
    },
  ];

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">{tPage('title')}</h1>
        <p className="text-xl text-gray-600 mb-12">
          {tPage('description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="block group h-full"
            >
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className={`${guide.color} h-2 w-full`} />
                <div className="p-6 flex-1">
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-gray-600">
                    {guide.description}
                  </p>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <span className="text-primary-600 font-medium flex items-center">
                    {tPage('readGuide')}
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
