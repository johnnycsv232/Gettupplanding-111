import Stripe from 'stripe';

import { env } from './env';

let stripeInstance: Stripe | undefined;

export const getStripeClient = (): Stripe => {
  if (!stripeInstance) {
    if (!env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is missing');
    }
    stripeInstance = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover' as Stripe.LatestApiVersion,
      appInfo: {
        name: 'Gettupp Zenith',
        version: '0.1.0',
      },
    });
  }
  return stripeInstance;
};

// For backward compatibility only
export const stripe = {} as Stripe; // Placeholder, use getStripeClient() instead

export const verifyWebhookSignature = (payload: string, signature: string): Stripe.Event => {
  const client = getStripeClient();
  if (!env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('STRIPE_WEBHOOK_SECRET is missing');
  }

  try {
    return client.webhooks.constructEvent(payload, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Webhook verification failed: ${message}`);
  }
};
