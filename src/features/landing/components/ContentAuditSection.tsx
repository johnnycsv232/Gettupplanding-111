'use client';

import { motion } from 'framer-motion';
import { TrendingDown, Users, Target, ShieldAlert } from 'lucide-react';

import { GlassCard } from '@/components/ui';
import { SectionBackdrop } from '@/features/landing/components/primitives/SectionBackdrop';
import { SectionIntro } from '@/features/landing/components/primitives/SectionIntro';

const failurePoints = [
  {
    icon: TrendingDown,
    title: 'Content Dies Before Peak Hour',
    desc: 'Most teams post too late. The moment fades before the recap lands.',
    impact: 'Lower same-week bookings',
  },
  {
    icon: ShieldAlert,
    title: 'Lighting Is Crushed',
    desc: 'Phone-only workflows miss texture, depth, and table energy in dark scenes.',
    impact: 'Premium brand feel is lost',
  },
  {
    icon: Users,
    title: 'No Narrative Direction',
    desc: 'Random clips without a story underperform on watch time and saves.',
    impact: 'Audience drop-off',
  },
  {
    icon: Target,
    title: 'No Conversion Layer',
    desc: 'Great visuals without clear hooks and CTAs fail to move real revenue.',
    impact: 'High reach, low bookings',
  },
];

/**
 * ContentAuditSection
 * Frames common nightlife content failures before introducing solutions.
 */
export const ContentAuditSection = () => {
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <section className="section-shell border-b border-white/5 bg-void">
      <SectionBackdrop variant="danger" />
      <div className="container relative z-10 mx-auto px-4">
        <SectionIntro
          tone="danger"
          className="mb-16 max-w-3xl md:mb-20"
          kicker="Where Most Venues Leak Revenue"
          title="YOUR CONTENT LOOKS ACTIVE,"
          highlight="BUT IT ISN'T CONVERTING."
          highlightClassName="text-white/[0.28] text-shadow-none"
        />

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {failurePoints.map((point) => (
            <motion.div key={point.title} variants={cardVariants}>
              <GlassCard className="group h-full border-red-400/15 p-7 hover:border-red-400/35">
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-red-300/20 bg-red-500/10 text-red-300 transition-all duration-500 group-hover:bg-red-500 group-hover:text-white">
                  <point.icon size={20} />
                </div>
                <h3 className="mb-3 font-display text-base leading-tight tracking-[0.12em] text-white">
                  {point.title}
                </h3>
                <p className="text-body-soft mb-6">{point.desc}</p>
                <div className="border-t border-white/[0.08] pt-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-red-300/95">
                    Impact: {point.impact}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
