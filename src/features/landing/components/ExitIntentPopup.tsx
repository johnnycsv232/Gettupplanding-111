'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { useExitIntent } from '@/hooks/useExitIntent';
import { Sparkles } from 'lucide-react';
import { saveLead } from '@/lib/leads';

export default function ExitIntentPopup() {
  const { showExitIntent, closeExitIntent } = useExitIntent();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const result = await saveLead({ email, source: 'exit-intent' });
    
    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
      setTimeout(() => {
        closeExitIntent();
        setIsSubmitted(false);
        setEmail('');
      }, 2000);
    } else {
      setError(typeof result.error === 'string' ? result.error : 'Something went wrong');
    }
  };

  return (
    <Modal isOpen={showExitIntent} onClose={closeExitIntent} className="bg-deep-void-black text-center p-8 border border-vegas-gold/50 box-glow-gold">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-vegas-gold/10 flex items-center justify-center text-vegas-gold box-glow-gold">
          <Sparkles size={32} />
        </div>
        
        <div className="space-y-2">
          <h2 className="font-display text-4xl text-white uppercase">The VIP Entrance</h2>
          <p className="text-off-white/80 max-w-xs mx-auto">
            Join the inner circle. Get exclusive content and a free 5-point content audit instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {isSubmitted ? (
            <div className="text-vegas-gold font-display text-xl py-4 animate-pulse">
              ACCESS GRANTED.
            </div>
          ) : (
            <>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-vegas-gold focus:outline-none transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <Button variant="primary" size="lg" className="w-full" isLoading={isSubmitting}>
                GET VIP ACCESS
              </Button>
            </>
          )}
        </form>

        <button onClick={closeExitIntent} className="text-xs text-white/30 hover:text-white uppercase tracking-widest">
          No thanks, I hate money.
        </button>
      </div>
    </Modal>
  );
}
