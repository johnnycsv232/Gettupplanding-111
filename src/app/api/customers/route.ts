/**
 * Customer Management API
 *
 * INVARIANT: Secured by Firebase Admin Auth
 * INVARIANT: Uses service layer for all operations
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';

import { hasAdminPrivileges, verifyBearerTokenFromRequest } from '@/lib/api-auth';
import { getAdminDb } from '@/lib/firebase-admin';
import { createCustomer } from '@/lib/services/customer.service';
import type { Customer } from '@/types/customer';

export const dynamic = 'force-dynamic';

const createCustomerRequestSchema = z
  .object({
    userId: z.string().min(1).optional(),
    email: z.string().email('Valid email required'),
    displayName: z.string().min(1).max(100).optional(),
    phone: z.string().max(20).optional(),
    source: z.string().optional(),
    originalLeadId: z.string().optional(),
  })
  .strict();

// GET: Get current user's customer record only
// SECURITY: Users can only access their own customer data
export async function GET(req: Request) {
  try {
    const decodedToken = await verifyBearerTokenFromRequest(req);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = decodedToken.uid;

    const db = getAdminDb();
    // SECURITY: Only return customer records belonging to the authenticated user
    const snapshot = await db.collection('customers').where('userId', '==', userId).limit(1).get();

    if (snapshot.empty) {
      return NextResponse.json({ success: true, customer: null, data: { customer: null } });
    }

    const customer = snapshot.docs[0].data() as Customer;
    return NextResponse.json({ success: true, customer, data: { customer } });
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Create new customer
export async function POST(req: Request) {
  try {
    const decodedToken = await verifyBearerTokenFromRequest(req);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const requestingUserId = decodedToken.uid;
    const isAdmin = hasAdminPrivileges(decodedToken);

    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    const body = createCustomerRequestSchema.parse(rawBody);

    // Verify user is creating customer for themselves (or is admin)
    if (body.userId && body.userId !== requestingUserId && !isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Can only create customer for self' },
        { status: 403 }
      );
    }

    const result = await createCustomer({
      ...body,
      userId: body.userId ?? requestingUserId,
      source: body.source ?? 'direct',
    });

    return NextResponse.json({ success: true, data: result, ...result });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation Error', details: error.format() },
        { status: 400 }
      );
    }
    console.error('Error creating customer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
