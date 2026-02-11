'use client';

import { motion } from 'framer-motion';

import { GlassCard } from '@/components/ui';
import { SectionBackdrop } from '@/features/landing/components/primitives/SectionBackdrop';
import { SectionIntro } from '@/features/landing/components/primitives/SectionIntro';

const rules = [
  {
    id: '01',
    title: 'Absolute Discretion',
    desc: 'We operate like ghosts. Your VIPs remain anonymous unless otherwise requested.',
  },
  {
    id: '02',
    title: 'Zero Friction',
    desc: 'Our crews are optimized for minimal impact on venue flow and guest experience.',
  },
  {
    id: '03',
    title: 'Master Ownership',
    desc: 'You own 100% of the raw assets. We archive them for life at no extra cost.',
  },
  {
    id: '04',
    title: 'Elite Talent',
    desc: 'Only vetted production veterans handle our gear. No amateurs, no excuses.',
  },
];

/**
 * RulesSection
 * Outlines the operational standards and "GettUpp Rules" for partnership.
 */
export const RulesSection = () => {
  return (
    <section className="section-shell border-b border-white/5 bg-void">
      <SectionBackdrop variant="neutral" />
      <div className="container relative z-10 mx-auto px-4">
        <SectionIntro
          className="mb-14 max-w-3xl md:mb-16"
          kicker="Operational Excellence"
          title="THE RULES OF"
          highlight="ENGAGEMENT"
          description="Premium venues require zero-drama execution. These are the standards every GettUpp deployment is measured against."
          tone="neutral"
          highlightClassName="text-white/[0.36] text-shadow-none"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07, duration: 0.42 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <GlassCard className="group h-full rounded-2xl border border-white/[0.1] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-display text-3xl leading-none tracking-[0.12em] text-white/[0.2]">
                    {rule.id}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/[0.52]">
                    Rule
                  </span>
                </div>
                <h3 className="mb-3 font-display text-base leading-tight tracking-[0.14em] text-white">
                  {rule.title}
                </h3>
                <p className="text-body-soft">{rule.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
