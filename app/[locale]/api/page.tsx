import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: 'API Reference - ' + t('title'),
    description: 'Complete Zustand API reference including create, set, get, and middleware functions.',
    keywords: t('keywords'),
  };
}

export default function ApiPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">API Reference</h1>

        <div className="space-y-12">
          {/* create */}
          <section>
            <h2 className="text-3xl font-bold mb-4">create()</h2>
            <p className="text-gray-600 mb-4">
              Creates a store with the given state creator function.
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
                <h3 className="font-semibold mb-2">Parameters</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><code>stateCreator</code> - Function that receives set, get, and api</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold mb-2">Returns</h3>
                <p>A React hook that can be used to access the store</p>
              </div>
            </div>
          </section>

          {/* set */}
          <section>
            <h2 className="text-3xl font-bold mb-4">set()</h2>
            <p className="text-gray-600 mb-4">
              Updates the store state. Can be called with a partial state object or an updater function.
            </p>
            <pre><code>{`// Partial update
set({ count: 1 })

// Updater function
set((state) => ({ count: state.count + 1 }))

// Replace entire state (not recommended)
set({ count: 0 }, true)`}</code></pre>
            
            <div className="mt-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold mb-2">Parameters</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><code>partial</code> - Partial state object or updater function</li>
                  <li><code>replace</code> - (optional) Replace entire state instead of merging</li>
                </ul>
              </div>
            </div>
          </section>

          {/* get */}
          <section>
            <h2 className="text-3xl font-bold mb-4">get()</h2>
            <p className="text-gray-600 mb-4">
              Gets the current state. Useful in actions or outside of React components.
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
            <h2 className="text-3xl font-bold mb-4">subscribe()</h2>
            <p className="text-gray-600 mb-4">
              Subscribe to state changes. Called whenever the state updates.
            </p>
            <pre><code>{`const unsubscribe = useStore.subscribe(
  (state) => console.log('State changed:', state)
)

// Later...
unsubscribe()`}</code></pre>
          </section>

          {/* Middleware */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Middleware</h2>
            
            <h3 className="text-2xl font-semibold mb-4 mt-6">persist()</h3>
            <p className="text-gray-600 mb-4">
              Persists store state to localStorage or sessionStorage.
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

            <h3 className="text-2xl font-semibold mb-4 mt-8">devtools()</h3>
            <p className="text-gray-600 mb-4">
              Enables Redux DevTools integration for debugging.
            </p>
            <pre><code>{`import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore = create(
  devtools((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
  }))
)`}</code></pre>

            <h3 className="text-2xl font-semibold mb-4 mt-8">immer()</h3>
            <p className="text-gray-600 mb-4">
              Enables Immer for easier immutable updates.
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
            <h2 className="text-3xl font-bold mb-4">Selectors</h2>
            <p className="text-gray-600 mb-4">
              Select specific parts of state to optimize re-renders.
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
