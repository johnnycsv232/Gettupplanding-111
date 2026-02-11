import type { DecodedIdToken } from 'firebase-admin/auth';
import { z } from 'zod';

import { getAdminAuth } from '@/lib/firebase-admin';

const bearerHeaderSchema = z
  .string()
  .trim()
  .regex(/^Bearer\s+\S+$/i, 'Missing or invalid Bearer token');

const bearerTokenCaptureRegex = /^Bearer\s+(.+)$/i;

export function extractBearerToken(authorizationHeader: string | null): string | null {
  if (!authorizationHeader) {
    return null;
  }

  const parsedHeader = bearerHeaderSchema.safeParse(authorizationHeader);
  if (!parsedHeader.success) {
    return null;
  }

  const tokenMatch = parsedHeader.data.match(bearerTokenCaptureRegex);
  const token = tokenMatch?.[1]?.trim();
  return token ? token : null;
}

export async function verifyBearerTokenFromRequest(req: Request): Promise<DecodedIdToken | null> {
  const token = extractBearerToken(req.headers.get('Authorization'));
  if (!token) {
    return null;
  }

  try {
    return await getAdminAuth().verifyIdToken(token);
  } catch {
    return null;
  }
}

export function resolveAllowedAdminEmails(
  configuredEmails: string | undefined,
  fallbackEmails: readonly string[] = []
): string[] {
  const configured = configuredEmails
    ?.split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (configured && configured.length > 0) {
    return Array.from(new Set(configured));
  }

  return Array.from(
    new Set(fallbackEmails.map((email) => email.trim().toLowerCase()).filter(Boolean))
  );
}

export function hasAdminPrivileges(
  decodedToken: { admin?: unknown; email?: string | null },
  allowedEmails: readonly string[] = []
): boolean {
  if (decodedToken.admin === true) {
    return true;
  }

  const email = decodedToken.email?.toLowerCase();
  return Boolean(email && allowedEmails.includes(email));
}
