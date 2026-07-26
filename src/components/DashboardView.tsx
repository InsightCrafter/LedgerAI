import React from 'react';
import { Company, Invoice, BankTransaction, AuditLogItem } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles, 
  FileText, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Plus, 
  RefreshCw,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';

interface DashboardViewProps {
  company: Company;
  invoices: Invoice[];
  bankTransactions: BankTransaction[];
  auditLogs: AuditLogItem[];
  onNavigate: (tab: string) => void;
  onOpenCommand: () => void;
  theme?: 'dark' | 'light';
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  company,
  invoices = [],
  bankTransactions = [],
  auditLogs = [],
  onNavigate = (_tab: string) => {},
  onOpenCommand = () => {},
  theme = 'dark'
}) => {
  const isLight = theme === 'light';
  // Cashflow Trend Data
  const chartData = [
    { month: 'Jan', revenue: 520, expenses: 380, netCash: 140 },
    { month: 'Feb', revenue: 610, expenses: 400, netCash: 210 },
    { month: 'Mar', revenue: 740, expenses: 420, netCash: 320 },
    { month: 'Apr', revenue: 680, expenses: 450, netCash: 230 },
    { month: 'May', revenue: 890, expenses: 510, netCash: 380 },
    { month: 'Jun', revenue: 930, expenses: 640, netCash: 290 },
    { month: 'Jul (Est)', revenue: 1050, expenses: 580, netCash: 470, isForecast: true },
    { month: 'Aug (Est)', revenue: 1180, expenses: 600, netCash: 580, isForecast: true },
  ];

  const safeInvoices = invoices || [];
  const safeAuditLogs = auditLogs || [];

  const totalReceivables = safeInvoices
    .filter(i => i.type === 'Sales' && (i.status === 'Unpaid' || i.status === 'Overdue'))
    .reduce((sum, i) => sum + (i.totalAmount - i.amountPaid), 0);

  const totalPayables = safeInvoices
    .filter(i => i.type === 'Purchase' && (i.status === 'Unpaid' || i.status === 'Overdue'))
    .reduce((sum, i) => sum + (i.totalAmount - i.amountPaid), 0);

  const overdueInvoicesCount = safeInvoices.filter(i => i.status === 'Overdue').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* CEO Top Banner & AI Prompt Bar Trigger */}
      <div className={`rounded-2xl p-5 sm:p-6 relative overflow-hidden border transition-all ${
        isLight 
          ? 'bg-gradient-to-r from-indigo-50/90 via-white to-violet-50/90 border-indigo-200/80 shadow-md' 
          : 'bg-gradient-to-r from-zinc-900 via-indigo-950/40 to-zinc-900 border-zinc-800 shadow-xl'
      }`}>
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-indigo-300/30' : 'bg-indigo-500/10'
        }`} />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${
                isLight 
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}>
                Live CEO Dashboard
              </span>
              <span className={`text-xs font-mono font-medium ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                FY 2026–27
              </span>
            </div>
            
            <h1 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Good afternoon, <span className={`text-transparent bg-clip-text ${
                isLight 
                  ? 'bg-gradient-to-r from-indigo-700 via-violet-700 to-indigo-900 font-black' 
                  : 'bg-gradient-to-r from-indigo-300 via-violet-300 to-white'
              }`}>Aarav</span>
            </h1>

            <p className={`text-xs sm:text-sm mt-1.5 font-medium leading-relaxed max-w-2xl ${
              isLight ? 'text-slate-700' : 'text-zinc-300'
            }`}>
              Your accounts are balanced. AI Autonomous Agents are actively monitoring cashflow, GST compliance, and bank reconciliations.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenCommand}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all hover:scale-102"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white">Talk to AI ERP</span>
            </button>
            <button
              onClick={() => onNavigate('document-ai')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                isLight 
                  ? 'bg-white hover:bg-slate-100 text-slate-900 border-slate-300 shadow-sm' 
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
              }`}
            >
              <FileText className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
              <span>Upload Document</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Financial Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Revenue */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition-all shadow-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
            <span>Total Revenue (YTD)</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono">
            ₹6,850,000
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px]">
            <span className="text-emerald-400 flex items-center font-mono">
              <ArrowUpRight className="w-3 h-3" /> +14.2%
            </span>
            <span className="text-zinc-500">vs last period</span>
          </div>
        </div>

        {/* Metric 2: Net Profit */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition-all shadow-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
            <span>Net Operating Profit</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono">
            ₹2,450,000
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px]">
            <span className="text-rose-400 flex items-center font-mono">
              <ArrowDownRight className="w-3 h-3" /> -3.5%
            </span>
            <span className="text-zinc-500">due to cloud cost spike</span>
          </div>
        </div>

        {/* Metric 3: Receivables */}
        <div 
          onClick={() => onNavigate('sales')}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:border-amber-500/40 transition-all cursor-pointer shadow-sm group"
        >
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
            <span>Accounts Receivable</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono">
            ₹{totalReceivables.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px]">
            {overdueInvoicesCount > 0 ? (
              <span className="text-amber-400 font-mono flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> {overdueInvoicesCount} Invoice Overdue
              </span>
            ) : (
              <span className="text-zinc-500">All invoices on time</span>
            )}
          </div>
        </div>

        {/* Metric 4: Cash Runway */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition-all shadow-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
            <span>Cash Runway</span>
            <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono">
            18.4 Months
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px]">
            <span className="text-zinc-400 font-mono">
              Bank Balance: ₹3,325,000
            </span>
          </div>
        </div>
      </div>

      {/* Main Row: Cashflow Chart & AI Insights Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Cashflow & Revenue Recharts */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Cashflow & AI Revenue Forecast</span>
              </h2>
              <p className="text-[11px] text-zinc-400 font-mono">Historical performance + 60-day predictive AI model</p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1 text-indigo-400">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                <span>Revenue</span>
              </div>
              <div className="flex items-center gap-1 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span>Expenses</span>
              </div>
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isLight ? "#e2e8f0" : "#27272a"} vertical={false} />
                <XAxis dataKey="month" stroke={isLight ? "#64748b" : "#71717a"} fontSize={11} tickLine={false} />
                <YAxis stroke={isLight ? "#64748b" : "#71717a"} fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isLight ? '#ffffff' : '#09090b', 
                    borderColor: isLight ? '#cbd5e1' : '#27272a', 
                    color: isLight ? '#0f172a' : '#f4f4f5',
                    borderRadius: '12px', 
                    fontSize: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  itemStyle={{ color: isLight ? '#0f172a' : '#f4f4f5' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: AI Financial Intelligence Cards */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>AI Agent Insights</span>
            </h2>
            <span className="text-[10px] font-mono text-zinc-500">Live Audit</span>
          </div>

          <div className="space-y-3">
            {/* Card 1 */}
            <div className={`p-3.5 rounded-xl border text-xs ${
              isLight ? 'bg-amber-50/80 border-amber-200' : 'bg-amber-500/10 border-amber-500/20'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`font-bold ${isLight ? 'text-amber-950' : 'text-amber-300'}`}>Overdue Payment Follow-Up</span>
                <span className={`text-[10px] font-mono font-semibold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>Collections Agent</span>
              </div>
              <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                Infosys BPM invoice (INV-2026-089 for ₹850,000) is 10 days overdue. Drafted polite reminder email.
              </p>
              <button 
                onClick={() => onNavigate('sales')}
                className={`mt-2 text-[11px] font-semibold hover:underline flex items-center gap-1 ${
                  isLight ? 'text-amber-800' : 'text-amber-400'
                }`}
              >
                <span>Send AI Reminder</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Card 2 */}
            <div className={`p-3.5 rounded-xl border text-xs ${
              isLight ? 'bg-indigo-50/80 border-indigo-200' : 'bg-indigo-500/10 border-indigo-500/20'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`font-bold ${isLight ? 'text-indigo-950' : 'text-indigo-300'}`}>GST Input Credit Available</span>
                <span className={`text-[10px] font-mono font-semibold ${isLight ? 'text-indigo-800' : 'text-indigo-400'}`}>GST Agent</span>
              </div>
              <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                Claimable ITC of ₹221,186 detected from AWS and WeWork bills. Net GST payable reduced to ₹395,314.
              </p>
              <button 
                onClick={() => onNavigate('gst')}
                className={`mt-2 text-[11px] font-semibold hover:underline flex items-center gap-1 ${
                  isLight ? 'text-indigo-800' : 'text-indigo-400'
                }`}
              >
                <span>Review GSTR-3B Summary</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Card 3 */}
            <div className={`p-3.5 rounded-xl border text-xs ${
              isLight ? 'bg-emerald-50/80 border-emerald-200' : 'bg-emerald-500/10 border-emerald-500/20'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`font-bold ${isLight ? 'text-emerald-950' : 'text-emerald-300'}`}>Unreconciled Bank Credits</span>
                <span className={`text-[10px] font-mono font-semibold ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>Banking Agent</span>
              </div>
              <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                3 bank statements ready for 1-click match (96% confidence score for TCS wire transfer).
              </p>
              <button 
                onClick={() => onNavigate('banking')}
                className={`mt-2 text-[11px] font-semibold hover:underline flex items-center gap-1 ${
                  isLight ? 'text-emerald-800' : 'text-emerald-400'
                }`}
              >
                <span>Reconcile Now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Matrix & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Quick Jump Grid */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-white">ERP Quick Workflows</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => onNavigate('sales')}
              className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-indigo-500/50 text-left transition-all group"
            >
              <FileText className="w-4 h-4 text-indigo-400 mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-zinc-200">New Invoice</div>
              <div className="text-[10px] text-zinc-500">Sales & Billing</div>
            </button>

            <button
              onClick={() => onNavigate('document-ai')}
              className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-indigo-500/50 text-left transition-all group"
            >
              <Sparkles className="w-4 h-4 text-violet-400 mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-zinc-200">Document AI</div>
              <div className="text-[10px] text-zinc-500">OCR & Extraction</div>
            </button>

            <button
              onClick={() => onNavigate('banking')}
              className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-indigo-500/50 text-left transition-all group"
            >
              <Building2 className="w-4 h-4 text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-zinc-200">Bank Match</div>
              <div className="text-[10px] text-zinc-500">Auto Reconciliation</div>
            </button>

            <button
              onClick={() => onNavigate('payroll')}
              className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-indigo-500/50 text-left transition-all group"
            >
              <Zap className="w-4 h-4 text-amber-400 mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-zinc-200">Run Payroll</div>
              <div className="text-[10px] text-zinc-500">Salaries & TDS</div>
            </button>

            <button
              onClick={() => onNavigate('gst')}
              className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-indigo-500/50 text-left transition-all group"
            >
              <Layers className="w-4 h-4 text-rose-400 mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-zinc-200">GST Portal</div>
              <div className="text-[10px] text-zinc-500">GSTR-1 & 3B</div>
            </button>

            <button
              onClick={() => onNavigate('reports')}
              className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-indigo-500/50 text-left transition-all group"
            >
              <TrendingUp className="w-4 h-4 text-blue-400 mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-zinc-200">Financial P&L</div>
              <div className="text-[10px] text-zinc-500">Balance Sheet</div>
            </button>
          </div>
        </div>

        {/* Audit Log Activity Stream */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Recent Ledger Audit Trail</h3>
            <button 
              onClick={() => onNavigate('audit')}
              className="text-xs text-indigo-400 hover:underline font-mono"
            >
              View Full Log →
            </button>
          </div>

          <div className="space-y-2.5">
            {safeAuditLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-start gap-3 text-xs">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-zinc-200 truncate">{log.action}</span>
                    <span className="text-[10px] font-mono text-zinc-500 shrink-0">{log.timestamp.split(' ')[1]}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{log.details}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-zinc-500">
                    <span>By {log.user}</span>
                    {log.aiAssisted && <span className="text-indigo-400">🤖 AI-Assisted</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
