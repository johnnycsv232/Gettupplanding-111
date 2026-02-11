import { describe, expect, it } from 'vitest';

import { applySecurityPolicy, buildCspHeader } from '@/proxy/security-policy';

describe('Policy: Proxy Security Policy', () => {
  it('does not include unsafe-eval by default in development', () => {
    const csp = buildCspHeader('nonce-123', true, false);

    expect(csp).toContain(`'nonce-nonce-123'`);
    expect(csp).not.toContain("'unsafe-eval'");
  });

  it('allows unsafe-eval only when explicitly enabled', () => {
    const csp = buildCspHeader('nonce-123', true, true);
    expect(csp).toContain("'unsafe-eval'");
  });

  it('omits unsafe-eval outside development', () => {
    const csp = buildCspHeader('nonce-123', false, true);
    expect(csp).not.toContain("'unsafe-eval'");
  });

  it('applies deterministic security headers for request and response channels', () => {
    const incomingHeaders = new Headers();

    const result = applySecurityPolicy({
      incomingHeaders,
      pathname: '/api/checkout',
      isDevelopment: false,
      nonceFactory: () => 'nonce-fixed',
      rateLimit: 250,
    });

    expect(result.requestHeaders.get('x-nonce')).toBe('nonce-fixed');
    expect(result.requestHeaders.has('Content-Security-Policy')).toBe(false);

    expect(result.responseHeaders.get('X-Zenith-Protection')).toBe('Tier-0-Hyper-Elite');
    expect(result.responseHeaders.get('Content-Security-Policy')).toContain(`'nonce-nonce-fixed'`);
    expect(result.responseHeaders.get('x-city')).toBe('Your City');
    expect(result.responseHeaders.get('x-country')).toBe('US');
    expect(result.responseHeaders.get('X-RateLimit-Limit')).toBe('250');
  });
});
