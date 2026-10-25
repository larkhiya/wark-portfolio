"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { heroState } from "@/lib/signals";
import { site } from "@/lib/content";
import styles from "./Hero.module.css";

// three.js stays out of the initial bundle — hydrates after first paint.
const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false });

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const canvasWrap = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(r);

    if (r) {
      heroState.progress = 0.62; // show the book already open
      return;
    }

    const st = ScrollTrigger.create({
      trigger: section.current!,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        heroState.progress = self.progress;
        const tt = clamp01(self.progress / 0.16);
        gsap.set(title.current, { autoAlpha: 1 - tt, y: -50 * tt });
        const fade = clamp01((self.progress - 0.9) / 0.1);
        gsap.set(canvasWrap.current, { autoAlpha: 1 - fade });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={section}
      className={`${styles.hero} ${reduced ? styles.reduced : ""}`}
      aria-label="Intro"
    >
      <div className={styles.stage}>
        <div ref={canvasWrap} className={styles.canvasWrap}>
          <HeroCanvas />
        </div>
        <div ref={title} className={styles.title}>
          <div className={styles.bottom}>
            <p className={styles.role}>{site.role}</p>
            <p className={styles.hint}>scroll to open the issue ↓</p>
          </div>
        </div>
      </div>
    </section>
  );
}
