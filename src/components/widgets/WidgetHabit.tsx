import { useState } from 'react';
import { useHabitStore } from '@/stores';
export default function WidgetHabit({ config }: { config: WidgetConfig }) {
  const [habitId] = useState('default');
  const entries = useHabitStore(state => state.entries);
  const today = new Date().toISOString().slice(0, 10);
  const done = entries.some(e => e.habitId === habitId && e.date === today);
  const toggle = () => useHabitStore.getState().toggleHabit(habitId, today);
  return (
    <div>
      <button onClick={toggle} className={`w-full py-3 rounded-xl text-lg font-medium transition-colors ${done ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{done ? '✅ Done' : '⬜ Tap to check in'}</button>
      <div className="mt-2 text-xs text-gray-400 text-center">tap daily to maintain your streak</div>
    </div>
  );
}
