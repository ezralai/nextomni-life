'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Bookmark, 
  ThumbsUp, 
  ThumbsDown, 
  ExternalLink, 
  RefreshCw,
  Compass,
  CheckCircle2
} from 'lucide-react';

export default function IntelSuitePage() {
  const [bookmarked, setBookmarked] = useState(false);
  const [reaction, setReaction] = useState<'helpful' | 'unhelpful' | null>(null);
  const [category, setCategory] = useState<'active_recall' | 'pomodoro' | 'retention' | 'wellbeing'>('active_recall');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Suite Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-omni-cyan uppercase tracking-wider">NextOmni Intelligence & Synthesis</span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Cognitive Tips & AI Curated Digest</h1>
          </div>
        </div>
      </div>

      {/* Main Grid: Cognitive Tip + AI Morning Synthesis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tip of the Day with Caching */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">DAILY COGNITIVE STUDY TIP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300">1-Per-Day Cached</span>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-2 rounded-xl border transition-all ${
                    bookmarked ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
                  }`}
                  title="Bookmark tip"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight">Dual-Coding Retrieval Matrix</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
              Synthesizing spatial system architecture diagrams alongside textual code explanations activates both cerebral hemispheres, boosting long-term recall of distributed computing topologies by 42%.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">ACTION ITEM</span>
                <span className="text-xs font-semibold text-cyan-100">Execute in 3 Minutes</span>
              </div>
              <p className="text-xs text-cyan-200 leading-relaxed">
                Sketch your hardest distributed algorithms architecture on paper right now without checking the reference slides.
              </p>
            </div>

            <div className="mt-4 text-xs text-slate-400 font-mono">
              Citation: Paivio's Dual-Coding Theory & Harvard Cognitive Science Review
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Did this enhance your focus?</span>
              <button
                onClick={() => setReaction('helpful')}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
                  reaction === 'helpful' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-white/[0.04] border-white/[0.08] hover:text-white'
                }`}
              >
                <ThumbsUp className="h-3.5 w-3.5" /> Helpful
              </button>
              <button
                onClick={() => setReaction('unhelpful')}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
                  reaction === 'unhelpful' ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-white/[0.04] border-white/[0.08] hover:text-white'
                }`}
              >
                <ThumbsDown className="h-3.5 w-3.5" /> Skip
              </button>
            </div>

            <span className="text-[11px] text-slate-500 font-mono">Idempotent Caching Active</span>
          </div>
        </div>

        {/* AI Morning Brief Card */}
        <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-omni-indigo mb-3">
              <Compass className="h-4 w-4" />
              <span>CIRCADIAN MORNING BRIEF</span>
            </div>
            <h3 className="text-base font-bold text-white">Peak Study Window</h3>
            <p className="text-xs text-slate-400 mt-1">
              Calculated from your 7.5hr sleep cycle & past alertness logs.
            </p>

            <div className="my-4 p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/30 space-y-1.5">
              <span className="text-xs font-mono text-indigo-300 font-semibold">OPTIMAL WINDOW TODAY:</span>
              <p className="text-sm font-bold text-white">09:00 AM - 12:30 PM</p>
              <p className="text-[11px] text-indigo-200/80">Reserve for CS4102 Raft Consensus algorithms & complex debugging.</p>
            </div>

            <div className="space-y-2 mt-4">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider text-[10px]">Daily AI Priorities</span>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Distributed Systems milestone code audit</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Audit October Maybank statement transactions</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] text-slate-500 font-mono text-center">
            Synthesized via NextOmni AI Engine (:8000)
          </div>
        </div>
      </div>

      {/* Curated RSS News Feeds */}
      <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Curated Learning & Systems Feed</h3>
          <span className="text-xs text-slate-400 font-mono">Automated Synthesis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Sub-Millisecond Vector Retrieval in Edge Operating Systems',
              summary: 'Modern vector indexing techniques allow student coursework to be searched locally with minimal latency.',
              source: 'ACM Queue',
              cat: 'AI Systems'
            },
            {
              title: 'Circadian Synchronization & Peak Cognitive Study Windows',
              summary: 'Neuroscience data affirms that high-load logic retention peaks 2-4 hours post-awakening.',
              source: 'Nature Neuroscience',
              cat: 'Cognitive Health'
            },
            {
              title: 'Open Banking Protocols in Personal Operating Systems',
              summary: 'Direct statement ingestion eliminates subscription leakage and unmonitored bank fees.',
              source: 'Financial Times',
              cat: 'Fintech'
            }
          ].map((news, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-400 uppercase">{news.cat}</span>
                  <span className="text-[11px] text-slate-500">{news.source}</span>
                </div>
                <h4 className="text-sm font-semibold text-white leading-snug">{news.title}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{news.summary}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-omni-cyan">
                <span>Read Analysis</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
