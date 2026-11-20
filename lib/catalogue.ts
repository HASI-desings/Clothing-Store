/* Demo catalogue for the homepage. In the full build this comes from Supabase
   (see docs/full-dev/04-architecture.md); prices are demo values in PKR. */

export type GarmentKind =
  | "kurta"
  | "shirt"
  | "overshirt"
  | "waistcoat"
  | "trousers"
  | "shalwar"
  | "chappal"
  | "fabric";

export type StudioSlot = "top" | "layer" | "bottom" | "footwear";

export interface Colourway {
  name: string;
  hex: string;
}

export interface MaterialFact {
  term: string;
  value: string;
  explain: string;
}

export interface Product {
  id: string;
  name: string;
  kind: GarmentKind;
  price: number;
  colours: Colourway[];
  sizes: { label: string; stock: number }[];
  material: MaterialFact[];
  slot?: StudioSlot;
}

const tops = ["S", "M", "L", "XL", "XXL"];
const stock = (levels: number[]) => tops.map((label, i) => ({ label, stock: levels[i] ?? 0 }));

export const products: Product[] = [
  {
    id: "band-collar-kurta",
    name: "Band-collar kurta",
    kind: "kurta",
    price: 8450,
    slot: "top",
    colours: [
      { name: "Indigo", hex: "#2A3140" },
      { name: "Ash grey", hex: "#8D8F8A" },
      { name: "Wheat", hex: "#B9AE96" },
    ],
    sizes: stock([4, 9, 6, 2, 0]),
    material: [
      { term: "Weave", value: "Khaddar, handloom", explain: "Slubbed yarns give a dry, textured hand." },
      { term: "Weight", value: "180 GSM", explain: "Grams per square metre. Mid-weight; holds a crisp collar." },
      { term: "Grain", value: "Warp, cut 1 on fold", explain: "Cut along the length so the seams hang straight." },
    ],
  },
  {
    id: "walnut-waistcoat",
    name: "Walnut waistcoat",
    kind: "waistcoat",
    price: 6900,
    slot: "layer",
    colours: [
      { name: "Walnut", hex: "#6E5A40" },
      { name: "Charcoal", hex: "#33373D" },
      { name: "Moss", hex: "#4A5642" },
    ],
    sizes: stock([2, 5, 5, 3, 1]),
    material: [
      { term: "Weave", value: "Wool-blend twill", explain: "Diagonal ribs make it drape and resist creasing." },
      { term: "Weight", value: "260 GSM", explain: "Heavier cloth that keeps its shape over a kurta." },
      { term: "Lining", value: "Viscose, half", explain: "Slides over the layer beneath without clinging." },
    ],
  },
  {
    id: "ash-shalwar",
    name: "Pleated shalwar",
    kind: "shalwar",
    price: 3200,
    slot: "bottom",
    colours: [
      { name: "Ash grey", hex: "#8D8F8A" },
      { name: "Bone", hex: "#D9D3C4" },
      { name: "Indigo", hex: "#2A3140" },
    ],
    sizes: stock([6, 8, 8, 4, 2]),
    material: [
      { term: "Weave", value: "Cotton cambric", explain: "A fine plain weave that stays cool." },
      { term: "Weight", value: "120 GSM", explain: "Light; gathers softly at the waist." },
      { term: "Grain", value: "Warp, cut 2", explain: "Two mirrored legs cut on the same grain." },
    ],
  },
  {
    id: "moss-overshirt",
    name: "Moss overshirt",
    kind: "overshirt",
    price: 5750,
    slot: "top",
    colours: [
      { name: "Moss", hex: "#4A5642" },
      { name: "Sand", hex: "#A88F6A" },
      { name: "Indigo", hex: "#2A3140" },
    ],
    sizes: stock([3, 0, 7, 4, 2]),
    material: [
      { term: "Weave", value: "Brushed twill", explain: "Brushed on one face for a soft, matte surface." },
      { term: "Weight", value: "240 GSM", explain: "Substantial enough to wear as a light jacket." },
      { term: "Pockets", value: "Two, flapped", explain: "Cut on the bias so the flaps sit flat." },
    ],
  },
  {
    id: "oxford-shirt",
    name: "Cutaway oxford shirt",
    kind: "shirt",
    price: 4600,
    slot: "top",
    colours: [
      { name: "Chalk", hex: "#E8E6DF" },
      { name: "Sky", hex: "#9FB2CC" },
      { name: "Graphite", hex: "#3A3F47" },
    ],
    sizes: stock([5, 9, 9, 5, 3]),
    material: [
      { term: "Weave", value: "Oxford, basketweave", explain: "Paired yarns give texture and breathability." },
      { term: "Weight", value: "135 GSM", explain: "Light enough for all-day wear." },
      { term: "Collar", value: "Cutaway, fused", explain: "A wide spread that frames a band or a tie." },
    ],
  },
  {
    id: "pleated-trousers",
    name: "Single-pleat trousers",
    kind: "trousers",
    price: 5200,
    slot: "bottom",
    colours: [
      { name: "Graphite", hex: "#3A3F47" },
      { name: "Stone", hex: "#9C978A" },
      { name: "Navy", hex: "#23293A" },
    ],
    sizes: stock([4, 6, 6, 3, 0]),
    material: [
      { term: "Weave", value: "Tropical wool blend", explain: "An open weave that breathes in heat." },
      { term: "Weight", value: "220 GSM", explain: "Holds a pressed crease." },
      { term: "Rise", value: "Mid, single pleat", explain: "Room at the hip, clean line below." },
    ],
  },
  {
    id: "peshawari-chappal",
    name: "Peshawari chappal",
    kind: "chappal",
    price: 4400,
    slot: "footwear",
    colours: [
      { name: "Tan", hex: "#8A5A3B" },
      { name: "Black", hex: "#25262A" },
      { name: "Oxblood", hex: "#5B2A2A" },
    ],
    sizes: [
      { label: "40", stock: 3 },
      { label: "41", stock: 5 },
      { label: "42", stock: 4 },
      { label: "43", stock: 2 },
      { label: "44", stock: 0 },
    ],
    material: [
      { term: "Upper", value: "Vegetable-tanned leather", explain: "Darkens and softens with wear." },
      { term: "Sole", value: "Stitched rubber", explain: "Grips without the weight of a tyre sole." },
      { term: "Straps", value: "Double cross", explain: "The traditional cross that holds the foot." },
    ],
  },
];

export const exhibition = {
  title: "The Courtyard Edit",
  season: "Winter 2026",
  curatorLine:
    "Khaddar, wool and leather, cut for cold mornings in the courtyard and long evenings after. Seven pieces that work together.",
  productIds: [
    "band-collar-kurta",
    "walnut-waistcoat",
    "ash-shalwar",
    "moss-overshirt",
    "oxford-shirt",
    "pleated-trousers",
    "peshawari-chappal",
  ],
};

export const rooms = [
  { slug: "casual", name: "Casual", line: "Overshirts and easy trousers in brushed cloth.", light: "#C9C3B1", ink: "#1C2026", kind: "overshirt" as GarmentKind, hex: "#4A5642", pieces: 24 },
  { slug: "formal", name: "Formal", line: "Oxford shirts and pleated trousers, pressed and exact.", light: "#2B3240", ink: "#ECECE7", kind: "shirt" as GarmentKind, hex: "#E8E6DF", pieces: 18 },
  { slug: "traditional", name: "Traditional", line: "Kurtas, shalwar and waistcoats in khaddar and wool.", light: "#B4674B", ink: "#F6F6F2", kind: "kurta" as GarmentKind, hex: "#D9D3C4", pieces: 31 },
  { slug: "unstitched", name: "Unstitched", line: "Cloth by the suit, for your own tailor.", light: "#DCD8CC", ink: "#1C2026", kind: "fabric" as GarmentKind, hex: "#6E5A40", pieces: 40 },
];

export function byId(id: string): Product {
  const p = products.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown product ${id}`);
  return p;
}

export function bySlot(slot: StudioSlot): Product[] {
  return products.filter((p) => p.slot === slot);
}

export const formatPrice = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;
