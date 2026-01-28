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
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-deep-void-black">
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
          className="absolute inset-0 w-full h-full object-cover"
          poster="/assets/hero-poster.jpg"
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-deep-void-black/20 via-deep-void-black/50 to-deep-void-black" />
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080808_90%)]" />
      </div>

      {/* Particle Field */}
      <ParticleField count={150} color={tokens.colors.gold} speed={0.3} size={1.5} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center gap-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="space-y-2"
        >
          <h2 className="text-xl md:text-2xl tracking-[0.5em] text-off-white uppercase font-sans">
            Minneapolis Royalty
          </h2>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-vegas-gold to-vegas-gold/50 text-shadow-glow">
            OWN THE NIGHT
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100, damping: 20 }}
          className="max-w-xl text-lg text-off-white/80 font-light"
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
            className="w-full p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2 box-glow-gold"
          >
            {isSubmitted ? (
              <div className="flex-1 py-2 text-vegas-gold font-display text-lg animate-pulse">
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
                  className="bg-transparent border-none text-white placeholder-white/40 focus:ring-0 flex-1 h-10 outline-none text-sm"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <div className="w-px h-6 bg-white/20" />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-transparent border-none text-white placeholder-white/40 focus:ring-0 flex-1 h-10 outline-none text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <Button variant="primary" size="sm" type="submit" className="rounded-full px-6 whitespace-nowrap" isLoading={isSubmitting}>
                  JOIN <ArrowRight size={16} />
                </Button>
              </>
            )}
          </motion.form>
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm font-medium"
            >
              {error}
            </motion.p>
          )}
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1 }}
           className="absolute bottom-8 text-xs text-white/30 uppercase tracking-widest animate-pulse"
        >
          Scroll to Explore
        </motion.div>
      </div>
    </section>
  );
}
