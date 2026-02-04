/**
 * Customer Management API
 *
 * INVARIANT: Secured by Firebase Admin Auth
 * INVARIANT: Uses service layer for all operations
 */

import { NextResponse } from 'next/server';

import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { createCustomer } from '@/lib/services/customer.service';
import type { Customer } from '@/types/customer';

export const dynamic = 'force-dynamic';

// GET: Get current user's customer record only
// SECURITY: Users can only access their own customer data
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getAdminDb();
    // SECURITY: Only return customer records belonging to the authenticated user
    const snapshot = await db.collection('customers').where('userId', '==', userId).limit(1).get();

    if (snapshot.empty) {
      return NextResponse.json({ customer: null });
    }

    const customer = snapshot.docs[0].data() as Customer;
    return NextResponse.json({ customer });
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Create new customer
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    const body = await req.json();

    // Verify user is creating customer for themselves (or is admin)
    if (body.userId && body.userId !== userId) {
      // Check admin claim if creating for another user
      // if (!decodedToken.admin) return 403
      // For now, strict ownership:
      return NextResponse.json(
        { error: 'Forbidden: Can only create customer for self' },
        { status: 403 }
      );
    }

    // Default to current user if not specified
    if (!body.userId) {
      body.userId = userId;
    }

    const result = await createCustomer(body);

    return NextResponse.json(result);
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ZodError') {
      const zodError = error as import('zod').ZodError;
      return NextResponse.json(
        { error: 'Validation Error', details: zodError.format() },
        { status: 400 }
      );
    }
    console.error('Error creating customer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
