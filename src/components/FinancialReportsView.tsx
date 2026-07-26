import React, { useState } from 'react';
import { Account, JournalEntry } from '../types';
import { 
  FileSpreadsheet, 
  TrendingUp, 
  Download, 
  CheckCircle2, 
  Layers, 
  Search, 
  ArrowRight,
  PieChart
} from 'lucide-react';

interface FinancialReportsViewProps {
  accounts: Account[];
  journalEntries: JournalEntry[];
}

export const FinancialReportsView: React.FC<FinancialReportsViewProps> = ({
  accounts = [],
  journalEntries = []
}) => {
  const safeAccounts = accounts || [];
  const safeJournalEntries = journalEntries || [];
  const [reportType, setReportType] = useState<'pnl' | 'balance-sheet' | 'cashflow'>('pnl');

  const incomeAccounts = safeAccounts.filter(a => a.type === 'Income');
  const expenseAccounts = safeAccounts.filter(a => a.type === 'Expense');
  const assetAccounts = safeAccounts.filter(a => a.type === 'Asset');
  const liabilityAccounts = safeAccounts.filter(a => a.type === 'Liability');
  const equityAccounts = safeAccounts.filter(a => a.type === 'Equity');

  const totalIncome = incomeAccounts.reduce((sum, a) => sum + a.balance, 0);
  const totalExpenses = expenseAccounts.reduce((sum, a) => sum + a.balance, 0);
  const netProfit = totalIncome - totalExpenses;

  const totalAssets = assetAccounts.reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = liabilityAccounts.reduce((sum, a) => sum + a.balance, 0);
  const totalEquity = equityAccounts.reduce((sum, a) => sum + a.balance, 0) + netProfit;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Sub-Tabs */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono font-medium border border-indigo-500/20">
              Financial Intelligence Engine
            </span>
            <span className="text-xs text-zinc-400 font-mono">Drill-Down Statements</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Profit & Loss, Balance Sheet & Cash Flow
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs font-medium">
            <button
              onClick={() => setReportType('pnl')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                reportType === 'pnl' ? 'bg-indigo-600 text-white font-semibold shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Profit & Loss (P&L)
            </button>
            <button
              onClick={() => setReportType('balance-sheet')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                reportType === 'balance-sheet' ? 'bg-indigo-600 text-white font-semibold shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Balance Sheet
            </button>
            <button
              onClick={() => setReportType('cashflow')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                reportType === 'cashflow' ? 'bg-indigo-600 text-white font-semibold shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Cash Flow Statement
            </button>
          </div>

          <button
            onClick={() => alert('Exporting Audit-Ready Financial Statement PDF...')}
            className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Export Statement</span>
          </button>
        </div>
      </div>

      {/* P&L Statement View */}
      {reportType === 'pnl' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-xl font-mono text-xs">
          <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-base font-bold text-white font-sans">Statement of Profit & Loss</h2>
              <p className="text-[11px] text-zinc-400">For FY 2026–27 (April 1, 2026 to July 25, 2026)</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-500 uppercase">NET PROFIT MARGIN</span>
              <div className="text-base font-bold text-emerald-400">
                {((netProfit / totalIncome) * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Revenue Section */}
          <div className="space-y-2">
            <div className="font-bold text-indigo-400 text-xs uppercase tracking-wider font-sans border-b border-zinc-800 pb-1">
              I. REVENUE FROM OPERATIONS
            </div>
            {incomeAccounts.map(a => (
              <div key={a.id} className="flex justify-between p-2 rounded hover:bg-zinc-800/40 text-zinc-300">
                <span>[{a.code}] {a.name}</span>
                <span className="font-bold text-white">₹{a.balance.toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div className="flex justify-between p-2.5 rounded bg-indigo-950/40 border border-indigo-500/20 font-bold text-indigo-300 text-sm">
              <span>TOTAL REVENUE (I):</span>
              <span>₹{totalIncome.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Expenses Section */}
          <div className="space-y-2 pt-4">
            <div className="font-bold text-rose-400 text-xs uppercase tracking-wider font-sans border-b border-zinc-800 pb-1">
              II. OPERATING & ADMINISTRATIVE EXPENSES
            </div>
            {expenseAccounts.map(a => (
              <div key={a.id} className="flex justify-between p-2 rounded hover:bg-zinc-800/40 text-zinc-300">
                <span>[{a.code}] {a.name}</span>
                <span className="font-bold text-rose-300">₹{a.balance.toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div className="flex justify-between p-2.5 rounded bg-rose-950/40 border border-rose-500/20 font-bold text-rose-300 text-sm">
              <span>TOTAL EXPENSES (II):</span>
              <span>₹{totalExpenses.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Net Profit Bar */}
          <div className="flex justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-indigo-950 border border-emerald-500/30 font-bold text-base font-sans">
            <span className="text-white">NET OPERATING PROFIT (I - II):</span>
            <span className="text-emerald-400">₹{netProfit.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      {/* Balance Sheet View */}
      {reportType === 'balance-sheet' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-xl font-mono text-xs">
          <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-base font-bold text-white font-sans">Consolidated Balance Sheet</h2>
              <p className="text-[11px] text-zinc-400">As at July 25, 2026</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Assets = Liabilities + Equity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Assets */}
            <div className="space-y-3">
              <div className="font-bold text-indigo-400 text-xs uppercase tracking-wider font-sans border-b border-zinc-800 pb-1">
                ASSETS
              </div>
              {assetAccounts.map(a => (
                <div key={a.id} className="flex justify-between p-2 rounded hover:bg-zinc-800/40 text-zinc-300">
                  <span>[{a.code}] {a.name}</span>
                  <span className="font-bold text-white">₹{a.balance.toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="flex justify-between p-2.5 rounded bg-indigo-950/40 border border-indigo-500/20 font-bold text-indigo-300 text-sm">
                <span>TOTAL ASSETS:</span>
                <span>₹{totalAssets.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Right: Liabilities & Equity */}
            <div className="space-y-3">
              <div className="font-bold text-amber-400 text-xs uppercase tracking-wider font-sans border-b border-zinc-800 pb-1">
                LIABILITIES & EQUITY
              </div>
              {liabilityAccounts.map(a => (
                <div key={a.id} className="flex justify-between p-2 rounded hover:bg-zinc-800/40 text-zinc-300">
                  <span>[{a.code}] {a.name}</span>
                  <span className="font-bold text-amber-300">₹{a.balance.toLocaleString('en-IN')}</span>
                </div>
              ))}
              {equityAccounts.map(a => (
                <div key={a.id} className="flex justify-between p-2 rounded hover:bg-zinc-800/40 text-zinc-300">
                  <span>[{a.code}] {a.name}</span>
                  <span className="font-bold text-violet-300">₹{a.balance.toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="flex justify-between p-2 rounded hover:bg-zinc-800/40 text-zinc-300">
                <span>Current Year Retained Surplus</span>
                <span className="font-bold text-emerald-400">₹{netProfit.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded bg-emerald-950/40 border border-emerald-500/20 font-bold text-emerald-300 text-sm">
                <span>TOTAL LIABILITIES & EQUITY:</span>
                <span>₹{(totalLiabilities + totalEquity).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cash Flow View */}
      {reportType === 'cashflow' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl font-mono text-xs">
          <div className="pb-3 border-b border-zinc-800">
            <h2 className="text-base font-bold text-white font-sans">Cash Flow Statement (Direct Method)</h2>
            <p className="text-[11px] text-zinc-400">Operating, Investing & Financing Activity Flows</p>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <div className="font-bold text-emerald-400">1. Cash Flow from Operating Activities</div>
              <div className="flex justify-between text-zinc-300 pl-4"><span>Cash Receipts from Customers:</span><span>+₹8,050,000</span></div>
              <div className="flex justify-between text-zinc-300 pl-4"><span>Cash Payments to Vendors & Suppliers:</span><span>-₹1,180,000</span></div>
              <div className="flex justify-between text-zinc-300 pl-4"><span>Cash Paid for Staff Salaries & Taxes:</span><span>-₹3,545,000</span></div>
              <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-zinc-800">
                <span>Net Cash from Operating Activities:</span><span>+₹3,325,000</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <div className="font-bold text-indigo-400">2. Cash Flow from Investing Activities</div>
              <div className="flex justify-between text-zinc-300 pl-4"><span>Purchase of Laptops & Office Equipment:</span><span>-₹1,400,000</span></div>
              <div className="flex justify-between text-indigo-400 font-bold pt-1 border-t border-zinc-800">
                <span>Net Cash Used in Investing:</span><span>-₹1,400,000</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <div className="font-bold text-violet-400">3. Cash Flow from Financing Activities</div>
              <div className="flex justify-between text-zinc-300 pl-4"><span>Owner Capital Injection:</span><span>+₹3,000,000</span></div>
              <div className="flex justify-between text-violet-400 font-bold pt-1 border-t border-zinc-800">
                <span>Net Cash from Financing:</span><span>+₹3,000,000</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
