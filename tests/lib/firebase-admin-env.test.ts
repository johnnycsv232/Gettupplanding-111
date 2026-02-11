import { describe, expect, it, vi } from 'vitest';

describe('firebase-admin env guard', () => {
  it(
    'throws when required admin credentials are missing',
    async () => {
      vi.unmock('@/lib/firebase-admin');
      const { assertFirebaseAdminEnvConfigured } = await import('@/lib/firebase-admin');

      expect(() => assertFirebaseAdminEnvConfigured({})).toThrow(/RC_FIREBASE_ADMIN_ENV/);
    },
    15_000
  );

  it(
    'accepts complete admin credentials',
    async () => {
      vi.unmock('@/lib/firebase-admin');
      const { assertFirebaseAdminEnvConfigured } = await import('@/lib/firebase-admin');

      expect(() =>
        assertFirebaseAdminEnvConfigured({
          FIREBASE_ADMIN_PROJECT_ID: 'test-project',
          FIREBASE_ADMIN_CLIENT_EMAIL: 'admin@test.example',
          FIREBASE_ADMIN_PRIVATE_KEY:
            '-----BEGIN PRIVATE KEY-----\\nabc\\n-----END PRIVATE KEY-----\\n',
        })
      ).not.toThrow();
    },
    15_000
  );
});
