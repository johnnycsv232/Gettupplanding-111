/**
 * Firebase Client SDK Configuration
 *
 * INVARIANT: Environment Guard (docs/invariants.md)
 * Application will not initialize if required env vars are missing.
 */

import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

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

export function getFirebaseApp(): FirebaseApp {
  if (!firebaseConfig.apiKey) {
    console.warn('[RC_FIREBASE_WARN] No API key found. Firebase will not initialize.');
    return {} as FirebaseApp;
  }

  if (!firebaseApp) {
    try {
      firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

      // Initialize App Check
      if (typeof window !== 'undefined' && env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        initializeAppCheck(firebaseApp, {
          provider: new ReCaptchaEnterpriseProvider(env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
          isTokenAutoRefreshEnabled: true,
        });
      }
    } catch (err) {
      console.error('[RC_FIREBASE_ERR] Failed to initialize Firebase:', err);
      return {} as FirebaseApp;
    }
  }
  return firebaseApp;
}

export function getFirebaseAuth(): Auth {
  const app = getFirebaseApp();
  if (!auth && app.options) {
    try {
      auth = getAuth(app);
    } catch (err) {
      console.error('[RC_FIREBASE_ERR] Failed to initialize Auth:', err);
    }
  }
  return auth as Auth;
}

export function getFirebaseDb(): Firestore {
  const app = getFirebaseApp();
  if (!db && app.options) {
    try {
      db = getFirestore(app);
    } catch (err) {
      console.error('[RC_FIREBASE_ERR] Failed to initialize Firestore:', err);
    }
  }
  return db as Firestore;
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
