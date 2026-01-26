'use client';

import ParticleField from '@/components/three/ParticleField';
import Button from '@/components/ui/Button';

export default function FinalCTASection() {
  return (
    <section className="relative py-48 bg-deep-void-black overflow-hidden flex items-center justify-center text-center">
       {/* Intense Particle Field */}
       <ParticleField count={300} speed={0.8} color="#FFC72C" size={3} />
       
       <div className="relative z-10 container mx-auto px-4 space-y-8">
         <h2 className="font-display text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
           READY TO<br/><span className="text-vegas-gold text-shadow-glow">DOMINATE?</span>
         </h2>
         <Button variant="primary" size="xl" className="px-16 py-6 text-2xl shadow-2xl shadow-vegas-gold/20">
           START THE PILOT
         </Button>
       </div>
    </section>
  );
}
