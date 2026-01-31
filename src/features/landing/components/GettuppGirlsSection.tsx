'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const models = [
  { id: 1, tilt: -3 },
  { id: 2, tilt: 2 },
  { id: 3, tilt: -1.5 },
  { id: 4, tilt: 4 },
];

export default function GettuppGirlsSection() {
  return (
    <section className="relative overflow-hidden border-y border-neon-magenta/20 bg-deep-void-black py-24">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-neon-magenta/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-1/3 bg-neon-magenta/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto grid items-center gap-16 px-4 md:grid-cols-2">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 font-display text-5xl text-white md:text-7xl">
              GETTUPP{' '}
              <span className="text-neon-magenta drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">
                GIRLS
              </span>
            </h2>
            <p className="mb-8 max-w-lg text-xl leading-relaxed text-off-white/80">
              The elite face of your venue. We source, cast, and manage premium talent that defines
              the atmosphere. Models. Bottle Service. Unmatched Presence.
            </p>
            <Button
              variant="neon"
              className="border-2 border-neon-magenta px-10 py-4 text-lg text-neon-magenta shadow-[0_0_20px_rgba(255,0,255,0.2)] transition-all duration-300 hover:bg-neon-magenta hover:text-white"
            >
              VIEW THE ROSTER
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:gap-8">
          {models.map((model, i) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30, rotate: model.tilt }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                rotate: 0,
                scale: 1.05,
                zIndex: 20,
                transition: { type: 'spring', stiffness: 300 },
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative cursor-pointer"
            >
              <div className="transform bg-white p-3 pb-12 shadow-2xl transition-all duration-500 group-hover:shadow-neon-magenta/20">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-magenta/20 to-transparent mix-blend-overlay" />
                  {/* Image would go here */}
                  <div className="h-full w-full bg-[url('/api/placeholder/400/500')] bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0" />
                </div>
                <div className="mt-4 h-4 w-2/3 rounded-sm bg-neutral-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
