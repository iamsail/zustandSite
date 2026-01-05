# [TASK002] - Update Sitemap

**Status:** In Progress
**Added:** 2026-01-05
**Updated:** 2026-01-05

## Original Request
User asked "sitemap更新了吗" (Has the sitemap been updated?).
Upon checking, the sitemap is missing the newly created pages from the SEO strategy implementation.

## Thought Process
The `app/sitemap.ts` file needs to be updated to include the new routes:
- `/comparison/redux-vs-zustand`
- `/guides`
- `/guides/nextjs-app-router`
- `/guides/persistence-and-middleware`
- `/guides/typescript-best-practices`

I should also verify if `/compare` is still relevant or if it overlaps with `/comparison`. The file structure shows both exist. I will keep both for now but ensure the new ones are added.

## Implementation Plan
1.  Update `app/sitemap.ts` to include the new routes.
2.  Verify `app/robots.ts` (optional, but good practice).

## Progress Tracking

**Overall Status:** Completed - 100%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 1.1 | Update `app/sitemap.ts` | Completed | 2026-01-05 | Added new routes |

## Progress Log
### 2026-01-05
- Created task file.
- Updated `app/sitemap.ts` with new routes.
- Verified `app/robots.ts`.
- Task completed.
