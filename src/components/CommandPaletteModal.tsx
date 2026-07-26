import React, { useState, useEffect } from 'react';
import { Company } from '../types';
import { 
  Sparkles, 
  Command, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Bot, 
  Zap, 
  ShieldCheck, 
  FileText, 
  BookOpen, 
  Building2, 
  Coins, 
  Send,
  Loader2,
  AlertTriangle
} from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCompany: Company;
  onExecuteAction: (actionType: string, payload: any) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  selectedCompany,
  onExecuteAction
}) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Suggested Prompts
  const suggestions = [
    { label: 'Create sales invoice for Amazon Web Services ($145,000)', query: 'Create invoice for Amazon for 145000' },
    { label: 'Show why profit dropped in June', query: 'Show why profit dropped in June' },
    { label: 'Send payment reminder to overdue customers', query: 'Send reminder to unpaid customers' },
    { label: 'Close June 2026 financial books with journal entry', query: 'Close June books' },
    { label: 'Calculate Net GST Payable & Input Tax Credit', query: 'Generate GST summary for June' },
    { label: 'Pay June salaries with PF and TDS deductions', query: 'Pay June salaries' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setExecutionResult(null);
          setError(null);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (queryText?: string) => {
    const textToSubmit = queryText || prompt;
    if (!textToSubmit.trim()) return;

    setIsLoading(true);
    setError(null);
    setExecutionResult(null);

    try {
      const response = await fetch('/api/ai/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSubmit,
          companyContext: {
            name: selectedCompany.name,
            currency: selectedCompany.currency,
            gstin: selectedCompany.gstin,
          }
        })
      });

      const json = await response.json();
      if (json.success && json.data) {
        setExecutionResult(json.data);
      } else {
        setError(json.error || 'Failed to process command');
      }
    } catch (err: any) {
      setError(err.message || 'Error communicating with AI server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAndRun = () => {
    if (executionResult?.actionType && executionResult?.actionPayload) {
      onExecuteAction(executionResult.actionType, executionResult.actionPayload);
      onClose();
      setExecutionResult(null);
      setPrompt('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 transition-all">
      <div 
        className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">LedgerAI ERP</h2>
              <p className="text-[11px] text-zinc-400 font-mono">Talk to your ERP in plain natural language</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command Input */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-900">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
            className="flex items-center gap-3 bg-zinc-950 px-3.5 py-2.5 rounded-xl border border-zinc-800 focus-within:border-indigo-500/80 transition-colors"
          >
            <Command className="w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 'Create invoice for Amazon for $145,000', 'Close June books'..."
              className="flex-1 bg-transparent border-none text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 disabled:opacity-40 transition-all shadow-md shadow-indigo-600/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <span>Execute</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Content Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {/* Default Suggestions if no query run */}
          {!executionResult && !isLoading && !error && (
            <div>
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Suggested AI Actions</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrompt(s.query);
                      handleSubmit(s.query);
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-indigo-500/50 hover:bg-zinc-800/50 text-xs text-zinc-300 flex items-center justify-between group transition-all"
                  >
                    <span className="group-hover:text-white transition-colors">{s.label}</span>
                    <span className="font-mono text-[10px] text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">Run →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading Animation */}
          {isLoading && (
            <div className="py-8 flex flex-col items-center justify-center space-y-3">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                <div className="absolute inset-2 rounded-full border-2 border-violet-500/20 border-b-violet-500 animate-spin-slow" />
                <Bot className="w-5 h-5 text-indigo-400 absolute inset-0 m-auto" />
              </div>
              <div className="text-xs text-zinc-400 font-mono animate-pulse">
                Orchestrating Accounting & Compliance Agents...
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Execution Output Preview */}
          {executionResult && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              {/* Agent Tag & Summary */}
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-medium border border-indigo-500/30 flex items-center gap-1">
                    <Bot className="w-3 h-3" />
                    {executionResult.primaryAgent || 'Accounting Agent'}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Double-Entry Verified
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {executionResult.actionTitle || 'Execution Proposal'}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {executionResult.summary}
                </p>
              </div>

              {/* Thought Process Steps */}
              {executionResult.thoughtProcess && executionResult.thoughtProcess.length > 0 && (
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                    Agent Workflow Reasoning
                  </div>
                  <div className="space-y-1.5 text-[11px] font-mono text-zinc-400">
                    {executionResult.thoughtProcess.map((step: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-400">{idx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Details Card */}
              {executionResult.actionPayload && (
                <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 text-xs">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                    Action Data & Ledger Output
                  </div>
                  <pre className="text-[11px] font-mono text-emerald-300/90 bg-zinc-900/90 p-2.5 rounded-lg overflow-x-auto max-h-40 border border-zinc-800">
                    {JSON.stringify(executionResult.actionPayload, null, 2)}
                  </pre>
                </div>
              )}

              {/* Action Confirmation Button */}
              {executionResult.actionType !== 'NONE' && (
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setExecutionResult(null)}
                    className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleConfirmAndRun}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Post to ERP Ledger</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-zinc-800 bg-zinc-950/80 text-[11px] text-zinc-500 flex items-center justify-between font-mono">
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">Esc</kbd>
            <span>to close</span>
          </div>
          <div className="flex items-center gap-1 text-zinc-400">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Multi-Agent Swarm Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};
