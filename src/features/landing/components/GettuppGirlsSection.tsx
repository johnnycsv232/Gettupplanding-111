'use client';

import { motion } from 'framer-motion';

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
    <section className="bg-void overflow-hidden border-t border-white/5 py-32">
      <div className="container mx-auto mb-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-vegas-gold">
            The Aesthetic Vanguard
          </span>
          <h2 className="font-display text-5xl uppercase tracking-tighter text-white md:text-8xl">
            GETTUPP <span className="text-white/20">COLLECTION</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative flex overflow-hidden border-y border-white/5 bg-black/20">
        <div className="animate-marquee flex gap-6 py-12">
          {[...girls, ...girls].map((girl, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-heavy glint-effect group relative aspect-[3/4] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 md:w-[400px]"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-20" />
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

      <div className="mt-20 text-center">
        <span className="font-display animate-pulse text-sm uppercase tracking-[0.5em] text-white/20">
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
