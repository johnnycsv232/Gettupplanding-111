'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, Sparkles } from 'lucide-react';

import { ChatHistorySchema, type ChatMessage } from '@/lib/zod-schemas';

interface GettUppAgentProps {
  initialCity?: string;
  initialCountry?: string;
}

/**
 * GettUppAgent
 * An interactive AI chat agent that persists history and provides context-aware
 * responses based on the visitor's location and intent.
 */
export const GettUppAgent = ({ initialCity, initialCountry }: GettUppAgentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load and Persist Messages
  useEffect(() => {
    const saved = localStorage.getItem('zenith_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const validated = ChatHistorySchema.safeParse(parsed);
        if (validated.success) {
          setMessages(validated.data);
          return;
        }
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }

    // Default fallback
    const location = initialCity || initialCountry || 'your city';
    setMessages([
      {
        role: 'assistant',
        content: `I'm the GettUpp AI. Are you looking to dominate the nightlife scene in ${location}?`,
      },
    ]);
  }, [initialCity, initialCountry]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('zenith_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Track Interaction
    import('@/lib/logger').then(({ trackInteraction }) => {
      trackInteraction('agent_message_sent', { content: userMessage });
    });

    // Intelligent Simulation (Context Aware)
    setTimeout(() => {
      let response =
        'Understood. Our team specializes in high-energy production. Would you like to schedule a strategy audit?';

      if (
        userMessage.toLowerCase().includes('price') ||
        userMessage.toLowerCase().includes('cost')
      ) {
        response =
          'Our retainers are tailored for high-growth venues. We usually start with a Pilot Phase to prove ROI. Should I send over the pricing deck?';
      } else if (
        userMessage.toLowerCase().includes('hello') ||
        userMessage.toLowerCase().includes('hi')
      ) {
        response = `Greetings! Great to see someone from ${initialCity || 'the scene'} here. How can I help you scale today?`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[110] flex h-16 w-16 items-center justify-center rounded-full bg-vegas-gold text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-transform hover:scale-110 active:scale-95"
      >
        <MessageSquare size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-heavy fixed bottom-28 right-8 z-[120] flex h-[500px] w-[380px] flex-col overflow-hidden rounded-3xl border-white/20 bg-black/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="bg-vegas-gold/10 flex items-center justify-between border-b border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-vegas-gold text-black">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-white">GETTUPP AI</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-vegas-gold">
                    Lead Architect
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto scroll-smooth p-6">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed ${
                      msg.role === 'user'
                        ? 'rounded-tr-none bg-vegas-gold text-black'
                        : 'rounded-tl-none border border-white/10 bg-white/5 text-white/80'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-none border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex gap-1">
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-vegas-gold" />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-vegas-gold [animation-delay:0.2s]" />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-vegas-gold [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask about our process..."
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-vegas-gold"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={isTyping}
                  className="hover:bg-vegas-gold/80 flex h-10 w-10 items-center justify-center rounded-full bg-vegas-gold text-black transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
