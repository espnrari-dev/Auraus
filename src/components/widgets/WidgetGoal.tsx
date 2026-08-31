import { useGoalStore } from '@/stores';
import { useState } from 'react';

export default function WidgetGoal() {
  const goals = useGoalStore(state => state.goals);
  const updateGoal = useGoalStore(state => state.updateGoal);
  const addGoal = useGoalStore(state => state.addGoal);
  const goal = goals[0];
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');

  if (!goal) {
    return (
      <div>
        <div className="text-gray-400 text-sm">No goals set.</div>
        <div className="flex mt-2 gap-1">
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Goal name"
            className="flex-1 px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded border-none"
          />
          <input
            value={newTarget}
            onChange={e => setNewTarget(e.target.value)}
            placeholder="Target"
            className="w-16 px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded border-none"
          />
          <button
            onClick={() => {
              if (newTitle && newTarget) {
                addGoal({ title: newTitle, target: parseFloat(newTarget), current: 0, unit: 'units' });
                setNewTitle(''); setNewTarget('');
              }
            }}
            className="px-3 py-1 bg-primary text-white rounded text-sm"
          >
            Set
          </button>
        </div>
      </div>
    );
  }

  const progress = Math.min(100, (goal.current / goal.target) * 100);

  return (
    <div>
      <h4 className="font-medium">{goal.title}</h4>
      <div className="flex items-center gap-2 mt-1">
        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-sm font-mono">{Math.round(progress)}%</span>
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{goal.current} / {goal.target}</span>
        {goal.unit && <span>{goal.unit}</span>}
      </div>
      <div className="flex gap-1 mt-2">
        <button onClick={() => updateGoal(goal.id, goal.current + 1)} className="px-2 py-0.5 bg-primary/20 rounded text-xs">+1</button>
        <button onClick={() => updateGoal(goal.id, goal.current - 1)} className="px-2 py-0.5 bg-primary/20 rounded text-xs">-1</button>
      </div>
    </div>
  );
}
