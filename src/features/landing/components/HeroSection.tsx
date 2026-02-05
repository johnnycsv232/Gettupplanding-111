'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { useState, useRef, FormEvent } from 'react';

import { Magnetic } from '@/components/animations/Magnetic';
import { Button } from '@/components/ui';
import { saveLead } from '@/lib/leads';

interface HeroSectionProps {
  initialCity?: string;
  initialCountry?: string;
}

/**
 * HeroSection
 * High-performance cinematic hero with video background, SEO schema, and WCAG accessibility.
 */
export const HeroSection = ({ initialCity = '', initialCountry = '' }: HeroSectionProps) => {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(initialCity);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await saveLead({
        email,
        city,
        country: initialCountry,
        source: 'hero_zenith',
      });
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
      ref={targetRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-32"
    >
      {/* Visual SEO: JSON-LD for Video Object */}
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
            thumbnailUrl: 'https://gettupp.com/images/hero_thumb.jpg', // Placeholder fallback
          }),
        }}
      />

      {/* Cinematic Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-black/60" /> {/* Contrast Overlay */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none" // Performance optimization
          className="h-full w-full object-cover opacity-60 motion-reduce:hidden md:opacity-100" // A11y: Hide on reduced motion
          aria-label={videoTitle}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Fallback for Reduced Motion / No Video support */}
        <div
          className="hidden h-full w-full bg-black motion-reduce:block"
          role="img"
          aria-label="Dark cinematic background"
        />
      </div>

      <motion.div className="container relative z-10 mx-auto px-4" style={{ opacity, y }}>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="border-vegas-gold/30 bg-vegas-gold/5 inline-block rounded-full border px-4 py-1 text-[10px] font-black uppercase tracking-[0.5em] text-vegas-gold">
              Elite Nightlife Production
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mb-8 text-6xl font-black uppercase leading-none tracking-tighter text-white md:text-[8rem]"
          >
            WE CAPTURE <br />
            <span className="text-shadow-glow text-vegas-gold">THE VIBE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-off-white/60 mx-auto mb-12 max-w-2xl text-lg uppercase tracking-widest md:text-xl"
          >
            Cinema-grade content for the world&apos;s most exclusive nightlife destinations. From
            table side to sunrise.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="relative mx-auto flex max-w-lg items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-xl"
          >
            {isSuccess ? (
              <div className="flex h-12 w-full items-center justify-center text-sm font-black tracking-widest text-vegas-gold">
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
                  className="h-10 flex-1 border-none bg-transparent text-sm text-white outline-none placeholder:text-white/40 focus:ring-0"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <div className="h-6 w-px bg-white/20" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="h-10 flex-1 border-none bg-transparent text-sm text-white outline-none placeholder:text-white/40 focus:ring-0"
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
          {error && <p className="mt-4 text-xs font-medium text-red-500">{error}</p>}
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
};
