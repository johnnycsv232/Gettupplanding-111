# 👑 Mission: Repository Sovereign — The "God Mode" Audit & Remediation (v2)

> **Context:** Evolution to "Tier 1" status. Uni-directional config enforcement, security hardening, and elite performance standards.

**Role:** Distinguished Fellow (Engineering) & Chief Security Architect.

**⚡ EXECUTION STACK:**
* **Strategy:** `superpowers:systematic-debugging`
* **Safety:** `superpowers:backend-dev-guidelines`
* **Verification:** `superpowers:verification-before-completion`

---

## 🎯 Goal & Scope
**Goal:** Achieve verifiable "Sovereign" status through automated evidence collection and codified health checks.
**Scope:**
- **Infrastructure:** `.skillportrc`, `.vscode`, `.agent` ghost configs.
- **Assets:** Video location/size, optimization.
- **SEO/A11y:** Schema (JSON-LD), ARIA, reduced-motion.
- **Code:** Dependency hygiene, quality gates (lint/type-check).

## 🛑 Stop Conditions & Hard Rules
1.  **Evidence-Only:** No claim of "PASS" without command output proof.
2.  **No Mixed Artifacts:** Code in files, logs in `docs/audits/`.
3.  **No Hardcoding:** Discovery of landing pages/assets via search patterns, not fixed paths.
4.  **Stop on Failure:** Build/Test failure halts execution immediately for diagnosis.

---

## 📅 Phase Plan

### Phase 1: The "Deep Scan" (Non-Invasive)
**Goal:** Generate `docs/audits/audit-log.json`.
1.  **Infrastructure:**
    - Parse `.skillportrc` for canonical skills dir.
    - Scan for "Split Brain" (`.agent/skills` vs `skills/`).
    - Verify `skills_index.json` integrity (valid JSON, no null bytes).
2.  **Assets:**
    - Detect `*.mp4` > 5MB outside `public/videos/`.
    - Detect static binary imports in `src/`.
3.  **Dependencies:**
    - `npm ls --json` to find extraneous packages.
4.  **SEO/A11y:**
    - grep for `VideoObject` / `application/ld+json`.
    - grep for `prefers-reduced-motion` / `motion-reduce`.

### Phase 2: The "Doctor" Tool (Codified Intelligence)
**Goal:** Create `scripts/doctor.ts` (v2).
**Specs:**
- **CLI:** `--json`, `--pretty`.
- **Checks:**
  - Skills Single Source of Truth.
  - Asset Placement & Size.
  - Dependency Hygiene (`npm ls`).
  - SEO Schema presence.
  - A11y signatures (`aria-hidden`, `motion-reduce`).
- **Output:** Exit 0 (Pass) or 1 (Fail). Emit JSON report.

### Phase 3: The Surgical Strike (Remediation)
**Goal:** Fix verified issues in isolation.
1.  **Protocol:** Verify clean worktree/branch.
2.  **Execution:**
    - Unify skills to canonical dir.
    - Relocate assets to `public/videos/`.
    - Harden `page.tsx` with JSON-LD.
    - Harden `Hero` components with `aria-hidden` / `motion-reduce`.
    - Prune zombie configs and dependencies.

### Phase 4: Final Judgment (Quality Gate)
**Goal:** Verify readiness.
1.  **Run Doctor:** `npm run doctor -- --json`
2.  **Type Check:** `npx tsc --noEmit`
3.  **Build:** `npm run build`
4.  **Report:** Generate `docs/audits/remediation_report.md`.

---

## 📋 Audit Checks List (Machine Readable)
- [ ] INFRA_SKILLS_CANONICAL
- [ ] INFRA_INDEX_INTEGRITY
- [ ] ASSET_VIDEO_PUBLIC
- [ ] ASSET_NO_BINARY_IMPORTS
- [ ] SEO_JSON_LD_VIDEO
- [ ] A11Y_REDUCED_MOTION
- [ ] A11Y_ARIA_HIDDEN_DECORATIVE
- [ ] DEPS_CLEAN_NPM_LS
