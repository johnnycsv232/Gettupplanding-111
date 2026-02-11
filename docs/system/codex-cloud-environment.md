# Codex Cloud Environment Setup

This repo is now prepared to run in OpenAI Codex Cloud workspaces.

## 1. Open Codex Cloud environment settings

In ChatGPT Codex:

1. Open your workspace/repo.
2. Go to environment settings.
3. Configure:
   - Base image: `universal`
   - Setup script: `bash scripts/codex-cloud-setup.sh`
   - Maintenance script: `bash scripts/codex-cloud-maintenance.sh`

Reference: OpenAI Codex docs for environments and setup scripts.

- https://developers.openai.com/codex/cloud/environments
- https://developers.openai.com/codex/cloud/github
- https://developers.openai.com/codex/cloud/settings/internet

## 2. Add env variables and secrets

Use `codex-cloud.env.example` as the source of truth.

Set values in Codex Cloud:

1. Copy non-sensitive values into environment variables.
2. Put sensitive values (Stripe/Firebase Admin/API keys) into secrets.
3. Keep `FIREBASE_ADMIN_PRIVATE_KEY` with escaped `\\n` characters.

## 3. Optional environment controls

Recommended defaults:

- Internet access: `on`
- Auto-assigned domains: `on` (for hosted preview URLs)

If you need strict network isolation, turn internet access off and keep only required package mirrors/internal endpoints.

## 4. Validate workspace health

After setup runs, execute:

```bash
npm run verify
```

For local preview in cloud:

```bash
npm run dev
```

## 5. Current cloud scripts

- Setup script: `scripts/codex-cloud-setup.sh`
- Maintenance script: `scripts/codex-cloud-maintenance.sh`
- Env template: `codex-cloud.env.example`

These scripts are idempotent and safe to re-run.

## 6. What this gives you

- Deterministic dependency install via lockfile.
- Quick baseline checks (`type-check`, `test:policy`) on environment creation.
- Cache-aware maintenance script for long-lived cloud workspaces.
- Shared env contract aligned with `src/lib/env.ts`.
