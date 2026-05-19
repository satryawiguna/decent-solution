'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from '@dnd-kit/core';
import { useSearchParams } from 'next/navigation';
import { useWorkspaceStore } from '@/application/store';
import { getTemplateById } from '@/domain/entities';
import type { PlacedItem, FurnitureItem } from '@workspace-pro/shared';
import DesignTopBar from '@/components/layout/DesignTopBar';
import FurnitureLibrary from '@/components/workspace/FurnitureLibrary';
import WorkspaceCanvas from '@/components/workspace/WorkspaceCanvas';
import CanvasItem from '@/components/workspace/CanvasItem';
import ViewControls from '@/components/workspace/ViewControls';

export default function DesignPageContent() {
  const searchParams = useSearchParams();

  // --- Store ---
  const items = useWorkspaceStore((s) => s.items);
  const addItem = useWorkspaceStore((s) => s.addItem);
  const removeItem = useWorkspaceStore((s) => s.removeItem);
  const moveItem = useWorkspaceStore((s) => s.moveItem);
  const loadTemplate = useWorkspaceStore((s) => s.loadTemplate);
  const generateId = useWorkspaceStore((s) => s.generateId);

  // --- DnD overlay state ---
  const [activeDrag, setActiveDrag] = useState<FurnitureItem | null>(null);

  // --- Sensors (pointer-based, 5px activation distance) ---
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  // --- Template loading ---
  useEffect(() => {
    const templateId = searchParams.get('template');
    if (!templateId) return;

    const template = getTemplateById(templateId);
    if (!template) return;

    // Only load if canvas is empty (prevent re-load on re-render)
    const currentItems = useWorkspaceStore.getState().items;
    if (currentItems.length === 0) {
      const freshItems = template.defaultItems.map((item) => ({
        ...item,
        instanceId: generateId(),
      }));
      loadTemplate(freshItems, templateId);
    }
  }, [searchParams, loadTemplate, generateId]);

  // --- Drag handlers ---
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;

    if (data?.type === 'library') {
      setActiveDrag(data.item as FurnitureItem);
    } else if (data?.type === 'placed') {
      setActiveDrag(data.item as FurnitureItem);
    }
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDrag(null);
      const { active, over, delta } = event;

      if (!over || over.id !== 'workspace-canvas') return;

      const data = active.data.current;
      if (!data) return;

      // Dropped from library → add new item
      if (data.type === 'library') {
        const libItem = data.item as FurnitureItem;
        const newItem: PlacedItem = {
          ...libItem,
          instanceId: generateId(),
          x: Math.max(0, delta.x + 200),
          y: Math.max(0, delta.y + 200),
          rotation: 0,
        };
        addItem(newItem);
        return;
      }

      // Moved within canvas → update position
      if (data.type === 'placed') {
        const placed = data.item as PlacedItem;
        moveItem(
          placed.instanceId,
          Math.max(0, placed.x + delta.x),
          Math.max(0, placed.y + delta.y),
        );
      }
    },
    [addItem, moveItem, generateId],
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <DesignTopBar />

      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-1 overflow-hidden">
          <div className="relative flex-1">
            <WorkspaceCanvas isEmpty={items.length === 0}>
              {items.map((item) => (
                <CanvasItem
                  key={item.instanceId}
                  item={item}
                  onRemove={removeItem}
                />
              ))}
            </WorkspaceCanvas>

            <ViewControls />
          </div>

          <FurnitureLibrary />
        </div>

        <DragOverlay dropAnimation={null}>
          {activeDrag ? (
            <div className="flex cursor-grabbing flex-col items-center gap-1 rounded-xl border border-brand-600 bg-brand-800 p-3 shadow-xl">
              <img
                src={activeDrag.imageUrl}
                alt={activeDrag.name}
                className="h-10 w-10 object-contain opacity-80"
                draggable={false}
              />
              <span className="text-xs font-medium text-white">
                {activeDrag.name}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
