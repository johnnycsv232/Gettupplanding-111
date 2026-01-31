'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { Play, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

const works = [
  {
    id: 1,
    type: 'video',
    src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80',
    title: 'Neon Nights',
  },
  {
    id: 2,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?auto=format&fit=crop&q=80',
    title: 'Vegas Residency',
  },
  {
    id: 3,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80',
    title: 'Rooftop VIP',
  },
  {
    id: 4,
    type: 'video',
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80',
    title: 'The Drop',
  },
  {
    id: 5,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
    title: 'Crowd Control',
  },
  {
    id: 6,
    type: 'video',
    src: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80',
    title: 'Backstage',
  },
];

export default function GallerySection() {
  const [filter, setFilter] = useState<'all' | 'video' | 'photo'>('all');

  const filteredWorks = works.filter((w) => filter === 'all' || w.type === filter);

  return (
    <section className="bg-deep-void-black py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <h2 className="font-display text-4xl text-white">THE WORK</h2>

          <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1">
            {['all', 'video', 'photo'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as 'all' | 'video' | 'photo')}
                className={`rounded-full px-6 py-2 text-sm uppercase tracking-widest transition-colors duration-300 ${
                  filter === f
                    ? 'bg-vegas-gold font-bold text-black shadow-lg shadow-vegas-gold/20'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
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
                layout
                key={work.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 300,
                  layout: { duration: 0.3 },
                }}
              >
                <GlassCard className="group relative aspect-[4/5] cursor-pointer border-0">
                  <Image
                    src={work.src}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md">
                      {work.type === 'video' ? <Play fill="currentColor" /> : <ImageIcon />}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-black/90 to-transparent p-6 transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="font-display text-xl text-white">{work.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-vegas-gold">{work.type}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
