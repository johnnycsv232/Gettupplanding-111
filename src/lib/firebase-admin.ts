/**
 * Firebase Admin SDK Configuration (Server-side only)
 *
 * INVARIANT: Used for webhook handlers and server-side operations
 * This bypasses Firestore security rules - use with caution.
 */

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

import { env } from './env';

// Singleton pattern
let adminApp: App | undefined;
let adminDb: Firestore | undefined;
let adminAuth: Auth | undefined;

type AdminEnvShape = {
  FIREBASE_ADMIN_PROJECT_ID?: string;
  FIREBASE_ADMIN_CLIENT_EMAIL?: string;
  FIREBASE_ADMIN_PRIVATE_KEY?: string;
};

export function assertFirebaseAdminEnvConfigured(candidate: AdminEnvShape = env): void {
  const missing: string[] = [];

  if (!candidate.FIREBASE_ADMIN_PROJECT_ID?.trim()) {
    missing.push('FIREBASE_ADMIN_PROJECT_ID');
  }

  if (!candidate.FIREBASE_ADMIN_CLIENT_EMAIL?.trim()) {
    missing.push('FIREBASE_ADMIN_CLIENT_EMAIL');
  }

  if (!candidate.FIREBASE_ADMIN_PRIVATE_KEY?.trim()) {
    missing.push('FIREBASE_ADMIN_PRIVATE_KEY');
  }

  if (missing.length > 0) {
    throw new Error(
      `[RC_FIREBASE_ADMIN_ENV] Missing required Firebase Admin credentials: ${missing.join(', ')}`
    );
  }
}

export function getAdminApp(): App {
  if (!adminApp) {
    if (getApps().length === 0) {
      assertFirebaseAdminEnvConfigured();
      adminApp = initializeApp({
        credential: cert({
          projectId: env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
          // Handle escaped newlines in private key
          privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    } else {
      adminApp = getApps()[0];
    }
  }
  return adminApp;
}

export function getAdminDb(): Firestore {
  if (!adminDb) {
    adminDb = getFirestore(getAdminApp());
  }
  return adminDb;
}

export function getAdminAuth(): Auth {
  if (!adminAuth) {
    adminAuth = getAuth(getAdminApp());
  }
  return adminAuth;
}
