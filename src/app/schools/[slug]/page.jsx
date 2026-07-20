"use client";

import BannerSection from "@/components/BannerSection";
import ProgramCard from "@/components/ProgramCard";
import API from "@/lib/api";
import "@/styles/SchoolPage.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Activity, useEffect, useState } from "react";

const SCHOOLS = {
  "school-of-commerce-and-management": {
    name: "School of Management and Commerce",
    icon: "🏢",
    color: "#5c1a5c",
    tagline: "Developing Tomorrow's Leaders",
    about:
      "The School of Management at MIU is committed to developing strategic thinkers, effective managers, and visionary leaders.",
    vision:
      "To be a globally recognized management school that nurtures ethical, innovative, and effective business leaders.",
    mission:
      "To provide transformative management education that develops critical thinking, leadership skills, and entrepreneurial mindset for sustainable business success.",
    highlights: [
      {
        icon: "📋",
        title: "Case Study Method",
        desc: "Learning through real business cases from global and Indian companies.",
      },
      {
        icon: "🤝",
        title: "Industry Mentorship",
        desc: "One-on-one mentorship from senior industry professionals.",
      },
      {
        icon: "🌍",
        title: "Global Curriculum",
        desc: "International business curriculum aligned with global management standards.",
      },
      {
        icon: "📊",
        title: "Analytics Focus",
        desc: "Data-driven decision making and business analytics integrated throughout.",
      },
    ],
    programs: [
      {
        title: "BBA (Bachelor of Business Administration)",
        duration: "3 Years",
        eligibility: "10+2",
        icon: "📋",
      },
      {
        title: "MBA (Master of Business Administration)",
        duration: "2 Years",
        eligibility: "Graduation",
        icon: "🏢",
      },
      {
        title: "MBA (Human Resource Management)",
        duration: "2 Years",
        eligibility: "Graduation",
        icon: "👥",
      },
      {
        title: "MBA (Marketing Management)",
        duration: "2 Years",
        eligibility: "Graduation",
        icon: "📣",
      },
      {
        title: "MBA (Finance)",
        duration: "2 Years",
        eligibility: "Graduation",
        icon: "💰",
      },
    ],
    image: "/api/images/6a2d3f1d18b853d4777d415b",
  },
  "school-of-science": {
    name: "School of Science",
    icon: "🔬",
    color: "#1a4a5c",
    tagline: "Discovering the World Through Science",
    about:
      "The School of Science at MIU fosters scientific inquiry, research excellence, and innovation across core and applied science disciplines.",
    vision:
      "To be a centre of scientific excellence that advances knowledge and produces researchers and scientists who address global challenges.",
    mission:
      "To provide rigorous science education that combines fundamental principles with cutting-edge research, preparing students for careers in science, research, and technology.",
    highlights: [
      {
        icon: "🧪",
        title: "Research Laboratories",
        desc: "Well-equipped research labs for practical scientific exploration.",
      },
      {
        icon: "🌿",
        title: "Biodiversity Research",
        desc: "Unique focus on Northeast India's rich biodiversity and ecology.",
      },
      {
        icon: "🔭",
        title: "Interdisciplinary Approach",
        desc: "Programs that bridge multiple scientific disciplines for holistic understanding.",
      },
      {
        icon: "📰",
        title: "Publication Support",
        desc: "Encouragement and support for student research publications.",
      },
    ],
    programs: [
      {
        title: "B.Sc Physics",
        duration: "3 Years",
        eligibility: "10+2 (PCM)",
        icon: "⚛️",
      },
      {
        title: "B.Sc Chemistry",
        duration: "3 Years",
        eligibility: "10+2 (PCB/PCM)",
        icon: "🧪",
      },
      {
        title: "B.Sc Mathematics",
        duration: "3 Years",
        eligibility: "10+2 (PCM)",
        icon: "📐",
      },
      {
        title: "B.Sc Botany",
        duration: "3 Years",
        eligibility: "10+2 (PCB)",
        icon: "🌿",
      },
      {
        title: "B.Sc Zoology",
        duration: "3 Years",
        eligibility: "10+2 (PCB)",
        icon: "🦋",
      },
      {
        title: "M.Sc (Various Specializations)",
        duration: "2 Years",
        eligibility: "B.Sc",
        icon: "🔬",
      },
    ],
    image: "/api/images/6a2d3f2118b853d4777d415c",
  },
  "school-of-vocational-studies": {
    name: "School of Vocational Studies",
    icon: "🛠️",
    color: "#5c4a1a",
    tagline: "Skills for the Real World",
    about:
      "The School of Vocational Studies at MIU bridges the gap between education and employment by offering skill-based programs aligned with industry needs.",
    vision:
      "To be the leading vocational education institution in Northeast India, producing skilled professionals who drive economic growth.",
    mission:
      "To provide industry-relevant vocational education and training that empowers students with practical skills, professional competencies, and entrepreneurial capabilities.",
    highlights: [
      {
        icon: "🛠️",
        title: "Hands-On Training",
        desc: "Practical skill development through workshops, labs, and industry visits.",
      },
      {
        icon: "📜",
        title: "Industry Certifications",
        desc: "Programs aligned with national and international skill certification standards.",
      },
      {
        icon: "🤝",
        title: "Industry Tie-Ups",
        desc: "Direct partnerships with industries for apprenticeships and placements.",
      },
      {
        icon: "🚀",
        title: "Entrepreneurship",
        desc: "Support for self-employment and entrepreneurship ventures.",
      },
    ],
    programs: [
      {
        title: "B.Voc Software Development",
        duration: "3 Years",
        eligibility: "10+2",
        icon: "💻",
      },
      {
        title: "B.Voc Retail Management",
        duration: "3 Years",
        eligibility: "10+2",
        icon: "🛒",
      },
      {
        title: "B.Voc Tourism & Hospitality",
        duration: "3 Years",
        eligibility: "10+2",
        icon: "✈️",
      },
      {
        title: "B.Voc Healthcare Management",
        duration: "3 Years",
        eligibility: "10+2",
        icon: "🏥",
      },
      {
        title: "Diploma in Skill Development",
        duration: "1 Year",
        eligibility: "10th Pass",
        icon: "🛠️",
      },
    ],
    image: "/api/images/6a2d3ef718b853d4777d4158",
  },
  "school-of-fire-&-safety": {
    name: "School of Fire & Safety",
    icon: "🏫",
    color: "#1a3a6b",
    tagline: "",
    about: "",
    vision: "",
    mission: "",
    highlights: [],
    programs: [],
    image: "",
  },
  "school-of-library-and-information-science": {
    name: "School of Library and Information Science",
    icon: "🏫",
    color: "#1a3a6b",
    tagline: "",
    about: "",
    vision: "",
    mission: "",
    highlights: [],
    programs: [],
    image: "",
  },
  "school-of-paramedical-sciences": {
    name: "School of Paramedical Sciences",
    icon: "🏥",
    color: "#0d6e6e",
    tagline: "Caring for the Future of Healthcare",
    about:
      "The School of Paramedical Sciences at MIU is dedicated to training skilled healthcare professionals in paramedical, diagnostic, therapeutic, and rehabilitation sciences. Our programs combine rigorous academic training with hands-on clinical exposure, preparing graduates to serve as vital members of the modern healthcare team.",
    vision:
      "To be a leading institution in allied health education, producing competent, compassionate, and ethical healthcare professionals who contribute to the well-being of society.",
    mission:
      "To provide quality allied health education through evidence-based curricula, clinical training, and research that empowers students to deliver excellent patient care and advance the healthcare sector.",
    highlights: [
      {
        icon: "🩺",
        title: "Clinical Training",
        desc: "Hands-on clinical exposure in hospitals and healthcare facilities from the first year.",
      },
      {
        icon: "🔬",
        title: "Modern Laboratories",
        desc: "State-of-the-art labs for anatomy, physiology, microbiology, and diagnostic sciences.",
      },
      {
        icon: "🤝",
        title: "Hospital Tie-Ups",
        desc: "Strong partnerships with leading hospitals and diagnostic centres for internships and placements.",
      },
      {
        icon: "📋",
        title: "Industry-Aligned Curriculum",
        desc: "Programs designed in line with national health sector skill standards and regulatory guidelines.",
      },
    ],
    programs: [
      {
        title: "B.Sc Medical Laboratory Technology",
        duration: "3 Years",
        eligibility: "10+2 (PCB)",
        icon: "🔬",
      },
      {
        title: "B.Sc Radiology & Imaging Technology",
        duration: "3 Years",
        eligibility: "10+2 (PCB)",
        icon: "🩻",
      },
      {
        title: "B.Sc Physiotherapy",
        duration: "4.5 Years",
        eligibility: "10+2 (PCB)",
        icon: "🦾",
      },
      {
        title: "B.Sc Optometry",
        duration: "3 Years",
        eligibility: "10+2 (PCB)",
        icon: "👁️",
      },
      {
        title: "B.Sc Operation Theatre Technology",
        duration: "3 Years",
        eligibility: "10+2 (PCB)",
        icon: "🏥",
      },
      {
        title: "M.Sc Medical Laboratory Technology",
        duration: "2 Years",
        eligibility: "B.Sc MLT",
        icon: "🧬",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
  },
  "school-of-journalism-mass-communication": {
    name: "School of Journalism & Mass Communication",
    icon: "🏫",
    color: "#1a3a6b",
    tagline: "",
    about: "",
    vision: "",
    mission: "",
    highlights: [],
    programs: [],
    image: "",
  },
  "school-of-computer-application": {
    name: "School of Information Technology",
    icon: "💻",
    color: "#1a5c1a",
    tagline: "Empowering Digital Innovators",
    about:
      "The School of Computer Application at MIU is dedicated to producing skilled IT professionals and software developers ready for the digital age.",
    vision:
      "To be a premier institution for computer science education, producing innovative technologists who drive digital transformation.",
    mission:
      "To deliver high-quality computer application education that combines theoretical foundations with hands-on technical skills for real-world problem solving.",
    highlights: [
      {
        icon: "🖥️",
        title: "State-of-the-Art Labs",
        desc: "Modern computer labs with latest hardware and software infrastructure.",
      },
      {
        icon: "🤖",
        title: "AI & ML Focus",
        desc: "Specialized tracks in Artificial Intelligence and Machine Learning.",
      },
      {
        icon: "🔐",
        title: "Cybersecurity",
        desc: "Dedicated cybersecurity curriculum for the growing digital security sector.",
      },
      {
        icon: "🚀",
        title: "Startup Incubation",
        desc: "Support for student startups through our incubation center.",
      },
    ],
    programs: [
      {
        title: "BCA (Bachelor of Computer Application)",
        duration: "3 Years",
        eligibility: "10+2",
        icon: "💻",
      },
      {
        title: "MCA (Master of Computer Application)",
        duration: "2 Years",
        eligibility: "BCA/B.Sc",
        icon: "🖥️",
      },
      {
        title: "B.Sc Computer Science",
        duration: "3 Years",
        eligibility: "10+2 (PCM)",
        icon: "🔬",
      },
      {
        title: "M.Sc Computer Science",
        duration: "2 Years",
        eligibility: "B.Sc CS",
        icon: "🤖",
      },
      {
        title: "PG Diploma in AI & ML",
        duration: "1 Year",
        eligibility: "Graduation",
        icon: "🧠",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
  },
  "school-of-journalism-&-mass-communication": {
    name: "School Of Journalism & Mass Communication",
    icon: "🏫",
    color: "#1a3a6b",
    tagline: "",
    about: "",
    vision: "",
    mission: "",
    highlights: [],
    programs: [],
    image: "",
  },
  "school-of-arts-and-humanities": {
    name: "School of Arts and Humanities",
    icon: "📚",
    color: "#6b1a3a",
    tagline: "Exploring Human Culture and Expression",
    about:
      "The School of Humanities at MIU offers comprehensive programs in literature, languages, philosophy, history, and cultural studies.",
    vision:
      "To be a center of excellence in humanities education that fosters critical thinking, cultural understanding, and humanistic values.",
    mission:
      "To provide quality education in humanities that develops analytical skills, cultural sensitivity, and ethical reasoning while preserving and promoting cultural heritage.",
    highlights: [
      {
        icon: "📖",
        title: "Rich Literary Tradition",
        desc: "Comprehensive study of classical and contemporary literature from diverse cultures.",
      },
      {
        icon: "🌍",
        title: "Cultural Studies",
        desc: "Deep exploration of regional and global cultural traditions and practices.",
      },
      {
        icon: "🎭",
        title: "Creative Expression",
        desc: "Opportunities for creative writing, drama, and artistic expression.",
      },
      {
        icon: "🔍",
        title: "Research Excellence",
        desc: "Strong emphasis on humanities research and scholarly publications.",
      },
    ],
    programs: [
      {
        title: "BA English Literature",
        duration: "3 Years",
        eligibility: "10+2",
        icon: "📚",
      },
      {
        title: "BA History",
        duration: "3 Years",
        eligibility: "10+2",
        icon: "🏛️",
      },
      {
        title: "BA Philosophy",
        duration: "3 Years",
        eligibility: "10+2",
        icon: "🤔",
      },
      {
        title: "MA English Literature",
        duration: "2 Years",
        eligibility: "BA English",
        icon: "📖",
      },
      {
        title: "MA History",
        duration: "2 Years",
        eligibility: "BA History",
        icon: "📜",
      },
    ],
  },
};

export default function SchoolPage() {
  const params = useParams();
  const slug = decodeURIComponent(params.slug || "");
  const [apiCourses, setApiCourses] = useState([]);
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const toggleCategory = (key) => {
    setCollapsedCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Load school details from database
  useEffect(() => {
    const loadSchoolData = async () => {
      try {
        const [detailsRes, sectionsRes] = await Promise.all([
          API.get("/settings/school-details"),
          API.get("/settings/schools-section"),
        ]);

        const dbSchools = detailsRes.data?.content || {};

        // Normalize slug alias
        const resolvedSlug =
          slug === "school-of-information-technology"
            ? "school-of-computer-application"
            : slug;

        // 1. Try school-details by slug or resolved slug
        let school =
          dbSchools[slug] ||
          dbSchools[resolvedSlug] ||
          SCHOOLS[resolvedSlug] ||
          SCHOOLS[slug];

        // 2. If not found, build from schools-section list (for dynamically added schools)
        if (!school) {
          const found = (sectionsRes.data?.content?.schools || []).find(
            (s) => s.slug === slug,
          );
          if (found) {
            school = {
              name: found.name,
              icon: found.icon || "🏫",
              color: found.color || "#1a3a6b",
              tagline: found.tagline || `Welcome to ${found.name}`,
              about:
                found.about ||
                `${found.name} at Manipur International University offers quality education and training.`,
              vision:
                found.vision || "To be a centre of excellence in education.",
              mission:
                found.mission ||
                "To provide quality education that empowers students.",
              highlights: found.highlights || [],
              programs: found.programs || [],
              image: found.image || "",
            };
          }
        }

        setSchoolData(school || null);
      } catch (error) {
        console.error("loadSchoolData error:", error);
        setSchoolData(SCHOOLS[slug] || null);
      } finally {
        setLoading(false);
      }
    };

    loadSchoolData();
  }, [slug]);

  // Redirect vocational studies to external site
  useEffect(() => {
    if (slug === "school-of-vocational-studies") {
      window.location.replace("https://vocational.miu.edu.in/");
    }
  }, [slug]);

  useEffect(() => {
    API.get("/courses")
      .then(({ data }) => {
        const slugToDBNames = {
          "school-of-computer-application": [
            "school of computer application",
            "school of information technology",
          ],
          // "school-of-information-technology": [
          //   "school of computer application",
          //   "school of information technology",
          // ],
          "school-of-commerce-and-management": [
            "school of commerce and management",
          ],
          // "school-of-engineering": ["school of engineering"],
          "school-of-engineering-and-information-technology": [
            "school of engineering and information technology",
          ],
          "school-of-library-and-information-science": [
            "school of library and information science",
          ],
          "school-of-journalism-&-mass-communication": [
            "school of journalism & mass communication",
          ],
          "school-of-fire-&-safety": ["school of fire & safety"],
          // "school-of-management": ["school of management"],
          "school-of-science": ["school of science"],
          "school-of-paramedical-sciences": ["school of paramedical sciences"],
          "school-of-vocational-studies": ["school of vocational studies"],
          "school-of-humanities": ["school of humanities"],
          "school-of-arts-and-humanities": ["school of arts and humanities"],
          "school-of-allied-health-science": [
            "school of allied health science",
          ],
        };

        const matchNames =
          slugToDBNames[slug] ||
          (schoolData ? [schoolData.name.toLowerCase()] : []);

        if (!matchNames.length) return;

        const filtered = data.filter((c) => {
          const cSchool = (c.school || "").toLowerCase().trim();
          return matchNames.some((n) => cSchool === n) && c.isActive !== false;
        });

        filtered.sort((a, b) => (a.order || 0) - (b.order || 0));
        setApiCourses(filtered);
      })
      .catch((e) => console.error("courses error:", e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (loading)
    return (
      <div style={{ padding: "160px 20px", textAlign: "center" }}>
        <h2>Loading...</h2>
      </div>
    );

  if (!schoolData)
    return (
      <div style={{ padding: "160px 20px", textAlign: "center" }}>
        <h2>School not found</h2>
        <Link
          href="/"
          className="btn btn-orange"
          style={{ marginTop: "20px", display: "inline-block" }}
        >
          ← All Schools
        </Link>
      </div>
    );

  const programs = apiCourses.map((c) => ({
    _id: c._id,
    title: c.title,
    specialisation: c.specialisation || "",
    duration: c.duration || "3 Years",
    eligibility: c.eligibility || "10+2",
    icon: c.icon || "🎓",
    slug: c.slug || "",
    coverImage: c.coverImage || "",
    cardImage: c.cardImage || "",
    description: c.description || "",
  }));
  return (
    <div className="school-page">
      <BannerSection data={schoolData} url="https://admission.miu.edu.in" />

      {/* Highlights */}
      <section className="sp-section sp-section-alt">
        <div className="container">
          <div className="sp-section-header">
            <span className="section-badge">WHY CHOOSE US</span>
            <h2 className="sp-section-title">School Highlights</h2>
          </div>
          <div className="sp-highlights-grid">
            {schoolData.highlights.map((h, i) => (
              <div
                key={i}
                className="sp-highlight-card"
                style={{ borderTopColor: schoolData.color }}
              >
                <div className="sp-highlight-image">
                  {h.image ? (
                    <img
                      src={h.image}
                      alt={h.title}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="sp-highlight-icon-fallback"
                    style={{ display: h.image ? "none" : "flex" }}
                  >
                    {h.icon}
                  </div>
                </div>
                <div className="sp-highlight-content">
                  <h3>{h.title}</h3>
                  <p>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="sp-section">
        <div className="container">
          <div className="sp-section-header">
            <span className="section-badge">ACADEMICS</span>
            <h2 className="sp-section-title">Programs Offered</h2>
          </div>

          {programs.length > 0 ? (
            (() => {
              // Group programs by category
              const categories = [
                {
                  key: "bachelors",
                  label: "Bachelor's Programs",
                  match: (t) =>
                    /^b\.|^bachelor|^bca|^bba|^b\.tech|^b\.sc|^b\.com|^b\.voc|^b\.a/i.test(
                      t,
                    ),
                },
                {
                  key: "masters",
                  label: "Master's Programs",
                  match: (t) =>
                    /^m\.|^master|^mca|^mba|^m\.tech|^m\.sc|^m\.com|^m\.a/i.test(
                      t,
                    ),
                },
                {
                  key: "pgdiploma",
                  label: "PG Diploma",
                  match: (t) =>
                    /^pg diploma|^post.?graduate diploma|^p\.g\. diploma/i.test(
                      t,
                    ),
                },
                {
                  key: "diploma",
                  label: "Diploma Programs",
                  match: (t) => /^diploma/i.test(t),
                },
                { key: "other", label: "Other Programs", match: () => true },
              ];

              const grouped = {};
              categories.forEach((c) => {
                grouped[c.key] = [];
              });

              programs.forEach((prog) => {
                const title = prog.title.trim();
                const cat = categories.find((c) => c.match(title));
                grouped[cat.key].push(prog);
              });

              return categories
                .filter((c) => grouped[c.key].length > 0)
                .map((cat) => {
                  const isCollapsed = !!collapsedCategories[cat.key];
                  return (
                    <div key={cat.key} className="sp-program-category">
                      <h3
                        onClick={() => toggleCategory(cat.key)}
                        className="sp-category-title"
                        style={{
                          borderLeftColor: schoolData.color,
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                      >
                        {cat.label}
                        <span className="sp-category-count">
                          {grouped[cat.key].length}
                        </span>
                        <span
                          className="sp-toggle-icon"
                          style={{
                            marginLeft: "auto",
                            display: "inline-block",
                            transition: "transform 0.25s",
                            transform: isCollapsed
                              ? "rotate(-90deg)"
                              : "rotate(0deg)",
                          }}
                        >
                          ▾
                        </span>
                      </h3>
                      <Activity mode={!isCollapsed ? "visible" : "hidden"}>
                        <div className="sp-programs-grid">
                          {grouped[cat.key].map((prog, i) => {
                            const titleMatch =
                              prog.title.match(/^(.*?)\s*\((.*?)\)$/);
                            const programName = titleMatch
                              ? titleMatch[1].trim()
                              : prog.title;
                            const specialization =
                              prog.specialisation ||
                              (titleMatch ? titleMatch[2].trim() : "");
                            return (
                              <ProgramCard
                                key={i}
                                program={prog}
                                programName={programName}
                                specialization={specialization}
                              />
                            );
                          })}
                        </div>
                      </Activity>
                    </div>
                  );
                });
            })()
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
                background: "white",
                borderRadius: "12px",
                color: "#888",
              }}
            >
              <p style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
                No programs listed yet.
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  textTransform: "none",
                }}
              >
                Programs will appear here once added from the admin panel.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="sp-cta" style={{ background: schoolData.color }}>
        <div className="container sp-cta-inner">
          <div>
            <h2>Ready to Join {schoolData.name}?</h2>
            <p>
              Take the first step towards a rewarding career. Apply for
              admissions today.
            </p>
          </div>
          <div className="sp-cta-btns">
            <a
              href="https://admission.miu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ background: "white", color: schoolData.color }}
            >
              Apply Now
            </a>
            <Link
              href="/contact"
              className="btn"
              style={{
                background: "transparent",
                color: "white",
                border: "2px solid white",
              }}
            >
              Enquire
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
