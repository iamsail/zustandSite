# System Patterns

## Architecture
- **Framework**: Next.js 16 App Router.
- **Styling**: Tailwind CSS.
- **Internationalization**: `next-intl` with middleware for locale detection and routing.
- **State Management**: Zustand (of course!).

## Key Decisions
- **i18n Strategy**: Using `next-intl` with JSON message files located in `messages/{locale}.json`.
- **Routing**: `app/[locale]/...` structure for localized routes.
- **Components**: Server Components used where possible, Client Components (`'use client'`) for interactive elements and hooks usage.

## Design Patterns
- **Translation Hooks**: `useTranslations` in Client Components, `getTranslations` in Server Components.
- **Namespace Organization**: Translation keys are organized by page or component (e.g., `home`, `guides`, `footer`).
