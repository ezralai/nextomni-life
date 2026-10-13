'use client';

import React, { useState, useEffect } from 'react';
import { 
  HabitItem, 
  FocusSessionItem, 
  CircadianMetric, 
  JournalEntryItem, 
  LifeGoalItem, 
  LifeDebriefResponse,
  MotivationPromptResponse
} from '@nextomni/types';
import { LifeStore } from '@/lib/life-store';
import { fetchAiEngine } from '@/lib/api-client';
import { HabitMatrix } from '@/components/life/HabitMatrix';
import { HabitHeatmap } from '@/components/life/HabitHeatmap';
import { FocusFlowEngine } from '@/components/life/FocusFlowEngine';
import { CircadianTracker } from '@/components/life/CircadianTracker';
import { MindGymJournal } from '@/components/life/MindGymJournal';
import { LifeOkrsMatrix } from '@/components/life/LifeOkrsMatrix';
import { 
  HeartPulse, 
  Flame, 
  Sparkles, 
  Brain, 
  Compass, 
  Headphones, 
  Sun, 
  BookMarked, 
  Target,
  LayoutDashboard
} from 'lucide-react';

export default function NextOmniLifePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'habits' | 'focus' | 'circadian' | 'journal' | 'okrs'>('all');
  
  // LifeOS Store States
  const [habits, setHabits] = useState<HabitItem[]>([]);
  const [focusSessions, setFocusSessions] = useState<FocusSessionItem[]>([]);
  const [circadian, setCircadian] = useState<CircadianMetric | null>(null);
  const [journal, setJournal] = useState<JournalEntryItem | null>(null);
  const [okrs, setOkrs] = useState<LifeGoalItem[]>([]);
  const [debrief, setDebrief] = useState<LifeDebriefResponse | null>(null);
  const [motivation, setMotivation] = useState<MotivationPromptResponse | null>(null);

  // Hydrate from LocalStore on mount
  useEffect(() => {
    setHabits(LifeStore.getHabits());
    setFocusSessions(LifeStore.getFocusSessions());
    setCircadian(LifeStore.getCircadian());
    setJournal(LifeStore.getJournal());
    setOkrs(LifeStore.getOkrs());
    setDebrief(LifeStore.getDebrief());

    // Fetch dynamic motivational prompt from AI microservice
    async function fetchPrompt() {
      try {
        const res = await fetchAiEngine('/api/v1/life/prompt?streak=14&readiness=92&time_of_day=morning');
        if (res && res.status === 'success' && res.data) {
          setMotivation(res.data);
        }
      } catch (e) {
        console.warn('AI Prompt fallback active:', e);
      }
    }
    fetchPrompt();
  }, []);

  // Handlers for store updates
  function handleToggleHabit(id: string) {
    const updated = LifeStore.toggleHabit(id);
    setHabits(updated);
  }

  function handleAddHabit(newHabit: HabitItem) {
    const updated = [newHabit, ...habits];
    LifeStore.saveHabits(updated);
    setHabits(updated);
  }

  function handleDeleteHabit(id: string) {
    const updated = LifeStore.deleteHabit(id);
    setHabits(updated);
  }

  function handleLogFocusSession(session: FocusSessionItem) {
    const updated = LifeStore.addFocusSession(session);
    setFocusSessions(updated);
  }

  function handleDeleteFocusSession(id: string) {
    const updated = LifeStore.deleteFocusSession(id);
    setFocusSessions(updated);
  }

  function handleClearFocusSessions() {
    const updated = LifeStore.clearFocusSessions();
    setFocusSessions(updated);
  }

  function handleUpdateCircadian(metric: CircadianMetric) {
    LifeStore.saveCircadian(metric);
    setCircadian(metric);
  }

  function handleSaveJournal(entry: JournalEntryItem) {
    LifeStore.saveJournal(entry);
    setJournal(entry);
  }

  function handleSaveDebrief(newDebrief: LifeDebriefResponse) {
    LifeStore.saveDebrief(newDebrief);
    setDebrief(newDebrief);
  }

  function handleAddOkr(goal: LifeGoalItem) {
    const updated = [goal, ...okrs];
    LifeStore.saveOkrs(updated);
    setOkrs(updated);
  }

  function handleDeleteOkr(id: string) {
    const updated = LifeStore.deleteOkr(id);
    setOkrs(updated);
  }

  function handleUpdateOkrProgress(id: string, newProgress: number) {
    const updated = okrs.map(o => o.id === id ? { ...o, progressPercent: newProgress, isCompleted: newProgress >= 100 } : o);
    LifeStore.saveOkrs(updated);
    setOkrs(updated);
  }

  const completedHabitsCount = habits.filter(h => h.completedToday).length;
  const activeStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streakCount)) : 14;
  const totalFocusHours = Math.round(focusSessions.reduce((acc, s) => acc + (s.completedMinutes / 60), 0) * 10) / 10;
  const readiness = circadian ? circadian.readinessScore : 92;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Hero Telemetry Banner with Obsidian Glow */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                NextOmni Life • Personal LifeOS v2.0
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The Intelligent Operating System for Human Flourishing
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Synthesizing atomic habit formation, Cal Newport deep work soundscapes, circadian recovery biology, and multi-year life OKRs into an integrated cognitive sanctuary.
            </p>
          </div>

          {/* Quick Pillar KPI Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300">
              <Flame className="h-4 w-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span>{activeStreak}-DAY KEYSTONE STREAK</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
              <Brain className="h-4 w-4 text-indigo-400" />
              <span>{totalFocusHours}H FOCUS LOGGED</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
              <Sun className="h-4 w-4 text-emerald-400" />
              <span>{readiness}% READINESS</span>
            </div>
          </div>
        </div>

        {/* Dynamic Neuroscience Motivation Ribbon */}
        {motivation && (
          <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white">"{motivation.quote}"</strong> — <span className="text-slate-400 italic">{motivation.author}</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 shrink-0">
              ⚡ {motivation.suggestedAction}
            </span>
          </div>
        )}
      </div>

      {/* 2. Navigation Tab Strip across the 5 Pillars */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-x-auto">
        {[
          { id: 'all', label: 'Unified LifeOS Overview', icon: LayoutDashboard },
          { id: 'habits', label: '1. Atomic Habits & Heatmap', icon: Compass },
          { id: 'focus', label: '2. Deep Work Engine', icon: Headphones },
          { id: 'circadian', label: '3. Circadian & Sleep', icon: Sun },
          { id: 'journal', label: '4. Mind Gym & Reflective AI', icon: BookMarked },
          { id: 'okrs', label: '5. Life OKRs & Visions', icon: Target },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Component Pillar Views */}

      {/* VIEW: All / Overview */}
      {(activeTab === 'all' || activeTab === 'habits') && (
        <div className="space-y-6">
          <HabitHeatmap habits={habits} />
          <HabitMatrix
            habits={habits}
            onToggleHabit={handleToggleHabit}
            onAddHabit={handleAddHabit}
            onDeleteHabit={handleDeleteHabit}
          />
        </div>
      )}

      {(activeTab === 'all' || activeTab === 'focus') && (
        <FocusFlowEngine
          sessions={focusSessions}
          onLogSession={handleLogFocusSession}
          onDeleteSession={handleDeleteFocusSession}
          onClearSessions={handleClearFocusSessions}
        />
      )}

      {(activeTab === 'all' || activeTab === 'circadian') && circadian && (
        <CircadianTracker
          circadian={circadian}
          onUpdateCircadian={handleUpdateCircadian}
        />
      )}

      {(activeTab === 'all' || activeTab === 'journal') && journal && debrief && (
        <MindGymJournal
          journal={journal}
          debrief={debrief}
          onSaveJournal={handleSaveJournal}
          onSaveDebrief={handleSaveDebrief}
        />
      )}

      {(activeTab === 'all' || activeTab === 'okrs') && (
        <LifeOkrsMatrix
          okrs={okrs}
          onAddOkr={handleAddOkr}
          onUpdateOkrProgress={handleUpdateOkrProgress}
          onDeleteOkr={handleDeleteOkr}
        />
      )}
    </div>
  );
}
