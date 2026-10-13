'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar as CalendarIcon, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Layers,
  RotateCw,
  Plus,
  ArrowRight
} from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const TIMETABLE_SLOTS = [
  { day: 'Monday', time: '09:00 - 11:00', title: 'Distributed Systems Lecture', code: 'CS4102', loc: 'Lab 4', color: 'from-indigo-600 to-indigo-800' },
  { day: 'Monday', time: '14:00 - 16:00', title: 'Machine Learning Lab', code: 'AI3205', loc: 'AI Research Hall', color: 'from-cyan-600 to-cyan-800' },
  { day: 'Tuesday', time: '10:00 - 12:00', title: 'Enterprise Arch Seminar', code: 'SE4301', loc: 'Auditorium 2', color: 'from-emerald-600 to-emerald-800' },
  { day: 'Wednesday', time: '13:00 - 16:00', title: 'Consensual Coding Sprint', code: 'PROJECT', loc: 'Library Pod 3', color: 'from-amber-600 to-amber-800' },
  { day: 'Thursday', time: '11:00 - 13:00', title: 'Applied ML Tutorial', code: 'AI3205', loc: 'Comp Block C', color: 'from-cyan-600 to-cyan-800' },
  { day: 'Friday', time: '15:00 - 17:00', title: 'Capstone Sprint Review', code: 'CAPSTONE', loc: 'Innovation Hub', color: 'from-rose-600 to-rose-800' },
];

const FLASHCARDS = [
  {
    id: 1,
    course: 'Distributed Systems',
    front: 'What are the two core safety properties guaranteed by the Raft consensus algorithm?',
    back: 'Election Safety (at most one leader per term) and Leader Append-Only (leaders never overwrite or truncate their own logs).',
    mastered: false,
  },
  {
    id: 2,
    course: 'Applied Machine Learning',
    front: 'Why do Transformer attention layers scale quadratically with sequence length O(N²)?',
    back: 'Because each token in the sequence computes a dot-product attention score against every other token in the sequence, producing an N×N attention matrix.',
    mastered: true,
  },
  {
    id: 3,
    course: 'Software Architecture',
    front: 'Explain the single primary advantage of Hexagonal (Ports & Adapters) architecture.',
    back: 'It decouples core business domain logic from presentation and persistence details, allowing external drivers (web, CLI, mock DB) to be swapped without changing domain code.',
    mastered: false,
  }
];

interface SyllabusDecompositionResult {
  courseName: string;
  extractedWeeks?: number;
  keyMilestones: string[];
  projectedStudyHours: string;
}

export default function StudySuitePage() {
  const [activeTab, setActiveTab] = useState<'timetable' | 'courses' | 'flashcards' | 'syllabus'>('timetable');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [syllabusText, setSyllabusText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [syllabusResult, setSyllabusResult] = useState<SyllabusDecompositionResult | null>(null);

  const card = FLASHCARDS[currentCardIndex];

  function handleAnalyzeSyllabus() {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setSyllabusResult({
        courseName: 'Distributed Systems & Cloud Computing',
        extractedWeeks: 14,
        keyMilestones: [
          'Week 4: Socket Programming & RPC Protocol',
          'Week 8: Raft Distributed State Machine',
          'Week 12: Byzantine Fault Tolerance & Paxos'
        ],
        projectedStudyHours: '6.5 hours / week'
      });
    }, 1200);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Suite Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-white/[0.08]">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">NextOmni Study Suite</h1>
            <p className="text-xs sm:text-sm text-slate-400">Visual Timetable, GPA Modeling, Syllabus AI Analyzer & Active Recall</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
          {(['timetable', 'courses', 'flashcards', 'syllabus'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'bg-omni-indigo text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Visual Academic Timetable */}
      {activeTab === 'timetable' && (
        <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <CalendarIcon className="h-4 w-4 text-omni-indigo" />
              <span>Weekly Academic Time-Block Grid</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Semester 1 • 2026/2027</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
            {DAYS.map((day) => {
              const daySlots = TIMETABLE_SLOTS.filter(s => s.day === day);
              return (
                <div key={day} className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-3 space-y-3">
                  <div className="text-xs font-semibold text-slate-300 pb-2 border-b border-white/[0.06] flex items-center justify-between">
                    <span>{day}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{daySlots.length} sessions</span>
                  </div>

                  <div className="space-y-2">
                    {daySlots.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-600">No lectures</div>
                    ) : (
                      daySlots.map((slot, i) => (
                        <div key={i} className={`p-3 rounded-xl bg-gradient-to-br ${slot.color} text-white shadow-md space-y-1`}>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 inline-block">
                            {slot.code}
                          </span>
                          <h4 className="text-xs font-bold leading-snug">{slot.title}</h4>
                          <div className="flex items-center justify-between text-[11px] text-white/80 pt-1">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {slot.time}</span>
                            <span>{slot.loc}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Courses & GPA Projections */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-omni-indigo">CS4102</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold">A (88.0%)</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-2">Distributed Systems & Cloud Architecture</h3>
              <p className="text-xs text-slate-400 mt-1">4 Credits • Exam + Milestones</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Syllabus Progress</span>
                  <span className="font-mono">65%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/[0.08]">
                  <div className="h-1.5 rounded-full bg-indigo-500 w-[65%]" />
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between">
              <span>Target: A (85.0%+)</span>
              <span className="text-white font-mono font-medium">Passing Safe</span>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-omni-cyan">AI3205</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold">A+ (92.0%)</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-2">Applied Machine Learning & GenAI Systems</h3>
              <p className="text-xs text-slate-400 mt-1">3 Credits • Research Project</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Syllabus Progress</span>
                  <span className="font-mono">80%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/[0.08]">
                  <div className="h-1.5 rounded-full bg-cyan-500 w-[80%]" />
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between">
              <span>Target: A+ (90.0%+)</span>
              <span className="text-white font-mono font-medium">Exceeding Target</span>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-omni-emerald">SE4301</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold">A- (85.0%)</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-2">Software Architecture & Enterprise Microservices</h3>
              <p className="text-xs text-slate-400 mt-1">3 Credits • Architecture Defense</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Syllabus Progress</span>
                  <span className="font-mono">50%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/[0.08]">
                  <div className="h-1.5 rounded-full bg-emerald-500 w-[50%]" />
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between">
              <span>Target: A (80.0%+)</span>
              <span className="text-white font-mono font-medium">On Track</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Active Recall Flashcard Engine */}
      {activeTab === 'flashcards' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono text-omni-indigo uppercase tracking-wider">Active Recall Flashcard Deck</span>
            <h2 className="text-xl font-bold text-white">Card {currentCardIndex + 1} of {FLASHCARDS.length}</h2>
          </div>

          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[260px] glass-panel rounded-3xl p-8 border border-white/[0.1] hover:border-omni-indigo/40 cursor-pointer flex flex-col justify-between transition-all select-none shadow-xl"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-omni-cyan">{card.course}</span>
              <span className="flex items-center gap-1 text-[11px] text-slate-500"><RotateCw className="h-3 w-3" /> Click to flip</span>
            </div>

            <div className="my-6 text-center">
              {!isFlipped ? (
                <p className="text-lg font-medium text-white leading-relaxed">{card.front}</p>
              ) : (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">RECALL ANSWER</span>
                  <p className="text-base text-slate-200 leading-relaxed">{card.back}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/[0.06]">
              <span>{isFlipped ? 'Answer Revealed' : 'Prompt Question'}</span>
              <span className={card.mastered ? 'text-emerald-400 font-medium' : 'text-amber-400'}>
                {card.mastered ? 'Mastered' : 'Needs Review'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : FLASHCARDS.length - 1));
              }}
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs text-white border border-white/[0.08] transition-all"
            >
              Previous Card
            </button>
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex((prev) => (prev < FLASHCARDS.length - 1 ? prev + 1 : 0));
              }}
              className="px-4 py-2 rounded-xl bg-omni-indigo hover:bg-indigo-600 text-xs font-semibold text-white shadow-lg transition-all"
            >
              Next Card
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Syllabus AI Analyzer */}
      {activeTab === 'syllabus' && (
        <div className="max-w-3xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-omni-indigo/10 text-omni-indigo">
              <Sparkles className="h-5 w-5 text-omni-cyan" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Syllabus AI Decomposer</h3>
              <p className="text-xs text-slate-400">Paste course outlines or PDF text to automatically schedule study milestones</p>
            </div>
          </div>

          <textarea
            rows={5}
            value={syllabusText}
            onChange={(e) => setSyllabusText(e.target.value)}
            placeholder="Paste course description, lecture breakdown, grading weightage..."
            className="w-full rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-omni-indigo"
          />

          <button
            onClick={handleAnalyzeSyllabus}
            disabled={analyzing}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-xs shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
          >
            {analyzing ? <RotateCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            <span>{analyzing ? 'Decomposing Syllabus via AI...' : 'Decompose & Extract Study Plan'}</span>
          </button>

          {syllabusResult && (
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{syllabusResult.courseName}</h4>
                <span className="text-xs font-mono text-omni-cyan">{syllabusResult.projectedStudyHours}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {syllabusResult.keyMilestones.map((m, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
