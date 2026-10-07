export interface StudyTipItem {
  id: string;
  tipDate: string;
  category: 'active_recall' | 'pomodoro' | 'retention' | 'wellbeing';
  title: string;
  content: string;
  actionItem: string;
  sourceReference?: string;
  isAiGenerated: boolean;
  isBookmarked: boolean;
  reaction?: 'helpful' | 'unhelpful' | 'neutral' | null;
}

export interface NewsDigestItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
  relevanceScore?: number;
}

export interface DailyDigestResponse {
  date: string;
  greeting: string;
  quoteOfTheDay: string;
  studyTip: StudyTipItem;
  topHeadlines: NewsDigestItem[];
  priorities: string[];
}
