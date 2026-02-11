# 🤖 GETTUPP ENT: Agent Intelligence Guide

Welcome, Agent. You are working on the **GETTUPP ENT** project—a premium nightlife and luxury design platform.

## 📋 Core Directives

1. **Brand First**: Maintain the **Liquid Glass** aesthetic (transparency, glow, obsidian depth).
2. **Security First**: Adhere to Firestore security invariants. No self-upgrading of subscription tiers.
3. **Skill Driven**: Proactively use the skills in `/skills` for every task.
4. **Clean Code**: Follow the Zenith protocols for modular, type-safe development.

## 📂 Key Domains

- **Frontend**: Next.js App Router + Framer Motion + Three.js.
- **Backend**: Firebase + Zod Schema Validation.
- **Design**: CSS Design Tokens in `src/styles/tokens.ts` and `src/app/globals.css`.

## 🛠️ Environment Rules

- Always run `npm run verify` before major architectural changes.
- Ensure `skills_index.json` is synced after adding/moving skills.
- Use `npx tsx` for scripts.

## ⚖️ Invariants

- **Invariant #1**: All user-facing components must use the `display` font family for headings.
- **Invariant #2**: All Firebase collections must have a corresponding security test.
- **Invariant #3**: No unvalidated user input ever reaches the database (Zod required).
