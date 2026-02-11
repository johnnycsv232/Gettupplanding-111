'use client';

import { motion } from 'framer-motion';
import { Globe, Radio } from 'lucide-react';

import { VelocityTypography } from '@/components/ui';
import { SectionBackdrop } from '@/features/landing/components/primitives/SectionBackdrop';
import { SectionIntro } from '@/features/landing/components/primitives/SectionIntro';

const eventTags = [
  'Miami',
  'Ibiza',
  'Tulum',
  'Las Vegas',
  'Dubai',
  'Mykonos',
  'London',
  'Berlin',
  'New York',
];

/**
 * EventsSection
 * Features a high-velocity marquee of global nightlife destinations.
 */
export const EventsSection = () => {
  const reverseTags = [...eventTags].reverse();

  return (
    <section className="section-shell border-y border-white/5 bg-void">
      <SectionBackdrop variant="neutral" />
      <div className="container relative z-10 mx-auto mb-12 px-4 text-center md:mb-16">
        <SectionIntro
          align="center"
          className="mx-auto max-w-3xl"
          kicker="Global Deployment"
          kickerIcon={<Globe size={13} />}
          title="WORLDWIDE"
          highlight="VELOCITY"
          highlightClassName="text-neon-magenta text-glow-magenta"
          description="From destination weekends to headline residencies, the deployment model scales without quality drop-off."
          tone="neutral"
        />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/[0.66]"
        >
          <Radio size={12} className="text-vegas-gold" />
          Active City Rotation
        </motion.div>
      </div>

      <div className="relative z-10 space-y-10">
        <VelocityTypography velocity={2}>
          {eventTags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="hover:text-vegas-gold/[0.35] mx-10 cursor-default font-display text-5xl uppercase text-white/[0.12] transition-colors md:text-8xl"
            >
              {tag}
            </span>
          ))}
        </VelocityTypography>

        <VelocityTypography velocity={-2}>
          {reverseTags.map((tag, index) => (
            <span
              key={`${tag}-reverse-${index}`}
              className="hover:text-neon-magenta/[0.35] mx-10 cursor-default font-display text-5xl uppercase text-white/[0.12] transition-colors md:text-8xl"
            >
              {tag}
            </span>
          ))}
        </VelocityTypography>
      </div>
    </section>
  );
};
