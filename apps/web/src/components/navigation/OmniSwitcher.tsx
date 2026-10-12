'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  GraduationCap, 
  Wallet, 
  Sparkles, 
  HeartPulse, 
  LayoutGrid, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface SuiteItem {
  name: string;
  suite: string;
  description: string;
  href: string;
  icon: any;
  color: string;
  badge: string;
}

const SUITES: SuiteItem[] = [
  {
    name: 'NextOmni Life',
    suite: 'LifeOS & Flourishing',
    description: 'Atomic habits, focus engine, circadian rhythm, life OKRs',
    href: '/life',
    icon: HeartPulse,
    color: 'from-emerald-500 via-teal-600 to-indigo-600',
    badge: 'FLAGSHIP',
  },
  {
    name: 'Unified Command Center',
    suite: 'Omni Core Telemetry',
    description: 'Central telemetric overview across all suites',
    href: '/',
    icon: LayoutGrid,
    color: 'from-blue-600 to-indigo-600',
    badge: 'CORE',
  },
  {
    name: 'NextOmni Study',
    suite: 'Academics & Timetable',
    description: 'Timetable, course GPA projections, flashcards',
    href: '/study',
    icon: GraduationCap,
    color: 'from-indigo-500 to-purple-600',
    badge: 'STUDY',
  },
  {
    name: 'NextOmni Finance',
    suite: 'Wealth & Statements',
    description: 'Multi-institution wealth aggregation & OCR',
    href: '/finance',
    icon: Wallet,
    color: 'from-emerald-500 to-teal-600',
    badge: 'WEALTH',
  },
  {
    name: 'NextOmni Intel',
    suite: 'Cognitive & News Digest',
    description: 'Daily study tips & AI news synthesis',
    href: '/intel',
    icon: Sparkles,
    color: 'from-cyan-500 to-blue-600',
    badge: 'AI INTEL',
  },
];

export function OmniSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="omniswitcher-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="OmniSwitcher (9-Dot Suite Grid)"
        className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] p-2 hover:bg-white/[0.08] transition-all border border-white/[0.08] hover:border-omni-indigo/50"
      >
        <div className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-sm transition-all duration-300 ${
                isOpen 
                  ? 'bg-omni-cyan scale-110 shadow-[0_0_8px_#06b6d4]' 
                  : 'bg-slate-400 group-hover:bg-white'
              }`}
            />
          ))}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-84 sm:w-96 rounded-2xl glass-panel p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] mb-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">NextOmni Enterprise Suite Switcher</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300">v2.0</span>
          </div>

          <div className="space-y-1.5">
            {SUITES.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-start gap-3.5 rounded-xl p-2.5 transition-all ${
                    isActive 
                      ? 'bg-white/[0.09] border border-omni-indigo/40 shadow-sm' 
                      : 'hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white group-hover:text-omni-cyan transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 mt-3" />
                </Link>
              );
            })}
          </div>

          <div className="mt-3 pt-2 px-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Multi-Suite Encrypted</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">BFF Connected :8000</span>
          </div>
        </div>
      )}
    </div>
  );
}
