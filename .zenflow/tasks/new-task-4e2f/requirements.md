# Product Requirements Document (PRD) - GETTUPP ENTERPRISE Audit & Hardening

## Overview
The goal of this task is to perform a comprehensive audit and hardening of the GETTUPP ENTERPRISE landing page application. This involves addressing identified security risks, improving SEO, initializing analytics, and ensuring the application follows best practices across the full stack.

## Identified Risks & Requirements

### 1. Security & Identity
- **Requirement**: Remove hardcoded user identities in the checkout flow.
- **Implementation**: Extract `userId` from the authenticated session instead of using "demo-user-123" in `src/app/api/checkout/route.ts`.
- **Requirement**: Secure Firestore data ingress.
- **Implementation**: Update `firestore.rules` to require App Check or additional validation for the `leads` collection.
- **Requirement**: Implement standard security headers.
- **Implementation**: Add Content Security Policy (CSP), X-Frame-Options, HSTS, and other security headers to `next.config.ts`.
- **Requirement**: Protect client-side Firebase configuration.
- **Implementation**: Ensure Firebase App Check is enabled and configured to protect against unauthorized usage of client-side config.

### 2. SEO & Analytics
- **Requirement**: Improve SEO visibility.
- **Implementation**: Add JSON-LD (Schema.markup) and canonical tags to `src/app/layout.tsx`. Generate `sitemap.ts` and `robots.ts`.
- **Requirement**: Fix analytics tracking.
- **Implementation**: Initialize `getAnalytics()` in `src/lib/firebase.ts` to ensure conversion tracking is active.

### 3. API & Validation
- **Requirement**: Enforce strict data validation.
- **Implementation**: Change `.passthrough()` to `.strict()` in all Zod schemas (especially in `src/lib/validations/stripe.ts`) to prevent unknown data injection.
- **Requirement**: Implement Idempotency in Stripe writes.
- **Implementation**: Use `idempotencyKey` when calling `stripe.checkout.sessions.create` in the checkout route.

### 4. Code Quality & Observability
- **Requirement**: Improve error logging.
- **Implementation**: Replace ad-hoc `console.error` with a more robust logging strategy (e.g., centralized logger or prepare for Sentry).
- **Requirement**: Resolve dependency risks.
- **Implementation**: Audit the usage of Next.js 16.1.4 (Canary) and ensure no regressions.
- **Requirement**: Clean up duplicate schemas.
- **Implementation**: Consolidate `UserSchema` and `SubscriptionSchema` between `src/lib/schemas.ts` and `src/lib/zod-schemas.ts`.

### 5. Design & Brand Alignment
- **Requirement**: Enhance the landing page visuals and design.
- **Implementation**: Ensure "The GettUpp Look" is consistent across all components, utilizing the 3D engine and design tokens effectively.

## Success Criteria
- All 10 identified risks are addressed.
- Security audit passes with high scores across all categories.
- SEO audit shows improvement (Schema.org markup present).
- Analytics are correctly initialized.
- Codebase is refactored for better maintainability and strict type safety.
