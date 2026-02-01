'use client';

import { motion } from 'framer-motion';
import ParticleField from '@/components/three/ParticleField';
import Button from '@/components/ui/Button';
import Magnetic from '@/components/animations/Magnetic';
import { tokens } from '@/styles/tokens';

export default function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-white py-40">
      {/* Intense Particle Field */}
      <div className="absolute inset-0 z-0">
        <ParticleField
          count={tokens.config3d.finalCta.count}
          speed={tokens.config3d.finalCta.speed}
          color={tokens.colors.gold}
          size={tokens.config3d.finalCta.size}
        />
      </div>

      {/* Overlay Gradients */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-deep-void-black via-transparent to-deep-void-black" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,199,44,0.1)_0%,transparent_70%)]" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h2 className="font-display text-7xl leading-[0.8] tracking-tighter text-white md:text-[12rem]">
            READY TO
            <br />
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-block text-vegas-gold drop-shadow-[0_0_30px_rgba(255,199,44,0.4)]"
            >
              DOMINATE?
            </motion.span>
          </h2>

          <p className="mx-auto max-w-2xl text-xl font-light italic tracking-wide text-off-white/60 md:text-2xl">
            &quot;The night belongs to those who own the vision.&quot;
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <Magnetic strength={0.3}>
              <Button
                variant="primary"
                size="xl"
                className="rounded-none border-2 border-white bg-black px-20 py-8 text-3xl font-bold uppercase tracking-widest text-white shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-500 hover:bg-white hover:text-black hover:shadow-[0_0_70px_rgba(255,255,255,0.5)]"
                onClick={() =>
                  document.getElementById('pilot')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                START THE PILOT
              </Button>
            </Magnetic>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/30">
              Limited availability for Q1 2026
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Edge Glows */}
      <div className="pointer-events-none absolute left-0 top-0 z-[2] h-32 w-full bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-[2] h-32 w-full bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
