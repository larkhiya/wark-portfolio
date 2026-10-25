// Module-scoped mutable state shared between the DOM scroll driver (GSAP
// ScrollTrigger) and the R3F render loop (useFrame). Kept outside React so the
// 3D scene can read scroll progress every frame without triggering re-renders.
export const heroState = {
  /** 0 → 1 progress through the pinned hero section. */
  progress: 0,
  /** true when the viewer prefers reduced motion. */
  reduced: false,
};
