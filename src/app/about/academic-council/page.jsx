import "@/styles/AcademicCouncil.css";
import Link from "next/link";
// import "@/styles/SimplePage.css";

export default function AcademicCouncilPage() {
  const data = {
    title: "Academic Council",
    subtitle: "Manipur International University",
    intro:
      "The IInd Academic Council of Manipur International University consists of 60 members, as per Amended Guidelines approved by the Executive Council meeting on 16th October 2024.",
    composition: [
      "MIU Faculties – 25 nos.",
      "Government nominees – 03 nos.",
      "Academicians and Experts from National/Central Universities – 4 nos.",
      "Academicians and Experts local – 09 nos.",
      "Industry Experts – 12 nos.",
      "Social Category Representatives – 03 nos.",
      "Student representatives – 03 nos.",
      "Member Secretary – 01 nos.",
    ],
    notificationUrl: "",
    sections: [
      {
        title: "Members from MIU Faculty",
        members: [
          {
            sl: "1",
            name: "Prof P Kumar Singh",
            designation: "Vice Chancellor — Vice Chairperson",
            contact: "9774011289",
            email: "dr.pkumar@miu.edu.in",
          },
          {
            sl: "2",
            name: "Prof Irom Tomba Singh",
            // designation: "Dean School of Mathematical Sciences — Member",
            designation: "Dean — Member",
            contact: "9862275312",
            email: "dr.iromtomba@miu.edu.in",
          },
          {
            sl: "3",
            name: "Prof S James",
            // designation:
            //   "Dean School of Law, Defence and Strategic Studies — Member",
            designation: "Dean — Member",
            contact: "7980506093",
            email: "Dr.jamess@miu.edu.in",
          },
          {
            sl: "4",
            name: "Prof Charles Yuhlung",
            // designation: "Dean School of Social Sciences — Member",
            designation: "Dean — Member",
            contact: "9862552550",
            email: "dr.charles@miu.edu.in",
          },
          {
            sl: "5",
            name: "Prof S Raghumani Singh",
            // designation: "Dean School of Agri and Allied Sciences — Member",
            designation: "Dean — Member",
            contact: "7308150914",
            email: "dr.raghumani@miu.edu.in",
          },
          {
            sl: "6",
            name: "Prof Ng Ajitkumar",
            // designation: "Dean School of Biological Sciences — Member",
            designation: "Dean — Member",
            contact: "9485227590",
            email: "dr.ajitng@miu.edu.in",
          },
          {
            sl: "7",
            name: "Prof Th Basanta Singh",
            // designation:
            //   "Dean School of Physical Sciences and Engineering — Member",
            designation: "Dean — Member",
            contact: "8787740321",
            email: "dr.basanta@miu.edu.in",
          },
          {
            sl: "8",
            name: "Prof N Ibohal Singh",
            // designation: "Dean School of Human and Health Sciences — Member",
            designation: "Dean — Member",
            contact: "9436891381",
            email: "dr.ibohal@miu.edu.in",
          },
          {
            sl: "9",
            name: "Prof Md Kheiruddin Shah",
            // designation:
            //   "Dean School of Commerce and Management Sciences — Member",
            designation: "Dean — Member",
            contact: "9774935464",
            email: "profkheiruddin@miu.edu.in",
          },
          {
            sl: "10",
            name: "Dr Rajesh Chinchewadi",
            // designation: "Dean School of Innovation and Skill — Member",
            designation: "Dean — Member",
            contact: "8286773679",
            email: "dr.rajeshchinchewadi@miu.edu.in",
          },
          {
            sl: "11",
            name: "Prof R K Indira Devi",
            // designation: "Dean School of Humanities — Member",
            designation: "Dean — Member",
            contact: "9856459154",
            email: "dr.rkindira@miu.edu.in",
          },
          {
            sl: "12",
            name: "Prof W Sushma Devi",
            designation: "Dean Students Welfare — Member",
            contact: "9818705195",
            email: "dr.sushma@miu.edu.in",
          },
          {
            sl: "13",
            name: "Prof H Prativa",
            designation: "Professor — Member",
            contact: "",
            email: "",
          },
          {
            sl: "14",
            name: "Prof R K Sujata",
            designation: "Professor — Member",
            contact: "9856910930",
            email: "dr.sujata@miu.edu.in",
          },
          {
            sl: "15",
            name: "Prof Mayengbam Bidyarani Devi",
            designation: "Professor — Member",
            contact: "9774338607",
            email: "dr.mayenbidyarani@miu.edu.in",
          },
          {
            sl: "16",
            name: "Prof Irom Shirly",
            designation: "Professor — Member",
            contact: "9854844515",
            email: "dr.iromshirly@miu.edu.in",
          },
          {
            sl: "17",
            name: "Prof Chandibai Potsangbam",
            designation: "Professor — Member",
            contact: "9774800960",
            email: "dr.chandibai@miu.edu.in",
          },
          {
            sl: "18",
            name: "Dr M Bidyarani Devi",
            designation: "Associate Professor — Member",
            contact: "9774770034",
            email: "dr.bidyarani@miu.edu.in",
          },
          {
            sl: "19",
            name: "Dr Grihalaxmi Devi",
            designation: "Associate Professor — Member",
            contact: "9774526966",
            email: "dr.grihalakshmi@miu.edu.in",
          },
          {
            sl: "20",
            name: "Dr Kh Mukta Singh",
            designation: "Associate Professor — Member",
            contact: "7085383690",
            email: "dr.khadangbammukta@miu.edu.in",
          },
          {
            sl: "21",
            name: "Dr A Bijayalaxmi",
            designation: "Associate Professor — Member",
            contact: "9611187749",
            email: "dr.bijayalakshmi@miu.edu.in",
          },
          {
            sl: "22",
            name: "Dr L Nonie",
            designation: "Associate Professor — Member",
            contact: "9774293528",
            email: "nonie.lourembam@miu.edu.in",
          },
          {
            sl: "23",
            name: "Dr Salam Anand",
            designation: "Associate Professor — Member",
            contact: "7085602359",
            email: "dr.anandsalam@miu.edu.in",
          },
          {
            sl: "24",
            name: "Dr Yumlembam Bidyananda",
            designation: "Associate Professor — Member",
            contact: "9612318891",
            email: "dr.bidyananda@miu.edu.in",
          },
          {
            sl: "25",
            name: "Dr Senjam Jinus Singh",
            designation: "Associate Professor — Member",
            contact: "6009073539",
            email: "singhsenjam@gmail.com",
          },
        ],
      },
      {
        title: "State Government Nominee Members",
        members: [
          {
            sl: "27",
            name: "The Director of University & Higher Education nominee",
            designation: "Nominee Member",
            contact: "",
            email: "",
          },
          {
            sl: "28",
            name: "The Director of Technical Education nominee",
            designation: "Nominee Member",
            contact: "",
            email: "",
          },
          {
            sl: "29",
            name: "Dr Rajkumari Sanakhonbi, Deputy Director, Directorate of AYUSH, Govt of Manipur",
            designation: "Nominee Member",
            contact: "",
            email: "",
          },
        ],
      },
      {
        title: "Eminent Experts & Academicians from National Universities",
        members: [
          {
            sl: "30",
            name: "Dr Ngangkham Joykumar Singh",
            designation:
              "HOD, College of Food Technology, CAU Imphal — Advisory Member",
            contact: "9612168301",
            email: "",
          },
          {
            sl: "31",
            name: "Dr Thiyam David Singh",
            designation:
              "HOD, Department of Chemistry, NIT Imphal — Advisory Member",
            contact: "8305801124",
            email: "",
          },
          {
            sl: "32",
            name: "Retd Professor Y Hemanta Kumar",
            designation:
              "Dept of Rabindra Sangit Dance and Drama, Visva Bharti University — Advisory Member",
            contact: "8918709842",
            email: "",
          },
          {
            sl: "33",
            name: "Dr Soihiamlung Dangmei",
            designation:
              "Asst Professor Political Science, IG National Tribal University Manipur — Advisory Member",
            contact: "9402791931",
            email: "",
          },
        ],
      },
      {
        title: "VC's Nominees — Eminent Experts / Academicians (Local)",
        members: [
          {
            sl: "34",
            name: "Prof (Retd) H Tombi Singh",
            designation:
              "Retd VC Manipur University & Retd Director IBSD — Advisory Member",
            contact: "8837455762",
            email: "",
          },
          {
            sl: "35",
            name: "Dr Th Asha Sinha",
            designation:
              "Principal Hindi Teacher Training College, Govt of Manipur — Advisory Member",
            contact: "8837321064",
            email: "",
          },
          {
            sl: "36",
            name: "Dr Th Munindro Singh",
            designation:
              "Retd Director Planning Dept, Govt of Manipur — Advisory Member",
            contact: "9366004178",
            email: "",
          },
          {
            sl: "37",
            name: "Dr Potsangbam Latsaheb",
            designation:
              "MD Orthopedics, Retd SAG Equiv to IG BSF — Advisory Member",
            contact: "9435387007",
            email: "",
          },
          {
            sl: "38",
            name: "Dr A Momon Singh",
            designation:
              "MD Forensic Medicine, Retd HOD RIMS — Advisory Member",
            contact: "9894837896",
            email: "",
          },
          {
            sl: "39",
            name: "Dr Ch Manglem Singh",
            designation:
              "MD Obs and Gynaecology, Retd Professor JNIMS — Advisory Member",
            contact: "9612164351",
            email: "",
          },
          {
            sl: "40",
            name: "Dr Th Biren",
            designation:
              "Retd Principal Oriental Autonomous College — Advisory Member",
            contact: "8787630856",
            email: "",
          },
          {
            sl: "41",
            name: "Dr S Gunadhor Singh",
            designation: "Retd Reader Imphal College — Advisory Member",
            contact: "8413942282",
            email: "",
          },
          {
            sl: "42",
            name: "Dr M Makhonmani",
            designation:
              "Retd Asst Professor, Culture and Performing Arts, Manipur University — Advisory Member",
            contact: "9612221823",
            email: "",
          },
        ],
      },
      {
        title: "Eminent Experts of the Industry",
        members: [
          {
            sl: "43",
            name: "Dr Rajeev Kangabam",
            designation:
              "Manipur Technology Innovation Hub, Imphal — Advisory Member",
            contact: "9615115952",
            email: "",
          },
          {
            sl: "44",
            name: "Dr Naorem Chaoba Singh",
            designation:
              "President, Manipur Yogasana Sports Association — Advisory Member",
            contact: "8774473940",
            email: "",
          },
          {
            sl: "45",
            name: "Ksh Gopendra Singh",
            designation:
              "Rajya Prabhari, Patanjali Yoga Society — Advisory Member",
            contact: "9612167022",
            email: "",
          },
          {
            sl: "46",
            name: "S Sanathoi Singh",
            designation: "CEO SS Electronics, Imphal East — Advisory Member",
            contact: "8974571965",
            email: "",
          },
          {
            sl: "47",
            name: "Dr Premjit Meitei",
            designation: "MAYON Company Pvt Ltd, Imphal West — Advisory Member",
            contact: "7005365041",
            email: "",
          },
          {
            sl: "48",
            name: "Dr Mohammed Rakibuddin",
            designation: "CEO JR Hospital, Imphal East — Advisory Member",
            contact: "6009079600",
            email: "",
          },
          {
            sl: "49",
            name: "Ch Miranda Devi",
            designation:
              "Principal Kangla Health Care Institutional Foundation — Advisory Member",
            contact: "9863309810",
            email: "",
          },
          {
            sl: "50",
            name: "Sayed Ajmath",
            designation:
              "Coordinator JR Institute of Health Sciences, Imphal East — Advisory Member",
            contact: "8131001739",
            email: "",
          },
          {
            sl: "51",
            name: "Mr Telem Dara Singh",
            designation:
              "President Nongpok Pukkei Organic Producers Company Pvt Ltd — Advisory Member",
            contact: "9862734580",
            email: "",
          },
          {
            sl: "52",
            name: "Gitashwari Yumnam",
            designation:
              "Proprietor Green Biotech, Imphal West — Advisory Member",
            contact: "9774250870",
            email: "",
          },
          {
            sl: "53",
            name: "Elizabeth Yambem",
            designation:
              "Proprietor Dwellers Tea, Imphal West — Advisory Member",
            contact: "9954189418",
            email: "",
          },
          {
            sl: "54",
            name: "Aran",
            designation:
              "Proprietor Hortrition Foods, Wino Bazar Ukhrul — Advisory Member",
            contact: "8415925917",
            email: "",
          },
        ],
      },
      {
        title: "Social Category Representative Members",
        members: [
          {
            sl: "55",
            name: "Mr Dearson Panmei",
            designation: "Schedule Tribe nominee — Advisory Member",
            contact: "7085791931",
            email: "",
          },
          {
            sl: "56",
            name: "Mr Yumkhaibam James Meitei",
            designation: "Schedule Caste nominee — Advisory Member",
            contact: "8787579409",
            email: "",
          },
          {
            sl: "57",
            name: "Dr Sapam Jasowanta",
            designation: "PWDs nominee (Visual imp) — Advisory Member",
            contact: "9612157246",
            email: "Sapamjasowanta2399@gmail.com",
          },
        ],
      },
      {
        title: "Students Representatives",
        members: [
          {
            sl: "58",
            name: "Ms H Tapashree",
            designation: "PhD courses representative — Student Representative",
            contact: "9612665467",
            email: "",
          },
          {
            sl: "59",
            name: "Mr L Viswanath Singh",
            designation: "PG courses representative — Student Representative",
            contact: "9205615018",
            email: "",
          },
          {
            sl: "60",
            name: "Ms Rabiya Begum",
            designation: "UG Courses representative — Student Representative",
            contact: "6009743784",
            email: "",
          },
        ],
      },
      // {
      //   title: "Member Secretary",
      //   members: [
      //     {
      //       sl: "61",
      //       name: "Prof T Brajeshwari Devi",
      //       designation: "Registrar MIU — Member Secretary",
      //       contact: "9862879287",
      //       email: "registrar@miu.edu.in",
      //     },
      //   ],
      // },
      {
        title: "Invitees",
        members: [
          // {
          //   sl: "62",
          //   name: "Prof T Kamalabati Devi",
          //   designation: "Controller of Examinations — Permanent Invitee",
          //   contact: "",
          //   email: "tkamalabati@miu.edu.in",
          // },
          {
            sl: "61",
            name: "Ningombam Amarjit Singh",
            designation: "Director MIU — Permanent Invitee",
            contact: "9612123121",
            email: "",
          },
          {
            sl: "62",
            name: "Thokchom Lenin Singh",
            designation: "Librarian MIU — Permanent Invitee",
            contact: "8014761077",
            email: "",
          },
          {
            sl: "63",
            name: "Kiran Soraisam",
            designation: "Finance Officer — Permanent Invitee",
            contact: "6009149750",
            email: "",
          },
          {
            sl: "64",
            name: "Prof (Retd) T Umabati Devi",
            designation:
              "Ombudsperson, Students Grievances Redressal Committee — Permanent Invitee",
            contact: "8974056543",
            email: "",
          },
        ],
      },
    ],
  };

  return (
    <div className="ac-page">
      {/* Hero */}
      <div className="simple-hero">
        <div className="container">
          <nav className="simple-breadcrumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>›</span>
            <span>
              <Link href="/about">About Us</Link>
            </span>
            <span>›</span>

            <span>
              <Link href="/about/governance">Governance</Link>
            </span>
            <span>›</span>
            <span>Academic Council</span>
          </nav>

          <span className="simple-badge">GOVERNANCE</span>
          <h1 className="simple-title">{data.title}</h1>
          <p className="simple-subtitle">{data.subtitle}</p>
        </div>
      </div>

      <div className="container ac-body">
        {/* Intro + composition */}
        <div className="ac-intro-card">
          <p className="ac-intro-text">{data.intro}</p>
          {data.notificationUrl && (
            <a
              href={data.notificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ac-download-btn"
            >
              📄 Download Notification
            </a>
          )}
          {/* <div className="ac-composition">
            <h3>Composition</h3>
            <ul>
              {(data.composition || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* Sections */}
        {(data.sections || []).map((section, si) => (
          <div key={si} className="ac-section">
            <h2 className="ac-section-title">{section.title}</h2>
            <div className="ac-table-wrapper">
              <table className="ac-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Name</th>
                    <th>Designation / Role</th>
                  </tr>
                </thead>
                <tbody>
                  {(section.members || []).map((m, mi) => (
                    <tr key={mi}>
                      <td className="ac-sl">{m.sl}</td>
                      <td>
                        <strong>{m.name}</strong>
                      </td>
                      <td className="ac-role">{m.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
