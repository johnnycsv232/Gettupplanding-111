import { z } from 'zod';

const envSchema = z
  .object({
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
    NEXT_PUBLIC_FIREBASE_APP_ID: z.string().optional(),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().optional(),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
    NEXT_PUBLIC_SANITY_DATASET: z.string().optional(),
    NEXT_PUBLIC_ENABLE_NEW_GLINT: z.string().optional(),
    NEXT_PUBLIC_GTM_ID: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
    STRIPE_SECRET_KEY: z
      .string()
      .regex(/^sk_(test|live)_[A-Za-z0-9_]+$/, 'STRIPE_SECRET_KEY must be a valid Stripe secret key')
      .optional(),
    STRIPE_WEBHOOK_SECRET: z
      .string()
      .regex(/^whsec_[A-Za-z0-9_]+$/, 'STRIPE_WEBHOOK_SECRET must be a valid webhook secret')
      .optional(),
    FIREBASE_ADMIN_PROJECT_ID: z.string().optional(),
    FIREBASE_ADMIN_CLIENT_EMAIL: z.string().email().optional(),
    FIREBASE_ADMIN_PRIVATE_KEY: z
      .string()
      .refine(
        (value) =>
          value.includes('BEGIN PRIVATE KEY') &&
          value.includes('END PRIVATE KEY'),
        'FIREBASE_ADMIN_PRIVATE_KEY must be a PEM private key'
      )
      .optional(),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional(),
    OPENAI_API_KEY: z.string().optional(),
    SENTRY_DSN: z.string().url().optional(),
    VERCEL_ANALYTICS_ID: z.string().optional(),
    PROXY_API_RATE_LIMIT: z.string().optional(),
    ALLOW_UNSAFE_EVAL_IN_DEV: z.enum(['0', '1']).optional(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  })
  .passthrough();

const requiredProductionKeys = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
] as const;

export type Env = z.infer<typeof envSchema> & Record<string, string | undefined>;

export interface ParseEnvOptions {
  enforceProductionRequired?: boolean;
}

function normalizeRequiredValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function validateRequiredProductionKeys(rawEnv: Env): void {
  const missingKeys = requiredProductionKeys.filter((key) => !normalizeRequiredValue(rawEnv[key]));

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing required environment variables in production: ${missingKeys.join(', ')}`
    );
  }
}

export function parseEnv(rawEnv: NodeJS.ProcessEnv, options: ParseEnvOptions = {}): Env {
  const parsed = envSchema.safeParse(rawEnv ?? {});

  if (!parsed.success) {
    throw new Error(`[RC_ENV_ERR] Invalid environment variables: ${parsed.error.message}`);
  }

  const validated = parsed.data as Env;

  if (options.enforceProductionRequired) {
    validateRequiredProductionKeys(validated);
  }

  return validated;
}

function shouldEnforceProductionRequired(): boolean {
  const isServer = typeof window === 'undefined';
  const isProduction = process.env.NODE_ENV === 'production';
  const lifecycleEvent = process.env.npm_lifecycle_event;
  const isBuildLifecycle = lifecycleEvent === 'build' || lifecycleEvent === 'test:e2e:ci';

  return isServer && isProduction && !isBuildLifecycle;
}

const enforceProductionRequired = shouldEnforceProductionRequired();
const env = parseEnv(process.env, { enforceProductionRequired });

export { env };

if (typeof window !== 'undefined') {
  (window as unknown as { __NEXT_ENV_DATA: Env }).__NEXT_ENV_DATA = env;
}
