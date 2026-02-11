import { env } from '@/lib/env';

export interface ApplySecurityPolicyParams {
  incomingHeaders: Headers;
  pathname: string;
  isDevelopment: boolean;
  nonceFactory?: () => string;
  allowUnsafeEvalInDev?: boolean;
  rateLimit?: number;
}

export interface ApplySecurityPolicyResult {
  nonce: string;
  cspHeader: string;
  requestHeaders: Headers;
  responseHeaders: Headers;
}

function normalizeHeaderValue(value: string): string {
  return value.replace(/\s{2,}/g, ' ').trim();
}

function resolveRateLimit(rateLimit?: number): number {
  if (typeof rateLimit === 'number' && Number.isFinite(rateLimit) && rateLimit > 0) {
    return Math.floor(rateLimit);
  }

  const parsedFromEnv = Number.parseInt(env.PROXY_API_RATE_LIMIT ?? '', 10);
  if (Number.isFinite(parsedFromEnv) && parsedFromEnv > 0) {
    return parsedFromEnv;
  }

  return 100;
}

export function buildCspHeader(
  nonce: string,
  isDevelopment: boolean,
  allowUnsafeEvalInDev: boolean = false
): string {
  const unsafeEvalDirective = isDevelopment && allowUnsafeEvalInDev ? "'unsafe-eval'" : '';

  return normalizeHeaderValue(`
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-inline' ${unsafeEvalDirective};
    style-src 'self' 'nonce-${nonce}' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://images.unsplash.com https://plus.unsplash.com;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' https://api.stripe.com https://*.firebaseio.com https://*.googleapis.com;
    block-all-mixed-content;
    upgrade-insecure-requests;
  `);
}

export function applySecurityPolicy({
  incomingHeaders,
  pathname,
  isDevelopment,
  nonceFactory = () => crypto.randomUUID(),
  allowUnsafeEvalInDev = env.ALLOW_UNSAFE_EVAL_IN_DEV === '1',
  rateLimit,
}: ApplySecurityPolicyParams): ApplySecurityPolicyResult {
  const nonce = nonceFactory();
  const cspHeader = buildCspHeader(nonce, isDevelopment, allowUnsafeEvalInDev);

  const requestHeaders = new Headers(incomingHeaders);
  requestHeaders.set('x-nonce', nonce);

  const city = incomingHeaders.get('x-vercel-ip-city') || 'Your City';
  const country = incomingHeaders.get('x-vercel-ip-country') || 'US';

  const responseHeaders = new Headers();
  responseHeaders.set('X-Zenith-Protection', 'Tier-0-Hyper-Elite');
  responseHeaders.set('Content-Security-Policy', cspHeader);
  responseHeaders.set('X-Robots-Tag', 'index, follow');
  responseHeaders.set('x-city', city);
  responseHeaders.set('x-country', country);

  if (pathname.startsWith('/api/')) {
    responseHeaders.set('X-RateLimit-Limit', String(resolveRateLimit(rateLimit)));
  }

  return { nonce, cspHeader, requestHeaders, responseHeaders };
}
