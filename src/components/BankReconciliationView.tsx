import React, { useState } from 'react';
import { BankAccount, BankTransaction } from '../types';
import { 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Upload, 
  Search, 
  AlertCircle,
  RefreshCw,
  Coins
} from 'lucide-react';

interface BankReconciliationViewProps {
  bankAccounts: BankAccount[];
  bankTransactions: BankTransaction[];
  onReconcileTransaction: (txId: string) => void;
}

export const BankReconciliationView: React.FC<BankReconciliationViewProps> = ({
  bankAccounts = [],
  bankTransactions = [],
  onReconcileTransaction = (_txId: string) => {}
}) => {
  const safeBankAccounts = bankAccounts || [];
  const safeBankTransactions = bankTransactions || [];
  const [selectedBankId, setSelectedBankId] = useState<string>(safeBankAccounts[0]?.id || '');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const activeAccount = safeBankAccounts.find(b => b.id === selectedBankId) || safeBankAccounts[0];
  const activeTransactions = safeBankTransactions.filter(t => t.bankAccountId === selectedBankId);

  const handleBatchReconcileAll = () => {
    activeTransactions.filter(t => !t.isReconciled).forEach(t => {
      onReconcileTransaction(t.id);
    });
    setSuccessMsg('Successfully batch-reconciled all pending bank statement lines with General Ledger!');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono font-medium border border-blue-500/20">
              Banking & Reconciliation Engine
            </span>
            <span className="text-xs text-zinc-400 font-mono">Autonomous Matching</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Bank Statement Auto-Match & Ledger Posting
          </h1>
        </div>

        <button
          onClick={handleBatchReconcileAll}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>1-Click Batch Reconcile</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {bankAccounts.map(b => (
          <div
            key={b.id}
            onClick={() => setSelectedBankId(b.id)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              b.id === selectedBankId
                ? 'bg-zinc-800/80 border-indigo-500 shadow-lg shadow-indigo-500/10'
                : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                {b.bankName}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">{b.ifscCode}</span>
            </div>

            <div className="text-lg font-bold text-white font-mono">
              ₹{b.currentBalance.toLocaleString('en-IN')}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-2">
              <span>A/c: {b.accountNumber}</span>
              <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {b.unreconciledCount} Unreconciled
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reconciliation Side-By-Side Matrix */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Bank Transactions Matrix • {activeAccount?.bankName}
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Total Statement Lines: {activeTransactions.length}
          </span>
        </div>

        <div className="divide-y divide-zinc-800/80">
          {activeTransactions.map(tx => (
            <div key={tx.id} className="p-4 hover:bg-zinc-800/30 transition-colors space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="font-semibold text-white flex items-center gap-2">
                    <span>{tx.description}</span>
                    <span className="text-[10px] font-mono text-zinc-500">Ref: {tx.referenceNo}</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">{tx.date}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`font-mono text-sm font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                  </div>

                  {tx.isReconciled ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Reconciled
                    </span>
                  ) : (
                    <button
                      onClick={() => onReconcileTransaction(tx.id)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow flex items-center gap-1 transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Match</span>
                    </button>
                  )}
                </div>
              </div>

              {/* AI Match Suggestion Card */}
              {!tx.isReconciled && tx.aiSuggestedMatch && (
                <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs space-y-1.5 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-indigo-400 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      AI Match Suggestion • {tx.aiSuggestedMatch.confidence}% Confidence
                    </span>
                    <span className="text-zinc-400 text-[10px] font-mono">
                      Target: {tx.aiSuggestedMatch.contactName || tx.aiSuggestedMatch.accountName}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">
                    {tx.aiSuggestedMatch.reason}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
