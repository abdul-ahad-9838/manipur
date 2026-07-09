import GenericInfoPage from "@/components/GenericInfoPage";

export const metadata = {
  title: "CPIO | Manipur International University",
  description:
    "Central Public Information Officer and First Appellate Authority under Right to Information Act, 2005.",
  keywords:
    "MIU CPIO, RTI, right to information, public information officer, transparency",
};

export default function CPIO() {
  const sections = [
    {
      icon: "📄",
      title:
        "Central Public Information Officer (CPIO) & First Appellate Authority (AA)",
      content:
        "Manipur International University, Imphal - Under Right to Information Act, 2005",
    },
    {
      title: "Central Public Information Officer (CPIO)",
      content:
        "<strong>Name:</strong> Dr. Shelly Sanasam<br/><strong>Designation:</strong> Private Secretary to the Registrar<br/><br/><strong>Responsibility:</strong> Assigned to look after all matters seeking information under the Right to Information Act, 2005, in addition to existing normal duties.",
    },
    {
      title: "First Appellate Authority (AA)",
      content:
        "<strong>Name:</strong> Prof. Potsangbam Kumar Singh<br/><strong>Designation:</strong> Pro-Vice Chancellor<br/><br/><strong>Responsibility:</strong> Designated to handle appeals and review petitions related to information requests addressed to Manipur International University, Imphal, in accordance with prevailing institutional guidelines.",
    },
    {
      title: "Contact Information",
      cards: [
        {
          icon: "📧",
          title: "Registrar Office",
          content: "Email: registrar@miu.edu.in",
        },
        {
          icon: "📞",
          title: "Pro-Vice Chancellor Office",
          content: "Email: provc@miu.edu.in",
        },
        {
          icon: "📍",
          title: "Postal Address",
          content:
            "Central Public Information Officer (CPIO)<br/>Manipur International University<br/>Airport Road, Ghari, Imphal<br/>Imphal West, Manipur – 795140",
        },
      ],
    },
    {
      title: "RTI Application – Required Documents & Fee",
      content:
        "<strong>Required Documents:</strong><br/>• A clearly written or typed request<br/>• Applicant's name and contact details<br/>• Specific information sought<br/>• Addressed to the concerned Public Information Officer (PIO)<br/>• Application may be written in English, Hindi or official language<br/><br/><strong>Application Fee: ₹10</strong><br/>Payable in favour of Manipur International University, Imphal via:<br/>• Demand Draft<br/>• Indian Postal Order<br/>• Banker's Cheque",
    },
    {
      title: "Declaration under the Right to Information (RTI) Act",
      content:
        "The Right to Information Act intends to set out the practical regime of the Right to Information for citizens to enable them to access the information under the control of public authority in order to promote transparency and accountability in the working of such authority.<br/><br/>Information placed in the public domain through the Manipur International University website is intended to facilitate easy access for citizens. Citizens may access such information through electronic mode, thereby avoiding inconvenience, to the extent possible, of submitting formal RTI applications.<br/><br/>While compiling the information, due care has been exercised to ensure correctness and authenticity. However, if any inadvertent error has crept in, the same is subject to correction without prior notice.",
    },
  ];

  return (
    <GenericInfoPage
      badge="TRANSPARENCY"
      title="CPIO"
      subtitle="Right to Information Act, 2005"
      breadcrumb={[
        { label: "Student Life", href: "/student-life/sports" },
        { label: "CPIO" },
      ]}
      sections={sections}
      contactInfo={{
        title: "RTI Inquiries",
        description:
          "For information requests under the Right to Information Act, 2005.",
        email: "registrar@miu.edu.in",
        phone: "",
      }}
    />
  );
}
