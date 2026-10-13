'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  GraduationCap, 
  Wallet, 
  Sparkles, 
  HeartPulse, 
  ArrowRight,
  Command,
  FileText,
  LucideIcon
} from 'lucide-react';

interface PaletteItem {
  id: string;
  title: string;
  category: string;
  href: string;
  icon: LucideIcon;
}

const ITEMS: PaletteItem[] = [
  { id: 'life-1', title: 'Check In Keystone Habits & 365-Day Heatmap', category: 'LifeOS', href: '/life?tab=habits', icon: HeartPulse },
  { id: 'life-2', title: 'Start Deep Work & Synthesized Soundscape Timer', category: 'LifeOS', href: '/life?tab=focus', icon: HeartPulse },
  { id: 'life-3', title: 'Log Circadian Sunlight & Sleep Readiness', category: 'LifeOS', href: '/life?tab=circadian', icon: HeartPulse },
  { id: 'life-4', title: 'Write Morning Intentions & Evening Gratitude Debrief', category: 'LifeOS', href: '/life?tab=journal', icon: HeartPulse },
  { id: 'life-5', title: 'View Multi-Dimensional Life OKRs & Goal Matrix', category: 'LifeOS', href: '/life?tab=okrs', icon: HeartPulse },
  { id: 'life-6', title: 'Run Weekly AI Sentiment & Behavioral Synthesis', category: 'LifeOS', href: '/life?tab=journal', icon: Sparkles },
  { id: 'study-1', title: 'View Academic Timetable & Schedules', category: 'Study', href: '/study', icon: GraduationCap },
  { id: 'study-2', title: 'Open Active Recall Flashcards Engine', category: 'Study', href: '/study', icon: GraduationCap },
  { id: 'fin-1', title: 'Upload Bank / eWallet Statement PDF', category: 'Finance', href: '/finance', icon: Wallet },
  { id: 'fin-2', title: 'Multi-Institution Net Worth Breakdown', category: 'Finance', href: '/finance', icon: Wallet },
  { id: 'intel-1', title: 'Read Today\'s Cognitive Study Tip', category: 'Intel', href: '/intel', icon: Sparkles },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filtered = query.trim() === '' 
    ? ITEMS 
    : ITEMS.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-xs text-slate-400 hover:text-slate-200 transition-all"
      >
        <Search className="h-3.5 w-3.5 text-slate-400" />
        <span>Search NextOmni...</span>
        <kbd className="flex items-center gap-0.5 rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-mono text-slate-300 border border-white/[0.08]">
          <Command className="h-2.5 w-2.5 inline" /> K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div 
            className="w-full max-w-xl glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/[0.12]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] gap-3">
              <Search className="h-5 w-5 text-omni-cyan" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, course, account or habit..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              <span className="text-xs text-slate-500 font-mono">ESC</span>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-500">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.06] transition-all text-sm text-slate-200 hover:text-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-omni-indigo group-hover:text-omni-cyan transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span>{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-400">
                          {item.category}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </a>
                  );
                })
              )}
            </div>

            <div className="px-4 py-2 bg-black/40 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500">
              <span>Navigate with arrow keys</span>
              <span>NextOmni Command Engine</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
