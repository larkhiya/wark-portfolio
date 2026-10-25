"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { heroState } from "@/lib/signals";
import { site } from "@/lib/content";

/* Procedural zine booklet — no model download. Cover and the inside "contents"
   spread are canvas-drawn textures (system fonts, no external fetch). Scroll
   progress opens the front cover around the spine, then dives the whole book
   toward the camera so the right page fills the frame before it hands off. */

const W = 2.1; // page width
const H = 2.8; // page height
const D = 0.05; // board thickness

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function makeTexture(draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void) {
  const c = document.createElement("canvas");
  c.width = 540;
  c.height = 720;
  draw(c.getContext("2d")!, c.width, c.height);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function useCoverTexture() {
  return useMemo(
    () =>
      makeTexture((x, w, h) => {
        x.fillStyle = "#141414";
        x.fillRect(0, 0, w, h);
        x.strokeStyle = "#ede8dc";
        x.lineWidth = 7;
        x.strokeRect(26, 26, w - 52, h - 52);
        x.fillStyle = "#ff2e1f";
        x.fillRect(26, 300, w - 52, 168);
        x.textAlign = "center";
        x.textBaseline = "middle";
        x.fillStyle = "#ede8dc";
        x.font = "900 170px 'Arial Black', Impact, sans-serif";
        x.fillText(site.name.toUpperCase(), w / 2, 200);
        x.fillStyle = "#141414";
        x.font = "bold 50px 'Courier New', monospace";
        x.fillText(site.issue.toUpperCase(), w / 2, 386);
        x.fillStyle = "#ede8dc";
        x.font = "bold 34px 'Courier New', monospace";
        x.fillText(site.role.toUpperCase(), w / 2, 600);
        x.font = "25px 'Courier New', monospace";
        x.fillText("— SCROLL TO OPEN —", w / 2, 652);
      }),
    [],
  );
}

function usePageTexture() {
  return useMemo(
    () =>
      makeTexture((x, w, h) => {
        x.fillStyle = "#f5f2ec";
        x.fillRect(0, 0, w, h);
        x.fillStyle = "#ff2e1f";
        x.fillRect(48, 0, 5, h); // margin rule
        x.textBaseline = "alphabetic";
        x.textAlign = "left";
        x.fillStyle = "#141414";
        x.font = "bold 26px 'Courier New', monospace";
        x.fillText(`${site.issue.toUpperCase()} — ${site.year}`, 80, 110);
        x.font = "900 92px 'Arial Black', Impact, sans-serif";
        x.fillText("CONTENTS", 76, 210);
        const items = ["ABOUT", "SELECTED WORK", "EXPERIENCE", "SKILLS", "CONTACT"];
        x.font = "bold 38px 'Courier New', monospace";
        items.forEach((label, i) => {
          const y = 320 + i * 72;
          x.fillStyle = "#ff2e1f";
          x.fillText(String(i + 1).padStart(2, "0"), 80, y);
          x.fillStyle = "#141414";
          x.fillText(label, 150, y);
        });
        x.font = "900 40px 'Arial Black', Impact, sans-serif";
        x.fillText("KEEP SCROLLING ↓", 80, 690);
      }),
    [],
  );
}

export default function Booklet() {
  const outer = useRef<THREE.Group>(null);
  const front = useRef<THREE.Group>(null);
  const page1 = useRef<THREE.Group>(null);
  const cover = useCoverTexture();
  const page = usePageTexture();
  const { size } = useThree();

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    // keep the book inside the frame on narrow / portrait screens
    const fit = THREE.MathUtils.clamp(size.width / Math.max(1, size.height) / 0.7, 0.52, 1);
    const p = heroState.progress;
    const open = easeInOut(clamp01(p / 0.5));
    const zoom = easeInOut(clamp01((p - 0.45) / 0.55));

    if (front.current)
      front.current.rotation.y = THREE.MathUtils.damp(front.current.rotation.y, -Math.PI * open, 6, d);
    if (page1.current)
      page1.current.rotation.y = THREE.MathUtils.damp(
        page1.current.rotation.y,
        -Math.PI * clamp01((open - 0.15) / 0.85),
        5,
        d,
      );

    if (outer.current) {
      const g = outer.current;
      const tx = THREE.MathUtils.lerp((-W / 2) * fit, 0, open) - zoom * (W / 2) * fit;
      const ty = THREE.MathUtils.lerp(0, -0.1, zoom);
      const tz = THREE.MathUtils.lerp(0, 4.4, zoom);
      const ry = THREE.MathUtils.lerp(-0.45, 0, open);
      const rx = THREE.MathUtils.lerp(0.28, 0.03, open);
      g.position.x = THREE.MathUtils.damp(g.position.x, tx, 6, d);
      g.position.y = THREE.MathUtils.damp(g.position.y, ty, 6, d);
      g.position.z = THREE.MathUtils.damp(g.position.z, tz, 6, d);
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ry, 6, d);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, rx, 6, d);
      g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, fit, 6, d));
      const idle = 1 - clamp01(p / 0.08);
      g.position.y += Math.sin(performance.now() / 900) * 0.045 * idle;
    }
  });

  return (
    <group ref={outer} position={[-W / 2, 0, 0]}>
      {/* back board */}
      <mesh position={[W / 2, 0, -D / 2]}>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial color="#141414" roughness={0.9} />
      </mesh>
      {/* right page — the "contents" spread you dive into */}
      <mesh position={[W / 2, 0, 0.001]}>
        <planeGeometry args={[W - 0.08, H - 0.08]} />
        <meshStandardMaterial map={page} roughness={1} />
      </mesh>
      {/* spine */}
      <mesh position={[0, 0, -D / 2]}>
        <boxGeometry args={[0.08, H, D + 0.02]} />
        <meshStandardMaterial color="#ff2e1f" roughness={0.8} />
      </mesh>

      {/* mid page, flips just behind the cover */}
      <group ref={page1} position={[0, 0, 0.012]}>
        <mesh position={[W / 2, 0, 0]}>
          <planeGeometry args={[W - 0.06, H - 0.06]} />
          <meshStandardMaterial color="#efe9dd" roughness={1} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* front cover, hinged at the spine (x = 0) */}
      <group ref={front} position={[0, 0, 0.03]}>
        <mesh position={[W / 2, 0, 0]}>
          <boxGeometry args={[W, H, D]} />
          <meshStandardMaterial color="#141414" roughness={0.85} />
        </mesh>
        <mesh position={[W / 2, 0, D / 2 + 0.001]}>
          <planeGeometry args={[W, H]} />
          <meshStandardMaterial map={cover} roughness={0.95} />
        </mesh>
        <mesh position={[W / 2, 0, -D / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[W, H]} />
          <meshStandardMaterial color="#efe9dd" roughness={1} />
        </mesh>
      </group>
    </group>
  );
}
