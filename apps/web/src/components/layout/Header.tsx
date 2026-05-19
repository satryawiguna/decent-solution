"use client";

import Link from "next/link";
import { Bookmark, Share2 } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#dfdfdf] bg-[#fcf9f8] px-6">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-[#00415e]">
        WorkspacePro
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-[#00415e] transition-colors hover:bg-[#00415e]/10">
          <Bookmark className="h-[18px] w-[18px]" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-[#00415e] transition-colors hover:bg-[#00415e]/10">
          <Share2 className="h-[18px] w-[18px]" />
        </button>
      </div>
    </header>
  );
}
