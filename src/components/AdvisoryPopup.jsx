"use client";

import Image from "next/image";

export default function AdvisoryPopup({ fileUrl, onClose }) {
  const isPdf = fileUrl?.toLowerCase().includes(".pdf");

  return (
    <div className="advisory-overlay" onClick={onClose}>
      <div className="advisory-modal" onClick={(e) => e.stopPropagation()}>
        <button className="advisory-close" onClick={onClose}>
          &times;
        </button>

        <div className="advisory-content">
          {isPdf ? (
            <iframe
              src={fileUrl}
              width="100%"
              height="700"
              style={{ border: "none" }}
            />
          ) : (
            <Image
              src={fileUrl}
              alt="Document"
              width={800}
              height={1000}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          )}
        </div>

        <div className="advisory-footer">
          <button className="advisory-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
