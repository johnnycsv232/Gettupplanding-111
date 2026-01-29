'use client';

import { useEffect, useState } from 'react';
import { getFirebaseAuth } from '@/lib/firebase';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

const ALLOWED_EMAILS = ['admin@gettupp.com', 'test@test.com']; // Replace with real admin emails

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // eslint-disable-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  if (!user || !ALLOWED_EMAILS.includes(user.email || '')) {
    return (
      <div className="min-h-screen bg-deep-void-black flex flex-col items-center justify-center gap-6 p-4">
        <h1 className="font-display text-4xl text-white">RESTRICTED ACCESS</h1>
        <p className="text-off-white/60 text-center max-w-md">
          This area is for authorized personnel only. If you are Johnny Cage, please login.
        </p>
        <Button onClick={handleLogin} variant="neon">
          LOGIN WITH GOOGLE
        </Button>
        {user && (
          <p className="text-red-500 text-sm">
            Access Denied for {user.email}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-void-black text-white">
      <nav className="border-b border-white/10 p-4 flex justify-between items-center bg-black/50 backdrop-blur-md">
        <span className="font-display text-xl text-vegas-gold">GETTUPP ADMIN</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/60">{user.email}</span>
          <Button size="sm" variant="ghost" onClick={() => getFirebaseAuth().signOut()}>Sign Out</Button>
        </div>
      </nav>
      <main className="p-8">
        {children}
      </main>
    </div>
  );
}
