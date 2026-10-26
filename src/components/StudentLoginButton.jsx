import "@/styles/StudentLoginButton.css";
import Link from "next/link";

const StudentLoginButton = () => {
  return (
    <div className="floating-buttons-wrapper">
      {/* Student Login */}
      <div className="student-login-wrapper">
        <Link
          href="/student-login"
        // target="_blank"
        // rel="noopener noreferrer"
        >
          <button className="student-login-button">
            Student Login
          </button>
        </Link>
      </div>
      {/* Apply Now */}
      <div className="apply-now-wrapper">
        <a
          href="#"
        // target="_blank"
        // rel="noopener noreferrer"
        >
          <button className="apply-now-button">
            Apply for PhD
          </button>
        </a>
      </div>

    </div>
  );
};

export default StudentLoginButton;
