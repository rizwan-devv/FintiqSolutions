import { ImageResponse } from "next/og";

export const alt = "FintiQ Solutions — fintech platforms for regulated institutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(145deg, #071530 0%, #102458 48%, #0c6484 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#7be0d8",
          }}
        >
          Fintech platforms · AI solutions
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: "-0.03em" }}>
            Finti
            <span style={{ color: "#00b0a4" }}>Q</span>
            <span style={{ marginLeft: 16 }}>Solutions</span>
          </div>
          <div style={{ display: "flex", maxWidth: 820, fontSize: 30, lineHeight: 1.35, color: "rgba(255,255,255,0.78)" }}>
            Secure platforms for cards, payments, cash, remittance, and lending — built for regulated institutions.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,0.55)" }}>
          fintiqsolutions.com
        </div>
      </div>
    ),
    { ...size },
  );
}
