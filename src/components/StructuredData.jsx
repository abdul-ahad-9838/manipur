export default function StructuredData() {
  const universitySchema = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: "Manipur International University",
    alternateName: [
      "MIU",
      "MIU Imphal",
      "Manipur International University Imphal",
    ],
    url: "https://miu.edu.in/",
    logo: "https://miu.edu.in/images/MIU_Logo.png",
    sameAs: [
      "https://en.wikipedia.org/wiki/Manipur_International_University",
      "https://in.linkedin.com/company/manipur-international-university-miu",
      "https://www.facebook.com/ManipurInternationalUniversityOfficial/",
      "https://x.com/MIU_India",
      "https://www.instagram.com/miu.india",
    ],
    foundingDate: "2018",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Manipur International University, Imphal, Manipur, India - 795001",
      addressLocality: "Imphal",
      addressRegion: "Manipur",
      postalCode: "795001",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9319727766",
      contactType: "admissions",
      email: "admissions@miu.edu.in",
      availableLanguage: ["English", "Hindi", "Manipuri"],
    },
    description:
      "Manipur International University (MIU) is an autonomous state private university in Imphal, recognised by UGC under sections 2(f) and 22.",
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
        item: "https://miu.edu.in/",
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
