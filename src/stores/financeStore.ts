import { create } from 'zustand';
import { Transaction } from '@/types';
import { loadTransactions, saveTransactions } from '@/db';

interface FinanceState {
  transactions: Transaction[];
  initialized: boolean;
  load: () => Promise<void>;
  addTransaction: (tx: Omit<Transaction, 'id'>) => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  transactions: [],
  initialized: false,
  load: async () => {
    let txs = await loadTransactions();
    if (txs.length === 0) {
      txs = [
        { id: '1', date: new Date().toISOString(), description: 'Coffee', amount: -4.50, category: 'Food' },
        { id: '2', date: new Date().toISOString(), description: 'Lunch', amount: -12.30, category: 'Food' },
      ];
      await saveTransactions(txs);
    }
    set({ transactions: txs, initialized: true });
  },
  addTransaction: async (tx) => {
    const newTx = { ...tx, id: Date.now().toString() };
    const txs = [...get().transactions, newTx];
    await saveTransactions(txs);
    set({ transactions: txs });
  },
}));
