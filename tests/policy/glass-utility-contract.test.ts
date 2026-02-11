import * as fs from 'fs';
import * as path from 'path';

import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../..');
const GLOBALS_CSS_PATH = path.join(ROOT, 'src/app/globals.css');

describe('Policy: Glass Utility Contract', () => {
  it('defines the reusable liquid-glass utility used by shared UI components', () => {
    const globalsCss = fs.readFileSync(GLOBALS_CSS_PATH, 'utf-8');

    expect(globalsCss).toMatch(/\.liquid-glass\s*\{/);
  });
});
