import { create } from 'zustand';
import { Transaction } from '@/types';

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
    // Start with mock transactions
    set({
      transactions: [
        { id: '1', date: new Date().toISOString(), description: 'Coffee', amount: -4.50, category: 'Food' },
        { id: '2', date: new Date().toISOString(), description: 'Lunch', amount: -12.30, category: 'Food' },
      ],
      initialized: true
    });
  },
  addTransaction: async (tx) => {
    const newTx = { ...tx, id: Date.now().toString() };
    const txs = [...get().transactions, newTx];
    set({ transactions: txs });
    console.log('Transaction added:', newTx);
  },
}));
