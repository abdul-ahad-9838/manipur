"use client";

import React, { useState } from "react";
import "@/styles/Marquee.css";
import PdfCompareModal from "@/components/PdfCompareModal";

const announcements = [
    {
        text: "PhD 2026 Registrations Open — Apply Now!",
        link: "https://research.miu.edu.in/",
        external: true,
    },
    {
        text: "LL.D., D.Sc. & D.Litt. (Post-Doctoral) Courses Discontinued from 2026 Onwards",
        link: "",
    },
    {
        text: "SECURITY NOTIFICATION",
        fileUrl: "/notice/Notice_24 Oct 2026 _2.pdf",
    },
    {
        text: "IMPORTANT NOTICE TO ALL ASSOCIATES",
        fileUrl: "/notice/Notice_24 Oct 2026_1.pdf",
    },
];

const Marquee = () => {
    // Page load hote hi modal khula rakhne ke liye initial state true ki hai
    const [isPdfOpen, setIsPdfOpen] = useState(true);
    const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);

    const marqueeItems = [...announcements, ...announcements];
    const pdfNotices = announcements.filter((item) => item.fileUrl);

    const handleNoticeClick = (item) => {
        const index = pdfNotices.findIndex(
            (notice) => notice.fileUrl === item.fileUrl
        );

        setSelectedPdfIndex(index >= 0 ? index : 0);
        setIsPdfOpen(true);
    };

    return (
        <>
            <div className="miu-news-marquee">
                <div className="miu-news-marquee-track">
                    {marqueeItems.map((item, index) => {
                        if (item.fileUrl) {
                            return (
                                <button
                                    key={`${item.fileUrl}-${index}`}
                                    type="button"
                                    className="miu-news-marquee-item miu-notice-button"
                                    onClick={() => handleNoticeClick(item)}
                                >
                                    {item.text}
                                </button>
                            );
                        }

                        if (item.link) {
                            return (
                                <a
                                    key={`${item.text}-${index}`}
                                    href={item.link}
                                    className="miu-news-marquee-item"
                                    target={item.external ? "_blank" : undefined}
                                    rel={item.external ? "noopener noreferrer" : undefined}
                                >
                                    {item.text}
                                </a>
                            );
                        }

                        return (
                            <p key={`${item.text}-${index}`} className="miu-news-marquee-item">
                                {item.text}
                            </p>
                        );
                    })}
                </div>
            </div>

            {/* PDF comparison modal */}
            <PdfCompareModal
                isOpen={isPdfOpen}
                onClose={() => setIsPdfOpen(false)}
                pdfList={pdfNotices}
                selectedIndex={selectedPdfIndex}
            />
        </>
    );
};

export default Marquee;