'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import { useWorkspaceStore } from '@/application/store';
import ThreeDItem from './ThreeDItem';

export default function ThreeDScene() {
  const items = useWorkspaceStore((s) => s.items);

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [10, 8, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: '#0f1522' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 15, 5]} intensity={0.8} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.3} />

        {/* Environment */}
        <Environment preset="city" />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#1a2335" />
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
          <ThreeDItem key={item.instanceId} item={item} />
        ))}

        {/* Controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.1}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={3}
          maxDistance={20}
        />
      </Canvas>

      {/* 3D hint overlay */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-brand-950/80 px-4 py-2 text-xs text-brand-400 backdrop-blur-sm">
        Drag to rotate &middot; Scroll to zoom &middot; Right-click to pan
      </div>
    </div>
  );
}
