import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useNoteStore = create(
  persist(
    (set) => ({
      notes: [],
      addNote: (text) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              id: Date.now(),
              text,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
      clearNotes: () => set({ notes: [] }),
    }),
    {
      name: 'notes-storage',
    }
  )
);

export default useNoteStore;
