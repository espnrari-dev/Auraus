import { useState } from 'react';
import { useFinanceStore } from '@/stores';

export default function CSVImport() {
  const [file, setFile] = useState<File | null>(null);
  const addTransaction = useFinanceStore(state => state.addTransaction);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    const text = await file.text();
    const rows = text.split('\n').filter(row => row.trim());
    // Simple CSV parser – assumes columns: date, description, amount
    for (const row of rows) {
      const cols = row.split(',');
      if (cols.length >= 3) {
        const date = cols[0].trim();
        const description = cols[1].trim();
        const amount = parseFloat(cols[2].trim());
        if (!isNaN(amount) && date) {
          addTransaction({
            date: new Date(date).toISOString(),
            description,
            amount: -Math.abs(amount), // assume spending
            category: 'Imported',
          });
        }
      }
    }
    setFile(null);
    alert('Import complete!');
  };

  return (
    <div className="p-4 border rounded-lg bg-white/50 dark:bg-dark-card/50">
      <h3 className="font-semibold mb-2">Import CSV</h3>
      <input type="file" accept=".csv" onChange={handleFileChange} className="block w-full text-sm" />
      {file && (
        <button onClick={handleImport} className="mt-2 px-4 py-2 bg-primary text-white rounded-lg text-sm">
          Import {file.name}
        </button>
      )}
    </div>
  );
}
