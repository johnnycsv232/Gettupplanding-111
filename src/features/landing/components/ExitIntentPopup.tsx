'use client';

import { Sparkles, Gift, ShieldCheck } from 'lucide-react';
import { useState, useTransition } from 'react';

import { submitLeadAction } from '@/app/actions';
import { Button, Modal } from '@/components/ui';
import { useExitIntent } from '@/hooks/useExitIntent';

/**
 * ExitIntentPopup
 * Captures abandoning traffic with a direct lead magnet.
 */
export const ExitIntentPopup = () => {
  const { showExitIntent, closeExitIntent } = useExitIntent();
  const [email, setEmail] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('email', email);
    formData.append('source', 'exit_intent');

    startTransition(() => {
      void (async () => {
        try {
          const result = await submitLeadAction(formData);

          if (result.success) {
            setIsSubmitted(true);
            setTimeout(() => {
              closeExitIntent();
            }, 2800);
          } else {
            setError(typeof result.error === 'string' ? result.error : 'Something went wrong');
          }
        } catch {
          setError('Something went wrong');
        }
      })();
    });
  };

  return (
    <Modal
      isOpen={showExitIntent}
      onClose={closeExitIntent}
      className="border-vegas-gold/40 border bg-deep-void p-7 text-left shadow-[0_20px_90px_rgba(0,0,0,0.55)]"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="box-glow-gold border-vegas-gold/35 bg-vegas-gold/10 flex size-11 items-center justify-center rounded-xl border text-vegas-gold">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-white">
              The VIP Entrance
            </h2>
            <p className="text-vegas-gold/85 mt-1 text-xs uppercase tracking-[0.2em]">
              Before You Go
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-white/[0.76]">
          Get a free 5-point nightlife content audit and a personalized pilot strategy in your
          inbox.
        </p>

        <div className="grid grid-cols-1 gap-3 text-[11px] text-white/60 sm:grid-cols-2">
          <div className="liquid-glass rounded-xl border border-white/10 p-3">
            <Gift size={14} className="mb-2 text-vegas-gold" />
            Instant audit checklist
          </div>
          <div className="liquid-glass rounded-xl border border-white/10 p-3">
            <ShieldCheck size={14} className="mb-2 text-vegas-gold" />
            No spam. Venue-only insights
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isSubmitted ? (
            <div className="border-vegas-gold/35 bg-vegas-gold/10 animate-pulse rounded-xl border py-4 text-center text-sm font-black uppercase tracking-[0.3em] text-vegas-gold">
              ACCESS GRANTED.
            </div>
          ) : (
            <>
              <label className="sr-only" htmlFor="exit-intent-email">
                Email Address
              </label>
              <input
                id="exit-intent-email"
                type="email"
                placeholder="Enter your email"
                className="focus-ring-gold w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white transition-colors placeholder:text-white/[0.45] focus:border-vegas-gold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
              />
              {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
              <Button
                variant="primary"
                size="lg"
                className="w-full rounded-xl text-[11px] tracking-[0.2em]"
                isLoading={isPending}
                type="submit"
              >
                GET VIP ACCESS
              </Button>
            </>
          )}
        </form>

        <button
          onClick={closeExitIntent}
          className="text-xs uppercase tracking-[0.18em] text-white/[0.45] hover:text-white/70"
        >
          Continue browsing for now
        </button>
      </div>
    </Modal>
  );
};
