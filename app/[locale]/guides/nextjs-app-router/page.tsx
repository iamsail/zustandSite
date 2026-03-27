import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'guides.nextjs' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function NextJsGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'guides.nextjs' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: t('faq.workWithAppRouter.question'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.workWithAppRouter.answer'),
        },
      },
      {
        '@type': 'Question',
        name: t('faq.serverComponents.question'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.serverComponents.answer'),
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
          {t('h1')}
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          {t('subtitle')}
        </p>

        {/* The Problem */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t('challenge.title')}</h2>
          <p className="text-gray-700 mb-4">
            {t('challenge.description')}
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <p className="font-medium text-yellow-900">
              {t('challenge.warning')}
            </p>
          </div>
        </section>

        {/* The Solution */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t('solution.title')}</h2>
          <p className="text-gray-700 mb-6">
            {t('solution.description')}
          </p>

          <h3 className="text-2xl font-semibold mb-4">{t('solution.step1')}</h3>
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

          <h3 className="text-2xl font-semibold mb-4">{t('solution.step2')}</h3>
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

          <h3 className="text-2xl font-semibold mb-4">{t('solution.step3')}</h3>
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
