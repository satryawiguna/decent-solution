export default function DesignPage() {
  return (
    <div className="flex h-screen flex-col">
      {/* TopBar placeholder */}
      <header className="flex items-center justify-between border-b border-brand-800 px-6 py-3">
        <span className="text-lg font-bold">WorkspacePro</span>
        <span className="text-sm text-brand-300">
          Items: 0 &middot; Total: $0.00
        </span>
        <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium hover:bg-brand-500">
          Review Setup &rarr;
        </button>
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Canvas */}
        <main className="relative flex-1 bg-brand-950 p-8">
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-brand-700">
            <p className="text-brand-500">
              Workspace Canvas &mdash; Drag and drop items from the library to
              start planning
            </p>
          </div>
        </main>

        {/* Sidebar placeholder */}
        <aside className="w-80 border-l border-brand-800 bg-brand-900/30 p-6">
          <h3 className="font-semibold">Furniture Library</h3>
          <p className="mt-1 text-sm text-brand-400">
            Select items to add to your plan
          </p>
        </aside>
      </div>
    </div>
  );
}
