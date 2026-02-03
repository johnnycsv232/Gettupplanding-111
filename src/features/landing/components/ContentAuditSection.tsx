'use client';

import { motion } from 'framer-motion';
import { TrendingDown, Users, Target, ShieldAlert } from 'lucide-react';

import { GlassCard } from '@/components/ui';

const failurePoints = [
  {
    icon: TrendingDown,
    title: 'Low Frame Rate',
    desc: 'Choppy 24fps mobile Recaps devalue your venues perceived status.',
    impact: 'Poor Retention',
  },
  {
    icon: ShieldAlert,
    title: 'Dark Lighting',
    desc: 'iPhone-only production loses the atmosphere in shadows.',
    impact: 'Lost Aesthetic',
  },
  {
    icon: Users,
    title: 'Generic Angles',
    desc: 'Lacking the cinematic direction needed for viral clout.',
    impact: 'Zero Engagement',
  },
  {
    icon: Target,
    title: 'Delayed Delivery',
    desc: 'Content delivered 3 days later is already dead on arrival.',
    impact: 'Irrelevance',
  },
];

/**
 * ContentAuditSection
 * Highlights common flaws in competitor content to set the stage for GettOpp's solution.
 */
export const ContentAuditSection = () => {
  return (
    <section className="bg-void border-b border-white/5 py-32">
      <div className="container mx-auto px-4">
        <div className="mb-24 max-w-3xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-4 block text-xs font-black uppercase tracking-[0.4em] text-red-500"
          >
            The Critical Failure
          </motion.span>
          <h2 className="font-display text-5xl uppercase leading-none tracking-tighter text-white md:text-7xl">
            WHY YOUR CONTENT IS <br />
            <span className="text-off-white/20">KILLING THE VIBE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {failurePoints.map((point, i) => (
            <GlassCard key={i} className="group border-red-500/10 p-8 hover:border-red-500/30">
              <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition-all duration-500 group-hover:bg-red-500 group-hover:text-white">
                <point.icon size={24} />
              </div>
              <h3 className="font-display mb-2 text-lg uppercase tracking-widest text-white">
                {point.title}
              </h3>
              <p className="text-off-white/40 mb-6 text-sm leading-relaxed">{point.desc}</p>
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-500">
                  Impact: {point.impact}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
