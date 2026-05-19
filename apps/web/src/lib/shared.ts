// Inlined from packages/shared — makes apps/web self-contained for deployment
// ============================================================================

// ---- Furniture ----

export type FurnitureCategory = "chairs" | "desks" | "storage" | "misc";

export interface FurnitureItem {
  id: string;
  name: string;
  category: FurnitureCategory;
  price: number;
  imageUrl: string;
  isNew?: boolean;
  dimensions: {
    width: number;
    height: number;
  };
  description?: string;
}

// ---- Placed Item (on canvas) ----

export interface PlacedItem extends FurnitureItem {
  instanceId: string;
  x: number;
  y: number;
  rotation: number;
}

// ---- Template ----

export interface WorkspaceTemplate {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  defaultItems: PlacedItem[];
}

// ---- View Mode ----

export type ViewMode = "floorplan" | "measure" | "3d";

// ---- Checkout ----

export const RENTAL_PERIODS = [1, 3, 6, 12] as const;
export type RentalPeriod = (typeof RENTAL_PERIODS)[number];

export interface CheckoutLineItem {
  id: string;
  name: string;
  category: FurnitureCategory;
  imageUrl: string;
  pricePerMonth: number;
  quantity: number;
}

// ---- Constants ----

export const APP_NAME = "WorkspacePro" as const;
export const CANVAS_GRID_SIZE = 20;

export const CATEGORY_LABELS: Record<string, string> = {
  chairs: "Chairs",
  desks: "Desks",
  storage: "Storage",
  misc: "Misc",
};

export const TEMPLATE_IDS = {
  HOME_OFFICE: "home-office",
  COLLABORATIVE: "collaborative-studio",
  EXECUTIVE: "executive-suite",
} as const;
