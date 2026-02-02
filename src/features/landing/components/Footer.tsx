'use client';

import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

/**
 * Footer
 * The application footer with links, branding, and legal information.
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-void border-t border-white/5 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-20 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-8">
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-8 w-8 rotate-45 items-center justify-center rounded-sm bg-vegas-gold transition-transform group-hover:rotate-90">
                <div className="h-4 w-4 -rotate-45 bg-black" />
              </div>
              <span className="font-display text-2xl tracking-[0.2em] text-white">GETTUPP</span>
            </Link>
            <p className="text-off-white/40 max-w-xs text-sm leading-relaxed">
              Cinema-grade nightlife production for the digital age. GettUpp is a global collective
              of creators redefining how luxury nightlife is experienced online.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <button key={i} className="text-white/20 transition-colors hover:text-vegas-gold">
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">Production</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/40">
              <li>
                <Link href="#services" className="hover:text-vegas-gold">
                  Arsenal
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-vegas-gold">
                  Showcase
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-vegas-gold">
                  Retainers
                </Link>
              </li>
              <li>
                <Link href="#pilot" className="hover:text-vegas-gold">
                  Pilot Program
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">Company</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/40">
              <li>
                <Link href="#" className="hover:text-vegas-gold">
                  About Zenith
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-vegas-gold">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-vegas-gold">
                  Partner Network
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-vegas-gold">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">Legal</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/40">
              <li>
                <Link href="#" className="hover:text-vegas-gold">
                  Privacy Protocol
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-vegas-gold">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-vegas-gold">
                  License Agreement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-8 md:flex-row">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
            © {currentYear} GETTUPP ZENITH. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              Systems Online
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-white/20">
              Built by <span className="text-vegas-gold">Antigravity</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
