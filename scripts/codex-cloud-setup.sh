#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[codex-cloud] setup started in $ROOT_DIR"

if [[ ! -f "package.json" ]]; then
  echo "[codex-cloud] package.json not found"
  exit 1
fi

# Cloud setup should be deterministic and fast.
if [[ -f "package-lock.json" ]]; then
  echo "[codex-cloud] installing node dependencies with npm ci"
  npm ci --no-audit --fund=false
else
  echo "[codex-cloud] package-lock.json missing, falling back to npm install"
  npm install --no-audit --fund=false
fi

if [[ ! -f ".env.local" && -f "docker.env.example" ]]; then
  echo "[codex-cloud] creating local env template from docker.env.example"
  cp docker.env.example .env.local
fi

if command -v npx >/dev/null 2>&1; then
  echo "[codex-cloud] installing Playwright chromium (best effort)"
  npx playwright install chromium >/dev/null 2>&1 || true
fi

echo "[codex-cloud] running quick sanity checks"
npm run type-check
npm run test:policy

echo "[codex-cloud] setup complete"
