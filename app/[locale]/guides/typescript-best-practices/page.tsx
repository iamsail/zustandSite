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
        name: 'How to use Zustand with TypeScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can use Zustand with TypeScript by defining an interface for your state and actions, and then passing that interface to the `create` function: `create<MyState>()(...)`.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to type actions in Zustand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Actions should be defined as part of your store interface. For example: `increment: () => void`. Inside the implementation, TypeScript will automatically infer the types of `set` and `get`.',
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
          TypeScript Best Practices
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          The ultimate guide to type-safe state management with Zustand.
        </p>

        {/* Basic Typing */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Basic Typing</h2>
          <p className="text-gray-700 mb-4">
            The most common way to type a store is to define an interface that includes both state and actions.
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
          <h2 className="text-3xl font-bold mb-6">Using `combine` (Inferred Types)</h2>
          <p className="text-gray-700 mb-4">
            If you prefer not to write interfaces manually, you can use the `combine` middleware to infer types from your initial state.
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
          <h2 className="text-3xl font-bold mb-6">Slices Pattern with TypeScript</h2>
          <p className="text-gray-700 mb-4">
            When splitting your store into slices, you need to define the StateCreator type properly.
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
