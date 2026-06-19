"use client";

import Image from "next/image";

export default function AdvisoryPopup({ fileUrl, fileType, onClose }) {
  if (!fileUrl) return null;

  const isPdf =
    fileType === "application/pdf" || fileUrl?.toLowerCase().includes(".pdf");

  // hide native PDF viewer toolbar (download/print/save icons) where supported
  const pdfSrc = isPdf
    ? `${fileUrl}#toolbar=0&navpanes=0&scrollbar=1`
    : fileUrl;

  return (
    <div className="advisory-overlay" onClick={onClose}>
      <div className="advisory-modal" onClick={(e) => e.stopPropagation()}>
        <button className="advisory-close" onClick={onClose}>
          &times;
        </button>

        <div
          className="advisory-content"
          onContextMenu={(e) => e.preventDefault()} // block right-click menu
        >
          {isPdf ? (
            <iframe
              src={pdfSrc}
              width="100%"
              height="700"
              style={{ border: "none" }}
              title="Document preview"
            />
          ) : (
            <Image
              src={fileUrl}
              alt="Document"
              width={800}
              height={1000}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                width: "100%",
                height: "auto",
                userSelect: "none",
                pointerEvents: "auto",
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
