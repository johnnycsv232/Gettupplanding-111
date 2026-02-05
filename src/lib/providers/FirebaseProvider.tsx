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

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      // Initialize Firebase Client
      getFirebaseApp();

      const auth = getFirebaseAuth();
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        setUser(user);
        setLoading(false);

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
      // Firebase initialization failed (likely invalid API key)
      console.warn('Firebase initialization failed:', error);
      // Defer state update to avoid synchronous render in effect body
      setTimeout(() => setLoading(false), 0);
    }

    return () => unsubscribe?.();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, loading }}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => useContext(FirebaseContext);
