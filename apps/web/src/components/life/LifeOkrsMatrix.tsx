'use client';

import React, { useState } from 'react';
import { LifeGoalItem } from '@nextomni/types';
import { 
  Target, 
  TrendingUp, 
  Award, 
  Plus, 
  CheckCircle2, 
  Heart, 
  Briefcase, 
  Wallet, 
  Users, 
  BookOpen,
  X
} from 'lucide-react';

interface LifeOkrsMatrixProps {
  okrs: LifeGoalItem[];
  onAddOkr: (okr: LifeGoalItem) => void;
  onUpdateOkrProgress: (id: string, newProgress: number) => void;
}

export function LifeOkrsMatrix({ okrs, onAddOkr, onUpdateOkrProgress }: LifeOkrsMatrixProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDimension, setNewDimension] = useState<'health' | 'career' | 'finance' | 'relationships' | 'learning'>('health');
  const [newLevel, setNewLevel] = useState<'vision' | 'objective' | 'key_result'>('key_result');
  const [newTarget, setNewTarget] = useState(100);
  const [newUnit, setNewUnit] = useState('%');

  const DIMENSIONS = [
    { id: 'health', label: 'Health & Vitality', icon: Heart, color: '#10b981', ringColor: 'text-emerald-500' },
    { id: 'career', label: 'Career & Craft', icon: Briefcase, color: '#06b6d4', ringColor: 'text-cyan-500' },
    { id: 'finance', label: 'Finances & Freedom', icon: Wallet, color: '#f59e0b', ringColor: 'text-amber-500' },
    { id: 'relationships', label: 'Relationships', icon: Users, color: '#f43f5e', ringColor: 'text-rose-500' },
    { id: 'learning', label: 'Mindset & Learning', icon: BookOpen, color: '#8b5cf6', ringColor: 'text-purple-500' },
  ];

  function getDimensionAvg(dim: string): number {
    const matched = okrs.filter(o => o.dimension === dim);
    if (matched.length === 0) return 75; // Default healthy baseline
    const sum = matched.reduce((acc, o) => acc + o.progressPercent, 0);
    return Math.round(sum / matched.length);
  }

  function handleCreateOkr(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const goal: LifeGoalItem = {
      id: `g-${Date.now()}`,
      title: newTitle.trim(),
      dimension: newDimension,
      level: newLevel,
      targetValue: newTarget,
      currentValue: Math.round(newTarget * 0.5),
      unit: newUnit,
      progressPercent: 50,
      isCompleted: false,
    };

    onAddOkr(goal);
    setShowAddModal(false);
    setNewTitle('');
  }

  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Target className="h-3.5 w-3.5" />
            <span>Pillar 5 • Life OKRs & Vision Architecture</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Multi-Year Life Visions & Hierarchical Key Results</h2>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span>Anchor New OKR</span>
        </button>
      </div>

      {/* The 5 Life Dimensions Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {DIMENSIONS.map(dim => {
          const Icon = dim.icon;
          const score = getDimensionAvg(dim.id);
          return (
            <div
              key={dim.id}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col items-center text-center space-y-2 hover:bg-white/[0.04] transition-all"
            >
              {/* Circular Gauge */}
              <div className="relative flex items-center justify-center w-16 h-16">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-white/[0.06]"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={251}
                    strokeDashoffset={251 - (251 * score) / 100}
                    strokeLinecap="round"
                    className={`${dim.ringColor} transition-all duration-700`}
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xs font-bold font-mono text-white">{score}%</span>
                </div>
              </div>

              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-white flex items-center justify-center gap-1">
                  <Icon className="h-3 w-3" style={{ color: dim.color }} />
                  <span>{dim.label}</span>
                </p>
                <p className="text-[10px] text-slate-500 font-mono">Vision Alignment</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hierarchical Goals List */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          Active Objectives & Key Results (OKRs)
        </h3>

        <div className="space-y-3">
          {okrs.map(okr => {
            const dimObj = DIMENSIONS.find(d => d.id === okr.dimension) || DIMENSIONS[0];
            return (
              <div
                key={okr.id}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono px-2 py-0.5 rounded uppercase font-semibold text-slate-300 bg-white/[0.06] border border-white/[0.08]">
                      {okr.level.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded capitalize" style={{ color: dimObj.color }}>
                      {dimObj.label}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white truncate">
                    {okr.title}
                  </h4>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, okr.progressPercent)}%`,
                          backgroundColor: dimObj.color,
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-300 w-12 text-right">
                      {Math.round(okr.progressPercent)}%
                    </span>
                  </div>
                </div>

                {/* Metric count */}
                <div className="flex items-center gap-2 shrink-0 sm:pt-0 pt-2 border-t sm:border-t-0 border-white/[0.04]">
                  <span className="text-xs font-mono text-slate-400">
                    {okr.currentValue} / {okr.targetValue} {okr.unit}
                  </span>
                  <button
                    onClick={() => onUpdateOkrProgress(okr.id, Math.min(100, okr.progressPercent + 5))}
                    className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs px-2"
                  >
                    +5%
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Anchor New OKR */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-6 border border-white/[0.12] shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">Vision Architecture</span>
                <h3 className="text-lg font-bold text-white">Anchor Life Objective / Key Result</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOkr} className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Goal Statement *</label>
                <input
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Master High-Output Distributed Architecture"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Dimension</label>
                  <select
                    value={newDimension}
                    onChange={e => setNewDimension(e.target.value as any)}
                    className="w-full bg-obsidian-800 border border-white/[0.1] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="health">Health & Vitality</option>
                    <option value="career">Career & Craft</option>
                    <option value="finance">Finances & Freedom</option>
                    <option value="relationships">Relationships</option>
                    <option value="learning">Mindset & Learning</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Hierarchy Level</label>
                  <select
                    value={newLevel}
                    onChange={e => setNewLevel(e.target.value as any)}
                    className="w-full bg-obsidian-800 border border-white/[0.1] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="vision">Life Vision (3-5 Years)</option>
                    <option value="objective">Annual Objective (1 Year)</option>
                    <option value="key_result">Quarterly Key Result (Q1-Q4)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Target Value</label>
                  <input
                    type="number"
                    value={newTarget}
                    onChange={e => setNewTarget(parseFloat(e.target.value) || 100)}
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Measurement Unit</label>
                  <input
                    value={newUnit}
                    onChange={e => setNewUnit(e.target.value)}
                    placeholder="%, hrs, MYR, modules"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
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
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20"
                >
                  Anchor Goal In LifeOS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
