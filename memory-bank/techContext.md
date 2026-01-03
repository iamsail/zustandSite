# Tech Context

## Technologies
- **Frontend:** Next.js 16, React 19.
- **Language:** TypeScript 5.
- **Styling:** Tailwind CSS 4, PostCSS.
- **i18n:** `next-intl`.
- **SEO:** `next-seo` (or built-in Next.js Metadata API).
- **Analytics:** Google Tag Manager (`react-gtm-module`).

## Development Setup
- Package Manager: `npm` (inferred from `package.json` scripts, though lockfile not seen).
- Port: 3010 (custom port in scripts).
- **Deployment:** Vercel (configured to build only on `main` and `dev` branches via `build-ignore.sh`).

## Constraints
- **Performance:** LCP < 1.2s is a target.
- **SEO:** Strict adherence to semantic HTML and metadata guidelines.
