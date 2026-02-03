import { z } from 'zod';

import { UserId, StripeSubscriptionId, StripeCustomerId } from '@/types/brands';

// Helper for strict metadata
// INVARIANT: Strict Validation (prevent unknown field injection)
export const metadataSchema = z
  .object({
    userId: z.string().min(1, 'userId is required'),
    tier: z.string().optional(),
    priceId: z.string().optional(),
  })
  .strict();

export type StripeMetadata = z.infer<typeof metadataSchema>;

// Checkout Session Completed Schema
export const checkoutSessionCompletedSchema = z
  .object({
    id: z.string(),
    customer: z.string().transform((val) => val as StripeCustomerId),
    subscription: z
      .string()
      .optional()
      .transform((val) => (val ?? undefined) as StripeSubscriptionId | undefined),
    metadata: z
      .object({
        userId: z
          .string()
          .min(1, 'userId is required')
          .transform((val) => val as UserId),
        tier: z.string().min(1, 'tier is required'),
        priceId: z.string().optional(),
      })
      .strict(), // STRICT on checkout metadata: tier is MANDATORY here
  })
  .strict();

export type CheckoutSessionCompleted = z.infer<typeof checkoutSessionCompletedSchema>;

// Subscription Updated/Deleted Schema
export const subscriptionSchema = z
  .object({
    id: z.string().transform((val) => val as StripeSubscriptionId),
    status: z.enum([
      'active',
      'trialing',
      'past_due',
      'canceled',
      'unpaid',
      'incomplete',
      'incomplete_expired',
      'paused',
    ]),
    metadata: metadataSchema, // Uses the strict metadataSchema
  })
  .strict();

export type SubscriptionEvent = z.infer<typeof subscriptionSchema>;

// Invoice Schema (for payment failures)
export const invoiceSchema = z
  .object({
    id: z.string(),
    customer: z.string().transform((val) => val as StripeCustomerId),
    subscription: z
      .string()
      .optional()
      .transform((val) => (val ?? undefined) as StripeSubscriptionId | undefined),
    status: z.string(),
    billing_reason: z.string().optional(),
    metadata: metadataSchema.partial(), // Invoices might have partial metadata
  })
  .strict();

export type InvoiceEvent = z.infer<typeof invoiceSchema>;

// Main Event Wrapper Schema
export const stripeEventSchema = z
  .object({
    id: z.string(),
    type: z.string(),
    data: z.object({
      object: z.record(z.string(), z.unknown()),
    }),
  })
  .strict();
