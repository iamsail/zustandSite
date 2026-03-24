import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'examplesPage.meta' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: (await getTranslations({ locale, namespace: 'meta' }))('keywords'),
  };
}

export default async function ExamplesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'examplesPage' });

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
        
        <p className="text-lg text-gray-600 mb-12">
          {t('description')}
        </p>

        <div className="space-y-8">
          {/* Counter Example */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{t('counter.title')}</h2>
            <p className="text-gray-600 mb-4">
              {t('counter.description')}
            </p>
            <pre><code>{`import { create } from 'zustand'

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))

function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}`}</code></pre>
          </section>

          {/* Shopping Cart Example */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{t('cart.title')}</h2>
            <p className="text-gray-600 mb-4">
              {t('cart.description')}
            </p>
            <pre><code>{`import { create } from 'zustand'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

const useCartStore = create((set) => ({
  items: [] as CartItem[],
  addItem: (item: Omit<CartItem, 'quantity'>) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { ...item, quantity: 1 }] }
    }),
  removeItem: (id: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id: string, quantity: number) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
  total: () => {
    const state = useCartStore.getState()
    return state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  },
}))`}</code></pre>
          </section>

          {/* Form Management Example */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{t('form.title')}</h2>
            <p className="text-gray-600 mb-4">
              {t('form.description')}
            </p>
            <pre><code>{`import { create } from 'zustand'

interface FormState {
  values: Record<string, any>
  errors: Record<string, string>
  isSubmitting: boolean
}

const useFormStore = create<FormState & {
  setField: (name: string, value: any) => void
  setError: (name: string, error: string) => void
  reset: () => void
  submit: () => Promise<void>
}>((set, get) => ({
  values: {},
  errors: {},
  isSubmitting: false,
  setField: (name, value) =>
    set((state) => ({
      values: { ...state.values, [name]: value },
      errors: { ...state.errors, [name]: '' },
    })),
  setError: (name, error) =>
    set((state) => ({
      errors: { ...state.errors, [name]: error },
    })),
  reset: () =>
    set({ values: {}, errors: {}, isSubmitting: false }),
  submit: async () => {
    set({ isSubmitting: true })
    try {
      const { values } = get()
      // Submit form data
      await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(values),
      })
      set({ isSubmitting: false })
    } catch (error) {
      set({ isSubmitting: false })
    }
  },
}))`}</code></pre>
          </section>

          {/* Async Data Fetching Example */}
          <section className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{t('async.title')}</h2>
            <p className="text-gray-600 mb-4">
              {t('async.description')}
            </p>
            <pre><code>{`import { create } from 'zustand'

interface User {
  id: number
  name: string
  email: string
}

interface UserStore {
  users: User[]
  loading: boolean
  error: string | null
  fetchUsers: () => Promise<void>
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  error: null,
  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('https://api.example.com/users')
      if (!response.ok) throw new Error('Failed to fetch')
      const users = await response.json()
      set({ users, loading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false,
      })
    }
  },
}))

function UserList() {
  const { users, loading, error, fetchUsers } = useUserStore()

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}`}</code></pre>
          </section>
        </div>
      </div>
    </div>
  );
}
