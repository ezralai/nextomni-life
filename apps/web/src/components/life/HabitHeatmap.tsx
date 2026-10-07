'use client';

import React, { useState } from 'react';
import { HabitItem } from '@nextomni/types';
import { Flame, Calendar, Trophy, Zap } from 'lucide-react';

interface HabitHeatmapProps {
  habits: HabitItem[];
}

export function HabitHeatmap({ habits }: HabitHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  // Compute aggregate 365-day completion density across all habits
  const today = new Date();
  const dayCountMap: Record<string, number> = {};
  
  habits.forEach(habit => {
    if (!habit.history) return;
    Object.entries(habit.history).forEach(([date, completed]) => {
      if (completed) {
        dayCountMap[date] = (dayCountMap[date] || 0) + 1;
      }
    });
  });

  // Build grid of 52 weeks (364 days + today)
  // Weeks will be an array of 52 arrays, each having 7 day objects
  const weeks: { dateStr: string; count: number; dayOfWeek: number }[][] = [];
  
  // Find start date: 52 weeks ago aligned to start of week (Sunday)
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (52 * 7) + (6 - today.getDay()));

  let curr = new Date(startDate);
  for (let w = 0; w < 52; w++) {
    const weekDays = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = curr.toISOString().split('T')[0];
      const count = dayCountMap[dateStr] || 0;
      weekDays.push({
        dateStr,
        count,
        dayOfWeek: curr.getDay(),
      });
      curr.setDate(curr.getDate() + 1);
    }
    weeks.push(weekDays);
  }

  // Calculate annual stats
  const totalLogged = Object.values(dayCountMap).reduce((acc, c) => acc + c, 0);
  const activeStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streakCount)) : 0;
  const daysActive = Object.values(dayCountMap).filter(c => c > 0).length;
  const consistencyRate = Math.min(100, Math.round((daysActive / 365) * 100));

  function getColor(count: number): string {
    if (count === 0) return '#121827';
    if (count === 1) return '#064e3b';
    if (count === 2) return '#047857';
    if (count === 3) return '#10b981';
    return '#34d399';
  }

  const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-5">
      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <Calendar className="h-3.5 w-3.5" />
            <span>Behavioral Consistency Density (365 Days)</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">Keystone Habit Contribution Matrix</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
            <Flame className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span>{activeStreak}-DAY STREAK</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
            <Zap className="h-4 w-4 text-indigo-400" />
            <span>{consistencyRate}% CONSISTENCY</span>
          </div>
        </div>
      </div>

      {/* SVG Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[760px]">
          {/* Months Header Bar */}
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-2 px-6">
            {MONTH_LABELS.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>

          <div className="flex items-start gap-2">
            {/* Day Labels */}
            <div className="flex flex-col justify-between h-[92px] text-[9px] font-mono text-slate-500 pt-1 shrink-0">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Weeks Columns */}
            <div className="flex gap-[3.5px] flex-1">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3.5px]">
                  {week.map((day, dIdx) => {
                    const isToday = day.dateStr === today.toISOString().split('T')[0];
                    return (
                      <div
                        key={dIdx}
                        onMouseEnter={() => setHoveredDay({ date: day.dateStr, count: day.count })}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`h-[10.5px] w-[10.5px] rounded-[2.5px] transition-all cursor-pointer hover:scale-125 ${
                          isToday ? 'ring-1 ring-white shadow-sm' : ''
                        }`}
                        style={{ backgroundColor: getColor(day.count) }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Legend & Tooltip */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/[0.06] gap-3">
        <div className="font-mono text-[11px] text-slate-400">
          {hoveredDay ? (
            <span className="text-emerald-300 font-semibold">
              📅 {hoveredDay.date}: {hoveredDay.count} keystone habit{hoveredDay.count !== 1 ? 's' : ''} completed
            </span>
          ) : (
            <span>Total Logged: <strong className="text-white">{totalLogged} executions</strong> across 365 days</span>
          )}
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
          <span>Less</span>
          <span className="h-2.5 w-2.5 rounded-[2px] bg-[#121827] border border-white/[0.05]" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-[#064e3b]" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-[#047857]" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-[#10b981]" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-[#34d399]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
