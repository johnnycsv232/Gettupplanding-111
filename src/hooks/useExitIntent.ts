'use client';

import { useEffect, useState } from 'react';

export function useExitIntent(delay = 45000) {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const shownInSession = sessionStorage.getItem('exit-intent-shown');
    if (shownInSession) {
      setTimeout(() => setHasShown(true), 0);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        // User moved mouse out of the top of the viewport
        setShowExitIntent(true);
        setHasShown(true);
        sessionStorage.setItem('exit-intent-shown', 'true');
      }
    };

    // Also trigger on delay
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('exit-intent-shown')) {
        setShowExitIntent(true);
        setHasShown(true);
        sessionStorage.setItem('exit-intent-shown', 'true');
      }
    }, delay);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasShown, delay]);

  const closeExitIntent = () => setShowExitIntent(false);

  return { showExitIntent, closeExitIntent };
}
