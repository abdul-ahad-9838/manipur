"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "@/styles/HeroTest.css";
import Link from "next/link";

const DEFAULT_PROGRAMS = [
    {
        id: 1,
        title: "School of Engineering and Information Technology",
        description:
            "Explore engineering, technology, computing, and information technology programs. Find the right program for your career goals.",
        image: "/homepage/engineering_and_technology.avif",
        icon: "💻",
        color: "#0a192f",
        url: "/schools/school-of-engineering-and-information-technology",
    },
    {
        id: 2,
        title: "School of Commerce and Management",
        description:
            "Build expertise in business, commerce, management, and entrepreneurship. Discover opportunities to advance your career.",
        image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        icon: "💼",
        color: "#d4af37",
        url: "/schools/school-of-commerce-and-management",
    },
    {
        id: 3,
        title: "School of Science",
        description:
            "Explore diverse science programs that build knowledge, spark curiosity, encourage discovery and prepares you for exiting opportunities in the future.",
        image:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
        icon: "🔬",
        color: "#0a192f",
        url: "/schools/school-of-science",
    },
    {
        id: 4,
        title: "School of Arts and Humanities",
        description:
            "Discover inspiring programs in Arts and Humanities that encourage creative thinking, broaden perspectives, and help you understand people, culture, and society better.",
        image:
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80",
        icon: "📖",
        color: "#0a192f",
        url: "/schools/school-of-arts-and-humanities",
    },
    {
        id: 5,
        title: "School of Fire & Safety",
        description:
            "Explore programs in Fire and Safety that build practical skills, strengthen safety knowledge, and prepare you to protect people, property, and communities.",
        image: "/homepage/fire_and_safety.avif",
        icon: "🔥",
        color: "#d4af37",
        url: "/schools/school-of-fire-&-safety",
    },
    {
        id: 6,
        title: "School of Paramedical Sciences",
        description:
            "Discover programs in Paramedical Sciences that develop practical healthcare skills, build confidence, and prepare you to support patients and healthcare professionals.",
        image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
        icon: "🩺",
        color: "#0a192f",
        url: "/schools/school-of-paramedical-sciences",
    },
    {
        id: 7,
        title: "School of Library and Information Science",
        description:
            "Explore programs in Library and Information Science that build skills in knowledge management, digital resources, research, and modern information services.",
        image:
            "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80",
        icon: "📚",
        color: "#d4af37",
        url: "/schools/school-of-library-and-information-science",
    },
    {
        id: 8,
        title: "School of Journalism & Mass Communication",
        description:
            "Explore programs in Journalism and Mass Communication that build strong communication, creative storytelling, media, and reporting skills for exciting career opportunities.",
        image:
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80",
        icon: "🎙️",
        color: "#0a192f",
        url: "/schools/school-of-journalism-&-mass-communication",
    },
];

const HeroTest = ({ programs = DEFAULT_PROGRAMS }) => {
    const [itemsPerView, setItemsPerView] = useState(3);
    const [index, setIndex] = useState(3);
    const [transition, setTransition] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const isAnimatingRef = useRef(isAnimating);

    useEffect(() => {
        isAnimatingRef.current = isAnimating;
    }, [isAnimating]);

    useEffect(() => {
        const updateItemsPerView = () => {
            if (window.innerWidth < 640) {
                setItemsPerView(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2);
            } else {
                setItemsPerView(3);
            }
        };

        updateItemsPerView();
        window.addEventListener("resize", updateItemsPerView);

        return () => {
            window.removeEventListener("resize", updateItemsPerView);
        };
    }, []);

    const sliderItems = useMemo(() => {
        if (!programs.length) return [];

        const cloneCount = Math.min(itemsPerView, programs.length);

        const headClones = programs.slice(0, cloneCount);
        const tailClones = programs.slice(-cloneCount);

        return [...tailClones, ...programs, ...headClones];
    }, [programs, itemsPerView]);

    const startIndex = Math.min(itemsPerView, programs.length);

    useEffect(() => {
        setTransition(false);
        setIndex(startIndex);

        const timer = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setTransition(true);
            });
        });

        return () => cancelAnimationFrame(timer);
    }, [startIndex, itemsPerView, programs.length]);

    const next = useCallback(() => {
        if (isAnimatingRef.current || programs.length <= itemsPerView) return;

        setIsAnimating(true);
        setTransition(true);
        setIndex((prev) => prev + itemsPerView);
    }, [itemsPerView, programs.length]);

    const prev = useCallback(() => {
        if (isAnimatingRef.current || programs.length <= itemsPerView) return;

        setIsAnimating(true);
        setTransition(true);
        setIndex((prev) => prev - itemsPerView);
    }, [itemsPerView, programs.length]);

    useEffect(() => {
        if (programs.length <= itemsPerView || isPaused) return;

        const autoSlide = setInterval(() => {
            next();
        }, 3500);

        return () => {
            clearInterval(autoSlide);
        };
    }, [next, itemsPerView, programs.length, isPaused]);

    const handleTransitionEnd = () => {
        const cloneCount = Math.min(itemsPerView, programs.length);
        const totalOriginal = programs.length;

        if (index >= totalOriginal + cloneCount) {
            setTransition(false);
            setIndex((prev) => prev - totalOriginal);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTransition(true);
                    setIsAnimating(false);
                });
            });
            return;
        }

        if (index < cloneCount) {
            setTransition(false);
            setIndex((prev) => prev + totalOriginal);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTransition(true);
                    setIsAnimating(false);
                });
            });
            return;
        }

        setIsAnimating(false);
    };

    const handleTouchStart = (e) => {
        setIsPaused(true);
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) {
            setIsPaused(false);
            return;
        }

        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            next();
        } else if (distance < -minSwipeDistance) {
            prev();
        }

        touchStartX.current = 0;
        touchEndX.current = 0;
        setIsPaused(false);
    };

    if (!sliderItems.length) return null;

    const itemWidthPercent = 100 / itemsPerView;

    return (
        <main className="hero-test">
            <section className="programs-section">
                {/* LEFT CONTENT */}
                <div className="programs-header">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "18px",
                        }}
                    >
                        <span
                            style={{
                                width: "40px",
                                height: "2px",
                                background: "#d4a017",
                                display: "inline-block",
                            }}
                        />

                        <span
                            style={{
                                fontSize: "12px",
                                fontWeight: 700,
                                letterSpacing: "2px",
                                color: "#777",
                            }}
                        >
                            Our Programs
                        </span>
                    </div>

                    <h2 className="title">
                        Find Your Path
                        <br />
                        to Success
                    </h2>

                    <p className="description">
                        Choose from 100+ Undergraduate, Graduate, and Professional programs
                        across various disciplines.
                    </p>


                    <Link
                        href="/schools-test"
                        style={{
                            position: "relative",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            padding: "14px 15px",
                            border: "none",
                            borderRadius: "16px",
                            background: "#171717",
                            cursor: "pointer", textAlign: "left", whiteSpace: "nowrap",
                        }} >
                        <span
                            style={{
                                flex: 1,
                                fontSize: "13px",
                                fontWeight: 700,
                                letterSpacing: "0.2px",
                                color: "#ffffff",
                            }} > VIEW ALL PROGRAMS </span>
                        <span style={{ color: "#d4a017", fontSize: "18px", }} > → </span>
                    </Link>


                </div>

                {/* CAROUSEL CONTAINER */}

                <div
                    className="carousel-container"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}

                >
                    <div className="carousel-controls">
                        <button
                            type="button"
                            onClick={prev}
                            disabled={isAnimating || programs.length <= itemsPerView}
                            className="nav-btn"
                            aria-label="Previous programs"
                        >
                            ←
                        </button>

                        <button
                            type="button"
                            onClick={next}
                            disabled={isAnimating || programs.length <= itemsPerView}
                            className="nav-btn"
                            aria-label="Next programs"
                        >
                            →
                        </button>
                    </div>
                    <div
                        className="carousel-track"
                        onTransitionEnd={handleTransitionEnd}
                        style={{
                            transform: `translateX(-${index * itemWidthPercent}%)`,
                            transition: transition
                                ? "transform 0.5s ease-in-out"
                                : "none",
                        }}
                    >
                        {sliderItems.map((program, i) => (
                            <div
                                className="program-card-wrapper"
                                key={`${program.id}-${i}`}
                                style={{
                                    flex: `0 0 ${itemWidthPercent}%`,
                                }}
                            >
                                <article className="program-card">
                                    <div className="card-image-wrapper">
                                        <img
                                            src={program.image}
                                            alt={program.title}
                                            className="card-image"
                                            loading={i < itemsPerView + 1 ? "eager" : "lazy"}
                                        />

                                        <div
                                            className="card-icon"
                                        >
                                            {program.icon}
                                        </div>
                                    </div>

                                    <div className="card-content">
                                        <h3>{program.title}</h3>

                                        <p>{program.description}</p>


                                        <Link
                                            href={program.url}
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                marginTop: "14px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "14px",
                                                padding: "14px 15px",
                                                border: "none",
                                                borderRadius: "16px",
                                                background: "#171717",
                                                cursor: "pointer", textAlign: "left", whiteSpace: "nowrap",
                                            }} >
                                            <span
                                                style={{
                                                    flex: 1,
                                                    fontSize: "13px",
                                                    fontWeight: 700,
                                                    letterSpacing: "0.2px",
                                                    color: "#ffffff",
                                                }} >
                                                Explore More
                                            </span>
                                            <span
                                                style={{ color: "#d4a017", fontSize: "18px", }}
                                            > → </span>
                                        </Link>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HeroTest;