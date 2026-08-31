import { create } from 'zustand';
import { HabitEntry } from '@/types';
import { loadHabits, saveHabits } from '@/db';

interface HabitState {
  entries: HabitEntry[];
  initialized: boolean;
  load: () => Promise<void>;
  toggleHabit: (habitId: string, date: string) => Promise<void>;
}

export const useHabitStore = create<HabitState>((set, get) => ({
  entries: [],
  initialized: false,
  load: async () => {
    const entries = await loadHabits();
    set({ entries, initialized: true });
  },
  toggleHabit: async (habitId, date) => {
    const existing = get().entries.find(e => e.habitId === habitId && e.date === date);
    let newEntries;
    if (existing) {
      newEntries = get().entries.map(e => e === existing ? { ...e, completed: !e.completed } : e);
    } else {
      newEntries = [...get().entries, { habitId, date, completed: true }];
    }
    await saveHabits(newEntries);
    set({ entries: newEntries });
  },
}));
