'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Wallet, 
  Sparkles, 
  HeartPulse, 
  ArrowUpRight, 
  TrendingUp, 
  Calendar, 
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function UnifiedCommandCenterPage() {
  const [completedHabits, setCompletedHabits] = useState<number>(3);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Telemetry Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white/[0.08]">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-omni-indigo/10 border border-omni-indigo/30 text-omni-indigo text-xs font-mono mb-4">
            <Sparkles className="h-3.5 w-3.5 text-omni-cyan" />
            <span>NEXTOMNI TELEMETRIC OVERVIEW</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Welcome back, <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Ezra</span>.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Your cognitive load is optimal. 2 midterm milestones scheduled this week, RM36,121.45 multi-institution net worth balanced, and daily habits are on a 14-day streak.
          </p>
        </div>

        {/* Quick Suite Jump Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          <a href="/study" className="glass-card p-4 rounded-2xl flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <GraduationCap className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-400">Study Suite</span>
              <p className="text-lg font-bold text-white">3.88 CGPA</p>
            </div>
          </a>

          <a href="/finance" className="glass-card p-4 rounded-2xl flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <Wallet className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-400">Finance Suite</span>
              <p className="text-lg font-bold text-white">RM 36,121</p>
            </div>
          </a>

          <a href="/intel" className="glass-card p-4 rounded-2xl flex flex-col justify-between group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                <Sparkles className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-400">Intel Suite</span>
              <p className="text-lg font-bold text-white">Daily Tip Ready</p>
            </div>
          </a>

          <a href="/life" className="glass-card p-4 rounded-2xl flex flex-col justify-between group border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-500/40">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                <HeartPulse className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-emerald-400 group-hover:text-white transition-colors" />
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-400 font-mono">Flagship LifeOS</span>
              <p className="text-lg font-bold text-white">NextOmni Life</p>
            </div>
          </a>
        </div>
      </div>

      {/* Grid: Academic Agenda & Financial Aggregation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NextOmni Study Snapshot */}
        <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Academic Milestones</h3>
                <p className="text-xs text-slate-400">Next upcoming exams & project deadlines</p>
              </div>
            </div>
            <a href="/study" className="text-xs text-omni-indigo hover:text-omni-cyan font-medium flex items-center gap-1">
              Study Suite <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Raft Consensus Protocol Milestone</h4>
                  <p className="text-xs text-slate-400">CS4102 • Distributed Systems</p>
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                Oct 14
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-omni-cyan" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Multimodal OCR Fine-tuning Defense</h4>
                  <p className="text-xs text-slate-400">AI3205 • Applied Machine Learning</p>
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                Oct 18
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Enterprise Arch Seminar & Presentation</h4>
                  <p className="text-xs text-slate-400">SE4301 • Software Architecture</p>
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                Oct 22
              </span>
            </div>
          </div>
        </div>

        {/* NextOmni Finance Snapshot */}
        <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Multi-Institution Liquidity</h3>
                <p className="text-xs text-slate-400">Aggregated Malaysian balances & assets</p>
              </div>
            </div>
            <a href="/finance" className="text-xs text-omni-emerald hover:text-emerald-300 font-medium flex items-center gap-1">
              Finance Suite <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400">
                  TNG
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Touch 'n Go eWallet</h4>
                  <p className="text-xs text-slate-400">•••• 8912 • Daily Spending</p>
                </div>
              </div>
              <span className="text-sm font-mono font-semibold text-white">RM 520.40</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-xs font-bold text-yellow-400">
                  MBB
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Maybank Savings</h4>
                  <p className="text-xs text-slate-400">•••• 4120 • Primary Account</p>
                </div>
              </div>
              <span className="text-sm font-mono font-semibold text-white">RM 7,850.25</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-400">
                  ASNB
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">myASNB Unit Trust</h4>
                  <p className="text-xs text-slate-400">•••• 7031 • Education Fund</p>
                </div>
              </div>
              <span className="text-sm font-mono font-semibold text-emerald-400">RM 15,400.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row: Cognitive Study Tip Card & Habit Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-white/[0.08] relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Sparkles className="h-4 w-4" />
              <span>COGNITIVE STUDY TIP OF THE DAY</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300">1-Per-Day Cached</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">Dual-Coding Retrieval Matrix</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            Synthesizing spatial system architecture diagrams alongside textual code explanations activates both cerebral hemispheres, boosting long-term recall of distributed computing topologies by 42%.
          </p>

          <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-3">
            <span className="font-bold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 shrink-0">ACTION</span>
            <span>Sketch your hardest distributed algorithms architecture on paper right now without checking the reference slides.</span>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <HeartPulse className="h-4 w-4" />
                <span>NEXTOMNI LIFE • LIFEOS</span>
              </div>
              <span className="text-xs font-mono text-amber-400">14-Day Keystone Streak</span>
            </div>
            <h4 className="text-base font-bold text-white">Human Flourishing & Behavioral Habits</h4>
            <p className="text-xs text-slate-400 mt-1">
              Synchronized with deep work soundscapes, circadian rhythm & life OKRs.
            </p>
          </div>

          <div className="space-y-2 my-4">
            <button 
              onClick={() => setCompletedHabits(prev => Math.min(prev + 1, 4))}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-left text-xs transition-all"
            >
              <span className="text-white font-medium">Morning Deep Coding Window</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </button>
            <div className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-left text-xs">
              <span className="text-white font-medium">Circadian Sunlight Walk (20 min)</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-left text-xs">
              <span className="text-white font-medium">Active Recall Spaced Repetition</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
          </div>

          <a href="/life" className="w-full py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-xs font-semibold text-center text-emerald-300 transition-all block">
            Launch NextOmni Life (LifeOS)
          </a>
        </div>
      </div>
    </div>
  );
}
