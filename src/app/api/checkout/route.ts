import { NextResponse } from 'next/server';
import type { Stripe } from 'stripe';
import { z } from 'zod';

import { verifyBearerTokenFromRequest } from '@/lib/api-auth';
import { getStripeClient } from '@/lib/stripe';

const checkoutRequestSchema = z
  .object({
    priceId: z.string().min(1, 'priceId is required'),
    tier: z.string().min(1, 'tier is required'),
    mode: z.enum(['payment', 'subscription']).optional().default('subscription'),
  })
  .strict();

export async function POST(req: Request) {
  try {
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { priceId, tier, mode } = checkoutRequestSchema.parse(rawBody);

    const decodedToken = await verifyBearerTokenFromRequest(req);
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized: Authentication required for checkout' },
        { status: 401 },
      );
    }
    const userId = decodedToken.uid;

    const stripe = getStripeClient();
    const origin = new URL(req.url).origin;

    const checkoutSession = await stripe.checkout.sessions.create(
      {
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing`,
        metadata: {
          userId,
          tier,
          priceId,
        },
      },
      {
        // INVARIANT: Prevent double-charging via idempotency
        idempotencyKey: `checkout_${userId}_${priceId}`,
      },
    );

    return NextResponse.json({
      success: true,
      url: checkoutSession.url,
      data: { url: checkoutSession.url },
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation Error', details: error.flatten() }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Stripe Checkout Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
