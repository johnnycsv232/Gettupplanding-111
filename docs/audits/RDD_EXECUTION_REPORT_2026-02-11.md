# RDD Execution Report (2026-02-11)

## Scope

Executed an RDD pass directly in this repo with focus on:

- Verification pipeline health
- Security invariants
- Input validation invariants
- Admin data access safety
- Deploy readiness blockers

## Commands Run (Evidence)

- `npm run verify` -> failed in this Linux environment because `powershell` is unavailable.
- `npm run lint` -> initially failed with 178 errors from `.agent/**` content being linted.
- `npm run type-check` -> pass.
- `npm run test:policy` -> pass (`10/10` files, `20/20` tests).
- `npm run test:unit` -> pass (`13/13` files, `42/42` tests).
- `npm run build` -> pass.
- `npm run test:e2e:ci` -> initially failed due missing Playwright browser, then passed after `npx playwright install chromium` (`2/2` tests).
- `npx tsx scripts/doctor.ts --json` -> pass with one manual a11y warning.
- `npx tsx scripts/security_scan.ts` -> pass.
- `npx tsx scripts/schema_validator.ts` -> pass.
- `npx tsx scripts/verify-backend.ts` -> fails without admin credentials (expected outside configured env).

## Changes Applied

1. Lint signal isolation for repo code
   - `eslint.config.mjs`
   - Added ignores for `.agent/**`, `.worktrees/**`, `pyragify-output*/**`, `playwright-report/**`, `test-results/**`.
   - Result: lint now reports project-relevant issues only (warnings; no errors).

2. API input validation hardening (Zod)
   - `src/app/api/checkout/route.ts`
   - Added strict request schema (`priceId`, `tier`, `mode`) and `400` validation responses.
   - Switched redirect origin source from request header to `new URL(req.url).origin`.
   - `src/app/api/billing/portal/route.ts`
   - Added strict request schema requiring valid URL `returnUrl`.
   - Added `400` validation responses for malformed payloads.

3. Checkout client compatibility with stricter schema
   - `src/services/checkout-service.ts`
   - Default tier changed from `unknown` to `free` for string-only checkout calls.

4. Admin data-access security architecture fix
   - Added secure admin endpoint:
     - `src/app/api/admin/leads/route.ts`
     - Requires bearer token + admin claim or allowed admin email (`ADMIN_ALLOWED_EMAILS`, fallback list).
   - Reworked admin dashboard data path:
     - `src/app/admin/page.tsx`
     - Removed server-side Admin SDK lead fetch at render time.
     - Client fetches `/api/admin/leads` using Firebase ID token post-auth.
   - Result: build no longer logs Firebase Admin `project_id` error during static generation and sensitive lead prefetch at server render is removed.

5. Heading invariant improvements in touched admin views
   - `src/app/admin/page.tsx`
   - `src/app/admin/components/LeadsTable.tsx`
   - Updated section headings to use `font-display`.

6. New route-level unit tests
   - `tests/app/admin-leads.route.test.ts`
   - Covers unauthorized, forbidden, and successful admin lead retrieval.

7. Lint test hygiene fixes
   - `tests/components/ExitIntentPopup.test.tsx`
   - `tests/components/HeroSection.test.tsx`
   - Resolved import-order and unused-variable lint errors.

## Current Verified State

- Build: ✅
- Type-check: ✅
- Policy tests: ✅
- Unit tests: ✅
- E2E (CI flow): ✅
- Lint: ✅ (warnings only, no errors)

## Remaining High-Value Gaps

1. Firestore invariant #2 is not fully enforced by tests
   - `firestore.rules` defines collection rules for `users`, `subscriptions`, `proofPacks`, `leads`, `customers`.
   - `tests/security.test.ts` only checks deny-all regex + env keys, not collection-specific allow/deny behavior.
   - Risk: rules regressions can ship undetected.

2. Heading invariant still has repo-wide violations
   - Example non-display heading classes:
     - `src/app/error.tsx:19`
     - `src/features/landing/components/ProblemSolutionSection.tsx:37`
     - `src/features/landing/components/Footer.tsx:42`
     - `src/components/error/ErrorBoundary.tsx:36`
   - Automated scan found ~20 JSX heading candidates without `font-display`/`text-display`.

3. CSP policy conflict risk
   - `next.config.ts` sets a static CSP including `'unsafe-inline'` and `'unsafe-eval'`.
   - `src/proxy/security-policy.ts` also sets CSP with nonce and strict-dynamic.
   - Dual policy writers can create unexpected effective policy and weaken security posture.

4. Backend verification script requires configured credentials
   - `scripts/verify-backend.ts` fails in unconfigured env.
   - Expected locally, but should be explicitly gated or mocked in CI/local modes.

## Next Prompts (Copy/Paste)

### Prompt A — Firestore Security Test Hardening

Implement emulator-backed Firestore rule tests for all collections in `firestore.rules`.

Requirements:
- Use `@firebase/rules-unit-testing`.
- Add tests for:
  - `users`: own-read/write allowed, subscription field mutation denied.
  - `subscriptions`: own-read allowed, client writes denied.
  - `proofPacks`: own-read allowed, writes denied.
  - `leads`: create requires app check context, reads/updates/deletes denied.
  - `customers`: own-read allowed, writes denied.
- Keep tests deterministic and runnable in CI with emulator.
- Update scripts/docs with run instructions.

Acceptance:
- Failing test for any loosened rule.
- Passes in local + CI emulator environment.

### Prompt B — Display Font Invariant Enforcement

Enforce invariant: all user-facing headings use display font family.

Requirements:
- Scan `src/**` for `<h1..h6>` and identify headings missing `font-display` or `text-display`.
- Patch only user-facing views (exclude debug/error internals if intentional and documented).
- Add policy test that fails on future violations.

Acceptance:
- Heading scan returns zero violations for user-facing routes/components.
- Test included in policy suite.

### Prompt C — CSP Consolidation

Consolidate CSP generation to a single source of truth.

Requirements:
- Remove duplicate/conflicting CSP between `next.config.ts` and `src/proxy/security-policy.ts`.
- Keep nonce-based CSP with least privilege.
- Eliminate unnecessary `unsafe-eval`/`unsafe-inline` in production where possible.
- Add policy tests to assert required directives.

Acceptance:
- Single CSP writer in runtime path.
- Tests verify required headers and forbid insecure directives in production.

