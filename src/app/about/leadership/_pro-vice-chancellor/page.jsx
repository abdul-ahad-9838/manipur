import LeadershipDetail from '@/components/LeadershipDetail';

export const metadata = {
  title: "Pro Vice Chancellor's Message | Manipur International University",
  description: "Message from the Pro Vice Chancellor of Manipur International University.",
  alternates: {
    canonical: 'https://miu.edu.in/about/leadership/pro-vice-chancellor',
  },
};

export default function Page() {
  return <LeadershipDetail slug="pro-vice-chancellor" />;
}
