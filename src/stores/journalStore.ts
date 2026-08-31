import { create } from 'zustand';
import { JournalEntry } from '@/types';

interface JournalState {
  entries: JournalEntry[];
  initialized: boolean;
  load: () => Promise<void>;
  addEntry: (entry: JournalEntry) => Promise<void>;
}

export const useJournalStore = create<JournalState>((set, get) => ({
  entries: [],
  initialized: false,
  load: async () => {
    set({ initialized: true });
  },
  addEntry: async (entry) => {
    const newEntries = [...get().entries, entry];
    set({ entries: newEntries });
    console.log('Added journal entry:', newEntries);
  },
}));
