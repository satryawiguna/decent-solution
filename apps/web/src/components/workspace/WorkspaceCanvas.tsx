"use client";

import { useDroppable } from "@dnd-kit/core";

interface WorkspaceCanvasProps {
  children: React.ReactNode;
  isEmpty: boolean;
}

export default function WorkspaceCanvas({
  children,
  isEmpty,
}: WorkspaceCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "workspace-canvas",
  });

  return (
    <main
      ref={setNodeRef}
      className={`relative h-full overflow-auto bg-white ${isOver ? "bg-[#f0f8ff]" : ""}`}
    >
      {/* Subtle dot grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #dfdfdf 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Dashed border canvas frame */}
      <div className="absolute inset-4 border-2 border-dashed border-[#dfdfdf]" />

      {/* Empty state */}
      {isEmpty && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center opacity-20">
          <svg
            width="55"
            height="90"
            viewBox="0 0 55 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4"
          >
            <circle cx="27.5" cy="22" r="15" fill="#1c1b1b" />
            <path
              d="M5 90c0-12.426 10.074-22.5 22.5-22.5S50 77.574 50 90"
              stroke="#1c1b1b"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
          <h2 className="text-xl font-semibold text-[#1c1b1b]">
            Workspace Canvas
          </h2>
          <p className="mt-1 text-base text-[#1c1b1b]">
            Drag and drop items from the library to start planning
          </p>
        </div>
      )}

      {/* Placed items */}
      <div className="relative h-full w-full">{children}</div>
    </main>
  );
}
