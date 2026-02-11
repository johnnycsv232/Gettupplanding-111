'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useState, useRef, FormEvent } from 'react';

import { Magnetic } from '@/components/animations/Magnetic';
import { Button } from '@/components/ui';
import { saveLead } from '@/lib/leads';

interface HeroSectionProps {
  initialCity?: string;
  initialCountry?: string;
}

const credibilityStats = [
  { value: '24HR', label: 'Delivery SLA' },
  { value: '4.9/5', label: 'Client Score' },
  { value: '350+', label: 'Campaigns Directed' },
];

/**
 * HeroSection
 * High-conversion hero with focused value proposition and lead capture.
 */
export const HeroSection = ({ initialCity = '', initialCountry = '' }: HeroSectionProps) => {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(initialCity);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.08]);
  const y = useTransform(scrollYProgress, [0, 0.45], [0, 120]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await saveLead({
        email,
        city,
        country: initialCountry,
        source: 'hero_zenith',
      });

      if (!result.success) {
        setError('Connection failed. Please try again.');
        return;
      }

      setIsSuccess(true);
    } catch {
      setError('Connection failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const videoUrl = '/videos/A_macro_productreveal_1080p_202601121922.mp4';
  const videoTitle = 'GettUpp Product Reveal';
  const videoDesc = 'Cinematic reveal of the GettUpp nightlife experience.';

  return (
    <section
      id="home"
      ref={targetRef}
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 md:pb-24 md:pt-36"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: videoTitle,
            description: videoDesc,
            contentUrl: `https://gettupp.com${videoUrl}`,
            uploadDate: '2026-01-12T19:22:00Z',
            thumbnailUrl: 'https://gettupp.com/images/hero_thumb.jpg',
          }),
        }}
      />

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.22),transparent_45%)]" />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(5,5,5,0.35)_0%,rgba(5,5,5,0.82)_55%,rgba(5,5,5,0.95)_100%)]" />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="size-full object-cover opacity-60 motion-reduce:hidden md:opacity-90"
          aria-label={videoTitle}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div
          className="hidden size-full bg-black motion-reduce:block"
          role="img"
          aria-label="Dark cinematic background"
        />
      </div>

      <motion.div className="container relative z-10 mx-auto max-w-7xl" style={{ opacity, y }}>
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="brand-kicker shadow-[0_0_34px_rgba(212,175,55,0.14)]"
            >
              <Sparkles size={14} className="text-vegas-gold" />
              <span>Elite Nightlife Production</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(3.2rem,8vw,7.5rem)] font-black leading-[0.88] tracking-[-0.03em] text-white"
              >
                WE CAPTURE
                <span className="text-shadow-glow block text-vegas-gold">THE VIBE.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.8 }}
                className="max-w-2xl text-lg leading-relaxed text-white/[0.78] md:text-xl"
              >
                Convert packed nights into booked tables and sold-out weekends with cinema-grade
                recap campaigns delivered in under 24 hours.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.8 }}
                className="grid max-w-xl grid-cols-3 gap-2"
              >
                {credibilityStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="liquid-glass rounded-xl border-white/10 px-3 py-4 text-center"
                  >
                    <p className="font-display text-lg font-bold tracking-[0.08em] text-vegas-gold md:text-xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/[0.55]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.85 }}
            className="glass-zenith rounded-3xl border border-white/15 p-6 shadow-[0_26px_70px_rgba(0,0,0,0.48)] md:p-8"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-premium-sm text-vegas-gold">
                  Reserve A Slot
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-[0.06em] text-white md:text-3xl">
                  Apply for your pilot shoot
                </h2>
              </div>
              <ShieldCheck className="shrink-0 text-vegas-gold" size={24} />
            </div>

            <form id="lead-capture" onSubmit={handleSubmit} className="space-y-4" noValidate>
              {isSuccess ? (
                <div className="border-vegas-gold/30 bg-vegas-gold/10 rounded-2xl border px-4 py-6 text-center text-[11px] font-black uppercase tracking-[0.28em] text-vegas-gold">
                  SUCCESS. CHECK YOUR EMAIL.
                </div>
              ) : (
                <>
                  <label className="sr-only" htmlFor="hero-city-input">
                    Your City
                  </label>
                  <div className="liquid-glass focus-within:border-vegas-gold/[0.45] flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3">
                    <MapPin size={18} className="text-vegas-gold" />
                    <input
                      id="hero-city-input"
                      type="text"
                      placeholder="Your City"
                      className="focus-ring-gold h-10 flex-1 border-none bg-transparent text-sm text-white outline-none placeholder:text-white/[0.45]"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <label className="sr-only" htmlFor="hero-email-input">
                    Email Address
                  </label>
                  <div className="liquid-glass focus-within:border-vegas-gold/[0.45] rounded-2xl border border-white/10 px-4 py-3">
                    <input
                      id="hero-email-input"
                      type="email"
                      placeholder="Email Address"
                      className="focus-ring-gold h-10 w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-white/[0.45]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Magnetic strength={0.15}>
                      <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        className="w-full rounded-2xl px-6 text-sm tracking-[0.2em] sm:w-auto"
                        isLoading={isSubmitting}
                      >
                        JOIN PRIORITY LIST <ArrowRight size={16} />
                      </Button>
                    </Magnetic>
                    <a
                      href="#pricing"
                      className="focus-ring-gold inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white/[0.8] hover:border-white/40 hover:bg-white/10"
                    >
                      View Packages
                    </a>
                  </div>
                </>
              )}
            </form>

            {error && (
              <p
                role="alert"
                aria-live="polite"
                className="mt-3 text-xs font-semibold text-red-400"
              >
                {error}
              </p>
            )}

            <p className="mt-4 text-[11px] leading-relaxed text-white/[0.46]">
              We reply within 30 minutes during service hours with available pilot slots in your
              city.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
