const BASE_URL = "https://miu.co.in";
const SITE_NAME = "Manipur International University";

export function createMetadata({ title, description, path, keywords = "" }) {
  return {
    title,
    description,
    keywords: `${keywords}, Manipur International University, MIU Imphal, university Manipur`,
    alternates: { canonical: `${BASE_URL}${path}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${BASE_URL}${path}`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
