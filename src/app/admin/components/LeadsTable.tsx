'use client';

import { Users } from 'lucide-react';

import { GlassCard, EmptyState } from '@/components/ui';

interface Lead {
  id: string;
  email: string;
  city?: string;
  createdAt: string | null; // Sanitized string from server
  source?: string;
}

interface LeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <GlassCard className="p-6">
      <h2 className="mb-6 font-display text-xl">Recent Leads</h2>
      {leads.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No leads yet"
          description="Your captured leads will appear here."
          className="border-none bg-transparent"
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/40">
                <th className="p-4">Date</th>
                <th className="p-4">Email</th>
                <th className="p-4">City</th>
                <th className="p-4">Source</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-white/5 transition-colors hover:bg-white/5"
                >
                  <td className="p-4 text-white/60">{lead.createdAt || 'Just now'}</td>
                  <td className="p-4 font-mono text-white">{lead.email}</td>
                  <td className="p-4 text-white/80">{lead.city || '-'}</td>
                  <td className="p-4 text-white/60">{lead.source || 'Hero'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </GlassCard>
  );
}
