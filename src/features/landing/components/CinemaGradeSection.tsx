'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { Play } from 'lucide-react';

export default function CinemaGradeSection() {
  return (
    <section className="relative overflow-hidden bg-black py-24">
      <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
        <motion.div
          className="relative order-2 md:order-1"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Mock Video Player UI */}
          <GlassCard className="box-glow-magenta group relative aspect-video overflow-hidden border-neon-magenta/30 bg-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-2 border-neon-magenta text-neon-magenta"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 0, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={32} fill="currentColor" />
              </motion.div>
            </div>
            {/* Fake timeline */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div className="relative h-full w-1/3 bg-neon-magenta">
                <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-neon-magenta shadow-[0_0_10px_#FF00FF]" />
              </div>
            </div>
            <div className="absolute right-4 top-4 border border-neon-magenta/20 bg-neon-magenta/10 px-2 py-1 font-mono text-xs text-neon-magenta">
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
          <h2 className="font-display text-5xl uppercase tracking-tighter text-white">
            <span className="text-shadow-neon text-neon-magenta">Cinema Grade</span>
            <br />
            Post-Production
          </h2>
          <p className="text-lg font-light leading-relaxed text-off-white/80">
            We don&apos;t use Instagram filters. We use DaVinci Resolve. Every frame is color graded
            to match your venue&apos;s lighting and vibe.
          </p>
          <ul className="space-y-3 font-mono text-sm tracking-widest text-neon-magenta/80">
            <li>{'// Custom LUT Development'}</li>
            <li>{'// Sound Design & Mixing'}</li>
            <li>{'// Dynamic Motion Graphics'}</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
