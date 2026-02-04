'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-2xl font-bold text-vegas-gold">Something went wrong!</h2>
      <p className="text-off-white/70 max-w-md">
        We encountered an unexpected error. Our team has been notified.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-vegas-gold px-6 py-2 font-bold text-black transition-transform hover:scale-105"
      >
        Try again
      </button>
    </div>
  );
}
