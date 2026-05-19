// Shared constants
// ==================

export const APP_NAME = "WorkspacePro" as const;

export const CANVAS_GRID_SIZE = 20; // px per grid unit

export const CATEGORY_LABELS: Record<string, string> = {
  chairs: "Chairs",
  desks: "Desks",
  storage: "Storage",
  misc: "Misc",
} as const;

export const TEMPLATE_IDS = {
  HOME_OFFICE: "home-office",
  COLLABORATIVE: "collaborative-studio",
  EXECUTIVE: "executive-suite",
} as const;
