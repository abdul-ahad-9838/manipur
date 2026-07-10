import React from 'react';

export const metadata = {
  title: 'Credit Transfer Policy | Manipur International University',
  description: 'Credit Transfer Policy of Manipur International University in alignment with NEP 2020 and UGC regulations.',
  alternates: {
    canonical: 'https://miu.edu.in/credit-transfer-policy',
  },
};

export default function CreditTransferPolicy() {
  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: 'clamp(100px,15vw,160px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Header */}
        <div style={{ background: 'var(--lpu-black)', borderRadius: '16px', padding: '40px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ background: 'var(--lpu-orange)', color: 'var(--lpu-black)', fontSize: '0.72rem', fontWeight: '900', padding: '5px 14px', borderRadius: '4px', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '16px' }}>ACADEMIC POLICY</span>
          <h1 style={{ color: 'white', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: '900', marginBottom: '12px' }}>Credit Transfer Policy</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none' }}>Manipur International University · In alignment with NEP 2020 &amp; UGC Regulations 2021</p>
        </div>

        {/* Sections */}
        {[
          {
            title: '1. Preliminary',
            content: `To enhance flexibility within the curriculum framework and promote interdisciplinary and multidisciplinary academic mobility among students across Higher Education Institutions (HEIs) in India and Abroad, a structured Credit Transfer mechanism has been introduced in alignment with the National Education Policy (NEP) 2020.

In this regard, the University Grants Commission (UGC) has notified the regulations titled UGC (Establishment and Operationalization of Academic Bank of Credits Scheme in Higher Education) Regulations, 2021.

With a commitment to strengthening academic excellence and enabling seamless student mobility, MIU endeavors to adopt and implement an effective credit transfer system as per the guidelines, thereby upholding the highest standards of education.`,
          },
          {
            title: '2. Guidelines',
            content: `The University endorses the guidelines of Credit Transfer, ensures proper recognition of credits earned by students and enables their mapping through course-to-course equivalence.

Accordingly, MIU shall establish a well-defined mechanism to review, evaluate, and approve credit transfer requests in accordance with the guidelines and regulations prescribed by the relevant statutory authorities.`,
          },
          {
            title: '3. Objective',
            content: `This policy aims to establish a clear framework and procedure for the recognition of prior learning acquired by students from UGC-recognized Higher Education Institutions (HEIs). It applies to courses and subjects that are determined to be equivalent in terms of learning objectives, learning outcomes, and course content.`,
          },
          {
            title: '4. Scope',
            items: [
              'Students applying via credit transfer or lateral entry',
              'Programs under CBCS or equivalent',
              'Credits from UGC recognized HEIs in India or abroad',
            ],
          },
          {
            title: '5. Definitions',
            items: [
              'Credit Transfer: Recognition of credits earned at another HEI',
              'Equivalence: Matching of course content and outcomes',
              'HEIs: UGC-recognized institutions',
            ],
          },
          {
            title: '6. Eligibility Criteria',
            items: [
              'Institution must be UGC-recognized',
              'Credits must be verifiable',
              'Within valid academic duration',
            ],
          },
          {
            title: '7. Credit Transfer Limits',
            content: 'Up to 50% of total program credits may be transferred, subject to approval.',
          },
          {
            title: '8. Process for Credit Transfer',
            items: [
              'Submit application with transcripts and syllabus',
              'Department evaluates equivalence',
              'Approval by Academic Authority',
              'Credits recorded',
            ],
          },
          {
            title: '9. Evaluation Criteria',
            items: [
              'Alignment of learning outcomes',
              'Comparable credit value',
              'Compliance with MIU standards',
            ],
          },
          {
            title: '10. Rejection Conditions',
            items: [
              'Institution not recognized',
              'Incomplete documents',
              'Credits outside valid duration',
            ],
          },
          {
            title: '11. Fee Structure',
            content: 'Processing fees may apply as notified by the University.',
          },
          {
            title: '12. General Guidelines',
            content: 'Credit transfer is subject to approval. Decisions are final and binding.',
          },
          {
            title: '13. Amendments',
            content: 'Policy may be updated as per UGC and institutional requirements.',
          },
          {
            title: '14. Abbreviations',
            items: [
              'UGC – University Grants Commission',
              'HEIs – Higher Educational Institutions',
              'CBCS – Choice Based Credit System',
              'IQAC – Internal Quality Assessment Cell',
            ],
          },
        ].map((sec, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '28px 32px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderLeft: '4px solid var(--lpu-orange)' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--lpu-black)', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>{sec.title}</h2>
            {sec.content && (
              <div style={{ color: '#555', fontSize: '0.92rem', lineHeight: 1.8, fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none', whiteSpace: 'pre-line', textAlign: 'justify' }}>
                {sec.content}
              </div>
            )}
            {sec.items && (
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {sec.items.map((item, j) => (
                  <li key={j} style={{ display: 'flex', gap: '10px', color: '#555', fontSize: '0.92rem', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none', lineHeight: 1.6, textAlign: 'justify' }}>
                    <span style={{ color: 'var(--lpu-orange)', fontWeight: '900', flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Process Flowchart */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '28px 32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderLeft: '4px solid var(--lpu-orange)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--lpu-black)', marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>15. Credit Transfer Process Flowchart</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', alignItems: 'flex-start' }}>
            {['Application Submission', 'Document Verification', 'Department Evaluation', 'Academic Approval'].map((step, i, arr) => (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--lpu-black)', color: 'var(--lpu-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1rem', flexShrink: 0, fontFamily: 'var(--font-heading)' }}>{i + 1}</div>
                  <div style={{ background: '#f8f9fa', border: '1.5px solid #eee', borderRadius: '10px', padding: '12px 20px', fontWeight: '700', fontSize: '0.92rem', color: 'var(--lpu-black)', fontFamily: 'var(--font-heading)' }}>{step}</div>
                </div>
                <div style={{ marginLeft: '21px', width: '2px', height: '24px', background: 'var(--lpu-orange)', opacity: 0.5 }} />
              </React.Fragment>
            ))}
            {/* Final step with link */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--lpu-black)', color: 'var(--lpu-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1rem', flexShrink: 0, fontFamily: 'var(--font-heading)' }}>5</div>
              <a 
                href="https://miu.co.in/student/login" 
                target="_blank" 
                rel="noopener noreferrer"
                className="verify-details-link"
                style={{ background: 'var(--lpu-orange)', border: '1.5px solid var(--lpu-orange)', borderRadius: '10px', padding: '12px 20px', fontWeight: '700', fontSize: '0.92rem', color: 'white', fontFamily: 'var(--font-heading)', textDecoration: 'none', transition: '0.3s', display: 'inline-block' }}
              >
                Click Here to Verify Details
              </a>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            .verify-details-link:hover {
              background: var(--lpu-black) !important;
              border-color: var(--lpu-black) !important;
            }
          `}} />
        </div>

        <p style={{ textAlign: 'center', color: '#aaa', fontSize: '0.8rem', marginTop: '32px', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none' }}>
          © {new Date().getFullYear()} Manipur International University. All Rights Reserved.
        </p>

      </div>
    </div>
  );
}
