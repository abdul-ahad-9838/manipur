import GenericInfoPage from '@/components/GenericInfoPage';

export const metadata = {
  title: 'Constituent Colleges | Manipur International University',
  description: 'Explore the constituent colleges affiliated with Manipur International University.',
  keywords: 'MIU constituent colleges, affiliated colleges, MIU network, paramedical colleges',
};

export default function ConstituentColleges() {
  const sections = [
    {
      icon: '🏛️',
      title: 'Constituent Colleges',
      content: 'Manipur International University has established a network of constituent colleges to extend quality higher education across the region. These colleges operate under the academic framework and governance of MIU, ensuring consistent standards of excellence.'
    },
    {
      title: 'UGC Guidelines for Constituent Colleges',
      list: [
        'Constituent colleges must maintain academic standards as prescribed by the University Grants Commission',
        'All programs offered must be approved by the parent university and relevant regulatory bodies',
        'Faculty qualifications must meet UGC norms with appropriate student-teacher ratios',
        'Infrastructure and facilities must comply with UGC standards for higher education institutions',
        'Regular academic audits and quality assessments must be conducted',
        'Admission processes must follow UGC guidelines and reservation policies',
        'Financial transparency and proper accounting practices must be maintained',
        'Student welfare measures and grievance redressal mechanisms must be in place'
      ]
    },
    {
      title: 'Our Constituent Colleges',
      content: '<strong>1. JR Institute of Medical Science</strong><br/>A distinguished center of learning dedicated to advancing paramedical sciences. Established in 2022.<br/><em>Offered Courses:</em> B.Sc & Diploma in Medical Laboratory Technology, Radio Imaging Technology, Operation Theatre Technology, B.Sc in Clinical Nutrition, Diabetes Sciences, M.Sc in MLT & MLT (Biochemistry)<br/><br/><strong>2. Tourism, Hospitality and Entrepreneurship Training Institute (THETI)</strong><br/>Premier institute providing top-tier education in Tourism, Hospitality, and Entrepreneurship. Located at Singjamei Bazar, Imphal.<br/><em>Offered Courses:</em> Certificate courses in Food & Beverage Production, Front Office Assistant, Food Services Assistant, Office Assistant<br/><br/><strong>3. Kangla Health Care Institutional Foundation</strong><br/>Leading emerging paramedical training Institute offering state-of-the-art training in various Paramedical sciences.<br/><em>Offered Courses:</em> B.Sc & Diploma in Medical Laboratory Technology, Radio Imaging Technology, Operation Theatre Technology, Optometry<br/><br/><strong>4. Brahma Kumaris (Value Education Wing)</strong><br/>Focuses on value education and spirituality for holistic development.<br/><em>Offered Courses:</em> MSc/BSc in Value Education & Yoga, Counselling Psychology & Spiritual Health, MBA in Self Management & Crisis Management<br/><br/><strong>5. Melodious Educational Housing Academy</strong><br/>Progressive institution in rural setting dedicated to transforming lives through education and innovation.<br/><em>Offered Courses:</em> M.Sc. in Zoology, Botany, M.A. in Political Science, History, Bachelor of Medical Laboratory Technology<br/><br/><strong>6. Hazra International College and Hospital</strong><br/>Unique educational and healing institution promoting naturopathy and yogic science.<br/><em>Offered Courses:</em> Certificate/Diploma/PG Diploma in Yoga, BA/MA/BSc/MSc Yoga, DNYS - Diploma in Naturopathy and Yogic Science<br/><br/><strong>7. Langol View Institute of Nursing and Paramedical Sciences</strong><br/>Established under Langol View Hospital and Research Institute Pvt. Ltd.<br/><em>Offered Courses:</em> Diploma in Medical Laboratory Technology, Operation Theatre Technology, Radiology & Imaging Technology, Dialysis Technology<br/><br/><strong>8. PC Allied Health Institute</strong><br/>Established under Bharat Sevak Samaj, promoted by Sintharol Rural Area Development Organization Society.<br/><em>Offered Courses:</em> B.Sc & Diploma in Medical Laboratory Technology, Radio Imaging Technology, Operation Theatre Technology, Clinical Nutrition, Diabetes Sciences'
    }
  ];

  return (
    <GenericInfoPage
      badge="ACADEMIC NETWORK"
      title="Constituent Colleges"
      subtitle="Expanding Access to Quality Education"
      breadcrumb={[
        { label: 'Student Life', href: '/student-life/sports' },
        { label: 'Constituent Colleges' }
      ]}
      sections={sections}
      contactInfo={{
        title: 'Affiliation Inquiries',
        description: 'For information about constituent colleges or affiliation process, please contact us.',
        email: 'affiliation@miu.edu.in',
        phone: '+91 9319727766'
      }}
    />
  );
}
