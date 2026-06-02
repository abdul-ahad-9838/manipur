"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import ImageUploader from "@/components/ImageUploader";

// ── shared styles ──────────────────────────────────────────────
const card = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
  marginBottom: "30px",
};
const inp = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "0.95rem",
  marginTop: "6px",
  boxSizing: "border-box",
};
const lbl = { fontWeight: "600", fontSize: "0.9rem", display: "block" };
const row = {
  display: "flex",
  gap: "15px",
  marginBottom: "15px",
  flexWrap: "wrap",
};

// ── default leadership data (mirrors component defaults) ───────
const DEFAULT_LEADERS = [
  {
    role: "Chancellor",
    name: "Dr. Hari Kumar",
    image: "/leadership/chancellor.png",
    title: "Welcome Message",
    active: false,
    message: [
      "Dear Students, Faculty, Staff, and Visitors,",
      "Welcome to Manipur International University. It is both an honor and a privilege to serve as the Chancellor of this esteemed institution. At MIU, we are committed to fostering a culture defined by academic excellence, innovation, and inclusivity, where every learner is empowered to realize their fullest potential.",
      "Our university reflects a strong legacy of achievement and an unwavering commitment to shaping future-ready leaders. We provide a dynamic academic environment that nurtures intellectual growth, professional competence, and ethical responsibility.",
      "We firmly believe that education is a transformative force that shapes individuals and contributes meaningfully to society.",
      "As we move forward, we remain dedicated to advancing academic excellence through innovative programs, interdisciplinary engagement, and a strong focus on societal progress. I invite you to explore our university and become a part of this inspiring journey.",
    ],
    signature: {
      name: "Dr. Hari Kumar",
      role: "Chancellor, Manipur International University",
    },
  },
  {
    role: "Vice Chancellor",
    name: "Vice Chancellor",
    image: "/leadership/vc.png",
    title: "Message from the Vice Chancellor",
    active: false,
    message: [
      "Dear Students, Faculty Members, and Distinguished Visitors,",
      "It is both an honor and a privilege to welcome you to Manipur International University. As the Vice Chancellor, I take great pride in leading an institution that is committed to academic excellence, innovation, and the holistic development of its learners.",
      "Our university strives to create a dynamic and inclusive learning ecosystem where intellectual curiosity is nurtured, research is encouraged, and innovation thrives.",
      "We are dedicated to upholding the highest standards of teaching, research, and professional development.",
      "As you explore Manipur International University, you will find a community driven by purpose, excellence, and continuous growth. I extend my best wishes to all of you for a successful and fulfilling journey ahead.",
    ],
    signature: {
      name: "Vice Chancellor",
      role: "Manipur International University",
    },
  },
  {
    role: "Pro Vice Chancellor",
    name: "Pro Vice Chancellor",
    image: "/leadership/pro_vc.png",
    title: "Welcome Message",
    active: false,
    message: [
      "Dear Students, Faculty, and Esteemed Stakeholders,",
      "It is with great pride and a deep sense of responsibility that I extend a warm welcome to you at Manipur International University.",
      "Our university is dedicated to fostering an ecosystem that nurtures intellectual curiosity, critical thinking, and professional competence.",
      "The Office of the Pro Vice Chancellor is committed to strengthening academic excellence, operational efficiency, and institutional growth.",
    ],
    signature: {
      name: "Pro Vice Chancellor",
      role: "(Acting Vice Chancellor), MIU",
    },
  },
  {
    role: "Registrar",
    name: "Registrar",
    image: "/leadership/registrar.png",
    title: "Welcome Message",
    active: false,
    message: [
      "Dear Students, Faculty, and Esteemed Stakeholders,",
      "It gives me immense pleasure to welcome you to Manipur International University (MIU)—an institution committed to academic excellence, innovation, and holistic development.",
      "Nestled amidst the pristine valleys and scenic blue hills of Manipur, MIU offers an intellectually stimulating and serene environment.",
      "May your journey here be one of discovery, growth, and excellence.",
    ],
    signature: { name: "Registrar", role: "Manipur International University" },
  },
  {
    role: "Director – Admissions",
    name: "Director – Admissions",
    image: "/leadership/director_admissions.png",
    title: "Welcome Message",
    active: false,
    message: [
      "Dear Students, Faculty, and Friends,",
      "It gives me immense pleasure to welcome you to Manipur International University.",
      "We firmly believe that every learner possesses the potential to achieve excellence when guided by the right opportunities and mentorship.",
      "We look forward to welcoming you to the MIU community and being a part of your academic and professional journey.",
    ],
    signature: {
      name: "Director – Admissions",
      role: "Manipur International University",
    },
  },
  {
    role: "Controller of Examinations",
    name: "Controller of Examinations (COE)",
    image: "/leadership/coe.png",
    title: "Message from the COE",
    active: false,
    message: [
      "Dear Students,",
      "Greetings from Manipur International University. It is my privilege to extend my best wishes to all students as you embark on your academic journey with us.",
      "At MIU, we are committed to ensuring a fair, robust, and student-centric examination process.",
      "The Examination Department remains dedicated to providing timely support, clear communication, and efficient processes.",
    ],
    signature: {
      name: "Controller of Examinations (COE)",
      role: "Manipur International University",
    },
  },
];

const DEFAULT_SPOTLIGHT_ROW1 = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    title: "Global Summit 2026",
    desc: "",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800",
    title: "Youth Talk",
    desc: "",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    title: "Convocation Ceremony",
    desc: "",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    title: "Annual Cultural Fest",
    desc: "",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
    title: "Dance Competition",
    desc: "",
  },
];
const DEFAULT_SPOTLIGHT_ROW2 = [
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800",
    title: "Coke Studio Concert",
    desc: "",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
    title: "Live Concerts",
    desc: "",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
    title: "Extra-Curricular",
    desc: "",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80&w=800",
    title: "Guest Sessions",
    desc: "",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1561489422-45de3d015e3e?auto=format&fit=crop&q=80&w=800",
    title: "Awards & Recognition",
    desc: "",
  },
];

// ── small reusable image-grid editor ──────────────────────────
function ImageGrid({ images, onChange, labelKey = "title", srcKey = "src" }) {
  const [newUrl, setNewUrl] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const add = () => {
    if (!newUrl) return;
    const next = [
      ...images,
      { id: Date.now(), [srcKey]: newUrl, [labelKey]: newLabel, desc: "" },
    ];
    onChange(next);
    setNewUrl("");
    setNewLabel("");
  };

  const remove = (idx) => onChange(images.filter((_, i) => i !== idx));

  const update = (idx, field, val) => {
    const next = images.map((img, i) =>
      i === idx ? { ...img, [field]: val } : img,
    );
    onChange(next);
  };

  return (
    <div>
      <div style={row}>
        <input
          style={{ ...inp, flex: 2, marginTop: 0 }}
          placeholder="Image URL"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <input
          style={{ ...inp, flex: 1, marginTop: 0 }}
          placeholder="Label / Title"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <button
          onClick={add}
          className="btn btn-black"
          style={{ whiteSpace: "nowrap" }}
        >
          + Add URL
        </button>
      </div>
      {/* Upload from PC */}
      <div style={{ marginBottom: "12px" }}>
        <ImageUploader
          label=""
          value=""
          onChange={(url) => {
            if (url)
              onChange([
                ...images,
                { id: Date.now(), [srcKey]: url, [labelKey]: "", desc: "" },
              ]);
          }}
          placeholder="Or upload from PC"
          height={0}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        {images.map((img, idx) => (
          <div
            key={img.id || idx}
            style={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid #eee",
            }}
          >
            <img
              src={img[srcKey] || null}
              alt={img[labelKey]}
              style={{
                width: "100%",
                height: "110px",
                objectFit: "cover",
                display: img[srcKey] ? "block" : "none",
              }}
            />
            <div style={{ padding: "8px" }}>
              <input
                value={img[labelKey] || ""}
                onChange={(e) => update(idx, labelKey, e.target.value)}
                style={{
                  ...inp,
                  marginTop: 0,
                  fontSize: "0.8rem",
                  padding: "5px 8px",
                }}
                placeholder="Title"
              />
              <input
                value={img[srcKey] || ""}
                onChange={(e) => update(idx, srcKey, e.target.value)}
                style={{
                  ...inp,
                  marginTop: "5px",
                  fontSize: "0.75rem",
                  padding: "5px 8px",
                }}
                placeholder="URL"
              />
            </div>
            <button
              onClick={() => remove(idx)}
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                background: "rgba(200,0,0,0.85)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                lineHeight: "24px",
                textAlign: "center",
              }}
            >
              ×
            </button>
          </div>
        ))}
        {images.length === 0 && (
          <p
            style={{
              color: "#aaa",
              gridColumn: "1/-1",
              padding: "20px",
              textAlign: "center",
              border: "1px dashed #ddd",
              borderRadius: "8px",
            }}
          >
            No images. Add one above.
          </p>
        )}
      </div>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────
export default function ContentManager() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("hero");
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  // Hero
  const [heroData, setHeroData] = useState({
    title: "",
    subtitle: "",
    images: [],
  });

  // Leadership
  const [leaders, setLeaders] = useState(DEFAULT_LEADERS);

  // Spotlight
  const [spotRow1, setSpotRow1] = useState(DEFAULT_SPOTLIGHT_ROW1);
  const [spotRow2, setSpotRow2] = useState(DEFAULT_SPOTLIGHT_ROW2);

  // About header image
  const [aboutData, setAboutData] = useState({
    headerImage: "",
    introText: "",
  });

  // Recognitions / Accreditations
  const DEFAULT_RECOGNITIONS = [
    {
      name: "All India Council for Technical Education",
      short: "AICTE",
      logo: "",
      desc: "Statutory body under Ministry of Education, Govt. of India",
      color: "#1a3a6b",
    },
    {
      name: "Association of Indian Universities",
      short: "AIU",
      logo: "",
      desc: "Premier body of universities in India since 1925",
      color: "#8b1a1a",
    },
    {
      name: "University Grants Commission",
      short: "UGC",
      logo: "",
      desc: "Recognized under Section 2(f) & 22 of UGC Act, 1956",
      color: "#1a5c1a",
    },
  ];
  const [recognitions, setRecognitions] = useState(DEFAULT_RECOGNITIONS);
  const dragRecIdx = useRef(null);

  // Placements
  const [placementsData, setPlacementsData] = useState({
    badge: "PLACEMENT STATISTICS",
    title: "Record-Breaking Placements",
    subtitle:
      "Our students are recruited by top Fortune 500 companies globally, ensuring a massive return on investment.",
    stats: [
      { val: "500+", label: "Recruiters" },
      { val: "95%", label: "Placement Rate" },
      { val: "10 LPA", label: "Highest Package" },
      { val: "2000+", label: "Students Placed" },
      { val: "300+", label: "Internship Partners" },
      { val: "50+", label: "Industry Collaborations" },
      { val: "100+", label: "Annual Hiring Drives" },
    ],
    companies:
      "Microsoft,Google,Amazon,Cognizant,Capgemini,TCS,Infosys,Wipro,IBM,Accenture",
    companyLogos: [],
  });

  // Campus Life
  const DEFAULT_CAMPUS_TABS = [
    {
      id: "library",
      name: "Central Library",
      img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "labs",
      name: "High-Tech Labs",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "hostels",
      name: "Premium Hostels",
      img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "sports",
      name: "Sports Complex",
      img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
    },
  ];
  const [campusContent, setCampusContent] = useState({
    title: "A Campus Built For You",
    subtitle:
      "Experience world-class infrastructure spread over a massive, eco-friendly campus.",
    tabs: DEFAULT_CAMPUS_TABS,
  });

  // Ecosystem cards
  const DEFAULT_ECO = [
    {
      id: 1,
      label: "ACADEMIC & CULTURAL EXCELLENCE",
      title: "Where Innovation Meets Heritage",
      description:
        "Empowering future scientists with state-of-the-art laboratories.",
      image:
        "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: 2,
      label: "CAREER SUCCESS",
      title: "Global Career Opportunities",
      description: "Unmatched placement records with the world's top MNCs.",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: 3,
      label: "ENTREPRENEURSHIP",
      title: "Startup Incubation Center",
      description: "Turning ideas into reality with mentorship and funding.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: 4,
      label: "360° LEARNING",
      title: "The Complete Ecosystem",
      description: "Academic learning, physical growth, and mental well-being.",
      image:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: 5,
      label: "RESEARCH & INNOVATION",
      title: "Leading the Way to Discovery",
      description: "Research-intensive programs and advanced facilities.",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
    },
  ];
  const [ecoCards, setEcoCards] = useState(DEFAULT_ECO);

  // Footer
  const [footerData, setFooterData] = useState({
    aboutText: "Transforming education with a globally recognized curriculum.",
    address: "MIU Palace, Airport Road, Ghari, Imphal, Manipur 795140",
    phone: "+91 9319727766",
    email: "admission@miu.edu.in",
    facebook:
      "https://www.facebook.com/ManipurInternationalUniversityOfficial/",
    twitter: "https://x.com/MIU_India",
    linkedin:
      "http://in.linkedin.com/company/manipur-international-university-miu",
    instagram: "https://www.instagram.com/miu.india",
    copyright: "Manipur International University. All Rights Reserved.",
  });

  // Schools section
  const DEFAULT_SCHOOLS = [
    {
      name: "School of Commerce",
      slug: "school-of-commerce",
      desc: "Nurturing future business leaders.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "School of Information Technology",
      slug: "school-of-computer-application",
      desc: "Empowering digital innovators.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "School of Engineering",
      slug: "school-of-engineering",
      desc: "Engineering the future.",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "School of Management",
      slug: "school-of-management",
      desc: "Developing tomorrow's leaders.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "School of Science",
      slug: "school-of-science",
      desc: "Discovering the world through science.",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "School of Vocational Studies",
      slug: "school-of-vocational-studies",
      desc: "Skills for the real world.",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600",
    },
    {
      name: "School of Allied Health Science",
      slug: "school-of-allied-health-science",
      desc: "Training compassionate healthcare professionals.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    },
  ];
  const [schoolsSection, setSchoolsSection] = useState({
    badge: "ACADEMICS",
    title: "Schools & Faculties",
    subtitle:
      "Our Schools and Faculties bring together experienced academicians.",
    schools: DEFAULT_SCHOOLS,
  });

  // Accreditations header
  const [accHeader, setAccHeader] = useState({
    badge: "AFFILIATIONS & ACCREDITATION",
    title: "Recognized by Leading Education Bodies",
    desc: "MIU holds prestigious recognitions from top national councils.",
  });

  // Page hero images (admissions, contact, exams) + about who-we-are image
  const [pageAdmissions, setPageAdmissions] = useState({
    heroImage: "",
    heroTitle: "Admissions 2026",
    heroSubtitle:
      "Join Manipur International University and transform your future.",
  });
  const [pageContact, setPageContact] = useState({
    heroImage: "",
    heroTitle: "Contact Us",
    heroSubtitle: "We're here to help. Reach out to us anytime.",
  });
  const [pageExams, setPageExams] = useState({
    heroImage: "",
    heroTitle: "Examinations",
    heroSubtitle:
      "Access official schedules, results, and examination-related announcements.",
  });
  const [pageAboutWho, setPageAboutWho] = useState({ whoWeAreImage: "" });

  // Academic Council
  const [acData, setAcData] = useState({
    title: "IInd Academic Council",
    subtitle:
      "Manipur International University — Term: 21st Dec 2024 to 31st Dec 2027",
    intro:
      "The IInd Academic Council consists of 60 members for the duration 21 Dec 2024 to 31st Dec 2027.",
    notificationUrl: "",
  });

  // IQAC
  const [iqacData, setIqacData] = useState({
    title: "Internal Quality Assurance Cell",
    subtitle: "Manipur International University",
    established: "8th May 2021",
    regulationsUrl: "",
    about:
      "The IQAC at MIU was established on 8th May 2021 to institutionalize quality enhancement and sustenance.",
    vision:
      "Developing system of conscious, consistent and catalytic improvement in the overall performance of institution.",
  });

  // Student Life Pages
  const DEFAULT_STUDENT_LIFE_PAGES = {
    "incubation-center": {
      title: "Incubation Center",
      badge: "ENTREPRENEURSHIP",
      subtitle:
        "Empowering Innovation • Fostering Entrepreneurship • Building Tomorrow",
      content: "",
    },
    cpio: {
      title: "CPIO",
      badge: "TRANSPARENCY",
      subtitle: "Right to Information Act, 2005",
      content: "",
    },
    "grievance-cell": {
      title: "Grievance Cell",
      badge: "GRIEVANCE REDRESSAL",
      subtitle: "Fair, Transparent, and Timely Resolution",
      content: "",
    },
    "equal-opportunity-cell": {
      title: "Equal Opportunity Cell",
      badge: "EQUITY & INCLUSION",
      subtitle: "Empowering Diversity, Ensuring Equality",
      content: "",
    },
    "research-development-cell": {
      title: "Research & Development Cell",
      badge: "RESEARCH & INNOVATION",
      subtitle: "Advancing Knowledge Through Research Excellence",
      content: "",
    },
    ombudsperson: {
      title: "Ombudsperson",
      badge: "STUDENT WELFARE",
      subtitle: "Students' Grievances Redressal Committee",
      content: "",
    },
    "project-development-cell": {
      title: "Project Development Cell",
      badge: "INNOVATION & DEVELOPMENT",
      subtitle: "Transforming Ideas into Impactful Solutions",
      content: "",
    },
    "sedg-cell": {
      title: "SEDG Cell",
      badge: "EQUITY · DIGNITY · OPPORTUNITY",
      subtitle: "Socio-Economically Disadvantaged Group Cell",
      content: "",
    },
    awards: {
      title: "Awards & Achievements",
      badge: "RECOGNITION",
      subtitle: "Celebrating Excellence and Innovation",
      content: "",
    },
    "constituent-colleges": {
      title: "Constituent Colleges",
      badge: "ACADEMIC NETWORK",
      subtitle: "Expanding Access to Quality Education",
      content: "",
    },
    "health-facilities": {
      title: "Health Facilities",
      badge: "HEALTH & WELLNESS",
      subtitle: "Your Health, Our Priority",
      content: "",
    },
  };
  const [studentLifePages, setStudentLifePages] = useState(
    DEFAULT_STUDENT_LIFE_PAGES,
  );

  // School Details - comprehensive school information
  const DEFAULT_SCHOOL_DETAILS = {
    "school-of-commerce": {
      name: "School of Commerce",
      icon: "📊",
      color: "#1a3a6b",
      tagline: "Building Future Business Leaders",
      about:
        "The School of Commerce at Manipur International University offers a comprehensive range of programs designed to equip students with strong foundations in business, finance, accounting, and entrepreneurship.",
      vision:
        "To be a centre of excellence in commerce education, fostering innovation, ethical business practices, and entrepreneurial thinking.",
      mission:
        "To provide quality education in commerce and business studies that empowers students with knowledge, skills, and values to succeed in a competitive global economy.",
      highlights: [
        {
          icon: "🎓",
          title: "Industry-Aligned Curriculum",
          desc: "Programs designed in consultation with industry experts to meet current market demands.",
        },
        {
          icon: "💼",
          title: "Placement Support",
          desc: "Dedicated placement cell with strong industry connections for career opportunities.",
        },
        {
          icon: "🔬",
          title: "Research Focus",
          desc: "Encourages research in commerce, finance, and business management.",
        },
        {
          icon: "🌐",
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
    "school-of-computer-application": {
      name: "School of Information Technology",
      icon: "💻",
      color: "#1a5c1a",
      tagline: "Empowering Digital Innovators",
      about:
        "The School of Information Technology at MIU is dedicated to producing skilled IT professionals and software developers ready for the digital age.",
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
    "school-of-engineering": {
      name: "School of Engineering",
      icon: "⚙️",
      color: "#8b1a1a",
      tagline: "Engineering the Future",
      about:
        "The School of Engineering at MIU provides rigorous technical education across multiple engineering disciplines.",
      vision:
        "To be a leading engineering school that produces technically proficient, innovative, and socially responsible engineers.",
      mission:
        "To provide excellence in engineering education through a blend of theoretical knowledge, practical skills, and research that addresses societal needs.",
      highlights: [
        {
          icon: "🔧",
          title: "Advanced Laboratories",
          desc: "Fully equipped labs for hands-on learning across all engineering disciplines.",
        },
        {
          icon: "🏭",
          title: "Industry Partnerships",
          desc: "Strong ties with leading engineering firms for internships and placements.",
        },
        {
          icon: "📐",
          title: "Project-Based Learning",
          desc: "Emphasis on real-world projects and problem-solving from day one.",
        },
        {
          icon: "🌱",
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
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
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
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
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
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200",
    },
    "school-of-humanities": {
      name: "School of Humanities",
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
  };
  const [schoolDetails, setSchoolDetails] = useState(DEFAULT_SCHOOL_DETAILS);

  useEffect(() => {
    if (!authLoading && !user) router.push("/admin/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    // load all sections
    API.get("/settings/hero")
      .then(({ data }) => {
        if (data?.content) setHeroData(data.content);
      })
      .catch(() => {});
    API.get("/settings/leadership")
      .then(({ data }) => {
        if (data?.content?.leaders?.length) setLeaders(data.content.leaders);
      })
      .catch(() => {});
    API.get("/settings/spotlight")
      .then(({ data }) => {
        if (data?.content?.row1?.length) setSpotRow1(data.content.row1);
        if (data?.content?.row2?.length) setSpotRow2(data.content.row2);
      })
      .catch(() => {});
    API.get("/settings/about")
      .then(({ data }) => {
        if (data?.content) setAboutData(data.content);
      })
      .catch(() => {});
    API.get("/settings/placements")
      .then(({ data }) => {
        if (data?.content)
          setPlacementsData((prev) => ({ ...prev, ...data.content }));
      })
      .catch(() => {});
    API.get("/settings/campus")
      .then(({ data }) => {
        if (data?.content)
          setCampusContent((prev) => ({ ...prev, ...data.content }));
      })
      .catch(() => {});
    API.get("/settings/ecosystem")
      .then(({ data }) => {
        if (data?.content?.cards?.length) setEcoCards(data.content.cards);
      })
      .catch(() => {});
    API.get("/settings/footer")
      .then(({ data }) => {
        if (data?.content)
          setFooterData((prev) => ({ ...prev, ...data.content }));
      })
      .catch(() => {});
    API.get("/settings/schools-section")
      .then(({ data }) => {
        if (data?.content)
          setSchoolsSection((prev) => ({ ...prev, ...data.content }));
      })
      .catch(() => {});
    API.get("/settings/recognitions")
      .then(({ data }) => {
        if (data?.content?.items?.length) setRecognitions(data.content.items);
        if (data?.content?.header)
          setAccHeader((prev) => ({ ...prev, ...data.content.header }));
      })
      .catch(() => {});
    API.get("/settings/page-admissions")
      .then(({ data }) => {
        if (data?.content)
          setPageAdmissions((p) => ({ ...p, ...data.content }));
      })
      .catch(() => {});
    API.get("/settings/page-contact")
      .then(({ data }) => {
        if (data?.content) setPageContact((p) => ({ ...p, ...data.content }));
      })
      .catch(() => {});
    API.get("/settings/page-exams")
      .then(({ data }) => {
        if (data?.content) setPageExams((p) => ({ ...p, ...data.content }));
      })
      .catch(() => {});
    API.get("/settings/page-about")
      .then(({ data }) => {
        if (data?.content) setPageAboutWho((p) => ({ ...p, ...data.content }));
      })
      .catch(() => {});
    API.get("/settings/academic-council")
      .then(({ data }) => {
        if (data?.content) setAcData((p) => ({ ...p, ...data.content }));
      })
      .catch(() => {});
    API.get("/settings/iqac")
      .then(({ data }) => {
        if (data?.content) setIqacData((p) => ({ ...p, ...data.content }));
      })
      .catch(() => {});
    API.get("/settings/school-details")
      .then(({ data }) => {
        if (data?.content) setSchoolDetails((p) => ({ ...p, ...data.content }));
      })
      .catch(() => {});
    // Also load dynamically added schools from schools-section and add missing ones to schoolDetails
    API.get("/settings/schools-section")
      .then(({ data }) => {
        const list = data?.content?.schools || [];
        list.forEach((s) => {
          if (s.slug) {
            setSchoolDetails((prev) => {
              if (prev[s.slug]) return prev; // already exists
              return {
                ...prev,
                [s.slug]: {
                  name: s.name || "",
                  icon: s.icon || "🏫",
                  color: s.color || "#1a3a6b",
                  tagline: s.tagline || "",
                  about: s.about || "",
                  vision: s.vision || "",
                  mission: s.mission || "",
                  highlights: s.highlights || [],
                  programs: s.programs || [],
                  image: s.image || "",
                },
              };
            });
          }
        });
      })
      .catch(() => {});
    API.get("/settings/student-life-pages")
      .then(({ data }) => {
        if (data?.content)
          setStudentLifePages((p) => ({ ...p, ...data.content }));
      })
      .catch(() => {});
  }, [user]);

  const save = async (type, content) => {
    console.log(content);
    setSaving(true);
    setMsg("");
    try {
      await API.post(`/settings/${type}`, { content });
      setMsg(`✅ ${type} section saved successfully.`);
    } catch {
      setMsg("❌ Error saving. Please try again.");
    }
    setSaving(false);
    setTimeout(() => setMsg(""), 4000);
  };

  if (authLoading || !user)
    return (
      <div style={{ padding: "160px 20px", textAlign: "center" }}>
        Loading...
      </div>
    );

  const tabs = [
    { key: "hero", label: "🖼️ Hero Banner" },
    { key: "leadership", label: "👥 Leadership Messages" },
    { key: "spotlight", label: "🎭 Spotlight Gallery" },
    { key: "about", label: "🏛️ About Page" },
    { key: "recognitions", label: "🏅 Recognitions" },
    { key: "placements", label: "💼 Placements" },
    { key: "campus", label: "🏫 Campus Life" },
    { key: "ecosystem", label: "🌐 Ecosystem Cards" },
    { key: "footer", label: "🔗 Footer" },
    { key: "schools-section", label: "🏫 Schools Cards" },
    { key: "school-details", label: "📚 School Details" },
    { key: "acc-header", label: "🏅 Accreditations Header" },
    { key: "page-images", label: "🖼️ Page Images" },
    { key: "academic-council", label: "🏛️ Academic Council" },
    { key: "iqac", label: "✅ IQAC" },
    { key: "student-life", label: "🎓 Student Life Pages" },
  ];

  return (
    <div
      style={{
        padding: "clamp(100px,15vw,160px) 20px 60px",
        minHeight: "100vh",
        background: "#f8f9fa",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <h1
            style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: "900" }}
          >
            🖼️ Image & Content Manager
          </h1>
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="btn btn-black"
          >
            ← Dashboard
          </button>
        </div>

        {msg && (
          <p
            style={{
              background: msg.startsWith("✅") ? "#d4edda" : "#f8d7da",
              color: msg.startsWith("✅") ? "#155724" : "#721c24",
              padding: "12px 20px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {msg}
          </p>
        )}

        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "0.9rem",
                background: activeTab === t.key ? "var(--lpu-orange)" : "white",
                color: activeTab === t.key ? "white" : "#333",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── HERO ── */}
        {activeTab === "hero" && (
          <div style={card}>
            <h2 style={{ marginBottom: "25px" }}>Hero Banner</h2>
            <div style={{ marginBottom: "20px" }}>
              <label style={lbl}>
                Main Title{" "}
                <span style={{ color: "#999", fontWeight: 400 }}>
                  (use &lt;br /&gt; for line breaks)
                </span>
              </label>
              <input
                style={inp}
                value={heroData.title}
                onChange={(e) =>
                  setHeroData({ ...heroData, title: e.target.value })
                }
                placeholder="TRANSFORM <br /> YOUR FUTURE"
              />
            </div>
            <div style={{ marginBottom: "25px" }}>
              <label style={lbl}>Subtitle / Tagline</label>
              <textarea
                style={{ ...inp, height: "80px", resize: "vertical" }}
                value={heroData.subtitle}
                onChange={(e) =>
                  setHeroData({ ...heroData, subtitle: e.target.value })
                }
              />
            </div>
            <label style={{ ...lbl, marginBottom: "12px" }}>
              Background Images
            </label>
            <ImageGrid
              images={(heroData.images || []).map((src, i) => ({
                id: i,
                src,
                title: "",
              }))}
              srcKey="src"
              labelKey="title"
              onChange={(imgs) =>
                setHeroData({ ...heroData, images: imgs.map((i) => i.src) })
              }
            />
            <button
              onClick={() => save("hero", heroData)}
              disabled={saving}
              className="btn btn-orange"
              style={{ marginTop: "25px", width: "100%", padding: "14px" }}
            >
              {saving ? "Saving..." : "Save Hero Section"}
            </button>
          </div>
        )}

        {/* ── LEADERSHIP ── */}
        {activeTab === "leadership" && (
          <div style={card}>
            <h2 style={{ marginBottom: "8px" }}>Leadership Messages</h2>
            <p
              style={{
                color: "#888",
                marginBottom: "25px",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              Edit each leader's name, photo, role, title, message paragraphs,
              and signature. Toggle "Active" to show/hide the message page
              (inactive pages show "Coming Soon").
            </p>
            {leaders.map((leader, idx) => (
              <div
                key={idx}
                style={{
                  padding: "20px",
                  background: "#f8f9fa",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  borderLeft: "4px solid var(--lpu-orange)",
                }}
              >
                {/* Header with Active Toggle */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "18px",
                    flexWrap: "wrap",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <img
                      src={leader.image || null}
                      alt={leader.name}
                      style={{
                        width: "64px",
                        height: "64px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "3px solid var(--lpu-orange)",
                        flexShrink: 0,
                      }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <h3 style={{ margin: 0, fontSize: "1rem", color: "#111" }}>
                      {leader.role || `Leader ${idx + 1}`}
                    </h3>
                  </div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      background: "white",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "2px solid #ddd",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={leader.active || false}
                      onChange={(e) =>
                        setLeaders(
                          leaders.map((l, i) =>
                            i === idx ? { ...l, active: e.target.checked } : l,
                          ),
                        )
                      }
                      style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer",
                      }}
                    />
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        color: leader.active ? "green" : "#888",
                      }}
                    >
                      {leader.active ? "✓ Active" : "○ Inactive (Coming Soon)"}
                    </span>
                  </label>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "14px",
                    flexWrap: "wrap",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ flex: 1, minWidth: "180px" }}>
                    <label style={lbl}>Name</label>
                    <input
                      style={inp}
                      value={leader.name || ""}
                      placeholder="e.g. Dr. Hari Kumar"
                      onChange={(e) =>
                        setLeaders(
                          leaders.map((l, i) =>
                            i === idx ? { ...l, name: e.target.value } : l,
                          ),
                        )
                      }
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: "180px" }}>
                    <label style={lbl}>Role / Designation</label>
                    <input
                      style={inp}
                      value={leader.role || ""}
                      placeholder="e.g. Chancellor"
                      onChange={(e) =>
                        setLeaders(
                          leaders.map((l, i) =>
                            i === idx ? { ...l, role: e.target.value } : l,
                          ),
                        )
                      }
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={lbl}>Page Title (e.g. "Welcome Message")</label>
                  <input
                    style={inp}
                    value={leader.title || ""}
                    placeholder="e.g. Welcome Message"
                    onChange={(e) =>
                      setLeaders(
                        leaders.map((l, i) =>
                          i === idx ? { ...l, title: e.target.value } : l,
                        ),
                      )
                    }
                  />
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={lbl}>Photo</label>
                  <ImageUploader
                    label=""
                    value={leader.image || ""}
                    onChange={(v) =>
                      setLeaders(
                        leaders.map((l, i) =>
                          i === idx ? { ...l, image: v } : l,
                        ),
                      )
                    }
                    placeholder="Upload photo or paste URL"
                    height={80}
                  />
                </div>

                {/* Message paragraphs */}
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ ...lbl, marginBottom: "8px" }}>
                    Message Paragraphs
                  </label>
                  {(leader.message || []).map((para, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginBottom: "8px",
                        alignItems: "flex-start",
                      }}
                    >
                      <textarea
                        style={{
                          ...inp,
                          marginTop: 0,
                          flex: 1,
                          minHeight: "70px",
                          resize: "vertical",
                        }}
                        value={para}
                        placeholder={`Paragraph ${pIdx + 1}`}
                        onChange={(e) =>
                          setLeaders(
                            leaders.map((l, i) =>
                              i === idx
                                ? {
                                    ...l,
                                    message: l.message.map((p, pi) =>
                                      pi === pIdx ? e.target.value : p,
                                    ),
                                  }
                                : l,
                            ),
                          )
                        }
                      />
                      <button
                        onClick={() =>
                          setLeaders(
                            leaders.map((l, i) =>
                              i === idx
                                ? {
                                    ...l,
                                    message: l.message.filter(
                                      (_, pi) => pi !== pIdx,
                                    ),
                                  }
                                : l,
                            ),
                          )
                        }
                        style={{
                          background: "rgba(200,0,0,0.8)",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: "8px 10px",
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      setLeaders(
                        leaders.map((l, i) =>
                          i === idx
                            ? { ...l, message: [...(l.message || []), ""] }
                            : l,
                        ),
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "2px dashed #ddd",
                      borderRadius: "8px",
                      background: "white",
                      cursor: "pointer",
                      color: "#888",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                    }}
                  >
                    + Add Paragraph
                  </button>
                </div>
                {/* Signature */}
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "180px" }}>
                    <label style={lbl}>Signature Name</label>
                    <input
                      style={inp}
                      value={leader.signature?.name || ""}
                      placeholder="e.g. Dr. Hari Kumar"
                      onChange={(e) =>
                        setLeaders(
                          leaders.map((l, i) =>
                            i === idx
                              ? {
                                  ...l,
                                  signature: {
                                    ...l.signature,
                                    name: e.target.value,
                                  },
                                }
                              : l,
                          ),
                        )
                      }
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: "180px" }}>
                    <label style={lbl}>Signature Role</label>
                    <input
                      style={inp}
                      value={leader.signature?.role || ""}
                      placeholder="e.g. Chancellor, MIU"
                      onChange={(e) =>
                        setLeaders(
                          leaders.map((l, i) =>
                            i === idx
                              ? {
                                  ...l,
                                  signature: {
                                    ...l.signature,
                                    role: e.target.value,
                                  },
                                }
                              : l,
                          ),
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => save("leadership", { leaders })}
              disabled={saving}
              className="btn btn-orange"
              style={{ marginTop: "10px", width: "100%", padding: "14px" }}
            >
              {saving ? "Saving..." : "Save All Leadership Messages"}
            </button>
          </div>
        )}

        {/* ── SPOTLIGHT ── */}
        {activeTab === "spotlight" && (
          <div style={card}>
            <h2 style={{ marginBottom: "8px" }}>Spotlight Gallery</h2>
            <p
              style={{
                color: "#888",
                marginBottom: "25px",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              Two marquee rows on the homepage. Add, remove or reorder images.
            </p>

            <h3 style={{ marginBottom: "15px", fontSize: "1.1rem" }}>
              Row 1 (scrolls left)
            </h3>
            <ImageGrid
              images={spotRow1}
              onChange={setSpotRow1}
              srcKey="src"
              labelKey="title"
            />

            <h3 style={{ margin: "30px 0 15px", fontSize: "1.1rem" }}>
              Row 2 (scrolls right)
            </h3>
            <ImageGrid
              images={spotRow2}
              onChange={setSpotRow2}
              srcKey="src"
              labelKey="title"
            />

            <button
              onClick={() =>
                save("spotlight", { row1: spotRow1, row2: spotRow2 })
              }
              disabled={saving}
              className="btn btn-orange"
              style={{ marginTop: "25px", width: "100%", padding: "14px" }}
            >
              {saving ? "Saving..." : "Save Spotlight Gallery"}
            </button>
          </div>
        )}

        {/* ── ABOUT ── */}
        {activeTab === "about" && (
          <div style={card}>
            <h2 style={{ marginBottom: "8px" }}>About Page</h2>
            <p
              style={{
                color: "#888",
                marginBottom: "25px",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              Update the about page header background image and intro text.
            </p>
            <div style={{ marginBottom: "20px" }}>
              <ImageUploader
                label="Header Background Image"
                value={aboutData.headerImage || ""}
                onChange={(v) => setAboutData({ ...aboutData, headerImage: v })}
                height={160}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={lbl}>Intro Text (shown below the title)</label>
              <textarea
                style={{ ...inp, height: "120px", resize: "vertical" }}
                value={aboutData.introText || ""}
                onChange={(e) =>
                  setAboutData({ ...aboutData, introText: e.target.value })
                }
                placeholder="Write a brief intro about MIU..."
              />
            </div>
            <button
              onClick={() => save("about", aboutData)}
              disabled={saving}
              className="btn btn-orange"
              style={{ marginTop: "10px", width: "100%", padding: "14px" }}
            >
              {saving ? "Saving..." : "Save About Page"}
            </button>
          </div>
        )}

        {/* ── RECOGNITIONS ── */}
        {activeTab === "recognitions" && (
          <div style={card}>
            <h2 style={{ marginBottom: "8px" }}>
              Recognitions & Accreditations
            </h2>
            <p
              style={{
                color: "#888",
                marginBottom: "25px",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              Add, edit or remove recognition bodies. Logo URL is optional — a
              colored badge shows as fallback.
            </p>

            {recognitions.map((rec, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={() => {
                  dragRecIdx.current = idx;
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  const from = dragRecIdx.current;
                  if (from === null || from === idx) return;
                  const next = [...recognitions];
                  const [moved] = next.splice(from, 1);
                  next.splice(idx, 0, moved);
                  setRecognitions(next);
                  dragRecIdx.current = null;
                }}
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  padding: "18px",
                  background: "#f8f9fa",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  flexWrap: "wrap",
                  borderLeft: `4px solid ${rec.color || "#ccc"}`,
                  cursor: "grab",
                }}
              >
                {/* Drag handle */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#bbb",
                    fontSize: "1.2rem",
                    cursor: "grab",
                    flexShrink: 0,
                    alignSelf: "center",
                  }}
                  title="Drag to reorder"
                >
                  ⠿
                </div>

                {/* Logo preview */}
                <div
                  style={{
                    width: "80px",
                    height: "60px",
                    background: rec.logo ? "transparent" : rec.color || "#555",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  {rec.logo ? (
                    <img
                      src={rec.logo}
                      alt={rec.short}
                      style={{
                        maxWidth: "80px",
                        maxHeight: "60px",
                        objectFit: "contain",
                      }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <span
                      style={{
                        color: "white",
                        fontWeight: "900",
                        fontSize: "0.85rem",
                        fontFamily: "var(--font-heading)",
                        textAlign: "center",
                        padding: "4px",
                      }}
                    >
                      {rec.short}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    flex: 1,
                    minWidth: "200px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    <input
                      value={rec.short || ""}
                      onChange={(e) =>
                        setRecognitions(
                          recognitions.map((r, i) =>
                            i === idx ? { ...r, short: e.target.value } : r,
                          ),
                        )
                      }
                      style={{ ...inp, marginTop: 0, flex: "0 0 100px" }}
                      placeholder="Short (e.g. UGC)"
                    />
                    <input
                      value={rec.color || ""}
                      onChange={(e) =>
                        setRecognitions(
                          recognitions.map((r, i) =>
                            i === idx ? { ...r, color: e.target.value } : r,
                          ),
                        )
                      }
                      style={{ ...inp, marginTop: 0, flex: "0 0 110px" }}
                      placeholder="Color #hex"
                    />
                  </div>
                  <input
                    value={rec.name || ""}
                    onChange={(e) =>
                      setRecognitions(
                        recognitions.map((r, i) =>
                          i === idx ? { ...r, name: e.target.value } : r,
                        ),
                      )
                    }
                    style={{ ...inp, marginTop: 0 }}
                    placeholder="Full name"
                  />
                  <input
                    value={rec.desc || ""}
                    onChange={(e) =>
                      setRecognitions(
                        recognitions.map((r, i) =>
                          i === idx ? { ...r, desc: e.target.value } : r,
                        ),
                      )
                    }
                    style={{ ...inp, marginTop: 0 }}
                    placeholder="Short description"
                  />
                  <input
                    value={rec.logo || ""}
                    onChange={(e) =>
                      setRecognitions(
                        recognitions.map((r, i) =>
                          i === idx ? { ...r, logo: e.target.value } : r,
                        ),
                      )
                    }
                    style={{ ...inp, marginTop: 0 }}
                    placeholder="Logo image URL (optional)"
                  />
                </div>

                <button
                  onClick={() =>
                    setRecognitions(recognitions.filter((_, i) => i !== idx))
                  }
                  style={{
                    background: "rgba(200,0,0,0.85)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Add new */}
            <button
              onClick={() =>
                setRecognitions([
                  ...recognitions,
                  { name: "", short: "", logo: "", desc: "", color: "#333" },
                ])
              }
              style={{
                width: "100%",
                padding: "12px",
                border: "2px dashed #ddd",
                borderRadius: "10px",
                background: "transparent",
                cursor: "pointer",
                color: "#888",
                fontWeight: "700",
                fontSize: "0.95rem",
                marginTop: "8px",
                marginBottom: "20px",
              }}
            >
              + Add Recognition
            </button>

            <button
              onClick={() =>
                save("recognitions", { items: recognitions, header: accHeader })
              }
              disabled={saving}
              className="btn btn-orange"
              style={{ width: "100%", padding: "14px" }}
            >
              {saving ? "Saving..." : "Save All Recognitions"}
            </button>
          </div>
        )}

        {/* ── PLACEMENTS ── */}
        {activeTab === "placements" && (
          <div style={card}>
            <h2 style={{ marginBottom: "20px" }}>Placements Section</h2>
            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>Section Badge</label>
              <input
                style={inp}
                value={placementsData.badge || ""}
                onChange={(e) =>
                  setPlacementsData((p) => ({ ...p, badge: e.target.value }))
                }
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>Section Title</label>
              <input
                style={inp}
                value={placementsData.title || ""}
                onChange={(e) =>
                  setPlacementsData((p) => ({ ...p, title: e.target.value }))
                }
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={lbl}>Subtitle</label>
              <textarea
                style={{ ...inp, height: "80px", resize: "vertical" }}
                value={placementsData.subtitle || ""}
                onChange={(e) =>
                  setPlacementsData((p) => ({ ...p, subtitle: e.target.value }))
                }
              />
            </div>

            <h3 style={{ marginBottom: "14px", fontSize: "1rem" }}>
              Placement Statistics
            </h3>
            {(placementsData.stats || []).map((stat, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  padding: "12px",
                  background: "#f8f9fa",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minWidth: "200px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <input
                    style={{ ...inp, marginTop: 0, flex: "0 0 120px" }}
                    value={stat.val || ""}
                    placeholder="Value (e.g. 500+)"
                    onChange={(e) =>
                      setPlacementsData((p) => ({
                        ...p,
                        stats: p.stats.map((s, i) =>
                          i === idx ? { ...s, val: e.target.value } : s,
                        ),
                      }))
                    }
                  />
                  <input
                    style={{ ...inp, marginTop: 0, flex: 1 }}
                    value={stat.label || ""}
                    placeholder="Label (e.g. Recruiters)"
                    onChange={(e) =>
                      setPlacementsData((p) => ({
                        ...p,
                        stats: p.stats.map((s, i) =>
                          i === idx ? { ...s, label: e.target.value } : s,
                        ),
                      }))
                    }
                  />
                </div>
                <button
                  onClick={() =>
                    setPlacementsData((p) => ({
                      ...p,
                      stats: p.stats.filter((_, i) => i !== idx),
                    }))
                  }
                  style={{
                    background: "rgba(200,0,0,0.8)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setPlacementsData((p) => ({
                  ...p,
                  stats: [...(p.stats || []), { val: "", label: "" }],
                }))
              }
              style={{
                width: "100%",
                padding: "10px",
                border: "2px dashed #ddd",
                borderRadius: "10px",
                background: "transparent",
                cursor: "pointer",
                color: "#888",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              + Add Statistic
            </button>

            <h3
              style={{
                marginBottom: "14px",
                fontSize: "1rem",
                marginTop: "30px",
              }}
            >
              Company Logos
            </h3>
            <p
              style={{
                color: "#888",
                marginBottom: "15px",
                fontSize: "0.9rem",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              Add company logos to display in the marquee. If no logos are
              added, company names (below) will be shown as text.
            </p>
            {(placementsData.companyLogos || []).map((company, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  padding: "12px",
                  background: "#f8f9fa",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  flexWrap: "wrap",
                }}
              >
                {company.logo && (
                  <div
                    style={{
                      width: "100px",
                      height: "60px",
                      background: "white",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px",
                      border: "1px solid #ddd",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                )}
                <div
                  style={{
                    flex: 1,
                    minWidth: "200px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <input
                    style={{ ...inp, marginTop: 0 }}
                    value={company.name || ""}
                    placeholder="Company Name (e.g. Microsoft)"
                    onChange={(e) =>
                      setPlacementsData((p) => ({
                        ...p,
                        companyLogos: (p.companyLogos || []).map((c, i) =>
                          i === idx ? { ...c, name: e.target.value } : c,
                        ),
                      }))
                    }
                  />
                  <ImageUploader
                    label=""
                    value={company.logo || ""}
                    onChange={(v) =>
                      setPlacementsData((p) => ({
                        ...p,
                        companyLogos: (p.companyLogos || []).map((c, i) =>
                          i === idx ? { ...c, logo: v } : c,
                        ),
                      }))
                    }
                    placeholder="Upload logo or paste URL"
                    height={60}
                  />
                </div>
                <button
                  onClick={() =>
                    setPlacementsData((p) => ({
                      ...p,
                      companyLogos: (p.companyLogos || []).filter(
                        (_, i) => i !== idx,
                      ),
                    }))
                  }
                  style={{
                    background: "rgba(200,0,0,0.8)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setPlacementsData((p) => ({
                  ...p,
                  companyLogos: [
                    ...(p.companyLogos || []),
                    { name: "", logo: "" },
                  ],
                }))
              }
              style={{
                width: "100%",
                padding: "10px",
                border: "2px dashed #ddd",
                borderRadius: "10px",
                background: "transparent",
                cursor: "pointer",
                color: "#888",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              + Add Company Logo
            </button>

            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>
                Recruiter Names (comma-separated) — Fallback if no logos
              </label>
              <textarea
                style={{ ...inp, height: "80px", resize: "vertical" }}
                value={placementsData.companies || ""}
                onChange={(e) =>
                  setPlacementsData((p) => ({
                    ...p,
                    companies: e.target.value,
                  }))
                }
              />
            </div>

            <button
              onClick={() => save("placements", placementsData)}
              disabled={saving}
              className="btn btn-orange"
              style={{ width: "100%", padding: "14px" }}
            >
              {saving ? "Saving..." : "Save Placements"}
            </button>
          </div>
        )}

        {/* ── CAMPUS LIFE ── */}
        {activeTab === "campus" && (
          <div style={card}>
            <h2 style={{ marginBottom: "20px" }}>Campus Life Section</h2>
            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>Section Title</label>
              <input
                style={inp}
                value={campusContent.title || ""}
                onChange={(e) =>
                  setCampusContent((p) => ({ ...p, title: e.target.value }))
                }
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={lbl}>Subtitle</label>
              <textarea
                style={{ ...inp, height: "80px", resize: "vertical" }}
                value={campusContent.subtitle || ""}
                onChange={(e) =>
                  setCampusContent((p) => ({ ...p, subtitle: e.target.value }))
                }
              />
            </div>
            <h3 style={{ marginBottom: "14px", fontSize: "1rem" }}>
              Campus Tabs (images)
            </h3>
            {(campusContent.tabs || []).map((tab, idx) => (
              <div
                key={idx}
                style={{
                  padding: "16px",
                  background: "#f8f9fa",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <label style={{ ...lbl, marginBottom: "6px" }}>
                      Tab Name
                    </label>
                    <input
                      style={{ ...inp, marginTop: 0 }}
                      value={tab.name || ""}
                      placeholder="e.g. Central Library"
                      onChange={(e) =>
                        setCampusContent((p) => ({
                          ...p,
                          tabs: p.tabs.map((t, i) =>
                            i === idx ? { ...t, name: e.target.value } : t,
                          ),
                        }))
                      }
                    />
                  </div>
                  <button
                    onClick={() =>
                      setCampusContent((p) => ({
                        ...p,
                        tabs: p.tabs.filter((_, i) => i !== idx),
                      }))
                    }
                    style={{
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 16px",
                      cursor: "pointer",
                      fontWeight: "700",
                      marginTop: "24px",
                    }}
                  >
                    ✕ Remove
                  </button>
                </div>
                <ImageUploader
                  label="Tab Image"
                  value={tab.img || ""}
                  onChange={(url) =>
                    setCampusContent((p) => ({
                      ...p,
                      tabs: p.tabs.map((t, i) =>
                        i === idx ? { ...t, img: url } : t,
                      ),
                    }))
                  }
                  placeholder="Upload campus facility image"
                  height={200}
                />
              </div>
            ))}
            <button
              onClick={() =>
                setCampusContent((p) => ({
                  ...p,
                  tabs: [
                    ...(p.tabs || []),
                    { id: Date.now().toString(), name: "", img: "" },
                  ],
                }))
              }
              style={{
                width: "100%",
                padding: "10px",
                border: "2px dashed #ddd",
                borderRadius: "10px",
                background: "transparent",
                cursor: "pointer",
                color: "#888",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              + Add Tab
            </button>
            <button
              onClick={() => save("campus", campusContent)}
              disabled={saving}
              className="btn btn-orange"
              style={{ width: "100%", padding: "14px" }}
            >
              {saving ? "Saving..." : "Save Campus Life"}
            </button>
          </div>
        )}

        {/* ── ECOSYSTEM ── */}
        {activeTab === "ecosystem" && (
          <div style={card}>
            <h2 style={{ marginBottom: "8px" }}>Ecosystem Cards</h2>
            <p
              style={{
                color: "#888",
                marginBottom: "20px",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              Edit the 5 scrolling ecosystem cards on the homepage.
            </p>
            {ecoCards.map((card2, idx) => (
              <div
                key={idx}
                style={{
                  padding: "18px",
                  background: "#f8f9fa",
                  borderRadius: "10px",
                  marginBottom: "14px",
                  borderLeft: "4px solid var(--lpu-orange)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <strong style={{ fontSize: "0.9rem" }}>Card {idx + 1}</strong>
                  <button
                    onClick={() =>
                      setEcoCards(ecoCards.filter((_, i) => i !== idx))
                    }
                    style={{
                      background: "rgba(200,0,0,0.8)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 10px",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                    }}
                  >
                    Remove
                  </button>
                </div>
                {[
                  ["label", "Label (e.g. CAREER SUCCESS)"],
                  ["title", "Title"],
                  ["description", "Description"],
                  ["image", "Image URL"],
                ].map(([key, placeholder]) => (
                  <div key={key} style={{ marginBottom: "8px" }}>
                    <label style={{ ...lbl, fontSize: "0.78rem" }}>
                      {placeholder}
                    </label>
                    {key === "description" ? (
                      <textarea
                        style={{
                          ...inp,
                          marginTop: "4px",
                          height: "70px",
                          resize: "vertical",
                        }}
                        value={card2[key] || ""}
                        onChange={(e) =>
                          setEcoCards(
                            ecoCards.map((c, i) =>
                              i === idx ? { ...c, [key]: e.target.value } : c,
                            ),
                          )
                        }
                      />
                    ) : (
                      <input
                        style={{ ...inp, marginTop: "4px" }}
                        value={card2[key] || ""}
                        onChange={(e) =>
                          setEcoCards(
                            ecoCards.map((c, i) =>
                              i === idx ? { ...c, [key]: e.target.value } : c,
                            ),
                          )
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={() =>
                setEcoCards([
                  ...ecoCards,
                  {
                    id: Date.now(),
                    label: "",
                    title: "",
                    description: "",
                    image: "",
                  },
                ])
              }
              style={{
                width: "100%",
                padding: "10px",
                border: "2px dashed #ddd",
                borderRadius: "10px",
                background: "transparent",
                cursor: "pointer",
                color: "#888",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              + Add Card
            </button>
            <button
              onClick={() => save("ecosystem", { cards: ecoCards })}
              disabled={saving}
              className="btn btn-orange"
              style={{ width: "100%", padding: "14px" }}
            >
              {saving ? "Saving..." : "Save Ecosystem Cards"}
            </button>
          </div>
        )}

        {/* ── FOOTER ── */}
        {activeTab === "footer" && (
          <div style={card}>
            <h2 style={{ marginBottom: "20px" }}>Footer</h2>
            {[
              ["aboutText", "About Text", "textarea"],
              ["address", "Address", "textarea"],
              ["phone", "Phone Number", "text"],
              ["email", "Email Address", "text"],
              ["facebook", "Facebook URL", "text"],
              ["twitter", "Twitter/X URL", "text"],
              ["linkedin", "LinkedIn URL", "text"],
              ["instagram", "Instagram URL", "text"],
              ["copyright", "Copyright Text", "text"],
            ].map(([key, label, type]) => (
              <div key={key} style={{ marginBottom: "16px" }}>
                <label style={lbl}>{label}</label>
                {type === "textarea" ? (
                  <textarea
                    style={{ ...inp, height: "80px", resize: "vertical" }}
                    value={footerData[key] || ""}
                    onChange={(e) =>
                      setFooterData((p) => ({ ...p, [key]: e.target.value }))
                    }
                  />
                ) : (
                  <input
                    style={inp}
                    value={footerData[key] || ""}
                    onChange={(e) =>
                      setFooterData((p) => ({ ...p, [key]: e.target.value }))
                    }
                  />
                )}
              </div>
            ))}
            <button
              onClick={() => save("footer", footerData)}
              disabled={saving}
              className="btn btn-orange"
              style={{ width: "100%", padding: "14px" }}
            >
              {saving ? "Saving..." : "Save Footer"}
            </button>
          </div>
        )}

        {/* ── SCHOOLS SECTION ── */}
        {activeTab === "schools-section" && (
          <div style={card}>
            <h2 style={{ marginBottom: "20px" }}>
              Schools & Faculties Section
            </h2>
            {[
              ["badge", "Badge", "text"],
              ["title", "Section Title", "text"],
              ["subtitle", "Subtitle", "textarea"],
            ].map(([key, label, type]) => (
              <div key={key} style={{ marginBottom: "16px" }}>
                <label style={lbl}>{label}</label>
                {type === "textarea" ? (
                  <textarea
                    style={{ ...inp, height: "80px", resize: "vertical" }}
                    value={schoolsSection[key] || ""}
                    onChange={(e) =>
                      setSchoolsSection((p) => ({
                        ...p,
                        [key]: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <input
                    style={inp}
                    value={schoolsSection[key] || ""}
                    onChange={(e) =>
                      setSchoolsSection((p) => ({
                        ...p,
                        [key]: e.target.value,
                      }))
                    }
                  />
                )}
              </div>
            ))}
            <h3 style={{ margin: "20px 0 14px", fontSize: "1rem" }}>
              School Cards
            </h3>
            {(schoolsSection.schools || []).map((s, idx) => (
              <div
                key={idx}
                style={{
                  padding: "14px",
                  background: "#f8f9fa",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                }}
              >
                {s.image && (
                  <img
                    src={s.image}
                    alt={s.name}
                    style={{
                      width: "80px",
                      height: "55px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      flexShrink: 0,
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
                <div
                  style={{
                    flex: 1,
                    minWidth: "200px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <input
                    style={{ ...inp, marginTop: 0 }}
                    value={s.name || ""}
                    placeholder="School name"
                    onChange={(e) =>
                      setSchoolsSection((p) => ({
                        ...p,
                        schools: p.schools.map((x, i) =>
                          i === idx ? { ...x, name: e.target.value } : x,
                        ),
                      }))
                    }
                  />
                  <input
                    style={{ ...inp, marginTop: 0 }}
                    value={s.slug || ""}
                    placeholder="slug (e.g. school-of-commerce)"
                    onChange={(e) =>
                      setSchoolsSection((p) => ({
                        ...p,
                        schools: p.schools.map((x, i) =>
                          i === idx ? { ...x, slug: e.target.value } : x,
                        ),
                      }))
                    }
                  />
                  <input
                    style={{ ...inp, marginTop: 0 }}
                    value={s.desc || ""}
                    placeholder="Description"
                    onChange={(e) =>
                      setSchoolsSection((p) => ({
                        ...p,
                        schools: p.schools.map((x, i) =>
                          i === idx ? { ...x, desc: e.target.value } : x,
                        ),
                      }))
                    }
                  />
                  <ImageUploader
                    label=""
                    value={s.image || ""}
                    onChange={(v) =>
                      setSchoolsSection((p) => ({
                        ...p,
                        schools: p.schools.map((x, i) =>
                          i === idx ? { ...x, image: v } : x,
                        ),
                      }))
                    }
                    placeholder="Image URL"
                    height={80}
                  />
                </div>
                <button
                  onClick={() =>
                    setSchoolsSection((p) => ({
                      ...p,
                      schools: p.schools.filter((_, i) => i !== idx),
                    }))
                  }
                  style={{
                    background: "rgba(200,0,0,0.8)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setSchoolsSection((p) => ({
                  ...p,
                  schools: [
                    ...(p.schools || DEFAULT_SCHOOLS),
                    { name: "", slug: "", desc: "", image: "" },
                  ],
                }))
              }
              style={{
                width: "100%",
                padding: "10px",
                border: "2px dashed #ddd",
                borderRadius: "10px",
                background: "transparent",
                cursor: "pointer",
                color: "#888",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              + Add School Card
            </button>
            <button
              onClick={() => save("schools-section", schoolsSection)}
              disabled={saving}
              className="btn btn-orange"
              style={{ width: "100%", padding: "14px" }}
            >
              {saving ? "Saving..." : "Save Schools Section"}
            </button>
          </div>
        )}

        {/* ── ACCREDITATIONS HEADER ── */}
        {activeTab === "acc-header" && (
          <div style={card}>
            <h2 style={{ marginBottom: "20px" }}>
              Accreditations Section Header
            </h2>
            {[
              ["badge", "Badge Text", "text"],
              ["title", "Section Title", "text"],
              ["desc", "Description", "textarea"],
            ].map(([key, label, type]) => (
              <div key={key} style={{ marginBottom: "16px" }}>
                <label style={lbl}>{label}</label>
                {type === "textarea" ? (
                  <textarea
                    style={{ ...inp, height: "80px", resize: "vertical" }}
                    value={accHeader[key] || ""}
                    onChange={(e) =>
                      setAccHeader((p) => ({ ...p, [key]: e.target.value }))
                    }
                  />
                ) : (
                  <input
                    style={inp}
                    value={accHeader[key] || ""}
                    onChange={(e) =>
                      setAccHeader((p) => ({ ...p, [key]: e.target.value }))
                    }
                  />
                )}
              </div>
            ))}
            <button
              onClick={() =>
                save("recognitions", { items: recognitions, header: accHeader })
              }
              disabled={saving}
              className="btn btn-orange"
              style={{ width: "100%", padding: "14px" }}
            >
              {saving ? "Saving..." : "Save Accreditations Header"}
            </button>
          </div>
        )}

        {/* ── PAGE IMAGES ── */}
        {activeTab === "page-images" && (
          <div>
            <div style={card}>
              <h2 style={{ marginBottom: "8px" }}>Admissions Page</h2>
              <p
                style={{
                  color: "#888",
                  marginBottom: "20px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  textTransform: "none",
                }}
              >
                Hero banner image and text for the Admissions page.
              </p>
              <div style={{ marginBottom: "16px" }}>
                <ImageUploader
                  label="Hero Banner Image"
                  value={pageAdmissions.heroImage || ""}
                  onChange={(v) =>
                    setPageAdmissions((p) => ({ ...p, heroImage: v }))
                  }
                  height={140}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={lbl}>Hero Title</label>
                <input
                  style={inp}
                  value={pageAdmissions.heroTitle || ""}
                  onChange={(e) =>
                    setPageAdmissions((p) => ({
                      ...p,
                      heroTitle: e.target.value,
                    }))
                  }
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={lbl}>Hero Subtitle</label>
                <input
                  style={inp}
                  value={pageAdmissions.heroSubtitle || ""}
                  onChange={(e) =>
                    setPageAdmissions((p) => ({
                      ...p,
                      heroSubtitle: e.target.value,
                    }))
                  }
                />
              </div>
              <button
                onClick={() => save("page-admissions", pageAdmissions)}
                disabled={saving}
                className="btn btn-orange"
                style={{ width: "100%", padding: "14px" }}
              >
                {saving ? "Saving..." : "Save Admissions Page"}
              </button>
            </div>
            <div style={card}>
              <h2 style={{ marginBottom: "8px" }}>Contact Page</h2>
              <p
                style={{
                  color: "#888",
                  marginBottom: "20px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  textTransform: "none",
                }}
              >
                Hero banner image and text for the Contact page.
              </p>
              <div style={{ marginBottom: "16px" }}>
                <ImageUploader
                  label="Hero Banner Image"
                  value={pageContact.heroImage || ""}
                  onChange={(v) =>
                    setPageContact((p) => ({ ...p, heroImage: v }))
                  }
                  height={140}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={lbl}>Hero Title</label>
                <input
                  style={inp}
                  value={pageContact.heroTitle || ""}
                  onChange={(e) =>
                    setPageContact((p) => ({ ...p, heroTitle: e.target.value }))
                  }
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={lbl}>Hero Subtitle</label>
                <input
                  style={inp}
                  value={pageContact.heroSubtitle || ""}
                  onChange={(e) =>
                    setPageContact((p) => ({
                      ...p,
                      heroSubtitle: e.target.value,
                    }))
                  }
                />
              </div>
              <button
                onClick={() => save("page-contact", pageContact)}
                disabled={saving}
                className="btn btn-orange"
                style={{ width: "100%", padding: "14px" }}
              >
                {saving ? "Saving..." : "Save Contact Page"}
              </button>
            </div>
            <div style={card}>
              <h2 style={{ marginBottom: "8px" }}>Examinations Page</h2>
              <p
                style={{
                  color: "#888",
                  marginBottom: "20px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  textTransform: "none",
                }}
              >
                Hero banner image and text for the Examinations page.
              </p>
              <div style={{ marginBottom: "16px" }}>
                <ImageUploader
                  label="Hero Banner Image"
                  value={pageExams.heroImage || ""}
                  onChange={(v) =>
                    setPageExams((p) => ({ ...p, heroImage: v }))
                  }
                  height={140}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={lbl}>Hero Title</label>
                <input
                  style={inp}
                  value={pageExams.heroTitle || ""}
                  onChange={(e) =>
                    setPageExams((p) => ({ ...p, heroTitle: e.target.value }))
                  }
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={lbl}>Hero Subtitle</label>
                <input
                  style={inp}
                  value={pageExams.heroSubtitle || ""}
                  onChange={(e) =>
                    setPageExams((p) => ({
                      ...p,
                      heroSubtitle: e.target.value,
                    }))
                  }
                />
              </div>
              <button
                onClick={() => save("page-exams", pageExams)}
                disabled={saving}
                className="btn btn-orange"
                style={{ width: "100%", padding: "14px" }}
              >
                {saving ? "Saving..." : "Save Exams Page"}
              </button>
            </div>
            <div style={card}>
              <h2 style={{ marginBottom: "8px" }}>
                About Page — "Who We Are" Image
              </h2>
              <p
                style={{
                  color: "#888",
                  marginBottom: "20px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  textTransform: "none",
                }}
              >
                Image shown beside the "Who We Are" text on the About page.
              </p>
              <ImageUploader
                label="Who We Are Image"
                value={pageAboutWho.whoWeAreImage || ""}
                onChange={(v) =>
                  setPageAboutWho((p) => ({ ...p, whoWeAreImage: v }))
                }
                height={180}
              />
              <button
                onClick={() => save("page-about", { ...pageAboutWho })}
                disabled={saving}
                className="btn btn-orange"
                style={{ width: "100%", padding: "14px", marginTop: "20px" }}
              >
                {saving ? "Saving..." : "Save About Image"}
              </button>
            </div>
          </div>
        )}

        {/* ── ACADEMIC COUNCIL ── */}
        {activeTab === "academic-council" && (
          <div style={card}>
            <h2 style={{ marginBottom: "8px" }}>Academic Council</h2>
            <p
              style={{
                color: "#888",
                marginBottom: "24px",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              Edit the header information for the Academic Council page. Member
              data is managed directly in the database.
            </p>
            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>Page Title</label>
              <input
                style={inp}
                value={acData.title || ""}
                onChange={(e) =>
                  setAcData((p) => ({ ...p, title: e.target.value }))
                }
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>Subtitle / Term</label>
              <input
                style={inp}
                value={acData.subtitle || ""}
                onChange={(e) =>
                  setAcData((p) => ({ ...p, subtitle: e.target.value }))
                }
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>Intro Paragraph</label>
              <textarea
                style={{ ...inp, height: "100px", resize: "vertical" }}
                value={acData.intro || ""}
                onChange={(e) =>
                  setAcData((p) => ({ ...p, intro: e.target.value }))
                }
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={lbl}>Notification PDF URL (optional)</label>
              <input
                style={inp}
                value={acData.notificationUrl || ""}
                onChange={(e) =>
                  setAcData((p) => ({ ...p, notificationUrl: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
            <button
              onClick={() => save("academic-council", acData)}
              disabled={saving}
              className="btn btn-orange"
              style={{ width: "100%", padding: "14px" }}
            >
              {saving ? "Saving..." : "Save Academic Council Header"}
            </button>
            <p
              style={{
                marginTop: "16px",
                color: "#888",
                fontSize: "0.85rem",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              💡 To edit individual member records, update the full data via the
              settings API key <code>academic-council</code> with a{" "}
              <code>sections</code> array.
            </p>
          </div>
        )}

        {/* ── SCHOOL DETAILS ── */}
        {activeTab === "school-details" && (
          <div style={card}>
            <h2 style={{ marginBottom: "8px" }}>School Details Management</h2>
            <p
              style={{
                color: "#888",
                marginBottom: "25px",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              Edit comprehensive details for each school including about text,
              vision, mission, highlights, and programs. These details appear on
              individual school pages.
            </p>

            {Object.entries(schoolDetails).map(([slug, school]) => (
              <div
                key={slug}
                style={{
                  marginBottom: "40px",
                  padding: "25px",
                  background: "#f8f9fa",
                  borderRadius: "12px",
                  borderLeft: `5px solid ${school.color || "#ccc"}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>{school.icon}</span>
                  <h3 style={{ margin: 0, color: school.color || "#333" }}>
                    {school.name}
                  </h3>
                </div>

                {/* Basic Info */}
                <div style={row}>
                  <div style={{ flex: 1 }}>
                    <label style={lbl}>School Name</label>
                    <input
                      style={inp}
                      value={school.name || ""}
                      onChange={(e) =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: { ...prev[slug], name: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div style={{ flex: "0 0 120px" }}>
                    <label style={lbl}>Icon (Emoji)</label>
                    <input
                      style={inp}
                      value={school.icon || ""}
                      onChange={(e) =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: { ...prev[slug], icon: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div style={{ flex: "0 0 120px" }}>
                    <label style={lbl}>Color (Hex)</label>
                    <input
                      style={inp}
                      value={school.color || ""}
                      onChange={(e) =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: { ...prev[slug], color: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={lbl}>Tagline</label>
                  <input
                    style={inp}
                    value={school.tagline || ""}
                    onChange={(e) =>
                      setSchoolDetails((prev) => ({
                        ...prev,
                        [slug]: { ...prev[slug], tagline: e.target.value },
                      }))
                    }
                  />
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={lbl}>About Description</label>
                  <textarea
                    style={{ ...inp, height: "100px", resize: "vertical" }}
                    value={school.about || ""}
                    onChange={(e) =>
                      setSchoolDetails((prev) => ({
                        ...prev,
                        [slug]: { ...prev[slug], about: e.target.value },
                      }))
                    }
                  />
                </div>

                <div style={row}>
                  <div style={{ flex: 1 }}>
                    <label style={lbl}>Vision</label>
                    <textarea
                      style={{ ...inp, height: "80px", resize: "vertical" }}
                      value={school.vision || ""}
                      onChange={(e) =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: { ...prev[slug], vision: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={lbl}>Mission</label>
                    <textarea
                      style={{ ...inp, height: "80px", resize: "vertical" }}
                      value={school.mission || ""}
                      onChange={(e) =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: { ...prev[slug], mission: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={lbl}>Hero Image URL</label>
                  <input
                    style={inp}
                    value={school.image || ""}
                    onChange={(e) =>
                      setSchoolDetails((prev) => ({
                        ...prev,
                        [slug]: { ...prev[slug], image: e.target.value },
                      }))
                    }
                  />
                </div>

                {/* Highlights */}
                <h4 style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  School Highlights
                </h4>
                {(school.highlights || []).map((highlight, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                      padding: "12px",
                      background: "white",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <input
                      style={{ ...inp, marginTop: 0, width: "60px" }}
                      value={highlight.icon || ""}
                      placeholder="🎓"
                      onChange={(e) =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: {
                            ...prev[slug],
                            highlights: prev[slug].highlights.map((h, i) =>
                              i === idx ? { ...h, icon: e.target.value } : h,
                            ),
                          },
                        }))
                      }
                    />
                    <input
                      style={{ ...inp, marginTop: 0, flex: "0 0 200px" }}
                      value={highlight.title || ""}
                      placeholder="Title"
                      onChange={(e) =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: {
                            ...prev[slug],
                            highlights: prev[slug].highlights.map((h, i) =>
                              i === idx ? { ...h, title: e.target.value } : h,
                            ),
                          },
                        }))
                      }
                    />
                    <input
                      style={{ ...inp, marginTop: 0, flex: 1 }}
                      value={highlight.desc || ""}
                      placeholder="Description"
                      onChange={(e) =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: {
                            ...prev[slug],
                            highlights: prev[slug].highlights.map((h, i) =>
                              i === idx ? { ...h, desc: e.target.value } : h,
                            ),
                          },
                        }))
                      }
                    />
                    <button
                      onClick={() =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: {
                            ...prev[slug],
                            highlights: prev[slug].highlights.filter(
                              (_, i) => i !== idx,
                            ),
                          },
                        }))
                      }
                      style={{
                        background: "rgba(200,0,0,0.8)",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "8px 12px",
                        cursor: "pointer",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setSchoolDetails((prev) => ({
                      ...prev,
                      [slug]: {
                        ...prev[slug],
                        highlights: [
                          ...(prev[slug].highlights || []),
                          { icon: "🎓", title: "", desc: "" },
                        ],
                      },
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "2px dashed #ddd",
                    borderRadius: "8px",
                    background: "white",
                    cursor: "pointer",
                    color: "#888",
                    fontWeight: "600",
                    marginBottom: "15px",
                  }}
                >
                  + Add Highlight
                </button>

                {/* Programs */}
                <h4 style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Academic Programs
                </h4>
                {(school.programs || []).map((program, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                      padding: "12px",
                      background: "white",
                      borderRadius: "8px",
                      marginBottom: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <input
                      style={{ ...inp, marginTop: 0, width: "60px" }}
                      value={program.icon || ""}
                      placeholder="🎓"
                      onChange={(e) =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: {
                            ...prev[slug],
                            programs: prev[slug].programs.map((p, i) =>
                              i === idx ? { ...p, icon: e.target.value } : p,
                            ),
                          },
                        }))
                      }
                    />
                    <input
                      style={{
                        ...inp,
                        marginTop: 0,
                        flex: 1,
                        minWidth: "200px",
                      }}
                      value={program.title || ""}
                      placeholder="Program Title"
                      onChange={(e) =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: {
                            ...prev[slug],
                            programs: prev[slug].programs.map((p, i) =>
                              i === idx ? { ...p, title: e.target.value } : p,
                            ),
                          },
                        }))
                      }
                    />
                    <input
                      style={{ ...inp, marginTop: 0, flex: "0 0 100px" }}
                      value={program.duration || ""}
                      placeholder="3 Years"
                      onChange={(e) =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: {
                            ...prev[slug],
                            programs: prev[slug].programs.map((p, i) =>
                              i === idx
                                ? { ...p, duration: e.target.value }
                                : p,
                            ),
                          },
                        }))
                      }
                    />
                    <input
                      style={{ ...inp, marginTop: 0, flex: "0 0 120px" }}
                      value={program.eligibility || ""}
                      placeholder="10+2"
                      onChange={(e) =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: {
                            ...prev[slug],
                            programs: prev[slug].programs.map((p, i) =>
                              i === idx
                                ? { ...p, eligibility: e.target.value }
                                : p,
                            ),
                          },
                        }))
                      }
                    />
                    <button
                      onClick={() =>
                        setSchoolDetails((prev) => ({
                          ...prev,
                          [slug]: {
                            ...prev[slug],
                            programs: prev[slug].programs.filter(
                              (_, i) => i !== idx,
                            ),
                          },
                        }))
                      }
                      style={{
                        background: "rgba(200,0,0,0.8)",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "8px 12px",
                        cursor: "pointer",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setSchoolDetails((prev) => ({
                      ...prev,
                      [slug]: {
                        ...prev[slug],
                        programs: [
                          ...(prev[slug].programs || []),
                          {
                            title: "",
                            duration: "3 Years",
                            eligibility: "10+2",
                            icon: "🎓",
                          },
                        ],
                      },
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "2px dashed #ddd",
                    borderRadius: "8px",
                    background: "white",
                    cursor: "pointer",
                    color: "#888",
                    fontWeight: "600",
                  }}
                >
                  + Add Program
                </button>
              </div>
            ))}

            <button
              onClick={() => save("school-details", schoolDetails)}
              disabled={saving}
              className="btn btn-orange"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "1.1rem",
                fontWeight: "700",
              }}
            >
              {saving ? "Saving All Schools..." : "Save All School Details"}
            </button>
          </div>
        )}

        {/* ── IQAC ── */}
        {activeTab === "iqac" && (
          <div style={card}>
            <h2 style={{ marginBottom: "8px" }}>IQAC</h2>
            <p
              style={{
                color: "#888",
                marginBottom: "24px",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              Edit the IQAC page content. Member cards are managed via the full
              settings API.
            </p>
            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>Page Title</label>
              <input
                style={inp}
                value={iqacData.title || ""}
                onChange={(e) =>
                  setIqacData((p) => ({ ...p, title: e.target.value }))
                }
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>Subtitle</label>
              <input
                style={inp}
                value={iqacData.subtitle || ""}
                onChange={(e) =>
                  setIqacData((p) => ({ ...p, subtitle: e.target.value }))
                }
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>Established Date</label>
              <input
                style={inp}
                value={iqacData.established || ""}
                onChange={(e) =>
                  setIqacData((p) => ({ ...p, established: e.target.value }))
                }
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>Regulations PDF URL (optional)</label>
              <input
                style={inp}
                value={iqacData.regulationsUrl || ""}
                onChange={(e) =>
                  setIqacData((p) => ({ ...p, regulationsUrl: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>About IQAC</label>
              <textarea
                style={{ ...inp, height: "100px", resize: "vertical" }}
                value={iqacData.about || ""}
                onChange={(e) =>
                  setIqacData((p) => ({ ...p, about: e.target.value }))
                }
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={lbl}>Vision</label>
              <textarea
                style={{ ...inp, height: "80px", resize: "vertical" }}
                value={iqacData.vision || ""}
                onChange={(e) =>
                  setIqacData((p) => ({ ...p, vision: e.target.value }))
                }
              />
            </div>
            <button
              onClick={() => save("iqac", iqacData)}
              disabled={saving}
              className="btn btn-orange"
              style={{ width: "100%", padding: "14px" }}
            >
              {saving ? "Saving..." : "Save IQAC"}
            </button>
          </div>
        )}

        {/* ── STUDENT LIFE PAGES ── */}
        {activeTab === "student-life" && (
          <div style={card}>
            <h2 style={{ marginBottom: "8px" }}>Student Life Pages</h2>
            <p
              style={{
                color: "#888",
                marginBottom: "25px",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                textTransform: "none",
              }}
            >
              Edit the title, badge, and subtitle for each Student Life page.
              The main content is managed through the page components.
            </p>

            {Object.entries(studentLifePages).map(([slug, page]) => (
              <div
                key={slug}
                style={{
                  marginBottom: "25px",
                  padding: "20px",
                  background: "#f8f9fa",
                  borderRadius: "12px",
                  borderLeft: "4px solid var(--lpu-orange)",
                }}
              >
                <h3
                  style={{
                    marginBottom: "15px",
                    fontSize: "1.1rem",
                    color: "#111",
                  }}
                >
                  {page.title}
                </h3>

                <div style={{ marginBottom: "12px" }}>
                  <label style={lbl}>Page Title</label>
                  <input
                    style={inp}
                    value={page.title || ""}
                    onChange={(e) =>
                      setStudentLifePages((prev) => ({
                        ...prev,
                        [slug]: { ...prev[slug], title: e.target.value },
                      }))
                    }
                    placeholder="Page Title"
                  />
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={lbl}>Badge Text</label>
                  <input
                    style={inp}
                    value={page.badge || ""}
                    onChange={(e) =>
                      setStudentLifePages((prev) => ({
                        ...prev,
                        [slug]: { ...prev[slug], badge: e.target.value },
                      }))
                    }
                    placeholder="e.g. ENTREPRENEURSHIP"
                  />
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={lbl}>Subtitle</label>
                  <input
                    style={inp}
                    value={page.subtitle || ""}
                    onChange={(e) =>
                      setStudentLifePages((prev) => ({
                        ...prev,
                        [slug]: { ...prev[slug], subtitle: e.target.value },
                      }))
                    }
                    placeholder="Page subtitle"
                  />
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={lbl}>
                    Content Notes (optional - for reference only)
                  </label>
                  <textarea
                    style={{ ...inp, height: "80px", resize: "vertical" }}
                    value={page.content || ""}
                    onChange={(e) =>
                      setStudentLifePages((prev) => ({
                        ...prev,
                        [slug]: { ...prev[slug], content: e.target.value },
                      }))
                    }
                    placeholder="Add notes about this page content..."
                  />
                </div>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#666",
                    marginTop: "10px",
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    textTransform: "none",
                  }}
                >
                  📍 Page URL:{" "}
                  <code
                    style={{
                      background: "#fff",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    /student-life/{slug}
                  </code>
                </p>
              </div>
            ))}

            <button
              onClick={() => save("student-life-pages", studentLifePages)}
              disabled={saving}
              className="btn btn-orange"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "1.1rem",
                fontWeight: "700",
              }}
            >
              {saving ? "Saving All Pages..." : "Save All Student Life Pages"}
            </button>

            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                background: "#fff3cd",
                borderRadius: "12px",
                border: "1px solid #ffc107",
              }}
            >
              <h4 style={{ marginBottom: "10px", color: "#856404" }}>
                💡 How to Edit Page Content
              </h4>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#856404",
                  lineHeight: "1.6",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  textTransform: "none",
                  margin: 0,
                }}
              >
                The detailed content for each page (sections, lists, cards,
                etc.) is managed directly in the page component files located
                at:
                <br />
                <code
                  style={{
                    background: "rgba(0,0,0,0.1)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    display: "inline-block",
                    marginTop: "8px",
                  }}
                >
                  miu-nextjs/src/app/student-life/[page-name]/page.jsx
                </code>
                <br />
                <span
                  style={{
                    fontSize: "0.85rem",
                    marginTop: "8px",
                    display: "block",
                  }}
                >
                  This admin panel allows you to edit the page titles, badges,
                  and subtitles that appear in the hero section.
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
