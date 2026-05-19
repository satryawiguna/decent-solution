import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlacedItem, ViewMode } from "@workspace-pro/shared";

// ---------------------------------------------------------------------------
// Workspace Store – global state for the workspace designer.
// Persisted to localStorage so the user's layout survives page refreshes.
// ---------------------------------------------------------------------------

export interface WorkspaceState {
  /** All items currently placed on the canvas. */
  items: PlacedItem[];

  /** Currently selected template id (or null if none). */
  selectedTemplateId: string | null;

  /** Active view mode (floorplan, measure, 3d). */
  viewMode: ViewMode;

  /** Monotonically increasing counter for generating unique instance IDs. */
  _nextId: number;
}

export interface WorkspaceActions {
  /** Add a new item to the canvas at the given position. */
  addItem: (item: PlacedItem) => void;

  /** Remove an item from the canvas by its instanceId. */
  removeItem: (instanceId: string) => void;

  /** Update the position (and optionally rotation) of a placed item. */
  moveItem: (
    instanceId: string,
    x: number,
    y: number,
    rotation?: number,
  ) => void;

  /** Clear all items from the canvas. */
  clearAll: () => void;

  /** Load a template's default items onto the canvas. */
  loadTemplate: (items: PlacedItem[], templateId: string) => void;

  /** Set the active view mode. */
  setViewMode: (mode: ViewMode) => void;

  /** Generate a unique instance ID. */
  generateId: () => string;
}

export type WorkspaceStore = WorkspaceState & WorkspaceActions;

// ---- Derived selectors (not stored, computed on read) ----

export const selectItemCount = (state: WorkspaceState) => state.items.length;

export const selectTotalPrice = (state: WorkspaceState) =>
  state.items.reduce((sum, item) => sum + item.price, 0);

// ---- Store ----

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set, get) => ({
      // -- State --
      items: [],
      selectedTemplateId: null,
      viewMode: "floorplan",
      _nextId: 1,

      // -- Actions --
      addItem: (item) => set((s) => ({ items: [...s.items, item] })),

      removeItem: (instanceId) =>
        set((s) => ({
          items: s.items.filter((i) => i.instanceId !== instanceId),
        })),

      moveItem: (instanceId, x, y, rotation) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.instanceId === instanceId
              ? { ...i, x, y, rotation: rotation ?? i.rotation }
              : i,
          ),
        })),

      clearAll: () => set({ items: [], selectedTemplateId: null }),

      loadTemplate: (items, templateId) =>
        set({ items, selectedTemplateId: templateId }),

      setViewMode: (mode) => set({ viewMode: mode }),

      generateId: () => {
        const id = `item-${get()._nextId}`;
        set((s) => ({ _nextId: s._nextId + 1 }));
        return id;
      },
    }),
    {
      name: "workspace-pro-storage", // localStorage key
      // Only persist the state fields (not actions)
      partialize: (state) => ({
        items: state.items,
        selectedTemplateId: state.selectedTemplateId,
        viewMode: state.viewMode,
        _nextId: state._nextId,
      }),
    },
  ),
);
