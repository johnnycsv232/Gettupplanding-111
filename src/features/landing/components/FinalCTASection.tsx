'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Magnetic } from '@/components/animations/Magnetic';
import { Button, GlintEffect } from '@/components/ui';

/**
 * FinalCTASection
 * The ultimate call to action at the bottom of the landing page.
 */
export const FinalCTASection = () => {
  return (
    <section className="relative overflow-hidden bg-deep-void py-40">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="bg-vegas-gold/5 absolute left-1/2 top-1/2 size-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl space-y-12"
        >
          <div className="border-vegas-gold/30 bg-vegas-gold/5 mb-8 inline-flex items-center gap-3 rounded-full border px-6 py-2 text-vegas-gold">
            <Sparkles size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Limited Pilot Slots Available
            </span>
          </div>

          <h2 className="font-display text-6xl uppercase leading-none tracking-tighter text-white md:text-[9rem]">
            READY TO <br />
            <span className="text-glow-gold text-vegas-gold">GETTUPP?</span>
          </h2>

          <p className="text-off-white/60 mx-auto max-w-2xl text-xl uppercase tracking-widest md:text-2xl">
            Join the world's most elite nightlife network. Your first production starts here.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 pt-12 sm:flex-row">
            <Magnetic strength={0.2}>
              <GlintEffect>
                <Button variant="primary" size="lg" className="rounded-full px-12 py-8 text-xl">
                  BOOK YOUR PILOT <ArrowRight size={24} className="ml-2" />
                </Button>
              </GlintEffect>
            </Magnetic>

            <button className="text-sm font-black uppercase tracking-[0.4em] text-white/40 transition-colors hover:text-white">
              Speak to an Agent
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
