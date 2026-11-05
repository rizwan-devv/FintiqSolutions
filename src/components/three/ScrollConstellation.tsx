"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Billboard, Float, Line, Sparkles, Text } from "@react-three/drei";
import * as THREE from "three";
import type { Group, Mesh, Points } from "three";
import { useReducedMotion } from "motion/react";
import { bank3d } from "@/components/three/palette";

const PLATFORMS = [
  { id: "CMS", pos: [-1.8, 0.9, 0.2] as [number, number, number] },
  { id: "Gateway", pos: [1.7, 0.85, 0.15] as [number, number, number] },
  { id: "Wallet", pos: [-1.5, -0.75, 0.4] as [number, number, number] },
  { id: "Cash", pos: [1.45, -0.65, 0.35] as [number, number, number] },
  { id: "LOS", pos: [-0.15, 1.35, -0.25] as [number, number, number] },
  { id: "ATM", pos: [0.2, -1.3, 0.1] as [number, number, number] },
  { id: "Mobile", pos: [-2.2, 0.05, -0.15] as [number, number, number] },
  { id: "IB", pos: [2.15, 0.0, -0.1] as [number, number, number] },
  { id: "KYC", pos: [0.85, 1.1, 0.65] as [number, number, number] },
  { id: "Core", pos: [0, 0.1, 0] as [number, number, number], core: true },
];

const LINKS: [number, number][] = [
  [9, 0],
  [9, 1],
  [9, 2],
  [9, 3],
  [9, 4],
  [9, 5],
  [0, 6],
  [1, 7],
  [2, 6],
  [4, 8],
  [1, 8],
];

function PulseNode({
  id,
  pos,
  core,
  progress,
  seed,
  active,
}: {
  id: string;
  pos: [number, number, number];
  core?: boolean;
  progress: number;
  seed: number;
  active: boolean;
}) {
  const mesh = useRef<Mesh>(null);
  const halo = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      const pulse = active ? 0.18 : 0.08;
      const s = 1 + Math.sin(t * 2 + seed) * pulse + progress * 0.06 + (active ? 0.12 : 0);
      mesh.current.scale.setScalar(s);
      mesh.current.rotation.y = t * 0.4 + seed;
    }
    if (halo.current) {
      halo.current.scale.setScalar(1.5 + Math.sin(t * 2.4 + seed) * 0.25 + (active ? 0.35 : 0));
      const mat = halo.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (active ? 0.22 : 0.1) + progress * 0.06 + Math.sin(t * 2 + seed) * 0.03;
    }
  });

  const color = core ? bank3d.gold : active ? bank3d.tealSoft : bank3d.teal;
  const size = core ? 0.28 : 0.15;

  return (
    <Float speed={1.2} floatIntensity={0.35} rotationIntensity={0.18}>
      <group position={pos}>
        <mesh ref={mesh}>
          <octahedronGeometry args={[size, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={core || active ? 1.35 : 0.95}
            metalness={0.35}
            roughness={0.22}
            toneMapped={false}
          />
        </mesh>
        <mesh ref={halo}>
          <sphereGeometry args={[size * 2.2, 20, 20]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} depthWrite={false} />
        </mesh>
        <mesh scale={1.7}>
          <octahedronGeometry args={[size, 0]} />
          <meshBasicMaterial color={color} transparent opacity={0.32} wireframe />
        </mesh>

        <Billboard position={[0, core ? 0.48 : 0.32, 0]} follow>
          <Text
            fontSize={core ? 0.155 : 0.115}
            color={core ? bank3d.gold : "#f2f7fc"}
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.012}
            outlineColor="#050f1c"
            letterSpacing={0.04}
          >
            {id}
          </Text>
        </Billboard>
      </group>
    </Float>
  );
}

function FlowPacket({
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
    ref.current.scale.setScalar(0.65 + Math.sin(t * Math.PI) * 0.7);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 10, 10]} />
      <meshStandardMaterial
        color={bank3d.tealSoft}
        emissive={bank3d.teal}
        emissiveIntensity={1.3}
        toneMapped={false}
      />
    </mesh>
  );
}

function DustField() {
  const ref = useRef<Points>(null);
  const geometry = useMemo(() => {
    const n = 160;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.022}
        color={bank3d.tealSoft}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function OrbitFrame({ progress }: { progress: number }) {
  const g = useRef<Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    g.current.rotation.z = state.clock.elapsedTime * 0.12;
    g.current.rotation.x = 0.5 + progress * 0.25;
  });
  return (
    <group ref={g}>
      <mesh>
        <torusGeometry args={[2.35, 0.01, 10, 100]} />
        <meshBasicMaterial color={bank3d.teal} transparent opacity={0.28 + progress * 0.15} />
      </mesh>
      <mesh rotation={[1.2, 0.5, 0]}>
        <torusGeometry args={[2.7, 0.008, 10, 100]} />
        <meshBasicMaterial color={bank3d.gold} transparent opacity={0.2 + progress * 0.12} />
      </mesh>
    </group>
  );
}

function Constellation({
  progress,
  focusIndex,
}: {
  progress: number;
  focusIndex: number;
}) {
  const root = useRef<Group>(null);

  useFrame((state) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;
    root.current.rotation.y = t * 0.08 + progress * Math.PI * 0.85;
    root.current.rotation.x = -0.12 + progress * 0.42;
    root.current.position.y = Math.sin(t * 0.45) * 0.06;
    const s = 0.92 + progress * 0.28;
    root.current.scale.setScalar(s);
  });

  const lines = useMemo(
    () =>
      LINKS.map(([a, b]) => ({
        key: `${a}-${b}`,
        from: PLATFORMS[a].pos,
        to: PLATFORMS[b].pos,
        points: [PLATFORMS[a].pos, PLATFORMS[b].pos] as [number, number, number][],
      })),
    [],
  );

  return (
    <group ref={root}>
      <DustField />
      <OrbitFrame progress={progress} />
      <Sparkles
        count={36}
        scale={[5, 3.2, 3.5]}
        size={2.2}
        speed={0.4}
        opacity={0.5 + progress * 0.25}
        color={bank3d.tealSoft}
      />

      {lines.map((line, i) => (
        <group key={line.key}>
          <Line
            points={line.points}
            color={bank3d.tealSoft}
            lineWidth={1.25}
            transparent
            opacity={0.42 + progress * 0.3}
          />
          <FlowPacket from={line.from} to={line.to} speed={0.2 + (i % 4) * 0.04} offset={i * 0.09} />
          <FlowPacket
            from={line.to}
            to={line.from}
            speed={0.16 + (i % 3) * 0.03}
            offset={i * 0.13 + 0.35}
          />
        </group>
      ))}

      {PLATFORMS.map((p, i) => (
        <PulseNode
          key={p.id}
          id={p.id}
          pos={p.pos}
          core={p.core}
          progress={progress}
          seed={i * 0.85}
          active={i === focusIndex || Boolean(p.core)}
        />
      ))}
    </group>
  );
}

function ConstellationCanvas({
  progress,
  active,
  focusIndex,
}: {
  progress: number;
  active: boolean;
  focusIndex: number;
}) {
  return (
    <Canvas
      dpr={[1, 1.7]}
      frameloop={active ? "always" : "demand"}
      camera={{ position: [0, 0.2, 5.2], fov: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 2]} intensity={1.45} />
      <pointLight position={[-2, 1, 2]} intensity={1.8} color={bank3d.teal} />
      <pointLight position={[2, -1, 1]} intensity={1} color={bank3d.gold} />
      <Constellation progress={progress} focusIndex={focusIndex} />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}

export function ScrollConstellation() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [armed, setArmed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [focusIndex, setFocusIndex] = useState(9);

  useEffect(() => {
    if (visible) setArmed(true);
  }, [visible]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "10% 0px", threshold: 0.05 },
    );
    io.observe(el);

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const raw = 1 - (rect.top + rect.height * 0.35) / (view + rect.height * 0.35);
      const p = Math.min(1, Math.max(0, raw));
      setProgress(p);
      // Cycle focus through platforms as the section scrolls
      const idx = Math.min(PLATFORMS.length - 1, Math.floor(p * PLATFORMS.length));
      setFocusIndex(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const show3d = !reduce && isDesktop && armed;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-raised text-white"
      aria-label="Platform constellation"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(0,176,164,0.16),transparent_55%)]" />
      <div className="relative mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-12 lg:min-h-[85vh] lg:py-24">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-teal">System map</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl md:leading-[1.05]">
            Platforms that connect —
            <span className="mt-1 block text-teal">not silos.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/70">
            Core banking at the centre. Cards, payments, wallets, cash, lending, ATM, and digital
            channels on one operating graph — the IT fabric behind live journeys.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {PLATFORMS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setFocusIndex(i)}
                className={`rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition ${
                  focusIndex === i || p.core
                    ? "border-teal/50 bg-teal/15 text-teal"
                    : "border-white/12 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white/80"
                }`}
              >
                {p.id}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-[52vh] min-h-[320px] lg:col-span-7 lg:h-[62vh]">
          {show3d ? (
            <ConstellationCanvas progress={progress} active={visible} focusIndex={focusIndex} />
          ) : (
            <div className="flex h-full items-center justify-center rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-8">
              <div className="grid max-w-md grid-cols-2 gap-3 sm:grid-cols-3">
                {PLATFORMS.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-lg border border-white/12 bg-white/[0.04] px-3 py-3 text-center"
                  >
                    <p className="font-display text-sm text-white">{p.id}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-teal/80">
                      {p.core ? "Hub" : "Node"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
