"use client";

import { useState } from "react";
import AdvisoryPopup from "./AdvisoryPopup";

export default function RecognitionCards({ recognitions }) {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <>
      <div className="aff-cards-grid">
        {recognitions.map((item, i) => (
          <div
            key={i}
            className="aff-card"
            style={{ "--card-color": item.color }}
          >
            <div>
              <div className="aff-card-header">
                <div className="aff-card-logo-box">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.short}
                      className="aff-card-logo"
                    />
                  ) : (
                    <div
                      className="aff-logo-badge"
                      style={{ background: item.color }}
                    >
                      <span>{item.short}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="aff-card-body">
                <h3 className="aff-card-short" style={{ color: item.color }}>
                  {item.short}
                </h3>

                <p className="aff-card-name">{item.name}</p>
                <p className="aff-card-desc">{item.desc}</p>

                {item.details && (
                  <p className="aff-card-details">{item.details}</p>
                )}
              </div>
            </div>

            {item.short == "AICTE" && (
              <p className="aff-card-details">
                A university is exempt from AICTE approval because it is
                regulated by the UGC, while AICTE approval is primarily required
                for technical colleges and institutions.
              </p>
            )}

            <button
              className="aff-card-btn"
              style={{ background: item.color }}
              onClick={() => setSelectedFile(item.fileUrl)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedFile && (
        <AdvisoryPopup
          fileUrl={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </>
  );
}
