# GETTUPP ENTERPRISE - Invariants (The "GettUpp Gatekeepers")

> **Rule Status**: ABSOLUTE (All agents must obey)

## 🛡️ Security Invariants

1. **Headless Fulfillment**: All payment fulfillment (access grants, data updates) MUST happen via Stripe Webhooks. Client-side Success URLs are for UI only. **Webhook is the ONLY Source of Truth for fulfillment.**
2. **Deny-All Firebase**: All Firestore collections must start with a `deny all` rule. Access is granted only via tested security rules.
3. **Strict Validation**: All Zod DTOs must use `.strict()` to prevent unknown field injection.
4. **Environment Guard**: No application startup if required `.env` variables (Stripe Secret, Firebase Config) are missing or invalid.
5. **Signature Verification**: Every webhook request must undergo mandatory cryptographic signature verification.
6. **Idempotency Lock**: Every webhook handler must verify the `Stripe-Event-Id` to prevent replay attacks.

## 🧪 Development Invariants

1. **Red-Green-Refactor**: No production code without a pre-existing failing test.
2. **Behavior over Implementation**: Tests must verify user-centric behaviors or API contracts, not internal implementation details.
3. **The Iron Law of Debugging**: No fixes without documented root cause investigation first. Symptom-fixing is prohibited.
4. **Mandatory Zod DTOs**: Every service boundary, API route, and external integration (Stripe, Sanity) must use Zod schemas for mandatory parsing and property validation.
5. **Type Safety**: No usage of `any`. All data types must be inferred from Zod schemas where possible.
6. **Factory-First Mocks**: All mock data in tests must be generated via factory functions (`getMockX`) to ensure consistency and maintainability.
7. **AI Proof Packs**: Every delivery must be logged as a "Proof Pack" in Firestore, including AI quality scores from SmolVLM.
8. **Tokenized UI**: All UI components must consume design tokens from `tokens.ts`. Hardcoded hex values are forbidden.

## 💎 Elite UX Invariants (The "GettUpp Luxury" Standard)

1. **Fluid Motion**: All interactions (hover, entrance, scroll) MUST use Framer Motion with custom spring/inertia (stiffness: 100, damping: 20). No "linear" animations.
2. **Reduced Motion**: All 3D and Framer Motion effects MUST respect `os-prefers-reduced-motion` media queries.
3. **Glass Fidelity**: Glassmorphic cards must have a 20px backdrop-blur and a 1px white/10 border at all times.
4. **3D Performance**: All Three.js/R3F sections MUST have a static image fallback for mobile and an explicit loading state (Skeleton/Progress Bar).
5. **Typography Authority**: Large headings (900 weight) must utilize metallic gradients or glow effects as per the brand image.
6. **No Flat State**: Every interactive element (Button, Card, Link) must have a visual "elevation" or "glow" feedback on hover.
7. **No Layout Shift**: All dynamic sections (Portfolio, Hero) must have predefined aspect ratios or skeletons.

## 📝 Logging & Systemic Invariants

1. **Context Sync**: `walkthrough.md` must be updated after every atomic task completion.
2. **Instruction Trace**: Every complex logic block must reference the corresponding section in `architecture.md`.
3. **Automated Guardrails**: No security-sensitive file (Firebase, Stripe, Sanity) may be edited without auto-triggering the corresponding `.claude/skills/skill-rules.json` validation.
4. **L1 Context Lock**: Every turn must verify state against `task.md` and `invariants.md` to prevent project drift.
