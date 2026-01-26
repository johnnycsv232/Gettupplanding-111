
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
const mockCreate = vi.fn();
const mockDoc = vi.fn(() => ({
    set: mockSet,
    update: mockUpdate,
    get: mockGet,
    create: mockCreate,
}));
const mockCollection = vi.fn(() => ({
    doc: mockDoc,
}));

// Mock Data Factories
const createMockRequest = (body: string, signature: string | null) => {
    return {
        text: () => Promise.resolve(body),
        headers: {
            get: (key: string) => key === 'stripe-signature' ? signature : null,
        },
    } as unknown as NextRequest;
};

const createMockEvent = (type: string, data: Record<string, unknown>) => ({
    id: 'evt_123',
    type,
    data: { object: data },
});

describe('Stripe Webhook Handler', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.mocked(getAdminDb).mockReturnValue({
            collection: mockCollection,
        } as unknown as FirebaseFirestore.Firestore);
    });

    it('should return 400 if signature is missing', async () => {
        const req = createMockRequest('{}', null);
        const res = await POST(req);
        expect(res.status).toBe(400);
        const json = await res.json();
        expect(json.error).toContain('Missing stripe-signature');
    });

    it('should return 400 if signature verification fails', async () => {
        const req = createMockRequest('{}', 'invalid_sig');
        vi.mocked(stripeUtils.verifyWebhookSignature).mockImplementation(() => {
            throw new Error('Invalid signature');
        });

        const res = await POST(req);
        expect(res.status).toBe(400);
        const json = await res.json();
        expect(json.error).toContain('Webhook signature verification failed');
    });

    it('should verify signature and process event', async () => {
        const req = createMockRequest('{}', 'valid_sig');
        const event = createMockEvent('customer.subscription.updated', {
            id: 'sub_123',
            status: 'active',
            metadata: { userId: 'user_123' },
        });

        vi.mocked(stripeUtils.verifyWebhookSignature).mockReturnValue(event as unknown as Stripe.Event);
        mockGet.mockResolvedValue({ exists: false }); // Idempotency check

        const res = await POST(req);

        expect(res.status).toBe(200);
        expect(stripeUtils.verifyWebhookSignature).toHaveBeenCalled();
        expect(mockCollection).toHaveBeenCalledWith('subscriptions');
        expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
            status: 'active'
        }));
    });

    it('should handle idempotency (skip processed events)', async () => {
        const req = createMockRequest('{}', 'valid_sig');
        const event = createMockEvent('customer.subscription.updated', {
            id: 'sub_123',
            status: 'active',
            metadata: { userId: 'user_123' }
        });

        vi.mocked(stripeUtils.verifyWebhookSignature).mockReturnValue(event as unknown as Stripe.Event);
        mockCreate.mockRejectedValue({ code: 6, message: 'ALREADY_EXISTS' }); // Already processed

        const res = await POST(req);

        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.skipped).toBe(true);
        expect(mockUpdate).not.toHaveBeenCalled();
    });

    it('should downgrade user on subscription deletion', async () => {
        const req = createMockRequest('{}', 'valid_sig');
        const event = createMockEvent('customer.subscription.deleted', {
            id: 'sub_123',
            status: 'canceled',
            metadata: { userId: 'user_123' }
        });

        vi.mocked(stripeUtils.verifyWebhookSignature).mockReturnValue(event as unknown as Stripe.Event);
        mockCreate.mockResolvedValue({}); // Lock acquired

        await POST(req);

        // Verify user update
        expect(mockCollection).toHaveBeenCalledWith('users');
        expect(mockDoc).toHaveBeenCalledWith('user_123');
        expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
            subscriptionTier: 'free',
            hasActiveSubscription: false
        }));
    });
});
