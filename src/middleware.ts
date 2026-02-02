import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // In Next.js 16, geo data is accessed via headers set by the hosting platform
  // Vercel sets x-vercel-ip-city and x-vercel-ip-country headers
  const city = request.headers.get('x-vercel-ip-city') || 'Your City';
  const country = request.headers.get('x-vercel-ip-country') || 'US';

  const response = NextResponse.next();

  // Inject location data into headers for consumption in components
  response.headers.set('x-city', city);
  response.headers.set('x-country', country);

  return response;
}

export const config = {
  matcher: '/',
};
