import React from "react";

export const metadata = {
  title: "Statutory Cells | Manipur International University",
  description:
    "Information about Incubation Center, Anti Ragging, and other specialized university cells at MIU.",
  alternates: {
    canonical: "https://miu.edu.in/miu-cell",
  },
};

export default function MIUCell() {
  return (
    <div
      className="page-container"
      style={{
        padding: "clamp(100px, 15vw, 160px) 20px 60px",
        textAlign: "center",
        background: "#fff",
        minHeight: "60vh",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          color: "var(--lpu-black)",
          marginBottom: "20px",
          fontWeight: "900",
        }}
      >
        University Cells
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          maxWidth: "800px",
          margin: "0 auto",
          color: "#444",
        }}
      >
        Access information and resources for our Incubation Center, Anti Ragging
        Cell, IQAC, and other specialized institutional departments dedicated to
        student welfare and quality assurance.
      </p>

      <div
        className="cells-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "60px auto 0",
        }}
      >
        <div
          className="cell-card"
          style={{
            padding: "30px",
            border: "1px solid #eee",
            borderRadius: "15px",
            background: "#fcfcfc",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "var(--lpu-orange)" }}>
            Anti-Ragging Cell
          </h3>
          <p>Zero tolerance policy towards ragging in any form.</p>
        </div>
        <div
          className="cell-card"
          style={{
            padding: "30px",
            border: "1px solid #eee",
            borderRadius: "15px",
            background: "#fcfcfc",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "var(--lpu-orange)" }}>
            Incubation Center
          </h3>
          <p>Driving innovation and entrepreneurship among our students.</p>
        </div>
        <div
          className="cell-card"
          style={{
            padding: "30px",
            border: "1px solid #eee",
            borderRadius: "15px",
            background: "#fcfcfc",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "var(--lpu-orange)" }}>
            IQAC
          </h3>
          <p>Internal Quality Assurance Cell ensuring academic excellence.</p>
        </div>
      </div>
    </div>
  );
}
