# State Management Guidelines

To maintain performance and predictability in the Zenith application, we adhere to strict state management rules.

## 1. Hierarchy of State

Before adding state, determine its scope:

| Scope | Solution | Example |
|---|---|---|
| **Component Local** | `useState` / `useReducer` | Form input, toggle open/close |
| **Feature Shared** | Lift State via Props / Composition | List filtering passing to items |
| **URL State** | Query Parameters (`useSearchParams`) | Search queries, pagination, tab selection |
| **Server State** | `async` / `await` in Server Components | Fetching leads, user profile data |
| **Global UI State** | `RootProvider` (Context) | Theme, Toasts, User Preferences |
| **Global Auth** | `FirebaseProvider` (Context) | User session, auth tokens |

## 2. Context Usage Rules

> **Warning**: Do not use Context for rapidly changing data (e.g., mouse position, scroll offset).

- **AVOID** creating new Contexts for single features unless absolutely necessary.
- **PREFER** Composition (passing components as children) over Context to avoid prop drilling.
- **NEVER** put complex objects in Context without memoization (`useMemo`).

### Bad (Prop Drilling)
```tsx
<Parent user={user} />
  <Child user={user} />
    <Grandchild user={user} /> // ❌ Deep coupling
```

### Good (Composition)
```tsx
<Parent>
  <Grandchild user={user} /> {/* ✅ Injected directly */}
</Parent>
```

## 3. Server vs Client State

- **Server Components** should fetch and pass initial data to Client Components.
- **Client Components** should only manage interactive state (UI).
- Avoid `useEffect` for data fetching; use Server Components or Server Actions.

## 4. URL as Source of Truth

For any state that should persist on reload or be shareable:
- **Pagination**: `?page=2`
- **Filters**: `?status=active&sort=desc`
- **Modals**: `?modal=settings` (optional, for deep linking)

## 5. Global Actions

All global state mutations must go through the Standard Action Pattern defined in `src/lib/actions.ts`.
