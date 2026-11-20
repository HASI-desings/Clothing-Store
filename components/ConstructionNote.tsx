"use client";

import { useRef } from "react";
import { TransitionLink } from "./TransitionLink";
import { useAssemble } from "./useAssemble";
import styles from "./ConstructionNote.module.css";

/* How a piece is made: the kurta's pattern pieces draw themselves in like
   pencil on paper, then the service line. */

const pieces = [
  { id: "front", label: "Front / fold", d: "M20 40 Q60 38 64 10 L130 22 Q120 58 150 76 L146 230 L20 230 Z" },
  { id: "back", label: "Back / fold", d: "M170 30 Q210 32 214 10 L280 22 Q270 58 300 76 L296 230 L170 230 Z" },
  { id: "sleeve", label: "Sleeve / cut 2", d: "M330 70 Q380 20 430 70 L418 230 L342 230 Z" },
  { id: "collar", label: "Collar / cut 2", d: "M460 120 Q510 132 560 120 L560 146 Q510 158 460 146 Z" },
];

export function ConstructionNote() {
  const root = useRef<HTMLElement>(null);
  useAssemble(root);
  return (
    <section ref={root} className={styles.section} aria-labelledby="cn-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="notation" style={{ color: "var(--color-accent)" }} data-assemble>How it&apos;s constructed</p>
          <h2 id="cn-title" className="h-section" data-assemble style={{ "--ad": "80ms" } as React.CSSProperties}>
            Four flat pieces become one kurta
          </h2>
          <p className={styles.text} data-assemble style={{ "--ad": "140ms" } as React.CSSProperties}>
            Every DARZ piece starts as a paper pattern. We show you the pieces, the grain and the joins, so you know exactly
            what you&apos;re buying and why it hangs the way it does.
          </p>
          <TransitionLink href="/construction" className="link-cut" data-assemble style={{ "--ad": "200ms" } as React.CSSProperties}>
            Read how a DARZ piece is made
          </TransitionLink>
        </div>
        <figure className={styles.sheet} data-assemble style={{ "--ay": "0px" } as React.CSSProperties}>
          <svg viewBox="0 0 580 270" className={styles.svg} role="img" aria-label="Pattern pieces of a kurta: front, back, two sleeves and a band collar">
            {pieces.map((p, i) => (
              <g key={p.id} style={{ "--i": i } as React.CSSProperties}>
                <path className={styles.cut} d={p.d} pathLength={1} />
                <path className={styles.seam} d={p.d} transform="translate(0 0)" />
              </g>
            ))}
            <g className={styles.marks}>
              <path d="M84 90 V200 M78 98 l6 -8 l6 8 M78 192 l6 8 l6 -8" />
              <path d="M234 90 V200 M228 98 l6 -8 l6 8 M228 192 l6 8 l6 -8" />
              <path d="M380 110 V200 M374 118 l6 -8 l6 8 M374 192 l6 8 l6 -8" />
            </g>
            <g className={styles.notches}>
              <path d="M140 120 l8 -4 l-2 9z" /><path d="M290 120 l8 -4 l-2 9z" /><path d="M334 150 l-8 -3 l3 8z" /><path d="M414 150 l8 -3 l-3 8z" />
            </g>
            {pieces.map((p, i) => (
              <text key={p.id} className={styles.label} x={[24, 174, 336, 462][i]} y={[252, 252, 252, 176][i]}>
                {p.label}
              </text>
            ))}
          </svg>
        </figure>
      </div>
      <div className={`container ${styles.service}`}>
        <ul aria-label="Service">
          <li><span className="notation">Pay</span> Cash on delivery across Pakistan</li>
          <li><span className="notation">Delivery</span> 2 to 4 working days</li>
          <li><span className="notation">Exchange</span> Within 7 days, unworn</li>
        </ul>
      </div>
    </section>
  );
}
