import "@/styles/CTA.css";

export default function CTA() {
  return (
    <div className="cta-container">
      <div className="cta-card">
        <div className="cta-glow">
          <div className="cta-glow-gradient"></div>
        </div>

        <div className="cta-content">
          <div className="cta-text">
            <h2>Shape Your Future at Manipur International University</h2>

            <p>
              Start your journey with a university committed to academic
              excellence, innovation, and global opportunities. At Manipur
              International University, you will gain industry-relevant
              knowledge, experienced faculty and develop skills to thrive in a
              rapidly changing world.
            </p>
          </div>

          <a
            href="https://admission.miu.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            type="button"
          >
            <span className="cta-button-text">Apply Now</span>

            <span className="cta-button-icon">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
