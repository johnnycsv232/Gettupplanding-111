import * as fs from 'fs';
import * as path from 'path';

import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../..');
const PACKAGE_JSON_PATH = path.join(ROOT, 'package.json');
const VERIFY_SCRIPT_PATH = path.join(ROOT, 'scripts', 'verify.ts');

describe('Policy: Verify Command Contract', () => {
  it('uses a cross-platform verify command', () => {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8')) as {
      scripts?: Record<string, string>;
    };
    const verifyScript = pkg.scripts?.verify ?? '';

    expect(verifyScript.toLowerCase()).not.toContain('powershell');
    expect(verifyScript).toContain('scripts/verify.ts');
  });

  it('provides a verify script entrypoint', () => {
    expect(fs.existsSync(VERIFY_SCRIPT_PATH)).toBe(true);
  });
});
