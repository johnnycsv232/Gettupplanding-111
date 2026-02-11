import { NextResponse } from 'next/server';

import {
  extractBearerToken,
  hasAdminPrivileges,
  resolveAllowedAdminEmails,
} from '@/lib/api-auth';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

const fallbackAdminEmails = ['admin@gettupp.com', 'test@test.com'];

interface LeadResponse {
  id: string;
  email: string;
  city?: string;
  source?: string;
  createdAt: string | null;
}

export async function GET(req: Request) {
  try {
    const idToken = extractBearerToken(req.headers.get('Authorization'));
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = await getAdminAuth().verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allowedEmails = resolveAllowedAdminEmails(
      process.env.ADMIN_ALLOWED_EMAILS,
      fallbackAdminEmails
    );

    if (!hasAdminPrivileges(decoded, allowedEmails)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const snapshot = await getAdminDb()
      .collection('leads')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const leads = snapshot.docs.reduce<LeadResponse[]>((acc, doc) => {
        const data = doc.data();
        if (typeof data.email !== 'string' || data.email.trim().length === 0) {
          return acc;
        }

        acc.push({
          id: doc.id,
          email: data.email,
          city: typeof data.city === 'string' ? data.city : undefined,
          source: typeof data.source === 'string' ? data.source : undefined,
          createdAt:
            typeof data.createdAt?.toDate === 'function'
              ? data.createdAt.toDate().toISOString()
              : null,
        });

        return acc;
      }, []);

    return NextResponse.json({ success: true, leads }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching admin leads:', message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
