import AdmissionProcess from '@/components/AdmissionProcess';

export const metadata = {
  title: 'Admission Process | Manipur International University',
  description: 'Step-by-step guide to the admission process at MIU. Simple, transparent, and student-friendly.',
  alternates: {
    canonical: 'https://miu.co.in/admissions/process',
  },
};

export default function Page() {
  return <AdmissionProcess />;
}
