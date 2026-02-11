import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { UI_CONFIG } from './config/ui';
import { applySecurityPolicy } from './proxy/security-policy';

/**
 * Proxy: Zero-Trust Security & Performance Optimization
 */
export function proxy(request: NextRequest) {
  if (UI_CONFIG.MAINTENANCE.ENABLED) {
    return new NextResponse(UI_CONFIG.MAINTENANCE.MESSAGE, { status: 503 });
  }

  const { requestHeaders, responseHeaders } = applySecurityPolicy({
    incomingHeaders: request.headers,
    pathname: request.nextUrl.pathname,
    isDevelopment: process.env.NODE_ENV === 'development',
  });

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  responseHeaders.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
