import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'comparison.reduxVsZustand' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function ReduxVsZustandPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'comparison.reduxVsZustand' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Zustand better than Redux?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For most applications, Zustand is considered better than Redux because it requires significantly less boilerplate code, has a smaller bundle size (1.1kB vs Redux Toolkit), and offers a simpler API without needing to wrap your app in providers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I replace Redux with Zustand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can easily replace Redux with Zustand. Zustand supports Redux DevTools and can even work alongside Redux during a migration period.',
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
          Zustand vs Redux in 2026: Why Developers Are Switching
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          A comprehensive comparison of boilerplate, performance, and developer experience.
        </p>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">At a Glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left border border-gray-200">Feature</th>
                  <th className="p-4 text-left border border-gray-200 text-blue-600 font-bold">Zustand</th>
                  <th className="p-4 text-left border border-gray-200 text-purple-600 font-bold">Redux Toolkit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border border-gray-200 font-medium">Bundle Size</td>
                  <td className="p-4 border border-gray-200 text-green-600">~1.1kB (Minified + Gzipped)</td>
                  <td className="p-4 border border-gray-200">~10kB+ (RTK + React-Redux)</td>
                </tr>
                <tr>
                  <td className="p-4 border border-gray-200 font-medium">Boilerplate</td>
                  <td className="p-4 border border-gray-200 text-green-600">Minimal (Create & Use)</td>
                  <td className="p-4 border border-gray-200">High (Slices, Reducers, Providers)</td>
                </tr>
                <tr>
                  <td className="p-4 border border-gray-200 font-medium">Context Provider</td>
                  <td className="p-4 border border-gray-200 text-green-600">Not Required</td>
                  <td className="p-4 border border-gray-200">Required</td>
                </tr>
                <tr>
                  <td className="p-4 border border-gray-200 font-medium">State Model</td>
                  <td className="p-4 border border-gray-200">Flux-like (Simplified)</td>
                  <td className="p-4 border border-gray-200">Flux (Strict)</td>
                </tr>
                <tr>
                  <td className="p-4 border border-gray-200 font-medium">Learning Curve</td>
                  <td className="p-4 border border-gray-200 text-green-600">Low</td>
                  <td className="p-4 border border-gray-200">Medium/High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Code Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Code Comparison</h2>
          <p className="mb-6 text-gray-700">
            Let's implement a simple counter with increment and decrement functionality.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Zustand */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 text-white font-bold border-b border-gray-700 flex justify-between items-center">
                <span>Zustand</span>
                <span className="text-xs bg-green-600 px-2 py-1 rounded">Simple</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{`import { create } from 'zustand'

// 1. Create Store
const useStore = create((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}))

// 2. Use Hook
function Counter() {
  const { count, inc, dec } = useStore()
  return (
    <div>
      <span>{count}</span>
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </div>
  )
}`}</code>
                </pre>
              </div>
            </div>

            {/* Redux */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 text-white font-bold border-b border-gray-700 flex justify-between items-center">
                <span>Redux Toolkit</span>
                <span className="text-xs bg-purple-600 px-2 py-1 rounded">Verbose</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{`import { createSlice, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, Provider } from 'react-redux'

// 1. Create Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    inc: state => { state.value += 1 },
    dec: state => { state.value -= 1 }
  }
})

// 2. Configure Store
const store = configureStore({
  reducer: { counter: counterSlice.reducer }
})

// 3. Wrap App
// <Provider store={store}><App /></Provider>

// 4. Use Hook
function Counter() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(counterSlice.actions.inc())}>+</button>
      <button onClick={() => dispatch(counterSlice.actions.dec())}>-</button>
    </div>
  )
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Performance */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Performance & Re-renders</h2>
          <p className="text-gray-700 mb-4">
            Zustand solves the "zombie child" problem and unnecessary re-renders out of the box.
            By using selectors, components only re-render when the specific slice of state they are listening to changes.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="font-medium text-blue-900">
              "Zustand is significantly faster because it doesn't wrap your application in a Context Provider, avoiding the Context API's re-render propagation issues."
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Conclusion: When to Switch?</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Choose Zustand if:</strong> You want a simple, fast, and unopinionated solution. You prefer hooks over providers. You want to reduce boilerplate.</li>
            <li><strong>Stick with Redux if:</strong> You have a massive enterprise codebase already heavily invested in the Redux ecosystem, or you strictly need the Flux architecture enforced by Redux.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
