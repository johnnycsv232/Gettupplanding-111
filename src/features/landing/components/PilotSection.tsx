'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Target, Timer, ArrowRight } from 'lucide-react';

import { Button, GlassCard, GlintEffect } from '@/components/ui';
import { SectionBackdrop } from '@/features/landing/components/primitives/SectionBackdrop';
import { SectionIntro } from '@/features/landing/components/primitives/SectionIntro';

const pilotDeliverables = [
  'One full cinematic recap + 3 vertical cutdowns',
  'Hook-first scripting and posting plan',
  'Delivery in < 24 hours after your event ends',
];

/**
 * PilotSection
 * Low-friction paid entry offer for conversion.
 */
export const PilotSection = () => {
  return (
    <section id="pilot" className="section-shell">
      <SectionBackdrop variant="neutral" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-8"
          >
            <SectionIntro
              className="max-w-3xl"
              kicker="Pilot Offer"
              title="START WITH A"
              highlight="PROOF NIGHT"
              description="One high-impact event recap designed to prove speed, quality, and growth before any monthly commitment."
              descriptionClassName="text-white/[0.74]"
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="liquid-glass rounded-2xl border border-white/10 p-4">
                <ShieldCheck size={18} className="text-vegas-gold" />
                <p className="mt-3 text-sm font-semibold text-white">Risk Controlled</p>
                <p className="mt-1 text-xs text-white/[0.5]">One event. Zero lock-in.</p>
              </div>
              <div className="liquid-glass rounded-2xl border border-white/10 p-4">
                <Timer size={18} className="text-vegas-gold" />
                <p className="mt-3 text-sm font-semibold text-white">24HR Delivery</p>
                <p className="mt-1 text-xs text-white/[0.5]">Edits arrive while hype is hot.</p>
              </div>
              <div className="liquid-glass rounded-2xl border border-white/10 p-4">
                <Target size={18} className="text-vegas-gold" />
                <p className="mt-3 text-sm font-semibold text-white">Conversion Focused</p>
                <p className="mt-1 text-xs text-white/[0.5]">Built for bookings, not vanity.</p>
              </div>
            </div>

            <ul className="space-y-3">
              {pilotDeliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/[0.7]">
                  <span className="mt-1 inline-block size-1.5 rounded-full bg-vegas-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <GlintEffect>
            <GlassCard className="border-vegas-gold/30 p-8 md:p-10" intensity="high">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-vegas-gold">
                Single Event Pilot
              </p>
              <div className="mt-4">
                <span className="font-display text-6xl font-black text-white">$250</span>
                <span className="ml-2 text-sm uppercase tracking-[0.2em] text-white/[0.45]">
                  One-time
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/[0.62]">
                Limited to 5 venues per city each month so our team can keep post-production
                velocity high.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="w-full rounded-2xl text-[11px] tracking-[0.22em]"
                >
                  <a href="#lead-capture">
                    Reserve Pilot Slot <ArrowRight size={16} />
                  </a>
                </Button>
                <a
                  href="#pricing"
                  className="focus-ring-gold rounded-2xl border border-white/20 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/[0.7] hover:border-white/35 hover:bg-white/10"
                >
                  Compare Retainers
                </a>
              </div>

              <p className="mt-6 text-[11px] text-white/[0.45]">
                No account required. We confirm your slot by email.
              </p>
            </GlassCard>
          </GlintEffect>
        </div>
      </div>
    </section>
  );
};
