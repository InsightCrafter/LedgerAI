import React, { useState } from 'react';
import { Company, Role, UserProfile } from '../types';
import { 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  BellRing, 
  Cpu, 
  Command,
  CheckCircle2,
  LogIn,
  LogOut,
  User,
  ChevronDown,
  UserCheck,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  companies: Company[];
  selectedCompany: Company;
  onSelectCompany: (company: Company) => void;
  role: Role;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onOpenCommandPalette: () => void;
  auditCount?: number;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  subscriptionTier?: string;
  onNavigateSubscription?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  companies,
  selectedCompany,
  onSelectCompany,
  role,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onOpenCommandPalette,
  auditCount = 0,
  theme = 'dark',
  onToggleTheme,
  subscriptionTier = 'Growth',
  onNavigateSubscription
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-4 py-2.5 flex items-center justify-between transition-colors">
      {/* Brand & Company Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-violet-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center">
              <Cpu className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-white text-base">Ledger</span>
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">AI</span>
            </div>
            <span className="text-[10px] text-zinc-500 block -mt-0.5">AI-Native ERP Engine</span>
          </div>
        </div>

        <div className="h-5 w-[1px] bg-zinc-800 mx-1 hidden sm:block" />

        {/* Company Dropdown */}
        <div className="relative group hidden sm:block">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-200 transition-all font-medium">
            <Building2 className="w-3.5 h-3.5 text-violet-400" />
            <span className="truncate max-w-[180px]">{selectedCompany.name}</span>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-1 rounded">
              {selectedCompany.currency}
            </span>
          </button>
          
          <div className="absolute top-full left-0 mt-1 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-1 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1">
            <div className="text-[10px] font-mono text-zinc-500 px-2 py-1 uppercase tracking-wider">Active Workspace</div>
            {companies.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCompany(c)}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                  c.id === selectedCompany.id ? 'bg-indigo-600/15 text-indigo-300 font-medium' : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200'
                }`}
              >
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">GSTIN: {c.gstin}</div>
                </div>
                {c.id === selectedCompany.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Center Command Bar Trigger */}
      <div className="flex-1 max-w-md mx-4">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900 transition-all text-xs group shadow-inner"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="truncate">"Create invoice for Amazon...", "Close June books"...</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800 shrink-0">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Controls & Auth Profile */}
      <div className="flex items-center gap-2.5">
        {/* Theme Switcher Toggle */}
        <button
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm group"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-400 group-hover:-rotate-12 transition-transform" />
          )}
          <span className="text-[11px] font-mono hidden lg:inline text-zinc-400 group-hover:text-zinc-200">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </span>
        </button>

        {/* Subscription Tier Badge */}
        <button
          onClick={onNavigateSubscription}
          title="Manage SaaS Subscription & Billing"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-500/15 to-violet-500/15 border border-indigo-500/30 hover:border-indigo-400 text-indigo-300 text-xs font-mono font-bold transition-all shadow-sm hover:scale-102"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{subscriptionTier} Plan</span>
        </button>

        {/* Role Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{role}</span>
        </div>

        {/* Audit Bell */}
        <div className="relative">
          <button className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors relative">
            <BellRing className="w-4 h-4" />
            {auditCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {auditCount}
              </span>
            )}
          </button>
        </div>

        {/* User Auth Section */}
        {currentUser ? (
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-200 transition-all"
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                {currentUser.name.charAt(0)}
              </div>
              <span className="font-medium hidden sm:inline truncate max-w-[110px]">
                {currentUser.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </button>

            {isUserMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <div className="px-3 py-2 border-b border-zinc-800/80 mb-1">
                  <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
                  <p className="text-[11px] text-zinc-400 truncate">{currentUser.email}</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-mono">
                    Role: {currentUser.role}
                  </span>
                </div>

                <button
                  onClick={() => { setIsUserMenuOpen(false); onOpenAuthModal(); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-zinc-900 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Switch Role / Profile</span>
                </button>

                <button
                  onClick={() => { setIsUserMenuOpen(false); onLogout(); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Register</span>
          </button>
        )}
      </div>
    </header>
  );
};
