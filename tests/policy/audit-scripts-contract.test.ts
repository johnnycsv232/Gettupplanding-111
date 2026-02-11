import { spawnSync } from 'node:child_process';
import * as path from 'node:path';

import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../..');
const SCRIPTS = [
  'scripts/security_scan.ts',
  'scripts/api_validator.ts',
  'scripts/schema_validator.ts',
  'scripts/integration_map_audit.ts',
] as const;

type ScriptReport = {
  ok: boolean;
  summary: {
    total: number;
    passed: number;
    failed: number;
    warned: number;
  };
  checks: Array<{
    id: string;
    status: 'PASS' | 'FAIL' | 'WARN';
    message: string;
  }>;
};

function runAuditScript(scriptPath: string): { status: number | null; stdout: string; stderr: string } {
  const result = spawnSync('npx', ['tsx', scriptPath, '--json'], {
    cwd: ROOT,
    encoding: 'utf-8',
    env: process.env,
  });

  return {
    status: result.status,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

describe('Policy: Audit Script Contracts', () => {
  it.each(SCRIPTS)(
    '%s emits structured JSON report and exits cleanly',
    (scriptPath) => {
      const result = runAuditScript(scriptPath);

      expect(result.status, `stderr: ${result.stderr}`).toBe(0);

      const parsed = JSON.parse(result.stdout.trim()) as ScriptReport;
      expect(typeof parsed.ok).toBe('boolean');
      expect(typeof parsed.summary.total).toBe('number');
      expect(Array.isArray(parsed.checks)).toBe(true);
      expect(parsed.checks.length).toBeGreaterThan(0);
    },
    20_000
  );
});
