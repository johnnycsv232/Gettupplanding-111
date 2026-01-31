'use client';

import { motion } from 'framer-motion';
import ParticleField from '@/components/three/ParticleField';
import Button from '@/components/ui/Button';
import { ArrowRight, MapPin } from 'lucide-react';
import { useState } from 'react';
import { saveLead } from '@/lib/leads';
import Image from 'next/image';
import { tokens } from '@/styles/tokens';

export default function HeroSection() {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-deep-void-black">
      {/* Background Video with Poster Optimization */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/assets/hero-poster.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/assets/hero-poster.jpg"
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-deep-void-black/20 via-deep-void-black/50 to-deep-void-black" />
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080808_90%)]" />
      </div>

      {/* Particle Field */}
      <ParticleField
        count={tokens.config3d.hero.count}
        color={tokens.colors.gold}
        speed={tokens.config3d.hero.speed}
        size={tokens.config3d.hero.size}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex flex-col items-center gap-6 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="space-y-2"
        >
          <h1 className="text-shadow-glow bg-gradient-to-b from-white via-vegas-gold to-vegas-gold/50 bg-clip-text font-display text-6xl tracking-tighter text-transparent md:text-8xl lg:text-9xl">
            OWN THE NIGHT
          </h1>
          <p className="font-sans text-xl uppercase tracking-[0.5em] text-off-white md:text-2xl">
            Minneapolis Royalty
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100, damping: 20 }}
          className="max-w-xl text-lg font-light text-off-white/80"
        >
          The uniform of the Minneapolis night. Premium content. Real ROI. Zero excuses.
        </motion.p>

        {/* Lead Gen Form */}
        <div className="w-full max-w-md space-y-4">
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
            onSubmit={handleSubmit}
            className="box-glow-gold flex w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-md"
          >
            {isSubmitted ? (
              <div className="flex-1 animate-pulse py-2 font-display text-lg text-vegas-gold">
                ACCESS GRANTED. CHECK YOUR EMAIL.
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
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  className="whitespace-nowrap rounded-full px-6"
                  isLoading={isSubmitting}
                >
                  JOIN <ArrowRight size={16} />
                </Button>
              </>
            )}
          </motion.form>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium text-red-500"
            >
              {error}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 animate-pulse text-xs uppercase tracking-widest text-white/30"
        >
          Scroll to Explore
        </motion.div>
      </div>
    </section>
  );
}
