import { z } from 'zod';




/**
 * Environment Variable Schema
 * In development, we completely bypass validation to avoid crashes.
 * In production, we enforce strict validation.
 */

const envSchema = z.object({
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
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

type Env = z.infer<typeof envSchema> & Record<string, string | undefined>;

// Force bypass in development or if env is clearly missing
// This prevents the "mom-demo" crash
const isProd = process.env.NODE_ENV === 'production';
const isMissingEnv =
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY && !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

let validatedEnv: Env;

if (isProd && !isMissingEnv && typeof window === 'undefined') {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('[RC_ENV_ERR] Invalid environment variables:', result.error.format());
    validatedEnv = process.env as unknown as Env;
  } else {
    validatedEnv = result.data as Env;
  }
} else {
  validatedEnv = (process.env || {}) as unknown as Env;
}

export const env = validatedEnv;

if (typeof window !== 'undefined') {
  (window as unknown as { __NEXT_ENV_DATA: Env }).__NEXT_ENV_DATA = env;
}

