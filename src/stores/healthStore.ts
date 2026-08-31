import { create } from 'zustand';
import { HealthEntry } from '@/types';

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
    // Start with some mock data
    const mock: HealthEntry[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      mock.push({ date: d.toISOString().slice(0,10), steps: Math.floor(Math.random() * 5000) + 2000 });
    }
    set({ entries: mock, initialized: true });
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
    set({ entries: newEntries });
    console.log('Steps updated:', newEntries);
  },
  getLastDays: (days) => {
    const entries = get().entries;
    return entries.slice(-days);
  },
}));
