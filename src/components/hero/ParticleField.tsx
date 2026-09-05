"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec3  uPointer;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3  uColor;
  attribute float aSeed;
  varying float vAlpha;
  varying vec3  vColor;

  void main() {
    vec3 p = position;
    float t = uTime * 0.18;

    // organic, agentic drift
    p.x += sin(t + position.y * 0.6 + aSeed * 6.2831) * 0.35;
    p.y += cos(t + position.x * 0.5 + aSeed * 6.2831) * 0.35;
    p.z += sin(t * 0.7 + position.x * 0.3 + aSeed * 3.1415) * 0.5;

    // cursor repulsion in the view plane
    vec2 toP = p.xy - uPointer.xy;
    float d = length(toP);
    float infl = smoothstep(2.3, 0.0, d);
    p.xy += normalize(toP + 0.0001) * infl * 1.15;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = uSize * (0.5 + aSeed) * uPixelRatio * (1.0 + infl * 1.8);
    gl_PointSize = size * (1.0 / -mv.z);

    vAlpha = (0.22 + aSeed * 0.6) + infl * 0.55;
    vColor = mix(uColor, vec3(1.0), step(0.93, aSeed) * 0.85);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying float vAlpha;
  varying vec3  vColor;

  void main() {
    float dd = length(gl_PointCoord - 0.5);
    if (dd > 0.5) discard;
    float a = smoothstep(0.5, 0.05, dd) * vAlpha;
    gl_FragColor = vec4(vColor, a);
  }
`;

// Seeded PRNG (mulberry32): the field is pure for a given count and identical on every load.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Field({ count }: { count: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  // scratch vectors, reused every frame instead of allocated
  const scratch = useRef({ ndc: new THREE.Vector3(), dir: new THREE.Vector3(), target: new THREE.Vector3() });

  const [positions, seeds] = useMemo(() => {
    const random = mulberry32(count);
    const pos = new Float32Array(count * 3);
    const sd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (random() - 0.5) * 24;
      pos[i * 3 + 1] = (random() - 0.5) * 16;
      pos[i * 3 + 2] = (random() - 0.5) * 8 - 1;
      sd[i] = random();
    }
    return [pos, sd];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector3(0, 0, 0) },
      uSize: { value: 26 },
      uPixelRatio: { value: 1 },
      uColor: { value: new THREE.Color("#c6f24e") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const mat = matRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value += Math.min(delta, 0.05);
    mat.uniforms.uPixelRatio.value = state.viewport.dpr;

    // project cursor onto the z = 0 plane
    const { ndc, dir, target } = scratch.current;
    ndc.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
    dir.copy(ndc).sub(state.camera.position).normalize();
    const dist = -state.camera.position.z / dir.z;
    target.copy(state.camera.position).addScaledVector(dir, dist);
    (mat.uniforms.uPointer.value as THREE.Vector3).lerp(target, 0.08);

    if (groupRef.current) {
      groupRef.current.rotation.y += (state.pointer.x * 0.16 - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (-state.pointer.y * 0.1 - groupRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export function ParticleField({
  count,
  eventSource,
}: {
  count: number;
  // The hero <section>; lets r3f track the cursor across the overlays painted on top of the canvas.
  eventSource?: RefObject<HTMLElement | null>;
}) {
  // The loop only runs while the hero is on screen; scrolled past, the GPU rests.
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const el = eventSource?.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, [eventSource]);

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 52 }}
      dpr={[1, 1.75]}
      frameloop={onScreen ? "always" : "never"}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      eventSource={(eventSource ?? undefined) as RefObject<HTMLElement> | undefined}
      eventPrefix="client"
    >
      <Field count={count} />
    </Canvas>
  );
}
