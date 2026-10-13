'use client';

import React, { useState } from 'react';
import { HabitItem } from '@nextomni/types';
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  Clock, 
  Plus, 
  Sparkles, 
  Sun, 
  Moon, 
  Sunset, 
  Compass,
  X,
  Trash2,
  Award
} from 'lucide-react';

interface HabitMatrixProps {
  habits: HabitItem[];
  onToggleHabit: (id: string) => void;
  onAddHabit: (newHabit: HabitItem) => void;
  onDeleteHabit?: (id: string) => void;
}

export function HabitMatrix({ habits, onToggleHabit, onAddHabit, onDeleteHabit }: HabitMatrixProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterTime, setFilterTime] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding new habit
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newMicroCue, setNewMicroCue] = useState('');
  const [newCategory, setNewCategory] = useState<HabitItem['category']>('health');
  const [newFrequency, setNewFrequency] = useState<HabitItem['frequency']>('daily');
  const [newMinutes, setNewMinutes] = useState(20);
  const [newTimeOfDay, setNewTimeOfDay] = useState<NonNullable<HabitItem['preferredTimeOfDay']>>('morning');

  const filteredHabits = habits.filter(h => {
    if (filterCategory !== 'all' && h.category !== filterCategory) return false;
    if (filterTime !== 'all' && h.preferredTimeOfDay !== filterTime && h.preferredTimeOfDay !== 'any') return false;
    return true;
  });

  const completedCount = habits.filter(h => h.completedToday).length;
  const allCompleted = habits.length > 0 && completedCount === habits.length;

  function handleCreateHabit(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const habit: HabitItem = {
      id: `h-${Date.now()}`,
      title: newTitle.trim(),
      description: newDescription.trim() || undefined,
      microCue: newMicroCue.trim() || undefined,
      category: newCategory,
      frequency: newFrequency,
      targetDaysPerWeek: newFrequency === 'daily' ? 7 : newFrequency === 'weekdays' ? 5 : 3,
      targetMinutes: newMinutes,
      streakCount: 1,
      icon: 'check-circle',
      color: newCategory === 'health' ? '#10b981' : newCategory === 'learning' ? '#6366f1' : '#f59e0b',
      preferredTimeOfDay: newTimeOfDay,
      isArchived: false,
      completedToday: true,
      history: { [new Date().toISOString().split('T')[0]]: true },
    };

    onAddHabit(habit);
    setShowAddModal(false);
    setNewTitle('');
    setNewDescription('');
    setNewMicroCue('');
  }

  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-6 transition-all duration-300">
      {/* Top Header & Quick Counts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <Compass className="h-3.5 w-3.5" />
            <span>Pillar 1 • Behavioral Habit Matrix</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Keystone Habit Execution</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
            <strong className="text-emerald-400">{completedCount}</strong> / {habits.length} Completed Today
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Habit</span>
          </button>
        </div>
      </div>

      {/* Daily Keystone Mastery Banner if all complete */}
      {allCompleted && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Daily Keystone Mastery Unlocked!</p>
              <p className="text-[11px] text-emerald-300/80 font-mono">
                All {habits.length} daily habits checked in. Identity capital reinforced for today.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 shrink-0">
            100% EXECUTION
          </span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-white/[0.06]">
        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'health', label: 'Health' },
            { id: 'learning', label: 'Learning' },
            { id: 'mindfulness', label: 'Mindfulness' },
            { id: 'fitness', label: 'Fitness' },
          ].map(cat => {
            const count = cat.id === 'all' ? habits.length : habits.filter(h => h.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                  filterCategory === cat.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Time of day filters */}
        <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06] text-xs">
          {[
            { id: 'all', label: 'All', icon: Sparkles },
            { id: 'morning', label: 'AM', icon: Sun },
            { id: 'afternoon', label: 'Noon', icon: Sunset },
            { id: 'evening', label: 'PM', icon: Moon },
          ].map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setFilterTime(t.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all ${
                  filterTime === t.id
                    ? 'bg-white/[0.1] text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="h-3 w-3" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Habit Cards Grid */}
      <div className="space-y-3">
        {filteredHabits.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm font-mono border border-dashed border-white/[0.08] rounded-2xl space-y-2">
            <p>No habits match the active filter criteria.</p>
            <button
              onClick={() => {
                setFilterCategory('all');
                setFilterTime('all');
              }}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredHabits.map(habit => {
            const isDone = habit.completedToday;
            return (
              <div
                key={habit.id}
                onClick={() => onToggleHabit(habit.id)}
                className={`group p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/30 shadow-sm shadow-emerald-500/5'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]'
                }`}
              >
                {/* Left check button & title */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <button
                    type="button"
                    title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 scale-105'
                        : 'border-2 border-slate-600 text-transparent group-hover:border-slate-400'
                    }`}
                  >
                    <CheckCircle2 className={`h-4 w-4 ${isDone ? 'stroke-[2.5]' : 'opacity-0'}`} />
                  </button>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-semibold tracking-tight transition-all ${
                        isDone ? 'line-through text-slate-400' : 'text-slate-100 group-hover:text-emerald-300'
                      }`}>
                        {habit.title}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-400">
                        {habit.category}
                      </span>
                      {habit.targetMinutes && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-white/[0.03]">
                          <Clock className="h-3 w-3" />
                          {habit.targetMinutes}m
                        </span>
                      )}
                    </div>

                    {habit.description && (
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {habit.description}
                      </p>
                    )}

                    {/* Behavioral Micro-Cue Callout */}
                    {habit.microCue && (
                      <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 pt-0.5">
                        <span className="text-emerald-400">⚡ Cue:</span>
                        <span className="italic text-slate-300 truncate">"{habit.microCue}"</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Streak Badge & Delete Action */}
                <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.04]">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all ${
                    isDone 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'bg-white/[0.04] text-slate-400 border border-white/[0.06]'
                  }`}>
                    <Flame className={`h-4 w-4 ${isDone ? 'text-amber-400 fill-amber-400 animate-bounce' : 'text-slate-500'}`} />
                    <span>{habit.streakCount} DAYS</span>
                  </div>

                  {onDeleteHabit && (
                    <button
                      type="button"
                      title="Delete Habit"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteHabit(habit.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 opacity-60 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Habit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-6 border border-white/[0.12] shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase">Behavioral Architecture</span>
                <h3 className="text-lg font-bold text-white">Create New Keystone Habit</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateHabit} className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Habit Title *</label>
                <input
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. 20-Minute Morning Sunlight Walk"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Behavioral Micro-Cue (James Clear Protocol)</label>
                <input
                  value={newMicroCue}
                  onChange={e => setNewMicroCue(e.target.value)}
                  placeholder='e.g. "After I pour my morning glass of water..."'
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as HabitItem['category'])}
                    className="w-full bg-obsidian-800 border border-white/[0.1] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="health">Health & Vitality</option>
                    <option value="learning">Learning & Cognition</option>
                    <option value="mindfulness">Mindfulness & Mental Gym</option>
                    <option value="fitness">Fitness & Movement</option>
                    <option value="craft">Craft & Deep Coding</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Time of Day</label>
                  <select
                    value={newTimeOfDay}
                    onChange={e => setNewTimeOfDay(e.target.value as NonNullable<HabitItem['preferredTimeOfDay']>)}
                    className="w-full bg-obsidian-800 border border-white/[0.1] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="morning">Morning (AM)</option>
                    <option value="afternoon">Afternoon (Noon)</option>
                    <option value="evening">Evening (PM)</option>
                    <option value="any">Flexible / Any</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Frequency</label>
                  <select
                    value={newFrequency}
                    onChange={e => setNewFrequency(e.target.value as HabitItem['frequency'])}
                    className="w-full bg-obsidian-800 border border-white/[0.1] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="daily">Daily (7 days/wk)</option>
                    <option value="weekdays">Weekdays (Mon-Fri)</option>
                    <option value="weekly">3x per week</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Target Duration (min)</label>
                  <input
                    type="number"
                    min="1"
                    max="300"
                    value={newMinutes}
                    onChange={e => setNewMinutes(parseInt(e.target.value) || 15)}
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
                >
                  Anchor Keystone Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
