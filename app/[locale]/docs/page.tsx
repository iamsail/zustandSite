import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'docs.meta' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function DocsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'docs' });

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

        {/* Getting Started */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">{t('gettingStarted.title')}</h2>
          
          <div className="prose max-w-none">
            <h3 className="text-2xl font-semibold mb-4">{t('gettingStarted.installation')}</h3>
            <p className="mb-4">{t('gettingStarted.installationText')}</p>
            <pre><code>npm install zustand
# or
yarn add zustand
# or
pnpm add zustand</code></pre>

            <h3 className="text-2xl font-semibold mb-4 mt-8">{t('gettingStarted.firstStore')}</h3>
            <p className="mb-4">{t('gettingStarted.firstStoreText')}</p>
            <pre><code>{`import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))`}</code></pre>

            <h3 className="text-2xl font-semibold mb-4 mt-8">{t('gettingStarted.basicUsage')}</h3>
            <p className="mb-4">{t('gettingStarted.basicUsageText')}</p>
            <pre><code>{`function Counter() {
  const count = useStore((state) => state.count)
  const increment = useStore((state) => state.increment)
  const decrement = useStore((state) => state.decrement)
  const reset = useStore((state) => state.reset)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}`}</code></pre>
          </div>
        </section>

        {/* Core Concepts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">{t('coreConcepts.title')}</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">{t('coreConcepts.store')}</h3>
              <p className="text-gray-700">{t('coreConcepts.storeDesc')}</p>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">{t('coreConcepts.state')}</h3>
              <p className="text-gray-700">{t('coreConcepts.stateDesc')}</p>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">{t('coreConcepts.actions')}</h3>
              <p className="text-gray-700">{t('coreConcepts.actionsDesc')}</p>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">{t('coreConcepts.selectors')}</h3>
              <p className="text-gray-700">{t('coreConcepts.selectorsDesc')}</p>
            </div>
          </div>
        </section>

        {/* Advanced Topics */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">{t('advanced.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{t('advanced.middleware')}</h3>
              <p className="text-gray-600 mb-4">Extend Zustand with middleware for logging, persistence, and more.</p>
              <Link href={`/${locale}/docs/middleware`} className="text-primary-600 hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{t('advanced.persist')}</h3>
              <p className="text-gray-600 mb-4">Save your state to localStorage or sessionStorage automatically.</p>
              <Link href={`/${locale}/docs/persist`} className="text-primary-600 hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{t('advanced.devtools')}</h3>
              <p className="text-gray-600 mb-4">Debug your state with Redux DevTools integration.</p>
              <Link href={`/${locale}/docs/devtools`} className="text-primary-600 hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{t('advanced.immer')}</h3>
              <p className="text-gray-600 mb-4">Use Immer for easier immutable state updates.</p>
              <Link href={`/${locale}/docs/immer`} className="text-primary-600 hover:underline">
                Learn more →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
