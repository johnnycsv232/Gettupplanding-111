import * as fs from 'fs';
import * as path from 'path';

import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../..');
const PLAYWRIGHT_CONFIG_PATH = path.join(ROOT, 'playwright.config.ts');
const E2E_PORT_HELPER_PATH = path.join(ROOT, 'scripts', 'e2e-port.ts');
const PORT_CHECK_PATH = path.join(ROOT, 'scripts', 'check-e2e-port.ts');
const RUN_PLAYWRIGHT_PATH = path.join(ROOT, 'scripts', 'run-playwright.ts');

describe('Policy: E2E Port Contract', () => {
  it('has shared E2E port helper and preflight scripts', () => {
    expect(fs.existsSync(E2E_PORT_HELPER_PATH)).toBe(true);
    expect(fs.existsSync(PORT_CHECK_PATH)).toBe(true);
    expect(fs.existsSync(RUN_PLAYWRIGHT_PATH)).toBe(true);
  });

  it('derives Playwright baseURL and webServer port from shared E2E port source', () => {
    const config = fs.readFileSync(PLAYWRIGHT_CONFIG_PATH, 'utf-8');

    expect(config).toMatch(/getE2EPort/);
    expect(config).toMatch(/getE2EBaseUrl/);
    expect(config).toMatch(/url:\s*e2eBaseUrl/);
    expect(config).toMatch(/baseURL:\s*e2eBaseUrl/);
    expect(config).toMatch(/--port \$\{e2ePort\}/);
    expect(config).toMatch(/timeout:\s*180_?000/);
  });
});
