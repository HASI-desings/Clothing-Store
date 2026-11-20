/* Apertures: images seen through pattern-piece cuts. The clip paths use
   objectBoundingBox units so one definition fits any element size. */

export type ApertureShape = "front" | "sleeve" | "yoke" | "arch";

export function ApertureDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="ap-front" clipPathUnits="objectBoundingBox">
          <path d="M0 .2 Q.26 .19 .3 0 L.84 .07 Q.74 .26 1 .38 L.97 1 L0 1 Z" />
        </clipPath>
        <clipPath id="ap-sleeve" clipPathUnits="objectBoundingBox">
          <path d="M0 .22 Q.5 -.05 1 .22 L.88 1 L.12 1 Z" />
        </clipPath>
        <clipPath id="ap-yoke" clipPathUnits="objectBoundingBox">
          <path d="M0 0 H1 V.74 Q.5 1 0 .74 Z" />
        </clipPath>
        <clipPath id="ap-arch" clipPathUnits="objectBoundingBox">
          <path d="M0 1 V.36 Q0 0 .5 0 Q1 0 1 .36 V1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export const apertureClip = (shape: ApertureShape) => `url(#ap-${shape})`;
