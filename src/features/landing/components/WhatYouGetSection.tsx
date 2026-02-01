'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import GlintEffect from '@/components/ui/GlintEffect';
import { Camera, Zap, Cloud, TrendingUp, Users, Lock } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Cinema Grade 4K',
    desc: 'Sony FX3/A7SIII Production for world-class clarity.',
  },
  {
    icon: Zap,
    title: '24HR Turnaround',
    desc: 'Recaps delivered while the night is still trending.',
  },
  {
    icon: Cloud,
    title: 'Cloud Delivery',
    desc: 'Instant high-res access via secure Frame.io portal.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Strategy',
    desc: 'Content engineered for maximum ROI and reach.',
  },
  {
    icon: Users,
    title: 'Talent Scouting',
    desc: "Expert direction to capture the crowd's best energy.",
  },
  {
    icon: Lock,
    title: 'Asset Protection',
    desc: 'Lifetime redundant archival of all raw production files.',
  },
];

export default function WhatYouGetSection() {
  return (
    <section id="services" className="bg-deep-void relative overflow-hidden py-32">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mb-20 space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <h2 className="font-display text-5xl uppercase tracking-tighter text-white md:text-6xl">
            THE GETTUPP <span className="text-shadow-glow text-vegas-gold">ARSENAL</span>
          </h2>
          <p className="text-xs uppercase tracking-[0.4em] text-off-white/40">
            Full Stack Nightlife Production
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', damping: 20, stiffness: 200 }}
              className="h-full"
            >
              <GlintEffect
                className="h-full border-none bg-transparent"
                glintColor="rgba(212, 175, 55, 0.15)"
              >
                <GlassCard className="group flex h-full flex-col items-start gap-6 p-10 text-left transition-all duration-500 hover:border-vegas-gold/50">
                  <div className="box-glow-gold flex h-14 w-14 items-center justify-center rounded-none border border-vegas-gold/30 text-vegas-gold transition-all duration-500 group-hover:bg-vegas-gold group-hover:text-black">
                    <feature.icon size={28} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl tracking-tight text-white">
                      {feature.title}
                    </h3>
                    <p className="font-light leading-relaxed text-off-white/60">{feature.desc}</p>
                  </div>
                </GlassCard>
              </GlintEffect>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
