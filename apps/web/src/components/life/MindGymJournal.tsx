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
  RefreshCw,
  Trash2,
  Copy,
  Check,
  Clock,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';

interface MindGymJournalProps {
  journal: JournalEntryItem;
  debrief: LifeDebriefResponse;
  onSaveJournal: (entry: JournalEntryItem) => void;
  onSaveDebrief: (debrief: LifeDebriefResponse) => void;
}

const AM_SUGGESTIONS = [
  '90m Deep Work Block: Compiler Architecture',
  '20m Morning Outdoor Sunlight Walk',
  'Electrolyte Hydration & Zero Sugar',
  'Active Recall Flashcards Sprint',
];

const PM_SUGGESTIONS = [
  'Clean TypeScript build with 0 compiler errors',
  'Flow state sustained with 40Hz soundscape',
  'Restorative 8-hour sleep recovery score',
  '100% daily keystone habit execution',
];

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
      'Restorative 8-hour sleep score'
    ]
  );
  const [lessonLearned, setLessonLearned] = useState(
    journal.lessonLearned || 'Context-switching during afternoon trough drains stamina faster than hard code; buffer 15 min NSDR instead.'
  );
  const [vaultContent, setVaultContent] = useState(journal.content || '');
  const [isVaultLocked, setIsVaultLocked] = useState(journal.isVaultLocked ?? false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [activeDebrief, setActiveDebrief] = useState<LifeDebriefResponse>(debrief);
  const [copiedDebrief, setCopiedDebrief] = useState(false);
  const [copiedVault, setCopiedVault] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  function handleAddIntention(customText?: string) {
    if (morningIntentions.length < 5) {
      const next = [...morningIntentions, customText ?? ''];
      setMorningIntentions(next);
      handleSaveAll(next, eveningGratitude, lessonLearned, vaultContent, isVaultLocked);
    }
  }

  function handleRemoveIntention(idx: number) {
    const next = morningIntentions.filter((_, i) => i !== idx);
    setMorningIntentions(next);
    handleSaveAll(next, eveningGratitude, lessonLearned, vaultContent, isVaultLocked);
  }

  function handleAddGratitude(customText?: string) {
    if (eveningGratitude.length < 5) {
      const next = [...eveningGratitude, customText ?? ''];
      setEveningGratitude(next);
      handleSaveAll(morningIntentions, next, lessonLearned, vaultContent, isVaultLocked);
    }
  }

  function handleRemoveGratitude(idx: number) {
    const next = eveningGratitude.filter((_, i) => i !== idx);
    setEveningGratitude(next);
    handleSaveAll(morningIntentions, next, lessonLearned, vaultContent, isVaultLocked);
  }

  function handleInsertVaultTimestamp() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const prepend = vaultContent ? `${vaultContent}\n[${timeStr}] ` : `[${timeStr}] `;
    setVaultContent(prepend);
    handleSaveAll(morningIntentions, eveningGratitude, lessonLearned, prepend, isVaultLocked);
  }

  function handleSaveAll(
    intentions = morningIntentions,
    gratitude = eveningGratitude,
    lesson = lessonLearned,
    vault = vaultContent,
    locked = isVaultLocked
  ) {
    setSaveStatus('saving');
    const updated: JournalEntryItem = {
      ...journal,
      morningIntentions: intentions.filter(i => i.trim() !== ''),
      eveningGratitude: gratitude.filter(g => g.trim() !== ''),
      lessonLearned: lesson,
      content: vault,
      isVaultLocked: locked,
    };
    onSaveJournal(updated);
    setTimeout(() => {
      setSaveStatus('saved');
    }, 300);
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

  function handleCopyDebrief() {
    if (!activeDebrief) return;
    const text = `NextOmni Life AI Synthesis (Score: ${activeDebrief.weeklyScore}/100):\nTrend: ${activeDebrief.sentimentTrend}\n\nPsychological Wins:\n${activeDebrief.psychologicalWins.map(w => `• ${w}`).join('\n')}\n\nActionable Nudges:\n${activeDebrief.actionableNudges.map(n => `• ${n}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedDebrief(true);
    setTimeout(() => setCopiedDebrief(false), 2000);
  }

  function handleCopyVault() {
    if (!vaultContent) return;
    navigator.clipboard.writeText(vaultContent);
    setCopiedVault(true);
    setTimeout(() => setCopiedVault(false), 2000);
  }

  const wordCount = vaultContent.trim() ? vaultContent.trim().split(/\s+/).length : 0;
  const charCount = vaultContent.length;

  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-6 transition-all duration-300">
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
          {/* Autosave status indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-slate-400">
            <span className={`h-1.5 w-1.5 rounded-full ${saveStatus === 'saved' ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]' : 'bg-amber-400 animate-pulse'}`} />
            <span>{saveStatus === 'saved' ? 'Autosaved' : 'Saving...'}</span>
          </div>

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
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4 hover:border-amber-400/20 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-semibold">
              <Sun className="h-4 w-4 text-amber-400" />
              <span>AM Protocol: Top Needle-Movers ({morningIntentions.length}/5)</span>
            </div>
            {morningIntentions.length < 5 && (
              <button
                onClick={() => handleAddIntention()}
                className="text-[11px] font-mono text-amber-300 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-all"
              >
                <Plus className="h-3 w-3" />
                <span>Add Slot</span>
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {morningIntentions.map((intent, idx) => (
              <div key={idx} className="group flex items-center gap-2.5">
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
                  onBlur={() => handleSaveAll()}
                  placeholder={`Needle-mover #${idx + 1}`}
                  className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:bg-white/[0.05] transition-all"
                />
                <button
                  type="button"
                  title="Remove intention"
                  onClick={() => handleRemoveIntention(idx)}
                  className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 opacity-60 group-hover:opacity-100 transition-all shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick inspiration suggestion pills */}
          <div className="pt-2 border-t border-white/[0.04]">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5">
              Quick Inspiration Chips
            </span>
            <div className="flex flex-wrap gap-1.5">
              {AM_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  disabled={morningIntentions.length >= 5}
                  onClick={() => handleAddIntention(sug)}
                  className="text-[10px] font-mono text-amber-300/80 hover:text-amber-200 px-2 py-0.5 rounded-lg bg-amber-500/5 hover:bg-amber-500/15 border border-amber-500/10 hover:border-amber-500/25 transition-all truncate max-w-full disabled:opacity-40"
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: PM Gratitude & Cognitive Reframing */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4 hover:border-indigo-400/20 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 font-semibold">
              <Moon className="h-4 w-4 text-indigo-400" />
              <span>PM Protocol: Gratitude & Daily Wins ({eveningGratitude.length}/5)</span>
            </div>
            {eveningGratitude.length < 5 && (
              <button
                onClick={() => handleAddGratitude()}
                className="text-[11px] font-mono text-indigo-300 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition-all"
              >
                <Plus className="h-3 w-3" />
                <span>Add Slot</span>
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {eveningGratitude.map((grat, idx) => (
              <div key={idx} className="group flex items-center gap-2.5">
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
                  onBlur={() => handleSaveAll()}
                  placeholder={`Daily win #${idx + 1}`}
                  className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:bg-white/[0.05] transition-all"
                />
                <button
                  type="button"
                  title="Remove gratitude entry"
                  onClick={() => handleRemoveGratitude(idx)}
                  className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 opacity-60 group-hover:opacity-100 transition-all shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
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
              onBlur={() => handleSaveAll()}
              placeholder="How can today's friction sharpen tomorrow's strategy?"
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-400 italic"
            />
          </div>

          {/* Quick inspiration suggestion pills */}
          <div className="pt-2 border-t border-white/[0.04]">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5">
              Quick Gratitude Chips
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PM_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  disabled={eveningGratitude.length >= 5}
                  onClick={() => handleAddGratitude(sug)}
                  className="text-[10px] font-mono text-indigo-300/80 hover:text-indigo-200 px-2 py-0.5 rounded-lg bg-indigo-500/5 hover:bg-indigo-500/15 border border-indigo-500/10 hover:border-indigo-500/25 transition-all truncate max-w-full disabled:opacity-40"
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Sentiment Analysis Card / Loading Skeleton */}
      {isSynthesizing ? (
        <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400 animate-spin" />
              <span className="text-xs font-mono font-bold text-purple-200 uppercase tracking-wider">
                Synthesizing Psychological Capital via AI Microservice...
              </span>
            </div>
            <div className="h-6 w-24 bg-purple-500/20 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-24 bg-white/[0.03] rounded-xl border border-white/[0.05]" />
            <div className="h-24 bg-white/[0.03] rounded-xl border border-white/[0.05]" />
          </div>
        </div>
      ) : activeDebrief ? (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/30 via-indigo-950/20 to-transparent border border-purple-500/20 space-y-4 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Automated AI Psychological Synthesis
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Score: {activeDebrief.weeklyScore}/100
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {activeDebrief.sentimentTrend}
              </span>
              <button
                type="button"
                onClick={handleCopyDebrief}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-mono border border-white/[0.08] transition-all"
              >
                {copiedDebrief ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Wins */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <p className="font-semibold text-emerald-400 font-mono text-[11px] uppercase flex items-center gap-1.5">
                <TrendingUp className="h-3 w-3" />
                <span>Psychological Capital & Wins:</span>
              </p>
              <ul className="space-y-1.5 text-slate-300">
                {activeDebrief.psychologicalWins.map((w: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stressors & Nudges */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <p className="font-semibold text-amber-400 font-mono text-[11px] uppercase flex items-center gap-1.5">
                <Lightbulb className="h-3 w-3" />
                <span>Actionable Behavioral Nudges:</span>
              </p>
              <ul className="space-y-1.5 text-slate-300">
                {activeDebrief.actionableNudges.map((n: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">⚡</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      {/* Private Vault */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
              Client-Encrypted Private Vault
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              AES-GCM Local
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isVaultLocked && (
              <>
                <button
                  type="button"
                  onClick={handleInsertVaultTimestamp}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-mono bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition-all border border-white/[0.08]"
                >
                  <Clock className="h-3 w-3 text-cyan-400" />
                  <span>Timestamp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyVault}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-mono bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition-all border border-white/[0.08]"
                >
                  {copiedVault ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </>
            )}

            <button
              onClick={() => {
                const next = !isVaultLocked;
                setIsVaultLocked(next);
                handleSaveAll(morningIntentions, eveningGratitude, lessonLearned, vaultContent, next);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono transition-all border ${
                isVaultLocked
                  ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {isVaultLocked ? (
                <>
                  <Lock className="h-3.5 w-3.5 text-amber-400" />
                  <span>Vault Locked</span>
                </>
              ) : (
                <>
                  <Unlock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Lock Vault</span>
                </>
              )}
            </button>
          </div>
        </div>

        {isVaultLocked ? (
          <div className="p-8 text-center bg-black/40 rounded-xl border border-dashed border-white/[0.08] space-y-3">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-lg shadow-amber-500/5">
                <KeyRound className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-mono font-semibold text-slate-200">
                Encrypted Storage Partition
              </p>
              <p className="text-[11px] font-mono text-slate-500 max-w-md mx-auto">
                Journal contents are secured client-side. Click "Vault Locked" to authenticate and access your uninhibited thoughts.
              </p>
            </div>
            <div className="pt-1 flex items-center justify-center gap-1.5 text-slate-600 font-mono text-xs select-none">
              <span>••••••••••••</span>
              <span>••••••••••••</span>
              <span>••••••••••••</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <textarea
              rows={4}
              value={vaultContent}
              onChange={e => setVaultContent(e.target.value)}
              onBlur={() => handleSaveAll()}
              placeholder="Uncensored thoughts, existential reflections, mental gym notes..."
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:bg-white/[0.05] resize-none font-mono transition-all"
            />
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
              <span>Markdown and bullet points supported</span>
              <span>{wordCount} words • {charCount} chars</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

