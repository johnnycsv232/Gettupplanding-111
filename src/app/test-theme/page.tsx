'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import Modal from '@/components/ui/Modal';
import ParticleField from '@/components/three/ParticleField';

export default function TestThemePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-deep-void-black p-10 flex flex-col gap-8 relative overflow-hidden">
      <ParticleField />
      
      <div className="relative z-10 space-y-12">
        <h1 className="font-display text-6xl text-vegas-gold">
          Theme Verification: V3 Phase 2
        </h1>
        
        <section className="space-y-4">
          <h2 className="font-sans text-2xl text-off-white font-bold underline decoration-neon-magenta underline-offset-8">UI Components: Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Vegas Gold</Button>
            <Button variant="neon">Neon Magenta</Button>
            <Button variant="secondary">Secondary Outline</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="primary" isLoading>Loading State</Button>
            <Button variant="neon" size="xl">XL CTA Button</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-sans text-2xl text-off-white font-bold underline decoration-electric-cyan underline-offset-8">UI Components: Glass Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6" intensity="low">
              <h3 className="text-vegas-gold font-display text-xl mb-2">Low Intensity</h3>
              <p className="text-off-white/70">Subtle backdrop blur and borders.</p>
            </GlassCard>
            <GlassCard className="p-6" intensity="medium">
              <h3 className="text-vegas-gold font-display text-xl mb-2">Medium Intensity</h3>
              <p className="text-off-white/70">Our standard "Liquid Glass" effect.</p>
            </GlassCard>
            <GlassCard className="p-6" intensity="high" hoverEffect>
              <h3 className="text-vegas-gold font-display text-xl mb-2">High + Hover</h3>
              <p className="text-off-white/70">Maximum blur and motion interactions.</p>
            </GlassCard>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-sans text-2xl text-off-white font-bold underline decoration-vegas-gold underline-offset-8">UI Components: Modal</h2>
          <div>
            <Button variant="neon" onClick={() => setIsModalOpen(true)}>
              Open Velvet Rope Modal
            </Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="p-10 text-center">
                <h2 className="font-display text-4xl text-vegas-gold mb-4 uppercase">The Velvet Rope</h2>
                <p className="text-off-white mb-8">
                  You're about to enter the inner circle. Join the elite who command the screen.
                </p>
                <div className="flex flex-col gap-4">
                  <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="bg-white/5 border border-white/10 p-4 text-white focus:border-vegas-gold outline-none transition-colors"
                  />
                  <Button variant="primary" size="lg">CLAIM YOUR SPOT</Button>
                </div>
              </div>
            </Modal>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-sans text-2xl text-off-white font-bold">Base Styles Check</h2>
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-vegas-gold rounded-full" />
            <div className="w-20 h-20 bg-neon-magenta rounded-full" />
            <div className="w-20 h-20 bg-electric-cyan rounded-full" />
          </div>
        </section>
      </div>
    </div>
  );
}
