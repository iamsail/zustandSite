import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'apiPage.meta' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: (await getTranslations({ locale, namespace: 'meta' }))('keywords'),
  };
}

export default async function ApiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'apiPage' });

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

        <div className="space-y-12">
          {/* create */}
          <section>
            <h2 className="text-3xl font-bold mb-4">{t('create.title')}</h2>
            <p className="text-gray-600 mb-4">
              {t('create.description')}
            </p>
            <pre><code>{`import { create } from 'zustand'

const useStore = create((set, get, api) => ({
  // state
  count: 0,
  // actions
  increment: () => set((state) => ({ count: state.count + 1 })),
}))`}</code></pre>
            
            <div className="mt-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold mb-2">{t('create.parameters.title')}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><code>stateCreator</code> - {t('create.parameters.stateCreator')}</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold mb-2">{t('create.returns.title')}</h3>
                <p>{t('create.returns.description')}</p>
              </div>
            </div>
          </section>

          {/* set */}
          <section>
            <h2 className="text-3xl font-bold mb-4">{t('set.title')}</h2>
            <p className="text-gray-600 mb-4">
              {t('set.description')}
            </p>
            <pre><code>{`// Partial update
set({ count: 1 })

// Updater function
set((state) => ({ count: state.count + 1 }))

// Replace entire state (not recommended)
set({ count: 0 }, true)`}</code></pre>
            
            <div className="mt-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold mb-2">{t('set.parameters.title')}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><code>partial</code> - {t('set.parameters.partial')}</li>
                  <li><code>replace</code> - {t('set.parameters.replace')}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* get */}
          <section>
            <h2 className="text-3xl font-bold mb-4">{t('get.title')}</h2>
            <p className="text-gray-600 mb-4">
              {t('get.description')}
            </p>
            <pre><code>{`const useStore = create((set, get) => ({
  count: 0,
  double: () => {
    const currentCount = get().count
    set({ count: currentCount * 2 })
  }
}))`}</code></pre>
          </section>

          {/* subscribe */}
          <section>
            <h2 className="text-3xl font-bold mb-4">{t('subscribe.title')}</h2>
            <p className="text-gray-600 mb-4">
              {t('subscribe.description')}
            </p>
            <pre><code>{`const unsubscribe = useStore.subscribe(
  (state) => console.log('State changed:', state)
)

// Later...
unsubscribe()`}</code></pre>
          </section>

          {/* Middleware */}
          <section>
            <h2 className="text-3xl font-bold mb-4">{t('middleware.title')}</h2>
            
            <h3 className="text-2xl font-semibold mb-4 mt-6">{t('middleware.persist.title')}</h3>
            <p className="text-gray-600 mb-4">
              {t('middleware.persist.description')}
            </p>
            <pre><code>{`import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: 'counter-storage',
    }
  )
)`}</code></pre>

            <h3 className="text-2xl font-semibold mb-4 mt-8">{t('middleware.devtools.title')}</h3>
            <p className="text-gray-600 mb-4">
              {t('middleware.devtools.description')}
            </p>
            <pre><code>{`import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore = create(
  devtools((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
  }))
)`}</code></pre>

            <h3 className="text-2xl font-semibold mb-4 mt-8">{t('middleware.immer.title')}</h3>
            <p className="text-gray-600 mb-4">
              {t('middleware.immer.description')}
            </p>
            <pre><code>{`import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const useStore = create(
  immer((set) => ({
    todos: [],
    addTodo: (text) =>
      set((state) => {
        state.todos.push({ id: Date.now(), text })
      }),
  }))
)`}</code></pre>
          </section>

          {/* Selectors */}
          <section>
            <h2 className="text-3xl font-bold mb-4">{t('selectors.title')}</h2>
            <p className="text-gray-600 mb-4">
              {t('selectors.description')}
            </p>
            <pre><code>{`// Select entire state
const state = useStore()

// Select specific property
const count = useStore((state) => state.count)

// Select with transformation
const doubled = useStore((state) => state.count * 2)

// Multiple selectors
const count = useStore((state) => state.count)
const increment = useStore((state) => state.increment)`}</code></pre>
          </section>
        </div>
      </div>
    </div>
  );
}
