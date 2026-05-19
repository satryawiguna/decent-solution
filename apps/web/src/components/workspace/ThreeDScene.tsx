"use client";

import { useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import { useWorkspaceStore } from "@/application/store";
import ThreeDItem from "./ThreeDItem";

// Converts 3D floor position → canvas pixel coords (inverse of ThreeDItem mapping)
const SCALE = 0.04;
const OFFSET = 200;
function toCanvas(v: number, axis: "x" | "z"): number {
  return axis === "x" ? v / SCALE + OFFSET : -(v / SCALE) + OFFSET;
}

export default function ThreeDScene() {
  const items = useWorkspaceStore((s) => s.items);
  const moveItem = useWorkspaceStore((s) => s.moveItem);

  const orbitRef = useRef<any>(null);

  const [dragging, setDragging] = useState<{
    instanceId: string;
    offsetX: number;
    offsetZ: number;
  } | null>(null);

  const handleDragStart = useCallback(
    (instanceId: string, offsetX: number, offsetZ: number) => {
      setDragging({ instanceId, offsetX, offsetZ });
      if (orbitRef.current) orbitRef.current.enabled = false;
    },
    [],
  );

  const handleFloorPointerMove = useCallback(
    (e: { point: { x: number; z: number }; stopPropagation: () => void }) => {
      if (!dragging) return;
      e.stopPropagation();
      const newX = toCanvas(e.point.x - dragging.offsetX, "x");
      const newY = toCanvas(e.point.z - dragging.offsetZ, "z");
      moveItem(dragging.instanceId, Math.max(0, newX), Math.max(0, newY));
    },
    [dragging, moveItem],
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
    if (orbitRef.current) orbitRef.current.enabled = true;
  }, []);

  return (
    <div
      className="h-full w-full"
      style={{ cursor: dragging ? "grabbing" : "default" }}
    >
      <Canvas
        camera={{ position: [10, 8, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "#0f1522" }}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 15, 5]} intensity={0.8} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.3} />

        {/* Environment */}
        <Environment preset="city" />

        {/* Floor */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          receiveShadow
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#1a2335" />
        </mesh>

        {/* Invisible drag-tracking plane (sits just above floor) */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.001, 0]}
          onPointerMove={handleFloorPointerMove}
          onPointerUp={handlePointerUp}
        >
          <planeGeometry args={[200, 200]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* Grid */}
        <Grid
          position={[0, 0, 0]}
          args={[30, 30]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#334155"
          sectionSize={5}
          sectionThickness={1.5}
          sectionColor="#475569"
          fadeDistance={25}
          followCamera={false}
        />

        {/* Furniture items */}
        {items.map((item) => (
          <ThreeDItem
            key={item.instanceId}
            item={item}
            onDragStart={handleDragStart}
            isDragging={dragging?.instanceId === item.instanceId}
          />
        ))}

        {/* Controls */}
        <OrbitControls
          ref={orbitRef}
          enableDamping
          dampingFactor={0.1}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={3}
          maxDistance={20}
        />
      </Canvas>

      {/* Hint overlay */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-brand-950/80 px-4 py-2 text-xs text-brand-400 backdrop-blur-sm">
        {dragging ? "Release to place" : "Drag items · Orbit · Scroll to zoom"}
      </div>
    </div>
  );
}
