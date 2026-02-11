'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye, GalleryVerticalEnd } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { SectionBackdrop } from '@/features/landing/components/primitives/SectionBackdrop';
import { SectionIntro } from '@/features/landing/components/primitives/SectionIntro';

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
    src: 'https://images.unsplash.com/photo-1541339907198-e08756eaa63f?auto=format&fit=crop&q=80',
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
    <section id="gallery" className="section-shell bg-deep-void px-4">
      <SectionBackdrop variant="gold" />
      <div className="container relative z-10 mx-auto">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
          <SectionIntro
            className="max-w-3xl"
            kicker="Visual Portfolio"
            kickerIcon={<GalleryVerticalEnd size={13} />}
            title="THE"
            highlight="SIGHTS"
            description="A curated mix of nightclub reels and stills engineered for premium storytelling across socials, ads, and website surfaces."
          />

          <div className="flex flex-wrap gap-3 rounded-full border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl">
            {(['all', 'video', 'photo'] as const).map((sectionFilter) => (
              <button
                key={sectionFilter}
                type="button"
                onClick={() => setFilter(sectionFilter)}
                className={`rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all md:px-6 ${
                  filter === sectionFilter
                    ? 'bg-vegas-gold text-black'
                    : 'text-white/[0.56] hover:bg-white/[0.07] hover:text-white'
                }`}
              >
                {sectionFilter}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-square overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04]"
              >
                <Image
                  src={work.src}
                  alt={work.title}
                  fill
                  className="object-cover grayscale-[0.85] transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-65 transition-opacity group-hover:opacity-85" />

                <div className="absolute inset-0 flex scale-90 items-center justify-center opacity-0 transition-opacity duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <div className="flex size-16 items-center justify-center rounded-full bg-vegas-gold text-black">
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
