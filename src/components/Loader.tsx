"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/lib/content";
import styles from "./Loader.module.css";

/**
 * On-theme "photocopier" loader: a red scan-line sweeps the newsprint field
 * while a counter fills, then the whole panel slides up to reveal the hero.
 * Counter holds at 90% until the window `load` event fires, so it never lies.
 *
 * NOTE: this is a hand-built loader that fully matches the palette. To swap in
 * a bespoke Lottie later, drop a `.lottie` file in /public and render
 * <DotLottieReact src="/loader.lottie" autoplay loop /> inside `.inner`
 * (the @lottiefiles/dotlottie-react package is already installed).
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo(0, 0);

    const start = performance.now();
    const DUR = reduced ? 350 : 1500;
    let loaded = document.readyState === "complete";
    let frame = 0;
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DUR);
      const eased = 1 - Math.pow(1 - t, 3);
      const target = loaded ? 100 : 92;
      setPct(Math.floor(eased * target));
      if (t < 1 || !loaded) {
        frame = requestAnimationFrame(tick);
      } else {
        setPct(100);
        exit(reduced);
      }
    };
    frame = requestAnimationFrame(tick);

    function exit(r: boolean) {
      const el = root.current;
      if (!el) return setDone(true);
      if (r) {
        gsap.to(el, { autoAlpha: 0, duration: 0.3, onComplete: () => setDone(true) });
        return;
      }
      gsap.to(el, {
        yPercent: -100,
        duration: 0.95,
        delay: 0.2,
        ease: "power4.inOut",
        onComplete: () => setDone(true),
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (done) return null;

  return (
    <div className={styles.loader} ref={root} role="progressbar" aria-label="Loading" aria-valuenow={pct}>
      <div className={styles.scan} />
      <div className={styles.inner}>
        <span className={styles.meta}>
          {site.name} — {site.issue}
        </span>
        <span className={styles.word}>Loading</span>
        <div className={styles.track}>
          <span className={styles.bar} style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
        <span className={styles.count}>{String(pct).padStart(3, "0")}%</span>
      </div>
    </div>
  );
}
