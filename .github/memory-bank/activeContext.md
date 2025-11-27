# Active Context - Zustand Documentation Site

**Last Updated:** 2025-11-27  
**Current Phase:** Production on Vercel  
**Branch:** feature/vercel

## Current Work Focus

### Recent Bug Fixes: Language Switcher (2025-11-27)

**Status:** Completed

**Bug 1: 404 on language switch**
Fixed a critical bug where switching languages resulted in a 404 error due to URL path being incorrectly constructed (e.g., `/zh/zh` instead of `/zh`).
- Solution: Used regex pattern `^/(en|zh|ja)(?=/|$)` in `changeLanguage()`

**Bug 2: Language selector showing wrong language**
Fixed issue where the language dropdown showed "English" even when on `/zh` page.
- Root Cause: `NextIntlClientProvider` was missing the `locale` prop
- Solution: Added `locale={locale}` to `NextIntlClientProvider` in `app/[locale]/layout.tsx`

## Recent Changes

### 2025-11-27: Language Switcher Bug Fixes
- Fixed `changeLanguage()` function in `components/Header.tsx` (regex-based replacement)
- Fixed `NextIntlClientProvider` missing `locale` prop in `app/[locale]/layout.tsx`

### 2025-11-25: Vercel Deployment Preparation
- Created `vercel.json` configuration file with:
  - Next.js framework detection
  - Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
  - Caching headers for sitemap.xml and robots.txt
  - Region set to Tokyo (hnd1) for Asia optimization
- Updated `lib/seo-config.ts` to use `NEXT_PUBLIC_SITE_URL` environment variable
- Updated `app/sitemap.ts` to use environment variable for base URL
- Updated `app/robots.ts` to use environment variable for sitemap URL
- Updated `app/layout.tsx` to use environment variable for metadataBase
- Updated `.env.example` with default Vercel domain

### 2025-11-20: Memory Bank Setup (TASK001 - Completed)
- Added Memory Bank documentation system
- Created all 6 core Memory Bank files
- Established task management structure
- Committed and pushed to GitHub

## Current State

### ✅ Completed Components

**Project Infrastructure:**
- ✅ Next.js 16 with App Router
- ✅ TypeScript strict mode
- ✅ Tailwind CSS v4
- ✅ Multi-language support (en, zh, ja)
- ✅ SEO configuration
- ✅ Memory Bank documentation

**Deployment Configuration:**
- ✅ vercel.json created
- ✅ Environment variable based domain config
- ✅ Security headers configured
- ✅ Caching headers for static files

### 🚧 In Progress

**TASK002: Vercel Deployment**
- ✅ Created vercel.json
- ✅ Updated domain configuration
- ⏳ Commit and push to GitHub
- ⏳ Vercel auto-deploy

## Environment Variables for Vercel

```
NEXT_PUBLIC_SITE_URL=https://zustand-site.vercel.app
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX  (optional)
```

## Next Steps

1. ✅ Create vercel.json configuration
2. ✅ Update domain configuration  
3. ⏳ Commit all changes
4. ⏳ Push to GitHub
5. Import project in Vercel dashboard
6. Configure environment variables
7. Verify deployment

## Summary

The project is now fully configured for Vercel deployment. All domain references use environment variables for easy configuration. After pushing to GitHub, Vercel will automatically deploy the Next.js application.
