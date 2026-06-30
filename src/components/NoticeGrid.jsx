"use client";

import React, { useState } from "react";
import AdvisoryPopup from "./AdvisoryPopup";

export default function NoticeGrid({ notices }) {
  const [activeFile, setActiveFile] = useState(null); // { url, type }

  const hasAttachment = (notice) => !!notice.attachment;

  return (
    <>
      <div className="notice-board-grid">
        {notices.map((notice, index) => (
          <div
            className="notice-board-card"
            key={notice._id || index}
            // onClick={() =>
            //   hasAttachment(notice) &&
            //   setActiveFile({
            //     url: notice.attachment,
            //     type: notice.attachmentType,
            //   })
            // }
          >
            <span className="notice-board-accent" />
            <div className="notice-board-top">
              <span className="notice-board-category">{notice.category}</span>
            </div>
            <h3 className="notice-board-title">{notice.title}</h3>
            <p className="notice-board-description">{notice.description}</p>
            <div>
              {hasAttachment(notice) && (
                <a
                  href={notice.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="notice-btn"
                >
                  📎 View Attachment
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* {activeFile && (
        <AdvisoryPopup
          fileUrl={activeFile.url}
          fileType={activeFile.type}
          onClose={() => setActiveFile(null)}
        />
      )} */}
    </>
  );
}
