'use client';

import { motion } from 'framer-motion';

/**
 * LoadingFallback component for Suspense boundaries.
 * Features a golden shimmer and pulsing glow.
 */
export const LoadingFallback = () => {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center bg-deep-void">
      {/* Shimmer background */}
      <div
        className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
        style={{ backgroundSize: '200% 100%' }}
      />

      {/* Central glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-vegas-gold/5 size-[300px] rounded-full blur-[100px]"
      />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="h-1 w-32 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="size-full bg-[linear-gradient(to_right,transparent,rgba(212,175,55,0.5),transparent)]"
          />
        </div>
        <span className="text-vegas-gold/40 text-[10px] font-black uppercase tracking-[0.5em]">
          Initializing Zenith
        </span>
      </div>
    </div>
  );
};
