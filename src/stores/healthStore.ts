import { create } from 'zustand';
import { HealthEntry } from '@/types';
import { loadHealth, saveHealth } from '@/db';

interface HealthState {
  entries: HealthEntry[];
  initialized: boolean;
  load: () => Promise<void>;
  addSteps: (steps: number) => Promise<void>;
  getLastDays: (days: number) => HealthEntry[];
}

export const useHealthStore = create<HealthState>((set, get) => ({
  entries: [],
  initialized: false,
  load: async () => {
    let entries = await loadHealth();
    if (entries.length === 0) {
      // Seed with mock data
      const now = new Date();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        entries.push({ date: d.toISOString().slice(0,10), steps: Math.floor(Math.random() * 5000) + 2000 });
      }
      await saveHealth(entries);
    }
    set({ entries, initialized: true });
  },
  addSteps: async (steps) => {
    const today = new Date().toISOString().slice(0,10);
    const existing = get().entries.find(e => e.date === today);
    let newEntries;
    if (existing) {
      newEntries = get().entries.map(e => e === existing ? { ...e, steps: e.steps + steps } : e);
    } else {
      newEntries = [...get().entries, { date: today, steps }];
    }
    await saveHealth(newEntries);
    set({ entries: newEntries });
  },
  getLastDays: (days) => {
    return get().entries.slice(-days);
  },
}));
