import { describe, expect, it } from 'vitest';

import { parseEnv } from '@/lib/env';

describe('Policy: Environment Contract', () => {
  it('fails fast in production when required public runtime keys are missing', () => {
    expect(() =>
      parseEnv(
        {
          NODE_ENV: 'production',
        },
        { enforceProductionRequired: true }
      )
    ).toThrow(/Missing required environment variables/i);
  });

  it('accepts production configuration when required keys are present', () => {
    const parsed = parseEnv(
      {
        NODE_ENV: 'production',
        NEXT_PUBLIC_FIREBASE_API_KEY: 'firebase-api-key',
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'project-id',
        NEXT_PUBLIC_FIREBASE_APP_ID: 'app-id',
      },
      { enforceProductionRequired: true }
    );

    expect(parsed.NODE_ENV).toBe('production');
    expect(parsed.NEXT_PUBLIC_FIREBASE_PROJECT_ID).toBe('project-id');
  });

  it('allows relaxed validation in development mode', () => {
    const parsed = parseEnv(
      {
        NODE_ENV: 'development',
      },
      { enforceProductionRequired: false }
    );

    expect(parsed.NODE_ENV).toBe('development');
  });

  it('rejects malformed Stripe secret keys when provided', () => {
    expect(() =>
      parseEnv(
        {
          NODE_ENV: 'development',
          STRIPE_SECRET_KEY: 'not-a-stripe-secret',
        },
        { enforceProductionRequired: false }
      )
    ).toThrow(/STRIPE_SECRET_KEY/i);
  });

  it('rejects malformed Stripe webhook secrets when provided', () => {
    expect(() =>
      parseEnv(
        {
          NODE_ENV: 'development',
          STRIPE_WEBHOOK_SECRET: 'bad-webhook-secret',
        },
        { enforceProductionRequired: false }
      )
    ).toThrow(/STRIPE_WEBHOOK_SECRET/i);
  });

  it('rejects malformed Firebase admin private keys when provided', () => {
    expect(() =>
      parseEnv(
        {
          NODE_ENV: 'development',
          FIREBASE_ADMIN_PRIVATE_KEY: 'not-a-private-key',
        },
        { enforceProductionRequired: false }
      )
    ).toThrow(/FIREBASE_ADMIN_PRIVATE_KEY/i);
  });
});
