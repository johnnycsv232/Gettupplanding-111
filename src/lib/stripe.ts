import Stripe from 'stripe';

let stripeInstance: Stripe | undefined;

export const getStripeClient = (): Stripe => {
    if (!stripeInstance) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY is missing');
        }
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            apiVersion: '2025-12-15.clover' as any,
            typescript: true,
        });
    }
    return stripeInstance;
};

// For backward compatibility only
export const stripe = {} as Stripe; // Placeholder, use getStripeClient() instead

export const verifyWebhookSignature = (payload: string, signature: string): Stripe.Event => {
    const client = getStripeClient();
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        throw new Error('STRIPE_WEBHOOK_SECRET is missing');
    }

    try {
        return client.webhooks.constructEvent(
            payload,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Webhook verification failed: ${message}`);
    }
}
