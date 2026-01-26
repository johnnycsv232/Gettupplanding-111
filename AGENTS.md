# GETTUPPENT - AI Development Guidelines

> **AI-First, Security-First, Test-First Development**

## Project Overview

GETTUPPENT is a Minneapolis-based content/media production company landing page built with:

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS, Three.js/React Three Fiber (3D)
- **Backend**: Firebase (Auth, Firestore, Cloud Functions)
- **Payments**: Stripe
- **CMS**: Sanity
- **Deployment**: Vercel / Firebase Hosting

## Development Principles

### 1. Security-First Development

Before writing ANY code, consider security implications:

```
┌─────────────────────────────────────────────┐
│  SECURITY CHECKLIST (Before Every Feature)  │
├─────────────────────────────────────────────┤
│ □ Input validation (Zod schemas)            │
│ □ Firebase Security Rules updated           │
│ □ Authentication checks in place            │
│ □ Rate limiting considered                  │
│ □ No sensitive data in client code          │
│ □ Environment variables for secrets         │
└─────────────────────────────────────────────┘
```

### 2. Test-First Development (TDD)

Write tests BEFORE implementation:

```
1. Write failing test → 2. Write minimal code → 3. Refactor → 4. Repeat
```

**Testing Stack:**
- Unit: Vitest + React Testing Library
- E2E: Playwright
- Firebase: @firebase/rules-unit-testing

### 3. AI-First Development

Use skills proactively:
- `@nextjs-best-practices` - Server/Client component decisions
- `@react-best-practices` - React patterns and performance
- `@firebase` - Security rules, data modeling
- `@stripe-integration` - Payment implementation
- `@test-driven-development` - TDD workflow
- `@systematic-debugging` - When stuck on bugs
- `@clean-code` - Code quality

## File Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Shared UI components
├── features/               # Feature-based modules
│   └── landing/
│       └── components/     # Landing page components
├── lib/                    # Utilities and configs
│   ├── firebase/           # Firebase client config
│   └── stripe/             # Stripe config
└── types/                  # TypeScript types
```

## Code Standards

### TypeScript
- Strict mode enabled
- Zod for runtime validation
- No `any` types (use `unknown` + type guards)

### React
- Server Components by default
- Client Components only when needed (interactivity)
- Use `'use client'` directive explicitly

### Firebase
- Security rules MUST be tested before deploy
- Use Firebase Emulator for local development
- Firestore: Design for queries, not SQL normalization

### Git Workflow
- Feature branches from `main`
- Conventional commits: `feat:`, `fix:`, `test:`, `docs:`
- PRs require passing tests

## Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run test         # Run tests
npm run lint         # Lint code

# Skills Management
npm run skills:list      # List active skills
npm run skills:disable   # Disable a skill
npm run skills:enable    # Enable a skill
npm run skills:index     # Regenerate index

# Firebase
npm run firebase:emulators  # Start emulators
npm run firebase:deploy     # Deploy rules
```

## Security Rules Template

Always test Firebase rules:

```typescript
// tests/firestore.rules.test.ts
import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';

describe('Firestore Security Rules', () => {
  it('denies unauthenticated access', async () => {
    const db = getTestFirestore(null); // No auth
    await assertFails(db.collection('users').get());
  });
});
```

## AI Agent Instructions

When working on this codebase:

1. **Always check existing patterns** before introducing new ones
2. **Run tests** after every change: `npm run test`
3. **Use TypeScript strictly** - no type bypasses
4. **Security first** - validate all inputs, check auth
5. **Performance** - Use Server Components, lazy load 3D
6. **Accessibility** - Semantic HTML, ARIA labels

## Relevant Skills

The following skills are configured for this project:

### Core Stack
- `nextjs-best-practices` - Next.js App Router patterns
- `react-best-practices` - React performance & patterns
- `firebase` - Firebase security & data modeling
- `stripe-integration` - Payment processing
- `3d-web-experience` - Three.js / React Three Fiber

### Quality & Testing
- `test-driven-development` - TDD workflow
- `testing-patterns` - Test architecture
- `clean-code` - Code quality principles
- `systematic-debugging` - Debug methodology

### Security
- `webapp-testing` - Web app security testing
- `api-patterns` - Secure API design

### DevOps
- `vercel-deployment` - Deployment best practices
- `git-pushing` - Git workflow

---

**Last Updated**: 2026-01-26
**Maintained By**: AI Agent + Human Review
