'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { GlassCard } from '@/components/ui';
import { getFirebaseAuth } from '@/lib/firebase';

import { LeadsTable } from './components/LeadsTable';

interface Lead {
  id: string;
  email: string;
  city?: string;
  createdAt: string | null;
  source?: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLeads([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage(null);

        const idToken = await user.getIdToken();
        const response = await fetch('/api/admin/leads', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          cache: 'no-store',
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body?.error ?? 'Failed to fetch leads');
        }

        const body = (await response.json()) as { leads?: Lead[] };
        setLeads(Array.isArray(body.leads) ? body.leads : []);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        setErrorMessage(message);
        setLeads([]);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-display text-xl">Quick Actions</h2>
          <a
            href="https://sanity.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded bg-[#F03E2F] px-4 py-2 font-bold text-white transition-colors hover:bg-red-600"
          >
            OPEN SANITY STUDIO
          </a>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="mb-4 font-display text-xl">Stats</h2>
          <div className="font-display text-4xl text-vegas-gold">{leads.length}</div>
          <div className="text-sm uppercase tracking-widest text-white/60">
            {isLoading ? 'Loading leads...' : 'Total Leads'}
          </div>
          {errorMessage ? (
            <p className="mt-4 text-sm text-red-400">Could not load leads: {errorMessage}</p>
          ) : null}
        </GlassCard>
      </div>

      <LeadsTable leads={leads} />
    </div>
  );
}
