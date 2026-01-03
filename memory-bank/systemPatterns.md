# System Patterns

## Architecture
- **Framework:** Next.js 16 (App Router).
- **Language:** TypeScript.
- **Styling:** Tailwind CSS 4.
- **State Management:** Zustand (used in examples and potentially for site state if needed).
- **Internationalization:** `next-intl` with middleware for locale routing.

## Directory Structure
- `app/[locale]/`: Localized page routes.
- `components/`: Reusable UI components.
- `messages/`: JSON files for translations.
- `lib/`: Utility functions and configurations.

## Design Patterns
- **Server Components:** Default for pages to ensure SEO and performance.
- **Client Components:** Used only when interactivity is needed (e.g., interactive examples).
- **Layouts:** Nested layouts for shared UI (Header, Footer).
