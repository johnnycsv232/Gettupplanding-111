'use client';

import Button from '@/components/ui/Button';

export default function GettuppGirlsSection() {
  return (
    <section className="py-24 bg-deep-void-black border-y border-neon-magenta/20 relative overflow-hidden">
       {/* Ambient Glow */}
       <div className="absolute top-0 right-0 w-1/2 h-full bg-neon-magenta/5 blur-[100px] pointer-events-none" />

       <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
         <div className="space-y-6">
           <h2 className="font-display text-5xl text-white">
             GETTUPP <span className="text-neon-magenta text-shadow-neon">GIRLS</span>
           </h2>
           <p className="text-off-white/80 text-lg">
             The face of the brand. We source, cast, and manage premium talent for your venue. 
             Models. Bottle Service. Atmosphere.
           </p>
           <Button variant="neon" className="bg-transparent border-neon-magenta text-neon-magenta hover:bg-neon-magenta hover:text-white">
             VIEW ROSTER
           </Button>
         </div>
         
         <div className="grid grid-cols-2 gap-4">
           {[1, 2, 3, 4].map((i) => (
             <div key={i} className={`bg-white/5 rounded-lg aspect-[3/4] border border-neon-magenta/20 ${i % 2 === 0 ? 'translate-y-8' : ''}`}>
               {/* Placeholder for Model Images */}
               <div className="w-full h-full bg-gradient-to-br from-neon-magenta/10 to-transparent" />
             </div>
           ))}
         </div>
       </div>
    </section>
  );
}
