/**
 * Stripe Billing Portal API
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';

import { verifyBearerTokenFromRequest } from '@/lib/api-auth';
import { getAdminDb } from '@/lib/firebase-admin';
import { createBillingPortalSession } from '@/lib/services/customer.service';

const billingPortalRequestSchema = z
  .object({
    returnUrl: z.string().url('returnUrl must be a valid URL'),
  })
  .strict();

export async function POST(req: Request) {
  try {
    const decodedToken = await verifyBearerTokenFromRequest(req);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = decodedToken.uid;

    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { returnUrl } = billingPortalRequestSchema.parse(rawBody);

    // SECURITY: Validate returnUrl to prevent open redirect attacks
    const allowedOrigins = new Set(
      [
        process.env.NEXT_PUBLIC_APP_URL,
        process.env.APP_URL,
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
        process.env.VERCEL_PROJECT_PRODUCTION_URL
          ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
          : undefined,
        'http://127.0.0.1:3000',
        'http://localhost:3000',
        'https://gettupp.com',
        'https://www.gettupp.com',
      ]
        .filter((value): value is string => Boolean(value))
        .flatMap((value) => {
          try {
            return [new URL(value).origin];
          } catch {
            return [];
          }
        })
    );

    try {
      const url = new URL(returnUrl);
      const isAllowed = allowedOrigins.has(url.origin);
      if (!isAllowed) {
        return NextResponse.json({ error: 'Invalid returnUrl' }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: 'Invalid returnUrl format' }, { status: 400 });
    }

    // Get Firestore User to find Stripe Customer ID
    const db = getAdminDb();
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userData = userDoc.data();
    const stripeCustomerId = userData?.stripeCustomerId;

    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: 'No billing account found for this user' },
        { status: 404 }
      );
    }

    const session = await createBillingPortalSession(stripeCustomerId, returnUrl);

    return NextResponse.json({ success: true, url: session.url, data: { url: session.url } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation Error', details: error.flatten() }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating billing portal session:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
