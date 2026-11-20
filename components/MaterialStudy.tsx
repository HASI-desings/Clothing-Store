"use client";

import { useRef, useState } from "react";
import { useAssemble } from "./useAssemble";
import styles from "./MaterialStudy.module.css";

/* Fabric presented like an architectural material study: a macro of the cloth,
   callouts drawn to the texture, and every term explained in plain words. */

const facts = [
  { id: "weave", term: "Weave", value: "Khaddar, handloom", explain: "Hand-spun, slubbed yarns. The surface is dry and uneven on purpose.", x: 30, y: 34 },
  { id: "weight", term: "Weight", value: "180 GSM", explain: "Grams per square metre. Heavy enough to hold a band collar crisp.", x: 64, y: 58 },
  { id: "grain", term: "Grain", value: "Warp, cut 1 on fold", explain: "Cut along the length of the cloth, so side seams hang straight and never twist.", x: 44, y: 78 },
];

const fullSpec = [
  ["Composition", "100% cotton"],
  ["Yarn", "Hand-spun, 12s count"],
  ["Finish", "Stone-washed, pre-shrunk"],
  ["Season", "Autumn to winter"],
  ["Care", "Cold wash, dry in shade, warm iron on the reverse"],
];

export function MaterialStudy() {
  const root = useRef<HTMLElement>(null);
  useAssemble(root);
  const [focus, setFocus] = useState<string | null>(null);

  return (
    <section ref={root} className={styles.section} aria-labelledby="ms-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.macroWrap} data-assemble style={{ "--ay": "0px" } as React.CSSProperties}>
          <div className={styles.macro} data-focus={focus ?? undefined}>
            <svg className={styles.cloth} viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
              <filter id="khaddar" x="0" y="0" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.006 0.16" numOctaves="4" seed="7" result="slub" />
                <feTurbulence type="fractalNoise" baseFrequency="0.9 0.9" numOctaves="2" seed="3" result="fine" />
                <feComposite in="slub" in2="fine" operator="arithmetic" k1="0" k2="0.75" k3="0.45" k4="0" result="mix" />
                <feColorMatrix
                  in="mix"
                  type="matrix"
                  values="0 0 0 0.52 0.30  0 0 0 0.48 0.27  0 0 0 0.40 0.22  0 0 0 0 1"
                />
              </filter>
              <rect width="600" height="600" filter="url(#khaddar)" />
              <g stroke="rgb(0 0 0 / 0.16)" strokeWidth="1.2">
                {Array.from({ length: 100 }, (_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 6 + 2} x2="600" y2={i * 6 + 2} />
                ))}
              </g>
              <g stroke="rgb(255 250 235 / 0.07)" strokeWidth="2">
                {Array.from({ length: 100 }, (_, i) => (
                  <line key={`v${i}`} x1={i * 6 + 3} y1="0" x2={i * 6 + 3} y2="600" />
                ))}
              </g>
            </svg>
            <span className={styles.rake} aria-hidden="true" />
            {facts.map((f) => (
              <span
                key={f.id}
                className={styles.pin}
                data-on={focus === f.id}
                style={{ left: `${f.x}%`, top: `${f.y}%` }}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className={`notation ${styles.scale}`}>Macro, actual width 4 cm</p>
        </div>

        <div className={styles.copy}>
          <p className="notation" style={{ color: "var(--color-accent)" }} data-assemble>Material study</p>
          <h2 id="ms-title" className="h-section" data-assemble style={{ "--ad": "80ms" } as React.CSSProperties}>
            Know the cloth before you touch it
          </h2>
          <p className={styles.lede} data-assemble style={{ "--ad": "140ms" } as React.CSSProperties}>
            Every piece comes with its material study: what the cloth is, how heavy it is and how it was cut. This is the khaddar
            behind the band-collar kurta.
          </p>
          <dl className={styles.facts} data-assemble style={{ "--ad": "200ms" } as React.CSSProperties}>
            {facts.map((f) => (
              <div
                key={f.id}
                className={styles.fact}
                tabIndex={0}
                onMouseEnter={() => setFocus(f.id)}
                onMouseLeave={() => setFocus(null)}
                onFocus={() => setFocus(f.id)}
                onBlur={() => setFocus(null)}
              >
                <dt className="notation">{f.term}</dt>
                <dd>
                  <b>{f.value}</b>
                  <span>{f.explain}</span>
                </dd>
              </div>
            ))}
          </dl>
          <details className={styles.spec} data-assemble style={{ "--ad": "260ms" } as React.CSSProperties}>
            <summary>Full specification</summary>
            <dl>
              {fullSpec.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </details>
        </div>
      </div>
    </section>
  );
}
