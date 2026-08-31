import { useState } from 'react';
import { useJournalStore } from '@/stores';
export default function WidgetJournal({ config }: { config: WidgetConfig }) {
  const entries = useJournalStore(state => state.entries);
  const addEntry = useJournalStore(state => state.addEntry);
  const [text, setText] = useState('');
  const [mood, setMood] = useState<'happy' | 'neutral' | 'sad' | 'angry' | 'focused'>('neutral');
  const handleSubmit = () => { if (!text.trim()) return; addEntry({ id: Date.now().toString(), date: new Date().toISOString(), text, mood, encrypted: false }); setText(''); };
  const latest = entries[entries.length - 1];
  return (
    <div>
      {latest && (
        <div className="mb-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
          <div className="flex items-center gap-2"><span>{latest.mood}</span><span className="text-gray-400 text-xs">{new Date(latest.date).toLocaleDateString()}</span></div>
          <p className="truncate">{latest.text}</p>
        </div>
      )}
      <div className="flex gap-2">
        <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Quick note..." className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg border-none focus:ring-2 focus:ring-primary" />
        <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">Add</button>
      </div>
    </div>
  );
}
