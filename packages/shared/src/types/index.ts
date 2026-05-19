// Domain types shared across the monorepo
// =========================================

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
    width: number; // in grid units
    height: number; // in grid units
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
  /** Furniture item id (not instanceId). */
  id: string;
  name: string;
  category: FurnitureCategory;
  imageUrl: string;
  pricePerMonth: number;
  quantity: number;
}
