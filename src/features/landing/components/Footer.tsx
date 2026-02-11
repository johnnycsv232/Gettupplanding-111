'use client';

import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';

/**
 * Footer
 * Conversion-safe footer with valid in-page anchors.
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-void py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(212,175,55,0.12),transparent_46%)]" />
      <div className="container relative mx-auto px-4">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-7">
            <Link href="#home" className="group flex items-center gap-3">
              <div className="flex size-8 rotate-45 items-center justify-center rounded-sm bg-vegas-gold transition-transform group-hover:rotate-90">
                <div className="size-4 -rotate-45 bg-black" />
              </div>
              <span className="font-display text-2xl tracking-[0.2em] text-white">GETTUPP</span>
            </Link>
            <p className="text-off-white/[0.48] max-w-xs text-sm leading-relaxed">
              Cinema-grade nightlife production built for luxury venues that need faster demand and
              stronger social proof.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, index) => (
                <button
                  key={index}
                  className="hover:border-vegas-gold/40 rounded-md border border-white/10 p-2 text-white/[0.34] transition-colors hover:text-vegas-gold"
                  aria-label="Open social channel"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h4 className="font-display text-xs font-black uppercase tracking-[0.24em] text-white">
              Explore
            </h4>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-[0.16em] text-white/[0.5]">
              <li>
                <Link href="#services" className="transition-colors hover:text-vegas-gold">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#pilot" className="transition-colors hover:text-vegas-gold">
                  Pilot Offer
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="transition-colors hover:text-vegas-gold">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#proof" className="transition-colors hover:text-vegas-gold">
                  Results
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="font-display text-xs font-black uppercase tracking-[0.24em] text-white">
              Company
            </h4>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-[0.16em] text-white/[0.5]">
              <li>
                <Link href="#" className="transition-colors hover:text-vegas-gold">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-vegas-gold">
                  Partner Program
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-vegas-gold">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="font-display text-xs font-black uppercase tracking-[0.24em] text-white">
              Legal
            </h4>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-[0.16em] text-white/[0.5]">
              <li>
                <Link href="#" className="transition-colors hover:text-vegas-gold">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-vegas-gold">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-vegas-gold">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 md:flex-row">
          <p className="text-[10px] font-black uppercase tracking-[0.32em] text-white/[0.34]">
            © {currentYear} GETTUPP ZENITH. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-7 text-[10px] font-black uppercase tracking-[0.2em] text-white/[0.34]">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              Systems Online
            </div>
            <span>
              Built by <span className="text-vegas-gold">Antigravity</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
