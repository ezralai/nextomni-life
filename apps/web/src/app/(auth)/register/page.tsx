'use client';

import React, { useState } from 'react';

export default function RegisterPage() {
  const [role, setRole] = useState<'student' | 'educator'>('student');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#080c14] relative overflow-hidden">
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-white/[0.1] shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 text-white font-bold text-xl shadow-lg shadow-indigo-500/20 mb-2">
            Ω
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Create NextOmni Account</h1>
          <p className="text-xs text-slate-400">Select your primary persona</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setRole('student')}
            className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
              role === 'student' ? 'bg-indigo-500/20 border-indigo-500 text-white' : 'bg-white/[0.04] border-white/[0.08] text-slate-400'
            }`}
          >
            Student Persona
          </button>
          <button
            onClick={() => setRole('educator')}
            className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
              role === 'educator' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.04] border-white/[0.08] text-slate-400'
            }`}
          >
            Educator Persona
          </button>
        </div>

        <a
          href="/"
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-xs text-center block shadow-lg hover:opacity-90 transition-all"
        >
          Initialize Workspace
        </a>

        <div className="text-center text-xs text-slate-500 pt-2">
          Already registered? <a href="/login" className="text-omni-cyan hover:underline">Sign in</a>
        </div>
      </div>
    </div>
  );
}
