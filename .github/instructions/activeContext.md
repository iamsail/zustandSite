# Active Context

## Current Focus
Internationalization (i18n) of the entire site. We have just completed migrating all hardcoded text to `messages/*.json` files and updating components to use `next-intl` hooks.

## Recent Changes
- **Documentation**: Created `ROUTES.md` to document all available page routes and their file paths.
- **Verification**: Verified project startup (`npm run dev`) and confirmed no critical errors.
- **Bug Fixes**:
  - Fixed `NextIntlClientProvider` in `layout.tsx` to explicitly pass `locale` prop, resolving language switcher issues.
  - Added missing translations for `guides.typescript` and `guides.middleware` in `zh.json` and `ja.json`.
  - Escaped special characters (e.g., `<MyState>`) in translation files to prevent `next-intl` parsing errors.
- **Guides**: Internationalized `nextjs-app-router`, `persistence-and-middleware`, `typescript-best-practices`, and the main `guides` page.
- **Docs**: Internationalized `docs/page.tsx`.
- **Tutorial**: Internationalized `tutorial/page.tsx`.
- **Examples**: Internationalized `examples/page.tsx`.
- **API**: Internationalized `api/page.tsx`.
- **Comparison**: Verified `comparison/redux-vs-zustand/page.tsx` is internationalized.
- **Components**: Internationalized `Footer.tsx` and verified `Header.tsx`.
- **Messages**: Updated `en.json`, `zh.json`, and `ja.json` with all new keys.

## Next Steps
- **Search**: Implement search functionality (TASK002).
- **Dark Mode**: Implement dark mode support (TASK003).
- **Deployment**: Ensure Vercel deployment is successful.
