/**
 * Firebase Admin SDK Configuration (Server-side only)
 * 
 * INVARIANT: Used for webhook handlers and server-side operations
 * This bypasses Firestore security rules - use with caution.
 */

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

// Environment validation for server-side
const requiredEnvVars = [
    'FIREBASE_ADMIN_PROJECT_ID',
    'FIREBASE_ADMIN_CLIENT_EMAIL',
    'FIREBASE_ADMIN_PRIVATE_KEY',
] as const;

function validateAdminEnv(): void {
    const missing = requiredEnvVars.filter(
        (key) => !process.env[key]
    );

    if (missing.length > 0) {
        throw new Error(
            `INVARIANT VIOLATION: Missing Firebase Admin config: ${missing.join(', ')}`
        );
    }
}

// Singleton pattern
let adminApp: App | undefined;
let adminDb: Firestore | undefined;
let adminAuth: Auth | undefined;

export function getAdminApp(): App {
    if (!adminApp) {
        validateAdminEnv();

        if (getApps().length === 0) {
            adminApp = initializeApp({
                credential: cert({
                    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                    // Handle escaped newlines in private key
                    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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
