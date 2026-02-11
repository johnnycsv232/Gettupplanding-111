'use client';

import { motion } from 'framer-motion';
import { Star, TrendingUp, Users } from 'lucide-react';

import { GlassCard } from '@/components/ui';
import { SectionBackdrop } from '@/features/landing/components/primitives/SectionBackdrop';
import { SectionIntro } from '@/features/landing/components/primitives/SectionIntro';

const testimonials = [
  {
    quote:
      'Before GettUpp, our recaps looked busy but did not convert. In 6 weeks we saw a 27% lift in high-ticket table inquiries.',
    name: 'J. Martinez',
    role: 'Marketing Director',
    venue: 'Noir District, Miami',
    metric: '+27% table inquiries',
  },
  {
    quote:
      'Their team moves fast without killing quality. We post next-day and actually see Friday demand improve by Monday.',
    name: 'A. Collins',
    role: 'General Manager',
    venue: 'Citrine Club, Chicago',
    metric: '24HR turnaround',
  },
  {
    quote:
      'The content finally matches our price point. Bookings from social increased and repeat guests mention the recap videos constantly.',
    name: 'S. Rahman',
    role: 'Owner',
    venue: 'Azura Lounge, New York',
    metric: '+32% booking intent',
  },
];

/**
 * TestimonialsSection
 * High-credibility social proof near pricing decision point.
 */
export const TestimonialsSection = () => {
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.42 } },
  };

  return (
    <section id="proof" className="relative overflow-hidden border-b border-white/5 bg-deep-void py-24 md:py-32">
      <SectionBackdrop variant="neutral" />
      <div className="container relative z-10 mx-auto px-4">
        <SectionIntro
          className="mb-14 max-w-3xl md:mb-16"
          kicker="Client Proof"
          title="RESULTS THAT"
          highlight="HOLD UP IN REVENUE"
          description="Not vanity metrics. These are venue-level outcomes from operators who care about bookings, retention, and premium perception."
          descriptionClassName="text-white/[0.66]"
        />

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-5 md:grid-cols-3 md:gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={cardVariants}>
              <GlassCard className="flex h-full flex-col gap-5 rounded-2xl p-7">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-vegas-gold">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <div className="border-vegas-gold/30 bg-vegas-gold/10 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-vegas-gold">
                    {testimonial.metric}
                  </div>
                </div>

                <p className="flex-1 text-sm leading-relaxed text-white/[0.78]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80">
                      <Users size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                      <p className="text-xs text-white/[0.55]">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/[0.45]">
                    <TrendingUp size={12} />
                    {testimonial.venue}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
