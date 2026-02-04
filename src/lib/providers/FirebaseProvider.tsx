'use client';

import { User, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { getFirebaseApp, getFirebaseAuth } from '@/lib/firebase';

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
});

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: () => void = () => {};

    try {
      // Initialize Firebase Client
      getFirebaseApp();

      const auth = getFirebaseAuth();
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        setUser(user);
        setLoading(false);
        setFirebaseError(null);

        if (user) {
          try {
            const token = await user.getIdToken();
            // Idempotent call to ensure Stripe customer exists
            await fetch('/api/customers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                userId: user.uid,
                email: user.email,
                displayName: user.displayName,
              }),
            });
          } catch (error) {
            console.error('Failed to sync customer:', error);
          }
        }
      });
    } catch (error) {
      console.error('Firebase initialization error:', error);
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => {
        setFirebaseError('Firebase initialization failed');
        setLoading(false);
      }, 0);
    }

    return () => unsubscribe();
  }, []);

  if (firebaseError) {
    return (
      <div className="bg-void flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">Service Unavailable</h1>
          <p className="text-white/70">Please try again later.</p>
        </div>
      </div>
    );
  }

  return <FirebaseContext.Provider value={{ user, loading }}>{children}</FirebaseContext.Provider>;
}

export const useFirebase = () => useContext(FirebaseContext);
