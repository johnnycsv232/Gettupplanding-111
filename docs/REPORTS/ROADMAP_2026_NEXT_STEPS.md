# Repository Roadmap - Next Steps

Based on the 2026-02-05 Audit, these are the prioritized actions to move the repository toward Tier-0 Elite status.

## 🚀 P0: Critical Stabilizations (Immediate)
1. **GitHub MCP Token**: Replace `YOUR_TOKEN_HERE` in `mcp_config.json` with a valid PAT to enable full Git/GitHub orchestration.
2. **Unified Branching**: Rebase `fix/sovereign-arch` into `master` (or `unified-main`) and delete the `.worktrees/sovereign-fix` directory to prevent context drift.

## ⚙️ P1: Technical Debt & Cleanup (Next 48h)
1. **Purge Legacy Skills**: Delete the root `skills/` directory and `skills_backup/` once the new library is fully tested in production workflows.
2. **Sync Rules**: Verify that all agents are using the new `004-skill-orchestration.mdc` instead of ad-hoc `.md` rules.

## 🛠️ P2: Performance & DX (Next Sprint)
1. **Auto-Orchestration Validation**: Run a series of complex tasks using `skillport search` to stress-test the 634-skill library.
2. **Doctor Tool Enhancement**: Add checks for Stripe API key presence and Firebase environment parity.

## 🌌 P4: Hyper-Elite Optimization (The Zenith Evolution) - ✅ COMPLETED
1. **$0 Budget Mandate**: All AI and infra must use free tiers (**Gemini 1.5 Flash/Pro**, **Firebase Spark**).
2. **AI Orchestration**: Deloaded Genkit + Dotprompt "Lead Architect" flow for autonomous qualification.
3. **Zero-Trust Security**: Implemented Edge rate-limiting and Strict-CSP nonces in `middleware.ts`.
4. **Performance Zenith**: Target sub-1s LCP via Edge-based asset transformation (AVIF/WebP).
5. **CRO Engineering**: Core components integrated.

---

**Protocol Reference**: Zenith 4-D (Deconstruct, Diagnose, Develop, Deliver) | Orchestrating 32 Skills
**Audit Status**: Verified by Antigravity (Hyper-Elite Stage)
**Budget Status**: $0 (Confirmed Free Tiers)
