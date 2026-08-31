import { useState } from 'react';
import { useFinanceStore } from '@/stores';

export default function WidgetFinance() {
  const transactions = useFinanceStore(state => state.transactions);
  const addTransaction = useFinanceStore(state => state.addTransaction);
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  const recent = transactions.slice(-3).reverse();
  const [amount, setAmount] = useState('');

  const handleAdd = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val === 0) return;
    addTransaction({ date: new Date().toISOString(), description: 'Manual entry', amount: -val, category: 'Other' });
    setAmount('');
  };

  return (
    <div>
      <div className="text-2xl font-bold">${total.toFixed(2)}</div>
      <div className="text-xs text-gray-400">total spending</div>
      <div className="flex mt-2 gap-1">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="0.00"
          className="flex-1 px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded border-none focus:ring-1 focus:ring-primary"
        />
        <button onClick={handleAdd} className="px-3 py-1 bg-primary text-white rounded text-sm">Add</button>
      </div>
      <ul className="mt-2 space-y-1 text-sm">
        {recent.map(t => (
          <li key={t.id} className="flex justify-between border-b border-gray-100 dark:border-gray-700">
            <span className="truncate">{t.description}</span>
            <span className="font-mono">${t.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
