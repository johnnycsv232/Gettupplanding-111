/**
 * Test Factories
 * 
 * INVARIANT: Factory-First Mocks (docs/invariants.md)
 * All mock data in tests must be generated via factory functions.
 */

import type {
    User,
    Subscription,
    ProofPack,
    CheckoutMetadata,
    SanityWork,
    SanityHero,
    SanityPricing,
} from '@/lib/schemas';
import { STRIPE_PRICE_IDS } from '@/lib/schemas';

// Helper for generating unique IDs
let idCounter = 0;
function generateId(prefix: string): string {
    return `${prefix}_${++idCounter}_${Date.now()}`;
}

// Helper for generating ISO dates
function isoDate(daysOffset = 0): string {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toISOString();
}

// ============================================
// USER FACTORIES
// ============================================

export function getMockUser(overrides: Partial<User> = {}): User {
    const uid = overrides.uid || generateId('user');
    return {
        uid,
        email: `${uid}@test.example.com`,
        displayName: 'Test User',
        subscriptionTier: 'free',
        createdAt: isoDate(-30),
        updatedAt: isoDate(),
        ...overrides,
    };
}

// ============================================
// SUBSCRIPTION FACTORIES
// ============================================

export function getMockSubscription(
    overrides: Partial<Subscription> = {}
): Subscription {
    const id = overrides.id || generateId('sub');
    const userId = overrides.userId || generateId('user');
    const tier = overrides.tier || 'pilot';

    return {
        id,
        userId,
        stripeCustomerId: overrides.stripeCustomerId || generateId('cus'),
        stripeSubscriptionId: id,
        stripePriceId: STRIPE_PRICE_IDS[tier],
        tier,
        status: 'active',
        currentPeriodStart: isoDate(-30),
        currentPeriodEnd: isoDate(30),
        createdAt: isoDate(-30),
        updatedAt: isoDate(),
        ...overrides,
    };
}

// ============================================
// PROOF PACK FACTORIES
// ============================================

export function getMockProofPack(
    overrides: Partial<ProofPack> = {}
): ProofPack {
    const id = overrides.id || generateId('pack');
    return {
        id,
        userId: overrides.userId || generateId('user'),
        subscriptionId: overrides.subscriptionId || generateId('sub'),
        deliveryDate: isoDate(),
        assets: [
            {
                url: 'https://example.com/image1.jpg',
                type: 'image',
                aiScore: 85,
            },
            {
                url: 'https://example.com/image2.jpg',
                type: 'image',
                aiScore: 92,
            },
        ],
        overallScore: 88,
        status: 'delivered',
        createdAt: isoDate(),
        ...overrides,
    };
}

// ============================================
// STRIPE FACTORIES
// ============================================

export function getMockCheckoutMetadata(
    overrides: Partial<CheckoutMetadata> = {}
): CheckoutMetadata {
    return {
        userId: overrides.userId || generateId('user'),
        tier: 'pilot',
        priceId: STRIPE_PRICE_IDS.pilot,
        ...overrides,
    };
}

// ============================================
// SANITY FACTORIES
// ============================================

export function getMockSanityWork(
    overrides: Partial<SanityWork> = {}
): SanityWork {
    const id = overrides._id || generateId('work');
    return {
        _id: id,
        title: 'Test Portfolio Work',
        slug: { current: `test-work-${id}` },
        description: 'A sample portfolio piece for testing.',
        mainImage: {
            asset: {
                _ref: `image-${id}`,
                url: 'https://via.placeholder.com/800x600',
            },
            alt: 'Test image',
        },
        category: 'Photography',
        publishedAt: isoDate(-7),
        ...overrides,
    };
}

export function getMockSanityHero(
    overrides: Partial<SanityHero> = {}
): SanityHero {
    return {
        _id: overrides._id || generateId('hero'),
        headline: 'OWN THE NIGHT',
        subheadline: 'Premium nightlife photography for elite venues.',
        ctaText: 'Get Started',
        ctaLink: '/pricing',
        backgroundType: '3d',
        backgroundAsset: {
            asset: {
                _ref: 'image-fallback',
                url: 'https://via.placeholder.com/1920x1080',
            },
        },
        ...overrides,
    };
}

export function getMockSanityPricing(
    overrides: Partial<SanityPricing> = {}
): SanityPricing {
    const tierCode = overrides.tierCode || 'pilot';
    const prices: Record<string, number> = {
        pilot: 345,
        t1: 445,
        t2: 695,
        t3: 995,
    };

    return {
        _id: overrides._id || generateId('pricing'),
        tierName: tierCode.toUpperCase(),
        tierCode,
        price: prices[tierCode],
        currency: 'USD',
        features: [
            'Professional editing',
            'Fast turnaround',
            'Digital delivery',
        ],
        highlighted: tierCode === 't2',
        stripePriceId: STRIPE_PRICE_IDS[tierCode],
        ...overrides,
    };
}
