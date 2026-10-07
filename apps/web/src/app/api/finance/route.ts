import { NextResponse } from 'next/server';

const MOCK_ACCOUNTS = [
  {
    id: 'fa-1',
    institutionName: "Touch 'n Go eWallet",
    accountCategory: 'ewallet',
    accountNickname: 'Everyday Spending eWallet',
    accountNumberMasked: '•••• 8912',
    currentBalance: 520.40,
    currency: 'MYR',
    lastSyncedAt: '2026-10-05T18:30:00Z',
    transactionCount: 28
  },
  {
    id: 'fa-2',
    institutionName: 'Maybank',
    accountCategory: 'bank_savings',
    accountNickname: 'Maybank Primary Current/Savings',
    accountNumberMasked: '•••• 4120',
    currentBalance: 7850.25,
    currency: 'MYR',
    lastSyncedAt: '2026-10-05T19:00:00Z',
    transactionCount: 42
  },
  {
    id: 'fa-3',
    institutionName: 'myASNB',
    accountCategory: 'investment_unit_trust',
    accountNickname: 'ASM 3 Education Fund',
    accountNumberMasked: '•••• 7031',
    currentBalance: 15400.00,
    currency: 'MYR',
    lastSyncedAt: '2026-10-01T09:00:00Z',
    transactionCount: 8
  },
  {
    id: 'fa-4',
    institutionName: 'Moomoo Securities',
    accountCategory: 'investment_stocks',
    accountNickname: 'Global Tech ETF Brokerage',
    accountNumberMasked: '•••• 1984',
    currentBalance: 12350.80,
    currency: 'MYR',
    lastSyncedAt: '2026-10-04T22:00:00Z',
    transactionCount: 14
  }
];

const MOCK_TRANSACTIONS = [
  { id: 'tx-1', accountId: 'fa-1', transactionDate: '2026-10-05', description: 'Zus Coffee - Americano', category: 'Food & Dining', amount: 10.90, transactionType: 'expense', merchant: 'Zus Coffee' },
  { id: 'tx-2', accountId: 'fa-1', transactionDate: '2026-10-04', description: 'Touch n Go RFID Toll (LDP)', category: 'Transport', amount: 4.50, transactionType: 'expense', merchant: 'PLUS Highway' },
  { id: 'tx-3', accountId: 'fa-2', transactionDate: '2026-10-03', description: 'Monthly Research Assistant Stipend', category: 'Salary', amount: 1500.00, transactionType: 'income', merchant: 'University Payroll' },
  { id: 'tx-4', accountId: 'fa-2', transactionDate: '2026-10-02', description: 'Jaya Grocer Healthy Mealprep', category: 'Groceries', amount: 112.40, transactionType: 'expense', merchant: 'Jaya Grocer' },
  { id: 'tx-5', accountId: 'fa-3', transactionDate: '2026-09-30', description: 'ASNB Reinvested Dividend', category: 'Dividends', amount: 285.00, transactionType: 'income', merchant: 'Amanah Saham Nasional' }
];

export async function GET() {
  const totalNetWorth = MOCK_ACCOUNTS.reduce((sum, acc) => sum + acc.currentBalance, 0);

  return NextResponse.json({
    status: 'success',
    data: {
      totalNetWorth,
      currency: 'MYR',
      accounts: MOCK_ACCOUNTS,
      transactions: MOCK_TRANSACTIONS
    }
  });
}
