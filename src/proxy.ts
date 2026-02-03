import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { UI_CONFIG } from './config/ui';

export function proxy(request: NextRequest) {
  // 1. Check Maintenance Mode
  if (UI_CONFIG.maintenance.enabled) {
    // Basic maintenance response - could be a rewrite to a /maintenance page
    return new NextResponse(UI_CONFIG.maintenance.message, { status: 503 });
  }

  // 2. Inject Location Data
  const city = request.headers.get('x-vercel-ip-city') || 'Your City';
  const country = request.headers.get('x-vercel-ip-country') || 'US';

  const response = NextResponse.next();
  response.headers.set('x-city', city);
  response.headers.set('x-country', country);

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
