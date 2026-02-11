'use client';

import { motion } from 'framer-motion';
import { Zap, Rocket, Crown, Check, ArrowRight, Sparkles } from 'lucide-react';

import { Button, GlassCard, GlintEffect } from '@/components/ui';
import { SectionBackdrop } from '@/features/landing/components/primitives/SectionBackdrop';
import { SectionIntro } from '@/features/landing/components/primitives/SectionIntro';

const tiers = [
  {
    name: 'Essential',
    icon: Zap,
    price: '$495',
    cadence: '/month',
    subhead: 'For venues that want a predictable monthly content engine.',
    features: [
      '1 event recap / month',
      '24HR delivery window',
      'Instagram + TikTok exports',
      'Monthly creative briefing',
    ],
    cta: 'Start Essential',
    highlight: false,
  },
  {
    name: 'Elite',
    icon: Rocket,
    price: '$1,295',
    cadence: '/month',
    subhead: 'Our highest-converting package for growth-focused operators.',
    features: [
      '2 event recaps / month',
      'Priority 18HR turnaround',
      'UGC scripting + shot direction',
      'Paid-ad creative cutdowns',
      'Weekly performance review',
    ],
    cta: 'Apply For Elite',
    highlight: true,
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: 'Custom',
    cadence: '',
    subhead: 'For multi-city brands that require a full production system.',
    features: [
      'Unlimited coverage planning',
      'On-site creative director',
      'White-label content ops',
      'Cross-market creative governance',
    ],
    cta: 'Book Strategy Call',
    highlight: false,
  },
];

/**
 * RetainersSection
 * Pricing and package selection for monthly engagements.
 */
export const RetainersSection = () => {
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <section id="pricing" className="relative overflow-hidden bg-deep-void py-24 md:py-32">
      <SectionBackdrop variant="gold" />
      <div className="container relative z-10 mx-auto px-4">
        <SectionIntro
          align="center"
          className="mb-14 md:mb-16"
          kickerIcon={<Sparkles size={12} />}
          kicker="Monthly Retainers"
          title="CHOOSE YOUR"
          highlight="GROWTH VELOCITY"
          description="Every package is designed to move from content chaos to repeatable booking outcomes."
          descriptionClassName="text-white/[0.66]"
        />

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7"
        >
          {tiers.map((tier) => {
            const Icon = tier.icon;

            return (
              <motion.div key={tier.name} variants={cardVariants}>
                <GlassCard
                  intensity={tier.highlight ? 'high' : 'medium'}
                  className={`relative flex h-full flex-col p-7 md:p-8 ${
                    tier.highlight
                      ? 'border-vegas-gold/50 shadow-[0_20px_50px_rgba(212,175,55,0.16)]'
                      : 'border-white/10'
                  }`}
                  hoverEffect
                >
                  {tier.highlight && (
                    <div className="border-vegas-gold/35 absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border bg-vegas-gold px-4 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-black">
                      Best Value
                    </div>
                  )}

                  <div className="mb-6 flex items-center justify-between">
                    <div className="rounded-xl border border-white/15 bg-white/5 p-2 text-vegas-gold">
                      <Icon size={20} />
                    </div>
                    <span className="font-display text-xs tracking-[0.24em] text-white/[0.65]">
                      {tier.name}
                    </span>
                  </div>

                  <div className="mb-3 flex items-end gap-2">
                    <span className="font-display text-5xl font-black leading-none text-white">
                      {tier.price}
                    </span>
                    {tier.cadence && (
                      <span className="pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/[0.45]">
                        {tier.cadence}
                      </span>
                    )}
                  </div>

                  <p className="mb-7 min-h-14 text-sm leading-relaxed text-white/[0.62]">
                    {tier.subhead}
                  </p>

                  <div className="mb-8 flex-1 space-y-3">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-sm text-white/[0.76]">
                        <Check size={16} className="mt-0.5 shrink-0 text-vegas-gold" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <GlintEffect>
                    <Button
                      asChild
                      variant={tier.highlight ? 'primary' : 'outline'}
                      className="w-full rounded-2xl py-3 text-[11px] tracking-[0.2em]"
                    >
                      <a href="#lead-capture">
                        {tier.cta} <ArrowRight size={15} />
                      </a>
                    </Button>
                  </GlintEffect>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
