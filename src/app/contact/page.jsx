import ContactUsPage from "@/components/ContactUsPage";

export const metadata = {
  title: "Contact MIU | Manipur International University, Imphal",
  description:
    "Contact Manipur International University — address, admissions phone, email, campus map and office hours.",
  alternates: { canonical: "https://miu.co.in/contact" },
  openGraph: {
    title: "Contact MIU | Manipur International University",
    description:
      "Get in touch with MIU Imphal. Phone, email, WhatsApp and visit us.",
    url: "https://miu.co.in/contact",
  },
};

export default function ContactPage() {
  return <ContactUsPage />;
}
