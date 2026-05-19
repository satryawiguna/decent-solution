"use client";

import { useEffect, useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from "@dnd-kit/core";
import { useSearchParams } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import { useWorkspaceStore } from "@/application/store";
import { getTemplateById } from "@/domain/entities";
import type { PlacedItem, FurnitureItem } from "@workspace-pro/shared";
import DesignTopBar from "@/components/layout/DesignTopBar";
import FurnitureLibrary from "@/components/workspace/FurnitureLibrary";
import WorkspaceCanvas from "@/components/workspace/WorkspaceCanvas";
import CanvasItem from "@/components/workspace/CanvasItem";
import ThreeDScene from "@/components/workspace/ThreeDScene";
import ViewControls from "@/components/workspace/ViewControls";

export default function DesignPageContent() {
  const searchParams = useSearchParams();

  // --- Store ---
  const items = useWorkspaceStore((s) => s.items);
  const viewMode = useWorkspaceStore((s) => s.viewMode);
  const addItem = useWorkspaceStore((s) => s.addItem);
  const removeItem = useWorkspaceStore((s) => s.removeItem);
  const moveItem = useWorkspaceStore((s) => s.moveItem);
  const loadTemplate = useWorkspaceStore((s) => s.loadTemplate);
  const generateId = useWorkspaceStore((s) => s.generateId);

  // --- DnD overlay state ---
  const [activeDrag, setActiveDrag] = useState<FurnitureItem | null>(null);

  // --- Mobile sidebar drawer ---
  const [libraryOpen, setLibraryOpen] = useState(false);

  // --- Sensors (pointer-based, 5px activation distance) ---
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  // --- Template loading ---
  useEffect(() => {
    const templateId = searchParams.get("template");
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

    if (data?.type === "library") {
      setActiveDrag(data.item as FurnitureItem);
    } else if (data?.type === "placed") {
      setActiveDrag(data.item as FurnitureItem);
    }
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDrag(null);
      const { active, over, delta } = event;

      if (!over || over.id !== "workspace-canvas") return;

      const data = active.data.current;
      if (!data) return;

      // Dropped from library → place at exact drop position
      if (data.type === "library") {
        const libItem = data.item as FurnitureItem;

        // Compute position of dragged item's top-left corner relative to canvas
        const canvasRect = over.rect;
        const activeRect = active.rect.current.translated;
        const x = activeRect
          ? Math.max(0, activeRect.left - canvasRect.left)
          : Math.max(0, delta.x);
        const y = activeRect
          ? Math.max(0, activeRect.top - canvasRect.top)
          : Math.max(0, delta.y);

        const newItem: PlacedItem = {
          ...libItem,
          instanceId: generateId(),
          x,
          y,
          rotation: 0,
        };
        addItem(newItem);
        return;
      }

      // Moved within canvas → update position
      if (data.type === "placed") {
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
    <div className="flex h-screen flex-col overflow-hidden bg-[#fcf9f8] text-[#1c1b1b]">
      <DesignTopBar />
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-1 overflow-hidden">
          {/* Floorplan (2D) */}
          {viewMode === "floorplan" && (
            <>
              <div className="relative min-w-0 flex-1 overflow-hidden">
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

                {/* Mobile FAB: open library */}
                <button
                  onClick={() => setLibraryOpen(true)}
                  aria-label="Open furniture library"
                  className="absolute bottom-20 right-4 z-20 flex items-center gap-1.5 rounded-full bg-[#00415e] px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg transition-opacity hover:opacity-90 lg:hidden"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Library
                </button>
              </div>

              {/* Desktop: inline sidebar */}
              <div className="hidden lg:block">
                <FurnitureLibrary />
              </div>

              {/* Mobile: backdrop */}
              {libraryOpen && (
                <div
                  className="fixed inset-0 z-30 bg-black/30 lg:hidden"
                  onClick={() => setLibraryOpen(false)}
                />
              )}

              {/* Mobile: right-side drawer */}
              <div
                className={`fixed inset-y-0 right-0 z-40 transition-transform duration-300 lg:hidden ${
                  libraryOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <FurnitureLibrary onClose={() => setLibraryOpen(false)} />
              </div>
            </>
          )}

          {/* 3D View */}
          {viewMode === "3d" && (
            <div className="relative min-w-0 flex-1 overflow-hidden">
              <ThreeDScene />
              <ViewControls />
            </div>
          )}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeDrag ? (
            <div
              className="flex cursor-grabbing flex-col overflow-hidden rounded-[4px] border border-[#dfdfdf] bg-[#fcf9f8] shadow-xl"
              style={{ width: 120, height: 120 }}
            >
              <div className="min-h-0 flex-1 overflow-hidden bg-[#ebe7e7]">
                <img
                  src={activeDrag.imageUrl}
                  alt={activeDrag.name}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="flex shrink-0 items-center justify-between border-t border-[#dfdfdf] px-2 py-1">
                <span className="truncate text-[11px] font-medium text-[#1c1b1b]">
                  {activeDrag.name}
                </span>
                <span className="ml-1 shrink-0 text-[11px] text-[#40484e]">
                  Rp{activeDrag.price}
                </span>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
