// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/webhooks/stripe/route';
import { NextRequest } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

// Helpers
const createRequest = (body: object, signature: string = 'valid_signature') => {
    return new NextRequest('http://localhost/api/webhooks/stripe', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'stripe-signature': signature,
        },
    });
};

describe('Stripe Webhook Handler', () => {
    const mockDb = getAdminDb();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Security Invariants', () => {
        it('should reject requests without signature', async () => {
            const req = new NextRequest('http://localhost/api/webhooks/stripe', {
                method: 'POST',
                body: JSON.stringify({}),
            });

            const res = await POST(req);
            expect(res.status).toBe(400);
            expect(await res.json()).toEqual({ error: 'Missing stripe-signature header' });
        });

        it('should reject invalid signatures', async () => {
            const req = createRequest({}, 'invalid_signature');
            const res = await POST(req);

            expect(res.status).toBe(400);
            expect((await res.json()).error).toContain('Webhook signature verification failed');
        });

        it('should enforce idempotency lock (reject processed events)', async () => {
            // Setup mock to throw ALREADY_EXISTS for idempotency lock
            const mockCreate = vi.fn().mockRejectedValue({ code: 6, message: 'ALREADY_EXISTS' });
            vi.spyOn(mockDb, 'collection').mockReturnValue({
                doc: vi.fn().mockReturnValue({ create: mockCreate }),
            } as any);

            const event = { id: 'evt_processed', type: 'ping' };
            const req = createRequest(event);
            const res = await POST(req);

            expect(res.status).toBe(200);
            expect(await res.json()).toEqual({ received: true, skipped: true });
        });
    });

    describe('Deployment Flow (Checkout)', () => {
        it('should process successful checkout session', async () => {
            // Setup mock for idempotency lock (create) and writes
            const mockCreate = vi.fn().mockResolvedValue({});
            const mockSet = vi.fn().mockResolvedValue({});
            const mockUpdate = vi.fn().mockResolvedValue({});

            vi.spyOn(mockDb, 'collection').mockImplementation(() => {
                return {
                    doc: vi.fn(() => ({
                        create: mockCreate,
                        set: mockSet,
                        update: mockUpdate,
                    }))
                } as any;
            });

            const metadata = { userId: 'user_123', tier: 'pilot', priceId: 'price_123' };
            const event = {
                id: 'evt_new',
                type: 'checkout.session.completed',
                data: {
                    object: {
                        id: 'cs_test_123',
                        customer: 'cus_123',
                        subscription: 'sub_123',
                        metadata,
                    },
                },
            };

            const req = createRequest(event);
            const res = await POST(req);

            expect(res.status).toBe(200);
            expect(await res.json()).toEqual({ received: true, success: true });

            // Verify subscription creation
            expect(mockSet).toHaveBeenCalledWith(expect.objectContaining({
                tier: 'pilot',
                userId: 'user_123',
            }));

            // Verify user update
            expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
                subscriptionTier: 'pilot'
            }));

            // Verify idempotency record update
            expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
                status: 'completed',
                success: true
            }));
        });

        it('should fail with invalid metadata (Zod validation)', async () => {
            const mockCreate = vi.fn().mockResolvedValue({});
            const mockUpdate = vi.fn().mockResolvedValue({});
            vi.spyOn(mockDb, 'collection').mockReturnValue({
                doc: vi.fn(() => ({ create: mockCreate, update: mockUpdate })),
            } as any);

            const event = {
                id: 'evt_bad_meta',
                type: 'checkout.session.completed',
                data: {
                    object: {
                        customer: 'cus_123',
                        subscription: 'sub_123',
                        metadata: { invalid: 'metadata' }, // Missing userId, tier
                    },
                },
            };

            const req = createRequest(event);
            const res = await POST(req);

            expect(res.status).toBe(400); // Validation Error

            // Verify failed idempotency record update
            expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
                status: 'failed',
                success: false
            }));
        });
    });
});
