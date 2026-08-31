import { create } from 'zustand';
import { User } from '@/types';
import { loadUser, saveUser } from '@/db';
interface UserState { user: User | null; initialized: boolean; load: () => Promise<void>; setTheme: (theme: 'light' | 'dark') => Promise<void>; setPassphrase: (passphrase: string) => Promise<void>; completeOnboarding: (sources: string[]) => Promise<void>; }
export const useUserStore = create<UserState>((set, get) => ({
  user: null, initialized: false,
  load: async () => { const user = await loadUser(); set({ user, initialized: true }); },
  setTheme: async (theme) => { const current = get().user || { theme: 'light', hasCompletedOnboarding: false, selectedSources: [] }; const updated = { ...current, theme }; await saveUser(updated); set({ user: updated }); document.documentElement.classList.toggle('dark', theme === 'dark'); },
  setPassphrase: async (passphrase) => { const current = get().user || { theme: 'light', hasCompletedOnboarding: false, selectedSources: [] }; const updated = { ...current, passphrase }; await saveUser(updated); set({ user: updated }); },
  completeOnboarding: async (sources) => { const current = get().user || { theme: 'light', hasCompletedOnboarding: false, selectedSources: [] }; const updated = { ...current, hasCompletedOnboarding: true, selectedSources: sources }; await saveUser(updated); set({ user: updated }); },
}));
