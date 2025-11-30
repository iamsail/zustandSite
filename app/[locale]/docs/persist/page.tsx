import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: 'Persist Middleware - ' + t('title'),
    description: 'Learn how to persist Zustand state to localStorage, sessionStorage, or custom storage.',
    keywords: 'zustand persist, zustand localStorage, zustand sessionStorage, zustand state persistence',
  };
}

export default async function PersistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'docs' });

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link href={`/${locale}/docs`} className="text-primary-600 hover:underline">
            ← {t('backToDocs') || 'Back to Documentation'}
          </Link>
        </nav>

        <h1 className="text-4xl font-bold mb-8">{t('advanced.persist')}</h1>

        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
            <p className="text-gray-700 mb-4">
              The persist middleware automatically saves your state to storage and rehydrates it on page load:
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: 'counter-storage', // unique name for localStorage key
    }
  )
)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Configuration Options</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`persist(
  (set) => ({ ... }),
  {
    name: 'storage-key',        // required: storage key name
    storage: createJSONStorage(() => sessionStorage), // optional: use sessionStorage
    partialize: (state) => ({ count: state.count }),  // optional: persist only specific fields
    version: 1,                 // optional: version for migrations
    migrate: (persistedState, version) => {           // optional: migration function
      // migrate old state to new version
      return persistedState
    },
  }
)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Using sessionStorage</h2>
            <p className="text-gray-700 mb-4">
              By default, persist uses localStorage. To use sessionStorage:
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Partial Persistence</h2>
            <p className="text-gray-700 mb-4">
              Only persist specific parts of your state:
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`const useStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      tempData: null, // won't be persisted
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }),
    }
  )
)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Hydration</h2>
            <p className="text-gray-700 mb-4">
              Handle the hydration state to avoid hydration mismatches in SSR:
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`const useStore = create(
  persist(
    (set) => ({
      count: 0,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'counter-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)

// In your component
function Counter() {
  const hasHydrated = useStore((state) => state._hasHydrated)
  const count = useStore((state) => state.count)

  if (!hasHydrated) {
    return <div>Loading...</div>
  }

  return <div>Count: {count}</div>
}`}</code></pre>
          </section>
        </div>
      </div>
    </div>
  );
}
