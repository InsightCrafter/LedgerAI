import React, { useState } from 'react';
import { UserProfile, Role } from '../types';
import { 
  X, 
  LogIn, 
  UserPlus, 
  KeyRound, 
  Mail, 
  Lock, 
  User, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Zap,
  Eye, 
  EyeOff, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [showPassword, setShowPassword] = useState(false);

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupCompany, setSignupCompany] = useState('');
  const [signupRole, setSignupRole] = useState<Role>('Admin');
  const [acceptTerms, setAcceptTerms] = useState(true);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Status/Error Message
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Preset Demo Accounts for Quick Login
  const demoAccounts: UserProfile[] = [
    {
      id: 'usr_admin',
      name: 'Aarav Sharma',
      email: 'admin@ledgerai.com',
      role: 'Admin',
      companyName: 'Acme Tech Solutions India Ltd',
      gstin: '27AABCU9603R1ZM'
    },
    {
      id: 'usr_auditor',
      name: 'Priyanka Rao, FCA',
      email: 'auditor@ledgerai.com',
      role: 'CA Auditor',
      companyName: 'Priyanka Rao & Associates CA Firm',
      gstin: '27AAACR1234F1Z8'
    },
    {
      id: 'usr_accountant',
      name: 'Vikram Malhotra',
      email: 'accountant@ledgerai.com',
      role: 'Accountant',
      companyName: 'Acme Tech Solutions India Ltd',
      gstin: '27AABCU9603R1ZM'
    },
    {
      id: 'usr_viewer',
      name: 'Ananya Gupta',
      email: 'viewer@ledgerai.com',
      role: 'Viewer',
      companyName: 'Acme Tech Solutions India Ltd',
      gstin: '27AABCU9603R1ZM'
    }
  ];

  const handleDemoSelect = (account: UserProfile) => {
    onLogin(account);
    setSuccessMsg(`Welcome back, ${account.name}! Logged in as ${account.role}.`);
    setTimeout(() => {
      onClose();
      setSuccessMsg('');
    }, 600);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginEmail || !loginPassword) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    // Match existing demo account or create dynamic user
    const matched = demoAccounts.find(a => a.email.toLowerCase() === loginEmail.toLowerCase());
    const userToLogin: UserProfile = matched || {
      id: `usr_${Date.now()}`,
      name: loginEmail.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
      email: loginEmail,
      role: 'Admin',
      companyName: 'Acme Tech Solutions India Ltd'
    };

    onLogin(userToLogin);
    setSuccessMsg(`Sign in successful! Welcome back, ${userToLogin.name}.`);
    setTimeout(() => {
      onClose();
      setSuccessMsg('');
    }, 600);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!signupName || !signupEmail || !signupPassword) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (!acceptTerms) {
      setErrorMsg('Please accept the Terms of Service to create an account.');
      return;
    }

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: signupName,
      email: signupEmail,
      role: signupRole,
      companyName: signupCompany || 'Acme Tech Solutions India Ltd'
    };

    onLogin(newUser);
    setSuccessMsg(`Account created successfully! Welcome to LedgerAI, ${newUser.name}.`);
    setTimeout(() => {
      onClose();
      setSuccessMsg('');
    }, 700);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setErrorMsg('Please enter your work email address.');
      return;
    }
    setForgotSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden text-zinc-100 flex flex-col">
        {/* Header Bar */}
        <div className="relative p-6 bg-gradient-to-b from-indigo-950/40 via-zinc-950 to-zinc-950 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-lg tracking-tight">LedgerAI</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  ERP Auth
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                {currentUser ? 'User Session & Role Management' : 'Secure Enterprise Authentication'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Feedback Banners */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Current Logged In View */}
          {currentUser ? (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white truncate">{currentUser.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono border border-indigo-500/30">
                      {currentUser.role}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate">{currentUser.email}</p>
                  <p className="text-[11px] text-zinc-500 font-mono mt-0.5 truncate">{currentUser.companyName}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                  Quick Switch Role
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {demoAccounts.map(account => (
                    <button
                      key={account.id}
                      onClick={() => handleDemoSelect(account)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        currentUser.role === account.role
                          ? 'bg-indigo-600/15 border-indigo-500/60 text-white'
                          : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      <div className="text-xs font-medium text-white flex items-center justify-between">
                        <span>{account.name}</span>
                        {currentUser.role === account.role && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                        )}
                      </div>
                      <div className="text-[10px] text-indigo-400 font-mono mt-0.5">{account.role}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    onLogout();
                    setSuccessMsg('You have been signed out.');
                    setTimeout(() => setSuccessMsg(''), 1000);
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 rotate-180" />
                  <span>Sign Out of LedgerAI</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Mode Toggle Tabs */}
              <div className="flex rounded-xl bg-zinc-900 p-1 border border-zinc-800">
                <button
                  onClick={() => { setMode('signin'); setErrorMsg(''); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    mode === 'signin'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => { setMode('signup'); setErrorMsg(''); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    mode === 'signup'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Create Account</span>
                </button>
              </div>

              {/* 1-Click Demo Accounts Selector */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Instant Demo Login (1-Click)
                  </span>
                  <span className="text-zinc-500">No password required</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {demoAccounts.map(acc => (
                    <button
                      key={acc.id}
                      onClick={() => handleDemoSelect(acc)}
                      className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-800/80 text-left transition-all group"
                    >
                      <div className="text-xs font-medium text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                        <span>{acc.name}</span>
                        <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <div className="text-[10px] text-indigo-400 font-mono">{acc.role}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sign In Form */}
              {mode === 'signin' && (
                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">Work Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="e.g. aarav@company.com"
                        className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-zinc-300">Password</label>
                      <button
                        type="button"
                        onClick={() => { setMode('forgot'); setErrorMsg(''); setForgotSubmitted(false); }}
                        className="text-[11px] text-indigo-400 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded bg-zinc-900 border-zinc-700 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Remember this session</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to ERP Dashboard</span>
                  </button>
                </form>
              )}

              {/* Sign Up Form */}
              {mode === 'signup' && (
                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                      <input
                        type="text"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="Aarav Sharma"
                        className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Work Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="aarav@company.com"
                        className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Company Name</label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                        <input
                          type="text"
                          value={signupCompany}
                          onChange={(e) => setSignupCompany(e.target.value)}
                          placeholder="Acme Tech Solutions"
                          className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">ERP Designation Role</label>
                      <div className="relative">
                        <ShieldCheck className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                        <select
                          value={signupRole}
                          onChange={(e) => setSignupRole(e.target.value as Role)}
                          className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Admin">Admin (Full Access)</option>
                          <option value="Accountant">Senior Accountant</option>
                          <option value="CA Auditor">CA Tax Auditor</option>
                          <option value="Viewer">Executive Viewer</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Set Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Minimum 8 characters"
                        className="w-full pl-9 pr-10 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="rounded bg-zinc-900 border-zinc-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>I agree to LedgerAI Security & Compliance Terms</span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Create & Activate LedgerAI Account</span>
                  </button>
                </form>
              )}

              {/* Forgot Password Flow */}
              {mode === 'forgot' && (
                <div className="space-y-4">
                  {forgotSubmitted ? (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <h4 className="font-semibold text-white text-sm">Password Reset Link Sent</h4>
                      <p className="text-xs text-zinc-300">
                        We sent a secure password reset link to <strong className="text-white">{forgotEmail}</strong>.
                      </p>
                      <button
                        onClick={() => setMode('signin')}
                        className="mt-2 text-xs text-indigo-400 hover:underline font-semibold"
                      >
                        Return to Sign In
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleForgotSubmit} className="space-y-4">
                      <p className="text-xs text-zinc-400">
                        Enter your registered work email and we will issue an instant single-use password recovery key.
                      </p>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">Work Email Address</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                          <input
                            type="email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="e.g. aarav@company.com"
                            className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setMode('signin')}
                          className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-medium transition-colors border border-zinc-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <KeyRound className="w-4 h-4" />
                          <span>Send Recovery Link</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
