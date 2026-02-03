'use client';

import { useState, useEffect } from 'react';

export function HydrationOverlay() {
  const [hydrationError, setHydrationError] = useState<string | null>(null);

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV === 'production') return;

    const originalConsoleError = console.error;

    console.error = (...args) => {
      const message = args.map((arg) => String(arg)).join(' ');

      if (
        message.includes('Hydration failed') ||
        message.includes('Text content does not match') ||
        message.includes('did not match. Server')
      ) {
        setHydrationError(message);
      }

      originalConsoleError.apply(console, args);
    };

    const handleError = (event: ErrorEvent) => {
      if (
        event.message.includes('Minified React error #418') ||
        event.message.includes('Minified React error #423')
      ) {
        setHydrationError('Hydration failed (Minified React Error)');
      }
    };

    window.addEventListener('error', handleError);

    return () => {
      console.error = originalConsoleError;
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (!hydrationError) return null;

  return (
    <div className="fixed bottom-4 right-4 z-cursor max-w-md rounded-lg border border-red-500 bg-red-900/90 p-4 text-white shadow-xl backdrop-blur-md">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-red-200">
          Hydration Error Detected
        </h3>
        <button
          onClick={() => setHydrationError(null)}
          className="text-red-300 transition-colors hover:text-white"
        >
          ✕
        </button>
      </div>
      <p className="break-words font-mono text-xs opacity-90">{hydrationError}</p>
      <div className="mt-2 text-[10px] text-red-300">Check browser console for full diff.</div>
    </div>
  );
}
