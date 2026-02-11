import * as fs from 'fs';
import * as path from 'path';

import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../..');
const TAILWIND_CONFIG_PATH = path.join(ROOT, 'tailwind.config.ts');

describe('Policy: Tailwind Content Coverage', () => {
  it('includes src/features in content globs so landing styles are generated', () => {
    const config = fs.readFileSync(TAILWIND_CONFIG_PATH, 'utf-8');

    expect(config).toMatch(/\.\/src\/features\/\*\*\/\*\.\{js,ts,jsx,tsx,mdx\}/);
  });
});
