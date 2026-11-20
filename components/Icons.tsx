/* Tailor's-pencil icon set: 24 grid, 1.5 stroke, square caps. */
const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  focusable: false,
};

export const IconBag = () => (<svg {...base}><path d="M5 8h14l-1 13H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>);
export const IconSearch = () => (<svg {...base}><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5" /></svg>);
export const IconMenu = () => (<svg {...base}><path d="M4 7h16M4 12h10M4 17h16" /></svg>);
export const IconClose = () => (<svg {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const IconArrow = ({ dir = "right" }: { dir?: "left" | "right" }) => (
  <svg {...base} style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);
export const IconLock = ({ open = false }: { open?: boolean }) => (
  <svg {...base}><rect x="5" y="11" width="14" height="10" /><path d={open ? "M8 11V8a4 4 0 0 1 7.5-2" : "M8 11V8a4 4 0 0 1 8 0v3"} /></svg>
);
export const IconShuffle = () => (<svg {...base}><path d="M4 7l4-3 4 3 4-3 4 3" /><path d="M4 7v13h16V7" /></svg>);
export const IconPin = () => (<svg {...base}><circle cx="8" cy="8" r="2.5" /><path d="M10 10l10 10" /></svg>);
export const IconRuler = () => (<svg {...base}><path d="M3 15L15 3l6 6L9 21z" /><path d="M7 11l2 2M10 8l2 2M13 5l2 2" /></svg>);
