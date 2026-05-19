"use client";

import { useDraggable } from "@dnd-kit/core";
import type { FurnitureItem } from "@workspace-pro/shared";

interface LibraryItemCardProps {
  item: FurnitureItem;
}

export default function LibraryItemCard({ item }: LibraryItemCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `library-${item.id}`,
      data: { type: "library", item },
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
      className={`relative flex cursor-grab flex-col overflow-clip rounded-[4px] border border-[#dfdfdf] bg-[#fcf9f8] transition-all active:cursor-grabbing ${
        isDragging ? "opacity-50 shadow-lg ring-2 ring-[#00415e]/30" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-[160px] w-full overflow-hidden bg-[#ebe7e7]">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover"
          draggable={false}
        />
        {item.isNew && (
          <span className="absolute right-2 top-2 rounded-[12px] bg-[#00415e] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            NEW
          </span>
        )}
      </div>

      {/* Info row */}
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-[14px] font-medium text-[#1c1b1b]">
          {item.name}
        </span>
        <span className="text-[14px] text-[#40484e]">${item.price}/mo</span>
      </div>
    </div>
  );
}
