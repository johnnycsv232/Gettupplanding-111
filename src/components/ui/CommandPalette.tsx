'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useScrollLock } from '@/hooks/use-scroll-lock';
import { cn } from '@/lib/utils';
import { useGlobalState } from '@/providers/RootProvider';

import { EmptyState } from './EmptyState';

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
  section?: string;
}

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useGlobalState();

  useScrollLock(isOpen);

  // Toggle with Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Define Commands
  const commands: CommandItem[] = [
    {
      id: 'home',
      label: 'Go to Home',
      icon: <Command size={14} />,
      action: () => router.push('/'),
      section: 'Navigation',
    },
    {
      id: 'dashboard',
      label: 'Go to Dashboard',
      icon: <ArrowRight size={14} />,
      action: () => router.push('/admin/dashboard'),
      section: 'Navigation',
      shortcut: 'G D',
    },
    {
      id: 'theme',
      label: 'Toggle Theme (Demo)',
      icon: <Search size={14} />,
      action: () => {
        dispatch({ type: 'ADD_NOTIFICATION', payload: { id: 'theme-toggle-demo', type: 'info', message: 'Theme toggle coming soon!' } });
      },
      section: 'Actions',
    },
    {
      id: 'help',
      label: 'Help & Documentation',
      icon: <Command size={14} />,
      action: () => window.open('https://docs.gettupp.com', '_blank'),
      section: 'External',
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard Navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleNavigation = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
          setQuery('');
        }
      }
    };

    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, filteredCommands, selectedIndex]);


  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-[20vh] sm:pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="liquid-glass w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 shadow-2xl"
          >
            {/* Input */}
            <div className="flex items-center border-b border-white/5 bg-white/5 px-4 py-3">
              <Search className="mr-3 text-white/40" size={18} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-lg text-white placeholder:text-white/30 focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white/50">ESC</span>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[300px] overflow-y-auto bg-black/80 p-2">
              {filteredCommands.length === 0 ? (
                <EmptyState
                  icon={Search}
                  title="No results found"
                  description={`No commands match "${query}"`}
                  className="border-none bg-transparent py-10"
                />
              ) : (
                <div className="flex flex-col gap-1">
                  {filteredCommands.map((cmd, index) => (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setIsOpen(false);
                      }}
                      className={cn(
                        'flex items-center justify-between rounded-lg px-3 py-3 text-left transition-colors',
                        index === selectedIndex
                          ? 'bg-vegas-gold/20 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white',
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {cmd.icon}
                        <span className="font-medium">{cmd.label}</span>
                      </div>
                      {cmd.shortcut && (
                        <span className="text-xs text-white/30">{cmd.shortcut}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/5 bg-white/5 px-4 py-2 text-xs text-white/30">
              Gettupp Zenith Command
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
