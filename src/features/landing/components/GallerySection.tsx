'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye } from 'lucide-react';
import Image from 'next/image';

const works = [
  {
    id: 1,
    type: 'video',
    src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80',
    title: 'Neon Nights',
    tag: 'PRODUCTION',
  },
  {
    id: 2,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?auto=format&fit=crop&q=80',
    title: 'Vegas Residency',
    tag: 'PHOTOGRAPHY',
  },
  {
    id: 3,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80',
    title: 'Rooftop VIP',
    tag: 'CONTENT',
  },
  {
    id: 4,
    type: 'video',
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80',
    title: 'The Drop',
    tag: 'REELS',
  },
  {
    id: 5,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
    title: 'Crowd Control',
    tag: 'SOCIAL',
  },
  {
    id: 6,
    type: 'video',
    src: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80',
    title: 'Backstage',
    tag: 'CINEMATIC',
  },
];

/**
 * GallerySection
 * A filterable showcase of video and photo production work.
 */
export const GallerySection = () => {
  const [filter, setFilter] = useState<'all' | 'video' | 'photo'>('all');

  const filteredWorks = works.filter((w) => filter === 'all' || w.type === filter);

  return (
    <section id="gallery" className="relative bg-deep-void px-4 py-32">
      {/* Ambient Glow */}
      <div className="bg-vegas-gold/5 pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] rounded-full blur-[120px]" />

      <div className="container mx-auto">
        <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.5em] text-vegas-gold">
              Visual Portfolio
            </span>
            <h2 className="font-display text-5xl uppercase tracking-tighter text-white md:text-7xl">
              THE <span className="text-glow-gold text-vegas-gold">SIGHTS</span>
            </h2>
          </div>

          <div className="flex gap-4 rounded-full border border-white/5 bg-white/5 p-2 backdrop-blur-xl">
            {(['all', 'video', 'photo'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === f
                    ? 'bg-vegas-gold text-black'
                    : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-square overflow-hidden rounded-3xl border border-white/5 bg-white/5"
              >
                <Image
                  src={work.src}
                  alt={work.title}
                  fill
                  className="object-cover grayscale transition-transform duration-700 hover:grayscale-0 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                <div className="absolute inset-0 flex scale-90 items-center justify-center opacity-0 transition-opacity duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vegas-gold text-black">
                    {work.type === 'video' ? (
                      <Play size={24} fill="currentColor" />
                    ) : (
                      <Eye size={24} />
                    )}
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 p-0">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-vegas-gold">
                    {work.tag}
                  </span>
                  <h3 className="font-display text-xl uppercase tracking-tighter text-white">
                    {work.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
