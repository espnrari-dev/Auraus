import { create } from 'zustand';
import { WidgetConfig } from '@/types';
import { loadWidgets, saveWidgets } from '@/db';
const defaultWidgets: WidgetConfig[] = [
  { id: 'w1', type: 'health', title: 'Steps', x: 0, y: 0, w: 3, h: 4 },
  { id: 'w2', type: 'finance', title: 'Spending', x: 3, y: 0, w: 3, h: 4 },
  { id: 'w3', type: 'habit', title: 'Habit', x: 6, y: 0, w: 3, h: 4 },
  { id: 'w4', type: 'journal', title: 'Journal', x: 9, y: 0, w: 3, h: 4 },
  { id: 'w5', type: 'goal', title: 'Goal', x: 0, y: 4, w: 6, h: 3 },
];
interface WidgetState { widgets: WidgetConfig[]; initialized: boolean; load: () => Promise<void>; updateLayout: (widgets: WidgetConfig[]) => Promise<void>; removeWidget: (id: string) => Promise<void>; }
export const useWidgetStore = create<WidgetState>((set, get) => ({
  widgets: [], initialized: false,
  load: async () => { let widgets = await loadWidgets(); if (!widgets || widgets.length === 0) { widgets = defaultWidgets; await saveWidgets(widgets); } set({ widgets, initialized: true }); },
  updateLayout: async (widgets) => { await saveWidgets(widgets); set({ widgets }); },
  removeWidget: async (id) => { const newWidgets = get().widgets.filter(w => w.id !== id); await saveWidgets(newWidgets); set({ widgets: newWidgets }); },
}));
