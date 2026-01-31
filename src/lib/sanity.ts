/**
 * Sanity CMS Client Configuration
 *
 * INVARIANT: No fetch without Zod parsing (docs/invariants.md)
 * All Sanity data must be validated through Zod schemas.
 */

import { createClient, type SanityClient } from '@sanity/client';

// Environment validation
function validateSanityEnv(): void {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.warn('⚠️ Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
    if (process.env.NODE_ENV === 'production') {
      throw new Error('INVARIANT VIOLATION: Missing Sanity project configuration');
    }
  }
}

// Singleton Sanity client
let sanityClient: SanityClient | undefined;

export function getSanityClient(): SanityClient {
  if (!sanityClient) {
    validateSanityEnv();
    sanityClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    });
  }
  return sanityClient;
}

/**
 * GROQ Queries - centralized query definitions
 */
export const QUERIES = {
  allWorks: `*[_type == "work"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage {
      asset-> {
        _ref,
        url
      },
      alt
    },
    category,
    publishedAt
  }`,

  heroContent: `*[_type == "hero"][0] {
    _id,
    headline,
    subheadline,
    ctaText,
    ctaLink,
    backgroundType,
    backgroundAsset {
      asset-> {
        _ref,
        url
      }
    }
  }`,

  pricingTiers: `*[_type == "pricing"] | order(price asc) {
    _id,
    tierName,
    tierCode,
    price,
    currency,
    features,
    highlighted,
    stripePriceId
  }`,
} as const;

// Re-export for convenience
export type { SanityClient };
