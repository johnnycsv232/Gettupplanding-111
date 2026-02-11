'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CalendarClock } from 'lucide-react';

import { Magnetic } from '@/components/animations/Magnetic';
import { Button, GlintEffect } from '@/components/ui';

/**
 * FinalCTASection
 * Final close with clear high-intent paths.
 */
export const FinalCTASection = () => {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-deep-void py-28 md:py-40">
      <div className="absolute inset-0 z-0">
        <div className="bg-vegas-gold/10 absolute left-1/2 top-1/2 size-[76vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(212,175,55,0.12),transparent_44%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.08),transparent_40%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          className="glass-zenith mx-auto max-w-5xl space-y-8 rounded-[2rem] border border-white/15 px-6 py-12 md:px-12 md:py-16"
        >
          <div className="brand-kicker">
            <Sparkles size={15} />
            <span>Limited Pilot Slots This Month</span>
          </div>

          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.86] tracking-[0.02em] text-white">
            READY TO TURN
            <span className="text-glow-gold block text-vegas-gold">NIGHTLIFE INTO DEMAND?</span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/[0.76]">
            Lock your pilot date and we will map the full content plan around your next peak event.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
            <Magnetic strength={0.15}>
              <GlintEffect>
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="rounded-2xl px-10 py-5 text-[11px] tracking-[0.22em]"
                >
                  <a href="#lead-capture">
                    BOOK YOUR PILOT <ArrowRight size={18} className="ml-1" />
                  </a>
                </Button>
              </GlintEffect>
            </Magnetic>

            <a
              href="#pricing"
              className="focus-ring-gold inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white/[0.74] hover:border-white/40 hover:bg-white/10"
            >
              <CalendarClock size={16} />
              Compare Plans
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
