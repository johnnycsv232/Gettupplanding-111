import * as fs from 'fs';
import * as path from 'path';

import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../..');
const PLAYWRIGHT_CONFIG_PATH = path.join(ROOT, 'playwright.config.ts');

describe('Policy: Playwright Taxonomy Boundary', () => {
  it('matches only .spec test files and ignores .test files', () => {
    const config = fs.readFileSync(PLAYWRIGHT_CONFIG_PATH, 'utf-8');

    expect(config).toMatch(/testMatch:\s*\[?\s*['"`]\*\*\/\*\.spec\.\{ts,tsx\}['"`]/);
    expect(config).toMatch(/testIgnore:\s*\[?\s*['"`]\*\*\/\*\.test\.\{ts,tsx\}['"`]/);
  });
});
