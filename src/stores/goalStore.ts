import { create } from 'zustand';
import { Goal } from '@/types';
import { loadGoals, saveGoals } from '@/db';

interface GoalState {
  goals: Goal[];
  initialized: boolean;
  load: () => Promise<void>;
  updateGoal: (id: string, current: number) => Promise<void>;
  addGoal: (goal: Omit<Goal, 'id'>) => Promise<void>;
}

export const useGoalStore = create<GoalState>((set, get) => ({
  goals: [],
  initialized: false,
  load: async () => {
    let goals = await loadGoals();
    if (goals.length === 0) {
      goals = [ { id: 'g1', title: 'Read daily', target: 20, current: 5, unit: 'pages' } ];
      await saveGoals(goals);
    }
    set({ goals, initialized: true });
  },
  updateGoal: async (id, current) => {
    const newGoals = get().goals.map(g => g.id === id ? { ...g, current: Math.min(g.target, Math.max(0, current)) } : g);
    await saveGoals(newGoals);
    set({ goals: newGoals });
  },
  addGoal: async (goal) => {
    const newGoal = { ...goal, id: Date.now().toString() };
    const newGoals = [...get().goals, newGoal];
    await saveGoals(newGoals);
    set({ goals: newGoals });
  },
}));
