import React from 'react';

export default function TestThemePage() {
  return (
    <div className="min-h-screen bg-deep-void-black p-10 flex flex-col gap-8">
      <h1 className="font-display text-6xl text-vegas-gold">
        Theme Verification: Liquid Glass
      </h1>
      
      <section className="space-y-4">
        <h2 className="font-sans text-2xl text-off-white font-bold">Colors</h2>
        <div className="flex gap-4">
          <div className="w-32 h-32 bg-vegas-gold flex items-center justify-center text-black font-bold">Vegas Gold</div>
          <div className="w-32 h-32 bg-neon-magenta flex items-center justify-center text-white font-bold">Neon Magenta</div>
          <div className="w-32 h-32 bg-electric-cyan flex items-center justify-center text-black font-bold">Electric Cyan</div>
          <div className="w-32 h-32 bg-deep-void-black border border-white flex items-center justify-center text-off-white font-bold">Deep Void Black</div>
          <div className="w-32 h-32 bg-off-white flex items-center justify-center text-black font-bold">Off White</div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-sans text-2xl text-off-white font-bold">Typography</h2>
        <div className="space-y-2">
          <p className="font-display text-4xl text-white">Bebas Neue: THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG</p>
          <p className="font-sans text-xl text-off-white">Inter Regular: The quick brown fox jumps over the lazy dog.</p>
          <p className="font-sans text-xl text-off-white font-bold">Inter Bold: The quick brown fox jumps over the lazy dog.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-sans text-2xl text-off-white font-bold">Liquid Glass Effect</h2>
        <div className="w-full h-64 bg-gradient-to-r from-neon-magenta to-electric-cyan relative flex items-center justify-center">
           <div className="liquid-glass p-8 rounded-xl text-white font-display text-4xl">
              Glassmorphism Card
           </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="font-sans text-2xl text-off-white font-bold">Glow Effects</h2>
        <div className="flex gap-8">
            <div className="p-4 border border-vegas-gold text-vegas-gold box-glow-gold rounded">
                Gold Glow
            </div>
            <div className="p-4 border border-neon-magenta text-neon-magenta box-glow-magenta rounded">
                Magenta Glow
            </div>
        </div>
      </section>
    </div>
  );
}
