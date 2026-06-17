import DynamicPage from "@/components/DynamicPage";

export default function MiunestPage() {
  return (
    <DynamicPage
      settingsKey="dp-miunest"
      badge="STUDENT PORTAL"
      title="MIUNEST"
      subtitle="Your one-stop student portal for admissions, academics, results, and campus services at Manipur International University."
      breadcrumb={[{ label: "Home", href: "/" }, { label: "MIUNEST" }]}
      defaultSections={[
        {
          title: "What is MIUNEST?",
          content:
            "MIUNEST is the official student and applicant portal of Manipur International University. It provides seamless access to admission applications, fee payments, academic records, examination schedules, and campus announcements — all in one place.",
        },
        {
          title: "Portal Features",
          items: [
            {
              icon: "🎓",
              title: "Online Admissions",
              desc: "Apply for undergraduate, postgraduate, and diploma programs directly through the portal.",
            },
            {
              icon: "📋",
              title: "Application Tracking",
              desc: "Track the status of your admission application in real time.",
            },
            {
              icon: "💳",
              title: "Fee Payment",
              desc: "Pay tuition fees, hostel fees, and other charges securely online.",
            },
            {
              icon: "📊",
              title: "Academic Records",
              desc: "Access your marks, attendance, and academic progress reports.",
            },
            {
              icon: "📅",
              title: "Exam Schedule",
              desc: "View upcoming examination timetables and hall ticket downloads.",
            },
            {
              icon: "📢",
              title: "Notices & Announcements",
              desc: "Stay updated with the latest university circulars and notifications.",
            },
          ],
        },
        {
          title: "How to Access MIUNEST",
          items: [
            {
              icon: "1️⃣",
              title: "Register",
              desc: "Create your account using your registered mobile number or email.",
            },
            {
              icon: "2️⃣",
              title: "Login",
              desc: "Use your credentials to log in to the portal.",
            },
            {
              icon: "3️⃣",
              title: "Explore",
              desc: "Access all services from your personalised dashboard.",
            },
          ],
        },
        {
          title: "Support",
          content:
            "For technical support or login issues, contact the IT Help Desk at support@miu.edu.in or call +91 9319727766 during office hours (Mon–Sat, 9 AM – 5 PM).",
        },
      ]}
    />
  );
}
