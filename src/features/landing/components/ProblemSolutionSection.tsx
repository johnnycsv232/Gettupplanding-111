'use client';

import { motion } from 'framer-motion';
import { Camera, Zap, Globe, Cpu } from 'lucide-react';

/**
 * ProblemSolutionSection
 * Compares the "industry standard" with the Zenith level production.
 */
export const ProblemSolutionSection = () => {
  return (
    <section className="relative overflow-hidden bg-deep-void py-32">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2"
        >
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="font-display text-5xl uppercase leading-none tracking-tighter text-white md:text-7xl">
                THE <span className="text-vegas-gold">ZENITH</span> <br />
                ADVANTAGE
              </h2>
              <p className="text-off-white/40 text-xs uppercase tracking-[0.3em]">
                Next-Gen Production Infrastructure
              </p>
            </div>

            <div className="space-y-10">
              <div className="group flex gap-8">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/5 text-vegas-gold transition-all duration-500 group-hover:bg-vegas-gold group-hover:text-black">
                  <Camera size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white">
                    Cinema Grade Optics
                  </h3>
                  <p className="text-off-white/40 leading-relaxed">
                    We don't use phones. We deploy full-frame cinema sensors that capture 15+ stops
                    of dynamic range, ensuring every sparkler and strobe light is captured in
                    stunning 10-bit color.
                  </p>
                </div>
              </div>

              <div className="group flex gap-8">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/5 text-vegas-gold transition-all duration-500 group-hover:bg-vegas-gold group-hover:text-black">
                  <Zap size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white">
                    Velocity Workflow
                  </h3>
                  <p className="text-off-white/40 leading-relaxed">
                    Our editors are on-site or remote-synced in real-time. We deliver world-class
                    recaps within 24 hours, while the event is still fresh in your followers' minds.
                  </p>
                </div>
              </div>

              <div className="group flex gap-8">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/5 text-vegas-gold transition-all duration-500 group-hover:bg-vegas-gold group-hover:text-black">
                  <Globe size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white">
                    Global Standards
                  </h3>
                  <p className="text-off-white/40 leading-relaxed">
                    Whether you're in Miami, Ibiza, or Dubai, our production quality remains
                    consistently elite. One brand, one standard, worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-heavy group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/5">
              {/* Decorative Elements */}
              <div className="from-vegas-gold/20 to-neon-magenta/10 absolute inset-0 bg-gradient-to-tr via-transparent opacity-30" />
              <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 animate-pulse bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)]" />

              <div className="glass-medium absolute bottom-10 left-10 max-w-xs rounded-2xl border-white/10 p-8 transition-transform duration-700 group-hover:scale-105">
                <Cpu className="mb-4 text-vegas-gold" size={32} />
                <div className="font-display mb-2 text-2xl tracking-widest text-white">
                  A.I. COLOR GRADE
                </div>
                <p className="text-[10px] uppercase tracking-widest text-white/40">
                  Real-time cinematic processing pipeline
                </p>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-10 -top-10 rotate-12 rounded-full bg-vegas-gold p-6 text-center font-black leading-none tracking-tighter text-black shadow-2xl">
              <div className="text-3xl">10X</div>
              <div className="text-xs">MORE REACH</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
