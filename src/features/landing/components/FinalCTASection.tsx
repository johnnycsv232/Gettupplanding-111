'use client';

import { motion } from 'framer-motion';
import ParticleField from '@/components/three/ParticleField';
import Button from '@/components/ui/Button';

export default function FinalCTASection() {
  return (
    <section className="relative py-48 md:py-64 bg-deep-void-black overflow-hidden flex items-center justify-center text-center">
      {/* Intense Particle Field */}
      <div className="absolute inset-0 z-0">
        <ParticleField count={800} speed={2} color="#FFC72C" size={4} />
      </div>
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-void-black via-transparent to-deep-void-black z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,199,44,0.1)_0%,transparent_70%)] z-[1]" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h2 className="font-display text-7xl md:text-[12rem] leading-[0.8] text-white tracking-tighter">
            READY TO<br/>
            <motion.span 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-vegas-gold inline-block drop-shadow-[0_0_30px_rgba(255,199,44,0.4)]"
            >
              DOMINATE?
            </motion.span>
          </h2>
          
          <p className="text-off-white/60 text-xl md:text-2xl max-w-2xl mx-auto font-light tracking-wide italic">
            &quot;The night belongs to those who own the vision.&quot;
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <Button 
              variant="primary" 
              size="xl" 
              className="px-20 py-8 text-3xl font-bold tracking-widest shadow-[0_0_50px_rgba(255,199,44,0.3)] hover:shadow-[0_0_70px_rgba(255,199,44,0.5)] transition-all duration-500 rounded-none border-2 border-vegas-gold bg-transparent text-vegas-gold hover:bg-vegas-gold hover:text-black uppercase"
            >
              START THE PILOT
            </Button>
            <span className="text-off-white/30 font-mono text-xs tracking-[0.3em] uppercase">
              Limited availability for Q1 2026
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Edge Glows */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-[2]" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-[2]" />
    </section>
  );
}
