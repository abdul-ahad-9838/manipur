import "@/styles/StudentLoginButton.css";

const StudentLoginButton = () => {
  return (
    <div className="floating-buttons-wrapper">
      {/* Student Login */}
      <div className="student-login-wrapper">
        <a
          href="https://student.miu.edu.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="student-login-button">
            Student Login
          </button>
        </a>
      </div>
      {/* Apply Now */}
      <div className="apply-now-wrapper">
        <a
          href="https://admission.miu.edu.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="apply-now-button">
            Apply <span style={{ fontSize: "10px", fontWeight: "bold" }}>
                (UG/PG)
              </span>
          </button>
        </a>
      </div>

    </div>
  );
};

export default StudentLoginButton;
