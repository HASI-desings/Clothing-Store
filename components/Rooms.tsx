"use client";

import { useEffect, useRef } from "react";
import { rooms } from "@/lib/catalogue";
import { Garment } from "./Garment";
import { IconArrow } from "./Icons";
import { TransitionLink } from "./TransitionLink";
import { useAssemble } from "./useAssemble";
import styles from "./Rooms.module.css";

/* Other rooms of the exhibition, each with its own light. A horizontal row
   you can scroll, swipe, drag or step through with the arrow buttons. */

export function Rooms() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  useAssemble(root);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  // Cards off-screen to the right would never intersect vertically, so the
  // whole row assembles together (staggered) once the track comes into view.
  useEffect(() => {
    const t = track.current;
    if (!t || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        t.querySelectorAll("[data-assemble]").forEach((li) => li.classList.add("is-in"));
        io.disconnect();
      },
      { threshold: 0.1 },
    );
    io.observe(t);
    return () => io.disconnect();
  }, []);

  const step = (d: number) => {
    const t = track.current;
    if (!t) return;
    const card = t.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 24 : 320;
    t.scrollBy({ left: d * w, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section ref={root} id="rooms" className={styles.section} aria-labelledby="rooms-title">
      <div className={`container ${styles.head}`}>
        <div>
          <p className="notation" style={{ color: "var(--color-accent)" }} data-assemble>Rooms</p>
          <h2 id="rooms-title" className="h-section" data-assemble style={{ "--ad": "80ms" } as React.CSSProperties}>
            Every room has its own light
          </h2>
        </div>
        <div className={styles.controls}>
          <button type="button" className={styles.ctrl} onClick={() => step(-1)} aria-label="Previous room">
            <IconArrow dir="left" />
          </button>
          <button type="button" className={styles.ctrl} onClick={() => step(1)} aria-label="Next room">
            <IconArrow />
          </button>
        </div>
      </div>
      <ul
        ref={track}
        className={styles.track}
        aria-label="Rooms"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current, t = track.current;
          if (!d || !t) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 4) {
            d.moved = true;
            t.dataset.dragging = "true";
          }
          t.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => {
          if (track.current) delete track.current.dataset.dragging;
          setTimeout(() => (drag.current = null), 0);
        }}
        onPointerLeave={() => {
          if (track.current) delete track.current.dataset.dragging;
          drag.current = null;
        }}
        onClickCapture={(e) => {
          if (drag.current?.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {rooms.map((r, i) => (
          <li key={r.slug} className={styles.room} data-assemble style={{ "--ad": `${i * 80}ms`, "--ax": "40px", "--ay": "0px" } as React.CSSProperties}>
            <TransitionLink href={`/collections/${r.slug}`} className={styles.link} draggable={false}>
              <span className={styles.window} style={{ background: r.light }}>
                <span className={styles.beam} aria-hidden="true" />
                <Garment kind={r.kind} colour={r.hex} className={styles.garment} />
              </span>
              <span className={styles.meta}>
                <span className={styles.name}>{r.name}</span>
                <span className={styles.count}>{r.pieces} pieces</span>
              </span>
              <span className={styles.line}>{r.line}</span>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
