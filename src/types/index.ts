export interface User { passphrase?: string; theme: 'light' | 'dark'; hasCompletedOnboarding: boolean; selectedSources: string[]; }
export interface WidgetConfig { id: string; type: 'health' | 'finance' | 'habit' | 'journal' | 'goal'; title: string; x: number; y: number; w: number; h: number; config?: Record<string, any>; }
export interface HealthEntry { date: string; steps: number; heartRate?: number; sleepMinutes?: number; }
export interface Transaction { id: string; date: string; description: string; amount: number; category: string; }
export interface HabitEntry { date: string; habitId: string; completed: boolean; }
export interface JournalEntry { id: string; date: string; text: string; mood: 'happy' | 'neutral' | 'sad' | 'angry' | 'focused'; encrypted: boolean; }
export interface Goal { id: string; title: string; target: number; current: number; deadline?: string; unit?: string; }
