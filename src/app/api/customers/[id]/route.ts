/**
 * Customer Detail API
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';

import { hasAdminPrivileges, verifyBearerTokenFromRequest } from '@/lib/api-auth';
import { getAdminDb } from '@/lib/firebase-admin';
import { UpdateCustomerSchema } from '@/lib/schemas/customer';
import { updateCustomer } from '@/lib/services/customer.service';
import type { Customer } from '@/types/customer';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

const routeParamsSchema = z.object({
  id: z.string().min(1, 'Customer id is required'),
});

// GET: Get customer details
export async function GET(req: Request, props: RouteParams) {
  try {
    const params = routeParamsSchema.parse(await props.params);
    const decodedToken = await verifyBearerTokenFromRequest(req);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const requestingUserId = decodedToken.uid;
    const isAdmin = hasAdminPrivileges(decodedToken);

    const db = getAdminDb();
    const doc = await db.collection('customers').doc(params.id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const customer = doc.data() as Customer;

    // Access control: User can read own customer, Admin can read all
    if (customer.userId !== requestingUserId && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH: Update customer details
export async function PATCH(req: Request, props: RouteParams) {
  try {
    const params = routeParamsSchema.parse(await props.params);
    const decodedToken = await verifyBearerTokenFromRequest(req);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const requestingUserId = decodedToken.uid;
    const isAdmin = hasAdminPrivileges(decodedToken);

    const db = getAdminDb();
    const doc = await db.collection('customers').doc(params.id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const customer = doc.data() as Customer;

    // Access control: User can update own customer
    if (customer.userId !== requestingUserId && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const body = UpdateCustomerSchema.parse(rawBody);
    await updateCustomer(params.id, body);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation Error', details: error.format() },
        { status: 400 }
      );
    }
    console.error('Error updating customer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
