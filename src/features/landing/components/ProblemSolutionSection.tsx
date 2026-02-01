'use client';

import { motion } from 'framer-motion';

import { ShieldAlert, Zap, Film, Camera } from 'lucide-react';

export default function ProblemSolutionSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="problem"
      className="bg-deep-void relative overflow-hidden border-y border-white/5 py-32"
    >
      {/* Abstract Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="container relative z-10 mx-auto px-4"
      >
        <div className="mx-auto max-w-5xl">
          {/* THE PROBLEM */}
          <motion.div variants={itemVariants} className="space-y-12 text-center">
            <div className="space-y-4">
              <span className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-vegas-gold/60">
                <ShieldAlert size={14} className="text-vegas-gold" /> AUDIT: MARKET GAPS
              </span>
              <h2 className="font-display text-6xl font-black tracking-tighter text-white md:text-[6rem]">
                THE <span className="text-glow-gold text-vegas-gold">VIBRANCY</span> GAP
              </h2>
            </div>

            <p className="mx-auto max-w-3xl text-xl font-light leading-relaxed text-off-white/60 md:text-2xl">
              Your venue is elite. Your service is legendary. But your content? <br />
              <span className="text-white">
                It looks like a 2014 smartphone highlight reel.
              </span>{' '}
              <br />
              <br />
              Blurry crowd shots and shaky iPhone footage don&apos;t just look &quot;bad&quot;—they
              look <span className="italic">cheap</span>. You&apos;re bleeding thousands in booking
              revenue because your digital status doesn&apos;t match your physical gravity.
            </p>
          </motion.div>

          {/* THE BRIDGE */}
          <motion.div variants={itemVariants} className="flex items-center justify-center py-20">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-vegas-gold/30 to-transparent" />
            <Zap className="mx-8 animate-pulse text-vegas-gold/40" size={20} />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-vegas-gold/30 to-transparent" />
          </motion.div>

          {/* THE SOLUTION */}
          <motion.div variants={itemVariants} className="space-y-16 text-center">
            <div className="space-y-6">
              <span className="flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-[0.6em] text-neon-magenta">
                <Zap size={16} className="text-neon-magenta" strokeWidth={3} /> THE RESET
              </span>
              <h2 className="font-display text-7xl font-black tracking-tighter text-white md:text-[8rem] lg:text-[10rem]">
                LIQUID <span className="text-glow-magenta text-neon-magenta">GLASS</span>
              </h2>
              <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-neon-magenta to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-12 text-left md:grid-cols-2">
              <div className="glass-heavy hover:box-glow-gold group space-y-6 rounded-3xl border-white/5 p-10 transition-all duration-500 hover:border-vegas-gold/30">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
                  <Film className="text-vegas-gold" size={28} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black uppercase tracking-widest text-white">
                    Cinema Grade 4K
                  </h3>
                  <div className="h-0.5 w-10 bg-vegas-gold opacity-30 transition-all duration-500 group-hover:w-full group-hover:opacity-100" />
                </div>
                <p className="text-lg font-medium leading-relaxed text-off-white/40 transition-colors duration-500 group-hover:text-off-white/70">
                  We deploy industry-standard RED/Arri-level color science to club environments.
                  Rich blacks, neon highlights, and buttery slow-motion that feels like a Hollywood
                  production.
                </p>
              </div>

              <div className="glass-heavy hover:box-glow-magenta group space-y-6 rounded-3xl border-white/5 p-10 transition-all duration-500 hover:border-neon-magenta/30">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
                  <Camera className="text-neon-magenta" size={28} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black uppercase tracking-widest text-white">
                    Authority Assets
                  </h3>
                  <div className="h-0.5 w-10 bg-neon-magenta opacity-30 transition-all duration-500 group-hover:w-full group-hover:opacity-100" />
                </div>
                <p className="text-lg font-medium leading-relaxed text-off-white/40 transition-colors duration-500 group-hover:text-off-white/70">
                  We don&apos;t just &quot;take photos.&quot; We manufacture status. Every shot is
                  engineered to make your venue look like the only place that matters on a Friday
                  night.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
