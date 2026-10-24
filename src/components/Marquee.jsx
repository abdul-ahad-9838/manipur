"use client";

import Link from "next/link";
import "@/styles/Marquee.css";

const announcements = [
  {
    text: "PhD 2026 Registrations Open — Apply Now!",
    // link: "https://research.miu.edu.in/",
    // external: true,
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

          if (item.link && item.external) {
            return (
              <a
                key={`${item.text}-${index}`}
                href={item.link}
                className="miu-news-marquee-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.text}
              </a>
            );
          }

          if (item.link) {
            return (
              <Link
                key={`${item.text}-${index}`}
                href={item.link}
                className="miu-news-marquee-item"
              >
                {item.text}
              </Link>
            );
          }

          return (
            <p
              key={`${item.text}-${index}`}
              className="miu-news-marquee-item"
            >
              {item.text}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Marquee;