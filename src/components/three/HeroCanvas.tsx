"use client";

import { Canvas } from "@react-three/fiber";
import Booklet from "./Booklet";

/**
 * Transparent R3F canvas so the newsprint page shows through behind the book.
 * Loaded via next/dynamic (ssr:false) from the Hero, so none of three.js ships
 * in the initial HTML — it hydrates after first paint.
 */
export default function HeroCanvas() {
  return (
    <Canvas
      flat
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.25, 6], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 5, 4]} intensity={0.9} />
      <directionalLight position={[-4, 2, -3]} intensity={0.3} />
      <Booklet />
    </Canvas>
  );
}
