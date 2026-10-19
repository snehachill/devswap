import { ImageResponse } from "next/og";

export const alt = "DevSwap — learn and trade skills with developers";
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
          justifyContent: "center",
          padding: "76px 88px",
          background: "#11201b",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: -110, top: -240, width: 620, height: 620, border: "1px solid rgba(216,146,22,0.28)", borderRadius: 999 }} />
        <div style={{ position: "absolute", right: -10, top: -130, width: 440, height: 440, border: "1px solid rgba(255,255,255,0.10)", borderRadius: 999 }} />
        <div style={{ color: "#F2D9A6", fontSize: 25, fontWeight: 700, letterSpacing: 7, marginBottom: 34 }}>DEVSWAP</div>
        <div style={{ maxWidth: 980, fontSize: 70, lineHeight: 1.08, fontWeight: 700, letterSpacing: -2 }}>Learn something new.</div>
        <div style={{ maxWidth: 980, fontSize: 70, lineHeight: 1.08, fontWeight: 700, letterSpacing: -2, color: "#F2D9A6" }}>Teach what you know.</div>
        <div style={{ marginTop: 30, color: "#d1d8d2", fontSize: 25 }}>Trade skills. Grow together.</div>
      </div>
    ),
    size
  );
}
