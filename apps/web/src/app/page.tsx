export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Define Your Space
      </h1>
      <p className="mt-4 max-w-lg text-center text-brand-300">
        Select a workspace archetype that matches your style, then customize
        every detail.
      </p>

      {/* Template cards – will be populated in Phase 3 */}
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-brand-800 bg-brand-900/50 p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold">Home Office</h3>
          <p className="mt-2 text-sm text-brand-300">
            Individual focus with domestic comfort.
          </p>
        </div>
        <div className="rounded-2xl border border-brand-800 bg-brand-900/50 p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold">Collaborative Studio</h3>
          <p className="mt-2 text-sm text-brand-300">
            Teams, modular tables, and breakout areas.
          </p>
        </div>
        <div className="rounded-2xl border border-brand-800 bg-brand-900/50 p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold">Executive Suite</h3>
          <p className="mt-2 text-sm text-brand-300">
            Premium environment with refined aesthetics.
          </p>
        </div>
      </div>
    </main>
  );
}
