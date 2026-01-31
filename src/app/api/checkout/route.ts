import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { getAdminAuth } from '@/lib/firebase-admin';
import type { Stripe } from 'stripe';

export async function POST(req: Request) {
  try {
    const { priceId, tier, mode = 'subscription' } = await req.json();
    
    // Extract userId from Authorization header
    const authHeader = req.headers.get('Authorization');
    let userId: string | undefined;

    if (authHeader?.startsWith('Bearer ')) {
      const idToken = authHeader.split('Bearer ')[1];
      const adminAuth = getAdminAuth();
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      userId = decodedToken.uid;
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: Authentication required for checkout' }, { status: 401 });
    }

    const stripe = getStripeClient();

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/pricing`,
      metadata: {
        userId,
        tier,
        priceId,
      },
    }, {
      // INVARIANT: Prevent double-charging via idempotency
      idempotencyKey: `checkout_${userId}_${priceId}`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Stripe Checkout Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
