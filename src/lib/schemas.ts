import { z } from 'zod';

// ============================================
// FIREBASE DTOs (Mandatory Zod Validation)
// See docs/invariants.md - Mandatory Zod DTOs
// ============================================

/**
 * User profile stored in Firestore
 */
export const UserSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  displayName: z.string().optional(),
  subscriptionTier: z.enum(['free', 'pilot', 't1', 't2', 't3']).default('free'),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).strict();

export type User = z.infer<typeof UserSchema>;

/**
 * Subscription record tied to Stripe
 */
export const SubscriptionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  stripeCustomerId: z.string(),
  stripeSubscriptionId: z.string(),
  stripePriceId: z.string(),
  tier: z.enum(['pilot', 't1', 't2', 't3']),
  status: z.enum(['active', 'canceled', 'past_due', 'unpaid', 'trialing']),
  currentPeriodStart: z.string().datetime(),
  currentPeriodEnd: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).strict();

export type Subscription = z.infer<typeof SubscriptionSchema>;

/**
 * Proof Pack - AI-scored delivery record
 */
export const ProofPackSchema = z.object({
  id: z.string(),
  userId: z.string(),
  subscriptionId: z.string(),
  deliveryDate: z.string().datetime(),
  assets: z.array(z.object({
    url: z.string().url(),
    type: z.enum(['image', 'video']),
    aiScore: z.number().min(0).max(100),
    metadata: z.record(z.string(), z.string()).optional(),
  })),
  overallScore: z.number().min(0).max(100),
  status: z.enum(['pending', 'delivered', 'rejected']),
  createdAt: z.string().datetime(),
}).strict();

export type ProofPack = z.infer<typeof ProofPackSchema>;

// ============================================
// STRIPE DTOs
// ============================================

/**
 * Stripe Checkout Session Metadata
 * INVARIANT: Use metadata as single source of truth (threat-model.md)
 */
export const CheckoutMetadataSchema = z.object({
  userId: z.string(),
  tier: z.enum(['pilot', 't1', 't2', 't3']),
  priceId: z.string(),
}).strict();

export type CheckoutMetadata = z.infer<typeof CheckoutMetadataSchema>;

/**
 * Processed webhook event record (for idempotency)
 */
export const ProcessedEventSchema = z.object({
  eventId: z.string(), // Stripe-Event-Id
  type: z.string(),
  processedAt: z.string().datetime(),
  success: z.boolean(),
}).strict();

export type ProcessedEvent = z.infer<typeof ProcessedEventSchema>;

// ============================================
// Verified Stripe Price IDs (from architecture.md)
// ============================================

export const STRIPE_PRICE_IDS = {
  pilot: 'price_1SY1yqGfFr3wuAHAqmytgSsj',
  t1: 'price_1SY1yqGfFr3wuAHAQhUzUNr9',
  t2: 'price_1SY1yrGfFr3wuAHAoc46u4WB',
  t3: 'price_1SY1yrGfFr3wuAHA7cULY8Ef',
} as const;

export const TIER_FROM_PRICE_ID: Record<string, 'pilot' | 't1' | 't2' | 't3'> = {
  [STRIPE_PRICE_IDS.pilot]: 'pilot',
  [STRIPE_PRICE_IDS.t1]: 't1',
  [STRIPE_PRICE_IDS.t2]: 't2',
  [STRIPE_PRICE_IDS.t3]: 't3',
};

// ============================================
// SANITY DTOs
// ============================================

/**
 * Portfolio work item from Sanity CMS
 */
export const SanityWorkSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.object({ current: z.string() }),
  description: z.string().optional(),
  mainImage: z.object({
    asset: z.object({
      _ref: z.string(),
      url: z.string().url().optional(),
    }),
    alt: z.string().optional(),
  }).optional(),
  category: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
}).strict();

export type SanityWork = z.infer<typeof SanityWorkSchema>;

/**
 * Hero content from Sanity CMS
 */
export const SanityHeroSchema = z.object({
  _id: z.string(),
  headline: z.string(),
  subheadline: z.string().optional(),
  ctaText: z.string(),
  ctaLink: z.string(),
  backgroundType: z.enum(['3d', 'image', 'video']).default('3d'),
  backgroundAsset: z.object({
    asset: z.object({
      _ref: z.string(),
      url: z.string().url().optional(),
    }),
  }).optional(),
}).strict();

export type SanityHero = z.infer<typeof SanityHeroSchema>;

/**
 * Pricing tier from Sanity CMS
 */
export const SanityPricingSchema = z.object({
  _id: z.string(),
  tierName: z.string(),
  tierCode: z.enum(['pilot', 't1', 't2', 't3']),
  price: z.number(),
  currency: z.string().default('USD'),
  features: z.array(z.string()),
  highlighted: z.boolean().default(false),
  stripePriceId: z.string(),
}).strict();

export type SanityPricing = z.infer<typeof SanityPricingSchema>;
