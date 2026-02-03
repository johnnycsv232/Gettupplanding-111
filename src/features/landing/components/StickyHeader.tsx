'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

/**
 * StickyHeader
 * A persistent navigation header that appears on scroll.
 */
export const StickyHeader = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 100);
    setShowCTA(latest > 600);
  });

  const navLinks = [
    { name: 'Arsenal', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Pilot', href: '#pilot' },
  ];

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-[100] transition-all duration-500',
        isScrolled
          ? 'bg-deep-void/80 border-b border-white/5 py-4 backdrop-blur-md'
          : 'bg-transparent py-8',
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex size-8 rotate-45 items-center justify-center rounded-sm bg-vegas-gold transition-transform group-hover:rotate-90">
              <div className="size-4 -rotate-45 bg-black" />
            </div>
            <span className="font-display text-2xl tracking-[0.2em] text-white">GETTUPP</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-vegas-gold"
              >
                {link.name}
              </Link>
            ))}

            <AnimatePresence>
              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Button variant="primary" size="sm" className="rounded-full">
                    GET STARTED <ChevronRight size={14} />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            className="p-2 text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/5 bg-deep-void md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-6 px-4 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-2xl uppercase tracking-widest text-white hover:text-vegas-gold"
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="primary" size="lg" className="mt-4 w-full">
                JOIN THE ELITE
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
