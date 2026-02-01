'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye, Filter } from 'lucide-react';
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

export default function GallerySection() {
  const [filter, setFilter] = useState<'all' | 'video' | 'photo'>('all');

  const filteredWorks = works.filter((w) => filter === 'all' || w.type === filter);

  return (
    <section id="gallery" className="bg-deep-void relative px-4 py-32">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] rounded-full bg-vegas-gold/5 blur-[120px]" />

      <div className="container mx-auto">
        <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-vegas-gold">
              PORTFOLIO
            </span>
            <h2 className="font-display text-6xl text-white md:text-7xl">
              THE <span className="text-glow-gold text-vegas-gold">WORK</span>
            </h2>
          </div>

          <div className="glass-heavy flex items-center gap-4 rounded-full border-white/10 p-1.5">
            <div className="pl-4 text-white/40">
              <Filter size={14} />
            </div>
            {['all', 'video', 'photo'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as 'all' | 'video' | 'photo')}
                className={`rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  filter === f
                    ? 'bg-vegas-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, i) => (
              <motion.div
                layout
                key={work.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 z-10 bg-black/40 transition-colors duration-500 group-hover:bg-black/20" />
                <Image
                  src={work.src}
                  alt={work.title}
                  fill
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Content Overlay */}
                <div className="from-deep-void absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t via-transparent to-transparent p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black tracking-widest text-vegas-gold">
                      {work.tag}
                    </span>
                    <h3 className="font-display text-2xl text-white">{work.title}</h3>
                  </div>

                  <div className="glass-heavy absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 scale-0 items-center justify-center rounded-full border-white/20 text-white transition-transform duration-500 group-hover:scale-100">
                    {work.type === 'video' ? <Play size={24} fill="white" /> : <Eye size={24} />}
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute right-6 top-6 z-20 h-2 w-2 border-r border-t border-white/40 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-6 left-6 z-20 h-2 w-2 border-b border-l border-white/40 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mt-20 text-center">
        <p className="font-display text-[10px] uppercase tracking-[0.4em] text-white/20">
          Curated for the elite segment only
        </p>
      </div>
    </section>
  );
}
