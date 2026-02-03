# Gettupp Zenith: Core Architecture Freeze

## Purpose
This document serves as the final agreement on the technical architecture of the Gettupp Zenith platform. As of Phase I Step 33, these standards are "frozen" to ensure stability and predictability during the scale-up phase.

## Technical Stack
- **Framework**: Next.js 15+ (App Router)
- **Runtime**: Node.js 20+
- **Styling**: Tailwind CSS 3.x (Atomic Consistency)
- **State Management**: React Server Actions + Optimized Context Providers
- **Database**: Firebase (Firestore) + Firebase Auth
- **Payments**: Stripe Checkout via Cloud Run Proxy

## File & Directory Standards
- **Feature-Centric**: Components, hooks, and styles reside within `src/features/[feature-name]`.
- **UI Decoupling**: Global UI components reside in `src/components/ui` using the "Slot" pattern where necessary.
- **Data Access Layer**: All external data is normalized through DTOs (`src/lib/dto`).

## Visual Design System (Liquid Glass)
- **Glassmorphism**: Standardized `glass-light`, `glass-medium`, `glass-heavy`, and `glass-zenith` classes.
- **Typography**: Orbitron for high-end headers, Inter for UI readability.
- **Motion**: Framer Motion for cinematic transitions and micro-interactions.

## Verification Standards
- **Linting**: Strict ESLint rules with import sorting and tailwind sorting.
- **Testing**: Vitest for unit/integration, Playwright for E2E conversion flows.
- **Performance**: Lighthouse score must exceed 90 across all categories.

## Protocol for Changes
Any structural changes to these "frozen" layers require a new Architecture Decision Record (ADR) and a significant version bump in the internal roadmap.
