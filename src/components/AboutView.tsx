import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Lock, 
  FileText, 
  Users, 
  Building2, 
  Globe, 
  Award, 
  ArrowRight, 
  HelpCircle,
  ExternalLink,
  Layers,
  Server,
  Workflow
} from 'lucide-react';

interface AboutViewProps {
  theme?: 'dark' | 'light';
  onNavigateTab?: (tab: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ theme = 'dark', onNavigateTab }) => {
  const isLight = theme === 'light';

  const capabilities = [
    {
      icon: Cpu,
      title: 'Autonomous Multi-Agent AI Swarm',
      description: 'Specialized financial agents working in unison for automated book-keeping, GST matching, dunning reminders, and CFO intelligence.'
    },
    {
      icon: FileText,
      title: 'Document AI OCR Engine',
      description: 'Instant multi-page OCR line-item extraction for invoices, receipts, and bank statements with high confidence scoring.'
    },
    {
      icon: ShieldCheck,
      title: 'GST & Tax Compliance Engine',
      description: 'Direct GSTR-1, GSTR-3B auto-summarization and GSTR-2B Input Tax Credit (ITC) reconciliation with zero error margin.'
    },
    {
      icon: Lock,
      title: 'Immutable Dual-Audit Ledger',
      description: 'SHA-256 cryptographic hashes on every journal entry and manual adjustment for zero-tamper regulatory audit trails.'
    },
    {
      icon: Server,
      title: 'Multi-Tenant Enterprise Architecture',
      description: 'Strict workspace data isolation, custom company currency support, and custom Gemini Pro API key hosting.'
    },
    {
      icon: Workflow,
      title: 'Command Palette & AI Chat',
      description: 'Natural language natural interface for executive query resolution, instant voucher posting, and batch operations.'
    }
  ];

  const milestones = [
    { year: '2026 Q1', title: 'LedgerAI Autonomous Kernel Launch', desc: 'Engineered double-entry ledger with automated bank feed parser.' },
    { year: '2026 Q2', title: 'Document AI & Multi-Agent Swarm', desc: 'Integrated Gemini 3.6 Flash for line-item OCR and CFO decision agents.' },
    { year: '2026 Q3', title: 'Enterprise Commercial SaaS & Multi-Tenancy', desc: 'Added subscription tiering, GST tax engine, and dual audit compliance.' },
    { year: '2026 Q4 (Roadmap)', title: 'Direct Bank API Auto-Disbursement', desc: 'Host-to-host bank integration with RazorpayX and ICICI Corporate Banking.' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
      {/* Hero Banner */}
      <div className={`p-8 sm:p-10 rounded-3xl border relative overflow-hidden transition-all ${
        isLight 
          ? 'bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white border-indigo-800 shadow-xl' 
          : 'bg-gradient-to-r from-zinc-900 via-indigo-950 to-zinc-950 text-white border-zinc-800 shadow-2xl'
      }`}>
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Next-Gen Autonomous ERP System</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-300 to-white">LedgerAI</span> Enterprise
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            LedgerAI is an AI-native financial operating system designed to replace traditional manual accounting software with autonomous agent swarms, automated Document AI OCR, and real-time GST tax compliance.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Version 2.0.0 Enterprise SaaS</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>GST & Audit Compliant</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Multi-Tenant Architecture</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Platform Capabilities & Architecture
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Engineered from the ground up for high-growth tech firms, CFOs, and Chartered Accountants.
            </p>
          </div>
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('subscriptions')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md"
            >
              <span>Explore Commercial Tiers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] ${
                  isLight 
                    ? 'bg-white border-slate-200 shadow-xs hover:border-indigo-300' 
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className={`font-bold text-sm mb-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {cap.title}
                </h3>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  {cap.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Roadmap & Company Vision */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-zinc-900 border-zinc-800'
      }`}>
        <h2 className={`text-xl font-black mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Engineering Roadmap & Evolution
        </h2>
        <p className={`text-xs mb-6 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
          How LedgerAI evolved from a simple double-entry engine into an enterprise-grade SaaS platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m, idx) => (
            <div key={idx} className={`p-4 rounded-xl border relative ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'
            }`}>
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                {m.year}
              </span>
              <h3 className={`font-bold text-xs mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {m.title}
              </h3>
              <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Security, Data Protection & Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-zinc-900 border-zinc-800'}`}>
          <ShieldCheck className="w-6 h-6 text-emerald-500 mb-3" />
          <h3 className={`font-bold text-sm mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            GST & Statutory Security
          </h3>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Full compliance with Indian Goods and Services Tax Network (GSTN) APIs, GSTR-1, GSTR-3B, and GSTR-2B ITC verification routines.
          </p>
        </div>

        <div className={`p-6 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-zinc-900 border-zinc-800'}`}>
          <Lock className="w-6 h-6 text-indigo-500 mb-3" />
          <h3 className={`font-bold text-sm mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Zero Data Leakage Policy
          </h3>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Financial records are isolated in tenant workspace vaults. Gemini API calls are strictly executed server-side with zero training on your financial records.
          </p>
        </div>

        <div className={`p-6 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-zinc-900 border-zinc-800'}`}>
          <Users className="w-6 h-6 text-violet-500 mb-3" />
          <h3 className={`font-bold text-sm mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Multi-User SLA Support
          </h3>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Built for enterprise accounts with role-based access control (Admin, CFO, Accountant, Auditor), custom seat permissions, and 24/7 SLA.
          </p>
        </div>
      </div>

      {/* Contact & Support Footer Card */}
      <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
        isLight ? 'bg-indigo-50/60 border-indigo-100' : 'bg-indigo-950/20 border-indigo-900/40'
      }`}>
        <div>
          <h3 className={`font-bold text-sm ${isLight ? 'text-indigo-950' : 'text-indigo-200'}`}>
            Need Enterprise Onboarding or Dedicated Integration?
          </h3>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Our accounting engineers help migrate your legacy Tally, QuickBooks, or Zoho Books data in less than 24 hours.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a 
            href="mailto:support@ledgerai.com"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Contact Enterprise Sales</span>
          </a>
        </div>
      </div>
    </div>
  );
};
