"use client";

import React, { useState } from "react";
import "@/styles/Marquee.css";
import PdfCompareModal from "@/components/PdfCompareModal";
import ImportantNoticePopup from "./ImportantNoticePopup";

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
        link: "/notices-and-announcements",
    },
    {
        text: "IMPORTANT NOTICE TO ALL ASSOCIATES",
        link: "/notices-and-announcements",
    },
];

const Marquee = () => {

    const marqueeItems = [...announcements, ...announcements];


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

            <ImportantNoticePopup />

            {/* PDF comparison modal */}
            {/* <PdfCompareModal
                isOpen={isPdfOpen}
                onClose={() => setIsPdfOpen(false)}
                pdfList={pdfNotices}
                selectedIndex={selectedPdfIndex}
            /> */}
        </>
    );
};

export default Marquee;