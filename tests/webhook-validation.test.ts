
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/webhooks/stripe/route';
import { getAdminDb } from '@/lib/firebase-admin';
import * as stripeUtils from '@/lib/stripe';
import Stripe from 'stripe';

// Mock dependencies
vi.mock('@/lib/firebase-admin', () => ({
    getAdminDb: vi.fn(),
}));

vi.mock('@/lib/stripe', () => ({
    verifyWebhookSignature: vi.fn(),
    stripe: {
        webhooks: {
            constructEvent: vi.fn(),
        },
    }
}));

// Mock Firestore
const mockSet = vi.fn();
const mockUpdate = vi.fn();
const mockGet = vi.fn();
const mockCreate = vi.fn(); // NEW
const mockDoc = vi.fn(() => ({
    set: mockSet,
    update: mockUpdate,
    get: mockGet,
    create: mockCreate, // NEW
}));
const mockCollection = vi.fn(() => ({
    doc: mockDoc,
}));

// Helper to create mock request
const createMockRequest = (body: string, signature: string | null) => {
    return {
        text: () => Promise.resolve(body),
        headers: {
            get: (key: string) => key === 'stripe-signature' ? signature : null,
        },
    } as unknown as NextRequest;
};

// Helper to create mock event
const createMockEvent = (type: string, data: Record<string, unknown>): Partial<Stripe.Event> => ({
    id: 'evt_123',
    type,
    data: { object: data as unknown as Record<string, unknown> },
} as unknown as Partial<Stripe.Event>);

describe('Stripe Webhook Validation (TDD)', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.mocked(getAdminDb).mockReturnValue({
            collection: mockCollection,
        } as unknown as FirebaseFirestore.Firestore);
    });

    it('should fail when checkout.session.completed is missing metadata.userId', async () => {
        const req = createMockRequest('{}', 'valid_sig');

        // Payload MISSING userId
        const event = createMockEvent('checkout.session.completed', {
            id: 'cs_test_123',
            customer: 'cus_123',
            subscription: 'sub_123',
            metadata: {
                tier: 'T1'
                // userId MISSING
            }
        });

        vi.mocked(stripeUtils.verifyWebhookSignature).mockReturnValue(event as Stripe.Event);
        mockCreate.mockResolvedValue({}); // Lock acquired

        const res = await POST(req);

        // EXPECTATION: Should fail with 400 because of missing userId
        // Currently execution: Likely fails with 500 inside handler or passes if check is weak
        // We want explicit 400 Bad Request due to validation error
        expect(res.status).toBe(400);
        const json = await res.json();
        expect(json.error).toMatch(/validation/i);
    });

    it('should fail when checkout.session.completed is missing metadata.tier', async () => {
        const req = createMockRequest('{}', 'valid_sig');

        // Payload MISSING tier
        const event = createMockEvent('checkout.session.completed', {
            id: 'cs_test_123',
            customer: 'cus_123',
            subscription: 'sub_123',
            metadata: {
                userId: 'user_123'
                // tier MISSING
            }
        });

        vi.mocked(stripeUtils.verifyWebhookSignature).mockReturnValue(event as Stripe.Event);
        mockGet.mockResolvedValue({ exists: false });

        const res = await POST(req);

        expect(res.status).toBe(400);
        const json = await res.json();
        expect(json.error).toMatch(/validation/i);
    });

    it('should fail when subscription event is missing userId in metadata', async () => {
        const req = createMockRequest('{}', 'valid_sig');

        const event = createMockEvent('customer.subscription.updated', {
            id: 'sub_123',
            status: 'active',
            metadata: {
                // userId MISSING
            }
        });

        vi.mocked(stripeUtils.verifyWebhookSignature).mockReturnValue(event as Stripe.Event);
        mockGet.mockResolvedValue({ exists: false });

        const res = await POST(req);

        expect(res.status).toBe(400);
        const json = await res.json();
        expect(json.error).toMatch(/validation/i);
    });

    it('should fail when customer.subscription.deleted is missing userId', async () => {
        const req = createMockRequest('{}', 'valid_sig');

        const event = createMockEvent('customer.subscription.deleted', {
            id: 'sub_123',
            status: 'canceled',
            metadata: {
                // userId MISSING
            }
        });

        vi.mocked(stripeUtils.verifyWebhookSignature).mockReturnValue(event as Stripe.Event);
        mockGet.mockResolvedValue({ exists: false });

        const res = await POST(req);

        expect(res.status).toBe(400);
        const json = await res.json();
        expect(json.error).toMatch(/validation/i);
    });

    it('should fail when metadata contains unknown fields (Strictness Invariant)', async () => {
        const req = createMockRequest('{}', 'valid_sig');

        const event = createMockEvent('checkout.session.completed', {
            id: 'cs_test_123',
            customer: 'cus_123',
            subscription: 'sub_123',
            metadata: {
                userId: 'user_123',
                tier: 'T1',
                malicious_field: 'inject' // UNKNOWN FIELD
            }
        });

        vi.mocked(stripeUtils.verifyWebhookSignature).mockReturnValue(event as Stripe.Event);
        mockGet.mockResolvedValue({ exists: false });

        const res = await POST(req);

        // This will FAIL currently because the schema uses .passthrough() or MetadataSchema.passthrough()
        expect(res.status).toBe(400);
        const json = await res.json();
        expect(json.error).toMatch(/validation/i);
        expect(json.error).toMatch(/unrecognized_keys/i);
    });

    it('should fail when subscription metadata contains unknown fields (Strictness Invariant)', async () => {
        const req = createMockRequest('{}', 'valid_sig');

        const event = createMockEvent('customer.subscription.updated', {
            id: 'sub_123',
            status: 'active',
            metadata: {
                userId: 'user_123',
                malicious_field: 'inject' // UNKNOWN FIELD
            }
        });

        vi.mocked(stripeUtils.verifyWebhookSignature).mockReturnValue(event as Stripe.Event);
        mockGet.mockResolvedValue({ exists: false });

        const res = await POST(req);

        // This SHOULD fail if we are being strict
        expect(res.status).toBe(400);
        const json = await res.json();
        expect(json.error).toMatch(/validation/i);
        expect(json.error).toMatch(/unrecognized_keys/i);
    });
});
