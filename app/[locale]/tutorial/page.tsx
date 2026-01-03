import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tutorial.meta' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function TutorialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tutorial' });

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">{t('overview.title')}</h2>
            <p className="text-lg mb-4">
              {t('overview.description')}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">{t('lesson1.title')}</h2>
            <p className="mb-4">{t('lesson1.description')}</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>{t('lesson1.features.simple')}</li>
              <li>{t('lesson1.features.boilerplate')}</li>
              <li>{t('lesson1.features.typescript')}</li>
              <li>{t('lesson1.features.performance')}</li>
              <li>{t('lesson1.features.size')}</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4 mt-6">{t('lesson1.why.title')}</h3>
            <p className="mb-4">
              {t('lesson1.why.description')}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">{t('lesson2.title')}</h2>
            <p className="mb-4">{t('lesson2.description')}</p>
            
            <pre><code>{`import { create } from 'zustand'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoStore {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: Date.now(), text, completed: false }
      ]
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id)
    })),
}))`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Lesson 3: Using the Store in Components</h2>
            <pre><code>{`function TodoList() {
  const todos = useTodoStore((state) => state.todos)
  const addTodo = useTodoStore((state) => state.addTodo)
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      addTodo(input)
      setInput('')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
        />
        <button type="submit">Add</button>
      </form>
      
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}>
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">{t('lesson4.title')}</h2>
            
            <h3 className="text-2xl font-semibold mb-4">{t('lesson4.async.title')}</h3>
            <p className="mb-4">{t('lesson4.async.description')}</p>
            <pre><code>{`const useStore = create((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('https://api.example.com/data')
      const data = await response.json()
      set({ data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  }
}))`}</code></pre>

            <h3 className="text-2xl font-semibold mb-4 mt-6">{t('lesson4.computed.title')}</h3>
            <p className="mb-4">{t('lesson4.computed.description')}</p>
            <pre><code>{`const useStore = create((set) => ({
  todos: [],
  // ... actions
}))

// In your component
const completedCount = useStore(
  (state) => state.todos.filter(t => t.completed).length
)
const totalCount = useStore((state) => state.todos.length)`}</code></pre>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">{t('nextSteps.title')}</h2>
            <p className="mb-4">{t('nextSteps.description')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('nextSteps.topics.middleware')}</li>
              <li>{t('nextSteps.topics.testing')}</li>
              <li>{t('nextSteps.topics.typescript')}</li>
              <li>{t('nextSteps.topics.performance')}</li>
              <li>{t('nextSteps.topics.integration')}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
