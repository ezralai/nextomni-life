'use client';

import React, { useState } from 'react';
import { CircadianMetric } from '@nextomni/types';
import { 
  Sun, 
  Moon, 
  Star, 
  BatteryCharging, 
  Coffee, 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  Wind
} from 'lucide-react';

interface CircadianTrackerProps {
  circadian: CircadianMetric;
  onUpdateCircadian: (metric: CircadianMetric) => void;
}

export function CircadianTracker({ circadian, onUpdateCircadian }: CircadianTrackerProps) {
  const [sunlight, setSunlight] = useState(circadian.morningSunlightMinutes || 20);
  const [sleepHours, setSleepHours] = useState(circadian.sleepDurationHours || 7.5);
  const [sleepQuality, setSleepQuality] = useState(circadian.sleepQuality || 4);
  const [caffeineCutoff, setCaffeineCutoff] = useState(circadian.caffeineCutoffFollowed ?? true);
  const [windDown, setWindDown] = useState(circadian.windDownCompleted ?? true);

  // Dynamic formula for Morning Readiness Score (0-100)
  const calculatedReadiness = Math.min(
    100,
    Math.round((sleepHours * 9.2) + (sleepQuality * 5.5) + (sunlight * 0.45))
  );

  function handleSave(
    newSunlight = sunlight, 
    newSleep = sleepHours, 
    newQuality = sleepQuality,
    newCaffeine = caffeineCutoff,
    newWind = windDown
  ) {
    const updated: CircadianMetric = {
      date: new Date().toISOString().split('T')[0],
      morningSunlightMinutes: newSunlight,
      peakEnergySlot: 'morning',
      sleepDurationHours: newSleep,
      sleepQuality: newQuality,
      readinessScore: Math.min(100, Math.round((newSleep * 9.2) + (newQuality * 5.5) + (newSunlight * 0.45))),
      caffeineCutoffFollowed: newCaffeine,
      windDownCompleted: newWind,
    };
    onUpdateCircadian(updated);
  }

  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <Sun className="h-3.5 w-3.5" />
            <span>Pillar 3 • Circadian Rhythm & Chronobiology</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Circadian Energy Optimization & Sleep Recovery</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300">
            <BatteryCharging className="h-4 w-4" />
            <span>READINESS: {calculatedReadiness}%</span>
          </div>
        </div>
      </div>

      {/* Grid: Recovery Dials + Huberman Protocols */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Morning Readiness Dial */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col items-center justify-center text-center space-y-4">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Morning Readiness Score
          </span>

          <div className="relative flex items-center justify-center w-36 h-36">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
                className="text-white/[0.06]"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
                strokeDasharray={251}
                strokeDashoffset={251 - (251 * calculatedReadiness) / 100}
                strokeLinecap="round"
                className="text-amber-400 transition-all duration-700"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold font-mono text-white">
                {calculatedReadiness}
              </span>
              <span className="text-[10px] font-mono text-amber-300 uppercase">
                {calculatedReadiness >= 85 ? 'Optimal Flow' : calculatedReadiness >= 70 ? 'Steady Energy' : 'Restoration'}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-[240px]">
            {calculatedReadiness >= 85 
              ? 'Neural alertness is peaked. High cognitive load deep work is supported.'
              : 'Moderate readiness. Ensure outdoor photon exposure and buffer context switching.'}
          </p>
        </div>

        {/* Card 2: Sleep & Recovery Log */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Moon className="h-3.5 w-3.5 text-indigo-400" />
              Sleep & Sleep Architecture
            </span>
            <span className="text-xs font-mono font-bold text-white">{sleepHours} hrs</span>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">
              Sleep Duration: {sleepHours} hours
            </label>
            <input
              type="range"
              min="4"
              max="11"
              step="0.1"
              value={sleepHours}
              onChange={e => {
                const val = parseFloat(e.target.value);
                setSleepHours(val);
                handleSave(sunlight, val, sleepQuality, caffeineCutoff, windDown);
              }}
              className="w-full accent-indigo-400 h-1.5 bg-white/[0.1] rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1.5">
              Subjective Sleep Quality
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setSleepQuality(star);
                    handleSave(sunlight, sleepHours, star, caffeineCutoff, windDown);
                  }}
                  className="p-1 rounded-lg hover:bg-white/[0.05] transition-all"
                >
                  <Star
                    className={`h-5 w-5 ${
                      star <= sleepQuality
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-mono text-slate-400">{sleepQuality}/5 stars</span>
            </div>
          </div>

          {/* Morning Sunlight Logger */}
          <div className="pt-2 border-t border-white/[0.06]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                Morning Sunlight (Huberman Protocol)
              </span>
              <span className="text-xs font-mono font-bold text-amber-400">{sunlight} min</span>
            </div>
            <input
              type="range"
              min="0"
              max="45"
              step="5"
              value={sunlight}
              onChange={e => {
                const val = parseInt(e.target.value);
                setSunlight(val);
                handleSave(val, sleepHours, sleepQuality, caffeineCutoff, windDown);
              }}
              className="w-full accent-amber-400 h-1.5 bg-white/[0.1] rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Target: 15–30 min outdoor sunlight within 60 min of waking to reset circadian clocks.
            </p>
          </div>
        </div>

        {/* Card 3: Chronotype Peak Energy Forecast & Protocols */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3.5">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            24H Chronotype Energy Peaks
          </span>

          <div className="space-y-2 text-xs">
            {/* Morning Peak */}
            <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between">
              <div>
                <p className="font-semibold text-emerald-300">09:00 – 12:00: Morning Cognitive Peak</p>
                <p className="text-[10px] text-slate-400">Prime window for deep work & complex code.</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>

            {/* Afternoon Trough */}
            <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-center justify-between">
              <div>
                <p className="font-semibold text-amber-300">13:30 – 15:30: Post-Prandial Trough</p>
                <p className="text-[10px] text-slate-400">Optimal for active recall, flashcards or NSDR.</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-amber-400" />
            </div>

            {/* Evening Rebound */}
            <div className="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex items-center justify-between">
              <div>
                <p className="font-semibold text-indigo-300">16:30 – 19:00: Evening Creative Rebound</p>
                <p className="text-[10px] text-slate-400">Gym, sprint meetings, or reflective planning.</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
            </div>
          </div>

          {/* Protocols checklist */}
          <div className="pt-2 border-t border-white/[0.06] space-y-2 text-xs">
            <button
              onClick={() => {
                const next = !caffeineCutoff;
                setCaffeineCutoff(next);
                handleSave(sunlight, sleepHours, sleepQuality, next, windDown);
              }}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center gap-2">
                <Coffee className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-slate-300">14:00 Caffeine Cutoff Respected</span>
              </div>
              {caffeineCutoff ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-slate-600" />
              )}
            </button>

            <button
              onClick={() => {
                const next = !windDown;
                setWindDown(next);
                handleSave(sunlight, sleepHours, sleepQuality, caffeineCutoff, next);
              }}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center gap-2">
                <Wind className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-slate-300">Evening Screen Wind-Down Protocol</span>
              </div>
              {windDown ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
