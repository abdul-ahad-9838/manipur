import GenericInfoPage from '@/components/GenericInfoPage';

export const metadata = {
  title: 'Incubation Center | Manipur International University',
  description: 'MIU Incubation Centre empowers innovation and entrepreneurship with mentorship, funding, and resources.',
  keywords: 'MIU incubation center, startup support, entrepreneurship, student startups, business incubation',
};

export default function IncubationCenter() {
  const sections = [
    {
      icon: '🚀',
      title: 'About Incubation Centre',
      content: 'The Incubation Centre at Manipur International University is a dynamic innovation ecosystem designed to nurture entrepreneurial ideas and transform them into successful startups. It provides students, faculty, and aspiring entrepreneurs with the right environment, mentorship, and resources to build sustainable ventures.<br/><br/><strong>100+ Ideas Mentored & Supported</strong>'
    },
    {
      title: 'Our Focus Areas',
      cards: [
        {
          icon: '💡',
          title: 'Startup Ideation & Innovation',
          content: 'We support early-stage ideas by providing structured guidance, validation frameworks, and innovation mentoring to convert concepts into viable startup models'
        },
        {
          icon: '👥',
          title: 'Mentorship & Industry Support',
          content: 'Startups receive mentorship from industry leaders, academic experts, and investors to strengthen business strategy, technology adoption, and market readiness'
        },
        {
          icon: '💰',
          title: 'Funding, Growth & Scalability',
          content: 'We assist incubated startups with funding opportunities, investor connections, and scaling strategies to help them grow into sustainable and impactful enterprises'
        }
      ]
    },
    {
      title: 'Why Partner With Us?',
      list: [
        'Innovation Ecosystem - Access a vibrant startup ecosystem supported by academic excellence, research facilities, and innovation-driven culture',
        'Mentorship & Funding Access - Gain guidance from industry experts and support for funding, grants, and investor connections',
        'Skill & Technology Support - Leverage technical expertise, research labs, and skill development programs to strengthen your startup',
        'Market & Growth Enablement - Support for market validation, business scaling, industry partnerships, and long-term sustainability'
      ]
    },
    {
      title: 'Our Incubation Programs & Support',
      content: '<strong>Startup Bootcamps & Workshops:</strong> Hands-on bootcamps and workshops designed to help students and entrepreneurs transform ideas into scalable startup ventures<br/><br/><strong>Mentorship Programs:</strong> One-on-one and group mentorship sessions with experienced entrepreneurs, industry experts, and academic leaders<br/><br/><strong>Pitch Competitions & Innovation Challenges:</strong> Platforms for startups to pitch ideas, validate business models, and gain exposure through innovation challenges and competitions<br/><br/><strong>Industry Connect Sessions:</strong> Interactive sessions with industry leaders to build networks, explore collaborations, and understand real-world market needs'
    },
    {
      title: 'Sponsorship Packages',
      content: '<strong>Platinum Sponsor (₹5,00,000+ / year):</strong> Title sponsorship with maximum visibility, dedicated incubation space naming rights, executive mentorship opportunities, and board advisory position<br/><br/><strong>Gold Sponsor (₹2,50,000 / year):</strong> Strong engagement & branding opportunities, event co-sponsorship, workshop naming rights, and recruitment fair participation<br/><br/><strong>Silver Sponsor (₹1,00,000 / year):</strong> Ideal for workshops & student engagement, logo on marketing materials, guest lecture opportunities, and student internship program'
    }
  ];

  return (
    <GenericInfoPage
      badge="ENTREPRENEURSHIP"
      title="Incubation Center"
      subtitle="Empowering Innovation • Fostering Entrepreneurship • Building Tomorrow"
      breadcrumb={[
        { label: 'Student Life', href: '/student-life/sports' },
        { label: 'Incubation Center' }
      ]}
      sections={sections}
      contactInfo={{
        title: 'Ready to Partner With Us?',
        description: 'Join us in building the entrepreneurial ecosystem of Northeast India. Together, we can create lasting impact and foster innovation.',
        email: 'incubation@miu.edu.in',
        phone: '+91 9319727766'
      }}
    />
  );
}
