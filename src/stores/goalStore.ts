import { create } from 'zustand';
import { Goal } from '@/types';

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
    set({
      goals: [
        { id: 'g1', title: 'Read daily', target: 20, current: 5, unit: 'pages' },
      ],
      initialized: true
    });
  },
  updateGoal: async (id, current) => {
    const newGoals = get().goals.map(g => g.id === id ? { ...g, current: Math.min(g.target, Math.max(0, current)) } : g);
    set({ goals: newGoals });
    console.log('Goal updated:', newGoals);
  },
  addGoal: async (goal) => {
    const newGoal = { ...goal, id: Date.now().toString() };
    const newGoals = [...get().goals, newGoal];
    set({ goals: newGoals });
    console.log('Goal added:', newGoal);
  },
}));
