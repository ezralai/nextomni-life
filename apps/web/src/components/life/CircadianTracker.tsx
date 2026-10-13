'use client';

import React, { useState, useEffect } from 'react';
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
  Wind,
  Sparkles,
  Zap,
  Play,
  Pause,
  RotateCcw,
  HeartPulse
} from 'lucide-react';

interface CircadianTrackerProps {
  circadian: CircadianMetric;
  onUpdateCircadian: (metric: CircadianMetric) => void;
}

type Chronotype = 'lark' | 'bear' | 'wolf';

export function CircadianTracker({ circadian, onUpdateCircadian }: CircadianTrackerProps) {
  const [sunlight, setSunlight] = useState(circadian.morningSunlightMinutes || 20);
  const [sleepHours, setSleepHours] = useState(circadian.sleepDurationHours || 7.5);
  const [sleepQuality, setSleepQuality] = useState(circadian.sleepQuality || 4);
  const [caffeineCutoff, setCaffeineCutoff] = useState(circadian.caffeineCutoffFollowed ?? true);
  const [windDown, setWindDown] = useState(circadian.windDownCompleted ?? true);
  const [chronotype, setChronotype] = useState<Chronotype>('bear');

  // NSDR (Non-Sleep Deep Rest) Micro-Protocol State
  const [isNsdrActive, setIsNsdrActive] = useState(false);
  const [nsdrSecondsLeft, setNsdrSecondsLeft] = useState(10 * 60);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isNsdrActive && nsdrSecondsLeft > 0) {
      timer = setInterval(() => {
        setNsdrSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (nsdrSecondsLeft === 0) {
      setIsNsdrActive(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isNsdrActive, nsdrSecondsLeft]);

  // Dynamic formula for Morning Readiness Score (0-100)
  const calculatedReadiness = Math.min(
    100,
    Math.round((sleepHours * 9.2) + (sleepQuality * 5.5) + (sunlight * 0.45))
  );

  // Matthew Walker Sleep Architecture Estimations
  const estimatedDeepSleepHours = Math.round((sleepHours * (0.18 + (sleepQuality * 0.015))) * 10) / 10;
  const estimatedRemHours = Math.round((sleepHours * (0.22 + (sleepQuality * 0.01))) * 10) / 10;

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
      peakEnergySlot: chronotype === 'lark' ? 'morning' : chronotype === 'wolf' ? 'evening' : 'morning',
      sleepDurationHours: newSleep,
      sleepQuality: newQuality,
      readinessScore: Math.min(100, Math.round((newSleep * 9.2) + (newQuality * 5.5) + (newSunlight * 0.45))),
      caffeineCutoffFollowed: newCaffeine,
      windDownCompleted: newWind,
    };
    onUpdateCircadian(updated);
  }

  // Dynamic Peak Windows based on Chronotype
  const CHRONOTYPE_WINDOWS = {
    bear: [
      { window: '09:30 – 12:30', title: 'Mid-Morning Cognitive Peak', desc: 'Prime neural bandwidth for complex code architecture & deep work.', color: 'emerald' },
      { window: '13:30 – 15:30', title: 'Post-Prandial Adenosine Trough', desc: 'Ideal for 15m NSDR, active flashcard recall, or low-cognitive triage.', color: 'amber' },
      { window: '17:00 – 19:30', title: 'Evening Creative Rebound', desc: 'Peak muscle temperature & divergent idea generation.', color: 'indigo' },
    ],
    lark: [
      { window: '07:30 – 10:30', title: 'Early Dawn Cognitive Peak', desc: 'Prefrontal cortex is sharpest. Tackle highest-friction needle mover first.', color: 'emerald' },
      { window: '12:30 – 14:30', title: 'Midday Circadian Dip', desc: 'Take outdoor walk or NSDR recharge; protect against early burnout.', color: 'amber' },
      { window: '15:30 – 18:00', title: 'Late Afternoon Wrap-up', desc: 'Sprint planning and documentation. Begin dimming screens by 21:00.', color: 'indigo' },
    ],
    wolf: [
      { window: '11:00 – 14:00', title: 'Late Morning Flow Initiation', desc: 'Cognitive gears lock in. Avoid early meetings; protect deep coding.', color: 'emerald' },
      { window: '15:30 – 17:00', title: 'Afternoon Buffer Window', desc: 'Collaborative code reviews, architecture discussions, or exercise.', color: 'amber' },
      { window: '19:00 – 22:30', title: 'Nocturnal Flow Engine', desc: 'High mental clarity without external slack distractions.', color: 'indigo' },
    ],
  };

  const currentWindows = CHRONOTYPE_WINDOWS[chronotype];

  const nsdrMins = Math.floor(nsdrSecondsLeft / 60);
  const nsdrSecs = nsdrSecondsLeft % 60;
  const nsdrFormatted = `${String(nsdrMins).padStart(2, '0')}:${String(nsdrSecs).padStart(2, '0')}`;

  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-6 transition-all duration-300">
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

      {/* Chronotype Profile Selector */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
            Active Chronotype Profile:
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06] text-xs font-mono">
          {[
            { id: 'lark', label: 'Lion / Lark (Early)', desc: '05:00 - 21:30' },
            { id: 'bear', label: 'Bear (Balanced)', desc: '07:00 - 23:00' },
            { id: 'wolf', label: 'Wolf (Night Owl)', desc: '09:00 - 01:00' },
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setChronotype(c.id as Chronotype)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                chronotype === c.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Recovery Dials + Huberman Protocols */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Morning Readiness Dial & Sleep Architecture */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col items-center justify-between text-center space-y-4 hover:border-amber-400/20 transition-all">
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

          {/* Sleep Architecture Estimations (Walker Protocol) */}
          <div className="w-full grid grid-cols-2 gap-2 text-left pt-2 border-t border-white/[0.06]">
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[10px] font-mono text-indigo-300 uppercase block">Deep (Slow Wave)</span>
              <span className="text-sm font-bold font-mono text-white">{estimatedDeepSleepHours} hrs</span>
              <span className="text-[10px] text-slate-500 block">Physical repair</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[10px] font-mono text-purple-300 uppercase block">REM Dreaming</span>
              <span className="text-sm font-bold font-mono text-white">{estimatedRemHours} hrs</span>
              <span className="text-[10px] text-slate-500 block">Memory synthesis</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {calculatedReadiness >= 85 
              ? 'Neural alertness peaked. High-cognitive load deep work is optimal.'
              : 'Moderate readiness. Ensure outdoor photon exposure and buffer context switching.'}
          </p>
        </div>

        {/* Card 2: Sleep & Recovery Log */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4 hover:border-indigo-400/20 transition-all">
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

        {/* Card 3: Dynamic Chronotype Energy Peaks & NSDR Protocol */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3.5 hover:border-emerald-400/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              24H Energy Forecast
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.06] text-emerald-400">
              {chronotype.toUpperCase()}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {currentWindows.map((w, idx) => (
              <div 
                key={idx} 
                className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  w.color === 'emerald'
                    ? 'bg-emerald-950/20 border-emerald-500/20'
                    : w.color === 'amber'
                    ? 'bg-amber-950/20 border-amber-500/20'
                    : 'bg-indigo-950/20 border-indigo-500/20'
                }`}
              >
                <div>
                  <p className={`font-semibold ${
                    w.color === 'emerald' ? 'text-emerald-300' : w.color === 'amber' ? 'text-amber-300' : 'text-indigo-300'
                  }`}>
                    {w.window}: {w.title}
                  </p>
                  <p className="text-[10px] text-slate-400">{w.desc}</p>
                </div>
                <span className={`h-2 w-2 rounded-full shrink-0 ${
                  w.color === 'emerald' ? 'bg-emerald-400' : w.color === 'amber' ? 'bg-amber-400' : 'bg-indigo-400'
                }`} />
              </div>
            ))}
          </div>

          {/* Stanford NSDR Protocol Micro-Timer */}
          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300 ${isNsdrActive ? 'animate-pulse' : ''}`}>
                <Wind className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-white">10-Min NSDR Neuro-Reset</p>
                <p className="text-[10px] text-purple-300/80 font-mono">
                  {isNsdrActive ? `Restoring dopamine (${nsdrFormatted})` : 'Restore mental stamina without sleep'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsNsdrActive(!isNsdrActive)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  isNsdrActive
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20'
                }`}
              >
                {isNsdrActive ? 'Pause' : 'Start'}
              </button>
              {nsdrSecondsLeft < 10 * 60 && (
                <button
                  onClick={() => {
                    setIsNsdrActive(false);
                    setNsdrSecondsLeft(10 * 60);
                  }}
                  title="Reset NSDR"
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
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

