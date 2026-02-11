/**
 * Customer Types for CRM Integration
 *
 * INVARIANT: Customer is the bridge between Firebase Auth and Stripe
 */

import type { Timestamp } from 'firebase/firestore';

import type { Brand } from './brands';

export type CustomerId = Brand<string, 'CustomerId'>;

/**
 * Customer lifecycle status in CRM
 */
export type CustomerStatus = 'lead' | 'prospect' | 'customer' | 'churned' | 'vip';

/**
 * User lifecycle stage (broader than customer status)
 */
export type LifecycleStage = 'anonymous' | 'lead' | 'user' | 'customer' | 'vip';

/**
 * Lead source tracking
 */
export type LeadSource =
  | 'hero_zenith'
  | 'exit_intent'
  | 'pricing_page'
  | 'referral'
  | 'organic'
  | 'paid_ad'
  | 'social'
  | 'direct'
  | 'other';

/**
 * Core Customer interface for Firestore
 */
export interface Customer {
  id: CustomerId;
  userId: string; // Firebase Auth UID
  stripeCustomerId: string; // Stripe customer ID (cus_xxx)
  email: string;
  displayName?: string;
  phone?: string;

  // CRM Fields
  status: CustomerStatus;
  source: LeadSource | string;
  convertedAt?: Timestamp;
  originalLeadId?: string; // Reference to original lead document

  // Stripe Sync
  stripeCreatedAt: Timestamp;
  stripeUpdatedAt: Timestamp;

  // Billing Info (from Stripe)
  defaultPaymentMethod?: string;
  currency?: string;

  // Financial Metrics
  totalSpent?: number;
  lifetimeValue?: number;
  firstPurchaseAt?: Timestamp;

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  tags?: string[];
  notes?: string;
}

/**
 * Customer creation input (without auto-generated fields)
 */
export interface CreateCustomerInput {
  userId: string;
  email: string;
  displayName?: string;
  phone?: string;
  source?: LeadSource | string;
  originalLeadId?: string;
}

/**
 * Customer update input
 */
export interface UpdateCustomerInput {
  displayName?: string;
  phone?: string;
  status?: CustomerStatus;
  tags?: string[];
  notes?: string;
}

/**
 * Stripe customer data for sync
 */
export interface StripeCustomerData {
  id: string;
  email: string | null;
  name: string | null;
  phone: string | null;
  created: number; // Unix timestamp
  currency: string | null;
  default_source: string | null;
  metadata: Record<string, string>;
}
