"use client";

import Link from "next/link";
import { LayoutGrid } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-brand-800/60 bg-brand-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-white"
        >
          <LayoutGrid className="h-5 w-5 text-blue-400" />
          <span>WorkspacePro</span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-brand-200 sm:flex">
          <Link href="/design" className="transition-colors hover:text-white">
            Templates
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            About
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Pricing
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-brand-600 px-4 py-1.5 text-sm font-medium text-brand-200 transition-colors hover:border-brand-400 hover:text-white">
            Sign In
          </button>
          <button className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-500">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
