import React from 'react';
import { Header } from '@/components/navigation/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] relative overflow-hidden">
      {/* Background ambient neon glow spheres */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[25%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />

      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 z-10">
        {children}
      </main>

      <footer className="w-full border-t border-white/[0.06] py-6 px-4 lg:px-8 text-center text-xs text-slate-500 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="font-medium text-slate-400">NextOmni Life • The Intelligent Operating System for Human Flourishing</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
            <span>LifeOS v2.0</span>
            <span>•</span>
            <span>FastAPI Neural Engine (:8000)</span>
            <span>•</span>
            <span>Offline PWA Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
