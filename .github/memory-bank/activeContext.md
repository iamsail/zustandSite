# Active Context - Zustand Documentation Site

**Last Updated:** 2025-12-01  
**Current Phase:** Production Live on Vercel  
**Branch:** feature/vercel

## Current Work Focus

### Site is Live and Fully Functional

**Status:** Production ✅

The Zustand documentation site is now live at https://zustand.site with:
- Full multi-language support (en, zh, ja)
- Google Analytics 4 tracking
- Google Search Console verified
- All documentation pages working
- Dark Mode support
- Blog, FAQ, and Compare pages

## Recent Changes

### 2025-12-01: Dark Mode & Content Expansion
- Added Dark Mode support with CSS variables and ThemeProvider
- Created `/blog` page with article listings
- Created `/faq` page with expandable Q&A sections
- Created `/compare` page comparing Zustand vs Redux vs MobX
- Added 3 new examples: Authentication, Theme Store, Notifications
- Updated all translations (en, zh, ja) for new pages
- Updated sitemap to include 3 new pages (now 36 URLs total)
- Added theme toggle button to header navigation

### 2025-11-30: Documentation Subpages
- Created `/docs/middleware` page - Middleware overview and custom middleware
- Created `/docs/persist` page - State persistence to localStorage/sessionStorage
- Created `/docs/devtools` page - Redux DevTools integration
- Created `/docs/immer` page - Immer integration for immutable updates
- Updated sitemap to include 4 new pages (now 27 URLs total)
- Added `backToDocs` translation for all locales
- Fixed 404 errors when clicking "Learn more" links in Advanced Topics

### 2025-11-28: Google Search Console
- Added Google Search Console verification meta tag
- Verification code: DMakwX8ttjV_Zyt1ISn-x8TfbFEMBC2k_v5MToalcPQ
- Sitemap submitted to Search Console

### 2025-11-27: Google Analytics 4
- Integrated GA4 directly (replaced GTM)
- Measurement ID: G-SP514GWMMH
- Updated layout.tsx with GA4 script tags

### 2025-11-27: Language Switcher Bug Fixes
- Fixed `changeLanguage()` function with regex pattern
- Fixed `NextIntlClientProvider` missing `locale` prop
