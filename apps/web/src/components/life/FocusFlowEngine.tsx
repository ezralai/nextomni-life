'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FocusSessionItem } from '@nextomni/types';
import { soundscape, SoundscapeType } from '@/lib/soundscape-engine';
import { triggerConfetti } from '@/lib/confetti';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Headphones, 
  ShieldCheck, 
  Flame, 
  Clock, 
  Radio,
  CheckCircle,
  Sparkles,
  Trash2,
  Zap
} from 'lucide-react';

interface FocusFlowEngineProps {
  sessions: FocusSessionItem[];
  onLogSession: (session: FocusSessionItem) => void;
  onDeleteSession?: (id: string) => void;
  onClearSessions?: () => void;
}

type FocusMode = 'pomodoro' | 'ultradian' | 'deep_block' | 'flow';

export function FocusFlowEngine({ sessions, onLogSession, onDeleteSession, onClearSessions }: FocusFlowEngineProps) {
  const [mode, setMode] = useState<FocusMode>('pomodoro');
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [flowSeconds, setFlowSeconds] = useState(0);
  const [selectedSoundscape, setSelectedSoundscape] = useState<SoundscapeType>('binaural_gamma');
  const [volume, setVolume] = useState(0.4);
  const [sessionNotes, setSessionNotes] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('CS402');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Default mode durations in seconds
  const MODE_DURATIONS: Record<FocusMode, number> = {
    pomodoro: 25 * 60,
    ultradian: 52 * 60,
    deep_block: 90 * 60,
    flow: 0,
  };
  const BREAK_DURATIONS: Record<FocusMode, number> = {
    pomodoro: 5 * 60,
    ultradian: 17 * 60,
    deep_block: 20 * 60,
    flow: 5 * 60,
  };

  // Switch mode
  function handleModeChange(newMode: FocusMode) {
    setIsActive(false);
    setIsBreak(false);
    setMode(newMode);
    if (newMode === 'flow') {
      setFlowSeconds(0);
    } else {
      setSecondsLeft(MODE_DURATIONS[newMode]);
    }
  }

  // Timer Tick
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        if (mode === 'flow') {
          setFlowSeconds(prev => prev + 1);
        } else {
          setSecondsLeft(prev => {
            if (prev <= 1) {
              handleTimerComplete();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, mode, isBreak]);

  // Handle completion
  function handleTimerComplete() {
    setIsActive(false);
    if (!isBreak) {
      // Completed deep work session
      const durationMins = mode === 'pomodoro' 
        ? 25 
        : mode === 'ultradian' 
        ? 52 
        : mode === 'deep_block'
        ? 90
        : Math.max(1, Math.round(flowSeconds / 60));
        
      const newSession: FocusSessionItem = {
        id: `fs-${Date.now()}`,
        mode: mode === 'deep_block' ? 'ultradian' : mode,
        durationMinutes: durationMins,
        completedMinutes: durationMins,
        soundscapeType: selectedSoundscape,
        notes: sessionNotes || 'Deep cognitive focus window completed.',
        courseId: selectedCourse,
        startedAt: new Date(Date.now() - durationMins * 60000).toISOString(),
        completedAt: new Date().toISOString(),
        isCompleted: true,
      };
      onLogSession(newSession);
      triggerConfetti(2500);
      setSessionNotes('');
      // Switch to break
      setIsBreak(true);
      setSecondsLeft(BREAK_DURATIONS[mode]);
    } else {
      // Finished break
      setIsBreak(false);
      setSecondsLeft(MODE_DURATIONS[mode]);
    }
  }

  function togglePlay() {
    if (!isActive) {
      setIsActive(true);
      if (soundscape && selectedSoundscape !== 'none') {
        soundscape.setVolume(volume);
        soundscape.play(selectedSoundscape);
      }
    } else {
      setIsActive(false);
      if (soundscape) {
        soundscape.stop();
      }
    }
  }

  function handleReset() {
    setIsActive(false);
    setIsBreak(false);
    if (soundscape) soundscape.stop();
    if (mode === 'flow') {
      setFlowSeconds(0);
    } else {
      setSecondsLeft(MODE_DURATIONS[mode]);
    }
  }

  function handleSoundscapeChange(type: SoundscapeType) {
    setSelectedSoundscape(type);
    if (soundscape) {
      if (isActive && type !== 'none') {
        soundscape.setVolume(volume);
        soundscape.play(type);
      } else {
        soundscape.stop();
      }
    }
  }

  function handleVolumeChange(val: number) {
    setVolume(val);
    if (soundscape) {
      soundscape.setVolume(val);
    }
  }

  // Formatting helpers
  const totalDuration = isBreak ? BREAK_DURATIONS[mode] : MODE_DURATIONS[mode];
  const progressPercent = mode === 'flow' 
    ? Math.min(100, (flowSeconds / 3600) * 100) 
    : Math.min(100, ((totalDuration - secondsLeft) / Math.max(1, totalDuration)) * 100);

  const displayMinutes = mode === 'flow' ? Math.floor(flowSeconds / 60) : Math.floor(secondsLeft / 60);
  const displaySeconds = mode === 'flow' ? flowSeconds % 60 : secondsLeft % 60;
  const timeFormatted = `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;

  const totalFocusHoursLogged = Math.round(sessions.reduce((acc, s) => acc + (s.completedMinutes / 60), 0) * 10) / 10;

  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-6 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            <span>Pillar 2 • Deep Work & Focus Engine</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Cal Newport Ultradian Focus Engine</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
            <span className="text-slate-400">Total Focus:</span> <strong className="text-white">{totalFocusHoursLogged} hrs</strong>
          </div>
        </div>
      </div>

      {/* Main Engine Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Interactive Circular Timer */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-white/[0.02] rounded-3xl border border-white/[0.06] relative overflow-hidden">
          {/* Mode Selector Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-6 text-xs font-mono flex-wrap justify-center">
            {[
              { id: 'pomodoro', label: 'Pomodoro 25/5' },
              { id: 'ultradian', label: 'Ultradian 52/17' },
              { id: 'deep_block', label: 'Deep 90/20' },
              { id: 'flow', label: 'Open Flow' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => handleModeChange(m.id as FocusMode)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  mode === m.id
                    ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* SVG Circular Dial */}
          <div className="relative flex items-center justify-center w-64 h-64">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Ring */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="5"
                className="text-white/[0.06]"
                fill="transparent"
              />
              {/* Progress Ring */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="5"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * progressPercent) / 100}
                strokeLinecap="round"
                className={`transition-all duration-500 ${
                  isBreak ? 'text-emerald-400' : 'text-indigo-500'
                }`}
                fill="transparent"
              />
            </svg>

            {/* Timer Digits Inside Circle */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`text-4xl sm:text-5xl font-mono font-extrabold tracking-tight ${
                isBreak ? 'text-emerald-400' : 'text-white'
              }`}>
                {timeFormatted}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mt-1">
                {isBreak ? 'Restorative Break' : mode === 'flow' ? 'Flow Stopwatch' : 'Deep Work Block'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={togglePlay}
              className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all shadow-xl active:scale-95 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-amber-500/20'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
            </button>

            <button
              onClick={handleReset}
              title="Reset Timer"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all border border-white/[0.08]"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right: Soundscape Synthesizer & Session Logging */}
        <div className="lg:col-span-6 space-y-4">
          {/* Procedural Soundscape Card */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                  Procedural Soundscape (Web Audio API)
                </span>
              </div>
              {isActive && selectedSoundscape !== 'none' && (
                <div className="flex items-end gap-1 h-5 px-2">
                  <span className="h-3 w-1 bg-cyan-400 animate-pulse rounded-full" />
                  <span className="h-5 w-1 bg-indigo-400 animate-bounce rounded-full" />
                  <span className="h-2 w-1 bg-cyan-400 animate-pulse rounded-full" />
                  <span className="h-4 w-1 bg-emerald-400 animate-bounce rounded-full" />
                  <span className="h-3 w-1 bg-cyan-400 animate-pulse rounded-full" />
                </div>
              )}
            </div>

            {/* Soundscape Options Grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'binaural_gamma', label: '40Hz Gamma Beats', desc: 'Neural synchrony' },
                { id: 'rain', label: 'Soothing Pink Rain', desc: 'White-noise masking' },
                { id: 'white_noise', label: 'Deep Cosmic Noise', desc: 'Tunnel concentration' },
                { id: 'cafe', label: 'Cafe Murmur', desc: 'Acoustic warm flow' },
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => handleSoundscapeChange(s.id as SoundscapeType)}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    selectedSoundscape === s.id
                      ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-300'
                      : 'bg-white/[0.02] border-white/[0.05] text-slate-400 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  <p className="text-xs font-semibold">{s.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{s.desc}</p>
                </button>
              ))}
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 pt-1">
              {volume === 0 ? (
                <VolumeX className="h-4 w-4 text-slate-500" />
              ) : (
                <Volume2 className="h-4 w-4 text-slate-400" />
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={e => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 h-1 bg-white/[0.1] rounded-lg cursor-pointer"
              />
              <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          {/* Distraction Shield Notes */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                  Distraction Shield & Focus Notes
                </span>
              </div>
              <select
                value={selectedCourse}
                onChange={e => setSelectedCourse(e.target.value)}
                className="bg-obsidian-800 border border-white/[0.08] text-[11px] rounded-lg px-2 py-1 text-slate-300 focus:outline-none"
              >
                <option value="CS402">CS402 - Compilers</option>
                <option value="CS301">CS301 - Algorithms</option>
                <option value="LIFE_OS">NextOmni LifeOS</option>
              </select>
            </div>

            <textarea
              rows={2}
              value={sessionNotes}
              onChange={e => setSessionNotes(e.target.value)}
              placeholder="Jot down active needle mover or parking lot distractions..."
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* Recent Completed Sessions Log */}
      <div className="pt-2 border-t border-white/[0.06] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Telemetry Focus Session History ({sessions.length})
          </h4>
          {sessions.length > 0 && onClearSessions && (
            <button
              onClick={onClearSessions}
              className="text-[11px] font-mono text-slate-500 hover:text-rose-400 transition-colors"
            >
              Clear Log
            </button>
          )}
        </div>

        {sessions.length === 0 ? (
          <div className="p-6 text-center text-xs font-mono text-slate-500 border border-dashed border-white/[0.06] rounded-xl">
            No focus sessions logged yet. Start a timer block above to capture deep work telemetry.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sessions.slice(0, 4).map(sess => (
              <div
                key={sess.id}
                className="group p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate max-w-[180px] sm:max-w-[220px]">
                      {sess.notes || 'Deep Focus Session'}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {sess.mode.toUpperCase()} • {sess.completedMinutes} mins • {sess.courseId || 'General'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    COMPLETED
                  </span>
                  {onDeleteSession && (
                    <button
                      type="button"
                      title="Delete session record"
                      onClick={() => onDeleteSession(sess.id)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

