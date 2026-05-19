export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Review Your Setup</h1>
      <p className="mt-2 text-brand-300">
        Confirm your workspace configuration before renting.
      </p>

      {/* Summary placeholder */}
      <div className="mt-8 rounded-2xl border border-brand-800 bg-brand-900/50 p-8">
        <p className="text-center text-brand-400">
          Your workspace items will appear here.
        </p>
      </div>
    </main>
  );
}
