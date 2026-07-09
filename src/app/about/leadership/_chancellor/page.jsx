import LeadershipDetail from '@/components/LeadershipDetail';

export const metadata = {
  title: "Chancellor's Message | Manipur International University",
  description: "Message from the Chancellor of Manipur International University.",
  alternates: {
    canonical: 'https://miu.edu.in/about/leadership/chancellor',
  },
};

export default function Page() {
  return <LeadershipDetail slug="chancellor" />;
}
