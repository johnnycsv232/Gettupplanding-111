import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirebaseAuth } from './firebase';

// INVARIANT: Firebase Auth Provider Abstraction
// All auth interactions must go through this facade.

let googleProvider: GoogleAuthProvider | undefined;

const getGoogleProvider = (): GoogleAuthProvider => {
  if (!googleProvider) {
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account',
    });
  }
  return googleProvider;
};

export interface AuthState {
  user: User | null;
  loading: boolean;
}

/**
 * Sign in with Google Popup
 */
export const signInWithGoogle = async (): Promise<User> => {
  const auth = getFirebaseAuth();
  const provider = getGoogleProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error: unknown) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

/**
 * Sign out from Firebase
 */
export const signOut = async (): Promise<void> => {
  const auth = getFirebaseAuth();
  try {
    await firebaseSignOut(auth);
  } catch (error: unknown) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Observable for auth state changes
 */
export const subscribeToAuthChanges = (callback: (user: User | null) => void): (() => void) => {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
};

/**
 * Promise-based current user check
 */
export const getCurrentUser = (): Promise<User | null> => {
  const auth = getFirebaseAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};
