"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Billboard, Html } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  coreFragment,
  coreVertex,
  glowFragment,
  glowVertex,
  pointsFragment,
  pointsVertex,
} from "./shaders";

export type NucleusNode = { slug: string; code: string; name: string; hue: string };

type Props = {
  nodes: NucleusNode[];
  reducedMotion: boolean;
  onSelect: (slug: string) => void;
};

const NAVY = new THREE.Color("#133360");
const ORANGE = new THREE.Color("#FC5E02");
const AMBER = new THREE.Color("#FDB022");
const MIST = new THREE.Color("#DFE6ED");

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);

/** Deterministic pseudo-random so the composition is identical on every visit. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Core({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.1 },
      uNavy: { value: NAVY },
      uOrange: { value: ORANGE },
      uAmber: { value: AMBER },
    }),
    [],
  );
  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    if (mat.current) mat.current.uniforms.uTime.value = reduced ? 4 : t;
    const s = reduced ? 1 : easeOutExpo(clamp01(t / 1.6));
    mesh.current?.scale.setScalar(Math.max(s, 0.001));
    if (mesh.current && !reduced) mesh.current.rotation.y += dt * 0.08;
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.05, 48]} />
      <shaderMaterial ref={mat} vertexShader={coreVertex} fragmentShader={coreFragment} uniforms={uniforms} />
    </mesh>
  );
}

/** Faint geodesic lattice around the core: the "structure" around the molten data. */
function Lattice({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.LineSegments>(null);
  const geo = useMemo(() => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.42, 1)), []);
  useFrame(({ clock }, dt) => {
    if (!ref.current) return;
    const s = reduced ? 1 : easeOutExpo(clamp01((clock.elapsedTime - 0.2) / 1.8));
    ref.current.scale.setScalar(Math.max(s, 0.001));
    if (!reduced) {
      ref.current.rotation.y -= dt * 0.05;
      ref.current.rotation.x += dt * 0.02;
    }
  });
  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color={MIST} transparent opacity={0.16} depthWrite={false} />
    </lineSegments>
  );
}

function Glow() {
  const uniforms = useMemo(() => ({ uColor: { value: ORANGE }, uStrength: { value: 0.55 } }), []);
  return (
    <Billboard>
      <mesh renderOrder={-1}>
        <planeGeometry args={[6.5, 6.5]} />
        <shaderMaterial
          vertexShader={glowVertex}
          fragmentShader={glowFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Billboard>
  );
}

function DataField({ reduced, count }: { reduced: boolean; count: number }) {
  const { geometry, uniforms } = useMemo(() => {
    const r = rng(7);
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const u = r() * 2 - 1;
      const th = r() * Math.PI * 2;
      const rad = 1.9 + Math.pow(r(), 1.6) * 5.5;
      const sq = Math.sqrt(1 - u * u);
      pos[i * 3] = Math.cos(th) * sq * rad;
      pos[i * 3 + 1] = u * rad * 0.75;
      pos[i * 3 + 2] = Math.sin(th) * sq * rad;
      seed[i] = r();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return {
      geometry: g,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uColor: { value: MIST },
      },
    };
  }, [count]);
  const dpr = useThree((s) => s.viewport.dpr);
  const mat = useRef<THREE.ShaderMaterial>(null);
  useFrame(({ clock }) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = reduced ? 0 : clock.elapsedTime;
    mat.current.uniforms.uPixelRatio.value = dpr;
  });
  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={mat}
        vertexShader={pointsVertex}
        fragmentShader={pointsFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Orbit({
  node,
  index,
  total,
  reduced,
  active,
  setActive,
  onSelect,
}: {
  node: NucleusNode;
  index: number;
  total: number;
  reduced: boolean;
  active: string | null;
  setActive: (s: string | null) => void;
  onSelect: (s: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.LineLoop>(null);
  const dot = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);

  const { radius, tilt, phase, speed, ringGeo } = useMemo(() => {
    const r = rng(101 + index * 37);
    const radius = 1.75 + index * 0.36;
    const tilt = new THREE.Euler((r() - 0.5) * 1.5, (r() - 0.5) * 0.6, (r() - 0.5) * 1.1);
    const phase = (index / total) * Math.PI * 2;
    const speed = 0.11 - index * 0.008;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 160; i++) {
      const a = (i / 160) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
    return { radius, tilt, phase, speed, ringGeo };
  }, [index, total]);

  const color = useMemo(() => new THREE.Color(node.hue), [node.hue]);
  const isActive = active === node.slug;
  const dimmed = active !== null && !isActive;

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const intro = reduced ? 1 : easeOutExpo(clamp01((t - 0.35 - index * 0.11) / 1.5));
    if (group.current) group.current.scale.setScalar(Math.max(intro, 0.001));
    if (dot.current) {
      // Pause the node under the pointer so it can be clicked.
      const a = phase + (reduced ? 0 : t * speed);
      if (!isActive) dot.current.userData.a = a;
      const angle = isActive ? (dot.current.userData.a as number) : a;
      dot.current.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      const target = isActive ? 1.9 : 1;
      const s = THREE.MathUtils.damp(dot.current.scale.x, target, 10, dt);
      dot.current.scale.setScalar(s);
      halo.current?.position.copy(dot.current.position);
      halo.current?.scale.setScalar(isActive ? s : s * (1 + 0.12 * Math.sin(t * 3 + index)));
    }
    if (ring.current) {
      const m = ring.current.material as THREE.LineBasicMaterial;
      const target = isActive ? 0.95 : dimmed ? 0.08 : 0.26;
      m.opacity = THREE.MathUtils.damp(m.opacity, target * intro, 8, dt);
    }
  });

  const [flip, setFlip] = useState(false);
  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    // Put the label on the left when the node is near the right edge of the screen.
    setFlip(e.point.clone().project(e.camera).x > 0.35);
    setActive(node.slug);
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    setActive(null);
    document.body.style.cursor = "";
  };

  return (
    <group ref={group} rotation={tilt}>
      <lineLoop ref={ring} geometry={ringGeo}>
        <lineBasicMaterial color={isActive ? color : MIST} transparent opacity={0} depthWrite={false} />
      </lineLoop>
      <mesh ref={dot}>
        <sphereGeometry args={[0.075, 24, 24]} />
        <meshBasicMaterial color={color} />
        {isActive && (
          <Html zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
            <div className="node-label" data-flip={flip}>
              <small>{node.code}</small>
              {node.name}
            </div>
          </Html>
        )}
      </mesh>
      <mesh
        ref={halo}
        onPointerOver={over}
        onPointerOut={out}
        onClick={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "";
          onSelect(node.slug);
        }}
      >
        {/* enlarged hit target + soft halo */}
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isActive ? 0.35 : 0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function Rig({ children, reduced, frozen }: { children: React.ReactNode; reduced: boolean; frozen: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const wide = size.width >= 900;
  // On wide screens the nucleus sits right of the headline; on narrow screens it rises above it.
  const x = wide ? viewport.width * 0.24 : 0;
  const y = wide ? 0.15 : viewport.height * 0.14;
  const scale = wide ? 1 : Math.min(1, viewport.width / 7.2);

  useFrame(({ pointer }, dt) => {
    // Hold still while a node is hovered so it stays under the pointer.
    if (!group.current || frozen) return;
    const tx = reduced ? 0.35 : 0.35 + pointer.y * -0.18;
    const ty = reduced ? 0 : pointer.x * 0.35;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, tx, 3, dt);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, ty, 3, dt);
  });

  return (
    <group position={[x, y, 0]} scale={scale}>
      <group ref={group}>{children}</group>
    </group>
  );
}

export default function NucleusScene({ nodes, reducedMotion, onSelect }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const particles = typeof window !== "undefined" && window.innerWidth < 700 ? 1400 : 3200;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onPointerMissed={() => setActive(null)}
      aria-hidden
    >
      <Rig reduced={reducedMotion} frozen={active !== null}>
        <Glow />
        <Core reduced={reducedMotion} />
        <Lattice reduced={reducedMotion} />
        <DataField reduced={reducedMotion} count={particles} />
        {nodes.map((n, i) => (
          <Orbit
            key={n.slug}
            node={n}
            index={i}
            total={nodes.length}
            reduced={reducedMotion}
            active={active}
            setActive={setActive}
            onSelect={onSelect}
          />
        ))}
      </Rig>
    </Canvas>
  );
}
