'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 bg-black border-t border-white/10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/" className="font-display text-2xl text-off-white tracking-widest">
          GETTUPP<span className="text-vegas-gold">ENT</span>
        </Link>
        
        <div className="text-off-white/40 text-sm">
          &copy; {new Date().getFullYear()} GETTUPP ENTERTAINMENT. ALL RIGHTS RESERVED.
        </div>

        <div className="flex gap-6 text-sm text-off-white/60">
           <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
           <Link href="#" className="hover:text-white transition-colors">TikTok</Link>
           <Link href="#" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
