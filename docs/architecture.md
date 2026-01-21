# GETTUPP ENTERPRISE - Architecture Decisions

> **Decision Status**: FROZEN (All changes must be appended, not edited)

## 🏗️ Core Tech Stack

- **Framework**: Next.js 15 (App Router).
- **Runtime**: Node.js 20+.
- **Language**: TypeScript 5.6 (Strict Mode).
- **Styling**: CSS Modules + Global Tokens.
- **Backend-as-a-Service**: Firebase (Auth, Firestore).
- **CMS**: Sanity (GROQ).
- **Payments**: Stripe (Webhook-First).
  - **Verified Price IDs**:
    - Pilot ($345): `price_1SY1yqGfFr3wuAHAqmytgSsj`
    - T1 ($445): `price_1SY1yqGfFr3wuAHAQhUzUNr9`
    - T2 ($695): `price_1SY1yrGfFr3wuAHAoc46u4WB`
    - T3 ($995): `price_1SY1yrGfFr3wuAHA7cULY8Ef`
- **AI Stack**: Transformers.js + WebGPU (SmolVLM-256M-Instruct).
- **Luxury Design System (The "GettUpp Look")**:
  - **Colors**: Deep Black (#000000), Metallic Gold (#D4AF37), Neon Pink (#FF007F), Neon Yellow Glow (#FFFF00).
  - **Typography**: Display: "Outfit" (900), UI: "Inter" (400-700).
  - **Effects**: Glassmorphism (blur: 20px, border: 1px white/10), Kinetic Typography, 3D Mesh Backgrounds.
- **Testing & Validation Stack**:
  - **Unit/Integration**: Vitest + React Testing Library (Behavior-Driven).
  - **End-to-End**: Playwright (Reconnaissance-first).
  - **Validation**: Zod (Mandatory DTOs for all Service/API boundaries).
  - **Mocks**: Factory Pattern (`getMockX`) for all tests.

## 🛡️ Security Invariants

1. **Headless Fulfillment**: All payment fulfillment (access grants, data updates) MUST happen via Stripe Webhooks. Client-side Success URLs are for UI only.
2. **Deny-All Firebase**: All Firestore collections must start with a `deny all` rule. Access is granted only via tested security rules.
3. **The Block Pricing Rule**: Each venue must have a separate contract and Stripe subscription. No cross-subsidization of "dead rooms."
4. **Environment Guard**: No application startup if required `.env` variables (Stripe Secret, Firebase Config) are missing or invalid.
5. **Signature Verification**: Every webhook request must undergo mandatory cryptographic signature verification.
6. **ShotClock SLAs**: Fulfillment logic must enforce 24/48/72h deadlines based on the subscription tier (T3/T2/T1).

## 🧪 Development Invariants

1. **Red-Green-Refactor**: No production code without a pre-existing failing test.
2. **Type Safety**: No usage of `any`. All API and CMS data must be parsed through Zod schemas.
3. **AI Proof Packs**: Every delivery must be logged as a "Proof Pack" in Firestore, including AI quality scores from SmolVLM.
4. **Tokenized UI**: All UI components must consume design tokens from `tokens.ts`. Hardcoded hex values are forbidden.

## 📁 Directory Structure

- `src/app/` - Layouts and Page routes.
- `src/features/` - Atomic domain modules (Landing, Checkout, Portfolio).
- `src/lib/` - Shared service initializers (Firebase, Stripe, Sanity).
- `src/styles/` - Global tokens and design system logic.
- `tests/` - High-fidelity unit and integration tests.

## 🔗 Path Aliases

- `@/*` -> `src/*`
- `~types/*` -> `src/types/*`
- `~features/*` -> `src/features/*`

## 🚀 Performance Targets

- **Lighthouse Score**: 90+ (Performance, Accessibility, SEO).
- **LCP-P90**: < 2.5s.
- **CLS**: ~0.
