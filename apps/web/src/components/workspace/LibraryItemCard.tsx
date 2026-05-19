'use client';

import { useDraggable } from '@dnd-kit/core';
import type { FurnitureItem } from '@workspace-pro/shared';

interface LibraryItemCardProps {
  item: FurnitureItem;
}

export default function LibraryItemCard({ item }: LibraryItemCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `library-${item.id}`,
      data: { type: 'library', item },
    });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        zIndex: 50,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex cursor-grab flex-col items-center gap-1.5 rounded-xl border border-brand-800/70 bg-brand-900/40 p-3 text-center transition-all hover:border-brand-600 hover:bg-brand-900/60 active:cursor-grabbing ${
        isDragging ? 'opacity-50 shadow-lg ring-2 ring-blue-500/50' : ''
      }`}
    >
      {/* Image */}
      <div className="flex h-16 w-full items-center justify-center rounded-lg bg-brand-950/60">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-12 w-auto object-contain opacity-80"
          draggable={false}
        />
      </div>

      {/* Name */}
      <span className="text-xs font-medium text-white leading-tight">
        {item.name}
      </span>

      {/* Price */}
      <span className="text-xs text-brand-400">${item.price}/mo</span>
    </div>
  );
}
