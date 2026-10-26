"use client";

import "@/styles/MobileBottomNav.css";
import Link from "next/link";

// const QUALIFICATIONS = [
//   "10th Pass",
//   "12th Pass",
//   "Diploma",
//   "Graduate",
//   "Post Graduate",
//   "Other",
// ];

const MobileBottomNav = () => {
  // const [open, setOpen] = useState(false);
  // const [form, setForm] = useState({
  //   name: "",
  //   phone: "",
  //   email: "",
  //   qualification: "",
  // });
  // const [submitting, setSubmitting] = useState(false);
  // const [done, setDone] = useState(false);
  // const [error, setError] = useState("");

  // const handleChange = (e) =>
  //   setForm({ ...form, [e.target.name]: e.target.value });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSubmitting(true);
  //   setError("");
  //   try {
  //     await API.post("/enquiries", form);
  //     setDone(true);
  //     setForm({ name: "", phone: "", email: "", qualification: "" });
  //     setTimeout(() => {
  //       setDone(false);
  //       setOpen(false);
  //     }, 2500);
  //   } catch {
  //     setError("Something went wrong. Please try again.");
  //   }
  //   setSubmitting(false);
  // };

  return (
    <>
      {/* Enquiry Popup */}
      {/* {open && (
        <div
          className="enquiry-overlay"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="enquiry-modal">
            <button className="enquiry-close" onClick={() => setOpen(false)}>
              ✕
            </button>

            {done ? (
              <div className="enquiry-success">
                <div className="enquiry-success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <div className="enquiry-modal-header">
                  <h2>Apply Now</h2>
                  <p>Fill in your details and we'll reach out to you.</p>
                </div>

                <form onSubmit={handleSubmit} className="enquiry-form">
                  <div className="enquiry-field">
                    <label>Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="enquiry-field">
                    <label>Phone Number *</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div className="enquiry-field">
                    <label>Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="enquiry-field">
                    <label>Highest Qualification *</label>
                    <select
                      name="qualification"
                      value={form.qualification}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select qualification</option>
                      {QUALIFICATIONS.map((q) => (
                        <option key={q}>{q}</option>
                      ))}
                    </select>
                  </div>

                  {error && <p className="enquiry-error">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="enquiry-submit"
                  >
                    {submitting ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )} */}
    </>
  );
};

export default MobileBottomNav;
