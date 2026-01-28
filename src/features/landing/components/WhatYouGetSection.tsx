'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { Camera, Zap, Cloud, TrendingUp, Users, Lock } from 'lucide-react';

const features = [
  { icon: Camera, title: "Cinema Grade 4K", desc: "Sony FX3/A7SIII Production for world-class clarity." },
  { icon: Zap, title: "24HR Turnaround", desc: "Recaps delivered while the night is still trending." },
  { icon: Cloud, title: "Cloud Delivery", desc: "Instant high-res access via secure Frame.io portal." },
  { icon: TrendingUp, title: "Growth Strategy", desc: "Content engineered for maximum ROI and reach." },
  { icon: Users, title: "Talent Scouting", desc: "Expert direction to capture the crowd's best energy." },
  { icon: Lock, title: "Asset Protection", desc: "Lifetime redundant archival of all raw production files." },
];

export default function WhatYouGetSection() {
  return (
    <section className="py-32 bg-deep-void-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <h2 className="font-display text-5xl md:text-6xl text-white tracking-tighter uppercase">
            THE GETTUPP <span className="text-vegas-gold text-shadow-glow">ARSENAL</span>
          </h2>
          <p className="text-off-white/40 uppercase tracking-[0.4em] text-xs">Full Stack Nightlife Production</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", damping: 20, stiffness: 200 }}
            >
              <GlassCard className="p-10 flex flex-col items-start text-left gap-6 group hover:border-vegas-gold/50 transition-all duration-500 h-full">
                <div className="w-14 h-14 rounded-none border border-vegas-gold/30 flex items-center justify-center text-vegas-gold group-hover:bg-vegas-gold group-hover:text-black transition-all duration-500 box-glow-gold">
                  <feature.icon size={28} />
                </div>
                <div className="space-y-3">
                  <h3 className="font-display text-2xl text-white tracking-tight">{feature.title}</h3>
                  <p className="text-off-white/60 leading-relaxed font-light">{feature.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
