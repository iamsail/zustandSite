# System Patterns - Zustand Documentation Site

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Next.js App Router                 │
├─────────────────────────────────────────────────────┤
│  Root Layout (layout.tsx)                           │
│    ├─ Global CSS                                    │
│    ├─ Metadata Base                                 │
│    └─ Children (locale-specific layouts)            │
├─────────────────────────────────────────────────────┤
│  Middleware (i18n routing)                          │
│    ├─ Locale detection                              │
│    ├─ URL rewriting                                 │
│    └─ Always prefix locales                         │
├─────────────────────────────────────────────────────┤
│  [locale] Layout                                    │
│    ├─ Header (navigation + language switcher)      │
│    ├─ Main content area                            │
│    └─ Footer                                        │
├─────────────────────────────────────────────────────┤
│  Route Pages                                        │
│    ├─ /[locale] - Homepage                         │
│    ├─ /[locale]/docs - Documentation               │
│    ├─ /[locale]/tutorial - Tutorial                │
│    ├─ /[locale]/examples - Examples                │
│    └─ /[locale]/api - API Reference                │
├─────────────────────────────────────────────────────┤
│  Supporting Files                                   │
│    ├─ sitemap.ts - XML sitemap generation          │
│    ├─ robots.ts - robots.txt generation            │
│    └─ globals.css - Global styles                  │
└─────────────────────────────────────────────────────┘
```

### Directory Structure

```
zustandSite/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout (metadata base)
│   ├── globals.css            # Global Tailwind styles
│   ├── sitemap.ts             # Dynamic sitemap generation
│   ├── robots.ts              # Dynamic robots.txt
│   └── [locale]/              # Internationalized routes
│       ├── layout.tsx         # Locale-specific layout
│       ├── page.tsx           # Homepage
│       ├── docs/
│       │   └── page.tsx       # Documentation
│       ├── tutorial/
│       │   └── page.tsx       # Tutorial
│       ├── examples/
│       │   └── page.tsx       # Examples
│       └── api/
│           └── page.tsx       # API Reference
├── components/                 # React components
│   ├── Header.tsx             # Navigation header
│   └── Footer.tsx             # Site footer
├── lib/                       # Utilities
│   ├── gtm.ts                 # Google Tag Manager
│   └── seo-config.ts          # SEO configuration
├── messages/                  # i18n translations
│   ├── en.json                # English
│   ├── zh.json                # Chinese
│   └── ja.json                # Japanese
├── public/                    # Static assets
│   └── robots.txt             # Static robots.txt
├── .github/                   # GitHub configurations
│   ├── instructions/          # AI coding instructions
│   │   └── memory-bank.instructions.md
│   └── memory-bank/           # Memory Bank files
│       ├── projectbrief.md
│       ├── productContext.md
│       ├── systemPatterns.md
│       ├── techContext.md
│       ├── activeContext.md
│       ├── progress.md
│       └── tasks/
│           └── _index.md
├── i18n.ts                    # i18n configuration
├── middleware.ts              # Next.js middleware (i18n)
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## Key Technical Decisions

### 1. Next.js App Router (Not Pages Router)

**Decision:** Use Next.js 15+ App Router for the application structure

**Rationale:**
- Modern, React Server Components by default
- Better SEO with server-side rendering
- Improved performance with streaming
- Simpler data fetching patterns
- Better TypeScript support
- Future-proof (Pages Router is legacy)

**Implementation:**
- All pages in `app/` directory
- Server components by default
- Client components only when needed
- Async server components for data fetching

### 2. next-intl for Internationalization

**Decision:** Use next-intl library instead of next-i18next or custom solution

**Rationale:**
- Built specifically for App Router
- Excellent TypeScript support
- Server component friendly
- Automatic locale detection
- Clean middleware integration
- Type-safe translations

**Implementation:**
```typescript
// middleware.ts - Route handling
export default createMiddleware({
  locales: ['en', 'zh', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

// i18n.ts - Configuration
export default getRequestConfig(async ({ locale }) => ({
  locale,
  messages: (await import(`./messages/${locale}.json`)).default
}));
```

### 3. Locale Prefixing Strategy

**Decision:** Always prefix URLs with locale (`/en`, `/zh`, `/ja`)

**Rationale:**
- Clear language indication in URL
- Better for SEO (hreflang tags)
- Easier to share language-specific links
- Simpler routing logic
- Consistent pattern across all pages

**Alternative Considered:** Default locale without prefix (e.g., `/` for English)
**Why Rejected:** More complex routing, harder to manage canonical URLs

### 4. Tailwind CSS v4

**Decision:** Use Tailwind CSS for styling instead of CSS Modules or styled-components

**Rationale:**
- Rapid development with utility classes
- Excellent responsive design support
- Minimal CSS bundle size (tree-shaking)
- Consistent design system
- No runtime overhead
- v4 has performance improvements

**Implementation:**
- Custom color scheme with primary colors
- Custom utility classes (`.container-custom`, `.btn-primary`, etc.)
- Responsive breakpoints (sm, md, lg)
- Dark code backgrounds for syntax highlighting

### 5. Server-Side Metadata Generation

**Decision:** Generate metadata dynamically on the server for each page

**Rationale:**
- Better SEO with accurate meta tags
- Locale-specific titles and descriptions
- Dynamic Open Graph images
- Twitter Card support
- Canonical URL management

**Implementation:**
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  
  return {
    title: t('title'),
    description: t('description'),
    // ... more metadata
  };
}
```

### 6. Google Tag Manager (Not Direct GA)

**Decision:** Use GTM as a container for Google Analytics

**Rationale:**
- Centralized tag management
- No code changes for new tracking
- Better control over scripts
- Supports multiple tracking tools
- Easier A/B testing setup
- Better for future ad integration

**Implementation:**
- GTM script in locale layout
- Environment variable for GTM ID
- Custom events for user interactions

## Design Patterns

### Pattern 1: Async Server Components

**Usage:** All page components are async server components

```typescript
export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  
  return <div>{t('title')}</div>;
}
```

**Benefits:**
- Data fetching at component level
- Automatic caching and revalidation
- Better performance
- SEO-friendly

### Pattern 2: Translation Namespaces

**Usage:** Organize translations by page/section

```
messages/en.json:
{
  "meta": { "title": "...", "description": "..." },
  "home": { "hero": {...}, "features": {...} },
  "docs": { ... },
  "tutorial": { ... }
}
```

**Benefits:**
- Organized translation files
- Easier to maintain
- Type-safe access
- Better code splitting

### Pattern 3: Locale-Aware Links

**Usage:** All internal links include locale prefix

```typescript
<Link href={`/${locale}/docs`}>Documentation</Link>
```

**Benefits:**
- Maintains language context
- Prevents language switching
- SEO-friendly URLs
- Clear user experience

### Pattern 4: Shared Layout Components

**Usage:** Header and Footer in locale layout, reused across all pages

```typescript
export default function LocaleLayout({ children, params }) {
  return (
    <html lang={params.locale}>
      <body>
        <Header locale={params.locale} />
        <main>{children}</main>
        <Footer locale={params.locale} />
      </body>
    </html>
  );
}
```

**Benefits:**
- Consistent navigation
- Single source of truth
- Easy updates
- Better caching

### Pattern 5: SEO Utilities

**Usage:** Centralized SEO configuration in `lib/seo-config.ts`

```typescript
export const defaultSEO = {
  canonical: 'https://your-domain.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    // ...
  }
};
```

**Benefits:**
- DRY principle
- Easy to update domain
- Consistent metadata
- Type safety

## Component Relationships

### Navigation Flow

```
User Request
    ↓
Middleware (locale detection)
    ↓
Root Layout (metadata base)
    ↓
Locale Layout (Header + Footer)
    ↓
Page Component (content)
    ↓
Translation Hook (getTranslations)
    ↓
Rendered HTML
```

### Data Flow

```
Translation Files (messages/*.json)
    ↓
i18n Configuration (i18n.ts)
    ↓
Server Component (async)
    ↓
getTranslations({ locale, namespace })
    ↓
Rendered Content
```

### SEO Flow

```
Page Component
    ↓
generateMetadata() function
    ↓
Translation Hook
    ↓
Metadata Object (title, description, etc.)
    ↓
Next.js Head Tags
```

## State Management

**Current State:** No global state management needed

**Rationale:**
- Static documentation site
- No user interactions requiring state
- No forms or complex UI
- Server components handle data

**Future Consideration:**
- If adding interactive features (search, filters), consider Zustand
- Dark mode toggle would benefit from local state
- User preferences could use localStorage

## Performance Patterns

### Static Generation

**Strategy:** Pre-render all pages at build time

```typescript
// All pages are static by default in App Router
// No dynamic routes currently
// All content known at build time
```

### Image Optimization

**Current:** Not used (no images yet)

**Future:** Use Next.js Image component when adding images

```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Zustand Logo"
  width={200}
  height={200}
  priority
/>
```

### Code Splitting

**Automatic:** Next.js handles code splitting per route

**Benefits:**
- Smaller initial bundles
- Faster page loads
- Better caching

## Error Handling Patterns

**Current:** Default Next.js error handling

**Future Improvements:**
- Custom 404 page per locale
- Custom error boundaries
- Fallback UI for failed components

## Security Patterns

### Environment Variables

**Pattern:** Use `NEXT_PUBLIC_` prefix for client-side variables

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Security:**
- Server-only variables don't get exposed
- Client variables are explicitly marked
- No sensitive data in client bundle

### Content Security

**Current:** No user-generated content
**Future:** If adding comments, implement CSP headers

## Testing Strategy (Future)

**Not Implemented Yet**

**Recommended Patterns:**
- Unit tests for utility functions
- Integration tests for page rendering
- E2E tests for critical user journeys
- Visual regression tests for UI

## Deployment Patterns

### Vercel Deployment

**Strategy:** Git-based continuous deployment

```
Git Push to Branch
    ↓
Vercel Build
    ↓
Environment Variables Injected
    ↓
Next.js Build
    ↓
Deploy to Edge Network
    ↓
Preview URL or Production
```

**Benefits:**
- Automatic builds on push
- Preview deployments for PRs
- Edge caching globally
- Zero configuration

## Monitoring Patterns

### Analytics

**Current:** Google Tag Manager + GA4

**Tracked Events:**
- Page views (automatic)
- Navigation clicks
- Language switches
- External link clicks

**Future:**
- Custom events for code copies
- Tutorial completion tracking
- Search queries (when implemented)

## Conventions

### File Naming
- Components: PascalCase (Header.tsx)
- Utilities: camelCase (seo-config.ts)
- Pages: lowercase (page.tsx)
- Config files: kebab-case (next.config.js)

### Code Style
- TypeScript strict mode
- Async/await over promises
- Functional components only
- Explicit types for props
- Named exports for utilities
- Default exports for pages/components

### Git Workflow
- Feature branches from main
- Descriptive commit messages
- PR reviews before merge
- Squash commits on merge

## Anti-Patterns to Avoid

❌ **Client Components for Static Content**
- Use server components by default
- Only use 'use client' when necessary

❌ **Hardcoded Text**
- Always use translation keys
- Never put user-facing text directly in JSX

❌ **Direct URL Strings**
- Always include locale in links
- Use Link component, not anchor tags

❌ **Inline Styles**
- Use Tailwind utility classes
- Only use inline styles for dynamic values

❌ **Large Components**
- Break down into smaller components
- Single responsibility principle

## Future Architectural Considerations

### Search Functionality
- Consider Algolia or local search
- Full-text indexing of all content
- Locale-aware search results

### Interactive Playground
- Embed CodeSandbox
- Or use Web Containers
- Avoid building custom REPL

### Blog Section
- MDX for content
- Frontmatter for metadata
- RSS feed generation

### Dark Mode
- Use Tailwind dark: variants
- localStorage for preference
- System preference detection
