"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { Group, Mesh, Points } from "three";
import { useReducedMotion } from "motion/react";
import { bank3d } from "@/components/three/palette";

function RibbonHelix({ progress }: { progress: number }) {
  const root = useRef<Group>(null);
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);

  const nodes = useMemo(() => {
    const list: { pos: [number, number, number]; color: string; size: number }[] = [];
    for (let i = 0; i < 14; i++) {
      const t = (i / 14) * Math.PI * 2;
      const r = 1.55;
      list.push({
        pos: [Math.cos(t) * r, Math.sin(t * 2) * 0.35, Math.sin(t) * r * 0.55],
        color: i % 3 === 0 ? bank3d.gold : bank3d.teal,
        size: 0.09 + (i % 4) * 0.02,
      });
    }
    return list;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y = t * 0.25 + progress * 0.8;
      root.current.rotation.x = 0.35 + Math.sin(t * 0.3) * 0.08;
      root.current.position.x = Math.sin(t * 0.2) * 0.15;
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.5;
    if (ringB.current) ringB.current.rotation.x = t * 0.35;
  });

  return (
    <group ref={root} scale={1.15}>
      <mesh ref={ringA}>
        <torusGeometry args={[1.7, 0.018, 12, 96]} />
        <meshBasicMaterial color={bank3d.teal} transparent opacity={0.45} />
      </mesh>
      <mesh ref={ringB} rotation={[1.1, 0.3, 0]}>
        <torusGeometry args={[2.05, 0.012, 12, 96]} />
        <meshBasicMaterial color={bank3d.gold} transparent opacity={0.32} />
      </mesh>
      <mesh rotation={[0.4, 0.8, 0.2]}>
        <torusGeometry args={[1.35, 0.01, 10, 80]} />
        <meshBasicMaterial color={bank3d.line} transparent opacity={0.4} />
      </mesh>

      {nodes.map((n, i) => (
        <Float key={i} speed={1.3 + (i % 3) * 0.2} floatIntensity={0.4} rotationIntensity={0.3}>
          <mesh position={n.pos}>
            <icosahedronGeometry args={[n.size, 0]} />
            <meshStandardMaterial
              color={n.color}
              emissive={n.color}
              emissiveIntensity={0.7}
              metalness={0.4}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}

      <mesh>
        <icosahedronGeometry args={[0.38, 1]} />
        <meshStandardMaterial
          color={bank3d.gold}
          emissive={bank3d.gold}
          emissiveIntensity={0.75}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      <mesh scale={1.55}>
        <icosahedronGeometry args={[0.38, 0]} />
        <meshBasicMaterial color={bank3d.gold} transparent opacity={0.15} wireframe />
      </mesh>
    </group>
  );
}

function StreamParticles() {
  const ref = useRef<Points>(null);
  const geometry = useMemo(() => {
    const n = 280;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.08;
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += delta * 0.35;
      if (arr[i] > 5) arr[i] = -5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.028}
        color={bank3d.tealSoft}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function RibbonCanvas({ progress, active }: { progress: number; active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      frameloop={active ? "always" : "demand"}
      camera={{ position: [0, 0.15, 4.8], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 2]} intensity={1.35} />
      <pointLight position={[-2, 1, 2]} intensity={2} color={bank3d.teal} />
      <pointLight position={[2, -0.5, 1]} intensity={1} color={bank3d.gold} />
      <StreamParticles />
      <Sparkles count={40} scale={[7, 2.5, 3]} size={2.4} speed={0.45} opacity={0.55} color={bank3d.tealSoft} />
      <RibbonHelix progress={progress} />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}

export function EnergyRibbon() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [armed, setArmed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

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
      { rootMargin: "8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const raw = 1 - (rect.top + rect.height * 0.4) / (view + rect.height * 0.4);
      setProgress(Math.min(1, Math.max(0, raw)));
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
      className="relative overflow-hidden border-y border-white/8 bg-[#06101c] text-white"
      aria-label="Live transaction fabric"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,176,164,0.14),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-teal">Live fabric</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
            Always-on rails.
            <span className="mt-1 block text-teal/90">Always moving.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
            Auth, clearing, and channel traffic orbit one core — designed to feel premium, run
            regulated, and stay uniquely FintiQ.
          </p>
        </div>
        <div className="relative h-[38vh] min-h-[260px] lg:col-span-8 lg:h-[42vh]">
          {show3d ? (
            <RibbonCanvas progress={progress} active={visible} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="h-40 w-40 rounded-full border border-teal/30 bg-teal/5 shadow-[0_0_60px_rgba(0,176,164,0.2)]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
