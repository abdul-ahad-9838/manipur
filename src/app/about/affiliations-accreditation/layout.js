import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata({
  title: "Affiliations & Accreditation",
  description:
    "MIU is recognized by UGC, AICTE, AIU and other national bodies. View all affiliations and accreditations of Manipur International University.",
  path: "/about/affiliations-accreditation",
});
export default function Layout({ children }) {
  return children;
}
