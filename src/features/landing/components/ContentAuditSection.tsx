'use client';

import Button from '@/components/ui/Button';

export default function ContentAuditSection() {
  return (
    <section className="py-12 bg-black border-y border-white/5">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-display text-white mb-4">NOT READY FOR THE PILOT?</h3>
        <p className="text-off-white/60 mb-6 max-w-xl mx-auto">
          Get a comprehensive 5-point audit of your current social presence. We&apos;ll tell you exactly why you&apos;re losing money.
        </p>
        <Button variant="secondary" size="sm">
          GET THE AUDIT ($300)
        </Button>
      </div>
    </section>
  );
}
