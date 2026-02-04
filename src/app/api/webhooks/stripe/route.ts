import { FieldValue } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { getAdminDb } from '@/lib/firebase-admin';
import { StripeCustomerWebhookSchema } from '@/lib/schemas/customer';
import { syncStripeCustomerToFirestore } from '@/lib/services/customer.service';
import { verifyWebhookSignature } from '@/lib/stripe';
import {
  checkoutSessionCompletedSchema,
  subscriptionSchema,
  invoiceSchema,
  type CheckoutSessionCompleted,
  type SubscriptionEvent,
  type InvoiceEvent,
} from '@/lib/validations/stripe';

// INVARIANT: Stripe Webhook is the ONLY Source of Truth
// INVARIANT: Idempotency Lock (prevent replay attacks)
// INVARIANT: Signature Verification (mandatory)

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = verifyWebhookSignature(body, signature);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`⚠️ Webhook signature verification failed.`, errorMessage);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${errorMessage}` },
      { status: 400 }
    );
  }

  const { id: eventId, type: eventType } = event;
  const adminDb = getAdminDb();

  // Idempotency: Atomic Lock using 'create'
  const idempotencyRef = adminDb.collection('webhook_events').doc(eventId);

  try {
    // Attempt to acquire lock by creating the document
    // If it already exists, this will throw ALREADY_EXISTS error
    await idempotencyRef.create({
      eventId,
      type: eventType,
      status: 'processing',
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (error: unknown) {
    if (error && typeof error === 'object' && ('code' in error || 'message' in error)) {
      const err = error as { code?: number | string; message?: string };
      if (
        err.code === 6 ||
        err.code === 'ALREADY_EXISTS' ||
        err.message?.includes('ALREADY_EXISTS')
      ) {
        console.warn(`ℹ️ Event ${eventId} already processed or processing. Skipping.`);
        return NextResponse.json({ received: true, skipped: true });
      }
    }
    // Real db error
    console.error('Error acquiring idempotency lock:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  try {
    // State Machine for Stripe Events
    switch (eventType) {
      case 'checkout.session.completed': {
        const session = checkoutSessionCompletedSchema.parse(event.data.object);
        await handleCheckoutSessionCompleted(session, adminDb);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = subscriptionSchema.parse(event.data.object);
        await handleSubscriptionUpdated(subscription, adminDb);
        break;
      }

      case 'customer.subscription.deleted': {
        const deletedSub = subscriptionSchema.parse(event.data.object);
        await handleSubscriptionDeleted(deletedSub, adminDb);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = invoiceSchema.parse(event.data.object);
        await handleInvoicePaymentFailed(invoice, adminDb);
        break;
      }

      // Customer Events
      case 'customer.created':
      case 'customer.updated': {
        // We use the same schema for both, as they carry the same data shape
        const customerData = StripeCustomerWebhookSchema.parse(event.data.object);
        await syncStripeCustomerToFirestore(customerData);
        break;
      }

      case 'customer.deleted': {
        // Handle deletion if necessary - usually just marking as deleted/churned
        // For now, we'll sync the deleted state via syncStripeCustomerToFirestore
        // which handles updates. We might want a specific handler later.
        const customerData = StripeCustomerWebhookSchema.parse(event.data.object);
        await syncStripeCustomerToFirestore(customerData);
        break;
      }

      default:
        console.warn(`Unhandled event type ${eventType}`);
    }

    // Mark event as success
    await idempotencyRef.update({
      status: 'completed',
      processedAt: FieldValue.serverTimestamp(),
      success: true,
    });

    return NextResponse.json({ received: true, success: true });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ZodError') {
      const zodError = error as import('zod').ZodError;
      console.error(`⚠️ Webhook validation failed:`, zodError.message);

      await idempotencyRef.update({
        status: 'failed',
        error: `Validation: ${zodError.message}`,
        processedAt: FieldValue.serverTimestamp(),
        success: false,
      });
      return NextResponse.json(
        { error: `Webhook validation failed: ${zodError.message}` },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Error processing event ${eventId}:`, error);

    // Mark as failed
    await idempotencyRef.update({
      status: 'failed',
      error: errorMessage,
      processedAt: FieldValue.serverTimestamp(),
      success: false,
    });

    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

// Handler Functions

async function handleCheckoutSessionCompleted(
  session: CheckoutSessionCompleted,
  db: FirebaseFirestore.Firestore
) {
  const { metadata, customer, subscription } = session;
  const { userId, tier } = metadata;

  // Create Subscription Record
  await db
    .collection('subscriptions')
    .doc(subscription as string)
    .set({
      userId,
      tier,
      stripeCustomerId: customer,
      stripeSubscriptionId: subscription,
      status: 'active', // Optimistic, will be updated by subscription.updated
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

  // Update User Record with Tier
  await db.collection('users').doc(userId).update({
    subscriptionTier: tier,
    stripeCustomerId: customer,
    hasActiveSubscription: true,
  });

  console.warn(`✅ Provisioned Tier [${tier}] for User [${userId}] via Session [${session.id}]`);
}

async function handleSubscriptionUpdated(
  subscription: SubscriptionEvent,
  db: FirebaseFirestore.Firestore
) {
  const { id, status, metadata } = subscription;
  const { userId } = metadata;

  await db.collection('subscriptions').doc(id).update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
  });

  // If subscription is no longer active, update user status
  // Statuses that grant access: active, trialing
  const isActive = status === 'active' || status === 'trialing';

  await db.collection('users').doc(userId).update({
    hasActiveSubscription: isActive,
    subscriptionStatus: status,
  });

  console.warn(`🔄 Updated Subscription [${id}] for User [${userId}]. Status: ${status}`);
}

async function handleSubscriptionDeleted(
  subscription: SubscriptionEvent,
  db: FirebaseFirestore.Firestore
) {
  const { id, metadata } = subscription;
  const { userId } = metadata;

  await db.collection('subscriptions').doc(id).update({
    status: 'canceled',
    canceledAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  await db.collection('users').doc(userId).update({
    hasActiveSubscription: false,
    subscriptionTier: 'free', // Downgrade to free
    subscriptionStatus: 'canceled',
  });

  console.warn(`🚫 Deleted Subscription [${id}] for User [${userId}]. Downgraded to free.`);
}

async function handleInvoicePaymentFailed(invoice: InvoiceEvent, db: FirebaseFirestore.Firestore) {
  const { subscription, billing_reason } = invoice;

  if (!subscription) return;

  // Log failure for dunning tracking
  console.warn(
    `⚠️ Payment failed for invoice ${invoice.id} (Sub: ${subscription}, Reason: ${billing_reason})`
  );

  // Update subscription status in DB
  // Stripe will automatically retry based on settings, but we should reflect the state
  await db.collection('subscriptions').doc(subscription).update({
    status: 'past_due',
    updatedAt: FieldValue.serverTimestamp(),
  });

  // Optional: Trigger email or notification here
  // In a real app, you'd check which retry attempt this is
}
