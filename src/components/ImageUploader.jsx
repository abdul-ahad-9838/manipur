"use client";

import React, { useState, useRef, useEffect } from "react";

export default function ImageUploader({
  value,
  onChange,
  placeholder = "https://...",
  label = "File",
  height = 120,

  // NEW: parent can pass this in if it stores mimeType in its own form state
  mimeType: mimeTypeProp,

  // ✅ supports old + new usage
  // OLD: "image" | "pdf" | "file"
  // NEW: ["image", "pdf"]
  type = "image",
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [mimeType, setMimeType] = useState(mimeTypeProp || "");
  const fileRef = useRef();

  // keep in sync if parent controls it (e.g. when editing an existing notice)
  useEffect(() => {
    setMimeType(mimeTypeProp || "");
  }, [mimeTypeProp]);

  // ✅ normalize type into array (safe for old code)
  const allowedTypes = Array.isArray(type) ? type : [type];

  const isImageAllowed =
    allowedTypes.includes("image") || allowedTypes.includes("file");

  const isPdfAllowed =
    allowedTypes.includes("pdf") || allowedTypes.includes("file");

  // ✅ dynamic accept
  const accept = [
    allowedTypes.includes("image") ? "image/*" : null,
    allowedTypes.includes("pdf") ? "application/pdf" : null,
  ]
    .filter(Boolean)
    .join(",");

  const inputStyle = {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "0.93rem",
    outline: "none",
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isPDF = file.type === "application/pdf";

    // ✅ validation
    if (isImage && !isImageAllowed) {
      setError("Image uploads are not allowed here.");
      return;
    }

    if (isPDF && !isPdfAllowed) {
      setError("PDF uploads are not allowed here.");
      return;
    }

    if (!isImage && !isPDF) {
      setError("Only image or PDF files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5MB.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const headers = {};
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

      if (userInfo?.token) {
        headers["Authorization"] = `Bearer ${userInfo.token}`;
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
        headers,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      setMimeType(data.mimeType || file.type); // ✅ track it locally
      onChange(data.url, data.mimeType || file.type); // ✅ pass it up to parent
    } catch (err) {
      setError(err.message || "Upload failed");
    }

    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleUrlChange = (e) => {
    // if user pastes a URL manually we lose mime info — reset it
    setMimeType("");
    onChange(e.target.value, "");
  };

  const handleRemove = () => {
    setMimeType("");
    onChange("", "");
  };

  // ✅ detect PDF — prefer mimeType, fall back to extension/url sniffing
  const isPDF =
    mimeType === "application/pdf" ||
    value?.toLowerCase?.().includes(".pdf") ||
    value?.includes("application/pdf");

  return (
    <div style={{ marginBottom: "6px" }}>
      {label && (
        <label
          style={{
            fontWeight: 600,
            fontSize: "0.9rem",
            display: "block",
            marginBottom: 6,
          }}
        >
          {label}
        </label>
      )}

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          type="text"
          value={value || ""}
          onChange={handleUrlChange}
          placeholder={placeholder}
          style={inputStyle}
        />

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1.5px dashed #aaa",
            background: uploading ? "#f0f0f0" : "#fff",
            cursor: uploading ? "not-allowed" : "pointer",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {uploading ? "⏳ Uploading..." : "📁 Upload from PC"}
        </button>

        <input
          ref={fileRef}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          onChange={handleFile}
        />
      </div>

      {error && (
        <p style={{ color: "red", fontSize: "0.82rem", marginTop: 4 }}>
          {error}
        </p>
      )}

      {/* PREVIEW */}
      {value && (
        <div
          style={{
            marginTop: 10,
            position: "relative",
            display: "inline-block",
          }}
        >
          {/* IMAGE PREVIEW */}
          {!isPDF && (
            <img
              src={value}
              alt="preview"
              style={{
                height: `${height}px`,
                maxWidth: "100%",
                borderRadius: 8,
                border: "1px solid #eee",
                objectFit: "cover",
              }}
            />
          )}

          {/* PDF PREVIEW */}
          {isPDF && (
            <iframe
              src={value}
              title="PDF Preview"
              style={{
                width: "100%",
                height: `${height}px`,
                border: "1px solid #eee",
                borderRadius: 8,
              }}
            />
          )}

          <button
            type="button"
            onClick={handleRemove}
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              background: "rgba(200,0,0,0.85)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: 22,
              height: 22,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
