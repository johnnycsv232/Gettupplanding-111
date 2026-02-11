import * as fs from 'fs';
import * as path from 'path';

import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../..');
const PROXY_PATH = path.join(ROOT, 'src', 'proxy.ts');
const MIDDLEWARE_PATH = path.join(ROOT, 'src', 'middleware.ts');

describe('Policy: Next 16 Interception Convention', () => {
  it('uses src/proxy.ts as canonical entrypoint', () => {
    expect(fs.existsSync(PROXY_PATH)).toBe(true);
  });

  it('does not keep deprecated src/middleware.ts', () => {
    expect(fs.existsSync(MIDDLEWARE_PATH)).toBe(false);
  });
});
