
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "@/styles/ImportantNoticePopup.css";

const IS_ACTIVE = true;

export default function ImportantNoticePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(pathname === "/");
  }, [pathname]);

  const handleClose = () => setIsOpen(false);

  if (!IS_ACTIVE || !isOpen) return null;

  return (
    <div
      className="notice-overlay"
      onClick={(e) =>
        e.target === e.currentTarget && handleClose()
      }
    >
      <div
        className="notice-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notice-heading"
      >
        <button
          className="notice-close-btn"
          onClick={handleClose}
          aria-label="Close Notice"
        >
          ✕
        </button>

        <div className="notice-body">

          {/* NOTICE 1: SECURITY NOTIFICATION */}
          <section className="notice-section">
            <div className="notice-header">
              <div className="notice-badge">
                ⚠️ OFFICIAL SECURITY NOTIFICATION
              </div>

              <h2 id="notice-heading">
                SECURITY NOTIFICATION
              </h2>

              <p>
                <strong>Date:</strong> 24th October 2026
              </p>
            </div>

            <p>Dear Associates and Partners,</p>

            <p>
              This is to inform you that, following a temporary
              cybersecurity incident and an attack threat,
              unauthorized content was displayed on a website
              for approximately 5–6 days. The matter was
              reported to the concerned cyber authorities, and
              the University has undertaken necessary security
              measures and is strengthening its server and
              hosting infrastructure.
            </p>

            <p>
              We hereby confirm that both official websites —
              <strong> www.miu.edu.in </strong> and
              <strong> www.miu.co.in </strong> — are now secured.
              The University is also undertaking technical
              improvements to strengthen website security and
              ensure smooth operations.
            </p>

            <div className="notice-official-box">
              <span className="notice-check-icon">✓</span>
              <a
                href="https://www.miu.edu.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.miu.edu.in
              </a>
            </div>

            <div className="notice-official-box">
              <span className="notice-check-icon">✓</span>
              <a
                href="https://www.miu.co.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.miu.co.in
              </a>
            </div>

            <p>
              All associates and partners are requested not to
              be discouraged by this temporary incident and to
              continue their regular activities and collaboration
              with confidence.
            </p>

            <div className="notice-footer-authority">
              Regards,
              <br />
              Chairman
              <br />
              Manipur International University
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
