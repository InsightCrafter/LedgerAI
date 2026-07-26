import React, { useState, useEffect } from 'react';
import { 
  mockCompanies, 
  mockAccounts, 
  mockInvoices, 
  mockBankTransactions, 
  mockBankAccounts, 
  mockJournalEntries, 
  mockAuditLogs, 
  mockGSTSummary, 
  mockEmployees, 
  mockPayrollRun 
} from './data/mockData';
import { 
  Company, 
  Account, 
  Invoice, 
  BankTransaction, 
  BankAccount, 
  JournalEntry, 
  AuditLogItem, 
  Employee,
  UserProfile,
  Role,
  SubscriptionDetails
} from './types';

import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { DashboardView } from './components/DashboardView';
import { AIAssistantView } from './components/AIAssistantView';
import { DocumentAIView } from './components/DocumentAIView';
import { AccountingView } from './components/AccountingView';
import { SalesInvoicesView } from './components/SalesInvoicesView';
import { BankReconciliationView } from './components/BankReconciliationView';
import { GSTEngineView } from './components/GSTEngineView';
import { PayrollView } from './components/PayrollView';
import { FinancialReportsView } from './components/FinancialReportsView';
import { AuditLogView } from './components/AuditLogView';
import { SubscriptionBillingView } from './components/SubscriptionBillingView';
import { AboutView } from './components/AboutView';

import { 
  LayoutDashboard, 
  Bot, 
  FileText, 
  BookOpen, 
  Receipt, 
  Building2, 
  ShieldCheck, 
  Users, 
  FileSpreadsheet, 
  Lock,
  CreditCard,
  HelpCircle
} from 'lucide-react';

const DEFAULT_USER: UserProfile = {
  id: 'usr_admin',
  name: 'Aarav Sharma',
  email: 'admin@ledgerai.com',
  role: 'Admin',
  companyName: 'Acme Tech Solutions India Ltd',
  gstin: '27AABCU9603R1ZM'
};

export default function App() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [selectedCompany, setSelectedCompany] = useState<Company>(mockCompanies[0]);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // User Auth State initialized from localStorage
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('ledgerai_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch (e) {
      return DEFAULT_USER;
    }
  });

  // Theme State initialized from localStorage ('dark' or 'light')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('ledgerai_theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    try {
      localStorage.setItem('ledgerai_theme', theme);
    } catch (e) {
      console.error('Failed to save theme setting:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Subscription State initialized from localStorage
  const [subscription, setSubscription] = useState<SubscriptionDetails>(() => {
    try {
      const saved = localStorage.getItem('ledgerai_subscription');
      return saved ? JSON.parse(saved) : {
        planId: 'Growth',
        status: 'Active',
        billingCycle: 'monthly',
        renewsAt: 'August 1, 2026',
        currentPeriodStart: 'July 1, 2026',
        scansUsedThisMonth: 18,
        seatsUsed: 3,
        companiesUsed: 2,
        paymentMethodLast4: '4242'
      };
    } catch (e) {
      return {
        planId: 'Growth',
        status: 'Active',
        billingCycle: 'monthly',
        renewsAt: 'August 1, 2026',
        currentPeriodStart: 'July 1, 2026',
        scansUsedThisMonth: 18,
        seatsUsed: 3,
        companiesUsed: 2,
        paymentMethodLast4: '4242'
      };
    }
  });

  const handleUpdateSubscription = (newSub: SubscriptionDetails) => {
    setSubscription(newSub);
    try {
      localStorage.setItem('ledgerai_subscription', JSON.stringify(newSub));
    } catch (e) {
      console.error('Failed to save subscription:', e);
    }
  };

  const role: Role = currentUser?.role || 'Admin';

  // Core ERP Reactive State
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [bankTransactions, setBankTransactions] = useState<BankTransaction[]>(mockBankTransactions);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(mockBankAccounts);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(mockJournalEntries);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(mockAuditLogs);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);

  // Keyboard shortcut listener for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('ledgerai_user', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user session:', e);
    }

    // Add audit log for sign in
    const loginAudit: AuditLogItem = {
      id: `audit_${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      user: user.name,
      role: user.role,
      action: 'USER_AUTHENTICATED',
      module: 'Security & Auth',
      details: `User signed in cleanly as ${user.role} (${user.email})`,
      ipAddress: '192.168.1.102',
      aiAssisted: false,
    };
    setAuditLogs(prev => [loginAudit, ...prev]);
  };

  const handleLogout = () => {
    if (currentUser) {
      const logoutAudit: AuditLogItem = {
        id: `audit_${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        user: currentUser.name,
        role: currentUser.role,
        action: 'USER_SIGNED_OUT',
        module: 'Security & Auth',
        details: `User session terminated gracefully (${currentUser.email})`,
        ipAddress: '192.168.1.102',
        aiAssisted: false,
      };
      setAuditLogs(prev => [logoutAudit, ...prev]);
    }
    setCurrentUser(null);
    try {
      localStorage.removeItem('ledgerai_user');
    } catch (e) {
      console.error('Failed to clear user session:', e);
    }
  };

  const navigationTabs = [
    { id: 'dashboard', label: 'Executive Cockpit', icon: LayoutDashboard },
    { id: 'ai-chat', label: 'AI Swarm Chat', icon: Bot, badge: 'Active' },
    { id: 'document-ai', label: 'Document OCR AI', icon: FileText },
    { id: 'accounting', label: 'General Ledger', icon: BookOpen },
    { id: 'sales', label: 'Sales & Invoicing', icon: Receipt },
    { id: 'banking', label: 'Bank Reconciliation', icon: Building2 },
    { id: 'gst', label: 'GST Compliance', icon: ShieldCheck },
    { id: 'payroll', label: 'Payroll & HR', icon: Users },
    { id: 'reports', label: 'Financial Statements', icon: FileSpreadsheet },
    { id: 'audit', label: 'Audit & Security', icon: Lock },
    { id: 'subscriptions', label: 'SaaS Subscriptions', icon: CreditCard, badge: 'PRO' },
    { id: 'about', label: 'About & Vision', icon: HelpCircle },
  ];

  // Handler: Execute AI Command Proposals or System Actions
  const handleExecuteAIAction = (actionType: string, payload: any) => {
    // Log in audit trail
    const newAuditLog: AuditLogItem = {
      id: `audit_${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      user: currentUser?.name || 'LedgerAI Autonomous Agent',
      role: currentUser?.role || 'Admin',
      action: actionType,
      module: 'Core ERP Engine',
      details: `Executed proposal: ${JSON.stringify(payload)}`,
      ipAddress: '127.0.0.1 (Container Proxy)',
      aiAssisted: true,
    };
    setAuditLogs(prev => [newAuditLog, ...prev]);

    if (actionType === 'POST_JOURNAL' && payload.lines) {
      const newJv: JournalEntry = {
        id: `jrn_${Date.now()}`,
        entryNumber: `JV-2026-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toISOString().split('T')[0],
        narration: payload.narration || 'AI Autonomous Entry',
        reference: payload.reference || 'AI-PROPOSAL-EXEC',
        lines: payload.lines,
        totalAmount: payload.lines.reduce((s: number, l: any) => s + (l.debit || 0), 0),
        status: 'Posted',
        source: 'AI Document',
        createdBy: currentUser?.name || 'LedgerAI Swarm',
        createdAt: new Date().toLocaleString(),
      };
      setJournalEntries(prev => [newJv, ...prev]);
      setActiveTab('accounting');
    } else if (actionType === 'CREATE_INVOICE') {
      setActiveTab('sales');
    } else if (actionType === 'RECONCILE_BANK') {
      setActiveTab('banking');
    } else if (actionType === 'RUN_PAYROLL') {
      setActiveTab('payroll');
    }
  };

  const handleAddJournalEntry = (entry: JournalEntry) => {
    setJournalEntries(prev => [entry, ...prev]);
    const newAuditLog: AuditLogItem = {
      id: `audit_${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      user: currentUser?.name || 'Aarav Sharma',
      role: role,
      action: 'CREATE_JOURNAL_VOUCHER',
      module: 'General Ledger',
      details: `Created Journal Entry ${entry.entryNumber} for ₹${entry.totalAmount.toLocaleString('en-IN')}`,
      ipAddress: '192.168.1.102',
      aiAssisted: false,
    };
    setAuditLogs(prev => [newAuditLog, ...prev]);
  };

  const handleAddInvoice = (inv: Invoice) => {
    setInvoices(prev => [inv, ...prev]);
    const newJv: JournalEntry = {
      id: `jrn_${Date.now()}`,
      entryNumber: `JV-INV-${inv.invoiceNumber}`,
      date: inv.issueDate,
      narration: `Sales Invoice issued to ${inv.contactName}`,
      reference: inv.invoiceNumber,
      lines: [
        { accountId: 'a3', accountName: 'Accounts Receivable', accountCode: '1200', debit: inv.totalAmount, credit: 0 },
        { accountId: 'a7', accountName: 'Sales Revenue', accountCode: '4000', debit: 0, credit: inv.subtotal },
        { accountId: 'a6', accountName: 'GST Payable', accountCode: '2200', debit: 0, credit: inv.taxAmount }
      ],
      totalAmount: inv.totalAmount,
      status: 'Posted',
      source: 'Invoice Auto',
      createdBy: currentUser?.name || 'Aarav Sharma',
      createdAt: new Date().toLocaleString(),
    };
    setJournalEntries(prev => [newJv, ...prev]);
  };

  const handleReconcileBankTx = (txId: string) => {
    setBankTransactions(prev => prev.map(t => t.id === txId ? { ...t, isReconciled: true } : t));
    setBankAccounts(prev => prev.map(b => {
      const tx = bankTransactions.find(t => t.id === txId);
      if (tx && tx.bankAccountId === b.id) {
        return { ...b, unreconciledCount: Math.max(0, b.unreconciledCount - 1) };
      }
      return b;
    }));
  };

  const handleRunPayroll = () => {
    const payrollDebit = mockPayrollRun.totalGrossSalary;
    const netPayable = mockPayrollRun.totalNetPayable;
    const taxPayable = mockPayrollRun.totalDeductions;

    const payrollJv: JournalEntry = {
      id: `jrn_${Date.now()}`,
      entryNumber: `JV-PAYROLL-JUN26`,
      date: new Date().toISOString().split('T')[0],
      narration: `June 2026 Monthly Staff Salary & Statutory Disbursal`,
      reference: `PAYROLL-2026-06`,
      lines: [
        { accountId: 'a8', accountName: 'Salaries & Wages Expense', accountCode: '5000', debit: payrollDebit, credit: 0 },
        { accountId: 'a1', accountName: 'HDFC Corporate Operating A/c', accountCode: '1010', debit: 0, credit: netPayable },
        { accountId: 'a6', accountName: 'Tax & PF Statutory Payable', accountCode: '2200', debit: 0, credit: taxPayable }
      ],
      totalAmount: payrollDebit,
      status: 'Posted',
      source: 'Payroll Auto',
      createdBy: currentUser?.name || 'Aarav Sharma',
      createdAt: new Date().toLocaleString(),
    };

    setJournalEntries(prev => [payrollJv, ...prev]);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navigation Bar */}
      <Navbar
        companies={companies}
        selectedCompany={selectedCompany}
        onSelectCompany={setSelectedCompany}
        role={role}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        auditCount={auditLogs.length}
        theme={theme}
        onToggleTheme={toggleTheme}
        subscriptionTier={subscription.planId}
        onNavigateSubscription={() => setActiveTab('subscriptions')}
      />

      {/* Primary Workspace Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800/80">
          {navigationTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30 font-bold'
                    : 'bg-zinc-900/80 text-zinc-400 border-zinc-800/80 hover:bg-zinc-800 hover:text-zinc-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span className={isActive ? 'text-white font-bold' : 'text-zinc-300'}>{tab.label}</span>
                {tab.badge && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono border ${
                    isActive
                      ? 'bg-white/20 text-white border-white/30 font-semibold'
                      : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* View Switcher */}
        <main className="min-h-[600px]">
          {activeTab === 'dashboard' && (
            <DashboardView
              company={selectedCompany}
              invoices={invoices}
              bankTransactions={bankTransactions}
              auditLogs={auditLogs}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenCommand={() => setIsCommandPaletteOpen(true)}
              theme={theme}
            />
          )}

          {activeTab === 'ai-chat' && (
            <AIAssistantView onExecuteAction={handleExecuteAIAction} />
          )}

          {activeTab === 'document-ai' && (
            <DocumentAIView 
              onPostJournal={(lines, narration) => {
                handleExecuteAIAction('POST_JOURNAL', { lines, narration });
              }} 
            />
          )}

          {activeTab === 'accounting' && (
            <AccountingView
              accounts={accounts}
              journalEntries={journalEntries}
              onAddJournalEntry={handleAddJournalEntry}
            />
          )}

          {activeTab === 'sales' && (
            <SalesInvoicesView
              invoices={invoices}
              contacts={[]}
              onAddInvoice={handleAddInvoice}
            />
          )}

          {activeTab === 'banking' && (
            <BankReconciliationView
              bankAccounts={bankAccounts}
              bankTransactions={bankTransactions}
              onReconcileTransaction={handleReconcileBankTx}
            />
          )}

          {activeTab === 'gst' && (
            <GSTEngineView gstSummary={mockGSTSummary} />
          )}

          {activeTab === 'payroll' && (
            <PayrollView
              employees={employees}
              payrollRun={mockPayrollRun}
              onRunPayroll={handleRunPayroll}
            />
          )}

          {activeTab === 'reports' && (
            <FinancialReportsView
              accounts={accounts}
              journalEntries={journalEntries}
            />
          )}

          {activeTab === 'audit' && (
            <AuditLogView auditLogs={auditLogs} />
          )}

          {activeTab === 'subscriptions' && (
            <SubscriptionBillingView
              subscription={subscription}
              onUpdateSubscription={handleUpdateSubscription}
              theme={theme}
            />
          )}

          {activeTab === 'about' && (
            <AboutView
              theme={theme}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}
        </main>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Command Palette Modal */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onExecuteAction={handleExecuteAIAction}
      />
    </div>
  );
}
