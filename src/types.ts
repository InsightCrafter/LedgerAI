/**
 * LedgerAI - Types Definition
 */

export type Role = 'Admin' | 'Accountant' | 'CA Auditor' | 'Viewer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyName?: string;
  avatarUrl?: string;
  gstin?: string;
}

export interface Company {
  id: string;
  name: string;
  gstin: string;
  currency: 'INR' | 'USD' | 'EUR';
  country: string;
  industry: string;
  fyStartMonth: string; // e.g., "April"
  plan: 'Enterprise' | 'Pro' | 'CA Firm';
}

export type AccountType = 'Asset' | 'Liability' | 'Equity' | 'Income' | 'Expense';

export interface Account {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  subType: string; // e.g., "Current Asset", "Bank Account", "Direct Income"
  balance: number;
  currency: string;
  isSystem?: boolean;
}

export interface JournalLine {
  accountId: string;
  accountName: string;
  accountCode: string;
  debit: number;
  credit: number;
  memo?: string;
}

export interface JournalEntry {
  id: string;
  entryNumber: string;
  date: string;
  narration: string;
  reference?: string;
  lines: JournalLine[];
  totalAmount: number;
  status: 'Posted' | 'Draft' | 'Pending Approval';
  source: 'Manual' | 'AI Document' | 'Bank Rec' | 'Invoice Auto' | 'Payroll Auto';
  createdBy: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  type: 'Customer' | 'Vendor' | 'Both';
  gstin?: string;
  email: string;
  phone: string;
  address: string;
  outstandingBalance: number;
  creditLimit?: number;
  paymentTerms: string; // e.g. "Net 30"
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  hsnSac?: string;
  quantity: number;
  unitPrice: number;
  taxRate: number; // e.g. 18 for 18%
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  contactId: string;
  contactName: string;
  contactGstin?: string;
  type: 'Sales' | 'Purchase';
  issueDate: string;
  dueDate: string;
  status: 'Paid' | 'Unpaid' | 'Overdue' | 'Partially Paid' | 'Draft';
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  amountPaid: number;
  notes?: string;
  pdfUrl?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  ledgerAccountId: string;
  currentBalance: number;
  unreconciledCount: number;
}

export interface BankTransaction {
  id: string;
  bankAccountId: string;
  date: string;
  description: string;
  referenceNo: string;
  amount: number; // positive = deposit, negative = withdrawal
  type: 'Credit' | 'Debit';
  isReconciled: boolean;
  matchedJournalId?: string;
  aiSuggestedMatch?: {
    contactId?: string;
    contactName?: string;
    accountId?: string;
    accountName?: string;
    confidence: number; // 0 - 100
    reason: string;
  };
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantityOnHand: number;
  reorderPoint: number;
  unitOfMeasure: string; // Pcs, Kgs, Units
  purchasePrice: number;
  sellingPrice: number;
  hsnCode: string;
  valuationMethod: 'FIFO' | 'Weighted Average';
  totalValue: number;
}

export interface GSTReturnSummary {
  period: string; // e.g., "June 2026"
  gstr1Status: 'Filed' | 'Pending' | 'Draft';
  gstr3bStatus: 'Filed' | 'Pending' | 'Draft';
  taxableValueSales: number;
  outputCgst: number;
  outputSgst: number;
  outputIgst: number;
  totalOutputTax: number;
  itcCgst: number;
  itcSgst: number;
  itcIgst: number;
  totalItcAvailable: number;
  netGstPayable: number;
  mismatchCount: number;
}

export interface Employee {
  id: string;
  employeeCode: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  pan: string;
  uan?: string;
  bankAccountNo: string;
  basicSalary: number;
  hra: number;
  specialAllowance: number;
  pfDeduction: number;
  esiDeduction: number;
  ptDeduction: number;
  tdsDeduction: number;
  netPay: number;
}

export interface PayrollRun {
  id: string;
  monthYear: string; // "June 2026"
  totalEmployees: number;
  totalGrossSalary: number;
  totalDeductions: number;
  totalNetPayable: number;
  status: 'Completed' | 'Pending Approval' | 'Processing';
  processedDate: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: Role;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
  aiAssisted: boolean;
}

export type AIAgentType = 
  | 'CEO Agent' 
  | 'Accounting Agent' 
  | 'GST Agent' 
  | 'Tax Agent' 
  | 'Audit Agent' 
  | 'Finance Agent' 
  | 'Sales Agent' 
  | 'Inventory Agent' 
  | 'Payroll Agent' 
  | 'Banking Agent'
  | 'Document Agent'
  | 'Collections Agent'
  | 'Forecasting Agent';

export interface AgentChatMessage {
  id: string;
  sender: 'user' | 'ai';
  agentType?: AIAgentType;
  text: string;
  timestamp: string;
  actionProposal?: {
    type: 'CREATE_INVOICE' | 'POST_JOURNAL' | 'RECONCILE_BANK' | 'RUN_PAYROLL' | 'GENERATE_REPORT' | 'SEND_REMINDERS';
    title: string;
    description: string;
    payload: any;
    status: 'Pending Confirmation' | 'Executed' | 'Cancelled';
  };
  reasoningSteps?: string[];
}

export type SubscriptionTier = 'Starter' | 'Growth' | 'Enterprise';

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  currency: string;
  recommended?: boolean;
  tagline: string;
  maxCompanies: number;
  maxUsers: number;
  maxDocumentScansMonthly: number;
  features: string[];
}

export interface SubscriptionDetails {
  planId: SubscriptionTier;
  status: 'Active' | 'Trialing' | 'Past Due' | 'Cancelled';
  billingCycle: 'monthly' | 'annual';
  renewsAt: string;
  currentPeriodStart: string;
  scansUsedThisMonth: number;
  seatsUsed: number;
  companiesUsed: number;
  customGeminiApiKey?: string;
  paymentMethodLast4?: string;
}

export interface SubscriptionInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  planName: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: 'Paid' | 'Processing';
  pdfDownloadUrl?: string;
}

export interface DocumentExtractionResult {
  fileName: string;
  fileType: 'Invoice' | 'Bank Statement' | 'Receipt' | 'Expense Slip';
  confidenceScore: number;
  extractedVendor: string;
  vendorGstin?: string;
  invoiceNumber?: string;
  date?: string;
  subtotal: number;
  taxAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  lineItems: Array<{ description: string; qty: number; rate: number; amount: number }>;
  suggestedAccountName: string;
  suggestedAccountId: string;
  proposedJournalLines: JournalLine[];
  needsClarification: boolean;
  clarificationPrompt?: string;
}
