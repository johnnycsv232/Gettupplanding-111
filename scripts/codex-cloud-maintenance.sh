#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[codex-cloud] maintenance started"

# Reconcile dependencies against lockfile changes after cache restore.
if [[ -f "package-lock.json" ]]; then
  npm ci --no-audit --fund=false
else
  npm install --no-audit --fund=false
fi

if command -v npx >/dev/null 2>&1; then
  npx playwright install chromium >/dev/null 2>&1 || true
fi

echo "[codex-cloud] maintenance complete"
