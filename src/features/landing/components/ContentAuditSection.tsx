'use client';

import { motion } from 'framer-motion';

import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import Magnetic from '@/components/animations/Magnetic';

export default function ContentAuditSection() {
  return (
    <section className="bg-deep-void relative overflow-hidden border-y border-white/5 py-24">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vegas-gold/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        <GlassCard className="border-white/5 bg-white/[0.02] p-12 text-center md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mx-auto max-w-3xl space-y-8"
          >
            <div className="mb-4 inline-block rounded-full border border-vegas-gold/30 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-vegas-gold">
              Limited Availability
            </div>

            <h2 className="font-display text-4xl uppercase tracking-tighter text-white md:text-5xl">
              NOT READY FOR <span className="text-vegas-gold">THE PILOT?</span>
            </h2>

            <p className="mx-auto max-w-xl text-lg font-light leading-relaxed text-off-white/60 md:text-xl">
              Get a comprehensive 5-point audit of your current social presence. We&apos;ll tell you
              exactly why you&apos;re losing money.
            </p>

            <div className="flex justify-center pt-4">
              <Magnetic strength={0.2}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-vegas-gold/50 px-10 font-black uppercase tracking-widest hover:bg-vegas-gold hover:text-black"
                >
                  GET THE AUDIT ($300)
                </Button>
              </Magnetic>
            </div>

            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">
              Instant Delivery Upon Receipt of Profile
            </p>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
}
