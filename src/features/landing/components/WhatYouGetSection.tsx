'use client';

import GlassCard from '@/components/ui/GlassCard';
import { Camera, Zap, Cloud, TrendingUp, Users, Lock } from 'lucide-react';

const features = [
  { icon: Camera, title: "Cinema Grade 4K", desc: "Sony FX3/A7SIII Production" },
  { icon: Zap, title: "24HR Turnaround", desc: "Content while the hype is fresh" },
  { icon: Cloud, title: "Cloud Delivery", desc: "Instant access via Frame.io" },
  { icon: TrendingUp, title: "Growth Strategy", desc: "Data-driven content planning" },
  { icon: Users, title: "Talent Scouting", desc: "We find the best angles/models" },
  { icon: Lock, title: "Asset Protection", desc: "Secure archival of all footage" },
];

export default function WhatYouGetSection() {
  return (
    <section className="py-24 bg-deep-void-black">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl text-center text-white mb-12">WHAT YOU GET</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <GlassCard key={i} className="p-6 flex flex-col items-center text-center gap-4 hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-full bg-vegas-gold/10 flex items-center justify-center text-vegas-gold">
                <feature.icon size={24} />
              </div>
              <h3 className="font-display text-xl text-white">{feature.title}</h3>
              <p className="text-sm text-off-white/60">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
