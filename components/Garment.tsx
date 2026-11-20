import { useId } from "react";
import type { GarmentKind } from "@/lib/catalogue";

/* Illustrated flat-lay garments (demo stand-ins for product photography).
   Each piece is drawn like a pattern on a cutting table: flat colour, a woven
   texture, graphite outline, dashed stitch lines and a chalk notch. */

interface Props {
  kind: GarmentKind;
  colour: string;
  className?: string;
  title?: string;
}

const outline = "rgb(20 22 26 / 0.55)";
const stitch = "rgb(255 255 255 / 0.32)";

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(c + amt)));
  const r = f(n >> 16), g = f((n >> 8) & 255), b = f(n & 255);
  return `rgb(${r} ${g} ${b})`;
}

export function Garment({ kind, colour, className, title }: Props) {
  const uid = useId().replace(/:/g, "");
  const weave = `w${uid}`;
  const fill = `url(#${weave})`;
  const common = { fill, stroke: outline, strokeWidth: 1.4, strokeLinejoin: "round" as const };
  const st = { fill: "none", stroke: stitch, strokeWidth: 1.1, strokeDasharray: "3 3" };

  return (
    <svg
      viewBox="0 0 200 260"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <pattern id={weave} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
          <rect width="6" height="6" fill={colour} />
          <rect width="6" height="2.2" fill={shade(colour, 10)} />
          <rect y="5" width="6" height="0.8" fill={shade(colour, -14)} />
        </pattern>
      </defs>

      {kind === "kurta" && (
        <g>
          <path {...common} d="M70 22 L100 30 L130 22 L166 36 L196 124 L176 132 L158 80 L157 252 L43 252 L42 80 L24 132 L4 124 L34 36 Z" />
          <path {...common} d="M83 24 Q100 33 117 24 L117 15 Q100 23 83 15 Z" />
          <path {...st} d="M100 32 V100 M44 214 V250 M156 214 V250 M8 116 L26 124 M192 116 L174 124" />
          <g fill={shade(colour, 40)}>
            <circle cx="100" cy="46" r="2.2" /><circle cx="100" cy="62" r="2.2" /><circle cx="100" cy="78" r="2.2" />
          </g>
        </g>
      )}

      {(kind === "shirt" || kind === "overshirt") && (
        <g>
          <path {...common} d="M70 22 L100 32 L130 22 L166 36 L194 122 L174 130 L158 82 L157 206 Q100 226 43 206 L42 82 L26 130 L6 122 L34 36 Z" />
          <path {...common} d="M70 22 L100 46 L86 14 Z M130 22 L100 46 L114 14 Z" />
          <path {...st} d="M100 46 V216 M10 112 L28 120 M190 112 L172 120" />
          <g fill={shade(colour, kind === "shirt" ? -40 : 30)}>
            {[62, 88, 114, 140, 166, 192].map((y) => (
              <circle key={y} cx="100" cy={y} r="2" />
            ))}
          </g>
          {kind === "overshirt" && (
            <g>
              <path {...common} d="M58 76 H88 V108 H58 Z M112 76 H142 V108 H112 Z" />
              <path {...st} d="M58 86 H88 M112 86 H142" />
            </g>
          )}
        </g>
      )}

      {kind === "waistcoat" && (
        <g>
          <path {...common} d="M64 20 L100 84 L136 20 L158 32 L162 86 Q166 150 162 200 L104 216 L100 208 L96 216 L38 200 Q34 150 38 86 L42 32 Z" />
          <path {...st} d="M100 84 V208 M48 150 H74 M126 150 H152 M64 20 L100 84 L136 20" />
          <g fill={shade(colour, 50)}>
            {[100, 122, 144, 166, 188].map((y) => (
              <circle key={y} cx="100" cy={y} r="2.2" />
            ))}
          </g>
        </g>
      )}

      {kind === "trousers" && (
        <g>
          <path {...common} d="M50 12 H150 L160 252 H112 L100 84 L88 252 H40 Z" />
          <path {...st} d="M50 26 H150 M100 26 V76 M74 30 L68 250 M126 30 L132 250" />
        </g>
      )}

      {kind === "shalwar" && (
        <g>
          <path {...common} d="M34 12 H166 Q190 124 158 244 H118 Q112 150 100 116 Q88 150 82 244 H42 Q10 124 34 12 Z" />
          <path {...st} d="M36 26 H164 M52 28 L48 40 M70 28 L68 40 M90 28 L90 40 M110 28 L110 40 M130 28 L132 40 M148 28 L152 40 M42 232 H82 M118 232 H158" />
        </g>
      )}

      {kind === "chappal" && (
        <g>
          <path {...common} d="M44 30 Q66 10 86 30 Q96 130 86 226 Q66 244 46 226 Q34 130 44 30 Z" />
          <path {...common} d="M114 30 Q134 10 156 30 Q166 130 154 226 Q134 244 114 226 Q104 130 114 30 Z" />
          <g fill={shade(colour, -22)} stroke={outline} strokeWidth="1.2">
            <path d="M38 80 Q65 62 92 80 L92 108 Q65 92 38 108 Z" />
            <path d="M108 80 Q135 62 162 80 L162 108 Q135 92 108 108 Z" />
            <path d="M58 40 L74 40 L72 70 L60 70 Z" />
            <path d="M126 40 L142 40 L140 70 L128 70 Z" />
          </g>
          <path {...st} d="M46 140 Q65 150 84 140 M116 140 Q135 150 154 140" />
        </g>
      )}

      {kind === "fabric" && (
        <g>
          <path {...common} d="M30 150 H170 V238 H30 Z" />
          <path {...common} d="M38 110 H176 V150 Q176 166 160 166 H38 Z" />
          <path {...common} d="M24 60 H166 V110 Q166 128 148 128 H24 Z" />
          <path {...st} d="M24 70 H166 M38 120 H176 M30 160 H170" />
          <path fill="none" stroke={outline} strokeWidth="1.2" d="M150 40 L168 22 M150 40 H130 V60" />
          <rect x="120" y="14" width="44" height="26" fill="#F6F6F2" stroke={outline} />
          <path d="M126 22 H158 M126 30 H148" stroke="#2E49B8" strokeWidth="1.4" />
        </g>
      )}

      {/* chalk notch: the tailor's mark on every piece */}
      <path d="M93 252 L100 244 L107 252 Z" fill="#2E49B8" opacity={kind === "chappal" || kind === "fabric" ? 0 : 0.9} />
    </svg>
  );
}
