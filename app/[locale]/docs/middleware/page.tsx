import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: 'Middleware - ' + t('title'),
    description: 'Learn how to extend Zustand with middleware for logging, persistence, devtools, and more.',
    keywords: 'zustand middleware, zustand logging, zustand persist, zustand devtools',
  };
}

export default async function MiddlewarePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'docs' });
  const m = await getTranslations({ locale, namespace: 'middlewarePage' });

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link href={`/${locale}/docs`} className="text-primary-600 hover:underline">
            ← {t('backToDocs') || 'Back to Documentation'}
          </Link>
        </nav>

        <h1 className="text-4xl font-bold mb-8">{t('advanced.middleware')}</h1>

        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{m('whatIs.title')}</h2>
            <p className="text-gray-700 mb-4">
              {m('whatIs.description')}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{m('custom.title')}</h2>
            <p className="text-gray-700 mb-4">
              {m('custom.description')}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`// Logger middleware
const logger = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('  applying', args)
      set(...args)
      console.log('  new state', get())
    },
    get,
    api
  )

// Usage
const useStore = create(
  logger((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
  }))
)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{m('combining.title')}</h2>
            <p className="text-gray-700 mb-4">
              {m('combining.description')}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useStore = create(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
      }),
      { name: 'counter-storage' }
    )
  )
)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{m('builtin.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href={`/${locale}/docs/persist`} className="block p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-primary-600">persist</h3>
                <p className="text-gray-600 text-sm">{m('builtin.persist')}</p>
              </Link>
              <Link href={`/${locale}/docs/devtools`} className="block p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-primary-600">devtools</h3>
                <p className="text-gray-600 text-sm">{m('builtin.devtools')}</p>
              </Link>
              <Link href={`/${locale}/docs/immer`} className="block p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-primary-600">immer</h3>
                <p className="text-gray-600 text-sm">{m('builtin.immer')}</p>
              </Link>
              <div className="block p-4 border rounded-lg">
                <h3 className="font-semibold text-gray-700">subscribeWithSelector</h3>
                <p className="text-gray-600 text-sm">{m('builtin.subscribe')}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
