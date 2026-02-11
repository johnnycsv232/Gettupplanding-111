import { z } from 'zod';

import { StripeCustomerIdSchema, TimestampSchema, UserIdSchema } from './base';

/**
 * Customer status enum values
 */
export const CustomerStatusSchema = z.enum(['lead', 'prospect', 'customer', 'churned', 'vip']);

/**
 * Lifecycle stage enum values
 */
export const LifecycleStageSchema = z.enum(['anonymous', 'lead', 'user', 'customer', 'vip']);

/**
 * Lead source enum values
 */
export const LeadSourceSchema = z.enum([
  'hero_zenith',
  'exit_intent',
  'pricing_page',
  'referral',
  'organic',
  'paid_ad',
  'social',
  'direct',
  'other',
]);

/**
 * Full Customer schema for Firestore documents
 */
export const CustomerSchema = z.object({
  id: z.string().min(1),
  userId: UserIdSchema,
  stripeCustomerId: StripeCustomerIdSchema,
  email: z.string().email(),
  displayName: z.string().optional(),
  phone: z.string().optional(),

  // CRM Fields
  status: CustomerStatusSchema,
  source: z.union([LeadSourceSchema, z.string()]),
  convertedAt: TimestampSchema.optional(),
  originalLeadId: z.string().optional(),

  // Stripe Sync
  stripeCreatedAt: TimestampSchema,
  stripeUpdatedAt: TimestampSchema,

  // Billing Info
  defaultPaymentMethod: z.string().optional(),
  currency: z.string().length(3).optional(),

  // Financial Metrics
  totalSpent: z.number().nonnegative().optional(),
  lifetimeValue: z.number().nonnegative().optional(),
  firstPurchaseAt: TimestampSchema.optional(),

  // Metadata
  createdAt: TimestampSchema,
  updatedAt: TimestampSchema,
  tags: z.array(z.string()).optional(),
  notes: z.string().max(5000).optional(),
});

export type CustomerSchemaType = z.infer<typeof CustomerSchema>;

/**
 * Schema for creating a new customer
 */
export const CreateCustomerSchema = z
  .object({
    userId: UserIdSchema,
    email: z.string().email('Valid email required'),
    displayName: z.string().min(1).max(100).optional(),
    phone: z.string().max(20).optional(),
    source: z.union([LeadSourceSchema, z.string()]).default('direct'),
    originalLeadId: z.string().optional(),
  })
  .strict();

export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>;

/**
 * Schema for updating a customer
 */
export const UpdateCustomerSchema = z
  .object({
    displayName: z.string().min(1).max(100).optional(),
    phone: z.string().max(20).optional(),
    status: CustomerStatusSchema.optional(),
    tags: z.array(z.string().max(50)).max(20).optional(),
    notes: z.string().max(5000).optional(),
  })
  .strict();

export type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>;

/**
 * Schema for Stripe customer webhook data
 */
export const StripeCustomerWebhookSchema = z
  .object({
    id: StripeCustomerIdSchema,
    email: z.string().email().nullable(),
    name: z.string().nullable(),
    phone: z.string().nullable(),
    created: z.number(),
    currency: z.string().nullable(),
    default_source: z.string().nullable(),
    metadata: z.record(z.string(), z.string()).default({}),
  })
  .strict();

export type StripeCustomerWebhookData = z.infer<typeof StripeCustomerWebhookSchema>;
