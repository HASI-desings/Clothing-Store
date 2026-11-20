"use client";

import { useEffect, useRef, useState } from "react";
import type { GarmentKind } from "@/lib/catalogue";
import { Garment } from "./Garment";
import styles from "./BiasImage.module.css";

/* "Bias cut": a new colourway is revealed by a 38-degree wipe led by a dashed
   seam. The previous layer stays underneath until the wipe finishes. */

export function BiasImage({ kind, colour, label, room }: { kind: GarmentKind; colour: string; label: string; room: string }) {
  const [layers, setLayers] = useState([{ key: 0, colour }]);
  const seam = useRef<HTMLSpanElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const counter = useRef(0);

  useEffect(() => {
    if (colour === layers[layers.length - 1].colour) return;
    counter.current += 1;
    setLayers((l) => [...l.slice(-1), { key: counter.current, colour }]);
  }, [colour, layers]);

  useEffect(() => {
    if (layers.length < 2) return;
    const el = top.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !el.animate || reduce) {
      setLayers((l) => l.slice(-1));
      return;
    }
    const a = el.animate(
      [{ clipPath: "polygon(0 0, 0 0, -40% 100%, -40% 100%)" }, { clipPath: "polygon(0 0, 140% 0, 100% 100%, -40% 100%)" }],
      { duration: 560, easing: "cubic-bezier(.2,.7,.2,1)" },
    );
    seam.current?.animate(
      [{ left: "-20%", opacity: 0 }, { opacity: 0.9, offset: 0.15 }, { opacity: 0.9, offset: 0.85 }, { left: "112%", opacity: 0 }],
      { duration: 560, easing: "cubic-bezier(.2,.7,.2,1)" },
    );
    a.onfinish = () => setLayers((l) => l.slice(-1));
    return () => a.cancel();
  }, [layers]);

  return (
    <div className={styles.frame} style={{ background: room }}>
      {layers.map((l, i) => (
        <div key={l.key} ref={i === layers.length - 1 ? top : undefined} className={styles.layer} style={{ background: room }}>
          <Garment kind={kind} colour={l.colour} className={styles.garment} />
        </div>
      ))}
      <span ref={seam} className={styles.seam} aria-hidden="true" />
      <span className={`notation ${styles.label}`} aria-live="polite">{label}</span>
    </div>
  );
}
