"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
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

function Field({ count }: { count: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  const [positions, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      sd[i] = Math.random();
    }
    return [pos, sd];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector3(0, 0, 0) },
      uSize: { value: 26 },
      uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.75) : 1 },
      uColor: { value: new THREE.Color("#c6f24e") },
    }),
    [],
  );

  // reusable vectors (avoid per-frame allocation)
  const ndc = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.05);

    // project cursor onto the z = 0 plane
    ndc.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
    dir.copy(ndc).sub(state.camera.position).normalize();
    const dist = -state.camera.position.z / dir.z;
    target.copy(state.camera.position).addScaledVector(dir, dist);
    uniforms.uPointer.value.lerp(target, 0.08);

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

export function ParticleField() {
  const count = useMemo(() => {
    if (typeof window === "undefined") return 4200;
    const w = window.innerWidth;
    if (w < 640) return 2200;
    if (w < 1024) return 3600;
    return 5200;
  }, []);

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 52 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <Field count={count} />
    </Canvas>
  );
}
