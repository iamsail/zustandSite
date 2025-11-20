import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: 'Tutorial - ' + t('title'),
    description: 'Step-by-step tutorial to learn Zustand state management from basics to advanced concepts.',
    keywords: t('keywords'),
  };
}

export default function TutorialPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Zustand Tutorial</h1>

        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Tutorial Overview</h2>
            <p className="text-lg mb-4">
              Welcome to the comprehensive Zustand tutorial! This guide will take you from beginner to advanced,
              teaching you everything you need to know about state management with Zustand.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Lesson 1: Introduction to Zustand</h2>
            <p className="mb-4">Zustand is a lightweight state management library for React that provides:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Simple and intuitive API</li>
              <li>No boilerplate code required</li>
              <li>Great TypeScript support</li>
              <li>Excellent performance with automatic optimization</li>
              <li>Small bundle size (less than 1KB)</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4 mt-6">Why Choose Zustand?</h3>
            <p className="mb-4">
              Compared to other state management solutions like Redux or MobX, Zustand offers a simpler API
              with less boilerplate while maintaining powerful features and excellent performance.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Lesson 2: Creating Your First Store</h2>
            <p className="mb-4">Let's create a simple todo list application:</p>
            
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
            <h2 className="text-3xl font-bold mb-6">Lesson 4: Advanced Patterns</h2>
            
            <h3 className="text-2xl font-semibold mb-4">Async Actions</h3>
            <p className="mb-4">Handle asynchronous operations in your store:</p>
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

            <h3 className="text-2xl font-semibold mb-4 mt-6">Computed Values</h3>
            <p className="mb-4">Create derived state with selectors:</p>
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
            <h2 className="text-3xl font-bold mb-6">Next Steps</h2>
            <p className="mb-4">Continue learning with these topics:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Middleware for persistence and devtools</li>
              <li>Testing Zustand stores</li>
              <li>Advanced TypeScript patterns</li>
              <li>Performance optimization techniques</li>
              <li>Integration with other libraries</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
