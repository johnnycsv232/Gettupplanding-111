# Technical Specification - GETTUPP ENTERPRISE Hardening

## Overview

This specification details the technical changes required to address the security, performance, and SEO risks identified in the audit.

## Implementation Details

### 1. Authentication Integration in API Routes

- **Files**: `src/app/api/checkout/route.ts`
- **Approach**:
  - Extract `Authorization` header.
  - Use `adminAuth.verifyIdToken(token)` from `firebase-admin`.
  - Replace hardcoded `userId` with `decodedToken.uid`.
  - Use `idempotencyKey` in `stripe.checkout.sessions.create` (e.g., `crypto.randomUUID()`).

### 2. Security Headers & CSP

- **Files**: `next.config.ts`
- **Approach**:
  - Define a CSP that allows necessary sources (Unsplash, Firebase, Stripe, Sanity).
  - Add `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security`.

### 3. Firebase App Check & Analytics

- **Files**: `src/lib/firebase.ts`, `firestore.rules`
- **Approach**:
  - Initialize App Check in `getFirebaseApp()` using `ReCaptchaV3Provider`.
  - Initialize Analytics using `getAnalytics()`.
  - Update `firestore.rules` for `leads` to check `request.auth != null` OR enforce App Check if possible (Note: Leads are often unauthenticated, so App Check is the primary defense).

### 4. Schema Consolidation & Strict Validation

- **Files**: `src/lib/schemas.ts`, `src/lib/zod-schemas.ts`, `src/lib/validations/stripe.ts`
- **Approach**:
  - Merge `src/lib/zod-schemas.ts` into `src/lib/schemas.ts`.
  - Replace `.passthrough()` with `.strict()` in `src/lib/validations/stripe.ts`.
  - Ensure all DTOs are strict.

### 5. SEO & Metadata

- **Files**: `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`
- **Approach**:
  - Add `canonical` URL to `metadata` in `layout.tsx`.
  - Implement a `JsonLd` component to inject structured data.
  - Create `sitemap.ts` and `robots.ts` using Next.js file-based metadata.

### 6. Centralized Logging

- **Files**: `src/lib/logger.ts`
- **Approach**:
  - Create a simple logger wrapper that can be extended to Sentry later.
  - Replace `console.error` calls with `logger.error`.

## Verification Plan

- **Lint**: `npm run lint`
- **Type Check**: `npm run type-check`
- **Security Tests**: Run `npm run test` (existing tests should pass).
- **Manual Verification**: Check security headers in browser DevTools. Verify Analytics initialization in console.
