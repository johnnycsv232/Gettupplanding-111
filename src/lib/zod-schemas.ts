import { z } from 'zod';

// --- Core Identifiers ---
export const UserIdSchema = z.string().min(1).describe('Firebase Auth UID');
export const StripeCustomerIdSchema = z.string().startsWith('cus_').describe('Stripe Customer ID');
export const StripeSubscriptionIdSchema = z.string().startsWith('sub_').describe('Stripe Subscription ID');

// --- Helper for Firebase Timestamps ---
const TimestampSchema = z.union([
    z.date(),
    z.object({
        seconds: z.number(),
        nanoseconds: z.number(),
    })
]);

// --- User Schema ---
export const UserSchema = z.object({
    uid: UserIdSchema,
    email: z.string().email(),
    displayName: z.string().optional(),
    photoURL: z.string().url().optional(),
    subscriptionTier: z.enum(['free', 'pro', 'enterprise']).default('free'),
    stripeCustomerId: StripeCustomerIdSchema.optional(),
    hasActiveSubscription: z.boolean().default(false),
    createdAt: TimestampSchema, // Proper Timestamp type
    updatedAt: TimestampSchema, // Proper Timestamp type
}).strict();

export type User = z.infer<typeof UserSchema>;

// --- Subscription Schema ---
export const SubscriptionSchema = z.object({
    id: StripeSubscriptionIdSchema,
    userId: UserIdSchema,
    stripeCustomerId: StripeCustomerIdSchema,
    status: z.enum(['active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid', 'paused']),
    tier: z.enum(['free', 'pro', 'enterprise']),
    currentPeriodEnd: TimestampSchema, // Proper Timestamp/date type
    cancelAtPeriodEnd: z.boolean().default(false),
    createdAt: TimestampSchema,
    updatedAt: TimestampSchema,
}).strict();

export type Subscription = z.infer<typeof SubscriptionSchema>;

// --- Proof Pack Schema (Invariant 7) ---
export const ProofPackSchema = z.object({
    id: z.string().uuid().optional(),
    userId: UserIdSchema,
    taskId: z.string().min(1),
    taskSummary: z.string().min(1),
    aiQualityScore: z.number().min(0).max(100),
    filesChanged: z.array(z.string()),
    timestamp: TimestampSchema,
}).strict();

export type ProofPack = z.infer<typeof ProofPackSchema>;

// --- Lead Schema ---
export const LeadSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    city: z.string().optional(),
    source: z.enum(['hero', 'exit-intent']),
});

export type Lead = z.infer<typeof LeadSchema>;
