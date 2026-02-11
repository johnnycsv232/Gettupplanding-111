import { defineConfig, devices } from '@playwright/test';

import { getE2EBaseUrl, getE2EPort } from './scripts/e2e-port';

const e2ePort = getE2EPort();
const e2eBaseUrl = getE2EBaseUrl(e2ePort);
const e2eMode = process.env.E2E_MODE === 'ci' ? 'ci' : 'dev';
const webServerCommand =
  e2eMode === 'ci' ? `npm run start -- --port ${e2ePort}` : `npm run dev -- --port ${e2ePort}`;

/**
 * Playwright Config for Zenith Quality Assurance
 */
export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.{ts,tsx}'],
  testIgnore: ['**/*.test.{ts,tsx}'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: e2eBaseUrl,
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: webServerCommand,
    url: e2eBaseUrl,
    timeout: 180_000,
    reuseExistingServer: false,
  },
});
