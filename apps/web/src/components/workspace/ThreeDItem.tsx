"use client";

import { useMemo } from "react";
import { Box, Cylinder, Sphere, Cone } from "@react-three/drei";
import type { PlacedItem } from "@workspace-pro/shared";

interface ThreeDItemProps {
  item: PlacedItem;
  onDragStart: (instanceId: string, offsetX: number, offsetZ: number) => void;
  isDragging: boolean;
}

// Color palette per item type
const COLORS: Record<string, string> = {
  desk: "#3b82f6",
  chair: "#22c55e",
  storage: "#f59e0b",
  misc: "#a855f7",
};

function getColor(item: PlacedItem): string {
  if (item.id.startsWith("desk")) return COLORS.desk;
  if (item.id.startsWith("chair")) return COLORS.chair;
  if (item.id.startsWith("storage")) return COLORS.storage;
  return COLORS.misc;
}

export default function ThreeDItem({
  item,
  onDragStart,
  isDragging,
}: ThreeDItemProps) {
  const color = getColor(item);
  const w = item.dimensions.width * 0.4;
  const h = item.dimensions.height * 0.4;
  const px = (item.x - 200) * 0.04;
  const pz = -(item.y - 200) * 0.04;

  const geometry = useMemo(() => {
    const isDesk = item.id.startsWith("desk");
    const isChair = item.id.startsWith("chair");
    const isStorage = item.id.startsWith("storage");
    const isMonitor = item.id === "misc-monitor";
    const isPlant = item.id === "misc-plant";
    const isLamp = item.id === "misc-lamp";
    const isWhiteboard = item.id === "misc-whiteboard";

    if (isDesk) {
      return (
        <group>
          {/* Tabletop */}
          <Box args={[w, 0.08, h]} position={[0, 0.8, 0]}>
            <meshStandardMaterial color={color} />
          </Box>
          {/* Legs */}
          {[
            [-w / 2 + 0.2, 0.4, -h / 2 + 0.2],
            [w / 2 - 0.2, 0.4, -h / 2 + 0.2],
            [-w / 2 + 0.2, 0.4, h / 2 - 0.2],
            [w / 2 - 0.2, 0.4, h / 2 - 0.2],
          ].map((pos, i) => (
            <Cylinder
              key={i}
              args={[0.06, 0.06, 0.8]}
              position={pos as [number, number, number]}
            >
              <meshStandardMaterial color="#6b7280" />
            </Cylinder>
          ))}
        </group>
      );
    }

    if (isChair) {
      return (
        <group>
          {/* Seat */}
          <Box args={[w * 0.8, 0.06, h * 0.8]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color={color} />
          </Box>
          {/* Back */}
          <Box args={[w * 0.8, 0.5, 0.06]} position={[0, 0.75, -h * 0.35]}>
            <meshStandardMaterial color={color} />
          </Box>
          {/* Legs */}
          {[
            [-w * 0.35, 0.25, -h * 0.35],
            [w * 0.35, 0.25, -h * 0.35],
            [-w * 0.35, 0.25, h * 0.35],
            [w * 0.35, 0.25, h * 0.35],
          ].map((pos, i) => (
            <Cylinder
              key={i}
              args={[0.05, 0.05, 0.5]}
              position={pos as [number, number, number]}
            >
              <meshStandardMaterial color="#6b7280" />
            </Cylinder>
          ))}
        </group>
      );
    }

    if (isStorage) {
      return (
        <Box args={[w, h * 1.2, w * 0.8]}>
          <meshStandardMaterial color={color} />
        </Box>
      );
    }

    if (isMonitor) {
      return (
        <group>
          {/* Stand */}
          <Cylinder args={[0.06, 0.1, 0.3]} position={[0, 0.15, 0]}>
            <meshStandardMaterial color="#6b7280" />
          </Cylinder>
          {/* Base */}
          <Cylinder args={[0.2, 0.2, 0.04]} position={[0, 0.02, 0]}>
            <meshStandardMaterial color="#4b5563" />
          </Cylinder>
          {/* Screen */}
          <Box args={[w * 1.2, 0.45, 0.06]} position={[0, 0.55, 0]}>
            <meshStandardMaterial color="#1e1b4b" />
          </Box>
        </group>
      );
    }

    if (isPlant) {
      return (
        <group>
          {/* Pot */}
          <Cylinder args={[0.2, 0.15, 0.4]} position={[0, 0.2, 0]}>
            <meshStandardMaterial color="#92400e" />
          </Cylinder>
          {/* Leaves */}
          <Sphere args={[0.3, 8, 6]} position={[0, 0.55, 0]}>
            <meshStandardMaterial color="#22c55e" />
          </Sphere>
        </group>
      );
    }

    if (isLamp) {
      return (
        <group>
          {/* Base */}
          <Cylinder args={[0.15, 0.18, 0.08]} position={[0, 0.04, 0]}>
            <meshStandardMaterial color="#6b7280" />
          </Cylinder>
          {/* Pole */}
          <Cylinder args={[0.04, 0.04, 0.8]} position={[0, 0.44, 0]}>
            <meshStandardMaterial color="#9ca3af" />
          </Cylinder>
          {/* Shade */}
          <Cone args={[0.22, 0.3, 8]} position={[0, 0.95, 0]}>
            <meshStandardMaterial
              color="#eab308"
              emissive="#eab308"
              emissiveIntensity={0.3}
            />
          </Cone>
        </group>
      );
    }

    if (isWhiteboard) {
      return (
        <Box args={[w * 1.5, 0.8, 0.06]}>
          <meshStandardMaterial color="#f8fafc" />
        </Box>
      );
    }

    // Default: generic box
    return (
      <Box args={[w, 0.4, h]}>
        <meshStandardMaterial color={color} />
      </Box>
    );
  }, [item.id, w, h, color]);

  return (
    <group
      position={[px, 0, pz]}
      rotation={[0, item.rotation * (Math.PI / 180), 0]}
      onPointerDown={(e) => {
        e.stopPropagation();
        // offset = where the user clicked relative to the item's 3D centre
        onDragStart(item.instanceId, e.point.x - px, e.point.z - pz);
      }}
    >
      {/* Hit-test envelope so clicks register even in gaps between meshes */}
      <mesh visible={false}>
        <boxGeometry args={[Math.max(w, 0.4), 1.2, Math.max(h, 0.4)]} />
        <meshBasicMaterial />
      </mesh>

      {/* Highlight ring while dragging */}
      {isDragging && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry
            args={[Math.max(w, h) * 0.6, Math.max(w, h) * 0.7, 32]}
          />
          <meshBasicMaterial color="#90cffb" />
        </mesh>
      )}

      {geometry}
    </group>
  );
}
