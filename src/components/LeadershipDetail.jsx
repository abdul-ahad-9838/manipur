// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import "@/styles/LeadershipMessages.css";
// import { defaultLeadership } from "./LeadershipMessages";

// const LEADERS_DATA = defaultLeadership.map((leader, i) => ({
//   ...leader,
//   slug: [
//     "chancellor",
//     "vice-chancellor",
//     "pro-vice-chancellor",
//     "registrar",
//     "director-admissions",
//     "controller-of-examinations",
//   ][i],
//   active: true,
// }));

// export default function LeadershipDetail({ slug }) {
//   const [leader, setLeader] = useState(null);

//   useEffect(() => {
//     const defaultLeader = LEADERS_DATA.find((l) => l.slug === slug);
//     if (defaultLeader) setLeader(defaultLeader);
//   }, [slug]);

//   if (!leader)
//     return (
//       <div style={{ padding: "160px 20px", textAlign: "center" }}>
//         <p>Loading...</p>
//       </div>
//     );

//   // Show "Coming Soon" if leader is inactive
//   if (!leader.active) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "linear-gradient(135deg, #111 0%, #1a1a2e 100%)",
//         }}
//       >
//         <h1
//           style={{
//             color: "var(--lpu-orange)",
//             fontSize: "clamp(3rem, 8vw, 6rem)",
//             fontWeight: "900",
//             fontFamily: "var(--font-heading)",
//             textTransform: "uppercase",
//             letterSpacing: "4px",
//             textAlign: "center",
//             padding: "20px",
//           }}
//         >
//           Coming Soon
//         </h1>
//       </div>
//     );
//   }

//   return (
// <div>
//   {/* Content */}
//   <section
//     style={{
//       padding: "clamp(50px, 8vw, 90px) 20px",
//       background: "#f8f9fa",
//     }}
//   >
//     <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//       <div
//         className="leadership-card"
//         style={{
//           background: "white",
//           borderRadius: "16px",
//           overflow: "hidden",
//           boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
//           display: "flex",
//           flexWrap: "wrap",
//         }}
//       >
//         {/* Image side */}
//         {leader.image && (
//           <div
//             style={{
//               flex: "0 0 320px",
//               minWidth: "260px",
//               background: "linear-gradient(135deg, #111 0%, #1a1a2e 100%)",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "50px 30px",
//               gap: "20px",
//             }}
//           >
//             <img
//               src={leader.image}
//               alt={leader.name}
//               style={{
//                 width: "200px",
//                 height: "200px",
//                 objectFit: "cover",
//                 borderRadius: "50%",
//                 border: "4px solid var(--lpu-orange)",
//               }}
//               onError={(e) => (e.target.style.display = "none")}
//             />
//             <div style={{ textAlign: "center" }}>
//               {leader.name && (
//                 <p
//                   style={{
//                     color: "var(--lpu-orange)",
//                     fontFamily: "var(--font-heading)",
//                     fontWeight: "700",
//                     fontSize: "1.1rem",
//                     textTransform: "uppercase",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   {leader.name}
//                 </p>
//               )}
//               <p
//                 style={{
//                   color: "#aaa",
//                   fontFamily: "var(--font-body)",
//                   fontSize: "0.9rem",
//                   fontWeight: 400,
//                   textTransform: "none",
//                 }}
//               >
//                 {leader.role}
//               </p>
//               <p
//                 style={{
//                   color: "#666",
//                   fontFamily: "var(--font-body)",
//                   fontSize: "0.8rem",
//                   fontWeight: 400,
//                   textTransform: "none",
//                   marginTop: "4px",
//                 }}
//               >
//                 Manipur International University
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Message side */}
//         <div
//           style={{
//             flex: 1,
//             minWidth: "280px",
//             padding: "clamp(30px, 5vw, 60px)",
//           }}
//         >
//           <span
//             style={{
//               display: "inline-block",
//               background: "var(--lpu-orange)",
//               color: "white",
//               padding: "4px 14px",
//               borderRadius: "4px",
//               fontSize: "0.78rem",
//               fontWeight: "700",
//               letterSpacing: "1px",
//               textTransform: "uppercase",
//               marginBottom: "24px",
//             }}
//           >
//             {leader.role}
//           </span>
//           <h2
//             style={{
//               fontFamily: "var(--font-heading)",
//               fontSize: "clamp(1.4rem, 3vw, 2rem)",
//               fontWeight: "900",
//               color: "#111",
//               marginBottom: "24px",
//               textTransform: "uppercase",
//             }}
//           >
//             {leader.title}
//           </h2>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "16px",
//             }}
//           >
//             {(leader.message || []).map((para, i) => (
//               <p
//                 key={i}
//                 style={{
//                   fontFamily: "var(--font-body)",
//                   fontSize: "1rem",
//                   color: "#444",
//                   lineHeight: 1.8,
//                   fontWeight: 400,
//                   textTransform: "none",
//                   textAlign: "justify",
//                 }}
//               >
//                 {para}
//               </p>
//             ))}
//           </div>
//           <div
//             style={{
//               marginTop: "40px",
//               paddingTop: "24px",
//               borderTop: "2px solid var(--lpu-orange)",
//             }}
//           >
//             <p
//               style={{
//                 fontFamily: "var(--font-heading)",
//                 fontWeight: "700",
//                 fontSize: "1.1rem",
//                 color: "#111",
//                 textTransform: "uppercase",
//               }}
//             >
//               {leader.signature?.name}
//             </p>
//             <p
//               style={{
//                 fontFamily: "var(--font-body)",
//                 fontSize: "0.9rem",
//                 color: "#666",
//                 fontWeight: 400,
//                 textTransform: "none",
//                 marginTop: "4px",
//               }}
//             >
//               {leader.signature?.role}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Other leaders */}
//       <div style={{ marginTop: "50px" }}>
//         <h3
//           style={{
//             fontFamily: "var(--font-heading)",
//             fontSize: "1.2rem",
//             fontWeight: "700",
//             color: "#111",
//             textTransform: "uppercase",
//             marginBottom: "20px",
//             textAlign: "center",
//           }}
//         >
//           Other Leadership Messages
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "14px",
//             justifyContent: "center",
//           }}
//         >
//           {LEADERS_DATA.filter((l) => l.slug !== slug).map((l) => (
//             <Link
//               key={l.slug}
//               href={`/about/leadership/${l.slug}`}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "12px",
//                 background: "white",
//                 padding: "14px 20px",
//                 borderRadius: "10px",
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
//                 textDecoration: "none",
//                 border: "2px solid transparent",
//                 transition: "0.2s",
//                 minWidth: "200px",
//               }}
//             >
//               <img
//                 src={l.image || null}
//                 alt={l.name}
//                 style={{
//                   width: "44px",
//                   height: "44px",
//                   borderRadius: "50%",
//                   objectFit: "cover",
//                   border: "2px solid var(--lpu-orange)",
//                 }}
//                 onError={(e) => (e.target.style.display = "none")}
//               />
//               <div>
//                 <p
//                   style={{
//                     fontFamily: "var(--font-heading)",
//                     fontWeight: "700",
//                     fontSize: "0.85rem",
//                     color: "#111",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   {l.role}
//                 </p>
//                 <p
//                   style={{
//                     fontFamily: "var(--font-body)",
//                     fontSize: "0.78rem",
//                     color: "#888",
//                     fontWeight: 400,
//                     textTransform: "none",
//                   }}
//                 >
//                   Read message →
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   </section>
// </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/LeadershipMessages.css";
import { defaultLeadership } from "./LeadershipMessages";
import API from "@/lib/api";

const LEADERS_DATA = defaultLeadership.map((leader, i) => ({
  ...leader,
  slug: [
    "chancellor",
    "vice-chancellor",
    "pro-vice-chancellor",
    "registrar",
    "director-admissions",
    "controller-of-examinations",
  ][i],
  active: true,
}));

export default function LeadershipDetail({ slug }) {
  const [leader, setLeader] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeader = async () => {
      try {
        setLoading(true);

        const res = await API(`/about/${slug}`);

        console.log(res);

        if (!res.status === 200) {
          throw new Error("Failed to fetch leader");
        }

        setLeader(res.data);
      } catch (error) {
        console.error("Error fetching leader:", error);

        // fallback to local data
        const defaultLeader = LEADERS_DATA.find((l) => l.slug === slug);
        setLeader(defaultLeader || null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchLeader();
    }
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: "160px 20px", textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!leader) {
    return (
      <div style={{ padding: "160px 20px", textAlign: "center" }}>
        <p>No data found</p>
      </div>
    );
  }

  // Show "Coming Soon" if leader is inactive
  if (!leader.active) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #111 0%, #1a1a2e 100%)",
        }}
      >
        <h1
          style={{
            color: "var(--lpu-orange)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: "900",
            fontFamily: "var(--font-heading)",
            textTransform: "uppercase",
            letterSpacing: "4px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          Coming Soon
        </h1>
      </div>
    );
  }

  return (
    <div>
      {/* Content */}
      <section
        style={{
          padding: "clamp(50px, 8vw, 90px) 20px",
          background: "#f8f9fa",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            // className="leadership-card"
            style={{
              background: "white",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {/* Image side */}
            {leader.image && (
              <div
                style={{
                  flex: "0 0 320px",
                  minWidth: "260px",
                  background: "linear-gradient(135deg, #111 0%, #1a1a2e 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "50px 30px",
                  gap: "20px",
                }}
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "4px solid var(--lpu-orange)",
                  }}
                  onError={(e) => (e.target.style.display = "none")}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {console.log(leader)}
                  {leader.name && (
                    <p
                      style={{
                        color: "var(--lpu-orange)",
                        fontFamily: "var(--font-heading)",
                        fontWeight: "700",
                        fontSize: "1.1rem",
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      {leader.signature.name}
                    </p>
                  )}
                  <p
                    style={{
                      color: "#aaa",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      fontWeight: 400,
                      textTransform: "none",
                    }}
                  >
                    {leader.role}
                  </p>
                  <p
                    style={{
                      color: "#666",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      fontWeight: 400,
                      textTransform: "none",
                      marginTop: "4px",
                    }}
                  >
                    Manipur International University
                  </p>
                </div>
              </div>
            )}

            {/* Message side */}
            <div
              style={{
                flex: 1,
                minWidth: "280px",
                padding: "clamp(0px, 1vw, 60px)",
              }}
            >
              {!leader.image && (
                <span
                  style={{
                    display: "inline-block",
                    background: "var(--lpu-orange)",
                    color: "white",
                    padding: "4px 14px",
                    borderRadius: "4px",
                    fontSize: "0.78rem",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: "24px",
                  }}
                >
                  {leader.role}
                </span>
              )}
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: "900",
                  color: "#111",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                }}
              >
                {leader.title}
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  // borderTop: "2px solid var(--lpu-orange)",
                }}
              >
                {(leader.message || []).map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1rem",
                      color: "#444",
                      lineHeight: 1.8,
                      fontWeight: 400,
                      textTransform: "none",
                      textAlign: "justify",
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
              {/* <div
                style={{
                  marginTop: "40px",
                  paddingTop: "24px",
                  borderTop: "2px solid var(--lpu-orange)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: "700",
                    fontSize: "1.1rem",
                    color: "#111",
                    textTransform: "uppercase",
                  }}
                >
                  {leader.signature?.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: "#666",
                    fontWeight: 400,
                    textTransform: "none",
                    marginTop: "4px",
                  }}
                >
                  {leader.signature?.role}
                </p>
              </div> */}
            </div>
          </div>

          {/* Other leaders */}
          <div style={{ marginTop: "50px" }}>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "#111",
                textTransform: "uppercase",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Other Leadership Messages
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                justifyContent: "center",
              }}
            >
              {LEADERS_DATA.filter((l) => l.slug !== slug).map((l) => (
                <Link
                  key={l.slug}
                  href={`/about/leadership/${l.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "white",
                    padding: "14px 20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                    textDecoration: "none",
                    border: "2px solid transparent",
                    transition: "0.2s",
                    minWidth: "200px",
                  }}
                >
                  <img
                    src={l.image || null}
                    alt={l.name}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid var(--lpu-orange)",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: "700",
                        fontSize: "0.85rem",
                        color: "#111",
                        textTransform: "uppercase",
                      }}
                    >
                      {l.role}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        color: "#888",
                        fontWeight: 400,
                        textTransform: "none",
                      }}
                    >
                      Read message →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
