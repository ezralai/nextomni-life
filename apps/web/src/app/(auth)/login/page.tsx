'use client';

import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#080c14] relative overflow-hidden">
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-white/[0.1] shadow-2xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 text-white font-bold text-xl shadow-lg shadow-indigo-500/20 mb-2">
            Ω
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Sign in to NextOmni</h1>
          <p className="text-xs text-slate-400">Enterprise Personal Operating System</p>
        </div>

        <div className="space-y-4">
          <button className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all">
            <span>Continue with Google OAuth</span>
          </button>

          <div className="flex items-center gap-3 text-xs text-slate-600">
            <div className="h-px bg-white/[0.08] flex-1" />
            <span>or email</span>
            <div className="h-px bg-white/[0.08] flex-1" />
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ezra@nextomni.local"
                className="w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-omni-indigo"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-omni-indigo"
              />
            </div>
          </div>

          <a
            href="/"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-xs text-center block shadow-lg hover:opacity-90 transition-all"
          >
            Launch Command Center
          </a>
        </div>

        <div className="text-center text-xs text-slate-500 pt-2">
          Don't have an account? <a href="/register" className="text-omni-cyan hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
}
