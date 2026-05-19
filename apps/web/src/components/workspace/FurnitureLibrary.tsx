"use client";

import { useState } from "react";
import { getItemsByCategory } from "@/domain/entities";
import type { FurnitureCategory } from "@workspace-pro/shared";
import LibraryItemCard from "./LibraryItemCard";
import { LayoutGrid, Monitor, Archive, Sparkles } from "lucide-react";

const CATEGORIES: {
  id: FurnitureCategory;
  label: string;
  icon: typeof Plus;
}[] = [
  { id: "chairs", label: "Chairs", icon: LayoutGrid },
  { id: "desks", label: "Desks", icon: Monitor },
  { id: "storage", label: "Storage", icon: Archive },
  { id: "misc", label: "Misc", icon: Sparkles },
];

export default function FurnitureLibrary() {
  const [activeTab, setActiveTab] = useState<FurnitureCategory>("chairs");

  const items = getItemsByCategory(activeTab);

  return (
    <aside className="relative z-10 flex h-full w-[320px] shrink-0 flex-col overflow-hidden border-l border-[#dfdfdf] bg-[#f6f3f2]">
      {/* Header */}
      <div className="border-b border-[#dfdfdf] bg-[#fcf9f8] px-4 pt-4 pb-[17px]">
        <h3 className="text-[20px] font-semibold leading-tight text-[#00415e]">
          Furniture Library
        </h3>
        <p className="pb-4 text-[16px] text-[#40484e]">
          Select items to add to your plan
        </p>
        <button className="w-full rounded-[4px] bg-[#00415e] py-2 text-center text-[14px] font-medium tracking-[0.14px] text-white transition-opacity hover:opacity-80">
          Add custom item
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#dfdfdf] bg-[#fcf9f8]">
        {CATEGORIES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-1 flex-col items-center gap-1 border-b-2 px-1 py-3 text-[12px] font-semibold tracking-[0.24px] transition-colors ${
              activeTab === id
                ? "border-[#00415e] text-[#00415e]"
                : "border-transparent text-[#40484e] hover:text-[#1c1b1b]"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Item List – 2-column grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-3">
          {items.map((item) => (
            <LibraryItemCard key={item.id} item={item} />
          ))}
        </div>

        {items.length === 0 && (
          <p className="py-8 text-center text-sm text-[#40484e]">
            No items in this category.
          </p>
        )}
      </div>
    </aside>
  );
}
