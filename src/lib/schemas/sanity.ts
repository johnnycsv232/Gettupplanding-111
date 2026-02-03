import { z } from 'zod';

export const SanityImageSchema = z.object({
  asset: z.object({
    _ref: z.string(),
    url: z.string().url(),
  }),
  alt: z.string().optional(),
});

export const SanityWorkSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  description: z.string(),
  mainImage: SanityImageSchema,
  category: z.string(),
  publishedAt: z.string(),
});

export type SanityWork = z.infer<typeof SanityWorkSchema>;

export const SanityHeroSchema = z.object({
  _id: z.string(),
  headline: z.string(),
  subheadline: z.string(),
  ctaText: z.string(),
  ctaLink: z.string(),
  backgroundType: z.enum(['video', 'image', '3d']),
  backgroundAsset: z.object({
    asset: z.object({
      _ref: z.string(),
      url: z.string().url(),
    }),
  }),
});

export type SanityHero = z.infer<typeof SanityHeroSchema>;

export const SanityPricingSchema = z.object({
  _id: z.string(),
  tierName: z.string(),
  tierCode: z.string(),
  price: z.number(),
  currency: z.string(),
  features: z.array(z.string()),
  highlighted: z.boolean(),
  stripePriceId: z.string(),
});

export type SanityPricing = z.infer<typeof SanityPricingSchema>;
