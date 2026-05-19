import type { FurnitureItem } from "@workspace-pro/shared";

// ---------------------------------------------------------------------------
// Furniture Catalog – seed data for the Furniture Library sidebar
// Images are placeholder SVG data URIs (simple colored shapes).
// ---------------------------------------------------------------------------

export const furnitureCatalog: FurnitureItem[] = [
  // ---- CHAIRS (3) ----
  {
    id: "chair-ergo",
    name: "Ergonomic Chair",
    category: "chairs",
    price: 45,
    imageUrl: "/placeholders/chair-ergo.svg",
    dimensions: { width: 2, height: 2 },
    description: "Full back support with adjustable armrests.",
  },
  {
    id: "chair-mesh",
    name: "Mesh Office Chair",
    category: "chairs",
    price: 35,
    imageUrl: "/placeholders/chair-mesh.svg",
    dimensions: { width: 2, height: 2 },
    description: "Breathable mesh back, lightweight frame.",
  },
  {
    id: "chair-lounge",
    name: "Lounge Chair",
    category: "chairs",
    price: 55,
    imageUrl: "/placeholders/chair-lounge.svg",
    dimensions: { width: 2, height: 3 },
    description: "Comfortable lounge seating for breakout areas.",
  },

  // ---- DESKS (4) ----
  {
    id: "desk-standing",
    name: "Standing Desk",
    category: "desks",
    price: 120,
    imageUrl: "/placeholders/desk-standing.svg",
    dimensions: { width: 4, height: 2 },
    description: "Electric height-adjustable standing desk.",
  },
  {
    id: "desk-corner",
    name: "Corner Desk",
    category: "desks",
    price: 90,
    imageUrl: "/placeholders/desk-corner.svg",
    dimensions: { width: 4, height: 3 },
    description: "L-shaped desk ideal for corner placement.",
  },
  {
    id: "desk-compact",
    name: "Compact Desk",
    category: "desks",
    price: 60,
    imageUrl: "/placeholders/desk-compact.svg",
    dimensions: { width: 3, height: 2 },
    description: "Space-saving desk for small rooms.",
  },
  {
    id: "desk-executive",
    name: "Executive Desk",
    category: "desks",
    price: 150,
    imageUrl: "/placeholders/desk-executive.svg",
    dimensions: { width: 5, height: 3 },
    description: "Premium solid-wood executive desk.",
  },

  // ---- STORAGE (4) ----
  {
    id: "storage-shelf",
    name: "Bookshelf",
    category: "storage",
    price: 40,
    imageUrl: "/placeholders/storage-shelf.svg",
    dimensions: { width: 3, height: 1 },
    description: "Five-tier open bookshelf.",
  },
  {
    id: "storage-cabinet",
    name: "Filing Cabinet",
    category: "storage",
    price: 50,
    imageUrl: "/placeholders/storage-cabinet.svg",
    dimensions: { width: 2, height: 2 },
    description: "Lockable metal filing cabinet.",
  },
  {
    id: "storage-drawer",
    name: "Mobile Drawer Unit",
    category: "storage",
    price: 30,
    imageUrl: "/placeholders/storage-drawer.svg",
    dimensions: { width: 2, height: 2 },
    description: "Rolling drawer unit fits under most desks.",
  },
  {
    id: "storage-wardrobe",
    name: "Wardrobe",
    category: "storage",
    price: 70,
    imageUrl: "/placeholders/storage-wardrobe.svg",
    dimensions: { width: 3, height: 2 },
    description: "Tall storage wardrobe with hanging rail.",
  },

  // ---- MISC (4) ----
  {
    id: "misc-monitor",
    name: "Ultrawide Monitor",
    category: "misc",
    price: 80,
    imageUrl: "/placeholders/misc-monitor.svg",
    dimensions: { width: 3, height: 1 },
    description: '34" curved ultrawide display.',
  },
  {
    id: "misc-lamp",
    name: "Desk Lamp",
    category: "misc",
    price: 25,
    imageUrl: "/placeholders/misc-lamp.svg",
    dimensions: { width: 1, height: 1 },
    description: "Adjustable LED desk lamp with warm light.",
  },
  {
    id: "misc-plant",
    name: "Indoor Plant",
    category: "misc",
    price: 20,
    imageUrl: "/placeholders/misc-plant.svg",
    dimensions: { width: 1, height: 1 },
    description: "Low-maintenance snake plant in ceramic pot.",
  },
  {
    id: "misc-whiteboard",
    name: "Whiteboard",
    category: "misc",
    price: 35,
    imageUrl: "/placeholders/misc-whiteboard.svg",
    dimensions: { width: 4, height: 1 },
    description: "Magnetic whiteboard with marker tray.",
  },
];

// ---- Helpers ----

export function getItemsByCategory(
  category: FurnitureItem["category"],
): FurnitureItem[] {
  return furnitureCatalog.filter((item) => item.category === category);
}

export function getItemById(id: string): FurnitureItem | undefined {
  return furnitureCatalog.find((item) => item.id === id);
}
