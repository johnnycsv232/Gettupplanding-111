# Performance Strategy

## 1. Route Prefetching (Step 37)

### Strategy

Next.js automatically prefetches links in the viewport. We will leverage this default behavior for most navigation.

### programmatic Navigation

For critical flows where the user is likely to navigate programmatically (e.g., after form submission), use the `useRouter` hook to prefetch the destination:

```tsx
const router = useRouter();

useEffect(() => {
  router.prefetch('/checkout');
}, [router]);
```

## 2. Barrel Files (Step 38)

### Audit & Policy

Barrel files (`index.ts` re-exporting modules) can hinder tree-shaking if not used carefully, especially in test environments (jest) or certain bundler configurations, though `swc` and `turbopack` handle them reasonably well.

### Best Practices

- **Feature Modules**: OK to use `index.ts` to expose the public API of a feature folder.
- **UI Kit**: OK to use `src/components/ui/index.ts` provided side-effects are minimal.
- **Avoid**: Deeply nested barrel files that re-export everything from the root.
- **Optimization**: If bundle analysis shows unused code being included, swtich to direct imports:
  - `import { Button } from '@/components/ui/button'` (Direct)
  - vs
  - `import { Button } from '@/components/ui'` (Barrel)

## 3. Image Optimization

- Always use `next/image`.
- Define explicit `sizes` prop for responsive images.
- Use explicit `width` and `height` to prevent layout shifts.

## 4. Font Optimization

- Use `next/font` for self-hosting Google Fonts (Orbitron, Inter).
- Preload subsets (latin).
