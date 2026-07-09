import LeadershipDetail from '@/components/LeadershipDetail';

export const metadata = {
  title: "Registrar's Message | Manipur International University",
  description: "Message from the Registrar of Manipur International University.",
  alternates: {
    canonical: 'https://miu.edu.in/about/leadership/registrar',
  },
};

export default function Page() {
  return <LeadershipDetail slug="registrar" />;
}
