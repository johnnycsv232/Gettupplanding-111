import { z } from 'zod';

export const TimestampSchema = z.union([z.string().datetime(), z.any()]); // Handle both JS Date/ISO and Firebase Timestamp (refine to specific Firebase type later)


export const UserIdSchema = z.string().min(1);
export const StripeCustomerIdSchema = z.string().startsWith('cus_');
export const StripeSubscriptionIdSchema = z.string().startsWith('sub_');
