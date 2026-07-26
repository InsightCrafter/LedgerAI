import React, { useState } from 'react';
import { Employee, PayrollRun } from '../types';
import { 
  Users, 
  Plus, 
  CheckCircle2, 
  FileText, 
  Coins, 
  Clock, 
  Zap, 
  X,
  Printer,
  Download
} from 'lucide-react';

interface PayrollViewProps {
  employees: Employee[];
  payrollRun: PayrollRun;
  onRunPayroll: () => void;
}

export const PayrollView: React.FC<PayrollViewProps> = ({
  employees,
  payrollRun,
  onRunPayroll
}) => {
  const [selectedPayslip, setSelectedPayslip] = useState<Employee | null>(null);
  const [payrollExecuted, setPayrollExecuted] = useState(false);

  const handleProcessPayroll = () => {
    onRunPayroll();
    setPayrollExecuted(true);
    setTimeout(() => setPayrollExecuted(false), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-mono font-medium border border-teal-500/20">
              Payroll & HR Engine
            </span>
            <span className="text-xs text-zinc-400 font-mono">Statutory Compliance Built-In</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Employee Salaries, PF, ESI & Payslip Processing
          </h1>
        </div>

        <button
          onClick={handleProcessPayroll}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-teal-600/20 transition-all"
        >
          <Zap className="w-4 h-4" />
          <span>Execute June Payroll (₹3.20M)</span>
        </button>
      </div>

      {payrollExecuted && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>June 2026 Payroll processed. Salary journal vouchers posted and bank wire batch generated!</span>
        </div>
      )}

      {/* Payroll Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="text-zinc-400 text-[10px]">Active Headcount</div>
          <div className="text-xl font-bold text-white mt-0.5">{payrollRun.totalEmployees} Employees</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="text-zinc-400 text-[10px]">Total Gross Payroll</div>
          <div className="text-xl font-bold text-indigo-400 mt-0.5">₹{payrollRun.totalGrossSalary.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="text-zinc-400 text-[10px]">Statutory Deductions (PF/ESI/TDS)</div>
          <div className="text-xl font-bold text-rose-400 mt-0.5">₹{payrollRun.totalDeductions.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <div className="text-zinc-400 text-[10px]">Net Disbursement</div>
          <div className="text-xl font-bold text-emerald-400 mt-0.5">₹{payrollRun.totalNetPayable.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Employee Directory Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            Employee Master & Salary Breakdown
          </span>
          <span className="text-xs font-mono text-zinc-400">Total Staff: {employees.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 font-mono text-[11px] uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="p-3.5">Code</th>
                <th className="p-3.5">Employee Name</th>
                <th className="p-3.5">Designation</th>
                <th className="p-3.5 text-right">Basic + HRA</th>
                <th className="p-3.5 text-right">Deductions (PF/TDS)</th>
                <th className="p-3.5 text-right">Net Salary</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-3.5 font-mono text-teal-400 font-medium">{emp.employeeCode}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-white">{emp.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">{emp.email}</div>
                  </td>
                  <td className="p-3.5 text-zinc-300">
                    <div>{emp.designation}</div>
                    <div className="text-[10px] text-zinc-500">{emp.department}</div>
                  </td>
                  <td className="p-3.5 text-right font-mono text-zinc-300">
                    ₹{(emp.basicSalary + emp.hra).toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 text-right font-mono text-rose-400">
                    -₹{(emp.pfDeduction + emp.tdsDeduction + emp.ptDeduction).toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-emerald-400">
                    ₹{emp.netPay.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedPayslip(emp)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-medium transition-colors"
                    >
                      View Payslip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payslip Modal */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono font-bold text-teal-400">
                Salary Slip • {selectedPayslip.employeeCode}
              </span>
              <button onClick={() => setSelectedPayslip(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white text-zinc-900 p-6 rounded-xl space-y-4 font-sans text-xs shadow-inner">
              <div className="flex justify-between border-b pb-3">
                <div>
                  <h4 className="font-bold text-indigo-900 text-sm">Apex Technologies India Pvt Ltd</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">June 2026 Salary Statement</p>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold">{selectedPayslip.name}</span>
                  <div className="text-[10px] text-zinc-500">{selectedPayslip.designation}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono">
                <div>
                  <div className="font-bold text-zinc-700 text-[10px] border-b pb-1 mb-1">EARNINGS</div>
                  <div className="flex justify-between"><span>Basic Salary:</span><span>₹{selectedPayslip.basicSalary.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>HRA:</span><span>₹{selectedPayslip.hra.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>Allowance:</span><span>₹{selectedPayslip.specialAllowance.toLocaleString('en-IN')}</span></div>
                </div>
                <div>
                  <div className="font-bold text-zinc-700 text-[10px] border-b pb-1 mb-1">DEDUCTIONS</div>
                  <div className="flex justify-between text-rose-600"><span>Provident Fund:</span><span>₹{selectedPayslip.pfDeduction.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-rose-600"><span>TDS Tax:</span><span>₹{selectedPayslip.tdsDeduction.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-rose-600"><span>Prof. Tax:</span><span>₹{selectedPayslip.ptDeduction.toLocaleString('en-IN')}</span></div>
                </div>
              </div>

              <div className="flex justify-between font-mono font-bold text-sm pt-3 border-t text-emerald-700">
                <span>NET TAKE HOME SALARY:</span>
                <span>₹{selectedPayslip.netPay.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setSelectedPayslip(null)} className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs">
                Close
              </button>
              <button onClick={() => alert('Payslip PDF downloaded.')} className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center gap-1.5">
                <Printer className="w-4 h-4" /> Print Payslip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
