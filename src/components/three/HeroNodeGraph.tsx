"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { NodeGraphScene } from "@/components/three/NodeGraphScene";
import { bank3d } from "@/components/three/palette";

type HeroNodeGraphProps = {
  className?: string;
};

export function HeroNodeGraph({ className = "" }: HeroNodeGraphProps) {
  const [mouse, setMouse] = useState<[number, number]>([0, 0]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMouse([x, -y]);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  if (!ready) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <Canvas
        dpr={[1, 1.85]}
        camera={{ position: [0, 0.2, 4.2], fov: 46 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <fog attach="fog" args={["#050f1c", 8, 16]} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 6, 3]} intensity={1.45} color="#dfe9f5" />
        <pointLight position={[-3, 1.5, 2]} intensity={2.2} color={bank3d.teal} />
        <pointLight position={[3.2, -1.2, 1.2]} intensity={1.2} color={bank3d.gold} />
        <pointLight position={[0, 2.5, -1]} intensity={0.8} color={bank3d.tealSoft} />
        <group position={[1.55, 0.05, 0]} scale={1.35}>
          <NodeGraphScene mouse={mouse} intensify={1.2} />
        </group>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
