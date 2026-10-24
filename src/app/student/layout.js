import Sidebar from "@/components/student/Sidebar";
import "@/styles/StudentLayout.css";

export default function StudentLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        background: "#f4f4f4",
      }}
      className="student-layout"
    >
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Content */}
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
