/**
 * Customer Detail API
 */

import { NextResponse } from 'next/server';

import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { updateCustomer } from '@/lib/services/customer.service';
import type { Customer } from '@/types/customer';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET: Get customer details
export async function GET(req: Request, props: RouteParams) {
  const params = await props.params;
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const requestingUserId = decodedToken.uid;

    const db = getAdminDb();
    const doc = await db.collection('customers').doc(params.id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const customer = doc.data() as Customer;

    // Access control: User can read own customer, Admin can read all
    // TODO: Add admin check
    if (customer.userId !== requestingUserId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error(`Error fetching customer ${params.id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH: Update customer details
export async function PATCH(req: Request, props: RouteParams) {
  const params = await props.params;
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const requestingUserId = decodedToken.uid;

    const db = getAdminDb();
    const doc = await db.collection('customers').doc(params.id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const customer = doc.data() as Customer;

    // Access control: User can update own customer
    if (customer.userId !== requestingUserId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    await updateCustomer(params.id, body);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ZodError') {
      const zodError = error as import('zod').ZodError;
      return NextResponse.json(
        { error: 'Validation Error', details: zodError.format() },
        { status: 400 }
      );
    }
    console.error(`Error updating customer ${params.id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
