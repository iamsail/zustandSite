import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: 'Immer Integration - ' + t('title'),
    description: 'Use Immer with Zustand for easier immutable state updates with mutable syntax.',
    keywords: 'zustand immer, zustand immutable, zustand state updates, zustand mutable syntax',
  };
}

export default async function ImmerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'docs' });
  const i = await getTranslations({ locale, namespace: 'immerPage' });

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link href={`/${locale}/docs`} className="text-primary-600 hover:underline">
            ← {t('backToDocs')}
          </Link>
        </nav>

        <h1 className="text-4xl font-bold mb-8">{t('advanced.immer')}</h1>

        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{i('why.title')}</h2>
            <p className="text-gray-700 mb-4">
              {i('why.description')}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`// Without Immer - verbose and error-prone
set((state) => ({
  ...state,
  nested: {
    ...state.nested,
    deep: {
      ...state.nested.deep,
      value: newValue
    }
  }
}))

// With Immer - simple and intuitive
set((state) => {
  state.nested.deep.value = newValue
})`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{i('installation.title')}</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`npm install immer
# or
yarn add immer
# or
pnpm add immer`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{i('basicUsage.title')}</h2>
            <p className="text-gray-700 mb-4">
              {i('basicUsage.description')}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const useStore = create(
  immer((set) => ({
    todos: [],
    addTodo: (todo) => set((state) => {
      state.todos.push(todo)
    }),
    toggleTodo: (id) => set((state) => {
      const todo = state.todos.find((t) => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    }),
    deleteTodo: (id) => set((state) => {
      const index = state.todos.findIndex((t) => t.id === id)
      if (index !== -1) {
        state.todos.splice(index, 1)
      }
    }),
  }))
)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{i('nestedState.title')}</h2>
            <p className="text-gray-700 mb-4">
              {i('nestedState.description')}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`const useStore = create(
  immer((set) => ({
    user: {
      profile: {
        name: 'John',
        settings: {
          theme: 'light',
          notifications: {
            email: true,
            push: false,
          },
        },
      },
    },
    toggleEmailNotifications: () => set((state) => {
      state.user.profile.settings.notifications.email = 
        !state.user.profile.settings.notifications.email
    }),
    setTheme: (theme) => set((state) => {
      state.user.profile.settings.theme = theme
    }),
  }))
)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{i('combining.title')}</h2>
            <p className="text-gray-700 mb-4">
              {i('combining.description')}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const useStore = create(
  devtools(
    persist(
      immer((set) => ({
        todos: [],
        addTodo: (todo) => set((state) => {
          state.todos.push(todo)
        }),
      })),
      { name: 'todo-storage' }
    ),
    { name: 'TodoStore' }
  )
)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{i('typescript.title')}</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>{`import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Todo {
  id: string
  text: string
  completed: boolean
}

interface TodoState {
  todos: Todo[]
  addTodo: (todo: Todo) => void
  toggleTodo: (id: string) => void
}

const useStore = create<TodoState>()(
  immer((set) => ({
    todos: [],
    addTodo: (todo) => set((state) => {
      state.todos.push(todo)
    }),
    toggleTodo: (id) => set((state) => {
      const todo = state.todos.find((t) => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    }),
  }))
)`}</code></pre>
          </section>
        </div>
      </div>
    </div>
  );
}
