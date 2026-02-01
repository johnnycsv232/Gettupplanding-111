'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Play } from 'lucide-react';
import ThreeHero from './ThreeHero';
import Button from '@/components/ui/Button';
import { saveLead } from '@/lib/leads';
import Magnetic from '@/components/animations/Magnetic';

interface HeroSectionProps {
  initialCity?: string;
  initialCountry?: string;
}

export default function HeroSection({ initialCity, initialCountry }: HeroSectionProps) {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(initialCity || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await saveLead({ email, city, source: 'hero' });

    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
      setEmail('');
      setCity('');
    } else {
      setError(typeof result.error === 'string' ? result.error : 'Something went wrong');
    }
  };

  const titleWords = 'OWN THE'.split(' ');

  return (
    <section
      ref={containerRef}
      className="bg-deep-void relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* 3D Refractive Hero & Video Background */}
      <ThreeHero />

      {/* Hero Content Area */}
      <motion.div
        style={{ y, opacity, scale }}
        className="container relative z-10 mx-auto px-4 pt-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col items-center justify-center gap-6"
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block rounded-full border border-vegas-gold/30 bg-vegas-gold/[0.05] px-8 py-3 text-[12px] font-black uppercase tracking-[0.5em] text-vegas-gold shadow-[0_0_30px_rgba(212,175,55,0.2)] backdrop-blur-2xl"
          >
            THE NEW STANDARD OF CONTENT
          </motion.span>

          <div className="flex flex-col items-center gap-2">
            {/* Main Headline */}
            <h1 className="flex flex-col items-center leading-[0.85] tracking-tighter text-white">
              <div className="flex gap-4 overflow-hidden py-2">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    className="heading-zenith inline-block text-[70px] md:text-[120px] lg:text-[160px]"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }}
                className="agency-serif -mt-4 mb-8 text-[90px] text-vegas-gold md:text-[160px] lg:text-[220px]"
              >
                NIGHT
              </motion.div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="text-premium-sm mx-auto mb-12 max-w-xl text-lg font-light leading-relaxed text-off-white/40 md:text-xl"
            >
              The world&apos;s most exclusive nightlife content ecosystem.{' '}
              <br className="hidden md:block" />
              Designed for those who lead the scene.
            </motion.p>
          </div>
        </motion.div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mb-12 flex items-center justify-center gap-8 text-[12px] font-bold uppercase tracking-widest text-white/40"
        >
          <div className="flex items-center gap-2">
            <span className="text-vegas-gold">📈</span> 79.7K+ REACH
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neon-magenta">🔥</span> 32% ENGAGEMENT LIFT
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.3}>
            <Button
              variant="primary"
              size="lg"
              className="box-glow-gold group relative min-w-[200px] overflow-hidden rounded-full font-bold"
              onClick={() => {
                document.getElementById('pilot')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                START THE PILOT <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform group-hover:translate-x-0" />
            </Button>
          </Magnetic>

          <Magnetic strength={0.2}>
            <Button
              variant="ghost"
              size="lg"
              className="flex items-center gap-2 rounded-full border border-white/10 text-white backdrop-blur-md"
              onClick={() => {
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Play size={18} /> VIEW WORK
            </Button>
          </Magnetic>
        </motion.div>

        {/* Lead Form - Semi-transparent Glass */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3 }}
            onSubmit={handleSubmit}
            className="glass-heavy flex w-full max-w-xl items-center gap-3 rounded-full border-white/20 p-2"
          >
            {isSubmitted ? (
              <div className="flex-1 px-4 py-2 text-sm font-bold text-vegas-gold">
                SUCCESS. CHECK YOUR EMAIL.
              </div>
            ) : (
              <>
                <div className="pl-4 text-vegas-gold">
                  <MapPin size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Your City"
                  className="h-10 flex-1 border-none bg-transparent text-sm text-white placeholder-white/40 outline-none focus:ring-0"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <div className="h-6 w-px bg-white/20" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="h-10 flex-1 border-none bg-transparent text-sm text-white placeholder-white/40 outline-none focus:ring-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <Magnetic strength={0.2}>
                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    className="whitespace-nowrap rounded-full px-6"
                    isLoading={isSubmitting}
                  >
                    JOIN <ArrowRight size={16} />
                  </Button>
                </Magnetic>
              </>
            )}
          </motion.form>
          {error && <p className="text-xs font-medium text-red-500">{error}</p>}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-[10px] uppercase tracking-[0.3em] text-white/20"
        >
          Scroll to Explore
        </motion.div>
      </motion.div>
    </section>
  );
}
