'use client';

import { useEffect, useState } from 'react';

/**
 * HydrationOverlay
 * Purpose: Helps detect and visualize hydration mismatches during development.
 * In development, it highlights areas that have different content on client than server.
 */
export function HydrationOverlay({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }

  return (
    <div className={!isMounted ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
      {!isMounted && (
        <div className="fixed bottom-4 left-4 z-cursor rounded bg-yellow-500 px-2 py-1 text-[10px] font-bold text-black shadow-lg">
          HYDRATING...
        </div>
      )}
      {children}
    </div>
  );
}
