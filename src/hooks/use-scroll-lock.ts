'use client';

import { useEffect, useCallback } from 'react';

/**
 * useScrollLock
 * Hook to lock/unlock body scroll.
 */
export const useScrollLock = (lock: boolean) => {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = 'var(--scrollbar-width, 0px)'; // Prevent layout shift
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  useEffect(() => {
    if (lock) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll();
  }, [lock, lockScroll, unlockScroll]);
};
