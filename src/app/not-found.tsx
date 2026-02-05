'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-deep-void text-center">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative z-10 space-y-8 p-4">
        <h1 className="font-display text-9xl font-black text-vegas-gold opacity-50 blur-sm">404</h1>
        <h2 className="font-display text-4xl uppercase tracking-widest text-white">
          Coordinates Lost
        </h2>
        <p className="mx-auto max-w-md text-white/60">
          The page you are looking for has been consumed by the void or never existed in this
          timeline.
        </p>

        <Link
          href="/"
          className="border-vegas-gold/50 bg-vegas-gold/10 inline-block rounded-full border px-8 py-3 text-sm font-bold uppercase tracking-widest text-vegas-gold transition-all hover:bg-vegas-gold hover:text-black"
        >
          Return to Base
        </Link>
      </div>
    </div>
  );
}
