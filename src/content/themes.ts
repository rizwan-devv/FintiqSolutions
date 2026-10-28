export type ProductTheme = {
  slug: string
  label: string
  mode: "light" | "dark"
  accent: string
  accentSoft: string
  ink: string
  panel: string
  glow: string
  mesh: string
  chip: string
  /** CSS gradient for product name wordmarks on light surfaces */
  titleGrad: string
}

export const productThemes: Record<string, ProductTheme> = {
  "card-management-system": {
    slug: "card-management-system",
    label: "CMS",
    mode: "dark",
    accent: "#C9A227",
    accentSoft: "#E8D48A",
    ink: "#0A1428",
    panel: "linear-gradient(155deg, #070f1c 0%, #122038 42%, #1a2f4a 78%, #2a3d28 140%)",
    glow: "radial-gradient(ellipse at 88% 0%, rgb(201 162 39 / 0.32), transparent 52%), radial-gradient(ellipse at 10% 100%, rgb(16 36 88 / 0.45), transparent 45%)",
    mesh: "linear-gradient(155deg, #0b1528 0%, #152238 50%, #1a2a40 100%)",
    chip: "bg-[#C9A227] text-ink",
    titleGrad: "linear-gradient(105deg, #071530 0%, #102458 45%, #8a7320 100%)",
  },
  "corporate-banking": {
    slug: "corporate-banking",
    label: "Corporate",
    mode: "light",
    accent: "#102458",
    accentSoft: "#3A5A9A",
    ink: "#102458",
    panel: "linear-gradient(160deg, #ffffff 0%, #eef3fa 38%, #d9e4f2 72%, #c5d6ea 100%)",
    glow: "radial-gradient(ellipse at 90% 0%, rgb(16 36 88 / 0.16), transparent 50%), radial-gradient(ellipse at 0% 100%, rgb(0 176 164 / 0.1), transparent 45%)",
    mesh: "linear-gradient(150deg, #eef3f9 0%, #dce6f2 100%)",
    chip: "bg-navy text-white",
    titleGrad: "linear-gradient(105deg, #071530 0%, #102458 55%, #0c6484 100%)",
  },
  "payment-gateway": {
    slug: "payment-gateway",
    label: "Gateway",
    mode: "dark",
    accent: "#00B0A4",
    accentSoft: "#7BE0D8",
    ink: "#071530",
    panel: "linear-gradient(150deg, #04141a 0%, #0a2c34 40%, #0d4548 75%, #087f78 130%)",
    glow: "radial-gradient(ellipse at 82% 5%, rgb(0 176 164 / 0.38), transparent 50%), radial-gradient(ellipse at 5% 90%, rgb(7 21 48 / 0.5), transparent 45%)",
    mesh: "linear-gradient(145deg, #071a22 0%, #0c3a42 100%)",
    chip: "bg-teal text-ink",
    titleGrad: "linear-gradient(105deg, #071530 0%, #0c6484 48%, #00b0a4 100%)",
  },
  "cash-management-system": {
    slug: "cash-management-system",
    label: "Cash",
    mode: "light",
    accent: "#087f78",
    accentSoft: "#2A9E96",
    ink: "#0A2A28",
    panel: "linear-gradient(160deg, #ffffff 0%, #eef8f6 40%, #d5ebe8 75%, #b8ddd8 100%)",
    glow: "radial-gradient(ellipse at 90% 0%, rgb(0 176 164 / 0.2), transparent 50%), radial-gradient(ellipse at 0% 100%, rgb(16 36 88 / 0.08), transparent 45%)",
    mesh: "linear-gradient(150deg, #eef8f6 0%, #d8ece9 100%)",
    chip: "bg-[#087f78] text-white",
    titleGrad: "linear-gradient(105deg, #0A2A28 0%, #087f78 55%, #00b0a4 100%)",
  },
  "remittance-system": {
    slug: "remittance-system",
    label: "Remittance",
    mode: "dark",
    accent: "#5BA3D9",
    accentSoft: "#A8D4F0",
    ink: "#061018",
    panel: "linear-gradient(150deg, #050d16 0%, #0e2238 42%, #1a3852 78%, #2a5080 130%)",
    glow: "radial-gradient(ellipse at 80% 5%, rgb(91 163 217 / 0.32), transparent 50%), radial-gradient(ellipse at 10% 95%, rgb(16 36 88 / 0.4), transparent 45%)",
    mesh: "linear-gradient(150deg, #0a1624 0%, #16324a 100%)",
    chip: "bg-[#5BA3D9] text-ink",
    titleGrad: "linear-gradient(105deg, #061018 0%, #1a4a7a 50%, #5BA3D9 100%)",
  },
  "loan-origination-system": {
    slug: "loan-origination-system",
    label: "LOS",
    mode: "light",
    accent: "#1B4F8A",
    accentSoft: "#3D6FA8",
    ink: "#102458",
    panel: "linear-gradient(160deg, #ffffff 0%, #f0f5fb 40%, #d9e4f2 75%, #c2d4ea 100%)",
    glow: "radial-gradient(ellipse at 90% 0%, rgb(27 79 138 / 0.18), transparent 50%), radial-gradient(ellipse at 0% 100%, rgb(16 36 88 / 0.1), transparent 45%)",
    mesh: "linear-gradient(150deg, #eef3f9 0%, #dce6f2 100%)",
    chip: "bg-[#1B4F8A] text-white",
    titleGrad: "linear-gradient(105deg, #071530 0%, #1B4F8A 55%, #3D6FA8 100%)",
  },
  "loan-management-system": {
    slug: "loan-management-system",
    label: "LMS",
    mode: "dark",
    accent: "#9AA8C8",
    accentSoft: "#C5D0E4",
    ink: "#12182A",
    panel: "linear-gradient(150deg, #0c101c 0%, #181f32 42%, #252f48 78%, #3a4560 130%)",
    glow: "radial-gradient(ellipse at 80% 5%, rgb(154 168 200 / 0.28), transparent 50%), radial-gradient(ellipse at 5% 95%, rgb(16 36 88 / 0.45), transparent 45%)",
    mesh: "linear-gradient(150deg, #12182a 0%, #1e2740 100%)",
    chip: "bg-[#9AA8C8] text-ink",
    titleGrad: "linear-gradient(105deg, #12182A 0%, #2a3a5c 50%, #6B7FA8 100%)",
  },
}

export function getProductTheme(slug: string): ProductTheme {
  return productThemes[slug] ?? productThemes["payment-gateway"]
}
