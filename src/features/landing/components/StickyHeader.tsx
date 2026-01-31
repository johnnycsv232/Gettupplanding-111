'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function StickyHeader() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
    setShowCTA(latest > 600); // Assume Hero is ~800px, show CTA when scrolled past
  });

  return (
    <motion.header
      className={cn(
        'fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-300',
        isScrolled ? 'liquid-glass py-3' : 'bg-transparent'
      )}
    >
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="font-display text-2xl tracking-widest text-off-white transition-colors hover:text-vegas-gold"
        >
          GETTUPP<span className="text-vegas-gold">ENT</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Navigation could go here */}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{
            opacity: showCTA ? 1 : 0,
            x: showCTA ? 0 : 20,
            pointerEvents: showCTA ? 'auto' : 'none',
          }}
          transition={{ duration: 0.3 }}
        >
          <Link href="#pricing">
            <Button variant="primary" size="sm">
              Start The Pilot
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}
