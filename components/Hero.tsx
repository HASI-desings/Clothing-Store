"use client";

import { useEffect, useRef } from "react";
import { Garment } from "./Garment";
import { LatticeLight } from "./LatticeLight";
import { TransitionLink } from "./TransitionLink";
import styles from "./Hero.module.css";

/* The entrance: one garment seen through a pattern-piece cut, with light
   drifting through a jali. On scroll the cut opens wider and the headline
   eases from condensed (structure) toward wider (expression). */

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height * 0.7)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={root} className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={`notation ${styles.now}`}>
            <span className={styles.notch} aria-hidden="true" />
            Now showing: The Courtyard Edit, winter 2026
          </p>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.line}><span>Style isn&apos;t</span></span>
            <span className={styles.line}><span>put on.</span></span>
            <span className={styles.line}><span className={styles.built}>It&apos;s built.</span></span>
          </h1>
          <p className={styles.lede}>
            Kurtas, shirts and waistcoats shown the way a tailor sees them: the cloth, the cut, the way the pieces join.
          </p>
          <div className={styles.actions}>
            <TransitionLink href="#exhibition" className="btn">Enter the exhibition</TransitionLink>
            <TransitionLink href="#studio" className="link-cut">Build a look in the Studio</TransitionLink>
          </div>
        </div>

        <figure className={styles.figure}>
          <div className={styles.cut}>
            <div className={styles.cloth}>
              <LatticeLight cell={46} />
              <Garment kind="kurta" colour="#2A3140" className={styles.garment} title="Band-collar kurta in indigo khaddar" />
            </div>
          </div>
          <svg className={styles.outline} viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-2 22.5 Q24 21 28 -2 L86 6 Q76 30 102 45 L99 127 L-2 127 Z" vectorEffect="non-scaling-stroke" />
          </svg>
          <figcaption className={styles.caption}>
            <span className="notation">Front / cut 2 / grain: warp</span>
            <span>Band-collar kurta, indigo khaddar. Rs 8,450</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
