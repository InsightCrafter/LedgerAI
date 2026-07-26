import { Company, Account, JournalEntry, Contact, Invoice, BankAccount, BankTransaction, InventoryItem, GSTReturnSummary, Employee, PayrollRun, AuditLogItem } from '../types';

export const mockCompanies: Company[] = [
  {
    id: 'comp_1',
    name: 'Apex Technologies India Pvt Ltd',
    gstin: '27AAACA123411ZP',
    currency: 'INR',
    country: 'India',
    industry: 'Software & Cloud Services',
    fyStartMonth: 'April',
    plan: 'Enterprise',
  },
  {
    id: 'comp_2',
    name: 'Zenith Global Retail Ltd',
    gstin: '07BBBCC567891ZQ',
    currency: 'USD',
    country: 'United States',
    industry: 'E-Commerce & Supply Chain',
    fyStartMonth: 'January',
    plan: 'Pro',
  },
  {
    id: 'comp_3',
    name: 'Aura Advisory & CA Practice',
    gstin: '29CCCCD901231ZR',
    currency: 'INR',
    country: 'India',
    industry: 'Accounting & Audit Firm',
    fyStartMonth: 'April',
    plan: 'CA Firm',
  }
];

export const mockAccounts: Account[] = [
  { id: 'acc_101', code: '1010', name: 'HDFC Bank - Corporate A/c (0192)', type: 'Asset', subType: 'Bank Account', balance: 2485000, currency: 'INR', isSystem: true },
  { id: 'acc_102', code: '1020', name: 'ICICI Operating Account', type: 'Asset', subType: 'Bank Account', balance: 840000, currency: 'INR', isSystem: true },
  { id: 'acc_103', code: '1100', name: 'Accounts Receivable (Trade Debtors)', type: 'Asset', subType: 'Current Asset', balance: 1650000, currency: 'INR', isSystem: true },
  { id: 'acc_104', code: '1200', name: 'GST Input Tax Credit (ITC)', type: 'Asset', subType: 'Tax Asset', balance: 184500, currency: 'INR', isSystem: true },
  { id: 'acc_105', code: '1300', name: 'Finished Goods Inventory', type: 'Asset', subType: 'Inventory', balance: 1250000, currency: 'INR', isSystem: true },
  { id: 'acc_106', code: '1400', name: 'Office Equipment & Laptops', type: 'Asset', subType: 'Fixed Asset', balance: 1400000, currency: 'INR', isSystem: false },

  { id: 'acc_201', code: '2010', name: 'Accounts Payable (Trade Creditors)', type: 'Liability', subType: 'Current Liability', balance: 920000, currency: 'INR', isSystem: true },
  { id: 'acc_202', code: '2100', name: 'GST Output Tax Payable', type: 'Liability', subType: 'Tax Liability', balance: 312000, currency: 'INR', isSystem: true },
  { id: 'acc_203', code: '2200', name: 'TDS Payable (Sec 194C / 194J)', type: 'Liability', subType: 'Statutory Liability', balance: 45000, currency: 'INR', isSystem: true },
  { id: 'acc_204', code: '2300', name: 'Provident Fund (PF) & ESI Payable', type: 'Liability', subType: 'Statutory Liability', balance: 88000, currency: 'INR', isSystem: true },

  { id: 'acc_301', code: '3010', name: 'Paid-Up Equity Capital', type: 'Equity', subType: 'Owner Equity', balance: 3000000, currency: 'INR', isSystem: true },
  { id: 'acc_302', code: '3020', name: 'Retained Earnings', type: 'Equity', subType: 'Retained Earnings', balance: 3544500, currency: 'INR', isSystem: true },

  { id: 'acc_401', code: '4010', name: 'Enterprise Software License Revenue', type: 'Income', subType: 'Direct Revenue', balance: 6850000, currency: 'INR', isSystem: false },
  { id: 'acc_402', code: '4020', name: 'Cloud Consulting Services', type: 'Income', subType: 'Direct Revenue', balance: 2450000, currency: 'INR', isSystem: false },

  { id: 'acc_501', code: '5010', name: 'Salaries, Wages & Bonuses', type: 'Expense', subType: 'Operating Expense', balance: 3200000, currency: 'INR', isSystem: false },
  { id: 'acc_502', code: '5020', name: 'AWS & Cloud Hosting Infrastructure', type: 'Expense', subType: 'Operating Expense', balance: 640000, currency: 'INR', isSystem: false },
  { id: 'acc_503', code: '5030', name: 'Office Rent & Utilities', type: 'Expense', subType: 'Administrative Expense', balance: 360000, currency: 'INR', isSystem: false },
  { id: 'acc_504', code: '5040', name: 'Legal, Audit & CA Retainers', type: 'Expense', subType: 'Professional Expense', balance: 180000, currency: 'INR', isSystem: false },
];

export const mockContacts: Contact[] = [
  {
    id: 'cnt_1',
    name: 'Amazon Web Services India Pvt Ltd',
    type: 'Vendor',
    gstin: '27AABCA9876C1Z1',
    email: 'billing@aws.in',
    phone: '+91 22 4910 8000',
    address: 'BKC, Bandra East, Mumbai, MH 400051',
    outstandingBalance: 145000,
    paymentTerms: 'Net 15',
  },
  {
    id: 'cnt_2',
    name: 'Infosys BPM Limited',
    type: 'Customer',
    gstin: '29AAACI1234A1Z5',
    email: 'finance@infosys.com',
    phone: '+91 80 2852 0261',
    address: 'Electronics City, Bengaluru, KA 560100',
    outstandingBalance: 850000,
    paymentTerms: 'Net 30',
  },
  {
    id: 'cnt_3',
    name: 'Reliance Digital Enterprise Solutions',
    type: 'Customer',
    gstin: '27AABCR5555D1ZA',
    email: 'accounts@reliancedigital.in',
    phone: '+91 22 3555 5000',
    address: 'Ghansoli, Navi Mumbai, MH 400701',
    outstandingBalance: 800000,
    paymentTerms: 'Net 45',
  },
  {
    id: 'cnt_4',
    name: 'WeWork India Management',
    type: 'Vendor',
    gstin: '29AAACW9999E1ZK',
    email: 'leases@wework.co.in',
    phone: '+91 80 4710 1000',
    address: 'Embassy GolfLinks, Bengaluru, KA 560071',
    outstandingBalance: 120000,
    paymentTerms: 'Net 10',
  },
  {
    id: 'cnt_5',
    name: 'TCS Innovation Labs',
    type: 'Customer',
    gstin: '27AAACT9876B1Z2',
    email: 'vendor.invoices@tcs.com',
    phone: '+91 22 6778 9999',
    address: 'Nariman Point, Mumbai, MH 400021',
    outstandingBalance: 0,
    paymentTerms: 'Net 30',
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv_101',
    invoiceNumber: 'INV-2026-089',
    contactId: 'cnt_2',
    contactName: 'Infosys BPM Limited',
    contactGstin: '29AAACI1234A1Z5',
    type: 'Sales',
    issueDate: '2026-06-15',
    dueDate: '2026-07-15',
    status: 'Overdue',
    lineItems: [
      { id: 'l1', description: 'Enterprise AI Search Engine Deployment - Phase 1', quantity: 1, unitPrice: 720338.98, taxRate: 18, amount: 720338.98 }
    ],
    subtotal: 720338.98,
    taxAmount: 129661.02,
    cgst: 64830.51,
    sgst: 64830.51,
    igst: 0,
    totalAmount: 850000.00,
    amountPaid: 0,
    notes: 'Please quote INV-2026-089 in electronic wire transfer.',
  },
  {
    id: 'inv_102',
    invoiceNumber: 'INV-2026-092',
    contactId: 'cnt_3',
    contactName: 'Reliance Digital Enterprise Solutions',
    contactGstin: '27AABCR5555D1ZA',
    type: 'Sales',
    issueDate: '2026-07-01',
    dueDate: '2026-08-15',
    status: 'Unpaid',
    lineItems: [
      { id: 'l2', description: 'Cloud Infrastructure Optimization & GenAI Pipeline Retainer', quantity: 1, unitPrice: 677966.10, taxRate: 18, amount: 677966.10 }
    ],
    subtotal: 677966.10,
    taxAmount: 122033.90,
    cgst: 61016.95,
    sgst: 61016.95,
    igst: 0,
    totalAmount: 800000.00,
    amountPaid: 0,
  },
  {
    id: 'inv_103',
    invoiceNumber: 'BILL-AWS-90821',
    contactId: 'cnt_1',
    contactName: 'Amazon Web Services India Pvt Ltd',
    contactGstin: '27AABCA9876C1Z1',
    type: 'Purchase',
    issueDate: '2026-07-05',
    dueDate: '2026-07-20',
    status: 'Unpaid',
    lineItems: [
      { id: 'l3', description: 'AWS Cloud Compute (EC2, ECS, Bedrock, RDS) - June 2026 Usage', quantity: 1, unitPrice: 122881.36, taxRate: 18, amount: 122881.36 }
    ],
    subtotal: 122881.36,
    taxAmount: 22118.64,
    cgst: 11059.32,
    sgst: 11059.32,
    igst: 0,
    totalAmount: 145000.00,
    amountPaid: 0,
  },
  {
    id: 'inv_104',
    invoiceNumber: 'INV-2026-075',
    contactId: 'cnt_5',
    contactName: 'TCS Innovation Labs',
    contactGstin: '27AAACT9876B1Z2',
    type: 'Sales',
    issueDate: '2026-05-10',
    dueDate: '2026-06-10',
    status: 'Paid',
    lineItems: [
      { id: 'l4', description: 'Multi-Agent LLM Orchestration Module Customization', quantity: 1, unitPrice: 1016949.15, taxRate: 18, amount: 1016949.15 }
    ],
    subtotal: 1016949.15,
    taxAmount: 183050.85,
    cgst: 91525.42,
    sgst: 91525.42,
    igst: 0,
    totalAmount: 1200000.00,
    amountPaid: 1200000.00,
  }
];

export const mockBankAccounts: BankAccount[] = [
  {
    id: 'bacc_1',
    bankName: 'HDFC Bank Corporate',
    accountNumber: '50200049180192',
    ifscCode: 'HDFC0000240',
    ledgerAccountId: 'acc_101',
    currentBalance: 2485000,
    unreconciledCount: 3,
  },
  {
    id: 'bacc_2',
    bankName: 'ICICI Commercial Bank',
    accountNumber: '000405019283',
    ifscCode: 'ICIC0000004',
    ledgerAccountId: 'acc_102',
    currentBalance: 840000,
    unreconciledCount: 1,
  }
];

export const mockBankTransactions: BankTransaction[] = [
  {
    id: 'tx_1',
    bankAccountId: 'bacc_1',
    date: '2026-07-22',
    description: 'NEFT CR-TCS INNOVATION LABS-PAYMENT FOR INV-075',
    referenceNo: 'N20392019482',
    amount: 1200000,
    type: 'Credit',
    isReconciled: true,
    matchedJournalId: 'jrn_55',
  },
  {
    id: 'tx_2',
    bankAccountId: 'bacc_1',
    date: '2026-07-24',
    description: 'ACH DR-AWS INDIA PVT LTD CLOUD CHARGES',
    referenceNo: 'AWS9812048102',
    amount: -145000,
    type: 'Debit',
    isReconciled: false,
    aiSuggestedMatch: {
      contactId: 'cnt_1',
      contactName: 'Amazon Web Services India Pvt Ltd',
      accountId: 'acc_502',
      accountName: 'AWS & Cloud Hosting Infrastructure',
      confidence: 96,
      reason: 'Exact amount match ($145,000) and vendor GSTIN matches open Bill BILL-AWS-90821',
    }
  },
  {
    id: 'tx_3',
    bankAccountId: 'bacc_1',
    date: '2026-07-20',
    description: 'IMPS CR-RELIANCE DIGITAL ADVANCE PART PAYMENT',
    referenceNo: 'R20391083921',
    amount: 300000,
    type: 'Credit',
    isReconciled: false,
    aiSuggestedMatch: {
      contactId: 'cnt_3',
      contactName: 'Reliance Digital Enterprise Solutions',
      accountId: 'acc_103',
      accountName: 'Accounts Receivable (Trade Debtors)',
      confidence: 91,
      reason: 'Matches partial payment for INV-2026-092 ($800,000 open total)',
    }
  },
  {
    id: 'tx_4',
    bankAccountId: 'bacc_1',
    date: '2026-07-18',
    description: 'CHQ WDR-WEWORK INDIA LEASE PAYMENT RENT',
    referenceNo: 'CHQ000192',
    amount: -120000,
    type: 'Debit',
    isReconciled: false,
    aiSuggestedMatch: {
      contactId: 'cnt_4',
      contactName: 'WeWork India Management',
      accountId: 'acc_503',
      accountName: 'Office Rent & Utilities',
      confidence: 98,
      reason: 'Monthly recurring office rent matching WeWork lease contract',
    }
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: 'item_1',
    sku: 'HW-GPU-H100',
    name: 'NVIDIA H100 80GB AI Node Unit',
    category: 'Hardware & Servers',
    quantityOnHand: 4,
    reorderPoint: 2,
    unitOfMeasure: 'Units',
    purchasePrice: 2200000,
    sellingPrice: 2800000,
    hsnCode: '84715000',
    valuationMethod: 'FIFO',
    totalValue: 8800000,
  },
  {
    id: 'item_2',
    sku: 'SW-LIC-AI-1Y',
    name: 'LedgerAI Agentic ERP Server License (1-Year)',
    category: 'Software Subscription',
    quantityOnHand: 50,
    reorderPoint: 10,
    unitOfMeasure: 'Licenses',
    purchasePrice: 150000,
    sellingPrice: 350000,
    hsnCode: '998313',
    valuationMethod: 'Weighted Average',
    totalValue: 7500000,
  }
];

export const mockGSTSummary: GSTReturnSummary = {
  period: 'June 2026',
  gstr1Status: 'Draft',
  gstr3bStatus: 'Pending',
  taxableValueSales: 6850000,
  outputCgst: 308250,
  outputSgst: 308250,
  outputIgst: 0,
  totalOutputTax: 616500,
  itcCgst: 110593,
  itcSgst: 110593,
  itcIgst: 0,
  totalItcAvailable: 221186,
  netGstPayable: 395314,
  mismatchCount: 2,
};

export const mockEmployees: Employee[] = [
  {
    id: 'emp_1',
    employeeCode: 'LMA-001',
    name: 'Aarav Sharma',
    designation: 'Principal Architect',
    department: 'Engineering',
    email: 'aarav.s@apextech.in',
    pan: 'ABCDE1234F',
    bankAccountNo: '5010029102910',
    basicSalary: 180000,
    hra: 72000,
    specialAllowance: 48000,
    pfDeduction: 21600,
    esiDeduction: 0,
    ptDeduction: 200,
    tdsDeduction: 28000,
    netPay: 250200,
  },
  {
    id: 'emp_2',
    employeeCode: 'LMA-002',
    name: 'Priya Sundaram',
    designation: 'Senior CA & Compliance Lead',
    department: 'Finance & Legal',
    email: 'priya.s@apextech.in',
    pan: 'PQRS12345K',
    bankAccountNo: '000401928301',
    basicSalary: 140000,
    hra: 56000,
    specialAllowance: 34000,
    pfDeduction: 16800,
    esiDeduction: 0,
    ptDeduction: 200,
    tdsDeduction: 18000,
    netPay: 195000,
  }
];

export const mockPayrollRun: PayrollRun = {
  id: 'pr_2026_06',
  monthYear: 'June 2026',
  totalEmployees: 18,
  totalGrossSalary: 3850000,
  totalDeductions: 648000,
  totalNetPayable: 3202000,
  status: 'Completed',
  processedDate: '2026-06-30',
};

export const mockAuditLogs: AuditLogItem[] = [
  {
    id: 'aud_101',
    timestamp: '2026-07-25 11:42:10',
    user: 'CA Priya Sundaram',
    role: 'CA Auditor',
    action: 'AI_RECONCILIATION_EXECUTE',
    module: 'Banking',
    details: 'Auto-reconciled $1,200,000 credit from TCS Innovation Labs against INV-2026-075 via Autonomous Agent.',
    ipAddress: '103.22.10.4',
    aiAssisted: true,
  },
  {
    id: 'aud_102',
    timestamp: '2026-07-25 10:15:00',
    user: 'Aarav Sharma',
    role: 'Admin',
    action: 'INVOICE_CREATE',
    module: 'Sales',
    details: 'Generated INV-2026-092 for Reliance Digital ($800,000) using Natural Language Command.',
    ipAddress: '103.22.10.2',
    aiAssisted: true,
  }
];

export const mockJournalEntries: JournalEntry[] = [
  {
    id: 'jrn_101',
    entryNumber: 'JV-2026-0041',
    date: '2026-07-22',
    narration: 'Payment received from TCS Innovation Labs for INV-2026-075 via HDFC Wire',
    reference: 'N20392019482',
    lines: [
      { accountId: 'acc_101', accountName: 'HDFC Bank - Corporate A/c (0192)', accountCode: '1010', debit: 1200000, credit: 0 },
      { accountId: 'acc_103', accountName: 'Accounts Receivable (Trade Debtors)', accountCode: '1100', debit: 0, credit: 1200000 }
    ],
    totalAmount: 1200000,
    status: 'Posted',
    source: 'Bank Rec',
    createdBy: 'Banking Agent',
    createdAt: '2026-07-22 14:10:00',
  },
  {
    id: 'jrn_102',
    entryNumber: 'JV-2026-0042',
    date: '2026-06-30',
    narration: 'June 2026 Monthly Staff Salary Processing with PF & TDS withholdings',
    reference: 'PAYROLL-2026-06',
    lines: [
      { accountId: 'acc_501', accountName: 'Salaries, Wages & Bonuses', accountCode: '5010', debit: 3850000, credit: 0 },
      { accountId: 'acc_203', accountName: 'TDS Payable (Sec 194C / 194J)', accountCode: '2200', debit: 0, credit: 360000 },
      { accountId: 'acc_204', accountName: 'Provident Fund (PF) & ESI Payable', accountCode: '2300', debit: 0, credit: 288000 },
      { accountId: 'acc_101', accountName: 'HDFC Bank - Corporate A/c (0192)', accountCode: '1010', debit: 0, credit: 3202000 }
    ],
    totalAmount: 3850000,
    status: 'Posted',
    source: 'Payroll Auto',
    createdBy: 'Payroll Agent',
    createdAt: '2026-06-30 18:00:00',
  }
];
