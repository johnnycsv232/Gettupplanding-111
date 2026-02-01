import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { geo } = request;
  const city = geo?.city || 'Your City';
  const country = geo?.country || 'US';

  const response = NextResponse.next();

  // Inject location data into headers for consumption in components
  response.headers.set('x-city', city);
  response.headers.set('x-country', country);

  return response;
}

export const config = {
  matcher: '/',
};
