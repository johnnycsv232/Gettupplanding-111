# Data Fetching Strategy

## 1. Core Principle: Server First

Leverage React Server Components (RSC) to fetch data on the server whenever possible. This reduces client bundle size and improves initial load performance.

### Pattern

```tsx
// server-component.tsx
export default async function Page() {
  const data = await getData(); // Direct DB call or internal API
  return <ClientComponent initialData={data} />;
}
```

## 2. Client-Side Fetching

Use client-side fetching **only** for:

- User-driven updates (search, filtering after load).
- Real-time data (polling).
- Lazy loading content below the fold.

### Recommended Tooling

- **Native `fetch`**: For simple, one-off requests.
- **SWR / React Query**: Recommended for complex caching key invalidation and revalidation (if introduced). *Currently using native patterns.*

## 3. Server Actions

Use Server Actions for **mutations** (POST/PUT/DELETE).

```tsx
// actions.ts
"use server";
export async function createItem(formData: FormData) {
  // DB logic
  revalidatePath('/items'); // Cache invalidation
}
```

## 4. Caching (Next.js)

- **Static (Default)**: `fetch('...', { cache: 'force-cache' })`
- **Dynamic**: `fetch('...', { cache: 'no-store' })`
- **Revalidated**: `fetch('...', { next: { revalidate: 3600 } })`

## 5. Security

- Never expose secrets (API keys, DB credentials) in client components.
- Use `server-only` package to prevent accidental import of server code in client.
