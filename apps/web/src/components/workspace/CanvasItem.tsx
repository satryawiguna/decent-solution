"use client";

import { useDraggable } from "@dnd-kit/core";
import { X } from "lucide-react";
import type { PlacedItem } from "@workspace-pro/shared";

interface CanvasItemProps {
  item: PlacedItem;
  onRemove: (instanceId: string) => void;
}

const GRID_SIZE = 60;
const DISPLAY_COLS = 2;
const DISPLAY_ROWS = 2;

export default function CanvasItem({ item, onRemove }: CanvasItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `placed-${item.instanceId}`,
      data: { type: "placed", item },
    });

  const style: React.CSSProperties = {
    position: "absolute",
    left: `${item.x}px`,
    top: `${item.y}px`,
    width: `${DISPLAY_COLS * GRID_SIZE}px`,
    height: `${DISPLAY_ROWS * GRID_SIZE}px`,
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
      className={`group relative flex cursor-grab flex-col overflow-hidden rounded-[4px] border border-[#dfdfdf] bg-[#fcf9f8] shadow-sm transition-shadow active:cursor-grabbing ${
        isDragging ? "opacity-0" : "hover:shadow-md hover:border-[#00415e]/40"
      }`}
    >
      {/* Remove button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.instanceId);
        }}
        className="absolute right-1 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#1c1b1b]/70 text-white opacity-0 transition-opacity hover:bg-[#1c1b1b] group-hover:opacity-100"
        aria-label={`Remove ${item.name}`}
      >
        <X className="h-3 w-3" />
      </button>

      {/* Image — fills available space */}
      <div className="min-h-0 flex-1 overflow-hidden bg-[#ebe7e7]">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Info strip */}
      <div className="flex shrink-0 items-center justify-between border-t border-[#dfdfdf] bg-[#fcf9f8] px-2 py-1">
        <span className="truncate text-[11px] font-medium text-[#1c1b1b]">
          {item.name}
        </span>
        <span className="ml-1 shrink-0 text-[11px] text-[#40484e]">
          Rp{item.price}
        </span>
      </div>
    </div>
  );
}
