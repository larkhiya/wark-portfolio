// Single place that registers GSAP plugins. Importing from here guarantees
// ScrollTrigger is registered exactly once, on the client only.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
