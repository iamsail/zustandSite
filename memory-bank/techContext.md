# Tech Context

## Technologies
- **Frontend:** Next.js 16, React 19.
- **Language:** TypeScript 5.
- **Styling:** Tailwind CSS 4, PostCSS.
- **i18n:** `next-intl` v4.5.5 (static mode: `generateStaticParams` + `setRequestLocale`).
- **SEO:** `next-seo` (or built-in Next.js Metadata API).
- **Analytics:** Google Tag Manager (`react-gtm-module`).

## Development Setup
- Package Manager: `npm`.
- Port: 3010 (custom port in scripts).
- **Build:** `next build` → `output: 'export'` → static files in `out/`.
- **Deployment:** GitHub Pages (`gh-pages` branch), custom domain `zustand.site`.
  - GitHub Actions workflow: `.github/workflows/deploy.yml` triggers on push to `main`.
  - Uses `peaceiris/actions-gh-pages@v4` to deploy `out/` directory.
  - `public/CNAME` = `zustand.site`.

## Constraints
- **Performance:** LCP < 1.2s is a target.
- **SEO:** Strict adherence to semantic HTML and metadata guidelines.
- **Static Export:** No server-side runtime. All pages must be pre-renderable at build time.
  - `middleware.ts` removed (no runtime to execute it).
  - `robots.ts` and `sitemap.ts` use `export const dynamic = 'force-static'`.
  - `i18n.ts` configured with `onError`/`getMessageFallback` to tolerate missing message keys.
