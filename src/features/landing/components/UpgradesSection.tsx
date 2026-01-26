'use client';

import { Plus } from 'lucide-react';

const upgrades = [
  { name: 'Drone Coverage', price: '+$150' },
  { name: 'Same Day Edit', price: '+$200' },
  { name: 'Raw Footage', price: '+$300' },
  { name: 'Extra Shooter', price: '+$350' },
];

export default function UpgradesSection() {
  return (
    <section className="py-12 bg-deep-void-black border-b border-white/5">
      <div className="container mx-auto px-4">
        <h3 className="font-display text-2xl text-center text-white mb-8">UPGRADES</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {upgrades.map((u, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:border-vegas-gold/50 transition-colors">
              <Plus size={16} className="text-vegas-gold" />
              <span className="text-white font-bold">{u.name}</span>
              <span className="text-white/50">{u.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
