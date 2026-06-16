import React from "react";
import "@/styles/ResultsPage.css";

export default function Loading() {
  return (
    <div className="simple-page">
      {/* Hero Skeleton */}
      <div className="simple-hero">
        <div className="container">
          <div
            style={{
              width: "250px",
              height: "16px",
              background: "#e5e7eb",
              borderRadius: "4px",
              marginBottom: "20px",
            }}
          />

          <div
            style={{
              width: "120px",
              height: "30px",
              background: "#e5e7eb",
              borderRadius: "999px",
              marginBottom: "20px",
            }}
          />

          <div
            style={{
              width: "350px",
              height: "42px",
              background: "#e5e7eb",
              borderRadius: "6px",
              marginBottom: "15px",
            }}
          />

          <div
            style={{
              width: "500px",
              maxWidth: "100%",
              height: "20px",
              background: "#e5e7eb",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      {/* Results Skeleton */}
      <div className="container simple-body">
        <div className="simple-section">
          <div
            style={{
              width: "220px",
              height: "32px",
              background: "#e5e7eb",
              borderRadius: "6px",
              marginBottom: "25px",
            }}
          />

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              style={{
                height: "64px",
                background: "#f3f4f6",
                borderRadius: "12px",
                marginBottom: "15px",
                animation: "pulse 1.5s infinite",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
