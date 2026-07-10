import DynamicPage from "@/components/DynamicPage";
export default function Page() {
  return (
    <DynamicPage
      settingsKey="dp-ugc-performance"
      badge="RECOGNITION"
      title="UGC Performa"
      subtitle="Manipur International University's standing and performance as recognized by the University Grants Commission."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "UGC Performa" },
      ]}
      defaultSections={[
        {
          title: "UGC Recognition",
          content:
            "Manipur International University is recognized by the University Grants Commission (UGC) under Section 2(f) and Section 22 of the UGC Act, 1956. This recognition validates MIU as a legitimate degree-granting institution whose qualifications are recognized across India.",
        },
        {
          title: "Performance Indicators",
          items: [
            {
              icon: "✅",
              title: "Section 2(f) Status",
              desc: "Recognized as a university entitled to receive grants from UGC.",
              uriLink: "/UGC Letter.pdf",
            },
            {
              icon: "✅",
              title: "Section 22 Status",
              desc: "Authorized to award degrees as per UGC Act, 1956.",
            },
            {
              icon: "✅",
              title: "AIU Membership",
              desc: "Member of the Association of Indian Universities (AIU).",
            },
            {
              icon: "✅",
              title: "AICTE Approval",
              desc: "Technical programs approved by All India Council for Technical Education.",
            },
            {
              title: "UGC PROFORMA",
              uriLink: "/ugc/UGC Proforma (MIU).pdf",
            },
            {
              title: "DEED COPY",
              uriLink: "/ugc/Deed Copy.pdf",
            },

            {
              title: "Appendix I",
              uriLink: "/ugc/Appendix I.pdf",
            },
            {
              title: "Appendix II",
              uriLink: "/ugc/Appendix II.pdf",
            },
            {
              title: "Appendix III",
              uriLink: "/ugc/Appendix III.pdf",
            },
            {
              title: "Appendix IV",
              uriLink: "/ugc/Appendix IV.pdf",
            },
            {
              title: "Annexure A",
              uriLink: "/ugc/Annexure A.pdf",
            },

            {
              title: "Appendix V",
              uriLink: "/ugc/Appendix V.pdf",
            },
            {
              title: "Appendix VI",
              uriLink: "/ugc/Appendix VI.pdf",
            },
            {
              title: "Appendix VII",
              uriLink: "/ugc/Appendix VII.pdf",
            },
            {
              title: "Appendix VIII",
              uriLink: "/ugc/Appendix VIII.pdf",
            },
            {
              title: "Appendix IX",
              uriLink: "/ugc/Appendix IX.pdf",
            },
            {
              title: "Appendix X",
              uriLink: "/ugc/Appendix X.pdf",
            },
            {
              title: "Appendix XI",
              uriLink: "/ugc/Appendix XI.pdf",
            },
            {
              title: "Appendix XII",
              uriLink: "/ugc/Appendix XII.pdf",
            },
            {
              title: "Appendix XIII",
              uriLink: "/ugc/Appendix XIII.pdf",
            },
            {
              title: "Appendix XIV",
              uriLink: "/ugc/Appendix XIV.pdf",
            },
            {
              title: "Appendix XV",
              uriLink: "/ugc/Appendix XV.pdf",
            },
            {
              title: "Appendix XVI",
              uriLink: "/ugc/Appendix XVI.pdf",
            },
            {
              title: "Annexure B",
              uriLink: "/ugc/Annexure B.pdf",
            },
            {
              title: "Appendix XVII",
              uriLink: "/ugc/Appendix XVII.pdf",
            },
            {
              title: "Appendix XVIII",
              uriLink: "/ugc/Appendix XVIII.pdf",
            },
          ],
        },
      ]}
    />
  );
}
