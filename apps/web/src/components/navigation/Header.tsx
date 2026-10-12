'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { OmniSwitcher } from './OmniSwitcher';
import { CommandPalette } from './CommandPalette';
import { 
  Activity, 
  Bell, 
  Menu, 
  X, 
  HeartPulse, 
  GraduationCap, 
  Wallet, 
  Sparkles, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export function Header() {
  const [timeStr, setTimeStr] = useState<string>('');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }) + ' MYT');
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const MOBILE_NAV_ITEMS = [
    {
      title: 'NextOmni Life (LifeOS)',
      subtitle: 'Habits, Focus Flow & Circadian Recovery',
      href: '/life',
      icon: HeartPulse,
      badge: 'FLAGSHIP',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'NextOmni Study',
      subtitle: 'Timetables, GPA Projections & Active Recall',
      href: '/study',
      icon: GraduationCap,
      badge: 'STUDY',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      title: 'NextOmni Finance',
      subtitle: 'Multi-Bank Wealth Aggregation & OCR',
      href: '/finance',
      icon: Wallet,
      badge: 'WEALTH',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'NextOmni Intel',
      subtitle: 'Daily Cognitive Tips & AI Digest',
      href: '/intel',
      icon: Sparkles,
      badge: 'AI INTEL',
      color: 'from-cyan-500 to-blue-600',
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/[0.06] px-4 lg:px-8 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Brand & System Status */}
          <div className="flex items-center gap-4">
            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all border border-white/[0.08]"
              title="Open Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link href="/life" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-indigo-600 text-white font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                🌿
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold tracking-tight text-white group-hover:text-omni-emerald transition-colors">
                    NextOmni <span className="text-emerald-400">Life</span>
                  </span>
                  <span className="hidden sm:inline-block ml-1 text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    LIFEOS v2.0
                  </span>
                </div>
                <p className="hidden md:block text-[10px] text-slate-400 tracking-tight -mt-0.5 font-normal">
                  The Intelligent Operating System for Human Flourishing
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/[0.08] text-xs text-slate-400 font-mono">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span>AI ENGINE ONLINE</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">{timeStr || '19:45:00 MYT'}</span>
            </div>
          </div>

          {/* Global Controls & 9-Dot Switcher */}
          <div className="flex items-center gap-3">
            <CommandPalette />
            
            <button 
              title="Notifications" 
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all border border-white/[0.08]"
            >
              <Bell className="h-4 w-4" />
            </button>

            <OmniSwitcher />

            <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white font-semibold text-xs border border-white/[0.1]">
                EL
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay & Slide-Out */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-start bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-80 max-w-[85vw] h-full bg-[#0d1322] border-r border-white/[0.08] p-5 flex flex-col justify-between shadow-2xl relative overflow-y-auto">
            {/* Drawer Top */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-bold text-sm">
                    🌿
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white">NextOmni <span className="text-emerald-400">Life</span></span>
                    <p className="text-[10px] text-slate-400 font-mono">Personal LifeOS v2.0</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
                  title="Close Menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Telemetry quick badge */}
              <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-amber-400 fill-amber-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-300 font-semibold">14-Day Keystone Streak</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-1.5 py-0.5 rounded">Active</span>
              </div>

              {/* Navigation Items */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block px-1">
                  Enterprise Suites
                </span>

                {MOBILE_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileDrawerOpen(false)}
                      className="group flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] hover:border-emerald-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${item.color} text-white shadow-sm`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-slate-400 line-clamp-1">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Drawer Bottom */}
            <div className="pt-4 border-t border-white/[0.06] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Activity className="h-3 w-3 text-emerald-400" />
                  <span>AI Engine (:8000)</span>
                </div>
                <span>{timeStr || 'MYT'}</span>
              </div>
              <p className="text-[10px] text-slate-500 text-center font-normal">
                NextOmni Life • Human Flourishing OS
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
