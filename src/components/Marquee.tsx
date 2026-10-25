"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./Marquee.module.css";

/**
 * Infinite marquee whose speed and direction react to scroll velocity, plus a
 * little skew while scrolling — the classic ambient awwwards ticker. Content is
 * duplicated so the loop is seamless. Pauses under reduced motion.
 */
export default function Marquee({ items, variant }: { items: string[]; variant?: "red" }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    const wrap = root.current;
    if (!el || !wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const half = el.scrollWidth / 2;
    const duration = Math.max(14, half / 90);
    const tween = gsap.to(el, { x: -half, duration, ease: "none", repeat: -1 });

    if (reduced) {
      tween.pause(0);
      return () => void tween.kill();
    }

    let dir = 1;
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity();
        if (v) dir = v < 0 ? -1 : 1;
        const boost = 1 + Math.min(Math.abs(v) / 350, 5);
        gsap.to(tween, { timeScale: dir * boost, duration: 0.3, overwrite: true });
        gsap.to(wrap, { skewX: gsap.utils.clamp(-10, 10, -v / 180), duration: 0.3, overwrite: true });
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, []);

  const strip = items.flatMap((t, i) => [
    <span key={`i${i}`} className={styles.item}>{t}</span>,
    <span key={`s${i}`} className={`${styles.item} ${styles.sep}`}>✦</span>,
  ]);

  return (
    <div ref={root} className={`${styles.marquee} ${variant === "red" ? styles.red : ""}`} aria-hidden>
      <div ref={track} className={styles.track}>
        {strip}
        {strip}
      </div>
    </div>
  );
}
