'use client';

import { useState } from 'react';

import { ParticleField } from '@/components/three/ParticleField';
import { GlassCard, Modal, Button } from '@/components/ui';

export default function TestThemePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col gap-8 overflow-hidden bg-deep-void p-10">
      <ParticleField />

      <div className="relative z-10 space-y-12">
        <h1 className="font-display text-6xl text-vegas-gold">Theme Verification: V3 Phase 2</h1>

        <section className="space-y-4">
          <h2 className="font-sans text-2xl font-bold text-off-white underline decoration-neon-magenta underline-offset-8">
            UI Components: Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Vegas Gold</Button>
            <Button variant="neon">Neon Magenta</Button>
            <Button variant="secondary">Secondary Outline</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="primary" isLoading>
              Loading State
            </Button>
            <Button variant="neon" size="xl">
              XL CTA Button
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-sans text-2xl font-bold text-off-white underline decoration-electric-cyan underline-offset-8">
            UI Components: Glass Cards
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <GlassCard className="p-6" intensity="low">
              <h3 className="mb-2 font-display text-xl text-vegas-gold">Low Intensity</h3>
              <p className="text-off-white/70">Subtle backdrop blur and borders.</p>
            </GlassCard>
            <GlassCard className="p-6" intensity="medium">
              <h3 className="mb-2 font-display text-xl text-vegas-gold">Medium Intensity</h3>
              <p className="text-off-white/70">Our standard &quot;Liquid Glass&quot; effect.</p>
            </GlassCard>
            <GlassCard className="p-6" intensity="high" hoverEffect>
              <h3 className="mb-2 font-display text-xl text-vegas-gold">High + Hover</h3>
              <p className="text-off-white/70">Maximum blur and motion interactions.</p>
            </GlassCard>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-sans text-2xl font-bold text-off-white underline decoration-vegas-gold underline-offset-8">
            UI Components: Modal
          </h2>
          <div>
            <Button variant="neon" onClick={() => setIsModalOpen(true)}>
              Open Velvet Rope Modal
            </Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="p-10 text-center">
                <h2 className="mb-4 font-display text-4xl uppercase text-vegas-gold">
                  The Velvet Rope
                </h2>
                <p className="mb-8 text-off-white">
                  You&apos;re about to enter the inner circle. Join the elite who command the
                  screen.
                </p>
                <div className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    className="border border-white/10 bg-white/5 p-4 text-white outline-none transition-colors focus:border-vegas-gold"
                  />
                  <Button variant="primary" size="lg">
                    CLAIM YOUR SPOT
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-sans text-2xl font-bold text-off-white">Base Styles Check</h2>
          <div className="flex gap-4">
            <div className="size-20 rounded-full bg-vegas-gold" />
            <div className="size-20 rounded-full bg-neon-magenta" />
            <div className="size-20 rounded-full bg-electric-cyan" />
          </div>
        </section>
      </div>
    </div>
  );
}
