import React from "react";
import "@/styles/Marquee.css";

const announcements = [
    {
        text: "PhD 2026 Registrations Open — Apply Now!",
        link: "https://research.miu.edu.in/",
        external: true,
    },
    {
        text: "Beware of Fake Websites & Emails! Official website: miu.edu.in | Official email domain: @miu.edu.in Please stay alert!",
        link: "",
    },
    {
        text: "LL.D., D.Sc. & D.Litt. (Post-Doctoral) Courses Discontinued from 2026 Onwards",
        link: "",
    },
];

const Marquee = () => {
    // Duplicate items for seamless scrolling
    const marqueeItems = [...announcements, ...announcements];

    return (
        <div className="miu-news-marquee">
            <div className="miu-news-marquee-track">
                {marqueeItems.map((item, index) =>
                    item.link ? (
                        <a
                            key={index}
                            href={item.link}
                            className="miu-news-marquee-item"
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                        >
                            {item.text}
                        </a>
                    ) : (
                        <p
                            key={index}
                            className="miu-news-marquee-item"
                        >
                            {item.text}
                        </p>
                    )
                )}

            </div>
        </div>
    );
};

export default Marquee;
