'use client';

import { motion } from 'framer-motion';
import { Play, Film } from 'lucide-react';

import { GlassCard } from '@/components/ui';
import { SectionBackdrop } from '@/features/landing/components/primitives/SectionBackdrop';
import { SectionIntro } from '@/features/landing/components/primitives/SectionIntro';

export default function CinemaGradeSection() {
  return (
    <section className="section-shell relative overflow-hidden bg-black py-24">
      <SectionBackdrop variant="danger" />
      <div className="container relative z-10 mx-auto grid items-center gap-10 px-4 md:grid-cols-2 md:gap-12">
        <motion.div
          className="relative order-2 md:order-1"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Mock Video Player UI */}
          <GlassCard className="box-glow-magenta border-neon-magenta/30 group relative aspect-video overflow-hidden border bg-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="flex size-20 cursor-pointer items-center justify-center rounded-full border-2 border-neon-magenta text-neon-magenta"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 0, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={32} fill="currentColor" />
              </motion.div>
            </div>
            {/* Fake timeline */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
              <div className="relative h-full w-1/3 bg-neon-magenta">
                <div className="absolute right-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-neon-magenta shadow-[0_0_10px_#FF00FF]" />
              </div>
            </div>
            <div className="border-neon-magenta/20 bg-neon-magenta/10 absolute right-4 top-4 border px-2 py-1 font-mono text-xs text-neon-magenta">
              4K RAW 60FPS
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          className="order-1 space-y-6 md:order-2"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <SectionIntro
            className="max-w-xl"
            kicker="Post Pipeline"
            kickerIcon={<Film size={13} />}
            tone="danger"
            title="CINEMA GRADE"
            highlight="POST-PRODUCTION"
            highlightClassName="text-neon-magenta text-glow-magenta"
            description="No template filters. Every frame is calibrated with pro color pipelines to match your venue lighting and brand atmosphere."
            descriptionClassName="text-white/[0.7]"
          />
          <ul className="text-neon-magenta/80 space-y-3 font-mono text-sm tracking-widest">
            <li>{'// Custom LUT Development'}</li>
            <li>{'// Sound Design & Mixing'}</li>
            <li>{'// Dynamic Motion Graphics'}</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
