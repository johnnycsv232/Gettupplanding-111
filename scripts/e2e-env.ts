export type E2EMode = 'dev' | 'ci';

const CI_REQUIRED_ENV_DEFAULTS = {
  NEXT_PUBLIC_FIREBASE_API_KEY: 'e2e-demo-api-key',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'e2e-demo-project',
  NEXT_PUBLIC_FIREBASE_APP_ID: 'e2e-demo-app-id',
} as const;

export function withE2ERuntimeEnv(
  baseEnv: NodeJS.ProcessEnv,
  mode: E2EMode,
  port: number
): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {
    ...baseEnv,
    E2E_PORT: String(port),
    E2E_MODE: mode,
  };

  if (mode === 'ci') {
    for (const [key, value] of Object.entries(CI_REQUIRED_ENV_DEFAULTS)) {
      if (!env[key]) {
        env[key] = value;
      }
    }
  }

  return env;
}
