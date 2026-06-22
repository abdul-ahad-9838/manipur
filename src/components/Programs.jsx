import "@/styles/Programs.css";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_SCHOOLS = [
  {
    name: "School of Engineering and Information Technology",
    slug: "school-of-engineering-and-information-technology",
    desc: "Engineering the future.",
    image: "/api/images/6a2d3f1618b853d4777d415a",
  },
  {
    name: "School of Commerce and Management",
    slug: "school-of-commerce-and-management",
    desc: "Developing tomorrow's leaders.",
    image: "/api/images/6a2d3f1d18b853d4777d415b",
  },
  {
    name: "School of Science",
    slug: "school-of-science",
    desc: "Discovering the world through science.",
    image: "/api/images/6a2d3f2118b853d4777d415c",
  },
  {
    name: "School of Vocational Studies",
    slug: "school-of-vocational-studies",
    desc: "Skills for the real world.",
    image: "/api/images/6a2d3ef718b853d4777d4158",
  },
  {
    name: "School of Arts and Humanities",
    slug: "school-of-arts-and-humanities",
    desc: "Nurturing future leaders.",
    image: "/api/images/6a2d3eff18b853d4777d4159",
  },
  {
    name: "School of Fire & Safety",
    slug: "school-of-fire-&-safety",
    desc: "Fire & Safety",
    image: "",
  },
  {
    name: "School of Library and Information Science",
    slug: "school-of-library-and-information-science",
    desc: "School of Library and Information Science",
    image: "",
  },
  {
    name: "School of Paramedical Sciences",
    slug: "school-of-paramedical-sciences",
    desc: "The School of Allied Health Science at MIU is dedicated to training skilled healthcare professionals in paramedical, diagnostic, therapeutic, and rehabilitation sciences. Our programs combine rigorous academic training with hands-on clinical exposure, preparing graduates to serve as vital members of the modern healthcare team.",
    image: "/api/images/6a2d41c318b853d4777d415d",
  },
  {
    name: "School of Journalism & Mass Communication",
    slug: "school-of-journalism-mass-communication",
    desc: "The School of Journalism & Mass Communication prepares students for careers in media, journalism, public relations, advertising, and digital communication through a blend of theoretical knowledge and practical training.",
    image: "",
  },
];

async function getSchoolsData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/schools-section`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Schools fetch failed:", error);
    return null;
  }
}

export default async function Programs() {
  const data = await getSchoolsData();

  let schools = DEFAULT_SCHOOLS;
  let content = {
    badge: "ACADEMICS",
    title: "Schools & Faculties",
    subtitle:
      "Our Schools and Faculties bring together experienced academicians and subject experts dedicated to excellence in teaching and research.",
  };

  if (data?.content) {
    if (data.content.schools?.length) {
      const dbSchools = data.content.schools;

      const dbSlugs = new Set(dbSchools.map((s) => s.slug));
      const missing = DEFAULT_SCHOOLS.filter((s) => !dbSlugs.has(s.slug));

      schools = [...dbSchools, ...missing];
    }

    content = { ...content, ...data.content };
  }

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
}
