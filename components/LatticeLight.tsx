/* Light through a jali: crisp eight-point stars of light falling on a surface
   in shade, skewed as if the sun is low. It drifts slowly and stops for
   reduced motion. Decorative only. */
import { useId } from "react";
import styles from "./LatticeLight.module.css";

interface Props {
  tone?: "light" | "shadow";
  cell?: number;
  className?: string;
}

export function LatticeLight({ tone = "light", cell = 34, className }: Props) {
  const id = useId().replace(/:/g, "");
  const h = cell / 2;
  const r = cell * 0.2;
  return (
    <svg className={`${styles.lattice} ${className ?? ""}`} data-tone={tone} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 400">
      <defs>
        <pattern id={`p${id}`} width={cell} height={cell} patternUnits="userSpaceOnUse" patternTransform="rotate(-12) skewX(-14)">
          {[[h, h], [0, 0], [cell, 0], [0, cell], [cell, cell]].map(([x, y]) => (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y})`} className={styles.star}>
              <rect x={-r} y={-r} width={r * 2} height={r * 2} />
              <rect x={-r} y={-r} width={r * 2} height={r * 2} transform="rotate(45)" />
            </g>
          ))}
        </pattern>
        <filter id={`f${id}`} x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
        <radialGradient id={`g${id}`} cx="56%" cy="42%" r="58%">
          <stop offset="0.35" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`m${id}`}>
          <rect width="400" height="400" fill={`url(#g${id})`} />
        </mask>
      </defs>
      <g mask={`url(#m${id})`}>
        <g className={styles.drift} filter={`url(#f${id})`}>
          <rect x="-80" y="-80" width="600" height="600" fill={`url(#p${id})`} />
        </g>
      </g>
    </svg>
  );
}
