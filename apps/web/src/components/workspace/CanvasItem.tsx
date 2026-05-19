'use client';

import { useDraggable } from '@dnd-kit/core';
import { X } from 'lucide-react';
import type { PlacedItem } from '@workspace-pro/shared';

interface CanvasItemProps {
  item: PlacedItem;
  onRemove: (instanceId: string) => void;
}

const GRID_SIZE = 20;

export default function CanvasItem({ item, onRemove }: CanvasItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `placed-${item.instanceId}`,
      data: { type: 'placed', item },
    });

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${item.x}px`,
    top: `${item.y}px`,
    width: `${item.dimensions.width * GRID_SIZE}px`,
    height: `${item.dimensions.height * GRID_SIZE}px`,
    ...(transform
      ? {
          transform: `translate(${transform.x}px, ${transform.y}px)`,
          zIndex: 50,
        }
      : {}),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`group flex cursor-grab flex-col items-center justify-center rounded-lg border border-brand-700/80 bg-brand-900/80 backdrop-blur-sm transition-shadow active:cursor-grabbing ${
        isDragging
          ? 'opacity-70 shadow-xl ring-2 ring-blue-500/50'
          : 'hover:border-brand-500 hover:shadow-lg'
      }`}
    >
      {/* Remove button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.instanceId);
        }}
        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity hover:bg-red-400 group-hover:opacity-100"
        aria-label={`Remove ${item.name}`}
      >
        <X className="h-3 w-3" />
      </button>

      {/* Image */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-8 w-8 object-contain opacity-80"
        draggable={false}
      />

      {/* Name */}
      <span className="mt-0.5 text-[10px] font-medium text-white leading-tight truncate max-w-full px-1">
        {item.name}
      </span>

      {/* Price */}
      <span className="text-[10px] text-brand-400">${item.price}</span>
    </div>
  );
}
