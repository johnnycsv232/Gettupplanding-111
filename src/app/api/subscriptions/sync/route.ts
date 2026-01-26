
import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { syncSubscription } from '@/lib/subscription';
import { StripeSubscriptionId } from '@/types/brands';

/**
 * POST /api/subscriptions/sync
 * Allows a user to manually trigger a sync of their subscription status from Stripe.
 * Prevents "Local subscription state drifting from Stripe state".
 */
export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const adminAuth = getAdminAuth();
    const adminDb = getAdminDb();

    try {
        // 1. Verify User Session
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const userId = decodedToken.uid;

        // 2. Find User's Subscription ID
        // Note: A user might have multiple subscriptions, but we'll fetch the current active one from their profile
        const userDoc = await adminDb.collection('users').doc(userId).get();
        const userData = userDoc.data();

        if (!userData) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Search for active subscription in subscriptions collection
        const subscriptionsSnapshot = await adminDb.collection('subscriptions')
            .where('userId', '==', userId)
            .where('status', 'in', ['active', 'trialing', 'past_due', 'incomplete'])
            .limit(1)
            .get();

        if (subscriptionsSnapshot.empty) {
            return NextResponse.json({ message: 'No active subscription found to sync' }, { status: 200 });
        }

        const subscriptionDoc = subscriptionsSnapshot.docs[0];
        const subscriptionId = subscriptionDoc.id as StripeSubscriptionId;

        // 3. Perform Sync (Source of Truth: Stripe)
        const result = await syncSubscription(subscriptionId);

        return NextResponse.json({
            success: true,
            message: 'Subscription synchronized successfully',
            data: result
        });

    } catch (error: unknown) {
        console.error('❌ Error in /api/subscriptions/sync:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
