# Progress

## Status
- **Project Setup:** Complete.
- **Basic Pages:** Home, Docs, Examples, Tutorial exist.
- **i18n:** Configured (static mode with `setRequestLocale`).
- **DevOps:** GitHub Pages deployment configured via GitHub Actions.

## What's Left to Build (SEO Focus)
- [x] Comparison Page (Zustand vs Redux).
- [x] Advanced Middleware/Persist Guide.
- [x] Next.js App Router Integration Guide.
- [x] TypeScript Optimization (Metadata).
- [x] Schema Markup Implementation.
- [x] Sitemap Update.
- [x] GitHub Pages migration.

## Known Issues
- Page-level translation namespaces still incomplete in `messages/*.json`: `compare`, `blog`, `faq`.
  Pages using these namespaces display key paths as placeholders until content translations are filled in.
  (Nav keys `nav.blog` and `nav.compare` are fixed.)
