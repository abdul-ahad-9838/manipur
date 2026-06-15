"use client";

import React from "react";

export default function StructuredData() {
  const universitySchema = {
    "@context": "https://schema.org",
    "@type": "University",
    name: "Manipur International University",
    alternateName: [
      "MIU",
      "MIU Imphal",
      "Manipur International University Imphal",
    ],
    url: "https://miu.edu.in",
    logo: "https://miu.edu.in/images/MIU_Logo.webp",
    image: "https://miu.edu.in/emblem.webp",
    description:
      "Manipur International University (MIU) is a UGC recognized premier university in Imphal, Manipur, India offering undergraduate, postgraduate and doctoral programs across Engineering, Management, Science, Commerce, Humanities and more.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Manipur International University Campus",
      addressLocality: "Imphal",
      addressRegion: "Manipur",
      postalCode: "795001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "24.8170",
      longitude: "93.9368",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9319727766",
        contactType: "admissions",
        availableLanguage: ["English", "Hindi", "Meitei"],
      },
      {
        "@type": "ContactPoint",
        email: "admission@miu.edu.in",
        contactType: "customer service",
      },
    ],
    sameAs: [
      "https://www.facebook.com/ManipurInternationalUniversityOfficial/",
      "https://x.com/MIU_India",
      "http://in.linkedin.com/company/manipur-international-university",
    ],
    foundingDate: "2018",
    numberOfStudents: 5000,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "UGC Recognition",
      recognizedBy: {
        "@type": "Organization",
        name: "University Grants Commission",
        url: "https://www.ugc.gov.in",
      },
    },
    department: [
      { "@type": "Organization", name: "School of Engineering" },
      { "@type": "Organization", name: "School of Management" },
      { "@type": "Organization", name: "School of Science" },
      { "@type": "Organization", name: "School of Commerce" },
      { "@type": "Organization", name: "School of Humanities" },
      { "@type": "Organization", name: "School of Information Technology" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:30",
      closes: "16:00",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Manipur International University",
    url: "https://miu.edu.in",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://miu.edu.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://miu.edu.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://miu.edu.in/about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Admissions",
        item: "https://miu.edu.in/admissions",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Schools",
        item: "https://miu.edu.in/information-cell",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Contact",
        item: "https://miu.edu.in/contact",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(universitySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
