'use client';

import { motion } from 'framer-motion';
import { Camera, Zap, Cloud, TrendingUp, Users, Lock } from 'lucide-react';
import { GlassCard, GlintEffect } from '@/components/ui';

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

/**
 * WhatYouGetSection
 * Details the core features and value propositions of the GettUpp service.
 */
export const WhatYouGetSection = () => {
  return (
    <section id="services" className="relative overflow-hidden bg-deep-void py-32">
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
          <p className="text-off-white/40 text-xs uppercase tracking-[0.4em]">
            Full Stack Nightlife Production
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <GlintEffect key={i}>
              <GlassCard className="group h-full p-8" hoverEffect>
                <div className="bg-vegas-gold/10 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg text-vegas-gold transition-colors group-hover:bg-vegas-gold group-hover:text-black">
                  <feature.icon size={24} />
                </div>
                <h3 className="font-display mb-2 text-xl uppercase tracking-widest text-white">
                  {feature.title}
                </h3>
                <p className="text-off-white/60 text-sm">{feature.desc}</p>
              </GlassCard>
            </GlintEffect>
          ))}
        </div>
      </div>
    </section>
  );
};
