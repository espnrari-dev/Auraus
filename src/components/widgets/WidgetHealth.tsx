import { useHealthStore } from '@/stores';
import { Sparklines, SparklinesLine } from 'react-sparklines';

export default function WidgetHealth() {
  const entries = useHealthStore(state => state.getLastDays(7));
  const addSteps = useHealthStore(state => state.addSteps);
  const steps = entries.map(e => e.steps);
  const latest = steps.length > 0 ? steps[steps.length-1] : 0;

  return (
    <div className="flex flex-col h-full">
      <div className="text-3xl font-bold">{latest.toLocaleString()}</div>
      <div className="text-xs text-gray-400">steps today</div>
      <button 
        onClick={() => addSteps(100)}
        className="mt-1 text-xs bg-primary/20 hover:bg-primary/30 rounded-full px-3 py-1 transition"
      >
        +100 steps
      </button>
      <div className="mt-2 flex-1">
        <Sparklines data={steps} height={60}>
          <SparklinesLine color="#0d9488" style={{ strokeWidth: 2 }} />
        </Sparklines>
      </div>
    </div>
  );
}
