export type FinancialCategory =
  | 'ewallet'
  | 'bank_savings'
  | 'investment_unit_trust'
  | 'investment_stocks'
  | 'credit_debt';

export interface FinancialAccountItem {
  id: string;
  userId: string;
  institutionName: string;
  accountCategory: FinancialCategory;
  accountNickname: string;
  accountNumberMasked?: string;
  currentBalance: number;
  currency: string;
  lastSyncedAt: string;
  transactionCount?: number;
}

export interface FinancialTransactionItem {
  id: string;
  accountId: string;
  userId: string;
  transactionDate: string;
  description: string;
  category: string;
  amount: number;
  transactionType: 'expense' | 'income' | 'transfer';
  merchant?: string;
  referenceId?: string;
}

export interface StatementExtractionResult {
  institution_name: string;
  account_category: FinancialCategory;
  account_number_masked?: string;
  statement_period?: string;
  opening_balance?: number;
  closing_balance?: number;
  currency: string;
  transactions: Array<{
    transaction_date: string;
    description: string;
    category: string;
    amount: number;
    transaction_type: 'expense' | 'income';
    merchant?: string;
    reference_id?: string;
  }>;
}
