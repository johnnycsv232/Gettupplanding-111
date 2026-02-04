import { z } from 'zod';

import { TimestampSchema, UserIdSchema, StripeCustomerIdSchema } from './base';

export const UserSchema = z
  .object({
    uid: UserIdSchema,
    email: z.string().email(),
    displayName: z.string().optional(),
    subscriptionTier: z.enum(['free', 'pilot', 't1', 't2', 't3']).default('free'),
    stripeCustomerId: StripeCustomerIdSchema.optional(),
    hasActiveSubscription: z.boolean().default(false),
    createdAt: TimestampSchema,
    updatedAt: TimestampSchema,
  })
  .strict();

export type User = z.infer<typeof UserSchema>;
