/**
 * Stripe Billing Portal API
 */

import { NextResponse } from 'next/server';

import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { createBillingPortalSession } from '@/lib/services/customer.service';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    const { returnUrl } = await req.json();

    if (!returnUrl) {
      return NextResponse.json({ error: 'returnUrl is required' }, { status: 400 });
    }

    // SECURITY: Validate returnUrl to prevent open redirect attacks
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL,
      'http://localhost:3000',
      'https://gettupp.com',
      'https://www.gettupp.com',
    ].filter(Boolean);

    try {
      const url = new URL(returnUrl);
      const isAllowed = allowedOrigins.some((origin) => url.origin === origin);
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

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating billing portal session:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
