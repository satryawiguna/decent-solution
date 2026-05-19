"use client";

import Link from "next/link";
import { ShoppingBag, Bookmark, Share2 } from "lucide-react";
import {
  useWorkspaceStore,
  selectItemCount,
  selectTotalPrice,
} from "@/application/store";

export default function DesignTopBar() {
  const itemCount = useWorkspaceStore(selectItemCount);
  const totalPrice = useWorkspaceStore(selectTotalPrice);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#dfdfdf] bg-[#fcf9f8] px-6">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-[#00415e]">
        WorkspacePro
      </Link>

      {/* Stats pill */}
      <div className="flex items-center gap-4 rounded-xl border border-[#dfdfdf] bg-white px-6 py-[9px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-[19px] w-[22px] text-[#40484e]" />
          <span className="text-[14px] font-medium tracking-[0.14px] text-[#40484e]">
            Items: <span className="font-bold text-[#1c1b1b]">{itemCount}</span>
          </span>
        </div>
        <div className="h-4 w-px bg-[#dfdfdf]" />
        <span className="text-[14px] font-medium tracking-[0.14px] text-[#40484e]">
          Total:{" "}
          <span className="font-bold text-[#00415e]">
            ${totalPrice.toFixed(2)}
          </span>
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="text-[#1c1b1b] transition-opacity hover:opacity-60">
          <Bookmark className="h-[18px] w-[18px]" />
        </button>
        <button className="text-[#1c1b1b] transition-opacity hover:opacity-60">
          <Share2 className="h-[18px] w-[18px]" />
        </button>
        {itemCount > 0 && (
          <Link
            href="/checkout"
            className="rounded-[4px] bg-[#00415e] px-4 py-2 text-[14px] font-medium tracking-[0.14px] text-white transition-opacity hover:opacity-80"
          >
            Checkout
          </Link>
        )}
      </div>
    </header>
  );
}
