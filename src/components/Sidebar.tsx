import { useState } from 'react';
import { useUserStore } from '@/stores';
import { useHealthStore, useFinanceStore, useHabitStore, useJournalStore, useGoalStore, useWidgetStore } from '@/stores';

export default function Sidebar() {
  const { user, setTheme } = useUserStore();
  const toggleTheme = () => setTheme(user?.theme === 'dark' ? 'light' : 'dark');
  const [showSettings, setShowSettings] = useState(false);

  const exportData = async () => {
    const data = {
      health: useHealthStore.getState().entries,
      finance: useFinanceStore.getState().transactions,
      habits: useHabitStore.getState().entries,
      journal: useJournalStore.getState().entries,
      goals: useGoalStore.getState().goals,
      widgets: useWidgetStore.getState().widgets,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aura_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <aside className="w-16 md:w-20 bg-white/50 dark:bg-dark-card/80 backdrop-blur-xs border-r border-gray-200 dark:border-gray-700 p-3 flex flex-col items-center gap-4 h-screen sticky top-0">
        <div className="text-2xl font-bold text-primary cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>A</div>
        <button onClick={toggleTheme} className="text-xl hover:scale-110 transition">{user?.theme === 'dark' ? '☀️' : '🌙'}</button>
        <button onClick={exportData} className="text-xl hover:scale-110 transition" title="Backup">💾</button>
        <button onClick={() => setShowSettings(true)} className="text-xl hover:scale-110 transition" title="Settings">⚙️</button>
      </aside>

      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowSettings(false)}>
          <div className="bg-white dark:bg-dark-card rounded-xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Theme: {user?.theme || 'light'}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Data is stored locally.</p>
            <button onClick={() => setShowSettings(false)} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">Close</button>
          </div>
        </div>
      )}
    </>
  );
}
