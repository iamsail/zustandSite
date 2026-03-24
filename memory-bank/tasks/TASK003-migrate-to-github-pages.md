# TASK003 - Migrate to GitHub Pages

**Status:** Completed  
**Added:** 2026-03-23  
**Updated:** 2026-03-24

## Original Request
迁移部署平台从 Vercel 到 GitHub Pages，保留自定义域名 zustand.site。

## Thought Process
Next.js + next-intl 的中间件路由在 GitHub Pages（纯静态托管）上无法运行。
解决方案：切换为 next-intl 的静态模式（`generateStaticParams` + `setRequestLocale`），
配合 `output: 'export'`，将所有页面在构建时预渲染为静态 HTML。

博客 `blog/[slug]` 已有 `generateStaticParams`（5 个 slug × 3 locale = 15 页），无需额外改动逻辑。

`robots.ts`/`sitemap.ts` 需要加 `export const dynamic = 'force-static'` 才能在静态导出模式下工作。

`messages/*.json` 缺少部分命名空间（`compare`、`blog`、`faq`），需在 `i18n.ts` 配置容错处理，
避免构建时崩溃。

## Implementation Plan
- [x] `next.config.js`: 添加 `output: 'export'`, `trailingSlash: true`
- [x] 删除 `middleware.ts`
- [x] `app/[locale]/layout.tsx`: 添加 `setRequestLocale` 调用
- [x] 全部 18 个 `app/[locale]/**/page.tsx`: 添加 `setRequestLocale(locale)`
- [x] 新建 `app/page.tsx`: 根路径重定向到 `/en/`
- [x] 新建 `.github/workflows/deploy.yml`: push to `main` 自动构建部署
- [x] 新建 `public/CNAME`: `zustand.site`
- [x] `app/robots.ts` + `app/sitemap.ts`: 添加 `export const dynamic = 'force-static'`
- [x] `i18n.ts`: 添加 `onError` + `getMessageFallback` 容错

## Progress Tracking

**Overall Status:** Completed — 100%

### Subtasks
| ID | Description | Status | Updated | Notes |
|----|-------------|--------|---------|-------|
| 3.1 | next.config.js 静态导出配置 | Complete | 2026-03-23 | |
| 3.2 | 删除 middleware.ts | Complete | 2026-03-23 | |
| 3.3 | layout.tsx setRequestLocale | Complete | 2026-03-23 | generateStaticParams 已存在 |
| 3.4 | 18 个页面添加 setRequestLocale | Complete | 2026-03-23 | |
| 3.5 | app/page.tsx 根路径重定向 | Complete | 2026-03-23 | client component, useEffect |
| 3.6 | GitHub Actions workflow | Complete | 2026-03-23 | peaceiris/actions-gh-pages@v4 |
| 3.7 | public/CNAME | Complete | 2026-03-23 | |
| 3.8 | robots.ts/sitemap.ts force-static | Complete | 2026-03-24 | 修复静态导出构建错误 |
| 3.9 | i18n.ts 容错配置 | Complete | 2026-03-24 | 修复缺失翻译 key 导致的构建崩溃 |
| 3.10 | 本地构建验证 | Complete | 2026-03-24 | out/ 目录正确生成 |

## Progress Log
### 2026-03-23
- 制定迁移方案：确认 next-intl v4 支持静态导出
- 确认 blog/[slug] 已有 generateStaticParams，无需改动
- 实施 Phase 1-4：配置、middleware 删除、setRequestLocale、新建文件

### 2026-03-24
- 首次构建失败：robots.ts/sitemap.ts 不支持静态导出
- 修复：添加 `export const dynamic = 'force-static'`
- 二次构建失败：缺失翻译 key (MISSING_MESSAGE: compare)
- 修复：i18n.ts 添加 onError + getMessageFallback 容错
- 构建成功：out/ 包含 en/zh/ja 三个 locale，blog 5篇文章，CNAME, robots.txt, sitemap.xml

## Remaining (Out of Scope)
- GitHub repo Settings → Pages → Source: `gh-pages` branch（手动设置）
- DNS 更新（手动操作）
- Vercel 项目暂停/删除（待 DNS 稳定后）
- 补充缺失翻译：`compare`、`blog`、`faq` 命名空间
