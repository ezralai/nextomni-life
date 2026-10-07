'use client';

import React, { useState, useEffect } from 'react';
import { OmniSwitcher } from './OmniSwitcher';
import { CommandPalette } from './CommandPalette';
import { Layers, Activity, User, Bell } from 'lucide-react';

export function Header() {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }) + ' MYT');
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/[0.06] px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand & System Status */}
        <div className="flex items-center gap-4">
          <a href="/life" className="flex items-center gap-2.5 group">
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
          </a>

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
  );
}
