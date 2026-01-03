import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides.typescript' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function TypeScriptGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides.typescript' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: t('faq.useWithTs.question'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.useWithTs.answer'),
        },
      },
      {
        '@type': 'Question',
        name: t('faq.typeActions.question'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.typeActions.answer'),
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

        {/* Basic Typing */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t('basicTyping.title')}</h2>
          <p className="text-gray-700 mb-4">
            {t('basicTyping.description')}
          </p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-8 overflow-x-auto">
            <code>{`import { create } from 'zustand'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))`}</code>
          </pre>
        </section>

        {/* Combine Middleware */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t('combine.title')}</h2>
          <p className="text-gray-700 mb-4">
            {t('combine.description')}
          </p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-8 overflow-x-auto">
            <code>{`import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useBearStore = create(
  combine({ bears: 0 }, (set) => ({
    increase: (by: number) => set((state) => ({ bears: state.bears + by })),
  })),
)
// Type is automatically inferred!`}</code>
          </pre>
        </section>

        {/* Slices Pattern */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t('slices.title')}</h2>
          <p className="text-gray-700 mb-4">
            {t('slices.description')}
          </p>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-8 overflow-x-auto">
            <code>{`import { create, StateCreator } from 'zustand'

interface BearSlice {
  bears: number
  addBear: () => void
}

interface FishSlice {
  fishes: number
  addFish: () => void
}

const createBearSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  BearSlice
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
})

const createFishSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  FishSlice
> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})

const useBoundStore = create<BearSlice & FishSlice>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}))`}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
