# Error Handling Strategy

This document outlines the standard error handling patterns for the application.

## 1. Global Error Boundaries

- **Root Level**: Next.js `global-error.tsx` catches errors in the root layout.
- **Route Level**: Next.js `error.tsx` catches errors in page segments.

## 2. Component Error Boundaries

Use the `<ErrorBoundary>` component to wrap complex or risky UI sections (e.g., specific widgets, data-heavy components) to prevent the entire page from crashing.

```tsx
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

<ErrorBoundary fallback={<MyFallback />}>
  <ComplexComponent />
</ErrorBoundary>
```

## 3. Asynchronous Errors

- **Server Components**: Errors thrown in Server Components are caught by the nearest `error.tsx` boundary.
- **Client Components**: Handle async errors (e.g., fetch failures) using:
  - `try/catch` blocks inside `useEffect` or event handlers.
  - SWR/TanStack Query `error` states.

## 4. API Routes

API routes should return standardized error responses:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

## 5. Logging

All unhandled errors should be logged to the console (and eventually sent to Sentry/monitoring service).
