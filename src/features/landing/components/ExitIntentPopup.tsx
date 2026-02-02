'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button, Modal } from '@/components/ui';
import { useExitIntent } from '@/hooks/useExitIntent';
import { saveLead } from '@/lib/leads';

/**
 * ExitIntentPopup
 * A modal that triggers when a user attempts to leave the page,
 * offering a high-value lead magnet.
 */
export const ExitIntentPopup = () => {
  const { showExitIntent, closeExitIntent } = useExitIntent();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const result = await saveLead({
      email,
      source: 'exit_intent',
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      setTimeout(() => {
        closeExitIntent();
      }, 3000);
    } else {
      setError(typeof result.error === 'string' ? result.error : 'Something went wrong');
    }
  };

  return (
    <Modal
      isOpen={showExitIntent}
      onClose={closeExitIntent}
      className="box-glow-gold border-vegas-gold/50 bg-deep-void-black border p-8 text-center"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="box-glow-gold bg-vegas-gold/10 flex h-16 w-16 items-center justify-center rounded-full text-vegas-gold">
          <Sparkles size={32} />
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-4xl uppercase text-white">The VIP Entrance</h2>
          <p className="text-off-white/80 mx-auto max-w-xs">
            Join the inner circle. Get exclusive content and a free 5-point content audit instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {isSubmitted ? (
            <div className="font-display animate-pulse py-4 text-xl text-vegas-gold">
              ACCESS GRANTED.
            </div>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-vegas-gold focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
                type="submit"
              >
                GET VIP ACCESS
              </Button>
            </>
          )}
        </form>

        <button
          onClick={closeExitIntent}
          className="text-xs uppercase tracking-widest text-white/30 hover:text-white"
        >
          No thanks, I hate money.
        </button>
      </div>
    </Modal>
  );
};
