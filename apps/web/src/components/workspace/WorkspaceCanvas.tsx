'use client';

import { useDroppable } from '@dnd-kit/core';

interface WorkspaceCanvasProps {
  children: React.ReactNode;
  isEmpty: boolean;
}

export default function WorkspaceCanvas({ children, isEmpty }: WorkspaceCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'workspace-canvas',
  });

  return (
    <main
      ref={setNodeRef}
      className={`relative flex-1 overflow-auto ${
        isOver ? 'bg-brand-900/20 ring-2 ring-inset ring-blue-500/30' : ''
      }`}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Empty state */}
      {isEmpty && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-brand-400">
            Workspace Canvas
          </h2>
          <p className="mt-2 text-sm text-brand-500">
            Drag and drop items from the library to start planning
          </p>
        </div>
      )}

      {/* Placed items */}
      <div className="relative h-[2000px] w-[2000px]">{children}</div>
    </main>
  );
}
