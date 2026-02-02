import { getAdminDb } from '@/lib/firebase-admin';
import { GlassCard } from '@/components/ui';
import { LeadsTable } from './components/LeadsTable';

interface Lead {
  id: string;
  email: string;
  city?: string;
  createdAt: string | null;
  source?: string;
}

async function getLeads(): Promise<Lead[]> {
  try {
    const db = getAdminDb();
    const snapshot = await db.collection('leads').orderBy('createdAt', 'desc').limit(50).get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email,
        city: data.city,
        source: data.source,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toLocaleDateString()
          : 'Just now',
      };
    }) as Lead[];
  } catch (error) {
    console.error('Error fetching leads on server:', error);
    return [];
  }
}

export default async function AdminDashboard() {
  const leads = await getLeads();

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="mb-4 text-xl font-bold">Quick Actions</h2>
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
          <h2 className="mb-4 text-xl font-bold">Stats</h2>
          <div className="font-display text-4xl text-vegas-gold">{leads.length}</div>
          <div className="text-sm uppercase tracking-widest text-white/60">Total Leads</div>
        </GlassCard>
      </div>

      <LeadsTable leads={leads} />
    </div>
  );
}
