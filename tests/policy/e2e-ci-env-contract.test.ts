import { describe, expect, it } from 'vitest';

import { withE2ERuntimeEnv } from '../../scripts/e2e-env';

describe('Policy: E2E CI Environment Contract', () => {
  it('injects required public firebase keys for ci mode when absent', () => {
    const env = withE2ERuntimeEnv({ NODE_ENV: 'test' }, 'ci', 3100);

    expect(env.E2E_MODE).toBe('ci');
    expect(env.E2E_PORT).toBe('3100');
    expect(env.NEXT_PUBLIC_FIREBASE_API_KEY).toBe('e2e-demo-api-key');
    expect(env.NEXT_PUBLIC_FIREBASE_PROJECT_ID).toBe('e2e-demo-project');
    expect(env.NEXT_PUBLIC_FIREBASE_APP_ID).toBe('e2e-demo-app-id');
  });

  it('does not override explicit public firebase values', () => {
    const env = withE2ERuntimeEnv(
      {
        NODE_ENV: 'test',
        NEXT_PUBLIC_FIREBASE_API_KEY: 'custom-key',
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'custom-project',
        NEXT_PUBLIC_FIREBASE_APP_ID: 'custom-app',
      },
      'ci',
      3200
    );

    expect(env.E2E_MODE).toBe('ci');
    expect(env.E2E_PORT).toBe('3200');
    expect(env.NEXT_PUBLIC_FIREBASE_API_KEY).toBe('custom-key');
    expect(env.NEXT_PUBLIC_FIREBASE_PROJECT_ID).toBe('custom-project');
    expect(env.NEXT_PUBLIC_FIREBASE_APP_ID).toBe('custom-app');
  });

  it('keeps dev mode minimal and does not inject ci-only defaults', () => {
    const env = withE2ERuntimeEnv({ NODE_ENV: 'test' }, 'dev', 3100);

    expect(env.E2E_MODE).toBe('dev');
    expect(env.E2E_PORT).toBe('3100');
    expect(env.NEXT_PUBLIC_FIREBASE_API_KEY).toBeUndefined();
    expect(env.NEXT_PUBLIC_FIREBASE_PROJECT_ID).toBeUndefined();
    expect(env.NEXT_PUBLIC_FIREBASE_APP_ID).toBeUndefined();
  });
});
