"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * One global reveal driver. Any element with [data-reveal] starts hidden (set
 * in JS, so no-JS/reduced-motion users still see everything) and slaps into
 * place when scrolled near. Optional data-reveal-rotate adds a zine-ish tilt.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const triggers: ScrollTrigger[] = [];
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");

    els.forEach((el) => {
      const delay = parseFloat(el.dataset.revealDelay || "0");
      const rot = parseFloat(el.dataset.revealRotate || "0");
      gsap.set(el, { opacity: 0, y: 40, rotateZ: rot });
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 86%",
          once: true,
          onEnter: () =>
            gsap.to(el, {
              opacity: 1,
              y: 0,
              rotateZ: 0,
              duration: 0.7,
              delay,
              ease: "power3.out",
            }),
        }),
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return null;
}
