import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-gray-600 mb-8">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/docs`} className="btn-primary">
                {t('hero.getStarted')}
              </Link>
              <Link href={`/${locale}/tutorial`} className="btn-secondary">
                {t('hero.viewDocs')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('features.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Simple & Minimal */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">{t('features.simple.title')}</h3>
              <p className="text-gray-600">{t('features.simple.description')}</p>
            </div>

            {/* Fast & Performant */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">{t('features.fast.title')}</h3>
              <p className="text-gray-600">{t('features.fast.description')}</p>
            </div>

            {/* Scalable */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">{t('features.scalable.title')}</h3>
              <p className="text-gray-600">{t('features.scalable.description')}</p>
            </div>

            {/* TypeScript */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">{t('features.typescript.title')}</h3>
              <p className="text-gray-600">{t('features.typescript.description')}</p>
            </div>

            {/* DevTools */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold mb-2">{t('features.devtools.title')}</h3>
              <p className="text-gray-600">{t('features.devtools.description')}</p>
            </div>

            {/* Middleware */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔌</div>
              <h3 className="text-xl font-semibold mb-2">{t('features.middleware.title')}</h3>
              <p className="text-gray-600">{t('features.middleware.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('quickStart.title')}
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Step 1 */}
            <div>
              <div className="flex items-center mb-4">
                <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">1</span>
                <h3 className="text-xl font-semibold">{t('quickStart.step1')}</h3>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>npm install zustand</code>
              </pre>
            </div>

            {/* Step 2 */}
            <div>
              <div className="flex items-center mb-4">
                <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">2</span>
                <h3 className="text-xl font-semibold">{t('quickStart.step2')}</h3>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))`}</code>
              </pre>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center mb-4">
                <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">3</span>
                <h3 className="text-xl font-semibold">{t('quickStart.step3')}</h3>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`function Counter() {
  const { count, increment, decrement } = useStore()
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-primary-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-8">
              {t('cta.description')}
            </p>
            <Link href={`/${locale}/docs`} className="inline-block bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
