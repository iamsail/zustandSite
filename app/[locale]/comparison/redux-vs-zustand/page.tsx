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
        name: t('faq.better.question'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.better.answer'),
        },
      },
      {
        '@type': 'Question',
        name: t('faq.replace.question'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.replace.answer'),
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

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t('atAGlance.title')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left border border-gray-200">{t('atAGlance.table.feature')}</th>
                  <th className="p-4 text-left border border-gray-200 text-blue-600 font-bold">{t('atAGlance.table.zustand')}</th>
                  <th className="p-4 text-left border border-gray-200 text-purple-600 font-bold">{t('atAGlance.table.redux')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border border-gray-200 font-medium">{t('atAGlance.table.bundleSize')}</td>
                  <td className="p-4 border border-gray-200 text-green-600">{t('atAGlance.table.bundleSizeZustand')}</td>
                  <td className="p-4 border border-gray-200">{t('atAGlance.table.bundleSizeRedux')}</td>
                </tr>
                <tr>
                  <td className="p-4 border border-gray-200 font-medium">{t('atAGlance.table.boilerplate')}</td>
                  <td className="p-4 border border-gray-200 text-green-600">{t('atAGlance.table.boilerplateZustand')}</td>
                  <td className="p-4 border border-gray-200">{t('atAGlance.table.boilerplateRedux')}</td>
                </tr>
                <tr>
                  <td className="p-4 border border-gray-200 font-medium">{t('atAGlance.table.contextProvider')}</td>
                  <td className="p-4 border border-gray-200 text-green-600">{t('atAGlance.table.contextProviderZustand')}</td>
                  <td className="p-4 border border-gray-200">{t('atAGlance.table.contextProviderRedux')}</td>
                </tr>
                <tr>
                  <td className="p-4 border border-gray-200 font-medium">{t('atAGlance.table.stateModel')}</td>
                  <td className="p-4 border border-gray-200">{t('atAGlance.table.stateModelZustand')}</td>
                  <td className="p-4 border border-gray-200">{t('atAGlance.table.stateModelRedux')}</td>
                </tr>
                <tr>
                  <td className="p-4 border border-gray-200 font-medium">{t('atAGlance.table.learningCurve')}</td>
                  <td className="p-4 border border-gray-200 text-green-600">{t('atAGlance.table.learningCurveZustand')}</td>
                  <td className="p-4 border border-gray-200">{t('atAGlance.table.learningCurveRedux')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Code Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t('codeComparison.title')}</h2>
          <p className="mb-6 text-gray-700">
            {t('codeComparison.description')}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Zustand */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 text-white font-bold border-b border-gray-700 flex justify-between items-center">
                <span>{t('codeComparison.zustand')}</span>
                <span className="text-xs bg-green-600 px-2 py-1 rounded">{t('codeComparison.simple')}</span>
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
                <span>{t('codeComparison.redux')}</span>
                <span className="text-xs bg-purple-600 px-2 py-1 rounded">{t('codeComparison.verbose')}</span>
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
          <h2 className="text-3xl font-bold mb-6">{t('performance.title')}</h2>
          <p className="text-gray-700 mb-4">
            {t('performance.description')}
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="font-medium text-blue-900">
              {t('performance.quote')}
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-3xl font-bold mb-6">{t('conclusion.title')}</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li dangerouslySetInnerHTML={{ __html: t.raw('conclusion.chooseZustand') }} />
            <li dangerouslySetInnerHTML={{ __html: t.raw('conclusion.stickWithRedux') }} />
          </ul>
        </section>
      </div>
    </div>
  );
}
