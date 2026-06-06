"use client";

import React, { useState } from "react";
import "@/styles/LeadershipMessages.css";

export const defaultLeadership = [
  {
    role: "Chancellor",
    name: "",
    title: "Welcome Message",
    image: "",
    message: [
      "Dear Students, Faculty, Staff, and Visitors,",
      "It is my privilege to welcome you to Manipur International University (MIU).",
      "As Chancellor, I take great pride in being part of an institution that is committed to academic excellence, innovation, and inclusivity. At MIU, we strive to create an environment where every learner is encouraged and empowered to achieve their highest potential.",
      "Our University is built on a strong foundation of academic integrity and a forward-looking vision. We are dedicated to nurturing future-ready professionals and responsible citizens through quality education, research, and skill development. Our distinguished faculty members serve as mentors and thought leaders, fostering intellectual curiosity and contributing to meaningful research and knowledge creation.",
      "We believe that education is a transformative force that not only shapes individual careers but also contributes to the progress of society. MIU offers a vibrant and diverse academic environment that promotes critical thinking, collaboration, and lifelong learning.",
      "As we continue to grow, we remain focused on strengthening our academic programs, encouraging interdisciplinary learning, and contributing to national and global development.",
      "I warmly invite you to explore the opportunities at MIU and be a part of our journey toward excellence.",
      "Warm regards,",
    ],
    signature: {
      name: "",
      role: "Chancellor, Manipur International University",
    },
  },
  {
    role: "Vice Chancellor",
    name: "",
    title: "Message from the Vice Chancellor",
    image: "",
    message: [
      "Dear Students, Faculty Members, and Distinguished Visitors,",
      "It is my privilege to welcome you to Manipur International University (MIU).",
      "As Vice Chancellor, I am honored to lead an institution that is committed to academic excellence, innovation, and the holistic development of its learners. At MIU, we view education not merely as the acquisition of knowledge, but as a transformative journey that empowers individuals to think critically, act responsibly, and contribute meaningfully to society.",
      "Our University fosters a dynamic and inclusive learning environment where intellectual curiosity is encouraged, research is promoted, and innovation is nurtured. With a strong emphasis on interdisciplinary learning and industry integration, we aim to equip our students with the skills and knowledge required to succeed in an ever-evolving global landscape.",
      "We are dedicated to maintaining the highest standards in teaching, research, and professional development. Through the collective efforts of our distinguished faculty and vibrant academic community, we strive to develop individuals who are not only competent professionals but also responsible global citizens.",
      "At MIU, you will find a community driven by purpose, excellence, and continuous growth. Whether you are a prospective student, a current learner, or a valued alumnus, you are an integral part of our vision to build a progressive and impactful institution.",
      "I extend my best wishes to all of you for a rewarding and successful academic journey. We look forward to your association with MIU as we continue our pursuit of excellence in higher education.",
      "Warm regards,",
    ],
    signature: {
      name: "",
      role: "Vice Chancellor, Manipur International University",
    },
  },
  {
    role: "Pro Vice Chancellor",
    name: "",
    title: "Welcome Message",
    image: "",
    message: [
      "Dear Students, Faculty Members, and Esteemed Stakeholders,",
      "It gives me great pleasure to welcome you to Manipur International University (MIU).",
      "As the Pro Vice Chancellor, I am honored to be part of a progressive academic institution dedicated to excellence, innovation, and transformative education. At MIU, we believe that education goes beyond the acquisition of knowledge—it serves as the foundation for developing capable, ethical, and future-ready individuals.",
      "Our University is committed to creating an academic environment that fosters intellectual curiosity, critical thinking, and professional competence. Through a balanced approach that integrates academic rigor, skill-based learning, and industry engagement, we aim to empower our students to achieve their aspirations and contribute meaningfully to society.",
      "We continuously strive to enhance the quality of education, research, and institutional practices. Through dynamic academic programs, forward-looking research initiatives, and a supportive and inclusive campus environment, MIU remains focused on preparing learners to meet the evolving demands of a global landscape.",
      "The Office of the Pro Vice Chancellor is dedicated to strengthening academic excellence, improving operational efficiency, and supporting the overall growth of the University. We aim to cultivate a collaborative academic community where students, faculty, and staff work together towards innovation, knowledge creation, and holistic development.",
      "I encourage you to explore the opportunities at MIU and become part of a vibrant learning environment that inspires growth, ambition, and success. Our team remains committed to supporting you throughout your academic and professional journey.",
      "With best wishes for your continued success,",
    ],
    signature: {
      name: "",
      role: "Pro Vice Chancellor (Acting Vice Chancellor), Manipur International University",
    },
  },
  {
    role: "Registrar",
    name: "",
    title: "Welcome Message",
    image: "",
    message: [
      "Dear Students, Faculty Members, and Esteemed Stakeholders,",
      "It gives me immense pleasure to welcome you to Manipur International University (MIU)—an institution dedicated to academic excellence, innovation, and holistic development.",
      "Nestled amidst the scenic valleys and hills of Manipur, MIU provides a serene and intellectually stimulating environment that is highly conducive to quality learning and research. Our campus is more than a place of education; it is a vibrant academic ecosystem where ideas flourish, curiosity is nurtured, and future leaders are shaped.",
      "At MIU, we believe that education extends beyond the mere acquisition of knowledge. It is a transformative journey that develops intellectual depth, practical skills, ethical values, and a lifelong commitment to learning. Our academic framework is designed to promote the overall development of individuals—empowering them physically, mentally, intellectually, and socially to succeed in an ever-evolving world.",
      "In today's dynamic, technology-driven global landscape, learners must be adaptable, skilled, and forward-thinking. At MIU, we are committed to equipping our students with future-ready competencies, ensuring they remain competitive and relevant at both national and international levels.",
      "Aligned with the vision of the National Education Policy (NEP) 2020 and the National Science, Technology and Innovation Policy (STIP) 2020, the University emphasizes research, innovation, and interdisciplinary learning. We actively encourage critical thinking, scientific inquiry, and creativity, enabling our students and scholars to contribute meaningfully to societal and global development.",
      "Our focus remains on fostering a culture of innovation, creativity, and research-driven learning. Through a supportive and inclusive academic environment, we aim to inspire young minds, encourage self-discovery, and empower individuals to realize their fullest potential as professionals and responsible citizens.",
      "I encourage all students, scholars, and aspirants to make the most of the academic resources, research opportunities, and enriching environment at MIU. May your journey here be one of growth, discovery, and excellence.",
      "With my best wishes for your success and future endeavors.",
    ],
    signature: {
      name: "",
      role: "Registrar, Manipur International University",
    },
  },
  {
    role: "Director – Admissions",
    name: "",
    title: "Welcome Message",
    image: "",
    message: [
      "Dear Students, Faculty Members, and Friends,",
      "It gives me great pleasure to welcome you to Manipur International University (MIU).",
      "At MIU, we are committed to fostering an academic environment that promotes excellence, innovation, and meaningful engagement. As Director – Admissions, I take pride in inviting you to explore an institution dedicated to shaping future-ready professionals through quality education and holistic development.",
      "We believe that every learner has the potential to excel when provided with the right opportunities and guidance. Whether you are an aspiring student, a researcher, or a valued member of the academic community, MIU offers a supportive ecosystem that encourages growth, achievement, and success.",
      "Recognized as an emerging private university in Manipur, MIU emphasizes industry-aligned programs, practical learning, and a vibrant campus experience. Through our student-centric approach and diverse academic offerings, we aim to create pathways that lead to both personal fulfillment and professional success.",
      "As you explore our website, you will discover a wide range of opportunities—from innovative programs to a dynamic learning environment. Whether you are considering joining us, are already part of the University, or are one of our valued alumni, you are an integral part of our journey toward excellence.",
      "I sincerely thank you for your interest in MIU and look forward to welcoming you to our academic community.",
      "Warm regards,",
    ],
    signature: {
      name: "",
      role: "Director – Admissions, Manipur International University",
    },
  },
  {
    role: "Controller of Examinations",
    name: "",
    title: "Message from the COE",
    image: "",
    message: [
      "Dear Students,",
      "Greetings from Manipur International University (MIU).",
      "It is my privilege to extend my best wishes to all students as you embark on your academic journey with us. The Office of the Controller of Examinations plays a vital role in maintaining the integrity, transparency, and credibility of the University's evaluation system.",
      "At MIU, we are committed to ensuring a fair, robust, and student-centric examination process that accurately reflects academic performance and learning outcomes. Our evaluation framework is designed to uphold the highest standards of confidentiality, consistency, and academic rigor, while also encouraging continuous improvement and innovation in assessment practices.",
      "We encourage all students to approach their academic responsibilities with dedication, discipline, and a commitment to excellence. Examinations are not merely a measure of knowledge, but an opportunity to demonstrate understanding, analytical ability, and personal growth.",
      "The Examination Department remains dedicated to providing timely support, clear communication, and efficient processes to ensure a smooth and stress-free examination experience for every student.",
      "I extend my sincere best wishes for your success and encourage you to make the most of the academic opportunities available at MIU.",
      "With best wishes,",
    ],
    signature: {
      name: "",
      role: "Controller of Examinations (COE), Manipur International University",
    },
  },
];

const LeadershipMessages = () => {
  const [leadershipData] = useState(defaultLeadership);

  return (
    <section className="leadership-section">
      <div className="leadership-container">
        <div className="leadership-title">
          <h2>Our Leadership</h2>
          <p>
            Guided by visionaries dedicated to educational excellence and
            innovation.
          </p>
        </div>

        {leadershipData.map((leader, index) => {
          const anchorIds = [
            "chancellor",
            "vc",
            "pro-chancellor",
            "registrar",
            "director",
            "coe",
          ];
          return (
            <div
              key={index}
              id={anchorIds[index] || `leader-${index}`}
              className={`leadership-card ${index % 2 !== 0 ? "reverse" : ""}`}
            >
              {leader.image && (
                <div className="leadership-image-box">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="leadership-image"
                  />
                </div>
              )}
              <div className="leadership-content">
                <span className="leadership-badge">{leader.role}</span>
                {leader.name && (
                  <h3 className="leadership-name">{leader.name}</h3>
                )}
                <p className="leadership-role">{leader.title}</p>
                <div className="leadership-text">
                  {(leader.message || []).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <div className="leadership-signature">
                  {leader.signature?.name && (
                    <span className="sig-name">{leader.signature.name}</span>
                  )}
                  <span className="sig-role">{leader.signature?.role}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LeadershipMessages;
