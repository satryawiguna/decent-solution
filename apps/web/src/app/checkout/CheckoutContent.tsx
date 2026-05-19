"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Trash2, ArrowLeft, ShoppingBag, CheckCircle } from "lucide-react";
import { useWorkspaceStore } from "@/application/store";
import type { CheckoutLineItem, RentalPeriod } from "@workspace-pro/shared";
import { RENTAL_PERIODS } from "@workspace-pro/shared";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Group placed items by furniture id, counting duplicates as quantity. */
function buildLineItems(
  items: ReturnType<typeof useWorkspaceStore.getState>["items"],
): CheckoutLineItem[] {
  const map = new Map<string, CheckoutLineItem>();

  for (const item of items) {
    const existing = map.get(item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      map.set(item.id, {
        id: item.id,
        name: item.name,
        category: item.category,
        imageUrl: item.imageUrl,
        pricePerMonth: item.price,
        quantity: 1,
      });
    }
  }

  return Array.from(map.values());
}

const PERIOD_LABELS: Record<RentalPeriod, string> = {
  1: "1 month",
  3: "3 months",
  6: "6 months",
  12: "12 months",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CheckoutContent() {
  const items = useWorkspaceStore((s) => s.items);
  const removeItem = useWorkspaceStore((s) => s.removeItem);
  const clearAll = useWorkspaceStore((s) => s.clearAll);

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(3);
  const [submitted, setSubmitted] = useState(false);

  const lineItems = useMemo(() => buildLineItems(items), [items]);

  const monthlyTotal = lineItems.reduce(
    (sum, li) => sum + li.pricePerMonth * li.quantity,
    0,
  );
  const grandTotal = monthlyTotal * rentalPeriod;

  // Remove all instances of a given furniture id
  const handleRemoveAll = (furnitureId: string) => {
    const toRemove = items.filter((i) => i.id === furnitureId);
    toRemove.forEach((i) => removeItem(i.instanceId));
  };

  const handleConfirm = () => {
    // In a real app this would call a checkout API.
    setSubmitted(true);
    clearAll();
  };

  // ---- Success screen ----
  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcf9f8] px-6 text-center">
        <CheckCircle className="mb-6 h-16 w-16 text-[#00415e]" />
        <h1 className="text-[32px] font-bold text-[#00415e]">
          Order Confirmed!
        </h1>
        <p className="mt-3 max-w-md text-[16px] text-[#40484e]">
          Your workspace has been reserved. You&apos;ll receive a confirmation
          email shortly.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-[4px] bg-[#00415e] px-8 py-3 text-[14px] font-medium tracking-[0.14px] text-white transition-opacity hover:opacity-80"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // ---- Empty state ----
  if (lineItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcf9f8] px-6 text-center">
        <ShoppingBag className="mb-6 h-16 w-16 text-[#dfdfdf]" />
        <h1 className="text-[24px] font-semibold text-[#1c1b1b]">
          Your workspace is empty
        </h1>
        <p className="mt-2 text-[16px] text-[#40484e]">
          Add items from the Furniture Library before checking out.
        </p>
        <Link
          href="/design"
          className="mt-8 rounded-[4px] bg-[#00415e] px-8 py-3 text-[14px] font-medium tracking-[0.14px] text-white transition-opacity hover:opacity-80"
        >
          Go to Designer
        </Link>
      </div>
    );
  }

  // ---- Main checkout ----
  return (
    <div className="min-h-screen bg-[#fcf9f8]">
      {/* Top bar */}
      <header className="flex h-16 items-center justify-between border-b border-[#dfdfdf] bg-[#fcf9f8] px-6">
        <Link href="/" className="text-xl font-bold text-[#00415e]">
          WorkspacePro
        </Link>
        <span className="text-[14px] font-semibold text-[#1c1b1b]">
          Checkout
        </span>
        <div className="w-32" />
      </header>

      <main className="mx-auto max-w-[960px] px-6 py-10">
        {/* Back link */}
        <Link
          href="/design"
          className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#40484e] transition-colors hover:text-[#00415e]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Designer
        </Link>

        <h1 className="mb-8 text-[32px] font-bold leading-tight text-[#00415e]">
          Review Your Setup
        </h1>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* ---- Item list ---- */}
          <div className="flex-1 min-w-0">
            <div className="overflow-hidden rounded-[8px] border border-[#dfdfdf] bg-white">
              {/* List header */}
              <div className="flex items-center justify-between border-b border-[#dfdfdf] px-6 py-4">
                <span className="text-[14px] font-semibold text-[#1c1b1b]">
                  {lineItems.length} item{lineItems.length !== 1 ? "s" : ""}{" "}
                  selected
                </span>
                <button
                  onClick={() => clearAll()}
                  className="text-[13px] text-[#40484e] underline-offset-2 hover:text-red-500 hover:underline"
                >
                  Remove all
                </button>
              </div>

              {/* Rows */}
              <ul className="divide-y divide-[#dfdfdf]">
                {lineItems.map((li) => (
                  <li key={li.id} className="flex items-center gap-4 px-6 py-4">
                    {/* Image */}
                    <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[4px] bg-[#ebe7e7]">
                      <img
                        src={li.imageUrl}
                        alt={li.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-semibold text-[#1c1b1b]">
                        {li.name}
                      </p>
                      <p className="mt-0.5 text-[13px] capitalize text-[#40484e]">
                        {li.category}
                      </p>
                      {li.quantity > 1 && (
                        <p className="mt-0.5 text-[13px] text-[#40484e]">
                          Qty: {li.quantity}
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    <div className="shrink-0 text-right">
                      <p className="text-[15px] font-bold text-[#00415e]">
                        Rp{li.pricePerMonth * li.quantity}
                        <span className="text-[12px] font-medium text-[#40484e]">
                          /mo
                        </span>
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => handleRemoveAll(li.id)}
                      className="ml-2 shrink-0 rounded p-1 text-[#40484e] transition-colors hover:bg-red-50 hover:text-red-500"
                      aria-label={`Remove ${li.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---- Order summary ---- */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="rounded-[8px] border border-[#dfdfdf] bg-white p-6">
              <h2 className="mb-6 text-[18px] font-bold text-[#1c1b1b]">
                Order Summary
              </h2>

              {/* Rental period */}
              <div className="mb-6">
                <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.52px] text-[#40484e]">
                  Rental Period
                </p>
                <div className="grid grid-cols-4 gap-1.5 rounded-[4px] border border-[#dfdfdf] p-1">
                  {RENTAL_PERIODS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setRentalPeriod(p)}
                      className={`rounded-[2px] py-2 text-[12px] font-semibold tracking-[0.24px] transition-colors ${
                        rentalPeriod === p
                          ? "bg-[#00415e] text-white"
                          : "text-[#40484e] hover:bg-[#f6f3f2]"
                      }`}
                    >
                      {p}mo
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-[12px] text-[#40484e]">
                  {PERIOD_LABELS[rentalPeriod]} rental
                </p>
              </div>

              {/* Breakdown */}
              <div className="mb-4 space-y-2 border-b border-[#dfdfdf] pb-4">
                <div className="flex justify-between text-[14px] text-[#40484e]">
                  <span>Monthly rate</span>
                  <span>Rp{monthlyTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[14px] text-[#40484e]">
                  <span>Duration</span>
                  <span>× {rentalPeriod}</span>
                </div>
              </div>

              <div className="mb-6 flex justify-between">
                <span className="text-[16px] font-bold text-[#1c1b1b]">
                  Total
                </span>
                <span className="text-[20px] font-bold text-[#00415e]">
                  Rp{grandTotal.toFixed(2)}
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={handleConfirm}
                className="w-full rounded-[4px] bg-[#00415e] py-3 text-[14px] font-medium tracking-[0.14px] text-white transition-opacity hover:opacity-80"
              >
                Confirm &amp; Rent
              </button>

              <p className="mt-4 text-center text-[12px] text-[#40484e]">
                No charges until confirmation. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
