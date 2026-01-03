import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides.nextjs' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function NextJsGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides.nextjs' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does Zustand work with Next.js App Router?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Zustand works with the App Router. However, since stores are global, you need to be careful when using them in Server Components to avoid sharing state between requests. The recommended approach is to create a store per request using a Context Provider.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to use Zustand in Server Components?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You cannot use Zustand hooks directly in Server Components. Instead, you should fetch data in the Server Component and pass it as props to a Client Component, or initialize a store in a Client Component provider.',
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
          Using Zustand with Next.js App Router
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          A complete guide to Server Components, SSR, and avoiding global state pollution.
        </p>

        {/* The Problem */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">The Challenge: Global State vs. SSR</h2>
          <p className="text-gray-700 mb-4">
            In a Single Page Application (SPA), a global store variable is fine. But in Next.js (SSR), 
            global variables are shared across all requests on the server. This means one user's data could 
            accidentally leak to another user if you aren't careful.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <p className="font-medium text-yellow-900">
              Warning: Do not define a global store using `create()` if you plan to initialize it with data from the server.
            </p>
          </div>
        </section>

        {/* The Solution */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">The Solution: Store Provider Pattern</h2>
          <p className="text-gray-700 mb-6">
            To ensure isolation, we create a new store instance for each request (or component tree) using React Context.
          </p>

          <h3 className="text-2xl font-semibold mb-4">1. Create the Store Factory</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-8 overflow-x-auto">
            <code>{`// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla'

export type CounterState = {
  count: number
}

export type CounterActions = {
  decrementCount: () => void
  incrementCount: () => void
}

export type CounterStore = CounterState & CounterActions

export const defaultInitState: CounterState = {
  count: 0,
}

export const createCounterStore = (initState: CounterState = defaultInitState) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }))
}`}</code>
          </pre>

          <h3 className="text-2xl font-semibold mb-4">2. Create the Provider</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-8 overflow-x-auto">
            <code>{`// src/providers/counter-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { type CounterStore, createCounterStore } from '@/stores/counter-store'

export type CounterStoreApi = ReturnType<typeof createCounterStore>

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
  undefined,
)

export interface CounterStoreProviderProps {
  children: ReactNode
}

export const CounterStoreProvider = ({
  children,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<CounterStoreApi>(null)
  if (!storeRef.current) {
    storeRef.current = createCounterStore()
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  )
}

export const useCounterStore = <T,>(
  selector: (store: CounterStore) => T,
): T => {
  const counterStoreContext = useContext(CounterStoreContext)

  if (!counterStoreContext) {
    throw new Error(\`useCounterStore must be used within CounterStoreProvider\`)
  }

  return useStore(counterStoreContext, selector)
}`}</code>
          </pre>

          <h3 className="text-2xl font-semibold mb-4">3. Use in Layout or Page</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-8 overflow-x-auto">
            <code>{`// app/layout.tsx
import { CounterStoreProvider } from '@/providers/counter-store-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CounterStoreProvider>
          {children}
        </CounterStoreProvider>
      </body>
    </html>
  )
}`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
