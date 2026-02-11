'use client';

import { motion } from 'framer-motion';
import { Camera, Zap, Cloud, TrendingUp, Users, Lock } from 'lucide-react';

import { GlassCard, GlintEffect } from '@/components/ui';
import { SectionBackdrop } from '@/features/landing/components/primitives/SectionBackdrop';
import { SectionIntro } from '@/features/landing/components/primitives/SectionIntro';

const features = [
  {
    icon: Camera,
    title: 'Cinema Capture Stack',
    desc: 'Full-frame low-light camera systems that preserve atmosphere, skin tone, and detail.',
  },
  {
    icon: Zap,
    title: 'Velocity Editing',
    desc: 'Hook-first editing workflow optimized for same-night buzz and next-day demand.',
  },
  {
    icon: Cloud,
    title: 'Instant Delivery Portal',
    desc: 'Frame.io cloud handoff with platform-specific exports and posting notes.',
  },
  {
    icon: TrendingUp,
    title: 'Growth-Led Creative',
    desc: 'Every cut includes CTA framing designed for bookings, RSVPs, and bottle service.',
  },
  {
    icon: Users,
    title: 'On-Floor Direction',
    desc: 'Talent cues and crowd choreography so clips feel alive, not random.',
  },
  {
    icon: Lock,
    title: 'Protected Media Archive',
    desc: 'Secure long-term asset retention so your best nights never disappear.',
  },
];

/**
 * WhatYouGetSection
 * Benefit-led feature stack for conversion support.
 */
export const WhatYouGetSection = () => {
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.42 } },
  };

  return (
    <section id="services" className="relative overflow-hidden bg-deep-void py-24 md:py-32">
      <SectionBackdrop variant="gold" />
      <div className="container relative z-10 mx-auto px-4">
        <SectionIntro
          className="mb-14 max-w-3xl md:mb-20"
          kicker="What You Get"
          title="THE GETTUPP"
          highlight="CONVERSION ARSENAL"
          description="A full production + performance system built specifically for venues that win on atmosphere and urgency."
        />

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants}>
              <GlintEffect>
                <GlassCard className="group h-full rounded-2xl p-7" hoverEffect>
                  <div className="border-vegas-gold/25 bg-vegas-gold/10 mb-5 inline-flex size-11 items-center justify-center rounded-xl border text-vegas-gold transition-colors group-hover:bg-vegas-gold group-hover:text-black">
                    <feature.icon size={20} />
                  </div>
                  <h3 className="mb-2 font-display text-lg uppercase tracking-[0.12em] text-white">
                    {feature.title}
                  </h3>
                  <p className="text-body-soft">{feature.desc}</p>
                </GlassCard>
              </GlintEffect>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
