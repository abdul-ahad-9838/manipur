import "@/styles/About.css";
import "@/styles/SimplePage.css";
import Link from "next/link";

export const metadata = {
  title: "About MIU | Manipur International University, Imphal",
  description:
    "Learn about Manipur International University — our vision, UGC 2(f) & Section 22 recognition, leadership, and academic philosophy",
  alternates: { canonical: "https://miu.edu.in/about" },
  openGraph: {
    title: "About MIU | Manipur International University",
    description:
      "Discover MIU's history, vision, and leadership in higher education.",
    url: "https://miu.edu.in/about",
  },
};

const paragraphs = [
  "Located in the region famous for the Sangai deer, the peaceful Loktak Lake, and the graceful Manipuri dancing, Manipur International University is inspired by its surrounding area and the local people. The university combines the unique culture and natural wealth of its geographical environment in its educational activities.",
  "Education in the Manipur International University is deeply rooted in the geographical and cultural reality of the region yet remains consistent with the best international traditions of quality and excellence. The university aims at bringing world-class education straight to its students who can enjoy top-notch studies and research opportunities without the need to move elsewhere in search for a good school.",
  "MIU creates an educational atmosphere that goes far beyond purely academic training. Critical thinking, values-based education, and intercultural awareness become an essential part of MIU curriculum. Students get not just the necessary theoretical knowledge but also learn to think, to be responsible and proactive individuals with goals and visions.",
  "Being strategically positioned in Manipur, the gateway to Southeast Asia, MIU is ideally suited to serve its role as a regional university and a center for academic exchange between India and Southeast Asia.",
  "Consistent with the tradition of the traditional Indian educational system while at the same time incorporating modern ideas of international universities, MIU encourages interdisciplinarity and intercultural exchange.",
  "At the heart of MIU lies the belief in the value of knowledge, culture, and individuality.",
];

const recognitions = [
  {
    title: "Our Prestigious Recognitions",
    intro:
      "Manipur International University (MIU) has gained notable recognitions for its dedication towards excellence in academics, innovation, and quality higher education.",
    points: [
      "A university established under the provisions of the Manipur International University Act, 2018 enacted by the government of Manipur",
      "An institution recognized by the University Grants Commission (UGC) under Section 2(f) and 22 of UGC Act, 1956, empowered to confer degrees",
      'An "International Institution of Excellence"',
      '"An Institution of State Importance"',
      '"State Research Institute"',
    ],
  },
  {
    title: "Academic and Institutional Strengths",
    points: [
      "Committed to following NEP 2020 Framework",
      "Fosters interdisciplinary and outcome based education (OBE)",
      "Research and Innovation focused institution",
      "Focuses on enhancing skills with industry integrated curriculum and improving employability",
      "Dedicated to providing quality assurance by IQAC in accordance with NAAC guidelines",
    ],
  },
  {
    title: "International and Regional Connectivities",
    points: [
      "Located strategically as a gateway to Southeast Asia",
      "Foster academic collaborations at both regional and international levels",
      "Provides opportunities for learning across cultures and international academic exposure",
      "Participating in research and exchanges across universities around the globe",
    ],
  },
  {
    title: "Student Excellence",
    points: [
      "Transparent academic and examination system for students' benefit",
      "Highly devoted towards practical learning and real world applicability",
      "Financial aid and scholarship provided to deserving students",
      "Conducive learning environment for all round development",
    ],
  },
  {
    title: "Quality and Compliance Oriented",
    points: [
      "Follows guidelines of statutory and regulatory authorities",
      "Maintains transparency in all disclosures",
      "Periodic academic and administrative audits",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="simple-page">
      {/* Hero */}
      <div className="simple-hero">
        <div className="container">
          <nav className="simple-breadcrumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span className="bc-sep">›</span>
            <span>About Us</span>
          </nav>
          <span className="simple-badge">ABOUT MIU</span>
          <h1>About Manipur International University</h1>
          <p className="simple-subtitle">
            Established under the Manipur International University Act, 2018,
            MIU is committed to academic excellence, research, and holistic
            development.
          </p>
        </div>
      </div>

      {/* Intro block */}
      <div className="about-intro-block">
        <div className="container">
          <h2 className="about-intro-title">
            About the Manipur International University
          </h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="about-intro-para">
              {p}
            </p>
          ))}
          <p className="about-intro-cta">
            Start your educational journey with Manipur International
            University!
          </p>
        </div>
      </div>

      {/* Recognitions block */}
      <div className="about-recognitions-block">
        <div className="container">
          {recognitions.map((sec, i) => (
            <div key={i} className="about-rec-section">
              <h2 className="about-rec-title">{sec.title}</h2>
              {sec.intro && <p className="about-rec-intro">{sec.intro}</p>}
              <ul className="about-rec-list">
                {sec.points.map((pt, j) => (
                  <li key={j}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
