'use client';

import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { useWorkspaceStore, selectItemCount, selectTotalPrice } from '@/application/store';

export default function DesignTopBar() {
  const itemCount = useWorkspaceStore(selectItemCount);
  const totalPrice = useWorkspaceStore(selectTotalPrice);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-brand-800/60 bg-brand-950/90 px-6">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
        <LayoutGrid className="h-5 w-5 text-blue-400" />
        <span>WorkspacePro</span>
      </Link>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-brand-300">
        <span>
          Items: <span className="font-medium text-white">{itemCount}</span>
        </span>
        <span className="text-brand-600">|</span>
        <span>
          Total:{' '}
          <span className="font-medium text-white">
            ${totalPrice.toFixed(2)}
          </span>
        </span>
      </div>

      {/* CTA */}
      <Link
        href="/checkout"
        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
      >
        Review Setup &rarr;
      </Link>
    </header>
  );
}
