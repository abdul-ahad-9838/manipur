// import DynamicPage from "@/components/DynamicPage";

// export const metadata = {
//   title: "Admissions 2026–27 | Manipur International University",
//   description:
//     "Apply online to MIU Imphal. Check eligibility, application dates, documents, and fees for UG, PG and PhD admissions 2026–27.",
//   keywords:
//     "MIU admissions, Manipur university admissions 2026, MIU Imphal admission, engineering admission Manipur, MBA admission Imphal",
//   alternates: { canonical: "https://miu.edu.in/admissions" },
//   openGraph: {
//     title: "Admissions 2026 | MIU Imphal",
//     description:
//       "Apply now for admissions at Manipur International University. Multiple programs available.",
//     url: "https://miu.edu.in/admissions",
//   },
// };

// export default function AdmissionsPage() {
//   return (
//     <DynamicPage
//       settingsKey="page-admissions"
//       defaultTitle="Admissions 2026"
//       defaultSubtitle="Join Manipur International University and transform your future with quality education."
//       breadcrumb={[{ label: "Admissions" }]}
//     />
//   );
// }

import AdmissionProcess from "@/components/AdmissionProcess";

export const metadata = {
  title: "Admission Process | Manipur International University",
  description:
    "Step-by-step guide to the admission process at MIU. Simple, transparent, and student-friendly.",
  alternates: {
    canonical: "https://miu.edu.in/admissions/process",
  },
};

export default function AdmissionsPage() {
  return <AdmissionProcess />;
}
