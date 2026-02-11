# GETTUPPENT - Absolute Zenith Development Guidelines

> **AI-First, Security-First, Test-First Development (v5.0.0)**

## 🌌 The Zenith Mandate

Every line of code in this repository MUST adhere to the **Absolute Zenith** invariants. Failure to comply triggers an architectural review.

## 🛠️ Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS, Three.js (3D)
- **Backend**: Firebase (Auth, Firestore, Admin SDK)
- **Logic**: Zod Schemas at every boundary
- **Verifications**: Vitest (Unit), Playwright (E2E), Zenith-Check (Scripts)

## ⚖️ Ironclad Invariants

### 1. Security & Auth

- **No Raw Queries**: Parameterized logic only.
- **Session Integrity**: Regenerate session IDs on every login.
- **Admin Isolation**: Admin operations strictly via `firebase-admin` in secure route handlers.
- **Strict Headers**: CSP and X-Frame-Options mandatory.

### 2. Architectural Purity

- **Clean Code SRP**: Functions < 20 lines. Modules < 200 lines.
- **Guard Clauses**: Use Early Returns for all logic branches.
- **Path Resolution**: Prefer absolute imports (`@/lib/...`) over relative paths.
- **Type Safety**: Prefer `interface` over `type`. Absolute strict mode.

### 3. Performance & SEO

- **Core Web Vitals**: LCP < 2.5s is a hard limit.
- **Discovery**: Unique Title/Meta per route. Proper H1 hierarchy.
- **Assets**: WebP only. Lazy load 3D and heavy media.

---

## 🚀 Zenith Workflow

### I. Planning

1. Research existing library patterns.
2. Draft an implementation plan.
3. Define Zod DTOs for the feature boundaries.

### II. Execution

1. **Red**: Write a failing test.
2. **Green**: Write minimal code to pass.
3. **Refactor**: Align with Clean Code SRP.

### III. Verification

1. `npm run full_audit` (Lint, Types, Tests).
2. `tsx scripts/api_validator.ts` (API Protocol).
3. `tsx scripts/schema_validator.ts` (Data Protocol).

---

**Maintained By**: Transcendent AI Architect
**Status**: Absolute Zenith (Ironclad)
