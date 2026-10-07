'use client';

import React, { useState } from 'react';
import { 
  Wallet, 
  Upload, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  ArrowDownRight, 
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  Plus
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface InstitutionAccount {
  id: string;
  name: string;
  category: string;
  balance: number;
  masked: string;
  badge: string;
  color: string;
}

const ACCOUNTS: InstitutionAccount[] = [
  { id: '1', name: "Touch 'n Go eWallet", category: 'eWallet', balance: 520.40, masked: '•••• 8912', badge: 'TNG', color: 'bg-blue-600/20 text-blue-400 border-blue-500/30' },
  { id: '2', name: 'Maybank Current/Savings', category: 'Commercial Bank', balance: 7850.25, masked: '•••• 4120', badge: 'MBB', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  { id: '3', name: 'myASNB ASM 3', category: 'Unit Trust', balance: 15400.00, masked: '•••• 7031', badge: 'ASNB', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { id: '4', name: 'Moomoo Securities', category: 'Global Brokerage', balance: 12350.80, masked: '•••• 1984', badge: 'MOO', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
];

export default function FinanceSuitePage() {
  const [accounts, setAccounts] = useState<InstitutionAccount[]>(ACCOUNTS);
  const [uploading, setUploading] = useState(false);
  const [statementResult, setStatementResult] = useState<any>(null);

  const totalNetWorth = accounts.reduce((sum, a) => sum + a.balance, 0);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/finance/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      setStatementResult(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
              <Wallet className="h-7 w-7" />
            </div>
            <div>
              <span className="text-xs font-mono text-omni-emerald uppercase tracking-wider">Multi-Institution Wealth Hub</span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-0.5">
                {formatCurrency(totalNetWorth)}
              </h1>
              <p className="text-xs text-slate-400 mt-1">Liquid & Investment Assets Across 4 Connected Malaysian Institutions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-omni-emerald hover:bg-emerald-600 text-white font-semibold text-xs shadow-lg transition-all flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>{uploading ? 'Parsing Statement OCR...' : 'Upload Statement (PDF/CSV)'}</span>
              <input type="file" className="hidden" accept=".pdf,.csv,.txt" onChange={handleFileUpload} />
            </label>
          </div>
        </div>
      </div>

      {/* Grid: Connected Accounts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {accounts.map((acc) => (
          <div key={acc.id} className="glass-card p-5 rounded-2xl border border-white/[0.06] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-0.5 rounded-lg border text-xs font-bold ${acc.color}`}>
                  {acc.badge}
                </span>
                <span className="text-[11px] font-mono text-slate-500">{acc.masked}</span>
              </div>
              <h3 className="text-sm font-semibold text-white truncate">{acc.name}</h3>
              <p className="text-xs text-slate-400">{acc.category}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-slate-400">Balance</span>
              <span className="text-base font-bold font-mono text-white">{formatCurrency(acc.balance)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Statement OCR Parsing Output (if triggered) */}
      {statementResult && (
        <div className="glass-panel rounded-3xl p-6 border border-emerald-500/40 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">OCR Statement Extraction Complete</h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
              {statementResult.institution_name}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03]">
              <span className="text-slate-400">Masked Account</span>
              <p className="font-bold font-mono text-white mt-1">{statementResult.account_number_masked}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03]">
              <span className="text-slate-400">Closing Balance</span>
              <p className="font-bold font-mono text-emerald-400 mt-1">RM {statementResult.closing_balance}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03]">
              <span className="text-slate-400">Transactions Extracted</span>
              <p className="font-bold font-mono text-white mt-1">{statementResult.transactions?.length || 0} items</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Itemized Records</h4>
            {statementResult.transactions?.map((tx: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-500 font-mono">{tx.transaction_date}</span>
                  <span className="text-white font-medium">{tx.description}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400">{tx.category}</span>
                </div>
                <span className={`font-mono font-semibold ${tx.transaction_type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                  {tx.transaction_type === 'income' ? '+' : '-'} RM {tx.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Itemized Recent Transactions */}
      <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Live Aggregated Activity</h3>
          <span className="text-xs text-slate-400 font-mono">Real-time Malaysian Feeds</span>
        </div>

        <div className="space-y-2.5">
          {[
            { date: '2026-10-05', desc: 'Zus Coffee - Iced Spanish Latte', inst: 'TNG eWallet', cat: 'Food & Dining', amount: -11.90, type: 'expense' },
            { date: '2026-10-04', desc: 'Touch n Go RFID Toll (LDP)', inst: 'TNG eWallet', cat: 'Transport', amount: -4.50, type: 'expense' },
            { date: '2026-10-03', desc: 'Research Assistant Stipend', inst: 'Maybank', cat: 'Salary', amount: 1500.00, type: 'income' },
            { date: '2026-10-02', desc: 'Jaya Grocer Healthy Mealprep', inst: 'Maybank', cat: 'Groceries', amount: -112.40, type: 'expense' },
            { date: '2026-09-30', desc: 'myASNB ASM 3 Reinvested Dividend', inst: 'myASNB', cat: 'Dividends', amount: 285.00, type: 'income' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs hover:bg-white/[0.04] transition-all">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${item.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/[0.05] text-slate-300'}`}>
                  {item.type === 'income' ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </div>
                <div>
                  <h4 className="text-white font-medium text-xs sm:text-sm">{item.desc}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span>{item.inst}</span>
                    <span>•</span>
                    <span className="text-slate-500">{item.date}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className={`font-mono font-semibold text-xs sm:text-sm ${item.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                  {item.type === 'income' ? '+' : '-'} RM {Math.abs(item.amount).toFixed(2)}
                </span>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{item.cat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
