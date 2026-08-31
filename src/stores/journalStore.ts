import { create } from 'zustand';
import { JournalEntry } from '@/types';
import { loadJournal, saveJournal } from '@/db';

interface JournalState {
  entries: JournalEntry[];
  initialized: boolean;
  load: () => Promise<void>;
  addEntry: (entry: Omit<JournalEntry, 'id'>) => Promise<void>;
}

export const useJournalStore = create<JournalState>((set, get) => ({
  entries: [],
  initialized: false,
  load: async () => {
    const entries = await loadJournal();
    set({ entries, initialized: true });
  },
  addEntry: async (entry) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    const newEntries = [...get().entries, newEntry];
    await saveJournal(newEntries);
    set({ entries: newEntries });
  },
}));
