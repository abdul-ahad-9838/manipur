"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import API from "@/lib/api";
import "@/styles/Programs.css";
import Image from "next/image";

const DEFAULT_SCHOOLS = [
  {
    name: "School of Commerce",
    slug: "school-of-commerce",
    desc: "Nurturing future business leaders with a strong foundation in commerce, finance, and entrepreneurship.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "School of Information Technology",
    slug: "school-of-information-technology",
    desc: "Empowering students with cutting-edge computing skills, software development, and digital innovation.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "School of Engineering",
    slug: "school-of-engineering",
    desc: "Building technically proficient engineers ready to solve real-world challenges with creativity and precision.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "School of Management",
    slug: "school-of-management",
    desc: "Developing strategic thinkers and effective managers equipped for leadership in a dynamic global economy.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "School of Science",
    slug: "school-of-science",
    desc: "Fostering scientific inquiry, research excellence, and innovation across core and applied science disciplines.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "School of Vocational Studies",
    slug: "school-of-vocational-studies",
    desc: "Bridging education and employment with skill-based programs aligned with industry needs.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600",
    externalUrl: "https://vocational.miu.edu.in/",
  },
  {
    name: "School of Allied Health Science",
    slug: "school-of-allied-health-science",
    desc: "Training compassionate healthcare professionals in paramedical, diagnostic, and therapeutic sciences.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
  },
];

const Programs = () => {
  const [schools, setSchools] = useState(DEFAULT_SCHOOLS);
  const [content, setContent] = useState({
    badge: "ACADEMICS",
    title: "Schools & Faculties",
    subtitle:
      "Our Schools and Faculties bring together experienced academicians and subject experts dedicated to excellence in teaching and research.",
  });

  useEffect(() => {
    API.get("/settings/schools-section")
      .then(({ data }) => {
        if (data?.content) {
          if (data.content.schools?.length) {
            const dbSchools = data.content.schools;
            // Merge: append any DEFAULT_SCHOOLS not already in DB list
            const dbSlugs = new Set(dbSchools.map((s) => s.slug));
            const missing = DEFAULT_SCHOOLS.filter((s) => !dbSlugs.has(s.slug));
            setSchools([...dbSchools, ...missing]);
          }
          setContent((prev) => ({ ...prev, ...data.content }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="academics" className="programs-section section-padding">
      <div className="container">
        <div className="programs-top">
          <div className="programs-top-left">
            <span className="section-badge">{content.badge}</span>
            <h2 className="section-title">{content.title}</h2>
            <p className="section-subtitle">{content.subtitle}</p>
          </div>
        </div>

        <div className="programs-grid">
          {schools.map((school, i) => (
            <div className="program-card" key={i}>
              <div className="program-card-img">
                {/* <img
                  src={
                    school.image ||
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600"
                  }
                  alt={school.name}
                /> */}
                <Image
                  src={
                    school.image ||
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600"
                  }
                  alt={school.name}
                  className="program-img"
                  width={600}
                  height={400}
                />
                <div className="program-card-img-overlay" />
              </div>
              <div className="program-card-body">
                <h3 className="program-title">{school.name}</h3>
                <p className="program-desc">{school.desc}</p>
                <div className="program-footer">
                  {school.externalUrl ||
                  school.slug === "school-of-vocational-studies" ? (
                    <a
                      href={
                        school.externalUrl || "https://vocational.miu.edu.in/"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="program-read-more"
                    >
                      Read More
                    </a>
                  ) : (
                    <Link
                      href={`/schools/${school.slug}`}
                      className="program-read-more"
                    >
                      Read More
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
