import { useEffect } from 'react';
import { useUserStore, useHealthStore, useFinanceStore, useHabitStore, useJournalStore, useGoalStore, useWidgetStore } from './stores';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Onboarding from './components/Onboarding';
function App() {
  const { user, initialized, load } = useUserStore();
  useEffect(() => {
    load();
    Promise.all([
      useHealthStore.getState().load(),
      useFinanceStore.getState().load(),
      useHabitStore.getState().load(),
      useJournalStore.getState().load(),
      useGoalStore.getState().load(),
      useWidgetStore.getState().load(),
    ]);
  }, []);
  if (!initialized) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user?.hasCompletedOnboarding) return <Onboarding />;
  return (
    <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <Sidebar /><main className="flex-1"><Dashboard /></main>
    </div>
  );
}
export default App;
