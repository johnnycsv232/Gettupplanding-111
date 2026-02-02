# Gettupp Architecture Guidelines

## Directory Structure

### `src/components/ui`
- Contains **generic, atomic components** (Buttons, Cards, Modals, etc.).
- These components should NOT contain business logic or feature-specific data.
- Exported via a central `index.ts` barrel.

### `src/features`
- Contains **container components** and complex feature logic.
- Each subdirectory (e.g., `landing`, `auth`) represents a single feature domain.
- Features should be as isolated as possible.

### `src/services`
- Contains **singleton services** and business logic orchestrators (e.g., `CheckoutService`).
- Used by features to interact with external APIs or global state.

### `src/lib`
- Contains **pure utilities**, configuration, and third-party library wrappers (e.g., `firebase`, `i18n`).

## Import Rules
- Use `@/` aliases defined in `tsconfig.json`.
- Avoid deep relative imports (`../../../../`).
- Prefer named exports for better discoverability and refactoring.

## Feature Barriers
- Features should not import from other features' `components`.
- If a component is needed by multiple features, move it to `src/components/ui` or a shared feature.
- Business logic shared across features should live in `src/services` or `src/hooks`.
