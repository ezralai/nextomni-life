export interface HabitItem {
  id: string;
  userId?: string;
  title: string;
  description?: string;
  microCue?: string;
  category: 'health' | 'learning' | 'mindfulness' | 'fitness' | 'craft' | 'general';
  frequency: 'daily' | 'weekdays' | 'weekly' | 'custom';
  targetDaysPerWeek: number;
  targetMinutes: number;
  streakCount: number;
  icon: string;
  color: string;
  preferredTimeOfDay?: 'morning' | 'afternoon' | 'evening' | 'any';
  isArchived: boolean;
  completedToday?: boolean;
  history?: Record<string, boolean>; // date (YYYY-MM-DD) -> completed
}

export interface FocusSessionItem {
  id: string;
  userId?: string;
  mode: 'pomodoro' | 'ultradian' | 'flow';
  durationMinutes: number;
  completedMinutes: number;
  soundscapeType: 'binaural_gamma' | 'rain' | 'white_noise' | 'cafe' | 'none';
  notes?: string;
  courseId?: string;
  taskId?: string;
  startedAt: string;
  completedAt?: string;
  isCompleted: boolean;
}

export interface CircadianMetric {
  date: string;
  morningSunlightMinutes: number;
  peakEnergySlot: 'morning' | 'afternoon' | 'evening';
  sleepDurationHours: number;
  sleepQuality: number; // 1 to 5
  readinessScore: number; // 0 to 100
  caffeineCutoffFollowed: boolean;
  windDownCompleted: boolean;
}

export interface JournalEntryItem {
  id: string;
  userId?: string;
  entryDate: string;
  morningIntentions: string[];
  eveningGratitude: string[];
  lessonLearned?: string;
  moodScore: number;     // 1 to 10
  energyLevel: number;   // 1 to 10
  sleepHours: number;    // e.g. 7.5
  sleepQuality: number;  // 1 to 5
  title?: string;
  content?: string;
  aiSentiment?: 'positive' | 'reflective' | 'stressed' | 'focused';
  aiKeyInsights?: string;
  isVaultLocked?: boolean;
}

export interface LifeGoalItem {
  id: string;
  userId?: string;
  parentId?: string;
  title: string;
  dimension: 'health' | 'career' | 'finance' | 'relationships' | 'learning';
  level: 'vision' | 'objective' | 'key_result' | 'action';
  targetValue: number;
  currentValue: number;
  unit: string;
  progressPercent: number;
  targetDate?: string;
  isCompleted: boolean;
}

export interface LifeDebriefResponse {
  weeklyScore: number;
  sentimentTrend: string;
  dominantStressors: string[];
  psychologicalWins: string[];
  keystoneHabitsConsistency: number; // percentage
  focusHoursCompleted: number;
  circadianAlignmentIndex: number;
  actionableNudges: string[];
  synthesizedAt: string;
}

export interface MotivationPromptResponse {
  quote: string;
  author: string;
  neuroscienceTip: string;
  readinessContext: string;
  suggestedAction: string;
}
