# Active Context

## Current Work Focus
GitHub Pages migration complete on `feature/gh` branch. Ready to merge to `main`.

## Recent Changes
- Migrated deployment from Vercel to GitHub Pages (static export).
- Added `output: 'export'` and `trailingSlash: true` to `next.config.js`.
- Deleted `middleware.ts` (replaced by `generateStaticParams` + `setRequestLocale`).
- Added `setRequestLocale(locale)` to all 18 page files and `layout.tsx`.
- Created `app/page.tsx` root redirect (`/` → `/en/`).
- Created `.github/workflows/deploy.yml` (push to `main` triggers build & deploy to `gh-pages` branch).
- Created `public/CNAME` (`zustand.site`).
- Added `export const dynamic = 'force-static'` to `app/robots.ts` and `app/sitemap.ts`.
- Configured `i18n.ts` with `onError` + `getMessageFallback` to gracefully handle missing translation keys during build.

- 修复 `Header.tsx` 中缺失的 `nav.blog` 和 `nav.compare` translation keys（三个语言文件均已补充）。

## Next Steps
1. Merge `feature/gh` → `main` to trigger GitHub Actions deploy.
2. GitHub repo Settings → Pages → Source: `gh-pages` branch.
3. DNS: Add A records to GitHub Pages IPs (`185.199.108.153/154/155/156`) + `www` CNAME → `iamsail.github.io`.
4. After DNS stabilizes, pause/delete Vercel project.
5. Fill in missing translation namespaces: `compare`, `blog`, `faq` in `messages/*.json`.

## Active Decisions
- **Content Structure:** Using `app/[locale]/` for routing.
- **Styling:** Tailwind CSS for rapid UI development.
- **i18n:** `next-intl` static mode (`setRequestLocale` + `generateStaticParams`).
- **Deployment:** GitHub Pages via `gh-pages` branch, custom domain `zustand.site`.
- **Build:** `output: 'export'` — all pages fully static, no server runtime.
