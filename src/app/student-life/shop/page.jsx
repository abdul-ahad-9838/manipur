import DynamicPage from "@/components/DynamicPage";
export default function Page() {
  return (
    <DynamicPage
      settingsKey="dp-shop"
      badge="STUDENT LIFE"
      title="Campus Shop"
      subtitle="Everything you need, right on campus."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Student Life" },
        { label: "Shop Details" },
      ]}
      defaultSections={[
        {
          title: "Campus Facilities",
          items: [
            {
              icon: "📚",
              title: "Stationery & Books",
              desc: "Academic books, stationery, and study materials available at subsidized rates.",
            },
            {
              icon: "👕",
              title: "Uniform & Merchandise",
              desc: "Official MIU uniforms, t-shirts, and branded merchandise.",
            },
            {
              icon: "☕",
              title: "Canteen",
              desc: "Hygienic and affordable food and beverages available throughout the day.",
            },
            {
              icon: "🖨️",
              title: "Printing & Photocopying",
              desc: "Printing, photocopying, and binding services for academic needs.",
            },
          ],
        },
        {
          title: "Shop Timings",
          content:
            "Campus shops are open Monday to Saturday from 8:00 AM to 6:00 PM. The canteen operates from 7:00 AM to 8:00 PM on all working days.",
        },
      ]}
    />
  );
}
