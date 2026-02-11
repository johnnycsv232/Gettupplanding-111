import { z } from 'zod';

import { UserIdSchema, StripeSubscriptionIdSchema, TimestampSchema } from './base';

export const ProofPackAssetSchema = z.object({
  url: z.string().url(),
  type: z.enum(['image', 'video']),
  aiScore: z.number().min(0).max(100),
});

export const ProofPackSchema = z
  .object({
    id: z.string(),
    userId: UserIdSchema,
    subscriptionId: StripeSubscriptionIdSchema,
    deliveryDate: TimestampSchema,
    assets: z.array(ProofPackAssetSchema),
    overallScore: z.number().min(0).max(100),
    status: z.enum(['pending', 'processing', 'delivered', 'failed']),
    createdAt: TimestampSchema,
    updatedAt: TimestampSchema.optional(),
  })
  .strict();

export type ProofPack = z.infer<typeof ProofPackSchema>;
