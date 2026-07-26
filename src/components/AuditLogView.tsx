import React from 'react';
import { AuditLogItem } from '../types';
import { 
  ShieldCheck, 
  Clock, 
  Lock, 
  Bot, 
  CheckCircle2, 
  Cpu, 
  Search,
  Key
} from 'lucide-react';

interface AuditLogViewProps {
  auditLogs: AuditLogItem[];
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ auditLogs = [] }) => {
  const safeAuditLogs = auditLogs || [];
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-xs font-mono font-medium border border-rose-500/20">
              Enterprise Compliance & Audit
            </span>
            <span className="text-xs text-zinc-400 font-mono">Immutable Forensic Trail</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            SOC2 Audit Trail & Security Protocol
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> SOC2 Type II Certified
          </span>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white">256-Bit AES Encryption</div>
            <div className="text-[10px] text-zinc-500 font-sans mt-0.5">At rest and in transit (TLS 1.3)</div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white">Multi-Tenant Isolation</div>
            <div className="text-[10px] text-zinc-500 font-sans mt-0.5">Strict schema-level data boundary</div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white">AI Safety Guardrails</div>
            <div className="text-[10px] text-zinc-500 font-sans mt-0.5">No ledger edit without human approval</div>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            System Forensic Audit Logs
          </span>
          <span className="text-xs font-mono text-zinc-400">Total Recorded Actions: {safeAuditLogs.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 font-mono text-[11px] uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">User & Role</th>
                <th className="p-3.5">Action Code</th>
                <th className="p-3.5">Module</th>
                <th className="p-3.5">Event Details</th>
                <th className="p-3.5 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 font-mono">
              {safeAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-3.5 text-zinc-400">{log.timestamp}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-white font-sans">{log.user}</div>
                    <div className="text-[10px] text-indigo-400">{log.role}</div>
                  </td>
                  <td className="p-3.5 text-indigo-300 font-bold">{log.action}</td>
                  <td className="p-3.5 text-zinc-300">{log.module}</td>
                  <td className="p-3.5 text-zinc-300 max-w-xs font-sans">
                    <div>{log.details}</div>
                    {log.aiAssisted && (
                      <span className="text-[10px] text-indigo-400 font-mono inline-flex items-center gap-1 mt-0.5">
                        <Bot className="w-3 h-3" /> AI Autonomous Execution
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right text-zinc-500">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
