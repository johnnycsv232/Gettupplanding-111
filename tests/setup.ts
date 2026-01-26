import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-api-key';
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test-project.firebaseapp.com';
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';
process.env.STRIPE_SECRET_KEY = 'sk_test_123';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_123';
process.env.FIREBASE_PROJECT_ID = 'test-project';
process.env.FIREBASE_CLIENT_EMAIL = 'test@example.com';
process.env.FIREBASE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD\n-----END PRIVATE KEY-----';

// Mock Firebase Admin
vi.mock('@/lib/firebase-admin', () => {
    const mockCollection = vi.fn(() => ({
        doc: vi.fn(() => ({
            get: vi.fn().mockResolvedValue({ exists: false, data: () => ({}) }),
            set: vi.fn().mockResolvedValue({}),
            update: vi.fn().mockResolvedValue({}),
        })),
    }));

    const mockDb = {
        collection: mockCollection,
    };

    return {
        getAdminDb: vi.fn(() => mockDb),
        getAdminAuth: vi.fn(),
        getAdminApp: vi.fn(),
    };
});

// Mock Stripe
vi.mock('@/lib/stripe', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@/lib/stripe')>();
    return {
        ...actual,
        getStripeClient: vi.fn(() => ({
            subscriptions: {
                retrieve: vi.fn().mockResolvedValue({
                    id: 'sub_123',
                    status: 'active',
                    current_period_start: 1700000000,
                    current_period_end: 1702592000,
                    customer: 'cus_123',
                    items: {
                        data: [{ price: { id: 'price_1SY1yqGfFr3wuAHAqmytgSsj' } }]
                    }
                }),
            },
            webhooks: {
                constructEvent: vi.fn((payload, signature, _secret) => {
                    if (signature === 'invalid_signature') {
                        throw new Error('Invalid signature');
                    }
                    return JSON.parse(payload);
                }),
            },
        })),
        verifyWebhookSignature: vi.fn((payload, signature) => {
            if (signature === 'invalid_signature') {
                throw new Error('Webhook signature verification failed: Invalid signature');
            }
            return JSON.parse(payload);
        }),
    };
});

// Mock Next.js NextResponse
vi.mock('next/server', () => ({
    NextResponse: {
        json: vi.fn((body, init) => ({
            json: async () => body,
            status: init?.status || 200,
        })),
    },
    NextRequest: class {
        constructor(public url: string, public init?: RequestInit) { }
        async text() { return this.init?.body as string; }
        get headers() { return new Headers(this.init?.headers); }
    }
}));
