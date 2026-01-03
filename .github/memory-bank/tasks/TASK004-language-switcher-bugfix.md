# TASK004 - Language Switcher Bug Fix

**Status:** Completed  
**Added:** 2025-11-27  
**Updated:** 2025-11-27

## Original Request

用户报告：
1. 多语言切换有bug，在 `/zh` 页面点击中文后跳转到 `/zh/zh`，出现 404 错误
2. 语言选择器显示的语言与URL不匹配（URL是 `/zh` 但选择器显示 English）

## Problem Analysis

### Bug 1: 404 on Language Switch
**Symptoms:**
- User on `/zh` (Chinese homepage)
- Clicks language switcher, selects Chinese
- URL becomes `/zh/zh` instead of staying at `/zh`
- Results in 404 error

**Root Cause:**
The `changeLanguage` function used simple string replacement that didn't reliably match.

### Bug 2: Wrong Language Displayed in Selector
**Symptoms:**
- URL shows `/zh` (Chinese)
- But language dropdown shows "English" as selected

**Root Cause:**
`NextIntlClientProvider` was missing the `locale` prop, so `useLocale()` couldn't determine the current locale in client components.

## Solution

### Fix 1: Regex-based URL replacement
```tsx
const localePattern = new RegExp(`^/(${['en', 'zh', 'ja'].join('|')})(?=/|$)`);
const currentPath = pathname.replace(localePattern, '');
```

### Fix 2: Pass locale to NextIntlClientProvider
```tsx
<NextIntlClientProvider locale={locale} messages={messages}>
```

## Implementation Plan

1. ✅ Analyze the bug from screenshots
2. ✅ Identify root cause in Header.tsx
3. ✅ Implement regex-based fix
4. ✅ Update Memory Bank documentation
5. ✅ Commit and push changes

## Progress Tracking

**Overall Status:** Completed - 100%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 4.1 | Analyze bug from screenshots | Complete | 2025-11-27 | Path duplication identified |
| 4.2 | Fix changeLanguage function | Complete | 2025-11-27 | Used regex pattern |
| 4.3 | Fix locale prop in Provider | Complete | 2025-11-27 | Added locale to NextIntlClientProvider |
| 4.4 | Update Memory Bank | Complete | 2025-11-27 | All files updated |
| 4.5 | Commit changes | Complete | 2025-11-27 | Pushed to GitHub |

## Progress Log

### 2025-11-27
- Analyzed screenshots showing `/zh` → `/zh/zh` bug
- Identified issue in `changeLanguage()` function
- Implemented fix using regex pattern for precise locale matching
- Updated Memory Bank files (activeContext.md, progress.md, _index.md)
- Created this task file
- Committed and pushed all changes

## Files Modified

1. `components/Header.tsx` - Fixed changeLanguage function
2. `app/[locale]/layout.tsx` - Added locale prop to NextIntlClientProvider

## Notes

- The fix handles all three locales: en, zh, ja
- Works for both root paths (e.g., `/zh`) and nested paths (e.g., `/zh/docs`)
- Uses lookahead assertion to ensure proper boundary matching
