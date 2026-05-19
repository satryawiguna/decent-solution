'use client';

import { useState } from 'react';
import { furnitureCatalog, getItemsByCategory } from '@/domain/entities';
import { CATEGORY_LABELS } from '@workspace-pro/shared';
import type { FurnitureCategory } from '@workspace-pro/shared';
import LibraryItemCard from './LibraryItemCard';
import { Plus } from 'lucide-react';

const CATEGORIES: FurnitureCategory[] = ['chairs', 'desks', 'storage', 'misc'];

export default function FurnitureLibrary() {
  const [activeTab, setActiveTab] = useState<FurnitureCategory>('chairs');

  const items = getItemsByCategory(activeTab);

  return (
    <aside className="flex w-72 shrink-0 flex-col border-l border-brand-800/60 bg-brand-950/50">
      {/* Header */}
      <div className="border-b border-brand-800/60 px-5 py-4">
        <h3 className="text-sm font-semibold text-white">Furniture Library</h3>
        <p className="mt-0.5 text-xs text-brand-400">
          Select items to add to your plan
        </p>

        <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-brand-700 px-3 py-2 text-xs font-medium text-brand-300 transition-colors hover:border-brand-500 hover:text-white">
          <Plus className="h-3.5 w-3.5" />
          Add custom item
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-brand-800/60">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`flex-1 border-b-2 px-2 py-2.5 text-xs font-medium transition-colors ${
              activeTab === cat
                ? 'border-blue-500 text-white'
                : 'border-transparent text-brand-400 hover:text-brand-200'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Item Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {items.map((item) => (
            <LibraryItemCard key={item.id} item={item} />
          ))}
        </div>

        {items.length === 0 && (
          <p className="py-8 text-center text-xs text-brand-500">
            No items in this category.
          </p>
        )}
      </div>
    </aside>
  );
}
