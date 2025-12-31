import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides.middleware' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function MiddlewareGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides.middleware' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I persist Zustand state?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can use the built-in `persist` middleware. It automatically saves your state to localStorage (default), sessionStorage, or any custom storage engine like AsyncStorage or IndexedDB.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to fix hydration errors with persist?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hydration errors occur when the server HTML differs from the client HTML (which has loaded persisted state). To fix this, you can use a custom hook to only return the state after the component has mounted on the client.',
        },
      },
    ],
  };

  return (
    <div className="container-custom py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Mastering Middleware & Persistence
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Learn how to save state to LocalStorage, IndexedDB, and create custom middleware.
        </p>

        {/* Basic Persistence */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Basic Persistence</h2>
          <p className="text-gray-700 mb-4">
            The `persist` middleware enables you to store your state in a storage (e.g., localStorage, AsyncStorage, IndexedDB, etc.), 
            so that when the user reloads the page, the state is preserved.
          </p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-8 overflow-x-auto">
            <code>{`import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useBearStore = create(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)`}</code>
          </pre>
        </section>

        {/* Handling Hydration */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Handling Hydration Errors</h2>
          <p className="text-gray-700 mb-4">
            In Next.js, you might encounter hydration errors because the server renders the initial state (0 bears), 
            but the client hydrates with the persisted state (5 bears).
          </p>
          <h3 className="text-2xl font-semibold mb-4">Solution: Custom Hook</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-8 overflow-x-auto">
            <code>{`import { useState, useEffect } from 'react'

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}`}</code>
          </pre>
        </section>

        {/* Custom Storage */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Custom Storage Engines</h2>
          <p className="text-gray-700 mb-4">
            You can use any storage engine that implements `getItem`, `setItem`, and `removeItem`.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Example: IndexedDB (using idb-keyval)</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-8 overflow-x-auto">
            <code>{`import { create } from 'zustand'
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware'
import { get, set, del } from 'idb-keyval' // npm install idb-keyval

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, 'has been retrieved')
    return (await get(name)) || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, 'with value', value, 'has been saved')
    await set(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, 'has been deleted')
    await del(name)
  },
}

export const useBoundStore = create(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: 'food-storage', // unique name
      storage: createJSONStorage(() => storage),
    },
  ),
)`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
