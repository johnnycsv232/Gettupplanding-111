import * as fs from 'fs';
import * as path from 'path';

import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../..');
const UNIT_VITEST_CONFIG_PATH = path.join(ROOT, 'vitest.unit.config.ts');

describe('Policy: Vitest Taxonomy Boundary', () => {
  it('has a dedicated unit vitest config file', () => {
    expect(fs.existsSync(UNIT_VITEST_CONFIG_PATH)).toBe(true);
  });

  it('enforces .test files and excludes .spec files for unit tests', () => {
    const configContents = fs.readFileSync(UNIT_VITEST_CONFIG_PATH, 'utf-8');

    expect(configContents).toMatch(/\*\*\/\*\.test\.\{ts,tsx\}/);
    expect(configContents).toMatch(/\*\*\/\*\.spec\.\{ts,tsx\}/);
    expect(configContents).toMatch(/tests\/policy\/\*\*/);
  });
});
