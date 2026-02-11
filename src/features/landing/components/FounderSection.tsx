'use client';

import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { Button, GlassCard } from '@/components/ui';
import { SectionBackdrop } from '@/features/landing/components/primitives/SectionBackdrop';
import { SectionIntro } from '@/features/landing/components/primitives/SectionIntro';

const founderMetrics = [
  { value: '350+', label: 'Nights Captured' },
  { value: '24HR', label: 'Turnaround Standard' },
  { value: '10+', label: 'Premium Venues' },
  { value: '4.9/5', label: 'Partner Score' },
];

const founderPillars = [
  'Cinema-first direction',
  'Real nightlife timing',
  'Conversion over vanity',
  'Operational discipline',
];

/**
 * FounderSection
 * Story and leadership proof behind the GettUpp methodology.
 */
export const FounderSection = () => {
  return (
    <section id="founder" className="relative overflow-hidden border-b border-white/5 bg-deep-void py-24 md:py-32">
      <SectionBackdrop variant="neutral" />

      <div className="container relative z-10 mx-auto px-4">
        <SectionIntro
          className="mb-12 max-w-4xl md:mb-16"
          tone="neutral"
          kicker="Founder Lens"
          title="BUILT BY SOMEONE WHO"
          highlight="LIVES THE FLOOR"
          description="GettUpp is led by a creator who built his reputation inside packed rooms, then turned that instinct into a repeatable growth system for premium venues."
          descriptionClassName="text-white/[0.7]"
        />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.08fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="relative"
          >
            <div className="glass-heavy relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/15">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
                alt="GettUpp founder portrait"
                fill
                className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                <p className="text-premium-sm text-vegas-gold">Founder & Executive Producer</p>
                <h3 className="mt-2 font-display text-4xl leading-none tracking-[0.12em] text-white md:text-5xl">
                  JOHNNY CAGE
                </h3>
                <p className="mt-2 text-sm text-white/[0.66]">GettUpp Entertainment</p>
              </div>
            </div>

            <div className="glass-medium absolute -bottom-6 -right-6 rounded-2xl border border-white/15 px-5 py-4">
              <span className="font-display text-xl tracking-[0.22em] text-vegas-gold">GETTUPP DNA</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-7"
          >
            <GlassCard className="rounded-3xl border-white/15 p-7 md:p-9" intensity="high">
              <p className="text-lg italic leading-relaxed text-white/[0.78]">
                &ldquo;The camera is only half the job. The other half is knowing exactly how a
                room moves, where the tension builds, and how to turn that energy into booked
                tables by Monday morning.&rdquo;
              </p>
              <p className="mt-4 text-[11px] font-black uppercase tracking-[0.24em] text-vegas-gold">
                Johnny Cage
              </p>
            </GlassCard>

            <div className="grid grid-cols-2 gap-3">
              {founderMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="liquid-glass rounded-2xl border border-white/[0.12] p-4"
                >
                  <p className="font-display text-2xl leading-none tracking-widest text-white">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/[0.54]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {founderPillars.map((pillar) => (
                <span
                  key={pillar}
                  className="rounded-full border border-white/[0.12] bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/[0.76]"
                >
                  {pillar}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {[Instagram, Twitter, Linkedin].map((Icon, index) => (
                  <button
                    key={index}
                    className="hover:border-vegas-gold/45 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/[0.7] transition-all hover:text-vegas-gold"
                    aria-label="Visit founder social profile"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>

              <Button
                asChild
                variant="outline"
                className="rounded-2xl px-6 py-3 text-[11px] tracking-[0.2em]"
              >
                <a href="#lead-capture">
                  Work With The Founder <ArrowRight size={15} />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
