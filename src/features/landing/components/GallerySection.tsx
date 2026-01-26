'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { Play, Image as ImageIcon } from 'lucide-react';

const works = [
  { id: 1, type: 'video', src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80', title: 'Neon Nights' },
  { id: 2, type: 'photo', src: 'https://images.unsplash.com/photo-1570158268183-d296b2892211?auto=format&fit=crop&q=80', title: 'Vegas Residency' },
  { id: 3, type: 'photo', src: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80', title: 'Rooftop VIP' },
  { id: 4, type: 'video', src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80', title: 'The Drop' },
  { id: 5, type: 'photo', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80', title: 'Crowd Control' },
  { id: 6, type: 'video', src: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80', title: 'Backstage' },
];

export default function GallerySection() {
  const [filter, setFilter] = useState<'all' | 'video' | 'photo'>('all');

  const filteredWorks = works.filter(w => filter === 'all' || w.type === filter);

  return (
    <section className="py-24 bg-deep-void-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <h2 className="font-display text-4xl text-white">THE WORK</h2>
          
          <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10">
            {['all', 'video', 'photo'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as 'all' | 'video' | 'photo')}
                className={`px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-all ${
                  filter === f 
                    ? 'bg-vegas-gold text-black font-bold shadow-lg shadow-vegas-gold/20' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredWorks.map((work) => (
              <motion.div
                layout
                key={work.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard className="aspect-[4/5] relative group cursor-pointer border-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={work.src} alt={work.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                        {work.type === 'video' ? <Play fill="currentColor" /> : <ImageIcon />}
                     </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display text-xl text-white">{work.title}</h3>
                    <p className="text-xs text-vegas-gold uppercase tracking-widest">{work.type}</p>
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
