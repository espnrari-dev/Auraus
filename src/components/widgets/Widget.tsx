import { ReactNode, useState } from 'react';
import { WidgetConfig } from '@/types';
import { useWidgetStore } from '@/stores';
export default function Widget({ config, children }: { config: WidgetConfig; children: ReactNode }) {
  const { removeWidget } = useWidgetStore();
  return (
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-start mb-2 widget-drag">
        <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">{config.title}</h3>
        <div className="flex gap-1">
          <button onClick={() => removeWidget(config.id)} className="text-gray-400 hover:text-red-500 text-sm">✕</button>
        </div>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
