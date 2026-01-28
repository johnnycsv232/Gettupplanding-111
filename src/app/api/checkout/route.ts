import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import type { Stripe } from 'stripe';

export async function POST(req: Request) {
  try {
    const { priceId, tier, mode = 'subscription' } = await req.json();
    
    // For demo purposes, we'll use a placeholder userId
    const userId = "demo-user-123";

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
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Stripe Checkout Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
