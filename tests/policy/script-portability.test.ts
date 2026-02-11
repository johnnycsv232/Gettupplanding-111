import * as fs from 'fs';
import * as path from 'path';

import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../..');
const PACKAGE_JSON_PATH = path.join(ROOT, 'package.json');

describe('Policy: Script Portability', () => {
  it('avoids hardcoded windows-only paths in critical npm scripts', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8')) as {
      scripts?: Record<string, string>;
    };

    const criticalScripts = [
      'setup',
      'cleanup',
      'analyze',
      'skillport',
      'skillport:list',
      'skillport:show',
      'skillport:mcp',
      'skillport:reindex',
      'skillport:verify',
      'verify',
    ];

    for (const scriptName of criticalScripts) {
      const command = pkg.scripts?.[scriptName] ?? '';
      expect(command).not.toMatch(/[A-Za-z]:\\\\/);
      expect(command.toLowerCase()).not.toContain('powershell -executionpolicy bypass -file');
    }
  });

  it('provides cross-platform script wrappers', () => {
    expect(fs.existsSync(path.join(ROOT, 'scripts', 'run-powershell.ts'))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, 'scripts', 'skillport.ts'))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, 'scripts', 'build-analyze.ts'))).toBe(true);
  });
});
