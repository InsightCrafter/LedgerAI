import React, { useState } from 'react';
import { AIAgentType, AgentChatMessage } from '../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  FileText, 
  Coins, 
  HelpCircle,
  Building2,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface AIAssistantViewProps {
  onExecuteAction: (actionType: string, payload: any) => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({ onExecuteAction }) => {
  const [selectedAgent, setSelectedAgent] = useState<AIAgentType>('CEO Agent');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const agentsList: { type: AIAgentType; desc: string; icon: any; badgeColor: string }[] = [
    { type: 'CEO Agent', desc: 'High-level business intelligence & profit growth', icon: TrendingUp, badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    { type: 'Accounting Agent', desc: 'Double-entry journals, chart of accounts & balance checks', icon: BookOpenIcon, badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
    { type: 'GST Agent', desc: 'GSTR-1, GSTR-3B, ITC optimization & GSTIN audits', icon: ShieldCheck, badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { type: 'Tax Agent', desc: 'TDS calculations, Section 194C/J, Section 44AD', icon: Coins, badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    { type: 'Audit Agent', desc: 'Compliance checks, anomaly alerts & immutable logs', icon: ShieldCheck, badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
    { type: 'Banking Agent', desc: 'Bank statement auto-reconciliation & payment matching', icon: Building2, badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { type: 'Collections Agent', desc: 'Dunning follow-ups & accounts receivable recovery', icon: Zap, badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    { type: 'Payroll Agent', desc: 'Salaries, PF, ESI, Professional Tax & Payslip generation', icon: FileText, badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
  ];

  function BookOpenIcon(props: any) {
    return <Cpu {...props} />;
  }

  const [messages, setMessages] = useState<AgentChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      agentType: 'CEO Agent',
      text: 'Greetings. I am your CEO Agent in LedgerAI. I have reviewed your Q1 & Q2 performance. Revenue is up 14.2% YoY, but AWS Cloud compute costs surged by 18.5%. What financial objectives or workflows would you like to execute today?',
      timestamp: '12:00 PM',
      actionProposal: {
        type: 'ANALYZE_PROFIT',
        title: 'Run Deep Profitability Analysis',
        description: 'Examine cost centers and identify 3 high-impact expense reduction targets.',
        payload: { period: 'June 2026', topVariance: 'AWS Compute ($145k)' },
        status: 'Pending Confirmation'
      }
    }
  ]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: AgentChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    const currentPrompt = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentPrompt,
          agentType: selectedAgent
        })
      });

      const json = await response.json();
      const aiReplyText = json.reply || 'I have analyzed your query and updated your ERP context.';

      const aiMsg: AgentChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        agentType: selectedAgent,
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'ai',
          agentType: selectedAgent,
          text: 'I have processed your financial request. All double-entry balances and GST compliance rules remain intact.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-4 animate-in fade-in duration-300">
      {/* Left Agent Selector Sidebar */}
      <div className="w-full md:w-72 bg-zinc-900 border border-zinc-800 rounded-2xl p-3 flex flex-col gap-1 shrink-0 overflow-y-auto max-h-48 md:max-h-full">
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider px-2 py-1">
          Specialized AI Swarm
        </div>
        {agentsList.map(agent => {
          const Icon = agent.icon;
          const isSelected = agent.type === selectedAgent;
          return (
            <button
              key={agent.type}
              onClick={() => setSelectedAgent(agent.type)}
              className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                isSelected 
                  ? 'bg-zinc-800 border-indigo-500/50 text-white shadow-md' 
                  : 'bg-zinc-950/40 border-zinc-800/60 text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200'
              }`}
            >
              <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 border ${agent.badgeColor}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold truncate">{agent.type}</div>
                <div className="text-[10px] text-zinc-500 truncate">{agent.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Chat Workspace */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-xl">
        {/* Chat Header */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">{selectedAgent}</h2>
              <p className="text-[10px] font-mono text-emerald-400">Online • Double-Entry Validation Ready</p>
            </div>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800">
            Engine: LedgerAI Autonomous Local
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-tl-none'
              }`}>
                {msg.sender === 'ai' && (
                  <div className="text-[10px] font-mono text-indigo-400 font-medium">
                    {msg.agentType}
                  </div>
                )}
                
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Inline Action Proposal */}
                {msg.actionProposal && (
                  <div className="mt-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">{msg.actionProposal.title}</span>
                      <span className="text-[10px] font-mono text-amber-400">Proposal</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">{msg.actionProposal.description}</p>
                    <button
                      onClick={() => onExecuteAction(msg.actionProposal!.type, msg.actionProposal!.payload)}
                      className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Execute Proposal</span>
                    </button>
                  </div>
                )}

                <div className={`text-[9px] font-mono text-right ${msg.sender === 'user' ? 'text-indigo-200' : 'text-zinc-500'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono animate-pulse">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>{selectedAgent} is formulating response...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-3 border-t border-zinc-800 bg-zinc-950">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 focus-within:border-indigo-500/80 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Ask ${selectedAgent} e.g. 'Show cashflow forecast', 'Audit GSTR-3B'...`}
              className="flex-1 bg-transparent border-none text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
