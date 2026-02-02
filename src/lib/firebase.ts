/**
 * Firebase Client SDK Configuration
 *
 * INVARIANT: Environment Guard (docs/invariants.md)
 * Application will not initialize if required env vars are missing.
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

// Environment validation - fail fast if config is missing
import { env } from '@/lib/env';

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton pattern for Firebase app
let firebaseApp: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let analytics: Analytics | undefined;
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export function getFirebaseApp(): FirebaseApp {
  if (!firebaseApp) {
    firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    // Initialize App Check
    if (typeof window !== 'undefined') {
      initializeAppCheck(firebaseApp, {
        provider: new ReCaptchaEnterpriseProvider(env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''),
        isTokenAutoRefreshEnabled: true,
      });
    }
  }
  return firebaseApp;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export function getFirebaseDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

export async function getFirebaseAnalytics(): Promise<Analytics | undefined> {
  if (typeof window !== 'undefined' && !analytics) {
    const supported = await isSupported();
    if (supported) {
      analytics = getAnalytics(getFirebaseApp());
    }
  }
  return analytics;
}

// Re-export for convenience
export { firebaseConfig };
