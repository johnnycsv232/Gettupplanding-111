'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import Magnetic from '@/components/animations/Magnetic';

const girls = [
  { id: 1, img: '/api/placeholder/600/800', label: 'LIFESTYLE' },
  { id: 2, img: '/api/placeholder/600/800', label: 'PREMIUM' },
  { id: 3, img: '/api/placeholder/600/800', label: 'BOTTLE SERVICE' },
  { id: 4, img: '/api/placeholder/600/800', label: 'ATMOSPHERE' },
  { id: 5, img: '/api/placeholder/600/800', label: 'INFLUENCER' },
  { id: 6, img: '/api/placeholder/600/800', label: 'ELITE' },
];

export default function GettuppGirlsSection() {
  return (
    <section
      id="girls"
      className="bg-deep-void relative overflow-hidden border-y border-white/5 py-32"
    >
      {/* Pink Aura Glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-neon-magenta/5 blur-[150px]" />
      <div className="container mx-auto mb-20 px-4 text-center lg:text-left">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-premium-sm font-bold tracking-[0.3em] text-neon-magenta"
            >
              BRAND VERTICAL
            </motion.span>
            <h2 className="heading-zenith text-6xl leading-none text-white md:text-8xl">
              GETTUPP <br />
              <span className="agency-serif text-neon-magenta opacity-90">GIRLS</span>
            </h2>
            <p className="max-w-xl text-xl font-light leading-relaxed text-off-white/40">
              More than just models. A lifestyle ecosystem. <br className="hidden md:block" />
              Cross-promote your venue with our exclusive network and the unofficial nightlife
              uniform.
            </p>
          </div>
          <div className="flex justify-center pb-4 lg:justify-end">
            <Magnetic strength={0.2}>
              <Button
                variant="secondary"
                size="lg"
                className="group rounded-full border border-neon-magenta/50 px-10 text-neon-magenta transition-all duration-500 hover:bg-neon-magenta hover:text-white"
              >
                VIEW COLLECTION{' '}
                <ArrowRight className="ml-2 transition-transform duration-500 group-hover:translate-x-2" />
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
      {/* Infinite Marquee Scroll */}
      <div className="relative flex overflow-hidden border-y border-white/5 bg-black/20">
        <div className="animate-marquee flex gap-6 py-12">
          {[...girls, ...girls].map((girl, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-card glint-effect group relative aspect-[3/4] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 md:w-[400px]"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-20" />
              <div
                className="absolute inset-0 bg-cover bg-center contrast-[1.1] grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                style={{ backgroundImage: `url(${girl.img})` }}
              />
              <div className="absolute bottom-8 left-8 z-20">
                <span className="rounded-full border border-white/20 bg-black/60 px-4 py-2 text-[10px] font-black tracking-[0.2em] text-white backdrop-blur-xl transition-all group-hover:border-neon-magenta/50 group-hover:text-neon-magenta">
                  {girl.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-20 text-center">
        <span className="font-display text-sm uppercase tracking-[0.5em] text-white/20">
          🔥 Coming Soon: The Winter Collection
        </span>
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
