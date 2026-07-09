import LeadershipDetail from "@/components/LeadershipDetail";

export const metadata = {
  title: "Vice-Chancellor | Manipur International University (MIU)",
  description:
    "Message from the Vice-Chancellor of Manipur International University, Imphal. Our academic vision and student commitment.",
  alternates: {
    canonical: "https://miu.edu.in/about/leadership/vice-chancellor",
  },
};

export default function Page() {
  return <LeadershipDetail slug="vice-chancellor" />;
}
