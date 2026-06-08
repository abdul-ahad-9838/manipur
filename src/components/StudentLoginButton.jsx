import "@/styles/StudentLoginButton.css"; // Import the CSS file for styling

const StudentLoginButton = () => {
  return (
    <div className="student-login-wrapper">
      <a
        href="https://student.miu.edu.in/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="student-login-button">Student Login</button>
      </a>
    </div>
  );
};

export default StudentLoginButton;
