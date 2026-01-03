import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: 'DevTools Integration - ' + t('title'),
    description: 'Debug your Zustand store with Redux DevTools integration.',
    keywords: 'zustand devtools, zustand redux devtools, zustand debugging, zustand state inspection',
  };
}

export default async function DevtoolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'docs' });
  const d = await getTranslations({ locale, namespace: 'devtoolsPage' });

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link href={`/${locale}/docs`} className="text-primary-600 hover:underline">
            ← {t('backToDocs')}
          </Link>
        </nav>

        <h1 className="text-4xl font-bold mb-8">{t('advanced.devtools')}</h1>

        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{d('setup.title')}</h2>
            <p className="text-gray-700 mb-4">
              {d('setup.description')}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore = create(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set(
        (state) => ({ count: state.count + 1 }),
        false,
        'increment' // action name for devtools
      ),
    }),
    { name: 'MyStore' } // store name in devtools
  )
)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{d('naming.title')}</h2>
            <p className="text-gray-700 mb-4">
              {d('naming.description')}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`const useStore = create(
  devtools(
    (set) => ({
      bears: 0,
      fish: 0,
      addBear: () => set(
        (state) => ({ bears: state.bears + 1 }),
        false,
        'bears/add'  // action type
      ),
      addFish: () => set(
        (state) => ({ fish: state.fish + 1 }),
        false,
        { type: 'fish/add', qty: 1 }  // action with payload
      ),
    }),
    { name: 'AnimalStore' }
  )
)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{d('configOptions.title')}</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`devtools(
  (set) => ({ ... }),
  {
    name: 'MyStore',           // Name shown in Redux DevTools
    enabled: true,             // Enable/disable devtools (default: true in dev)
    anonymousActionType: 'anonymous', // Default action name
    serialize: {               // Custom serialization
      options: {
        map: true,
        set: true,
      },
    },
  }
)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{d('combining.title')}</h2>
            <p className="text-gray-700 mb-4">
              {d('combining.description')}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useStore = create(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set(
          (state) => ({ count: state.count + 1 }),
          false,
          'increment'
        ),
      }),
      { name: 'counter-storage' }
    ),
    { name: 'CounterStore' }
  )
)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{d('production.title')}</h2>
            <p className="text-gray-700 mb-4">
              {d('production.description')}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`const useStore = create(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    { 
      name: 'MyStore',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
)`}</code></pre>
          </section>
        </div>
      </div>
    </div>
  );
}
