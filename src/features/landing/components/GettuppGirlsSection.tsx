'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const models = [
  { id: 1, tilt: -3 },
  { id: 2, tilt: 2 },
  { id: 3, tilt: -1.5 },
  { id: 4, tilt: 4 },
];

export default function GettuppGirlsSection() {
  return (
    <section className="py-24 bg-deep-void-black border-y border-neon-magenta/20 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neon-magenta/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-neon-magenta/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-5xl md:text-7xl text-white mb-6">
              GETTUPP <span className="text-neon-magenta drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">GIRLS</span>
            </h2>
            <p className="text-off-white/80 text-xl leading-relaxed max-w-lg mb-8">
              The elite face of your venue. We source, cast, and manage premium talent that defines the atmosphere. 
              Models. Bottle Service. Unmatched Presence.
            </p>
            <Button 
              variant="neon" 
              className="px-10 py-4 text-lg border-2 border-neon-magenta text-neon-magenta hover:bg-neon-magenta hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,0,255,0.2)]"
            >
              VIEW THE ROSTER
            </Button>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          {models.map((model, i) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30, rotate: model.tilt }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                rotate: 0, 
                scale: 1.05,
                zIndex: 20,
                transition: { type: 'spring', stiffness: 300 }
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group cursor-pointer"
            >
              <div className="bg-white p-3 pb-12 shadow-2xl transform transition-all duration-500 group-hover:shadow-neon-magenta/20">
                <div className="aspect-[3/4] overflow-hidden bg-neutral-900 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-magenta/20 to-transparent mix-blend-overlay" />
                  {/* Image would go here */}
                  <div className="w-full h-full bg-[url('/api/placeholder/400/500')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="mt-4 h-4 w-2/3 bg-neutral-100 rounded-sm" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
