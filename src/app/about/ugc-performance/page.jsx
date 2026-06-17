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
            },
            {
              icon: "🎓",
              title: "Section 22 Status",
              desc: "Authorized to award degrees as per UGC Act, 1956.",
            },
            {
              icon: "🌐",
              title: "AIU Membership",
              desc: "Member of the Association of Indian Universities (AIU).",
            },
            {
              icon: "🏆",
              title: "AICTE Approval",
              desc: "Technical programs approved by All India Council for Technical Education.",
            },
          ],
        },
      ]}
    />
  );
}
