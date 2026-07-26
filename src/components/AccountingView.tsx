import React, { useState } from 'react';
import { Account, JournalEntry, JournalLine } from '../types';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  X,
  FileSpreadsheet,
  Building2,
  DollarSign,
  ArrowRight
} from 'lucide-react';

interface AccountingViewProps {
  accounts: Account[];
  journalEntries: JournalEntry[];
  onAddJournalEntry: (entry: JournalEntry) => void;
}

export const AccountingView: React.FC<AccountingViewProps> = ({
  accounts = [],
  journalEntries = [],
  onAddJournalEntry = (_entry: JournalEntry) => {}
}) => {
  const safeAccounts = accounts || [];
  const safeJournalEntries = journalEntries || [];
  const [activeTab, setActiveTab] = useState<'coa' | 'journals' | 'trial-balance'>('journals');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);

  // New Journal Entry Form State
  const [narration, setNarration] = useState('');
  const [reference, setReference] = useState('');
  const [lines, setLines] = useState<Array<{ accountId: string; debit: number; credit: number }>>([
    { accountId: accounts[0]?.id || '', debit: 0, credit: 0 },
    { accountId: accounts[1]?.id || '', debit: 0, credit: 0 },
  ]);

  const totalDebit = lines.reduce((sum, l) => sum + (Number(l.debit) || 0), 0);
  const totalCredit = lines.reduce((sum, l) => sum + (Number(l.credit) || 0), 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01 && totalDebit > 0;

  const handleLineChange = (index: number, field: 'accountId' | 'debit' | 'credit', val: any) => {
    const updated = [...lines];
    updated[index] = { ...updated[index], [field]: val };
    setLines(updated);
  };

  const handleAddLine = () => {
    setLines([...lines, { accountId: accounts[0]?.id || '', debit: 0, credit: 0 }]);
  };

  const handleSaveEntry = () => {
    if (!isBalanced || !narration.trim()) return;

    const formattedLines: JournalLine[] = lines.map(l => {
      const acc = accounts.find(a => a.id === l.accountId);
      return {
        accountId: l.accountId,
        accountName: acc?.name || 'Account',
        accountCode: acc?.code || '0000',
        debit: Number(l.debit) || 0,
        credit: Number(l.credit) || 0,
      };
    });

    const newJv: JournalEntry = {
      id: `jrn_${Date.now()}`,
      entryNumber: `JV-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      narration,
      reference,
      lines: formattedLines,
      totalAmount: totalDebit,
      status: 'Posted',
      source: 'Manual',
      createdBy: 'Aarav Sharma',
      createdAt: new Date().toLocaleString(),
    };

    onAddJournalEntry(newJv);
    setIsNewEntryOpen(false);
    setNarration('');
    setReference('');
    setLines([
      { accountId: accounts[0]?.id || '', debit: 0, credit: 0 },
      { accountId: accounts[1]?.id || '', debit: 0, credit: 0 },
    ]);
  };

  const filteredAccounts = safeAccounts.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.code.includes(searchTerm) ||
    a.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Sub-Tabs */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono font-medium border border-indigo-500/20">
              General Ledger Engine
            </span>
            <span className="text-xs text-zinc-400 font-mono">Strict Double Entry</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Chart of Accounts & Journal Vouchers
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('journals')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'journals' ? 'bg-indigo-600 text-white font-semibold shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Journal Vouchers ({journalEntries.length})
            </button>
            <button
              onClick={() => setActiveTab('coa')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'coa' ? 'bg-indigo-600 text-white font-semibold shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Chart of Accounts ({accounts.length})
            </button>
            <button
              onClick={() => setActiveTab('trial-balance')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'trial-balance' ? 'bg-indigo-600 text-white font-semibold shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Trial Balance
            </button>
          </div>

          <button
            onClick={() => setIsNewEntryOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Journal Entry</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Journal Vouchers List */}
      {activeTab === 'journals' && (
        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Immutable General Ledger Vouchers
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Balanced Debits = Credits
              </span>
            </div>

            <div className="divide-y divide-zinc-800/80">
              {journalEntries.map((jv) => (
                <div key={jv.id} className="p-4 hover:bg-zinc-800/30 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {jv.entryNumber}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">{jv.date}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                        Source: {jv.source}
                      </span>
                    </div>

                    <div className="text-xs font-mono font-bold text-emerald-400">
                      ₹{jv.totalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 italic">{jv.narration}</p>

                  <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 space-y-1 text-xs font-mono">
                    {jv.lines.map((line, idx) => (
                      <div key={idx} className="flex items-center justify-between text-zinc-400">
                        <span className="text-zinc-200">[{line.accountCode}] {line.accountName}</span>
                        <div className="flex items-center gap-6">
                          <span className={line.debit > 0 ? 'text-indigo-400 font-medium' : 'text-zinc-600'}>
                            Dr: ₹{line.debit.toLocaleString('en-IN')}
                          </span>
                          <span className={line.credit > 0 ? 'text-emerald-400 font-medium' : 'text-zinc-600'}>
                            Cr: ₹{line.credit.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Chart of Accounts */}
      {activeTab === 'coa' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800 w-full max-w-md">
              <Search className="w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by account name, code, or type..."
                className="bg-transparent border-none text-xs text-white placeholder-zinc-500 focus:outline-none w-full"
              />
            </div>
            <span className="text-xs font-mono text-zinc-400">Total Ledgers: {filteredAccounts.length}</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-950 text-zinc-400 font-mono text-[11px] uppercase tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="p-3.5">Code</th>
                    <th className="p-3.5">Account Name</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Sub-Category</th>
                    <th className="p-3.5 text-right">Current Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {filteredAccounts.map((acc) => (
                    <tr key={acc.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="p-3.5 font-mono text-indigo-400 font-medium">{acc.code}</td>
                      <td className="p-3.5 font-semibold text-white">{acc.name}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                          acc.type === 'Asset' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          acc.type === 'Liability' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          acc.type === 'Equity' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' :
                          acc.type === 'Income' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                          'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {acc.type}
                        </span>
                      </td>
                      <td className="p-3.5 text-zinc-400">{acc.subType}</td>
                      <td className="p-3.5 text-right font-mono font-bold text-white">
                        ₹{acc.balance.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Trial Balance */}
      {activeTab === 'trial-balance' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h3 className="text-sm font-bold text-white">Trial Balance Statement</h3>
              <p className="text-[11px] text-zinc-400 font-mono">As of July 25, 2026</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Balanced Trial Ledger
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="p-3">Code</th>
                  <th className="p-3">Account Title</th>
                  <th className="p-3 text-right">Debit (Dr)</th>
                  <th className="p-3 text-right">Credit (Cr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {accounts.map((acc) => {
                  const isDebitNature = acc.type === 'Asset' || acc.type === 'Expense';
                  return (
                    <tr key={acc.id} className="hover:bg-zinc-800/30">
                      <td className="p-3 text-indigo-400">{acc.code}</td>
                      <td className="p-3 text-zinc-200">{acc.name}</td>
                      <td className="p-3 text-right text-indigo-300">
                        {isDebitNature ? `₹${acc.balance.toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td className="p-3 text-right text-emerald-300">
                        {!isDebitNature ? `₹${acc.balance.toLocaleString('en-IN')}` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New Journal Entry Modal */}
      {isNewEntryOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Create Manual Journal Voucher</span>
              </h3>
              <button 
                onClick={() => setIsNewEntryOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Narration / Memo *</label>
                <input
                  type="text"
                  value={narration}
                  onChange={(e) => setNarration(e.target.value)}
                  placeholder="e.g. Adjustment for prepaid rent"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Reference No.</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. REF-90812"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2 text-xs">
              <div className="text-zinc-400 font-mono text-[10px] uppercase tracking-wider">Voucher Line Items</div>
              {lines.map((line, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <select
                    value={line.accountId}
                    onChange={(e) => handleLineChange(idx, 'accountId', e.target.value)}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  >
                    {accounts.map(a => (
                      <option key={a.id} value={a.id}>
                        [{a.code}] {a.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={line.debit || ''}
                    onChange={(e) => handleLineChange(idx, 'debit', e.target.value)}
                    placeholder="Debit (₹)"
                    className="w-32 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-indigo-300 font-mono focus:border-indigo-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    value={line.credit || ''}
                    onChange={(e) => handleLineChange(idx, 'credit', e.target.value)}
                    placeholder="Credit (₹)"
                    className="w-32 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-emerald-300 font-mono focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddLine}
                className="text-xs text-indigo-400 hover:underline font-mono"
              >
                + Add Another Line
              </button>
            </div>

            {/* Balance Status */}
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-4">
                <span>Total Dr: <strong className="text-indigo-400">₹{totalDebit.toLocaleString('en-IN')}</strong></span>
                <span>Total Cr: <strong className="text-emerald-400">₹{totalCredit.toLocaleString('en-IN')}</strong></span>
              </div>
              {isBalanced ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Balanced
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Unbalanced (Diff: ₹{Math.abs(totalDebit - totalCredit).toLocaleString('en-IN')})
                </span>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsNewEntryOpen(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEntry}
                disabled={!isBalanced || !narration.trim()}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold shadow"
              >
                Post Journal Voucher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
