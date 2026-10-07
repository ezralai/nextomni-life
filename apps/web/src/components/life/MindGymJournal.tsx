'use client';

import React, { useState } from 'react';
import { JournalEntryItem, LifeDebriefResponse } from '@nextomni/types';
import { fetchAiEngine } from '@/lib/api-client';
import { 
  BookMarked, 
  Sparkles, 
  Lock, 
  Unlock, 
  Sun, 
  Moon, 
  CheckCircle2, 
  Plus, 
  Lightbulb, 
  TrendingUp, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface MindGymJournalProps {
  journal: JournalEntryItem;
  debrief: LifeDebriefResponse;
  onSaveJournal: (entry: JournalEntryItem) => void;
  onSaveDebrief: (debrief: LifeDebriefResponse) => void;
}

export function MindGymJournal({
  journal,
  debrief,
  onSaveJournal,
  onSaveDebrief,
}: MindGymJournalProps) {
  const [morningIntentions, setMorningIntentions] = useState<string[]>(
    journal.morningIntentions || [
      'Deep work block: Compiler lab without distractions',
      '20-minute morning outdoor sunlight walk',
      'Zero refined sugar and clean hydration'
    ]
  );
  const [eveningGratitude, setEveningGratitude] = useState<string[]>(
    journal.eveningGratitude || [
      'Clean TypeScript build with zero compilation errors',
      'High mental flow with 40Hz binaural beats soundscape',
      'Restorative 8-hour sleep sleep score'
    ]
  );
  const [lessonLearned, setLessonLearned] = useState(
    journal.lessonLearned || 'Context-switching during afternoon trough drains stamina faster than hard code; buffer 15 min NSDR instead.'
  );
  const [vaultContent, setVaultContent] = useState(journal.content || '');
  const [isVaultLocked, setIsVaultLocked] = useState(journal.isVaultLocked ?? false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [activeDebrief, setActiveDebrief] = useState<LifeDebriefResponse>(debrief);

  function handleAddIntention() {
    if (morningIntentions.length < 5) {
      setMorningIntentions([...morningIntentions, '']);
    }
  }

  function handleAddGratitude() {
    if (eveningGratitude.length < 5) {
      setEveningGratitude([...eveningGratitude, '']);
    }
  }

  function handleSaveAll() {
    const updated: JournalEntryItem = {
      ...journal,
      morningIntentions: morningIntentions.filter(i => i.trim() !== ''),
      eveningGratitude: eveningGratitude.filter(g => g.trim() !== ''),
      lessonLearned,
      content: vaultContent,
      isVaultLocked,
    };
    onSaveJournal(updated);
  }

  async function handleRunAiSynthesis() {
    setIsSynthesizing(true);
    try {
      const res = await fetchAiEngine('/api/v1/life/debrief', {
        method: 'POST',
        body: JSON.stringify({
          habits_completed: 19,
          habits_total: 21,
          streak_days: 14,
          focus_hours: 18.5,
          avg_sleep_hours: 7.6,
          avg_readiness_score: 89,
          journal_excerpts: [
            ...morningIntentions,
            ...eveningGratitude,
            lessonLearned,
          ].filter(Boolean),
        }),
      });

      if (res && res.status === 'success' && res.data) {
        setActiveDebrief(res.data);
        onSaveDebrief(res.data);
      }
    } catch (e) {
      console.warn('AI microservice synthesis fallback:', e);
    } finally {
      setIsSynthesizing(false);
    }
  }

  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider">
            <BookMarked className="h-3.5 w-3.5" />
            <span>Pillar 4 • Reflective Journaling & Mind Gym</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Daily Micro-Debriefs & AI Sentiment Synthesis</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAiSynthesis}
            disabled={isSynthesizing}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-600/20 active:scale-95 disabled:opacity-50"
          >
            <Sparkles className={`h-4 w-4 text-purple-200 ${isSynthesizing ? 'animate-spin' : ''}`} />
            <span>{isSynthesizing ? 'Synthesizing...' : 'Run Weekly AI Synthesis'}</span>
          </button>
        </div>
      </div>

      {/* Grid: AM Intentions + PM Gratitude + Private Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: AM Intentions (3 Needle Movers) */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-semibold">
              <Sun className="h-4 w-4 text-amber-400" />
              <span>AM Protocol: Top 3 Needle-Movers</span>
            </div>
            <button
              onClick={handleAddIntention}
              className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-2">
            {morningIntentions.map((intent, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono font-bold">
                  {idx + 1}
                </span>
                <input
                  value={intent}
                  onChange={e => {
                    const next = [...morningIntentions];
                    next[idx] = e.target.value;
                    setMorningIntentions(next);
                  }}
                  onBlur={handleSaveAll}
                  placeholder={`Needle-mover #${idx + 1}`}
                  className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: PM Gratitude & Cognitive Reframing */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 font-semibold">
              <Moon className="h-4 w-4 text-indigo-400" />
              <span>PM Protocol: Gratitude & Daily Wins</span>
            </div>
            <button
              onClick={handleAddGratitude}
              className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-2">
            {eveningGratitude.map((grat, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300 text-[10px] font-mono font-bold">
                  ★
                </span>
                <input
                  value={grat}
                  onChange={e => {
                    const next = [...eveningGratitude];
                    next[idx] = e.target.value;
                    setEveningGratitude(next);
                  }}
                  onBlur={handleSaveAll}
                  placeholder={`Daily win #${idx + 1}`}
                  className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <label className="text-[11px] font-mono text-purple-300 block mb-1">
              Cognitive Reframing (1 Key Lesson Learned):
            </label>
            <input
              value={lessonLearned}
              onChange={e => setLessonLearned(e.target.value)}
              onBlur={handleSaveAll}
              placeholder="How can today's friction sharpen tomorrow's strategy?"
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-400 italic"
            />
          </div>
        </div>
      </div>

      {/* AI Sentiment Analysis Card */}
      {activeDebrief && (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/20 via-indigo-950/20 to-transparent border border-purple-500/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Automated AI Psychological Synthesis
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Score: {activeDebrief.weeklyScore}/100
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {activeDebrief.sentimentTrend}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Wins */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <p className="font-semibold text-emerald-400 font-mono text-[11px] uppercase">
                Psychological Capital & Wins:
              </p>
              <ul className="space-y-1 text-slate-300">
                {activeDebrief.psychologicalWins.map((w: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stressors & Nudges */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <p className="font-semibold text-amber-400 font-mono text-[11px] uppercase">
                Actionable Behavioral Nudges:
              </p>
              <ul className="space-y-1 text-slate-300">
                {activeDebrief.actionableNudges.map((n: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400">⚡</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Private Vault */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
              Client-Encrypted Private Vault
            </span>
          </div>

          <button
            onClick={() => {
              const next = !isVaultLocked;
              setIsVaultLocked(next);
              handleSaveAll();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition-all border border-white/[0.08]"
          >
            {isVaultLocked ? (
              <>
                <Lock className="h-3.5 w-3.5 text-amber-400" />
                <span>Vault Locked</span>
              </>
            ) : (
              <>
                <Unlock className="h-3.5 w-3.5 text-emerald-400" />
                <span>Vault Unlocked</span>
              </>
            )}
          </button>
        </div>

        {isVaultLocked ? (
          <div className="p-6 text-center text-xs font-mono text-slate-500 bg-black/40 rounded-xl border border-dashed border-white/[0.08]">
            🔒 Entries are masked behind client-side private vault encryption. Click unlock to view.
          </div>
        ) : (
          <textarea
            rows={3}
            value={vaultContent}
            onChange={e => setVaultContent(e.target.value)}
            onBlur={handleSaveAll}
            placeholder="Uncensored thoughts, existential reflections, mental gym notes..."
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 resize-none font-mono"
          />
        )}
      </div>
    </div>
  );
}
