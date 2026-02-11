'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

/**
 * StickyHeader
 * Premium sticky nav with clear conversion anchors.
 */
export const StickyHeader = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 64);
    setShowCTA(latest > 360);
  });

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Pilot', href: '#pilot' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Proof', href: '#proof' },
  ];

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[100] transition-all duration-500',
        isScrolled
          ? 'bg-deep-void/[0.78] border-b border-white/10 py-3 backdrop-blur-[20px]'
          : 'bg-gradient-to-b from-black/[0.68] via-black/[0.24] to-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'flex items-center justify-between gap-4 transition-all duration-500',
            isScrolled && 'glass-light rounded-2xl border border-white/10 px-4 py-3 md:px-5'
          )}
        >
          <Link href="#home" className="group flex items-center gap-3">
            <div className="flex size-9 rotate-45 items-center justify-center rounded-md bg-vegas-gold transition-transform group-hover:rotate-[100deg]">
              <div className="size-4 -rotate-45 bg-black" />
            </div>
            <div>
              <span className="block font-display text-lg tracking-[0.24em] text-white">
                GETTUPP
              </span>
              <span className="block text-[9px] uppercase tracking-[0.24em] text-white/[0.52]">
                Nightlife Growth Studio
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-display text-[10px] font-black uppercase tracking-[0.24em] text-white/[0.62] transition-colors hover:text-vegas-gold"
              >
                {link.name}
              </Link>
            ))}

            <AnimatePresence>
              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                >
                  <Button
                    asChild
                    variant="primary"
                    size="sm"
                    className="rounded-full px-5 py-2 text-[10px] tracking-[0.22em]"
                  >
                    <a href="#lead-capture">
                      Reserve Pilot <ChevronRight size={14} />
                    </a>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          <button
            className="rounded-md p-2 text-white/[0.92] lg:hidden"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/10 bg-black/[0.9] backdrop-blur-2xl lg:hidden"
          >
            <div className="container mx-auto flex flex-col gap-5 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-lg uppercase tracking-[0.18em] text-white hover:text-vegas-gold"
                >
                  {link.name}
                </Link>
              ))}
              <Button
                asChild
                variant="primary"
                size="md"
                className="mt-1 rounded-2xl text-[11px] tracking-[0.2em]"
              >
                <a href="#lead-capture" onClick={() => setIsMobileMenuOpen(false)}>
                  Reserve Pilot Slot
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
