import { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useWidgetStore, useHealthStore, useFinanceStore, useHabitStore, useJournalStore, useGoalStore } from '@/stores';
import Widget from './widgets/Widget';
import WidgetHealth from './widgets/WidgetHealth';
import WidgetFinance from './widgets/WidgetFinance';
import WidgetHabit from './widgets/WidgetHabit';
import WidgetJournal from './widgets/WidgetJournal';
import WidgetGoal from './widgets/WidgetGoal';
const widgetMap: Record<string, any> = { health: WidgetHealth, finance: WidgetFinance, habit: WidgetHabit, journal: WidgetJournal, goal: WidgetGoal };
export default function Dashboard() {
  const { widgets, updateLayout } = useWidgetStore();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    Promise.all([
      useHealthStore.getState().load(),
      useFinanceStore.getState().load(),
      useHabitStore.getState().load(),
      useJournalStore.getState().load(),
      useGoalStore.getState().load(),
    ]).then(() => setIsReady(true));
  }, []);
  if (!isReady) return <div className="flex items-center justify-center h-screen"><div className="text-2xl font-light animate-pulse">Loading your dashboard...</div></div>;
  const layout = widgets.map(w => ({ i: w.id, x: w.x, y: w.y, w: w.w, h: w.h }));
  const onLayoutChange = (newLayout: any[]) => {
    const updated = widgets.map(w => {
      const found = newLayout.find(l => l.i === w.id);
      if (found) return { ...w, x: found.x, y: found.y, w: found.w, h: found.h };
      return w;
    });
    updateLayout(updated);
  };
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200} onLayoutChange={onLayoutChange} draggableHandle=".widget-drag">
        {widgets.map(w => {
          const Component = widgetMap[w.type];
          return (<div key={w.id}><Widget config={w}><Component config={w} /></Widget></div>);
        })}
      </GridLayout>
    </div>
  );
}
