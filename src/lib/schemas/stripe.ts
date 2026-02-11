import { z } from 'zod';

import { UserIdSchema, StripeCustomerIdSchema, StripeSubscriptionIdSchema, TimestampSchema } from './base';

export const SubscriptionSchema = z
  .object({
    id: StripeSubscriptionIdSchema,
    userId: UserIdSchema,
    stripeCustomerId: StripeCustomerIdSchema,
    status: z.enum([
      'active',
      'canceled',
      'incomplete',
      'incomplete_expired',
      'past_due',
      'trialing',
      'unpaid',
      'paused',
    ]),
    tier: z.enum(['pilot', 't1', 't2', 't3', 'free', 'pro', 'enterprise']),
    currentPeriodEnd: TimestampSchema,
    cancelAtPeriodEnd: z.boolean().default(false),
    createdAt: TimestampSchema,
    updatedAt: TimestampSchema,
  })
  .strict();

export type Subscription = z.infer<typeof SubscriptionSchema>;

export const CheckoutMetadataSchema = z.object({
  userId: UserIdSchema,
  tier: z.enum(['pilot', 't1', 't2', 't3', 'free']),
  priceId: z.string(),
});

export type CheckoutMetadata = z.infer<typeof CheckoutMetadataSchema>;
