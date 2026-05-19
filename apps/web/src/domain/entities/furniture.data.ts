import type { FurnitureItem } from "@workspace-pro/shared";

// ---------------------------------------------------------------------------
// Furniture Catalog – seed data for the Furniture Library sidebar
// ---------------------------------------------------------------------------

export const furnitureCatalog: FurnitureItem[] = [
  // ---- CHAIRS ----
  {
    id: "chair-ergo",
    name: "Ergonomic Chair",
    category: "chairs",
    price: 45,
    isNew: true,
    imageUrl:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80",
    dimensions: { width: 2, height: 2 },
    description: "Full back support with adjustable armrests.",
  },
  {
    id: "chair-mesh",
    name: "Mesh Office Chair",
    category: "chairs",
    price: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=600&q=80",
    dimensions: { width: 2, height: 2 },
    description: "Breathable mesh back, lightweight frame.",
  },
  {
    id: "chair-lounge",
    name: "Lounge Chair",
    category: "chairs",
    price: 55,
    imageUrl:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
    dimensions: { width: 2, height: 3 },
    description: "Comfortable lounge seating for breakout areas.",
  },
  {
    id: "chair-executive",
    name: "Executive Chair",
    category: "chairs",
    price: 95,
    imageUrl:
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=600&q=80",
    dimensions: { width: 2, height: 2 },
    description: "High-back leather executive chair.",
  },

  // ---- DESKS ----
  {
    id: "desk-standing",
    name: "Standing Desk",
    category: "desks",
    price: 120,
    isNew: true,
    imageUrl:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    dimensions: { width: 4, height: 2 },
    description: "Electric height-adjustable standing desk.",
  },
  {
    id: "desk-corner",
    name: "Corner Desk",
    category: "desks",
    price: 90,
    imageUrl:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80",
    dimensions: { width: 4, height: 3 },
    description: "L-shaped desk ideal for corner placement.",
  },
  {
    id: "desk-compact",
    name: "Compact Desk",
    category: "desks",
    price: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
    dimensions: { width: 3, height: 2 },
    description: "Space-saving desk for small rooms.",
  },
  {
    id: "desk-executive",
    name: "Executive Desk",
    category: "desks",
    price: 150,
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    dimensions: { width: 5, height: 3 },
    description: "Premium solid-wood executive desk.",
  },

  // ---- STORAGE ----
  {
    id: "storage-shelf",
    name: "Bookshelf",
    category: "storage",
    price: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=600&q=80",
    dimensions: { width: 3, height: 1 },
    description: "Five-tier open bookshelf.",
  },
  {
    id: "storage-cabinet",
    name: "Filing Cabinet",
    category: "storage",
    price: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    dimensions: { width: 2, height: 2 },
    description: "Lockable metal filing cabinet.",
  },
  {
    id: "storage-drawer",
    name: "Mobile Drawer Unit",
    category: "storage",
    price: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=600&q=80",
    dimensions: { width: 2, height: 2 },
    description: "Rolling drawer unit fits under most desks.",
  },
  {
    id: "storage-wardrobe",
    name: "Wardrobe",
    category: "storage",
    price: 70,
    imageUrl:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80",
    dimensions: { width: 3, height: 2 },
    description: "Tall storage wardrobe with hanging rail.",
  },

  // ---- MISC ----
  {
    id: "misc-monitor",
    name: "Ultrawide Monitor",
    category: "misc",
    price: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
    dimensions: { width: 3, height: 1 },
    description: '34" curved ultrawide display.',
  },
  {
    id: "misc-lamp",
    name: "Desk Lamp",
    category: "misc",
    price: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    dimensions: { width: 1, height: 1 },
    description: "Adjustable LED desk lamp with warm light.",
  },
  {
    id: "misc-plant",
    name: "Indoor Plant",
    category: "misc",
    price: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1463320898484-cdee8141c787?w=600&q=80",
    dimensions: { width: 1, height: 1 },
    description: "Low-maintenance snake plant in ceramic pot.",
  },
  {
    id: "misc-whiteboard",
    name: "Whiteboard",
    category: "misc",
    price: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
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
