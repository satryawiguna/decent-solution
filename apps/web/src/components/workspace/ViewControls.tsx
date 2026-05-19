"use client";

import { Box, LayoutGrid } from "lucide-react";
import { useWorkspaceStore } from "@/application/store";
import type { ViewMode } from "@workspace-pro/shared";

const modes: { id: ViewMode; label: string; icon: typeof Box }[] = [
  { id: "3d", label: "3D View", icon: Box },
  { id: "floorplan", label: "Floorplan", icon: LayoutGrid },
];

export default function ViewControls() {
  const viewMode = useWorkspaceStore((s) => s.viewMode);
  const setViewMode = useWorkspaceStore((s) => s.setViewMode);

  return (
    <div className="absolute bottom-6 left-6 z-40 flex flex-col gap-2 rounded-[8px] border border-[#dfdfdf] bg-white p-[9px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
      {modes.map(({ id, label, icon: Icon }) => {
        const isActive = viewMode === id;
        return (
          <button
            key={id}
            onClick={() => setViewMode(id)}
            className={`flex items-center gap-2 rounded-[4px] px-3 py-3 text-[14px] font-medium tracking-[0.14px] transition-colors ${
              isActive
                ? "bg-[#005980] text-[#90cffb]"
                : "text-[#1c1b1b] hover:bg-gray-100"
            }`}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
