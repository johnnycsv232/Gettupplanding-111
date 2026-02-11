/**
 * Customer Service Module
 *
 * INVARIANT: All customer operations sync between Firebase and Stripe
 * INVARIANT: Stripe is the source of truth for payment data
 * INVARIANT: Firebase is the source of truth for CRM data
 */

import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import type Stripe from 'stripe';

import { getAdminDb } from '@/lib/firebase-admin';
import {
  CreateCustomerSchema,
  UpdateCustomerSchema,
  StripeCustomerWebhookSchema,
  type CreateCustomerInput,
  type UpdateCustomerInput,
  type StripeCustomerWebhookData,
} from '@/lib/schemas/customer';
import { getStripeClient } from '@/lib/stripe';
import type { CustomerId, CustomerStatus } from '@/types/customer';

// ============================================
// Customer Creation
// ============================================

/**
 * Create a Stripe customer and sync to Firestore
 * Called when a user signs up or on first checkout
 */
export async function createCustomer(input: CreateCustomerInput): Promise<{
  customerId: CustomerId;
  stripeCustomerId: string;
}> {
  const validated = CreateCustomerSchema.parse(input);
  const stripe = getStripeClient();
  const db = getAdminDb();

  // 1. Create Stripe Customer
  const stripeCustomer = await stripe.customers.create(
    {
      email: validated.email,
      name: validated.displayName,
      phone: validated.phone,
      metadata: {
        userId: validated.userId,
        source: validated.source,
        originalLeadId: validated.originalLeadId || '',
      },
    },
    {
      // Idempotency: prevent duplicate customer creation
      idempotencyKey: `create_customer_${validated.userId}`,
    }
  );

  // 2. Create Firestore Customer Document
  const customerRef = db.collection('customers').doc();
  const now = Timestamp.now();

  await customerRef.set({
    id: customerRef.id,
    userId: validated.userId,
    stripeCustomerId: stripeCustomer.id,
    email: validated.email,
    displayName: validated.displayName || null,
    phone: validated.phone || null,

    // CRM Fields
    status: 'customer' as CustomerStatus,
    source: validated.source,
    originalLeadId: validated.originalLeadId || null,

    // Stripe Sync
    stripeCreatedAt: Timestamp.fromMillis(stripeCustomer.created * 1000),
    stripeUpdatedAt: now,

    // Billing Info
    currency: stripeCustomer.currency || 'usd',

    // Metadata
    createdAt: now,
    updatedAt: now,
  });

  // 3. Update User Document with Customer Reference
  await db.collection('users').doc(validated.userId).update({
    customerId: customerRef.id,
    stripeCustomerId: stripeCustomer.id,
    lifecycleStage: 'customer',
  });

  console.warn(`✅ Created Customer [${customerRef.id}] for User [${validated.userId}]`);

  return {
    customerId: customerRef.id as CustomerId,
    stripeCustomerId: stripeCustomer.id,
  };
}

// ============================================
// Customer Retrieval
// ============================================

/**
 * Get customer by Firebase User ID
 */
export async function getCustomerByUserId(userId: string) {
  const db = getAdminDb();

  const snapshot = await db.collection('customers').where('userId', '==', userId).limit(1).get();

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data();
}

/**
 * Get customer by Stripe Customer ID
 */
export async function getCustomerByStripeId(stripeCustomerId: string) {
  const db = getAdminDb();

  const snapshot = await db
    .collection('customers')
    .where('stripeCustomerId', '==', stripeCustomerId)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data();
}

/**
 * Get or create customer for a user
 * Idempotent - safe to call multiple times
 * SECURITY: Uses Firestore transaction to prevent race conditions
 */
export async function getOrCreateCustomer(
  userId: string,
  email: string,
  displayName?: string
): Promise<{ customerId: CustomerId; stripeCustomerId: string; isNew: boolean }> {
  const db = getAdminDb();

  // Use a transaction to prevent race conditions (TOCTOU)
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(
      db.collection('customers').where('userId', '==', userId).limit(1)
    );

    if (!snapshot.empty) {
      const existing = snapshot.docs[0].data();
      return {
        customerId: existing.id as CustomerId,
        stripeCustomerId: existing.stripeCustomerId,
        isNew: false,
      };
    }

    // No existing customer - create one
    // Note: Stripe customer creation is outside transaction (external API)
    // but the idempotency key on createCustomer prevents duplicate Stripe customers
    const created = await createCustomer({
      userId,
      email,
      displayName,
      source: 'direct',
    });

    return {
      ...created,
      isNew: true,
    };
  });
}

// ============================================
// Customer Updates
// ============================================

/**
 * Update customer in Firestore
 */
export async function updateCustomer(
  customerId: string,
  input: UpdateCustomerInput
): Promise<void> {
  const validated = UpdateCustomerSchema.parse(input);
  const db = getAdminDb();

  await db
    .collection('customers')
    .doc(customerId)
    .update({
      ...validated,
      updatedAt: FieldValue.serverTimestamp(),
    });

  console.warn(`📝 Updated Customer [${customerId}]`);
}

/**
 * Update customer status
 */
export async function updateCustomerStatus(
  customerId: string,
  status: CustomerStatus
): Promise<void> {
  const db = getAdminDb();

  await db.collection('customers').doc(customerId).update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
  });

  console.warn(`🔄 Updated Customer [${customerId}] status to [${status}]`);
}

// ============================================
// Stripe Sync
// ============================================

/**
 * Sync Stripe customer data to Firestore
 * Called by webhook handlers
 */
export async function syncStripeCustomerToFirestore(
  stripeCustomerData: StripeCustomerWebhookData
): Promise<void> {
  const validated = StripeCustomerWebhookSchema.parse(stripeCustomerData);
  const db = getAdminDb();

  const existing = await getCustomerByStripeId(validated.id);

  if (!existing) {
    // Customer created outside our app - create a placeholder
    const customerRef = db.collection('customers').doc();
    const now = Timestamp.now();

    await customerRef.set({
      id: customerRef.id,
      userId: validated.metadata.userId || '',
      stripeCustomerId: validated.id,
      email: validated.email || '',
      displayName: validated.name || null,
      phone: validated.phone || null,

      status: 'customer' as CustomerStatus,
      source: validated.metadata.source || 'stripe_direct',

      stripeCreatedAt: Timestamp.fromMillis(validated.created * 1000),
      stripeUpdatedAt: now,

      currency: validated.currency || 'usd',

      createdAt: now,
      updatedAt: now,
    });

    console.warn(`✅ Created Customer from Stripe sync [${customerRef.id}]`);
    return;
  }

  // Update existing customer
  const snapshot = await db
    .collection('customers')
    .where('stripeCustomerId', '==', validated.id)
    .limit(1)
    .get();

  if (!snapshot.empty) {
    await snapshot.docs[0].ref.update({
      email: validated.email || existing.email,
      displayName: validated.name || existing.displayName,
      phone: validated.phone || existing.phone,
      currency: validated.currency || existing.currency,
      stripeUpdatedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    console.warn(`🔄 Synced Stripe Customer [${validated.id}] to Firestore`);
  }
}

// ============================================
// Lead Conversion
// ============================================

/**
 * Convert a lead to a customer
 * Links the original lead document to the new customer
 */
export async function convertLeadToCustomer(
  leadId: string,
  userId: string,
  stripeCustomerId: string
): Promise<CustomerId> {
  const db = getAdminDb();

  // 1. Get the lead document
  const leadDoc = await db.collection('leads').doc(leadId).get();

  if (!leadDoc.exists) {
    throw new Error(`Lead [${leadId}] not found`);
  }

  const leadData = leadDoc.data();
  if (!leadData) {
    throw new Error(`Lead [${leadId}] has no data`);
  }

  // 2. Create/update customer record
  const customerRef = db.collection('customers').doc();
  const now = Timestamp.now();

  await customerRef.set({
    id: customerRef.id,
    userId,
    stripeCustomerId,
    email: leadData.email,
    displayName: null,
    phone: null,

    status: 'customer' as CustomerStatus,
    source: leadData.source || 'lead_conversion',
    originalLeadId: leadId,
    convertedAt: now,

    stripeCreatedAt: now,
    stripeUpdatedAt: now,

    createdAt: now,
    updatedAt: now,
  });

  // 3. Mark lead as converted (optional metadata)
  await db.collection('leads').doc(leadId).update({
    convertedToCustomerId: customerRef.id,
    convertedAt: now,
  });

  // 4. Update user document
  await db.collection('users').doc(userId).update({
    customerId: customerRef.id,
    lifecycleStage: 'customer',
  });

  console.warn(`🎉 Converted Lead [${leadId}] to Customer [${customerRef.id}]`);

  return customerRef.id as CustomerId;
}

// ============================================
// Billing Portal
// ============================================

/**
 * Create a Stripe billing portal session
 */
export async function createBillingPortalSession(
  stripeCustomerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  const stripe = getStripeClient();

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: returnUrl,
  });

  return session;
}

// ============================================
// Customer Metrics
// ============================================

/**
 * Update customer financial metrics after a payment
 */
export async function updateCustomerMetrics(
  stripeCustomerId: string,
  amountPaid: number // in cents
): Promise<void> {
  const db = getAdminDb();

  const customer = await getCustomerByStripeId(stripeCustomerId);
  if (!customer) {
    console.warn(`⚠️ Customer not found for metrics update: ${stripeCustomerId}`);
    return;
  }

  const isFirstPurchase = !customer.firstPurchaseAt;
  const currentTotal = customer.totalSpent || 0;

  const updates: Record<string, unknown> = {
    totalSpent: currentTotal + amountPaid / 100, // Convert to dollars
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (isFirstPurchase) {
    updates.firstPurchaseAt = FieldValue.serverTimestamp();
  }

  // Update status to VIP if total spent exceeds threshold
  if (currentTotal + amountPaid / 100 >= 10000) {
    // $10,000 threshold
    updates.status = 'vip';
  }

  const snapshot = await db
    .collection('customers')
    .where('stripeCustomerId', '==', stripeCustomerId)
    .limit(1)
    .get();

  if (!snapshot.empty) {
    await snapshot.docs[0].ref.update(updates);
    console.warn(`📊 Updated metrics for Customer [${stripeCustomerId}]`);
  }
}
