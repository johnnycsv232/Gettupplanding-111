# Pagination vs. Infinite Scroll

To ensure a consistent user experience, Zenith application components must adhere to the following data navigation patterns.

## 1. Decision Matrix

| Data Type | Interaction | Recommended Pattern |
|---|---|---|
| **Data Tables** (e.g. Dashboard Leads, Users) | Sort, Filter, Detail View | **Pagination** |
| **Search Results** | Scanning for specific item | **Pagination** |
| **Feeds** (e.g. Activity Log, Social Feed) | Consumption flow | **Infinite Scroll** |
| **Grid Data** (e.g. Image Gallery) | Visual browsing | **Infinite Scroll** |

## 2. Pagination Standard

- **Hook**: Use `usePagination` hook (`@/hooks/use-pagination`).
- **State**: MUST rely on URL Search Params (`?page=2`). This ensures shareability and "back" button functionality.
- **UI**: Standard numbered links with Prev/Next buttons.

```tsx
// Example Logic
const searchParams = useSearchParams();
const page = Number(searchParams.get('page')) || 1;
const { range, hasNext } = usePagination({ totalItems: 100, itemsPerPage: 10, currentPage: page });
```

## 3. Infinite Scroll Standard

- **Library**: Use `react-intersection-observer` for trigger detection.
- **Data Fetching**: Use SWR or React Query's `useInfiniteQuery` pattern (or standard server actions with client-side appending).
- **History**: Avoid managing infinite scroll position on "back" navigation unless using a complex restoration strategy (usually not worth the complexity for V1).

## 4. API Response Requirement

All listing endpoints must return:

```ts
interface Meta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}
```

This ensures the frontend can accurately render either pattern.
