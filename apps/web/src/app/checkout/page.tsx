import { Suspense } from "react";
import CheckoutContent from "./CheckoutContent";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#fcf9f8]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#dfdfdf] border-t-[#00415e]" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
