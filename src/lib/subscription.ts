import { FieldValue } from 'firebase-admin/firestore';

import { StripeSubscriptionId, UserId } from '@/types/brands';

import { getAdminDb } from './firebase-admin';
import { stripe } from './stripe';

/**
 * Synchronizes a subscription from Stripe to Firestore.
 * Prevents "Local subscription state drifting from Stripe state" (Stripe Skill Sharp Edge)
 */
export async function syncSubscription(subscriptionId: StripeSubscriptionId) {
  const db = getAdminDb();

  // 1. Fetch from Stripe (Source of Truth)
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const userId = subscription.metadata.userId as UserId;
  if (!userId) {
    throw new Error(`Subscription ${subscriptionId} missing userId in metadata`);
  }

  const { status, customer } = subscription;
  const tier = subscription.metadata.tier || 'free';

  // 2. Update Subscription Record
  await db.collection('subscriptions').doc(subscriptionId).set(
    {
      userId,
      tier,
      stripeCustomerId: customer,
      stripeSubscriptionId: subscriptionId,
      status,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  // 3. Update User Record
  const isActive = status === 'active' || status === 'trialing';

  await db.collection('users').doc(userId).update({
    subscriptionTier: tier,
    hasActiveSubscription: isActive,
    subscriptionStatus: status,
  });

  console.warn(
    `🔄 Synced Subscription [${subscriptionId}] for User [${userId}]. Status: ${status}`,
  );

  return { status, userId, tier };
}
