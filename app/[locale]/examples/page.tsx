import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: 'Examples - ' + t('title'),
    description: 'Real-world examples of Zustand state management including todo apps, shopping carts, authentication, and more.',
    keywords: t('keywords'),
  };
}

export default async function ExamplesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'examples' });

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
        
        <p className="text-lg text-theme-secondary mb-12">
          {t('description')}
        </p>

        <div className="space-y-8">
          {/* Counter Example */}
          <section className="border border-theme rounded-lg p-6 bg-theme-card">
            <h2 className="text-2xl font-bold mb-4">{t('counter.title')}</h2>
            <p className="text-theme-secondary mb-4">
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
          <section className="border border-theme rounded-lg p-6 bg-theme-card">
            <h2 className="text-2xl font-bold mb-4">{t('cart.title')}</h2>
            <p className="text-theme-secondary mb-4">
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
          <section className="border border-theme rounded-lg p-6 bg-theme-card">
            <h2 className="text-2xl font-bold mb-4">{t('form.title')}</h2>
            <p className="text-theme-secondary mb-4">
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
          <section className="border border-theme rounded-lg p-6 bg-theme-card">
            <h2 className="text-2xl font-bold mb-4">{t('async.title')}</h2>
            <p className="text-theme-secondary mb-4">
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

          {/* Authentication Example */}
          <section className="border border-theme rounded-lg p-6 bg-theme-card">
            <h2 className="text-2xl font-bold mb-4">{t('auth.title')}</h2>
            <p className="text-theme-secondary mb-4">
              {t('auth.description')}
            </p>
            <pre><code>{`import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        
        if (!response.ok) throw new Error('Login failed')
        
        const { user, token } = await response.json()
        set({ user, token, isAuthenticated: true })
      },
      
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },
      
      checkAuth: async () => {
        const { token } = get()
        if (!token) return
        
        try {
          const response = await fetch('/api/me', {
            headers: { Authorization: \`Bearer \${token}\` },
          })
          if (response.ok) {
            const user = await response.json()
            set({ user, isAuthenticated: true })
          } else {
            set({ user: null, token: null, isAuthenticated: false })
          }
        } catch {
          set({ user: null, token: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
)`}</code></pre>
          </section>

          {/* Theme Store Example */}
          <section className="border border-theme rounded-lg p-6 bg-theme-card">
            <h2 className="text-2xl font-bold mb-4">{t('theme.title')}</h2>
            <p className="text-theme-secondary mb-4">
              {t('theme.description')}
            </p>
            <pre><code>{`import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'system',
      resolvedTheme: 'light',
      
      setTheme: (theme) => {
        let resolved: 'light' | 'dark' = 'light'
        
        if (theme === 'system') {
          resolved = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
        } else {
          resolved = theme
        }
        
        document.documentElement.setAttribute('data-theme', resolved)
        set({ theme, resolvedTheme: resolved })
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      const { theme, setTheme } = useThemeStore.getState()
      if (theme === 'system') {
        setTheme('system')
      }
    })
}`}</code></pre>
          </section>

          {/* Notification Store Example */}
          <section className="border border-theme rounded-lg p-6 bg-theme-card">
            <h2 className="text-2xl font-bold mb-4">{t('notifications.title')}</h2>
            <p className="text-theme-secondary mb-4">
              {t('notifications.description')}
            </p>
            <pre><code>{`import { create } from 'zustand'

type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface Notification {
  id: string
  type: NotificationType
  message: string
  duration?: number
}

interface NotificationStore {
  notifications: Notification[]
  add: (notification: Omit<Notification, 'id'>) => void
  remove: (id: string) => void
  clear: () => void
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  
  add: (notification) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }))
    
    // Auto-remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }))
      }, notification.duration || 5000)
    }
  },
  
  remove: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
    
  clear: () => set({ notifications: [] }),
}))

// Usage
function showSuccess(message: string) {
  useNotificationStore.getState().add({ type: 'success', message })
}

function showError(message: string) {
  useNotificationStore.getState().add({ type: 'error', message })
}`}</code></pre>
          </section>
        </div>
      </div>
    </div>
  );
}
