import React from 'react';
import { GSTReturnSummary } from '../types';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Download, 
  Clock, 
  HelpCircle,
  FileText
} from 'lucide-react';

interface GSTEngineViewProps {
  gstSummary: GSTReturnSummary;
}

export const GSTEngineView: React.FC<GSTEngineViewProps> = ({ gstSummary }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium border border-emerald-500/20">
              GST Portal & ITC Optimizer
            </span>
            <span className="text-xs text-zinc-400 font-mono">India Tax Compliance</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            GSTR-1, GSTR-3B & Input Tax Credit Engine
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('GSTR-3B JSON File Generated for GST Portal Direct Filing.')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Generate GSTR-3B JSON</span>
          </button>
        </div>
      </div>

      {/* Primary GST Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="text-zinc-400 text-xs mb-1">Total Taxable Sales Value</div>
          <div className="text-xl font-bold text-white">₹{gstSummary.taxableValueSales.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-zinc-500 mt-1 font-sans">Period: {gstSummary.period}</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="text-zinc-400 text-xs mb-1">Total Output Tax Liability</div>
          <div className="text-xl font-bold text-rose-400">₹{gstSummary.totalOutputTax.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-zinc-500 mt-1 font-sans">CGST + SGST (18%)</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="text-zinc-400 text-xs mb-1">Available Input Tax Credit (ITC)</div>
          <div className="text-xl font-bold text-emerald-400">₹{gstSummary.totalItcAvailable.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-zinc-500 mt-1 font-sans">From Verified Vendors</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="text-zinc-400 text-xs mb-1">Net GST Payable</div>
          <div className="text-xl font-bold text-amber-400">₹{gstSummary.netGstPayable.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-sans flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Ready for Cash Ledger Payment
          </div>
        </div>
      </div>

      {/* Tax Breakdown Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Output Tax Breakdown */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-rose-400" />
            <span>Output Tax Liability (Sales)</span>
          </h3>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex justify-between">
              <span className="text-zinc-400">Central GST (CGST @ 9%):</span>
              <span className="text-white font-bold">₹{gstSummary.outputCgst.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex justify-between">
              <span className="text-zinc-400">State GST (SGST @ 9%):</span>
              <span className="text-white font-bold">₹{gstSummary.outputSgst.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex justify-between">
              <span className="text-zinc-400">Integrated GST (IGST @ 18%):</span>
              <span className="text-white font-bold">₹{gstSummary.outputIgst.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Input Tax Credit Breakdown */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Input Tax Credit (ITC - Purchases)</span>
          </h3>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex justify-between">
              <span className="text-zinc-400">CGST Input Credit:</span>
              <span className="text-emerald-400 font-bold">₹{gstSummary.itcCgst.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex justify-between">
              <span className="text-zinc-400">SGST Input Credit:</span>
              <span className="text-emerald-400 font-bold">₹{gstSummary.itcSgst.toLocaleString('en-IN')}</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex justify-between">
              <span className="text-zinc-400">IGST Input Credit:</span>
              <span className="text-emerald-400 font-bold">₹{gstSummary.itcIgst.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI GST Audit & Mismatch Alerts */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI GST Mismatch & Audit Alerts</span>
          </h3>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            {gstSummary.mismatchCount} Action Required
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-zinc-300 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-200">GSTR-2B vs Vendor Bill Discrepancy</div>
              <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                Vendor "TechSupplies India Ltd" uploaded bill for ₹45,000 in GSTR-1, but invoice missing in local ERP purchase ledger. AI suggests drafting purchase bill to claim ₹8,100 additional ITC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
