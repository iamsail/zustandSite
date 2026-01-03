# 站点路由文档 (Site Routes)

本项目基于 Next.js App Router 构建，采用 `next-intl` 进行国际化路由管理。

## 路由结构

所有页面路由均位于 `app/[locale]/` 目录下，URL 结构为 `/:locale/:path`。

**支持的语言代码 (`:locale`)：**
- `en` (English - 默认)
- `zh` (中文)
- `ja` (日本語)

> **注意**：访问根路径 `/` 时，中间件会自动根据浏览器语言偏好重定向到相应的语言路径（如 `/en` 或 `/zh`）。

## 页面路由列表

以下是当前项目中所有可访问的页面路由：

| 路径 (Path) | 对应文件 (Source File) | 说明 (Description) |
| :--- | :--- | :--- |
| `/` | `app/[locale]/page.tsx` | **首页** - 项目介绍与入口 |
| `/docs` | `app/[locale]/docs/page.tsx` | **文档概览** - 核心概念与基础文档 |
| `/tutorial` | `app/[locale]/tutorial/page.tsx` | **教程** - 逐步学习 Zustand |
| `/examples` | `app/[locale]/examples/page.tsx` | **示例** - 代码示例与演示 |
| `/api` | `app/[locale]/api/page.tsx` | **API 参考** - 详细的 API 接口说明 |
| `/guides` | `app/[locale]/guides/page.tsx` | **指南索引** - 高级主题指南列表 |
| `/guides/nextjs-app-router` | `app/[locale]/guides/nextjs-app-router/page.tsx` | **Next.js 指南** - 在 App Router 中使用 Zustand |
| `/guides/typescript-best-practices` | `app/[locale]/guides/typescript-best-practices/page.tsx` | **TypeScript 指南** - 类型定义与最佳实践 |
| `/guides/persistence-and-middleware` | `app/[locale]/guides/persistence-and-middleware/page.tsx` | **中间件指南** - 状态持久化与中间件使用 |
| `/comparison/redux-vs-zustand` | `app/[locale]/comparison/redux-vs-zustand/page.tsx` | **对比** - Zustand 与 Redux 的详细对比 |

## 动态路由与 API

目前项目中没有定义动态参数路由（如 `/docs/[slug]`），所有路由均为静态路径。
API 路由（Next.js Route Handlers）目前未在 `app/[locale]` 结构中发现，主要使用 Server Components 进行数据获取。
