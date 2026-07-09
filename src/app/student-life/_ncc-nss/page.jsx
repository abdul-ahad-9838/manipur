import NCCNSSPage from '@/components/NCCNSSPage';
import { createMetadata } from '@/lib/metadata';
export const metadata = createMetadata({ title: 'NCC/NSS', description: 'NCC and NSS activities at Manipur International University. Join national service and cadet programs at MIU.', path: '/student-life/ncc-nss' });

export default function Page() {
  return <NCCNSSPage />;
}
