import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: 'FAQ - ' + t('title'),
    description: 'Frequently asked questions about Zustand state management library for React.',
    keywords: 'zustand faq, zustand questions, zustand help, react state management faq',
  };
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  const faqCategories = [
    {
      id: 'general',
      questions: ['what-is-zustand', 'why-use-zustand', 'zustand-vs-redux', 'bundle-size'],
    },
    {
      id: 'usage',
      questions: ['create-store', 'update-state', 'async-actions', 'selectors'],
    },
    {
      id: 'advanced',
      questions: ['middleware', 'persist-state', 'devtools', 'typescript'],
    },
    {
      id: 'troubleshooting',
      questions: ['rerender-issues', 'state-not-updating', 'ssr-issues', 'memory-leaks'],
    },
  ];

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-theme-secondary mb-12">
          {t('description')}
        </p>

        <div className="space-y-12">
          {faqCategories.map((category) => (
            <section key={category.id}>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-theme">
                {t(`categories.${category.id}`)}
              </h2>
              <div className="space-y-6">
                {category.questions.map((questionId) => (
                  <details 
                    key={questionId}
                    className="group border border-theme rounded-lg bg-theme-card"
                  >
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-theme-primary hover:bg-theme-secondary rounded-lg transition-colors">
                      <span>{t(`questions.${questionId}.q`)}</span>
                      <svg 
                        className="w-5 h-5 text-theme-tertiary group-open:rotate-180 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 text-theme-secondary">
                      <p className="mb-4">{t(`questions.${questionId}.a`)}</p>
                      {questionId === 'create-store' && (
                        <pre><code>{`import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))`}</code></pre>
                      )}
                      {questionId === 'update-state' && (
                        <pre><code>{`// Partial update
set({ count: 10 })

// Functional update
set((state) => ({ count: state.count + 1 }))

// Replace entire state
set({ count: 0 }, true)`}</code></pre>
                      )}
                      {questionId === 'async-actions' && (
                        <pre><code>{`const useStore = create((set) => ({
  data: null,
  loading: false,
  fetchData: async () => {
    set({ loading: true })
    const response = await fetch('/api/data')
    const data = await response.json()
    set({ data, loading: false })
  },
}))`}</code></pre>
                      )}
                      {questionId === 'selectors' && (
                        <pre><code>{`// Select specific state
const count = useStore((state) => state.count)

// Shallow comparison for objects
import { shallow } from 'zustand/shallow'
const { a, b } = useStore(
  (state) => ({ a: state.a, b: state.b }),
  shallow
)`}</code></pre>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 p-8 rounded-lg bg-theme-secondary border border-theme text-center">
          <h2 className="text-2xl font-bold mb-4">{t('stillHaveQuestions.title')}</h2>
          <p className="text-theme-secondary mb-6">{t('stillHaveQuestions.description')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://github.com/pmndrs/zustand/discussions" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              {t('stillHaveQuestions.github')}
            </a>
            <a 
              href="https://discord.gg/poimandres" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center"
            >
              {t('stillHaveQuestions.discord')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
