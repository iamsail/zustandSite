# Tech Context - Zustand Documentation Site

## Technology Stack

### Core Framework
- **Next.js 16.0.3**
  - Latest stable version with App Router
  - React Server Components by default
  - Built-in optimization and SEO features
  - Turbopack for faster builds
  - Automatic code splitting

### Frontend
- **React 19.2.0**
  - Latest version with improved performance
  - Server Components support
  - Enhanced concurrent rendering
  - Better TypeScript integration

### Language
- **TypeScript 5.9.3**
  - Strict mode enabled
  - Full type safety across the application
  - Better developer experience
  - Catch errors at compile time

### Styling
- **Tailwind CSS 4.1.17**
  - Latest v4 with performance improvements
  - Utility-first CSS framework
  - Responsive design built-in
  - Minimal runtime overhead
  - PostCSS integration

### Internationalization
- **next-intl 4.5.5**
  - App Router compatible
  - Type-safe translations
  - Server component support
  - Automatic locale detection
  - Clean middleware integration

### Analytics
- **Google Tag Manager**
  - Via react-gtm-module 2.0.11
  - Centralized tag management
  - Event tracking
  - Conversion tracking
  - Future ad integration support

### SEO
- **next-seo 7.0.1**
  - Enhanced metadata management
  - Open Graph tag support
  - Twitter Card support
  - Structured data helpers

## Development Tools

### Package Manager
- **npm** (default)
  - Lock file: package-lock.json
  - Scripts in package.json
  - Standard Node.js ecosystem

### Linting
- **ESLint 9.39.1**
  - Next.js ESLint config
  - Enforces code quality
  - Catches common errors
  - Integrated with VS Code

### Build Tools
- **PostCSS 8.5.6**
  - Tailwind CSS processing
  - Autoprefixer for browser compatibility
  - CSS optimization

- **Autoprefixer 10.4.22**
  - Automatic vendor prefixes
  - Browser compatibility

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Runtime Environment

### Node.js
- **Required Version:** 18.0 or later
- **Recommended:** 20.x LTS
- **Reason:** Next.js 15+ requirements

### Environment Variables

```bash
# Google Tag Manager (optional for development)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Site URL (required for production)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Variable Naming:**
- `NEXT_PUBLIC_` prefix: Exposed to browser
- No prefix: Server-only (not used currently)

## Development Setup

### Installation Steps

1. Clone repository:
```bash
git clone https://github.com/iamsail/zustandSite.git
cd zustandSite
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Edit `.env.local`:
```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX  # Optional for dev
NEXT_PUBLIC_SITE_URL=http://localhost:3010
```

5. Start development server:
```bash
npm run dev
```

6. Open browser:
```
http://localhost:3010
```

### Development Server

**Port:** 3010 (configured in package.json)

**Commands:**
```bash
npm run dev    # Start dev server on port 3010
npm run build  # Production build
npm start      # Start production server on port 3010
npm run lint   # Run ESLint
```

**Hot Reload:** Enabled by default
- Changes to files trigger automatic reload
- Fast refresh preserves component state
- Error overlay shows build errors

## Build Process

### Production Build

```bash
npm run build
```

**Steps:**
1. TypeScript type checking
2. ESLint validation
3. Next.js compilation
4. Page pre-rendering (SSG)
5. Bundle optimization
6. Asset optimization
7. Sitemap generation
8. robots.txt generation

**Output Directory:** `.next/`

**Build Artifacts:**
- Static HTML files
- JavaScript bundles
- CSS files
- Optimized images
- JSON data files

### Build Optimization

**Automatic Optimizations:**
- Code splitting per route
- Tree shaking unused code
- Minification (JS, CSS)
- Image optimization (when used)
- Font optimization
- Automatic static optimization

**Manual Optimizations:**
- Server components by default
- Minimal client-side JavaScript
- Efficient Tailwind purging
- Static page generation

## Deployment

### Platform: Vercel (Recommended)

**Why Vercel:**
- Built by Next.js creators
- Zero-configuration deployment
- Automatic HTTPS
- Global CDN
- Preview deployments
- Environment variable management
- Edge network caching

**Deployment Process:**
```
Git Push → Vercel Build → Deploy to Edge → Live
```

### Alternative Platforms

**Netlify:**
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18+

**Self-Hosted:**
- Build: `npm run build`
- Start: `npm start`
- Port: 3010
- Requires Node.js runtime
- Use PM2 for process management
- Nginx as reverse proxy

### Environment Configuration

**Development:**
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3010
```

**Production:**
```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Technical Constraints

### Browser Support
- Modern browsers only (ES2017+)
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- No IE11 support

**Reason:** Next.js 15+ drops legacy browser support

### Performance Targets
- Lighthouse score: 90+
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s
- Core Web Vitals: All "Good"

### SEO Requirements
- Server-side rendering for all pages
- Proper meta tags per page
- XML sitemap with all URLs
- robots.txt allowing crawlers
- Semantic HTML structure
- Mobile-friendly responsive design

### Accessibility Targets
- WCAG 2.1 Level AA compliance
- Semantic HTML elements
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast

## Dependencies Overview

### Production Dependencies

```json
{
  "@types/node": "^24.10.1",           // Node.js types
  "@types/react": "^19.2.6",           // React types
  "@types/react-dom": "^19.2.3",       // React DOM types
  "next": "^16.0.3",                   // Framework
  "next-intl": "^4.5.5",               // Internationalization
  "next-seo": "^7.0.1",                // SEO utilities
  "react": "^19.2.0",                  // UI library
  "react-dom": "^19.2.0",              // React renderer
  "react-gtm-module": "^2.0.11",       // Google Tag Manager
  "typescript": "^5.9.3",              // Language
  "zustand": "^5.0.8"                  // State management (for demos)
}
```

### Development Dependencies

```json
{
  "@tailwindcss/postcss": "^4.1.17",   // Tailwind processing
  "autoprefixer": "^10.4.22",          // CSS prefixes
  "eslint": "^9.39.1",                 // Code linting
  "eslint-config-next": "^16.0.3",     // Next.js ESLint config
  "postcss": "^8.5.6",                 // CSS processing
  "tailwindcss": "^4.1.17"             // Styling framework
}
```

### Dependency Management

**Update Strategy:**
- Keep Next.js and React updated
- Monitor security advisories
- Test updates in development
- Update minor versions monthly
- Update major versions quarterly

**Avoiding Dependency Bloat:**
- No unnecessary libraries
- Use Next.js built-in features
- Prefer small, focused packages
- Regular dependency audits

## Configuration Files

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
```

**Purpose:**
- Enable React strict mode
- Configure Next.js behavior
- Add plugins if needed

### tailwind.config.ts
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          // ... more shades
          600: '#dc2626',
        },
      },
    },
  },
  plugins: [],
};
```

**Purpose:**
- Define content paths for purging
- Extend default theme
- Add custom utilities

### postcss.config.js
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

**Purpose:**
- Configure PostCSS plugins
- Process Tailwind CSS
- Add browser prefixes

### middleware.ts
```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'always'
});
```

**Purpose:**
- Handle locale routing
- Detect user language
- Rewrite URLs with locale prefix

### i18n.ts
```typescript
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  locale,
  messages: (await import(`./messages/${locale}.json`)).default
}));
```

**Purpose:**
- Load translation messages
- Configure i18n behavior
- Type-safe translations

## Development Workflow

### Local Development

1. **Start dev server:** `npm run dev`
2. **Edit files** in VS Code or preferred editor
3. **View changes** at http://localhost:3010
4. **Check console** for errors
5. **Test all locales:** /en, /zh, /ja

### Code Quality

**Before Commit:**
```bash
npm run lint              # Check for lint errors
npm run build             # Ensure build succeeds
```

**VS Code Extensions (Recommended):**
- ESLint
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- i18n Ally (for translations)

### Git Workflow

```
main (production)
  ↓
feature/branch-name (development)
  ↓
Pull Request → Review → Merge
```

**Commit Messages:**
- Use conventional commits format
- Examples: `feat: add tutorial page`, `fix: correct translation key`

## Monitoring & Debugging

### Development Tools

**React Developer Tools:**
- Inspect component tree
- View props and state
- Profile performance

**Next.js Built-in:**
- Error overlay with stack traces
- Fast refresh with component preservation
- Build output analysis

### Production Monitoring

**Google Analytics:**
- Page views
- User behavior
- Traffic sources
- Engagement metrics

**Vercel Analytics (Optional):**
- Real User Monitoring
- Core Web Vitals
- Performance insights

### Error Tracking

**Current:** Browser console only

**Future Consideration:**
- Sentry for error tracking
- LogRocket for session replay
- Performance monitoring tools

## Security Considerations

### Current Security Measures

1. **No user input:** Static site, no forms or user data
2. **Environment variables:** Properly scoped and secured
3. **Dependencies:** Regular npm audit
4. **HTTPS only:** In production (via Vercel)
5. **No sensitive data:** Everything is public

### Future Security Needs

**If Adding User Features:**
- Input validation and sanitization
- CSRF protection
- Rate limiting
- Content Security Policy headers
- XSS prevention

## Performance Optimization

### Current Optimizations

1. **Server-side rendering:** All pages pre-rendered
2. **Code splitting:** Automatic per route
3. **Tree shaking:** Unused code removed
4. **Minification:** JS and CSS minified
5. **Tailwind purging:** Only used classes included

### Future Optimizations

**When Adding Images:**
- Use Next.js Image component
- WebP format with fallbacks
- Lazy loading
- Proper sizing and compression

**When Adding More Content:**
- Implement incremental static regeneration
- Add caching headers
- Consider CDN for static assets
- Optimize font loading

## Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Kill existing process
pkill -f "next dev"
# Or use different port
npm run dev -- -p 3011
```

**Build Fails:**
```bash
# Clear cache
rm -rf .next
npm run build
```

**Translation Not Found:**
- Check message key exists in all locale files
- Verify namespace is correct
- Ensure proper JSON syntax

**GTM Not Loading:**
- Verify GTM_ID in .env.local
- Check browser console for errors
- Ensure proper GTM container setup

## Backup & Recovery

**Version Control:** Git + GitHub
- All code is version controlled
- Can roll back to any commit
- Branch protection on main

**No Database:** No backup needed
- All content is in code
- Translations in JSON files
- Can rebuild from source

## Future Technical Considerations

### Potential Additions

**Search:**
- Algolia for hosted search
- Or local search with Lunr.js
- Full-text indexing

**CMS:**
- Contentful or Sanity for content management
- Or keep with file-based content

**Testing:**
- Jest for unit tests
- Playwright for E2E tests
- Chromatic for visual regression

**Performance:**
- Bundle analyzer for optimization
- Lighthouse CI in deployment pipeline
- Performance budgets

### Scaling Considerations

**If Traffic Grows:**
- Vercel scales automatically
- Edge caching handles traffic
- No database = no scaling issues
- Consider paid Vercel plan for analytics

**If Content Grows:**
- Consider dynamic routes for blog posts
- Implement pagination
- Add search functionality
- Optimize build times with ISR
