'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Send } from 'lucide-react';

const socialLinks = [
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'TikTok', href: '#', icon: Send }, // Using Send as a placeholder for TikTok
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'YouTube', href: '#', icon: Youtube },
];

export default function Footer() {
  return (
    <>
      {/* Sticky Socials - Left Side */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8">
        {socialLinks.slice(0, 2).map((social, i) => (
          <motion.a
            key={social.name}
            href={social.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            whileHover={{ scale: 1.2, color: '#FFC72C' }}
            className="text-white/40 hover:text-vegas-gold transition-colors p-2 relative group"
          >
            <social.icon size={20} />
            <div className="absolute inset-0 bg-vegas-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Tooltip */}
            <span className="absolute left-full ml-4 px-2 py-1 bg-vegas-gold text-black text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {social.name}
            </span>
          </motion.a>
        ))}
        <div className="w-px h-24 bg-gradient-to-b from-vegas-gold/50 to-transparent mx-auto mt-4" />
      </div>

      <footer className="py-24 bg-black border-t border-white/5 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 space-y-8">
              <Link href="/" className="font-display text-4xl text-white tracking-widest inline-block group">
                GETTUPP<span className="text-vegas-gold group-hover:text-white transition-colors">ENT</span>
              </Link>
              <p className="text-off-white/40 max-w-sm leading-relaxed font-light italic">
                Defining the pinnacle of nightlife production. We don&apos;t just capture the night; we own the vision. 
                Premium content for elite venues worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-white font-display text-lg mb-6 tracking-widest">NAVIGATION</h4>
              <ul className="space-y-4 text-off-white/40 text-sm">
                <li><Link href="#" className="hover:text-vegas-gold transition-colors">THE PILOT</Link></li>
                <li><Link href="#" className="hover:text-vegas-gold transition-colors">RETAINERS</Link></li>
                <li><Link href="#" className="hover:text-vegas-gold transition-colors">THE WORK</Link></li>
                <li><Link href="#" className="hover:text-vegas-gold transition-colors">CONTACT</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-display text-lg mb-6 tracking-widest">LEGAL</h4>
              <ul className="space-y-4 text-off-white/40 text-sm">
                <li><Link href="#" className="hover:text-vegas-gold transition-colors">PRIVACY POLICY</Link></li>
                <li><Link href="#" className="hover:text-vegas-gold transition-colors">TERMS OF SERVICE</Link></li>
                <li><Link href="#" className="hover:text-vegas-gold transition-colors">BOOKING RULES</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-off-white/20 text-[10px] font-mono tracking-widest uppercase">
              &copy; {new Date().getFullYear()} GETTUPP ENTERTAINMENT. ALL RIGHTS RESERVED.
            </div>

            <div className="flex gap-8">
              {socialLinks.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href} 
                  className="text-off-white/30 hover:text-white transition-colors"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
            
            <div className="text-off-white/20 text-[10px] font-mono tracking-widest uppercase hidden md:block">
              DESIGNED BY ELITE AGENTS
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
