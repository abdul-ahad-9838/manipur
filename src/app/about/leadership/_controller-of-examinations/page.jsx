import LeadershipDetail from '@/components/LeadershipDetail';

export const metadata = {
  title: "Controller of Examinations' Message | Manipur International University",
  description: "Message from the Controller of Examinations of Manipur International University.",
  alternates: {
    canonical: 'https://miu.co.in/about/leadership/controller-of-examinations',
  },
};

export default function Page() {
  return <LeadershipDetail slug="controller-of-examinations" />;
}
