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

## 🔮 P3: Vision & Growth (Long Term)
1. **Multi-Agent Simulation**: Implement a "Red Team" audit using the `security-auditor` skill in a dedicated workflow.
2. **Design System Documentation**: Generate a `STORYBOOK.md` or similar using the `senior-technical-writer` skill to document the 23+ UI components.

---

**Protocol Reference**: Zenith 4-D (Deconstruct, Diagnose, Develop, Deliver)
**Audit Status**: Verified by Antigravity
