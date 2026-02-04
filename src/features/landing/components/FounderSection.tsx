'use client';

import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';

/**
 * FounderSection
 * Credits the vision behind GettUpp with a personal bio and contact links.
 */
export const FounderSection = () => {
  return (
    <section className="relative overflow-hidden bg-deep-void py-32">
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-heavy relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
                alt="Founder"
                fill
                className="object-cover grayscale transition-all duration-1000 hover:grayscale-0"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-12">
                <div className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-vegas-gold">
                  Architect & Visionary
                </div>
                <h3 className="font-display text-4xl uppercase tracking-tighter text-white">
                  ALEXANDER ZENITH
                </h3>
              </div>
            </div>

            {/* Signature Element */}
            <div className="glass-medium absolute -bottom-6 -right-6 rotate-3 rounded-2xl border border-white/10 p-8">
              <span className="font-display text-2xl text-vegas-gold">AZ.</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-display text-5xl uppercase leading-none tracking-tighter text-white md:text-7xl">
                THE <span className="text-white/20">MAN</span> <br />
                BEHIND THE <span className="text-vegas-gold">LENS</span>
              </h2>
              <p className="text-off-white/40 text-xs uppercase tracking-[0.5em]">
                GettUpp Founder & Executive Producer
              </p>
            </div>

            <p className="text-off-white/60 text-lg italic leading-relaxed">
              &ldquo;We don&apos;t just record nights; we archive the culture. Every shutter click
              is an investment in your brand&apos;s digital legacy. In a world of 24-hour relevance,
              we ensure your moments live forever in the highest possible fidelity.&rdquo;
            </p>

            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="flex size-12 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-500 hover:border-vegas-gold hover:text-vegas-gold"
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>

            <div className="border-t border-white/5 pt-8">
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                Core Philosophy
              </div>
              <div className="flex flex-wrap gap-4">
                {['Zero Friction', 'Cinema First', 'Viral ROI'].map((pill) => (
                  <div
                    key={pill}
                    className="rounded-full border border-white/5 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white"
                  >
                    {pill}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
