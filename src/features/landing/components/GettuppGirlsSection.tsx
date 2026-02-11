'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import { SectionBackdrop } from '@/features/landing/components/primitives/SectionBackdrop';
import { SectionIntro } from '@/features/landing/components/primitives/SectionIntro';

const girls = [
  {
    label: 'ELEGANCE',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80',
  },
  {
    label: 'VELOCITY',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80',
  },
  {
    label: 'PRESTIGE',
    img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80',
  },
  {
    label: 'OPULENCE',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80',
  },
];

/**
 * GettuppGirlsSection
 * An aesthetic showcase featuring high-fashion production value and character.
 */
export const GettuppGirlsSection = () => {
  return (
    <section className="section-shell overflow-hidden border-t border-white/5 bg-void">
      <SectionBackdrop variant="neutral" />
      <div className="container relative z-10 mx-auto mb-14 px-4 text-center md:mb-16">
        <SectionIntro
          align="center"
          className="mx-auto max-w-3xl"
          tone="neutral"
          kicker="The Aesthetic Vanguard"
          kickerIcon={<Sparkles size={13} />}
          title="GETTUPP"
          highlight="COLLECTION"
          highlightClassName="text-white/[0.38] text-shadow-none"
          description="A high-fashion production lane built to elevate campaign visuals and nightlife identity systems."
        />
      </div>

      <div className="relative flex overflow-hidden border-y border-white/[0.08] bg-black/[0.26]">
        <div className="animate-marquee flex gap-6 py-12">
          {[...girls, ...girls].map((girl, index) => (
            <motion.div
              key={`${girl.label}-${index}`}
              whileHover={{ y: -20, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-heavy glint-effect group relative aspect-[3/4] w-[280px] shrink-0 overflow-hidden rounded-2xl border border-white/15 md:w-[360px]"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-65 transition-opacity group-hover:opacity-25" />
              <div
                className="absolute inset-0 bg-cover bg-center contrast-[1.1] grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                style={{ backgroundImage: `url(${girl.img})` }}
              />
              <div className="absolute bottom-8 left-8 z-20">
                <span className="group-hover:border-neon-magenta/50 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-[10px] font-black tracking-[0.2em] text-white backdrop-blur-xl transition-all group-hover:text-neon-magenta">
                  {girl.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-14 text-center md:mt-16">
        <span className="animate-pulse font-display text-sm uppercase tracking-[0.5em] text-white/[0.35]">
          Coming Soon: The Winter Collection
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
};
