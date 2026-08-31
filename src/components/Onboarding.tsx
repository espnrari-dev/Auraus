import { useState } from 'react';
import { useUserStore } from '@/stores';
const SOURCES = [
  { id: 'health', label: 'Health (steps, sleep)', icon: '❤️' },
  { id: 'finance', label: 'Finance (spending)', icon: '💰' },
  { id: 'habits', label: 'Habits (daily check-in)', icon: '✅' },
  { id: 'journal', label: 'Journal (notes, mood)', icon: '📝' },
  { id: 'goals', label: 'Goals (track progress)', icon: '🎯' },
];
export default function Onboarding() {
  const { completeOnboarding } = useUserStore();
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  const handleStart = () => { if (selected.length === 0) return; completeOnboarding(selected); };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-amber-50 dark:from-dark-bg dark:to-gray-900">
      <div className="max-w-md w-full bg-white/80 dark:bg-dark-card/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-light text-center mb-2">AURA</h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Your personal dashboard</p>
        <p className="text-sm font-medium mb-4">Select what you want to track:</p>
        <div className="space-y-2">
          {SOURCES.map(s => (
            <button key={s.id} onClick={() => toggle(s.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${selected.includes(s.id) ? 'border-primary bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
              <span className="text-xl">{s.icon}</span><span className="text-sm">{s.label}</span>{selected.includes(s.id) && <span className="ml-auto text-primary">✓</span>}
            </button>
          ))}
        </div>
        <button onClick={handleStart} disabled={selected.length === 0} className={`w-full mt-6 py-3 rounded-xl font-medium transition ${selected.length > 0 ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Start Dashboard</button>
      </div>
    </div>
  );
}
