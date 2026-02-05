'use client';

import { motion } from 'framer-motion';
import { MousePointer2, Play } from 'lucide-react';

export default function Hero() {
  const metrics = [
    { value: '79.7K', label: 'Views (90d)' },
    { value: '24HR', label: 'Delivery' },
    { value: '350+', label: 'Events Shot' },
    { value: '60 DAY', label: 'Guarantee' },
  ];

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 pb-40 md:px-8">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full scale-105 object-cover opacity-60 grayscale"
        >
          <source src="/videos/A_macro_productreveal_1080p_202601121922.mp4" type="video/mp4" />
        </video>
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl text-center">
        <motion.div
          className="border-vegas-gold/30 mb-8 inline-block rounded-full border bg-black/50 px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-vegas-gold backdrop-blur-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Minneapolis Royalty
        </motion.div>

        <motion.h1
          className="font-display mb-4 text-[clamp(2.5rem,10vw,8rem)] font-black uppercase leading-[0.9] tracking-tighter text-white"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-silver-chrome block">GETTUPPENT</span>
        </motion.h1>

        <motion.h2
          className="mx-auto mb-6 max-w-3xl text-[clamp(1rem,2vw,1.5rem)] font-medium leading-relaxed tracking-tight text-white md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          The uniform of the Minneapolis night.
        </motion.h2>

        <motion.p
          className="mb-12 text-sm font-black uppercase tracking-[0.05em] text-white/60 md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          Premium content. Real ROI. Zero excuses.
        </motion.p>

        <motion.div
          className="mx-auto mb-16 grid max-w-4xl grid-cols-2 gap-1 border border-white/10 bg-white/10 md:grid-cols-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col gap-1 bg-black/60 p-6 backdrop-blur-xl">
              <span className="font-display text-2xl font-extrabold text-white md:text-3xl">
                {metric.value}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/40">
                {metric.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center gap-6 md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <button className="flex items-center gap-3 bg-vegas-gold px-10 py-5 text-xs font-black uppercase tracking-widest text-black transition-all hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <span>START $345 PILOT</span>
            <MousePointer2 size={18} />
          </button>

          <button className="group flex items-center gap-3 px-6 py-5 text-xs font-black uppercase tracking-widest text-white transition-opacity hover:opacity-80">
            <div className="flex size-10 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:bg-white/10">
              <Play size={14} fill="currentColor" />
            </div>
            <span>VIEW THE WORK</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
