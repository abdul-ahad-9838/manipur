import Link from "next/link";
import React from "react";
import "@/styles/StudentLoginButton.css"; // Import the CSS file for styling

const StudentLoginButton = () => {
  return (
    <div className="student-login-wrapper">
      <Link href="/student-login">
        <button className="student-login-button">Student Login</button>
      </Link>
    </div>
  );
};

export default StudentLoginButton;
