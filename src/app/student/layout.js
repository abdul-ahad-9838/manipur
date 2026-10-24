import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Sidebar from "@/components/student/Sidebar";
import "@/styles/StudentLayout.css";

export default async function StudentLayout({ children }) {
  const cookieStore = await cookies();
  const studentAuth = cookieStore.get("student_auth");

  if (!studentAuth?.value) {
    redirect("/student-login");
  }

  return (
    <div
      style={{
        display: "flex",
        background: "#f4f4f4",
      }}
      className="student-layout"
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: "30px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
