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
      <div className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-8 lg:flex">
        {socialLinks.slice(0, 2).map((social, i) => (
          <motion.a
            key={social.name}
            href={social.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            whileHover={{ scale: 1.2, color: '#FFC72C' }}
            className="group relative p-2 text-white/40 transition-colors hover:text-vegas-gold"
          >
            <social.icon size={20} />
            <div className="absolute inset-0 bg-vegas-gold/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />

            {/* Tooltip */}
            <span className="pointer-events-none absolute left-full ml-4 whitespace-nowrap bg-vegas-gold px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black opacity-0 transition-opacity group-hover:opacity-100">
              {social.name}
            </span>
          </motion.a>
        ))}
        <div className="mx-auto mt-4 h-24 w-px bg-gradient-to-b from-vegas-gold/50 to-transparent" />
      </div>

      <footer className="relative border-t border-white/5 bg-black py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 grid gap-12 md:grid-cols-4">
            <div className="col-span-2 space-y-8">
              <Link
                href="/"
                className="group inline-block font-display text-4xl tracking-widest text-white"
              >
                GETTUPP
                <span className="text-vegas-gold transition-colors group-hover:text-white">
                  ENT
                </span>
              </Link>
              <p className="max-w-sm font-light italic leading-relaxed text-off-white/40">
                Defining the pinnacle of nightlife production. We don&apos;t just capture the night;
                we own the vision. Premium content for elite venues worldwide.
              </p>
            </div>

            <div>
              <h4 className="mb-6 font-display text-lg tracking-widest text-white">NAVIGATION</h4>
              <ul className="space-y-4 text-sm text-off-white/40">
                <li>
                  <Link href="#" className="transition-colors hover:text-vegas-gold">
                    THE PILOT
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-vegas-gold">
                    RETAINERS
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-vegas-gold">
                    THE WORK
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-vegas-gold">
                    CONTACT
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-display text-lg tracking-widest text-white">LEGAL</h4>
              <ul className="space-y-4 text-sm text-off-white/40">
                <li>
                  <Link href="#" className="transition-colors hover:text-vegas-gold">
                    PRIVACY POLICY
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-vegas-gold">
                    TERMS OF SERVICE
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-vegas-gold">
                    BOOKING RULES
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
            <div className="font-mono text-[10px] uppercase tracking-widest text-off-white/20">
              &copy; {new Date().getFullYear()} GETTUPP ENTERTAINMENT. ALL RIGHTS RESERVED.
            </div>

            <div className="flex gap-8">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-off-white/30 transition-colors hover:text-white"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>

            <div className="hidden font-mono text-[10px] uppercase tracking-widest text-off-white/20 md:block">
              DESIGNED BY ELITE AGENTS
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
