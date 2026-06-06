"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEnquiry } from "@/context/EnquiryContext";
import API from "@/lib/api";
import "@/styles/SchoolPage.css";

const SCHOOLS = {
  "school-of-commerce": {
    name: "School of Commerce",
    icon: "📊",
    color: "#1a3a6b",
    tagline: "Building Future Business Leaders",
    about:
      "The School of Commerce at Manipur International University offers a comprehensive range of programs designed to equip students with strong foundations in business, finance, accounting, and entrepreneurship. Our curriculum blends theoretical knowledge with practical industry exposure, preparing graduates for dynamic roles in the corporate world and beyond.",
    vision:
      "To be a centre of excellence in commerce education, fostering innovation, ethical business practices, and entrepreneurial thinking.",
    mission:
      "To provide quality education in commerce and business studies that empowers students with knowledge, skills, and values to succeed in a competitive global economy.",
    highlights: [
      {
        icon: "🎓",
        image: "https://picsum.photos/seed/commerce1/400/220",
        title: "Industry-Aligned Curriculum",
        desc: "Programs designed in consultation with industry experts to meet current market demands.",
      },
      {
        icon: "💼",
        image: "https://picsum.photos/seed/commerce2/400/220",
        title: "Placement Support",
        desc: "Dedicated placement cell with strong industry connections for career opportunities.",
      },
      {
        icon: "🔬",
        image: "https://picsum.photos/seed/commerce3/400/220",
        title: "Research Focus",
        desc: "Encourages research in commerce, finance, and business management.",
      },
      {
        icon: "🌐",
        image: "https://picsum.photos/seed/commerce4/400/220",
        title: "Global Exposure",
        desc: "International collaborations and exchange programs for global perspective.",
      },
    ],
    programs: [
      {
        title: "B.Com (Bachelor of Commerce)",
        duration: "3 Years",
        eligibility: "10+2",
        icon: "📈",
      },
      {
        title: "B.Com (Hons)",
        duration: "3 Years",
        eligibility: "10+2",
        icon: "📊",
      },
      {
        title: "M.Com (Master of Commerce)",
        duration: "2 Years",
        eligibility: "B.Com",
        icon: "💹",
      },
      {
        title: "BBA (Bachelor of Business Administration)",
        duration: "3 Years",
        eligibility: "10+2",
        icon: "🏢",
      },
      {
        title: "MBA (Master of Business Administration)",
        duration: "2 Years",
        eligibility: "Graduation",
        icon: "👔",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200",
  },
  // 'school-of-computer-application': {
  //   name: 'School of Information Technology',
  //   icon: '💻',
  //   color: '#1a5c1a',
  //   tagline: 'Empowering Digital Innovators',
  //   about: 'The School of Information Technology at MIU is dedicated to producing skilled IT professionals and software developers ready for the digital age. Our programs cover cutting-edge technologies including artificial intelligence, machine learning, web development, and cybersecurity, ensuring students are equipped for the rapidly evolving tech landscape.',
  //   vision: 'To be a premier institution for computer science education, producing innovative technologists who drive digital transformation.',
  //   mission: 'To deliver high-quality computer application education that combines theoretical foundations with hands-on technical skills for real-world problem solving.',
  //   highlights: [
  //     { icon: '🖥️', image: 'https://picsum.photos/seed/it1/400/220', title: 'State-of-the-Art Labs', desc: 'Modern computer labs with latest hardware and software infrastructure.' },
  //     { icon: '🤖', image: 'https://picsum.photos/seed/it2/400/220', title: 'AI & ML Focus', desc: 'Specialized tracks in Artificial Intelligence and Machine Learning.' },
  //     { icon: '🔐', image: 'https://picsum.photos/seed/it3/400/220', title: 'Cybersecurity', desc: 'Dedicated cybersecurity curriculum for the growing digital security sector.' },
  //     { icon: '🚀', image: 'https://picsum.photos/seed/it4/400/220', title: 'Startup Incubation', desc: 'Support for student startups through our incubation center.' },
  //   ],
  //   programs: [
  //     { title: 'BCA (Bachelor of Computer Application)', duration: '3 Years', eligibility: '10+2', icon: '💻' },
  //     { title: 'MCA (Master of Computer Application)', duration: '2 Years', eligibility: 'BCA/B.Sc', icon: '🖥️' },
  //     { title: 'B.Sc Computer Science', duration: '3 Years', eligibility: '10+2 (PCM)', icon: '🔬' },
  //     { title: 'M.Sc Computer Science', duration: '2 Years', eligibility: 'B.Sc CS', icon: '🤖' },
  //     { title: 'PG Diploma in AI & ML', duration: '1 Year', eligibility: 'Graduation', icon: '🧠' },
  //   ],
  //   image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200',
  // },
  "school-of-engineering": {
    name: "School of Engineering",
    icon: "⚙️",
    color: "#8b1a1a",
    tagline: "Engineering the Future",
    about:
      "The School of Engineering at MIU provides rigorous technical education across multiple engineering disciplines. With state-of-the-art laboratories, experienced faculty, and strong industry partnerships, we prepare engineers who can tackle complex real-world challenges with creativity, precision, and ethical responsibility.",
    vision:
      "To be a leading engineering school that produces technically proficient, innovative, and socially responsible engineers.",
    mission:
      "To provide excellence in engineering education through a blend of theoretical knowledge, practical skills, and research that addresses societal needs.",
    highlights: [
      {
        icon: "🔧",
        image: "https://picsum.photos/seed/eng1/400/220",
        title: "Advanced Laboratories",
        desc: "Fully equipped labs for hands-on learning across all engineering disciplines.",
      },
      {
        icon: "🏭",
        image: "https://picsum.photos/seed/eng2/400/220",
        title: "Industry Partnerships",
        desc: "Strong ties with leading engineering firms for internships and placements.",
      },
      {
        icon: "📐",
        image: "https://picsum.photos/seed/eng3/400/220",
        title: "Project-Based Learning",
        desc: "Emphasis on real-world projects and problem-solving from day one.",
      },
      {
        icon: "🌱",
        image: "https://picsum.photos/seed/eng4/400/220",
        title: "Sustainable Engineering",
        desc: "Focus on green technologies and sustainable engineering practices.",
      },
    ],
    programs: [
      {
        title: "B.Tech Civil Engineering",
        duration: "4 Years",
        eligibility: "10+2 (PCM)",
        icon: "🏗️",
      },
      {
        title: "B.Tech Mechanical Engineering",
        duration: "4 Years",
        eligibility: "10+2 (PCM)",
        icon: "⚙️",
      },
      {
        title: "B.Tech Electrical Engineering",
        duration: "4 Years",
        eligibility: "10+2 (PCM)",
        icon: "⚡",
      },
      {
        title: "B.Tech Computer Science & Engineering",
        duration: "4 Years",
        eligibility: "10+2 (PCM)",
        icon: "💻",
      },
      {
        title: "M.Tech (Various Specializations)",
        duration: "2 Years",
        eligibility: "B.Tech",
        icon: "🔬",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
  },
  "school-of-management": {
    name: "School of Management",
    icon: "🏢",
    color: "#5c1a5c",
    tagline: "Developing Tomorrow's Leaders",
    about:
      "The School of Management at MIU is committed to developing strategic thinkers, effective managers, and visionary leaders. Our management programs integrate global business perspectives with local market insights, preparing students for leadership roles in diverse organizational settings across industries.",
    vision:
      "To be a globally recognized management school that nurtures ethical, innovative, and effective business leaders.",
    mission:
      "To provide transformative management education that develops critical thinking, leadership skills, and entrepreneurial mindset for sustainable business success.",
    highlights: [
      {
        icon: "📋",
        image: "https://picsum.photos/seed/mgmt1/400/220",
        title: "Case Study Method",
        desc: "Learning through real business cases from global and Indian companies.",
      },
      {
        icon: "🤝",
        image: "https://picsum.photos/seed/mgmt2/400/220",
        title: "Industry Mentorship",
        desc: "One-on-one mentorship from senior industry professionals.",
      },
      {
        icon: "🌍",
        image: "https://picsum.photos/seed/mgmt3/400/220",
        title: "Global Curriculum",
        desc: "International business curriculum aligned with global management standards.",
      },
      {
        icon: "📊",
        image: "https://picsum.photos/seed/mgmt4/400/220",
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
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
  },
  "school-of-science": {
    name: "School of Science",
    icon: "🔬",
    color: "#1a4a5c",
    tagline: "Discovering the World Through Science",
    about:
      "The School of Science at MIU fosters scientific inquiry, research excellence, and innovation across core and applied science disciplines. Our programs provide students with a strong foundation in scientific principles while encouraging curiosity, critical thinking, and a passion for discovery that drives meaningful contributions to society.",
    vision:
      "To be a centre of scientific excellence that advances knowledge and produces researchers and scientists who address global challenges.",
    mission:
      "To provide rigorous science education that combines fundamental principles with cutting-edge research, preparing students for careers in science, research, and technology.",
    highlights: [
      {
        icon: "🧪",
        image: "https://picsum.photos/seed/sci1/400/220",
        title: "Research Laboratories",
        desc: "Well-equipped research labs for practical scientific exploration.",
      },
      {
        icon: "🌿",
        image: "https://picsum.photos/seed/sci2/400/220",
        title: "Biodiversity Research",
        desc: "Unique focus on Northeast India's rich biodiversity and ecology.",
      },
      {
        icon: "🔭",
        image: "https://picsum.photos/seed/sci3/400/220",
        title: "Interdisciplinary Approach",
        desc: "Programs that bridge multiple scientific disciplines for holistic understanding.",
      },
      {
        icon: "📰",
        image: "https://picsum.photos/seed/sci4/400/220",
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
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
  },
  "school-of-vocational-studies": {
    name: "School of Vocational Studies",
    icon: "🛠️",
    color: "#5c4a1a",
    tagline: "Skills for the Real World",
    about:
      "The School of Vocational Studies at MIU bridges the gap between education and employment by offering skill-based programs aligned with industry needs. Our vocational courses are designed to provide practical, hands-on training that makes graduates job-ready from day one, contributing to the skilled workforce development of Northeast India.",
    vision:
      "To be the leading vocational education institution in Northeast India, producing skilled professionals who drive economic growth.",
    mission:
      "To provide industry-relevant vocational education and training that empowers students with practical skills, professional competencies, and entrepreneurial capabilities.",
    highlights: [
      {
        icon: "🛠️",
        image: "https://picsum.photos/seed/voc1/400/220",
        title: "Hands-On Training",
        desc: "Practical skill development through workshops, labs, and industry visits.",
      },
      {
        icon: "📜",
        image: "https://picsum.photos/seed/voc2/400/220",
        title: "Industry Certifications",
        desc: "Programs aligned with national and international skill certification standards.",
      },
      {
        icon: "🤝",
        image: "https://picsum.photos/seed/voc3/400/220",
        title: "Industry Tie-Ups",
        desc: "Direct partnerships with industries for apprenticeships and placements.",
      },
      {
        icon: "🚀",
        image: "https://picsum.photos/seed/voc4/400/220",
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
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200",
  },
  "school-of-humanities": {
    name: "School of Humanities",
    icon: "📚",
    color: "#6b1a3a",
    tagline: "Exploring Human Culture and Expression",
    about:
      "The School of Humanities at MIU offers comprehensive programs in literature, languages, philosophy, history, and cultural studies. Our curriculum emphasizes critical thinking, cultural awareness, and communication skills that are essential for understanding human society and preparing students for diverse career paths in education, media, public service, and cultural organizations.",
    vision:
      "To be a center of excellence in humanities education that fosters critical thinking, cultural understanding, and humanistic values.",
    mission:
      "To provide quality education in humanities that develops analytical skills, cultural sensitivity, and ethical reasoning while preserving and promoting cultural heritage.",
    highlights: [
      {
        icon: "📖",
        image: "https://picsum.photos/seed/hum1/400/220",
        title: "Rich Literary Tradition",
        desc: "Comprehensive study of classical and contemporary literature from diverse cultures.",
      },
      {
        icon: "🌍",
        image: "https://picsum.photos/seed/hum2/400/220",
        title: "Cultural Studies",
        desc: "Deep exploration of regional and global cultural traditions and practices.",
      },
      {
        icon: "🎭",
        image: "https://picsum.photos/seed/hum3/400/220",
        title: "Creative Expression",
        desc: "Opportunities for creative writing, drama, and artistic expression.",
      },
      {
        icon: "🔍",
        image: "https://picsum.photos/seed/hum4/400/220",
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
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1200",
  },
  "school-of-allied-health-science": {
    name: "School of Allied Health Science",
    icon: "🏥",
    color: "#0d6e6e",
    tagline: "Caring for the Future of Healthcare",
    about:
      "The School of Allied Health Science at MIU is dedicated to training skilled healthcare professionals in paramedical, diagnostic, therapeutic, and rehabilitation sciences. Our programs combine rigorous academic training with hands-on clinical exposure, preparing graduates to serve as vital members of the modern healthcare team.",
    vision:
      "To be a leading institution in allied health education, producing competent, compassionate, and ethical healthcare professionals who contribute to the well-being of society.",
    mission:
      "To provide quality allied health education through evidence-based curricula, clinical training, and research that empowers students to deliver excellent patient care and advance the healthcare sector.",
    highlights: [
      {
        icon: "🩺",
        image: "https://picsum.photos/seed/ahs1/400/220",
        title: "Clinical Training",
        desc: "Hands-on clinical exposure in hospitals and healthcare facilities from the first year.",
      },
      {
        icon: "🔬",
        image: "https://picsum.photos/seed/ahs2/400/220",
        title: "Modern Laboratories",
        desc: "State-of-the-art labs for anatomy, physiology, microbiology, and diagnostic sciences.",
      },
      {
        icon: "🤝",
        image: "https://picsum.photos/seed/ahs3/400/220",
        title: "Hospital Tie-Ups",
        desc: "Strong partnerships with leading hospitals and diagnostic centres for internships and placements.",
      },
      {
        icon: "📋",
        image: "https://picsum.photos/seed/ahs4/400/220",
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
};

const OTHER_SCHOOLS = [
  { name: "School of Commerce", slug: "school-of-commerce", icon: "📊" },
  {
    name: "School of Information Technology",
    slug: "school-of-computer-application",
    icon: "💻",
  },
  { name: "School of Engineering", slug: "school-of-engineering", icon: "⚙️" },
  { name: "School of Management", slug: "school-of-management", icon: "🏢" },
  { name: "School of Science", slug: "school-of-science", icon: "🔬" },
  {
    name: "School of Vocational Studies",
    slug: "school-of-vocational-studies",
    icon: "🛠️",
  },
  { name: "School of Humanities", slug: "school-of-humanities", icon: "📚" },
  {
    name: "School of Allied Health Science",
    slug: "school-of-allied-health-science",
    icon: "🏥",
  },
];

// Alias so both old and new slugs work
SCHOOLS["school-of-information-technology"] =
  SCHOOLS["school-of-computer-application"];

export default function SchoolPage() {
  const params = useParams();
  const slug = decodeURIComponent(params.slug || "");
  const { openEnquiry } = useEnquiry();
  const [apiCourses, setApiCourses] = useState([]);
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load school details from database
  useEffect(() => {
    const loadSchoolData = async () => {
      try {
        const [detailsRes, sectionsRes] = await Promise.all([
          API.get("/settings/school-details"),
          API.get("/settings/schools-section"),
        ]);

        const dbSchools = detailsRes.data?.content || {};
        // const schoolsList = sectionsRes.data?.content?.schools || {};

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
          "school-of-information-technology": [
            "school of computer application",
            "school of information technology",
          ],
          "school-of-commerce": ["school of commerce"],
          "school-of-engineering": ["school of engineering"],
          "school-of-management": ["school of management"],
          "school-of-science": ["school of science"],
          "school-of-vocational-studies": ["school of vocational studies"],
          "school-of-humanities": ["school of humanities"],
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
          href="/information-cell"
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
      {/* Hero */}
      <div
        className="school-hero"
        style={{ "--school-color": schoolData.color }}
      >
        <div
          className="school-hero-bg"
          style={{ backgroundImage: `url(${schoolData.image})` }}
        />
        <div className="school-hero-overlay" />
        <div className="container school-hero-content">
          <nav className="school-breadcrumb">
            <Link href="/">Home</Link> <span>›</span>
            <Link href="/information-cell">Schools</Link> <span>›</span>
            <span>{schoolData.name}</span>
          </nav>
          <div className="school-hero-icon">{schoolData.icon}</div>
          <h1>{schoolData.name}</h1>
          <p className="school-hero-tagline">{schoolData.tagline}</p>
          <a
            href="https://admission.miu.edu.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-orange"
            style={{ marginTop: "20px" }}
          >
            Apply Now
          </a>
        </div>
      </div>

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
                .map((cat) => (
                  <div key={cat.key} className="sp-program-category">
                    <h3
                      className="sp-category-title"
                      style={{ borderLeftColor: schoolData.color }}
                    >
                      {cat.label}{" "}
                      <span className="sp-category-count">
                        {grouped[cat.key].length}
                      </span>
                    </h3>
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
                          <div key={i} className="sp-program-card">
                            <Link
                              href={
                                prog.slug
                                  ? `/courses/${prog.slug}`
                                  : `/courses/${prog._id || i}`
                              }
                              className="sp-program-link"
                            >
                              <div className="sp-program-cover">
                                {prog.cardImage ? (
                                  <img
                                    src={prog.cardImage}
                                    alt={prog.title}
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                      e.target.parentNode.classList.add(
                                        "sp-cover-fallback",
                                      );
                                    }}
                                  />
                                ) : (
                                  <div className="sp-cover-fallback">
                                    <span>{prog.icon}</span>
                                  </div>
                                )}
                                <span className="sp-program-badge">
                                  PROGRAM
                                </span>
                              </div>
                              <div className="sp-program-body">
                                <div className="sp-program-icon">
                                  {prog.icon}
                                </div>
                                <div className="sp-program-title-wrapper">
                                  <h3 className="sp-program-name">
                                    {programName}
                                  </h3>
                                  {specialization && (
                                    <p className="sp-program-specialization">
                                      ({specialization})
                                    </p>
                                  )}
                                </div>
                                {prog.description && (
                                  <p className="sp-program-desc">
                                    {prog.description}
                                  </p>
                                )}
                                <div className="sp-program-footer">
                                  <div className="sp-program-meta">
                                    <div>
                                      <span className="sp-meta-label">
                                        DURATION
                                      </span>
                                      <span className="sp-meta-val">
                                        {prog.duration}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="sp-meta-label">
                                        ELIGIBILITY
                                      </span>
                                      <span className="sp-meta-val">
                                        {prog.eligibility}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div className="sp-program-apply">
                              <a
                                href="https://admission.miu.edu.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sp-apply-btn"
                              >
                                Apply Now
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ));
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

      {/* Other Schools */}
      <section className="sp-section sp-section-alt">
        <div className="container">
          <h2
            className="sp-section-title"
            style={{ textAlign: "center", marginBottom: "30px" }}
          >
            Explore Other Schools
          </h2>
          <div className="sp-other-schools">
            {OTHER_SCHOOLS.filter((s) => s.slug !== slug).map((s) => (
              <Link
                key={s.slug}
                href={`/schools/${s.slug}`}
                className="sp-other-card"
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
