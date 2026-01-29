'use client';

import { useEffect, useState } from 'react';
import { getFirebaseDb } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import GlassCard from '@/components/ui/GlassCard';

interface Lead {
  id: string;
  email: string;
  city?: string;
  createdAt: Timestamp | null;
  source?: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      const db = getFirebaseDb();
      try {
        const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(50));
        const snapshot = await getDocs(q);
        const leadsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Lead[];
        setLeads(leadsData);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <a 
            href="https://sanity.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-[#F03E2F] text-white rounded font-bold hover:bg-red-600 transition-colors"
          >
            OPEN SANITY STUDIO
          </a>
        </GlassCard>
        
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Stats</h2>
          <div className="text-4xl font-display text-vegas-gold">{leads.length}</div>
          <div className="text-sm text-white/60 uppercase tracking-widest">Total Leads</div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="text-xl font-bold mb-6">Recent Leads</h2>
        {loading ? (
          <div className="text-white/40">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="text-white/40">No leads found yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-white/40 text-xs uppercase tracking-widest border-b border-white/10">
                  <th className="p-4">Date</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Source</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-white/60">
                      {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'Just now'}
                    </td>
                    <td className="p-4 text-white font-mono">{lead.email}</td>
                    <td className="p-4 text-white/80">{lead.city || '-'}</td>
                    <td className="p-4 text-white/60">{lead.source || 'Hero'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
