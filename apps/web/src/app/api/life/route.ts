import { NextResponse } from 'next/server';
import { 
  INITIAL_HABITS, 
  INITIAL_FOCUS_SESSIONS, 
  INITIAL_CIRCADIAN, 
  INITIAL_JOURNAL, 
  INITIAL_OKRS, 
  INITIAL_DEBRIEF 
} from '@/lib/life-store';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    data: {
      habits: INITIAL_HABITS,
      focusSessions: INITIAL_FOCUS_SESSIONS,
      circadian: INITIAL_CIRCADIAN,
      journal: INITIAL_JOURNAL,
      okrs: INITIAL_OKRS,
      debrief: INITIAL_DEBRIEF,
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: 'success',
      message: 'LifeOS state synchronized.',
      data: body,
      syncedAt: new Date().toISOString()
    }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ status: 'error', message }, { status: 400 });
  }
}
