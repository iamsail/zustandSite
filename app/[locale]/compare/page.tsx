import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: 'Zustand vs Redux vs MobX - ' + t('title'),
    description: 'Compare Zustand with Redux, MobX, Jotai, and other React state management libraries. Find the best solution for your project.',
    keywords: 'zustand vs redux, zustand vs mobx, react state management comparison, best state management',
  };
}

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'compare' });

  const libraries = ['zustand', 'redux', 'mobx', 'jotai', 'recoil'];
  const features = [
    'bundleSize',
    'boilerplate',
    'learningCurve',
    'typescript',
    'devtools',
    'middleware',
    'ssr',
    'reactNative',
    'persistence',
    'performance',
  ];

  return (
    <div className="container-custom py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-theme-secondary mb-12">
          {t('description')}
        </p>

        {/* Quick Summary */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t('quickSummary.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['zustand', 'redux', 'mobx'].map((lib) => (
              <div 
                key={lib}
                className={`p-6 rounded-lg border ${
                  lib === 'zustand' 
                    ? 'border-2' 
                    : 'border-theme'
                } bg-theme-card`}
                style={lib === 'zustand' ? { borderColor: 'var(--primary-600)' } : {}}
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">{t(`libraries.${lib}.icon`)}</span>
                  <h3 className="text-xl font-bold">{t(`libraries.${lib}.name`)}</h3>
                  {lib === 'zustand' && (
                    <span 
                      className="ml-2 px-2 py-1 text-xs font-medium rounded"
                      style={{ backgroundColor: 'var(--primary-50)', color: 'var(--primary-600)' }}
                    >
                      {t('recommended')}
                    </span>
                  )}
                </div>
                <p className="text-theme-secondary mb-4">{t(`libraries.${lib}.summary`)}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-theme-tertiary">{t('metrics.bundleSize')}</span>
                    <span className="font-medium">{t(`libraries.${lib}.bundleSize`)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-tertiary">{t('metrics.stars')}</span>
                    <span className="font-medium">{t(`libraries.${lib}.stars`)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t('comparisonTable.title')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-theme">
                  <th className="text-left py-4 px-4 font-medium text-theme-tertiary">{t('comparisonTable.feature')}</th>
                  {libraries.map((lib) => (
                    <th key={lib} className="text-center py-4 px-4 font-medium">
                      {t(`libraries.${lib}.name`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature) => (
                  <tr key={feature} className="border-b border-theme">
                    <td className="py-4 px-4 text-theme-secondary">{t(`features.${feature}`)}</td>
                    {libraries.map((lib) => (
                      <td key={lib} className="text-center py-4 px-4">
                        {t(`ratings.${lib}.${feature}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Comparison */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t('detailed.title')}</h2>
          
          {/* Zustand vs Redux */}
          <div className="mb-12 p-6 rounded-lg border border-theme bg-theme-card">
            <h3 className="text-xl font-bold mb-4">{t('detailed.zustandVsRedux.title')}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2" style={{ color: 'var(--primary-600)' }}>{t('detailed.zustandAdvantages')}</h4>
                <ul className="space-y-2 text-theme-secondary">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    {t('detailed.zustandVsRedux.zustand1')}
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    {t('detailed.zustandVsRedux.zustand2')}
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    {t('detailed.zustandVsRedux.zustand3')}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-theme-secondary">{t('detailed.reduxAdvantages')}</h4>
                <ul className="space-y-2 text-theme-secondary">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    {t('detailed.zustandVsRedux.redux1')}
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    {t('detailed.zustandVsRedux.redux2')}
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    {t('detailed.zustandVsRedux.redux3')}
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">{t('detailed.codeComparison')}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-theme-tertiary mb-2">Zustand</p>
                  <pre><code>{`import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => 
    set((s) => ({ count: s.count + 1 })),
}))`}</code></pre>
                </div>
                <div>
                  <p className="text-sm text-theme-tertiary mb-2">Redux Toolkit</p>
                  <pre><code>{`import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1
    },
  },
})

export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
})`}</code></pre>
                </div>
              </div>
            </div>
          </div>

          {/* Zustand vs MobX */}
          <div className="mb-12 p-6 rounded-lg border border-theme bg-theme-card">
            <h3 className="text-xl font-bold mb-4">{t('detailed.zustandVsMobx.title')}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2" style={{ color: 'var(--primary-600)' }}>{t('detailed.zustandAdvantages')}</h4>
                <ul className="space-y-2 text-theme-secondary">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    {t('detailed.zustandVsMobx.zustand1')}
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    {t('detailed.zustandVsMobx.zustand2')}
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    {t('detailed.zustandVsMobx.zustand3')}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-theme-secondary">{t('detailed.mobxAdvantages')}</h4>
                <ul className="space-y-2 text-theme-secondary">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    {t('detailed.zustandVsMobx.mobx1')}
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    {t('detailed.zustandVsMobx.mobx2')}
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    {t('detailed.zustandVsMobx.mobx3')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* When to Use */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t('whenToUse.title')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border-2 bg-theme-card" style={{ borderColor: 'var(--primary-600)' }}>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🐻</span>
                {t('whenToUse.useZustand.title')}
              </h3>
              <ul className="space-y-3 text-theme-secondary">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  {t('whenToUse.useZustand.reason1')}
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  {t('whenToUse.useZustand.reason2')}
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  {t('whenToUse.useZustand.reason3')}
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  {t('whenToUse.useZustand.reason4')}
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border border-theme bg-theme-card">
              <h3 className="text-xl font-bold mb-4">{t('whenToUse.useOthers.title')}</h3>
              <ul className="space-y-3 text-theme-secondary">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  {t('whenToUse.useOthers.reason1')}
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  {t('whenToUse.useOthers.reason2')}
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  {t('whenToUse.useOthers.reason3')}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center p-8 rounded-lg bg-theme-secondary border border-theme">
          <h2 className="text-2xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-theme-secondary mb-6">{t('cta.description')}</p>
          <a href={`/${locale}/docs`} className="btn-primary inline-block">
            {t('cta.button')}
          </a>
        </div>
      </div>
    </div>
  );
}
