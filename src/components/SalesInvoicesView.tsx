import React, { useState } from 'react';
import { Invoice, Contact } from '../types';
import { 
  FileText, 
  Plus, 
  Search, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  X, 
  Printer, 
  Sparkles,
  Download
} from 'lucide-react';

interface SalesInvoicesViewProps {
  invoices: Invoice[];
  contacts: Contact[];
  onAddInvoice: (inv: Invoice) => void;
}

export const SalesInvoicesView: React.FC<SalesInvoicesViewProps> = ({
  invoices = [],
  contacts = [],
  onAddInvoice = (_inv: Invoice) => {}
}) => {
  const safeInvoices = invoices || [];
  const safeContacts = contacts || [];
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [selectedInvoiceForPreview, setSelectedInvoiceForPreview] = useState<Invoice | null>(null);
  const [reminderSuccess, setReminderSuccess] = useState<string | null>(null);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerGstin, setCustomerGstin] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(100000);

  const salesInvoices = safeInvoices.filter(i => i.type === 'Sales');

  const filteredInvoices = salesInvoices.filter(i => {
    const matchesStatus = filterStatus === 'All' || i.status === filterStatus;
    const matchesSearch = i.contactName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          i.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateInvoice = () => {
    if (!customerName || !amount) return;

    const subtotal = Number(amount) || 0;
    const taxAmount = Math.round(subtotal * 0.18);
    const cgst = Math.round(taxAmount / 2);
    const sgst = Math.round(taxAmount / 2);
    const totalAmount = subtotal + taxAmount;

    const newInv: Invoice = {
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      contactId: 'cnt_custom',
      contactName: customerName,
      contactGstin: customerGstin || '27AAACA9999Z1Z0',
      type: 'Sales',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      status: 'Unpaid',
      lineItems: [
        { id: `l_${Date.now()}`, description: description || 'Professional Services', quantity: 1, unitPrice: subtotal, taxRate: 18, amount: subtotal }
      ],
      subtotal,
      taxAmount,
      cgst,
      sgst,
      igst: 0,
      totalAmount,
      amountPaid: 0,
    };

    onAddInvoice(newInv);
    setIsNewInvoiceOpen(false);
    setCustomerName('');
    setCustomerGstin('');
    setDescription('');
    setAmount(100000);
  };

  const handleSendAIReminder = (inv: Invoice) => {
    setReminderSuccess(`AI Dunning Agent sent automated email follow-up for ${inv.invoiceNumber} to ${inv.contactName}.`);
    setTimeout(() => setReminderSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium border border-emerald-500/20">
              Sales & Billing Engine
            </span>
            <span className="text-xs text-zinc-400 font-mono">Automated GST Compliance</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Customer Invoices & Collections
          </h1>
        </div>

        <button
          onClick={() => setIsNewInvoiceOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Sales Invoice</span>
        </button>
      </div>

      {reminderSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{reminderSuccess}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800 w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search invoice # or customer name..."
            className="bg-transparent border-none text-xs text-white placeholder-zinc-500 focus:outline-none w-full"
          />
        </div>

        <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs font-medium w-full sm:w-auto justify-center">
          {['All', 'Paid', 'Unpaid', 'Overdue'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterStatus === st ? 'bg-indigo-600 text-white font-semibold shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 font-mono text-[11px] uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Customer Name</th>
                <th className="p-3.5">Issue Date</th>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Amount (incl. GST)</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-3.5 font-mono text-indigo-400 font-medium">{inv.invoiceNumber}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-white">{inv.contactName}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">GSTIN: {inv.contactGstin || 'Unspecified'}</div>
                  </td>
                  <td className="p-3.5 font-mono text-zinc-400">{inv.issueDate}</td>
                  <td className="p-3.5 font-mono text-zinc-400">{inv.dueDate}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border ${
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      inv.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-white">
                    ₹{inv.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedInvoiceForPreview(inv)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-medium transition-colors"
                      >
                        Preview PDF
                      </button>
                      {inv.status !== 'Paid' && (
                        <button
                          onClick={() => handleSendAIReminder(inv)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-[11px] font-medium flex items-center gap-1 transition-all"
                        >
                          <Send className="w-3 h-3" />
                          <span>AI Follow-Up</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Invoice Modal */}
      {isNewInvoiceOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Create Sales Invoice</span>
              </h3>
              <button onClick={() => setIsNewInvoiceOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Tata Consultancy Services"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Customer GSTIN (Optional)</label>
                <input
                  type="text"
                  value={customerGstin}
                  onChange={(e) => setCustomerGstin(e.target.value)}
                  placeholder="e.g. 27AAACT9876B1Z2"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Service / Item Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Enterprise AI Customization Retainer"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Subtotal Amount (₹) *</label>
                <input
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="100000"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-indigo-300 font-mono text-sm font-bold focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1 font-mono text-[11px] text-zinc-400">
                <div className="flex justify-between">
                  <span>CGST (9%):</span>
                  <span className="text-indigo-400">₹{Math.round((amount * 0.18)/2).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST (9%):</span>
                  <span className="text-indigo-400">₹{Math.round((amount * 0.18)/2).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-1 border-t border-zinc-800">
                  <span>Total Payable:</span>
                  <span className="text-emerald-400">₹{Math.round(amount * 1.18).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsNewInvoiceOpen(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInvoice}
                disabled={!customerName || !amount}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold shadow"
              >
                Issue Invoice & Post to Ledger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {selectedInvoiceForPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono font-bold text-indigo-400">
                Tax Invoice Preview • {selectedInvoiceForPreview.invoiceNumber}
              </span>
              <button onClick={() => setSelectedInvoiceForPreview(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Apple-Grade Tax Invoice Document */}
            <div className="bg-white text-zinc-900 p-8 rounded-xl space-y-6 shadow-inner font-sans">
              <div className="flex justify-between items-start pb-4 border-b border-zinc-200">
                <div>
                  <h2 className="text-lg font-bold text-indigo-900 tracking-tight">Apex Technologies India Pvt Ltd</h2>
                  <p className="text-xs text-zinc-500 font-mono">GSTIN: 27AAACA123411ZP</p>
                  <p className="text-xs text-zinc-500">BKC, Bandra East, Mumbai, MH 400051</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-zinc-400 uppercase">TAX INVOICE</span>
                  <div className="text-sm font-bold font-mono text-zinc-800">{selectedInvoiceForPreview.invoiceNumber}</div>
                  <div className="text-xs text-zinc-500 font-mono">Date: {selectedInvoiceForPreview.issueDate}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">BILLED TO:</div>
                  <div className="font-bold text-zinc-800 text-sm">{selectedInvoiceForPreview.contactName}</div>
                  <div className="font-mono text-zinc-500">GSTIN: {selectedInvoiceForPreview.contactGstin || 'N/A'}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">PAYMENT DUE:</div>
                  <div className="font-mono font-bold text-zinc-800">{selectedInvoiceForPreview.dueDate}</div>
                  <div className="font-mono text-emerald-600 font-semibold mt-1">Status: {selectedInvoiceForPreview.status}</div>
                </div>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-100 text-zinc-600 font-mono">
                  <tr>
                    <th className="p-2">Description</th>
                    <th className="p-2 text-center">Qty</th>
                    <th className="p-2 text-right">Rate</th>
                    <th className="p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-mono">
                  {selectedInvoiceForPreview.lineItems.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2 text-zinc-800 font-sans">{item.description}</td>
                      <td className="p-2 text-center text-zinc-600">{item.quantity}</td>
                      <td className="p-2 text-right text-zinc-600">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                      <td className="p-2 text-right text-zinc-900 font-bold">₹{item.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end pt-4 border-t border-zinc-200 text-xs font-mono">
                <div className="w-64 space-y-1">
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal:</span>
                    <span>₹{selectedInvoiceForPreview.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>CGST (9%):</span>
                    <span>₹{selectedInvoiceForPreview.cgst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>SGST (9%):</span>
                    <span>₹{selectedInvoiceForPreview.sgst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-zinc-900 pt-2 border-t border-zinc-300">
                    <span>Total Amount:</span>
                    <span className="text-indigo-900">₹{selectedInvoiceForPreview.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedInvoiceForPreview(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-medium"
              >
                Close
              </button>
              <button
                onClick={() => alert('PDF Invoice Download Triggered.')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
