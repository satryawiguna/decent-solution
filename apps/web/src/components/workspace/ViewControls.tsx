'use client';

import { Ruler, Box, LayoutGrid } from 'lucide-react';
import { useWorkspaceStore } from '@/application/store';
import type { ViewMode } from '@workspace-pro/shared';

const modes: { id: ViewMode; label: string; icon: typeof Ruler }[] = [
  { id: 'measure', label: 'Measure', icon: Ruler },
  { id: '3d', label: '3D View', icon: Box },
  { id: 'floorplan', label: 'Floorplan', icon: LayoutGrid },
];

export default function ViewControls() {
  const viewMode = useWorkspaceStore((s) => s.viewMode);
  const setViewMode = useWorkspaceStore((s) => s.setViewMode);

  return (
    <div className="absolute bottom-4 left-4 flex gap-1 rounded-xl border border-brand-800/80 bg-brand-950/90 p-1 backdrop-blur-sm">
      {modes.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setViewMode(id)}
          disabled={id === 'measure' || id === '3d'}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
            viewMode === id
              ? 'bg-blue-600 text-white'
              : id === 'measure' || id === '3d'
                ? 'cursor-not-allowed text-brand-600'
                : 'text-brand-300 hover:text-white'
          }`}
          title={
            id === 'measure'
              ? 'Coming soon'
              : id === '3d'
                ? 'Coming soon'
                : label
          }
        >
          <Icon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
