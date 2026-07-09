import LeadershipDetail from '@/components/LeadershipDetail';

export const metadata = {
  title: "Director of Admissions' Message | Manipur International University",
  description: "Message from the Director of Admissions of Manipur International University.",
  alternates: {
    canonical: 'https://miu.edu.in/about/leadership/director-admissions',
  },
};

export default function Page() {
  return <LeadershipDetail slug="director-admissions" />;
}
