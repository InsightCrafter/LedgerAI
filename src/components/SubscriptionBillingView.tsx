import React, { useState } from 'react';
import { 
  SubscriptionDetails, 
  SubscriptionPlan, 
  SubscriptionTier, 
  SubscriptionInvoice 
} from '../types';
import { 
  Check, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Key, 
  Receipt, 
  Download, 
  Building2, 
  Users, 
  FileText, 
  Lock, 
  Globe, 
  CheckCircle2, 
  HelpCircle,
  X
} from 'lucide-react';

interface SubscriptionBillingViewProps {
  subscription: SubscriptionDetails;
  onUpdateSubscription: (newSub: SubscriptionDetails) => void;
  theme?: 'dark' | 'light';
}

const PLANS: SubscriptionPlan[] = [
  {
    id: 'Starter',
    name: 'Starter Plan',
    monthlyPrice: 3999,
    annualPrice: 3199,
    currency: '₹',
    tagline: 'Ideal for solo accountants, freelancers, and early-stage Indian startups.',
    maxCompanies: 1,
    maxUsers: 3,
    maxDocumentScansMonthly: 50,
    features: [
      '1 Organization Workspace',
      '3 Active Team Seats',
      '50 Document AI OCR Scans / mo',
      'Double-Entry General Ledger & Invoicing',
      'Basic Bank Reconciliation',
      'Email & Community Support'
    ]
  },
  {
    id: 'Growth',
    name: 'Growth Plan',
    monthlyPrice: 14999,
    annualPrice: 11999,
    currency: '₹',
    recommended: true,
    tagline: 'Powering growing SMBs, high-velocity tech firms & active accounting practices.',
    maxCompanies: 3,
    maxUsers: 10,
    maxDocumentScansMonthly: 500,
    features: [
      'Up to 3 Organization Workspaces',
      '10 Active Team Seats',
      '500 Document AI OCR Scans / mo',
      'Full Autonomous AI Agent Swarm (GST, Audit, CFO)',
      'Automated Bank Statement Matching',
      'Live GSTR-1 & GSTR-3B Tax Filing Engine',
      'Automated Dunning & Collections Reminders',
      '24/7 Priority SLA Support'
    ]
  },
  {
    id: 'Enterprise',
    name: 'Enterprise Plan',
    monthlyPrice: 39999,
    annualPrice: 31999,
    currency: '₹',
    tagline: 'For multi-entity conglomerates, large CA networks & global operations.',
    maxCompanies: 999,
    maxUsers: 999,
    maxDocumentScansMonthly: 99999,
    features: [
      'Unlimited Companies & Workspaces',
      'Unlimited Team Seats',
      'Unlimited Document AI OCR Scans',
      'Custom Gemini Pro API Key Integration',
      'Private Tenant Data Isolation Vault',
      'Custom ERP API Webhooks & ERP Sync',
      'Dedicated Account Manager & Onboarding',
      '99.99% Uptime Guarantee'
    ]
  }
];

const INITIAL_INVOICES: SubscriptionInvoice[] = [
  {
    id: 'sub_inv_2026_07',
    invoiceNumber: 'INV-SUB-2026-007',
    date: '2026-07-01',
    planName: 'Growth Plan (Monthly)',
    amount: 14999,
    taxAmount: 2699.82,
    totalAmount: 17698.82,
    status: 'Paid'
  },
  {
    id: 'sub_inv_2026_06',
    invoiceNumber: 'INV-SUB-2026-006',
    date: '2026-06-01',
    planName: 'Growth Plan (Monthly)',
    amount: 14999,
    taxAmount: 2699.82,
    totalAmount: 17698.82,
    status: 'Paid'
  }
];

export const SubscriptionBillingView: React.FC<SubscriptionBillingViewProps> = ({
  subscription,
  onUpdateSubscription,
  theme = 'dark'
}) => {
  const isLight = theme === 'light';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<SubscriptionPlan | null>(null);
  const [invoices, setInvoices] = useState<SubscriptionInvoice[]>(INITIAL_INVOICES);
  
  // Custom API Key modal state
  const [apiKeyInput, setApiKeyInput] = useState(subscription.customGeminiApiKey || '');
  const [isApiKeySaved, setIsApiKeySaved] = useState(false);

  // Simulated Checkout Form State
  const [cardName, setCardName] = useState('Aarav Sharma');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('•••');
  const [gstin, setGstin] = useState('27AABCU9603R1ZM');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const currentPlan = PLANS.find(p => p.id === subscription.planId) || PLANS[1];

  const handleSaveApiKey = () => {
    onUpdateSubscription({
      ...subscription,
      customGeminiApiKey: apiKeyInput.trim()
    });
    setIsApiKeySaved(true);
    setTimeout(() => setIsApiKeySaved(false), 3000);
  };

  const handleProcessCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForCheckout) return;

    setIsProcessing(true);

    setTimeout(() => {
      const plan = selectedPlanForCheckout;
      const basePrice = billingCycle === 'annual' ? plan.annualPrice * 12 : plan.monthlyPrice;
      const tax = Math.round(basePrice * 0.18 * 100) / 100;
      const total = basePrice + tax;

      const newInvoice: SubscriptionInvoice = {
        id: `sub_inv_${Date.now()}`,
        invoiceNumber: `INV-SUB-2026-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toISOString().split('T')[0],
        planName: `${plan.name} (${billingCycle === 'annual' ? 'Annual' : 'Monthly'})`,
        amount: basePrice,
        taxAmount: tax,
        totalAmount: total,
        status: 'Paid'
      };

      const updatedSub: SubscriptionDetails = {
        ...subscription,
        planId: plan.id,
        status: 'Active',
        billingCycle,
        paymentMethodLast4: cardNumber.slice(-4) || '4242'
      };

      onUpdateSubscription(updatedSub);
      setInvoices(prev => [newInvoice, ...prev]);
      setIsProcessing(false);
      setSelectedPlanForCheckout(null);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/30 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <div>
            <p className="font-bold text-xs">Subscription Upgraded Successfully!</p>
            <p className="text-[11px] text-emerald-100">Your SaaS tier privileges and limits have been updated instantly.</p>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border relative overflow-hidden transition-all ${
        isLight
          ? 'bg-gradient-to-r from-indigo-50 via-white to-violet-50 border-indigo-200 shadow-sm'
          : 'bg-gradient-to-r from-zinc-900 via-indigo-950/40 to-zinc-900 border-zinc-800 shadow-xl'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                isLight ? 'bg-indigo-100 text-indigo-800 border-indigo-300' : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
              }`}>
                Enterprise SaaS Engine
              </span>
              <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                Workspace ID: ws_ledger_2026
              </span>
            </div>
            <h1 className={`text-2xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Subscription & Billing Workspaces
            </h1>
            <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
              Manage commercial software tiers, team seat allocation, AI document scan quotas, tax invoice history, and enterprise Gemini compute integration.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl border text-right ${
              isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-zinc-950/80 border-zinc-800'
            }`}>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Current SaaS Tier</div>
              <div className="text-sm font-bold text-indigo-500 flex items-center justify-end gap-1.5">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{subscription.planId} Tier</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards (Active Subscription & Usage Gauges) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Plan Summary Card */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
          isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-zinc-900 border-zinc-800'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-500" />
                <h2 className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Active Subscription
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/20">
                ● {subscription.status}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <div className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Selected Plan</div>
                <div className={`text-xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {currentPlan.name}
                </div>
              </div>

              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {currentPlan.currency}{currentPlan.monthlyPrice.toLocaleString('en-IN')}
                </span>
                <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                  / month (+18% GST)
                </span>
              </div>

              <div className={`pt-3 border-t text-xs space-y-1.5 ${isLight ? 'border-slate-100 text-slate-600' : 'border-zinc-800 text-zinc-400'}`}>
                <div className="flex justify-between">
                  <span>Billing Cycle:</span>
                  <span className="font-semibold capitalize">{subscription.billingCycle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Auto-Renews On:</span>
                  <span className="font-semibold">{subscription.renewsAt}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-semibold font-mono">Card ending in •••• {subscription.paymentMethodLast4 || '4242'}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedPlanForCheckout(PLANS[2])}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.01]"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Upgrade to Enterprise Tier</span>
          </button>
        </div>

        {/* Live Usage Quotas & Metering Card */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-zinc-900 border-zinc-800'
        }`}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                SaaS Metering & Usage Quotas
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                Live consumption tracking for the current monthly billing period.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Resets Aug 1, 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* Meter 1: Document AI Scans */}
            <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-zinc-200'}`}>AI OCR Scans</span>
                </div>
                <span className="text-[10px] font-mono text-indigo-400 font-semibold">
                  {Math.round((subscription.scansUsedThisMonth / currentPlan.maxDocumentScansMonthly) * 100)}%
                </span>
              </div>
              <div className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {subscription.scansUsedThisMonth} <span className="text-xs font-normal text-zinc-500">/ {currentPlan.maxDocumentScansMonthly}</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full mt-2.5 overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subscription.scansUsedThisMonth / currentPlan.maxDocumentScansMonthly) * 100)}%` }}
                />
              </div>
            </div>

            {/* Meter 2: Active Team Seats */}
            <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <span className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-zinc-200'}`}>Active Team Seats</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                  {subscription.seatsUsed} of {currentPlan.maxUsers}
                </span>
              </div>
              <div className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {subscription.seatsUsed} <span className="text-xs font-normal text-zinc-500">/ {currentPlan.maxUsers} Seats</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full mt-2.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subscription.seatsUsed / currentPlan.maxUsers) * 100)}%` }}
                />
              </div>
            </div>

            {/* Meter 3: Workspaces / Entities */}
            <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-500" />
                  <span className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-zinc-200'}`}>Organizations</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-semibold">
                  {subscription.companiesUsed} of {currentPlan.maxCompanies}
                </span>
              </div>
              <div className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {subscription.companiesUsed} <span className="text-xs font-normal text-zinc-500">/ {currentPlan.maxCompanies} Entities</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full mt-2.5 overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subscription.companiesUsed / currentPlan.maxCompanies) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Feature Perks Included */}
          <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 text-xs ${
            isLight ? 'bg-indigo-50/50 border-indigo-100 text-slate-700' : 'bg-indigo-950/20 border-indigo-900/40 text-zinc-300'
          }`}>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span>Included in <strong>{subscription.planId}</strong>: Autonomous AI Swarm, GST Returns Auto-Reconciliation, Dual Audit Trail.</span>
            </div>
            <button 
              onClick={() => {
                const el = document.getElementById('pricing-plans-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-bold text-indigo-500 hover:underline flex items-center gap-1"
            >
              <span>Compare All Tiers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Pricing Tiers Selector */}
      <div id="pricing-plans-grid" className="space-y-6 pt-4">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Flexible Commercial SaaS Plans
          </h2>
          <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Choose the ideal capacity for your organization. Upgrade or downgrade anytime with instant prorated billing.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="inline-flex items-center gap-2 p-1 rounded-2xl bg-zinc-900 border border-zinc-800 mt-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Grid of Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map(plan => {
            const isCurrent = subscription.planId === plan.id;
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div 
                key={plan.id}
                className={`rounded-2xl p-6 border transition-all flex flex-col justify-between relative ${
                  plan.recommended
                    ? isLight 
                      ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg' 
                      : 'bg-gradient-to-b from-indigo-950/40 via-zinc-900 to-zinc-900 border-indigo-500/80 shadow-2xl shadow-indigo-500/10'
                    : isLight
                      ? 'bg-white border-slate-200 shadow-xs'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-md">
                    ★ Most Popular for Growth
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {plan.name}
                    </h3>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                        ACTIVE PLAN
                      </span>
                    )}
                  </div>

                  <p className={`text-xs mb-4 min-h-[36px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                    {plan.tagline}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-zinc-800">
                    <span className={`text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {plan.currency}{price.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                      / month {billingCycle === 'annual' && '(billed yearly)'}
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 mb-2">
                      Key Capabilities Included:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={isLight ? 'text-slate-700' : 'text-zinc-300'}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPlanForCheckout(plan)}
                  disabled={isCurrent}
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isCurrent
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                      : plan.recommended
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                        : isLight
                          ? 'bg-slate-900 hover:bg-slate-800 text-white'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                  }`}
                >
                  {isCurrent ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Currently Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Select {plan.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enterprise API Key & Developer Settings */}
      <div className={`p-6 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-zinc-900 border-zinc-800'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Enterprise Gemini API Compute Key
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Connect your organization's custom Google GenAI key for dedicated rate limits & server-side AI processing.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="password"
              placeholder="AIzaSy... (Leave empty to use shared SaaS compute)"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-mono border outline-none transition-all ${
                isLight 
                  ? 'bg-slate-50 text-slate-900 border-slate-300 focus:border-indigo-500' 
                  : 'bg-zinc-950 text-white border-zinc-800 focus:border-indigo-500'
              }`}
            />
          </div>

          <button
            onClick={handleSaveApiKey}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
          >
            {isApiKeySaved ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Custom Key</span>
            )}
          </button>
        </div>
      </div>

      {/* Subscription Invoice History */}
      <div className={`p-6 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-zinc-900 border-zinc-800'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-indigo-500" />
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              SaaS Subscription Tax Invoices
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-500">GST Compliance Verified</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b font-mono uppercase text-[10px] ${
                isLight ? 'border-slate-200 text-slate-500 bg-slate-50' : 'border-zinc-800 text-zinc-400 bg-zinc-950/60'
              }`}>
                <th className="p-3">Invoice #</th>
                <th className="p-3">Billing Date</th>
                <th className="p-3">Plan Details</th>
                <th className="p-3 text-right">Tax (18% GST)</th>
                <th className="p-3 text-right">Total Amount</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {invoices.map(inv => (
                <tr key={inv.id} className={`hover:bg-zinc-800/30 transition-all ${
                  isLight ? 'hover:bg-slate-50' : ''
                }`}>
                  <td className="p-3 font-mono font-bold text-indigo-400">{inv.invoiceNumber}</td>
                  <td className={`p-3 font-mono ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>{inv.date}</td>
                  <td className={`p-3 font-medium ${isLight ? 'text-slate-900' : 'text-white'}`}>{inv.planName}</td>
                  <td className={`p-3 text-right font-mono ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                    ₹{inv.taxAmount.toLocaleString('en-IN')}
                  </td>
                  <td className={`p-3 text-right font-mono font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    ₹{inv.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => alert(`Downloading Tax Invoice ${inv.invoiceNumber}...`)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-mono border border-zinc-700 inline-flex items-center gap-1 transition-all"
                    >
                      <Download className="w-3 h-3 text-indigo-400" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {selectedPlanForCheckout && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl relative ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-zinc-900 border-zinc-800 text-white'
          }`}>
            <button
              onClick={() => setSelectedPlanForCheckout(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-indigo-500 fill-indigo-500" />
              <h2 className="text-lg font-black">Complete SaaS Subscription</h2>
            </div>

            <div className={`p-4 rounded-xl border mb-5 ${
              isLight ? 'bg-indigo-50/60 border-indigo-100' : 'bg-indigo-950/30 border-indigo-900/40'
            }`}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-sm">{selectedPlanForCheckout.name}</span>
                <span className="text-xs font-mono font-bold text-indigo-500 capitalize">
                  {billingCycle} billing
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-3">{selectedPlanForCheckout.tagline}</p>

              <div className="space-y-1.5 pt-3 border-t border-zinc-800 text-xs font-mono">
                {(() => {
                  const base = billingCycle === 'annual' 
                    ? selectedPlanForCheckout.annualPrice * 12 
                    : selectedPlanForCheckout.monthlyPrice;
                  const tax = Math.round(base * 0.18 * 100) / 100;
                  const total = base + tax;
                  return (
                    <>
                      <div className="flex justify-between">
                        <span>Base Subscription:</span>
                        <span>₹{base.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>18% GST (CGST 9% + SGST 9%):</span>
                        <span>₹{tax.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between font-bold text-sm text-indigo-400 pt-2 border-t border-zinc-800">
                        <span>Total Payable Now:</span>
                        <span>₹{total.toLocaleString('en-IN')}</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            <form onSubmit={handleProcessCheckout} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Billing Entity GSTIN</label>
                <input
                  type="text"
                  required
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs font-mono border outline-none ${
                    isLight ? 'bg-slate-50 border-slate-300' : 'bg-zinc-950 border-zinc-800'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none ${
                    isLight ? 'bg-slate-50 border-slate-300' : 'bg-zinc-950 border-zinc-800'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Card Number</label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs font-mono border outline-none ${
                    isLight ? 'bg-slate-50 border-slate-300' : 'bg-zinc-950 border-zinc-800'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Expiry</label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs font-mono border outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300' : 'bg-zinc-950 border-zinc-800'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">CVV Security Code</label>
                  <input
                    type="password"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs font-mono border outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300' : 'bg-zinc-950 border-zinc-800'
                    }`}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
                >
                  {isProcessing ? (
                    <span>Processing Payment via Razorpay / Stripe Gateway...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-white" />
                      <span>Confirm & Activate Subscription</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[10px] text-zinc-500 flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-bit SSL Encrypted • Cancel Anytime in 1-Click</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
