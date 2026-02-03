'use client';

import { motion } from 'framer-motion';

import { VelocityTypography } from '@/components/ui';

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
  return (
    <section className="bg-void overflow-hidden border-y border-white/5 py-32">
      <div className="container mx-auto mb-20 px-4 text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Global Deployment
          </span>
          <h2 className="font-display text-5xl uppercase tracking-tighter text-white md:text-8xl">
            WORLDWIDE <span className="text-glow-magenta text-neon-magenta">VELOCITY</span>
          </h2>
        </motion.div>
      </div>

      <div className="space-y-12">
        <VelocityTypography velocity={2}>
          {eventTags.map((tag, i) => (
            <span
              key={i}
              className="font-display hover:text-vegas-gold/20 mx-12 cursor-default text-6xl uppercase text-white/5 transition-colors md:text-9xl"
            >
              {tag}
            </span>
          ))}
        </VelocityTypography>

        <VelocityTypography velocity={-2}>
          {eventTags.reverse().map((tag, i) => (
            <span
              key={i}
              className="font-display hover:text-neon-magenta/20 mx-12 cursor-default text-6xl uppercase text-white/5 transition-colors md:text-9xl"
            >
              {tag}
            </span>
          ))}
        </VelocityTypography>
      </div>
    </section>
  );
};
