import { 
  HabitItem, 
  FocusSessionItem, 
  CircadianMetric, 
  JournalEntryItem, 
  LifeGoalItem, 
  LifeDebriefResponse 
} from '@nextomni/types';
import { triggerConfetti } from './confetti';

const STORAGE_KEYS = {
  HABITS: 'nextomni_life_habits_v2',
  FOCUS_SESSIONS: 'nextomni_life_focus_sessions_v2',
  CIRCADIAN: 'nextomni_life_circadian_v2',
  JOURNAL: 'nextomni_life_journal_v2',
  OKRS: 'nextomni_life_okrs_v2',
  DEBRIEF: 'nextomni_life_debrief_v2',
};

// Generates 365-day seed history for the contribution heatmap
export function generateYearHistory(baseDensity: number = 0.75): Record<string, boolean> {
  const history: Record<string, boolean> = {};
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    // Slightly higher consistency on weekdays
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const probability = isWeekend ? baseDensity * 0.8 : baseDensity;
    // Introduce recent 14-day unbroken streak
    if (i < 14) {
      history[dateStr] = true;
    } else {
      history[dateStr] = Math.random() < probability;
    }
  }
  return history;
}

export const INITIAL_HABITS: HabitItem[] = [
  {
    id: 'h-1',
    title: 'Morning Deep Coding Window',
    description: 'High-cognitive algorithmic implementation & compiler lab without interruptions.',
    microCue: 'Immediately after brewing first cup of green tea at 08:30',
    category: 'learning',
    frequency: 'daily',
    targetDaysPerWeek: 7,
    targetMinutes: 90,
    streakCount: 14,
    icon: 'code',
    color: '#6366f1',
    preferredTimeOfDay: 'morning',
    isArchived: false,
    completedToday: true,
    history: generateYearHistory(0.85),
  },
  {
    id: 'h-2',
    title: 'Circadian Sunlight Exposure & Walk',
    description: 'Outdoor photons to activate suprachiasmatic nucleus within 1 hr of waking.',
    microCue: 'Step onto the balcony or park before checking phone notifications',
    category: 'health',
    frequency: 'daily',
    targetDaysPerWeek: 7,
    targetMinutes: 20,
    streakCount: 14,
    icon: 'sun',
    color: '#f59e0b',
    preferredTimeOfDay: 'morning',
    isArchived: false,
    completedToday: true,
    history: generateYearHistory(0.80),
  },
  {
    id: 'h-3',
    title: 'Active Recall Spaced Repetition',
    description: 'Review 20 distributed flashcards across core computer science modules.',
    microCue: 'During the 13:30 post-lunch cognitive recharge window',
    category: 'learning',
    frequency: 'weekdays',
    targetDaysPerWeek: 5,
    targetMinutes: 25,
    streakCount: 21,
    icon: 'sparkles',
    color: '#06b6d4',
    preferredTimeOfDay: 'afternoon',
    isArchived: false,
    completedToday: true,
    history: generateYearHistory(0.78),
  },
  {
    id: 'h-4',
    title: 'Hydration & Electrolyte Protocol',
    description: 'Drink 750ml filtered water with a pinch of Himalayan salt upon waking.',
    microCue: 'Keep bedside tumbler filled before sleeping',
    category: 'health',
    frequency: 'daily',
    targetDaysPerWeek: 7,
    targetMinutes: 5,
    streakCount: 30,
    icon: 'droplets',
    color: '#10b981',
    preferredTimeOfDay: 'morning',
    isArchived: false,
    completedToday: true,
    history: generateYearHistory(0.92),
  },
  {
    id: 'h-5',
    title: 'Evening Gratitude & Wind-Down Protocol',
    description: 'Log 3 wins, 1 reframed lesson, dim screens, enforce 14:00 caffeine cutoff.',
    microCue: 'When ambient lighting transitions to warm amber at 21:30',
    category: 'mindfulness',
    frequency: 'daily',
    targetDaysPerWeek: 7,
    targetMinutes: 15,
    streakCount: 12,
    icon: 'moon',
    color: '#8b5cf6',
    preferredTimeOfDay: 'evening',
    isArchived: false,
    completedToday: false,
    history: generateYearHistory(0.72),
  },
];

export const INITIAL_FOCUS_SESSIONS: FocusSessionItem[] = [
  {
    id: 'fs-1',
    mode: 'ultradian',
    durationMinutes: 52,
    completedMinutes: 52,
    soundscapeType: 'binaural_gamma',
    notes: 'Architected FastAPI microservice life debrief endpoints with zero-latency fallback.',
    courseId: 'CS402',
    startedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    isCompleted: true,
  },
  {
    id: 'fs-2',
    mode: 'pomodoro',
    durationMinutes: 25,
    completedMinutes: 25,
    soundscapeType: 'rain',
    notes: 'Reviewed Paivio dual-coding cognitive theories for optimal flashcard retention.',
    courseId: 'CS301',
    startedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    isCompleted: true,
  },
];

export const INITIAL_CIRCADIAN: CircadianMetric = {
  date: new Date().toISOString().split('T')[0],
  morningSunlightMinutes: 20,
  peakEnergySlot: 'morning',
  sleepDurationHours: 7.8,
  sleepQuality: 5,
  readinessScore: 92,
  caffeineCutoffFollowed: true,
  windDownCompleted: true,
};

export const INITIAL_JOURNAL: JournalEntryItem = {
  id: 'j-1',
  entryDate: new Date().toISOString().split('T')[0],
  morningIntentions: [
    'Complete NextOmni LifeOS elevation architecture & verify 100% test pass rate',
    'Execute 90-minute uninterrupted deep focus block with 40Hz soundscape',
    'Ensure 20-minute morning outdoor sunlight walk before screen work'
  ],
  eveningGratitude: [
    'Seamless monorepo build and clean TypeScript compilation across suites',
    'High cognitive clarity during deep work session without tab-switching',
    'Physical recovery score peaked at 92% after 7.8h restorative sleep'
  ],
  lessonLearned: 'Context-switching during afternoon energy trough drains stamina faster than hard code; buffer 15 min NSDR instead.',
  moodScore: 9,
  energyLevel: 8,
  sleepHours: 7.8,
  sleepQuality: 5,
  title: 'High Flow Alignment & Systematic LifeOS Elevation',
  content: 'The architectural clarity of unifying habits, deep work soundscapes, circadian rhythm, and OKRs brings an immense sense of cognitive equilibrium.',
  aiSentiment: 'focused',
  aiKeyInsights: 'Optimal cognitive alignment observed. High adherence to morning light protocol correlates with peak deep-work stamina.',
  isVaultLocked: false,
};

export const INITIAL_OKRS: LifeGoalItem[] = [
  {
    id: 'g-1',
    title: 'Human Flourishing & Peak Athletic Longevity',
    dimension: 'health',
    level: 'vision',
    targetValue: 100,
    currentValue: 88,
    unit: '%',
    progressPercent: 88,
    isCompleted: false,
  },
  {
    id: 'g-2',
    title: 'Achieve First-Class Honours (3.90+ CGPA) & Compiler Mastery',
    dimension: 'learning',
    level: 'vision',
    targetValue: 4.0,
    currentValue: 3.88,
    unit: 'CGPA',
    progressPercent: 92,
    isCompleted: false,
  },
  {
    id: 'g-3',
    title: 'Complete 250 Hours of High-Cognition Deep Work This Semester',
    dimension: 'career',
    level: 'key_result',
    targetValue: 250,
    currentValue: 184,
    unit: 'hrs',
    progressPercent: 73.6,
    isCompleted: false,
  },
  {
    id: 'g-4',
    title: 'Establish RM50,000 Liquid Wealth Emergency Reserve',
    dimension: 'finance',
    level: 'key_result',
    targetValue: 50000,
    currentValue: 36121,
    unit: 'MYR',
    progressPercent: 72.2,
    isCompleted: false,
  },
  {
    id: 'g-5',
    title: 'Weekly Quality Dialogue & Mentorship Sessions',
    dimension: 'relationships',
    level: 'objective',
    targetValue: 52,
    currentValue: 41,
    unit: 'sessions',
    progressPercent: 78.8,
    isCompleted: false,
  },
];

export const INITIAL_DEBRIEF: LifeDebriefResponse = {
  weeklyScore: 91,
  sentimentTrend: "High Neural Focus & Emotional Equilibrium",
  dominantStressors: [
    "Midweek cognitive load compression",
    "Afternoon 14:00 circadian trough"
  ],
  psychologicalWins: [
    "Maintained 14-day keystone streak across coding & sunlight",
    "Clocked 18.5 high-density focus hours with zero tab fatigue",
    "Morning readiness maintained above 85% all week"
  ],
  keystoneHabitsConsistency: 88.5,
  focusHoursCompleted: 18.5,
  circadianAlignmentIndex: 92,
  actionableNudges: [
    "Continue anchoring the 20-minute sunlight walk before midday coding blocks.",
    "Enforce the 14:00 caffeine cutoff to safeguard slow-wave restorative sleep."
  ],
  synthesizedAt: new Date().toISOString(),
};

// ==========================================
// Safe LocalStorage Store Helpers
// ==========================================
export const LifeStore = {
  getHabits: (): HabitItem[] => {
    if (typeof window === 'undefined') return INITIAL_HABITS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HABITS);
      return data ? JSON.parse(data) : INITIAL_HABITS;
    } catch {
      return INITIAL_HABITS;
    }
  },

  saveHabits: (habits: HabitItem[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
    } catch (e) {
      console.error('Failed to save habits:', e);
    }
  },

  toggleHabit: (id: string): HabitItem[] => {
    const habits = LifeStore.getHabits();
    const todayStr = new Date().toISOString().split('T')[0];

    const updated = habits.map(h => {
      if (h.id === id) {
        const nextCompleted = !h.completedToday;
        const nextStreak = nextCompleted ? h.streakCount + 1 : Math.max(0, h.streakCount - 1);
        
        // Trigger celebratory confetti if milestone reached!
        if (nextCompleted && (nextStreak === 7 || nextStreak === 14 || nextStreak === 30 || nextStreak === 100)) {
          triggerConfetti(3000);
        }

        const nextHistory = { ...(h.history || {}) };
        nextHistory[todayStr] = nextCompleted;

        return {
          ...h,
          completedToday: nextCompleted,
          streakCount: nextStreak,
          history: nextHistory,
        };
      }
      return h;
    });

    LifeStore.saveHabits(updated);
    return updated;
  },

  getFocusSessions: (): FocusSessionItem[] => {
    if (typeof window === 'undefined') return INITIAL_FOCUS_SESSIONS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FOCUS_SESSIONS);
      return data ? JSON.parse(data) : INITIAL_FOCUS_SESSIONS;
    } catch {
      return INITIAL_FOCUS_SESSIONS;
    }
  },

  addFocusSession: (session: FocusSessionItem): FocusSessionItem[] => {
    const list = [session, ...LifeStore.getFocusSessions()];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.FOCUS_SESSIONS, JSON.stringify(list));
    }
    return list;
  },

  getCircadian: (): CircadianMetric => {
    if (typeof window === 'undefined') return INITIAL_CIRCADIAN;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CIRCADIAN);
      return data ? JSON.parse(data) : INITIAL_CIRCADIAN;
    } catch {
      return INITIAL_CIRCADIAN;
    }
  },

  saveCircadian: (metric: CircadianMetric) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CIRCADIAN, JSON.stringify(metric));
  },

  getJournal: (): JournalEntryItem => {
    if (typeof window === 'undefined') return INITIAL_JOURNAL;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      return data ? JSON.parse(data) : INITIAL_JOURNAL;
    } catch {
      return INITIAL_JOURNAL;
    }
  },

  saveJournal: (journal: JournalEntryItem) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journal));
  },

  getOkrs: (): LifeGoalItem[] => {
    if (typeof window === 'undefined') return INITIAL_OKRS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OKRS);
      return data ? JSON.parse(data) : INITIAL_OKRS;
    } catch {
      return INITIAL_OKRS;
    }
  },

  saveOkrs: (okrs: LifeGoalItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.OKRS, JSON.stringify(okrs));
  },

  getDebrief: (): LifeDebriefResponse => {
    if (typeof window === 'undefined') return INITIAL_DEBRIEF;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DEBRIEF);
      return data ? JSON.parse(data) : INITIAL_DEBRIEF;
    } catch {
      return INITIAL_DEBRIEF;
    }
  },

  saveDebrief: (debrief: LifeDebriefResponse) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.DEBRIEF, JSON.stringify(debrief));
  },

  deleteHabit: (id: string): HabitItem[] => {
    const list = LifeStore.getHabits().filter(h => h.id !== id);
    LifeStore.saveHabits(list);
    return list;
  },

  deleteOkr: (id: string): LifeGoalItem[] => {
    const list = LifeStore.getOkrs().filter(o => o.id !== id);
    LifeStore.saveOkrs(list);
    return list;
  },

  updateOkr: (id: string, updates: Partial<LifeGoalItem>): LifeGoalItem[] => {
    const list = LifeStore.getOkrs().map(o => o.id === id ? { ...o, ...updates } : o);
    LifeStore.saveOkrs(list);
    return list;
  },

  deleteFocusSession: (id: string): FocusSessionItem[] => {
    const list = LifeStore.getFocusSessions().filter(s => s.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.FOCUS_SESSIONS, JSON.stringify(list));
    }
    return list;
  },

  clearFocusSessions: (): FocusSessionItem[] => {
    const list: FocusSessionItem[] = [];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.FOCUS_SESSIONS, JSON.stringify(list));
    }
    return list;
  }
};

