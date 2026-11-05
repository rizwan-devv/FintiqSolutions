"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { Group, Mesh, Points } from "three";
import { bank3d } from "@/components/three/palette";

type NodeDef = {
  id: string;
  position: [number, number, number];
  accent?: string;
  size?: number;
};

const NODES: NodeDef[] = [
  { id: "core", position: [0, 0.15, 0], accent: bank3d.gold, size: 0.32 },
  { id: "cms", position: [-1.7, 0.95, 0.45], size: 0.19 },
  { id: "pg", position: [1.65, 0.8, 0.4], size: 0.19 },
  { id: "wallet", position: [-1.45, -0.9, 0.6], size: 0.18 },
  { id: "cash", position: [1.5, -0.75, 0.5], size: 0.18 },
  { id: "los", position: [-0.15, 1.45, -0.35], size: 0.17 },
  { id: "atm", position: [0.4, -1.35, 0.25], size: 0.17 },
  { id: "mb", position: [-2.25, 0.1, -0.25], size: 0.16 },
  { id: "ib", position: [2.2, 0.05, -0.2], size: 0.16 },
  { id: "kyc", position: [0.95, 1.2, 0.75], accent: bank3d.tealSoft, size: 0.15 },
];

const EDGES: [string, string][] = [
  ["core", "cms"],
  ["core", "pg"],
  ["core", "wallet"],
  ["core", "cash"],
  ["core", "los"],
  ["core", "atm"],
  ["cms", "mb"],
  ["pg", "ib"],
  ["wallet", "mb"],
  ["cash", "ib"],
  ["los", "kyc"],
  ["atm", "cms"],
  ["pg", "kyc"],
];

function GraphNode({ node, pulse }: { node: NodeDef; pulse: number }) {
  const mesh = useRef<Mesh>(null);
  const halo = useRef<Mesh>(null);
  const color = node.accent ?? bank3d.teal;
  const size = node.size ?? 0.16;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      const s = 1 + Math.sin(t * 1.8 + pulse) * 0.08;
      mesh.current.scale.setScalar(s);
      mesh.current.rotation.y = t * 0.35 + pulse;
      mesh.current.rotation.x = t * 0.2;
    }
    if (halo.current) {
      const h = 1.4 + Math.sin(t * 2.2 + pulse) * 0.2;
      halo.current.scale.setScalar(h);
      const mat = halo.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.08 + Math.sin(t * 2 + pulse) * 0.04;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.45}>
      <group position={node.position}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[size, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.15}
            metalness={0.35}
            roughness={0.22}
            toneMapped={false}
          />
        </mesh>
        <mesh ref={halo}>
          <sphereGeometry args={[size * 2.1, 24, 24]} />
          <meshBasicMaterial color={color} transparent opacity={0.18} depthWrite={false} />
        </mesh>
        <mesh scale={1.85}>
          <icosahedronGeometry args={[size, 0]} />
          <meshBasicMaterial color={color} transparent opacity={0.28} wireframe />
        </mesh>
      </group>
    </Float>
  );
}

function DataPacket({
  from,
  to,
  speed,
  offset,
}: {
  from: [number, number, number];
  to: [number, number, number];
  speed: number;
  offset: number;
}) {
  const ref = useRef<Mesh>(null);
  const a = useMemo(() => new THREE.Vector3(...from), [from]);
  const b = useMemo(() => new THREE.Vector3(...to), [to]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime * speed + offset) % 1;
    ref.current.position.lerpVectors(a, b, t);
    const s = 0.7 + Math.sin(t * Math.PI) * 0.6;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshStandardMaterial
        color={bank3d.tealSoft}
        emissive={bank3d.teal}
        emissiveIntensity={1.2}
        toneMapped={false}
      />
    </mesh>
  );
}

function ParticleField() {
  const ref = useRef<Points>(null);
  const geometry = useMemo(() => {
    const n = 220;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.032}
        color={bank3d.tealSoft}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function OrbitRings() {
  const g = useRef<Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    g.current.rotation.z = t * 0.15;
    g.current.rotation.x = 0.55 + Math.sin(t * 0.2) * 0.08;
  });
  return (
    <group ref={g} position={[0, 0.1, 0]}>
      <mesh>
        <torusGeometry args={[2.15, 0.012, 12, 120]} />
        <meshBasicMaterial color={bank3d.teal} transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.4, 0]}>
        <torusGeometry args={[2.55, 0.012, 12, 120]} />
        <meshBasicMaterial color={bank3d.gold} transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[1.1, -0.5, 0.3]}>
        <torusGeometry args={[1.75, 0.01, 12, 100]} />
        <meshBasicMaterial color={bank3d.tealSoft} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export function NodeGraphScene({
  mouse = [0, 0],
  intensify = 1,
}: {
  mouse?: [number, number];
  intensify?: number;
}) {
  const root = useRef<Group>(null);
  const byId = useMemo(() => Object.fromEntries(NODES.map((n) => [n.id, n])), []);

  const lines = useMemo(
    () =>
      EDGES.map(([a, b]) => {
        const na = byId[a];
        const nb = byId[b];
        return {
          key: `${a}-${b}`,
          from: na.position,
          to: nb.position,
          points: [na.position, nb.position] as [number, number, number][],
        };
      }),
    [byId],
  );

  useFrame((state) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;
    root.current.rotation.y = t * 0.14 * intensify + mouse[0] * 0.45;
    root.current.rotation.x = Math.sin(t * 0.22) * 0.1 + mouse[1] * 0.32;
    root.current.position.y = Math.sin(t * 0.5) * 0.06;
  });

  return (
    <group ref={root} scale={1.12}>
      <ParticleField />
      <OrbitRings />
      <Sparkles
        count={48}
        scale={[5.5, 3.5, 4]}
        size={2.5}
        speed={0.35}
        opacity={0.55}
        color={bank3d.tealSoft}
      />

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.65, 0]}>
        <ringGeometry args={[1.9, 2.15, 64]} />
        <meshBasicMaterial color={bank3d.line} transparent opacity={0.2} />
      </mesh>

      {lines.map((line) => (
        <group key={line.key}>
          <Line points={line.points} color={bank3d.tealSoft} lineWidth={1.6} transparent opacity={0.62} />
          <DataPacket
            from={line.from}
            to={line.to}
            speed={0.22 + (line.key.length % 5) * 0.04}
            offset={line.key.length * 0.07}
          />
          <DataPacket
            from={line.to}
            to={line.from}
            speed={0.18 + (line.key.length % 4) * 0.03}
            offset={line.key.length * 0.11 + 0.4}
          />
        </group>
      ))}

      {NODES.map((node, i) => (
        <GraphNode key={node.id} node={node} pulse={i * 0.7} />
      ))}
    </group>
  );
}
