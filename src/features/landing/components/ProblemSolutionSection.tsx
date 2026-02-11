'use client';

import { motion } from 'framer-motion';
import { Camera, Zap, Globe, Cpu } from 'lucide-react';

import { GlassCard } from '@/components/ui';
import { SectionBackdrop } from '@/features/landing/components/primitives/SectionBackdrop';
import { SectionIntro } from '@/features/landing/components/primitives/SectionIntro';

const advantages = [
  {
    icon: Camera,
    title: 'Cinema Grade Optics',
    description:
      "We don't use phones. We deploy full-frame cinema sensors to preserve texture, depth, and table energy in dark environments.",
  },
  {
    icon: Zap,
    title: 'Velocity Workflow',
    description:
      'Editors are on-site or remote-synced in real-time, so your venue ships recap assets while the night is still top-of-mind.',
  },
  {
    icon: Globe,
    title: 'Global Standards',
    description:
      'From Miami to Dubai, the production bar stays consistent. One operating system, one quality standard, every market.',
  },
];

/**
 * ProblemSolutionSection
 * Compares the "industry standard" with the Zenith level production.
 */
export const ProblemSolutionSection = () => {
  return (
    <section className="section-shell border-b border-white/5 bg-deep-void">
      <SectionBackdrop variant="gold" />
      <div className="container relative z-10 mx-auto px-4">
        <SectionIntro
          className="mb-16 max-w-3xl md:mb-20"
          kicker="Next-Gen Production Infrastructure"
          title="THE ZENITH"
          highlight="ADVANTAGE"
          description="Your venue competes against hyper-polished content every day. The edge is not more volume, it is faster narrative quality that looks expensive and converts."
        />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] xl:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.45 }}
            className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
          >
            {advantages.map((item, index) => (
              <GlassCard
                key={item.title}
                className="group rounded-2xl border border-white/[0.09] p-6 md:p-7"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="border-vegas-gold/25 bg-vegas-gold/10 flex size-12 shrink-0 items-center justify-center rounded-xl border text-vegas-gold transition-colors duration-500 group-hover:bg-vegas-gold group-hover:text-black">
                    <item.icon size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/[0.38]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mb-3 font-display text-sm leading-tight tracking-[0.14em] text-white md:text-base">
                  {item.title}
                </h3>
                <p className="text-body-soft">{item.description}</p>
              </GlassCard>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.48, delay: 0.05 }}
            className="relative"
          >
            <GlassCard className="group relative overflow-hidden rounded-3xl border border-white/[0.09] p-8 md:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(212,175,55,0.18),transparent_45%),radial-gradient(circle_at_88%_78%,rgba(255,0,127,0.14),transparent_42%)]"
              />
              <div className="relative">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/[0.72]">
                  <Cpu size={14} className="text-vegas-gold" />
                  Live Processing Stack
                </div>
                <h3 className="font-display text-3xl leading-[0.88] tracking-[0.08em] text-white md:text-4xl">
                  CINEMA DATA
                  <span className="text-shadow-glow block text-vegas-gold">IN 24 HOURS</span>
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/[0.66]">
                  Multi-camera ingest, color intelligence, and narrative sequencing tuned for
                  nightclub lighting conditions.
                </p>
              </div>

              <div className="relative mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/[0.42]">
                    Delivery
                  </p>
                  <p className="mt-2 font-display text-3xl leading-none tracking-widest text-white">
                    24HR
                  </p>
                </div>
                <div className="border-vegas-gold/20 bg-vegas-gold/[0.08] rounded-2xl border p-4">
                  <p className="text-vegas-gold/85 text-[10px] font-black uppercase tracking-[0.2em]">
                    Reach
                  </p>
                  <p className="mt-2 font-display text-3xl leading-none tracking-widest text-vegas-gold">
                    10X
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
