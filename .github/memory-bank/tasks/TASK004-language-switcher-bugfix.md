# TASK004 - Language Switcher Bug Fix

**Status:** Completed  
**Added:** 2025-11-27  
**Updated:** 2025-11-27

## Original Request

用户报告：多语言切换有bug，在 `/zh` 页面点击中文后跳转到 `/zh/zh`，出现 404 错误。

## Problem Analysis

**Symptoms:**
- User on `/zh` (Chinese homepage)
- Clicks language switcher, selects Chinese
- URL becomes `/zh/zh` instead of staying at `/zh`
- Results in 404 error

**Root Cause:**
The `changeLanguage` function in `components/Header.tsx` used simple string replacement:
```tsx
const currentPath = pathname.replace(`/${locale}`, '');
```

This approach had issues:
1. String `replace()` doesn't guarantee matching only at path start
2. Could fail to match if locale variable was out of sync
3. No boundary checking for the locale pattern

## Solution

Changed to regex-based replacement with proper boundary matching:
```tsx
const localePattern = new RegExp(`^/(${['en', 'zh', 'ja'].join('|')})(?=/|$)`);
const currentPath = pathname.replace(localePattern, '');
window.location.href = `/${newLocale}${currentPath || ''}`;
```

**Regex Pattern Explanation:**
- `^/` - Must start with forward slash
- `(en|zh|ja)` - Match any supported locale
- `(?=/|$)` - Lookahead: must be followed by `/` or end of string
- This ensures we only replace the locale prefix, not other path segments

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
| 4.3 | Update Memory Bank | Complete | 2025-11-27 | All files updated |
| 4.4 | Commit changes | Complete | 2025-11-27 | Pushed to GitHub |

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

## Notes

- The fix handles all three locales: en, zh, ja
- Works for both root paths (e.g., `/zh`) and nested paths (e.g., `/zh/docs`)
- Uses lookahead assertion to ensure proper boundary matching
