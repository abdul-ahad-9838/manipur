"use client";

import React, { useState } from "react";
import "@/styles/PayOnline.css";

export default function PayOnlinePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    amount: "",
    purpose: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // Purpose and amount
  // amount: null means user can enter the amount manually
  const purposes = [
    { name: "Tution Fee", amount: null },
    { name: "Exam Fee", amount: 1000 },
    { name: "Degree (UG/PG)", amount: 3000 },
    { name: "Degree (UG/PG) (Urgent)", amount: 6000 },
    { name: "Degree (Ph.D)", amount: 5000 },
    { name: "Degree (Ph.D) (Urgent)", amount: 10000 },
    { name: "Provisional Certificate (UG/PG)", amount: 1500 },
    { name: "Provisional Certificate (UG/PG) (Urgent)", amount: 3000 },
    { name: "Provisional Certificate (Ph.D)", amount: 2000 },
    { name: "Migration Certificate", amount: 1000 },
    { name: "Migration Certificate (Urgent)", amount: 3000 },
    { name: "Character Certificate", amount: 1000 },
    { name: "Transcript", amount: 1000 },
    { name: "Transcript (Urgent)", amount: 3000 },
    { name: "LOR/MOI/Backlog", amount: 1000 },
    { name: "WES", amount: 10000 },
    { name: "Verification", amount: 10000 },
    { name: "Notification Ph.D", amount: 2000 },
    { name: "Pre-Submission Fee", amount: 25000 },
    { name: "Duplicate ID Card", amount: 200 },
    { name: "Bonafide Certificate", amount: 1000 },
    { name: "Alumni Fee", amount: 5000 },
    // old fee structure
    { name: "Registration Fee", amount: null },
    { name: "Examination Fee", amount: null },
    { name: "Hostel Fee", amount: null },
    { name: "Library Fee", amount: null },
    { name: "Authorization Fee", amount: null },
    { name: "Others", amount: null },
  ];

  const validate = () => {
    const e = {};

    if (!form.name.trim()) {
      e.name = "Name is required";
    }

    if (!form.phone.trim()) {
      e.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      e.phone = "Enter a valid 10-digit mobile number";
    }

    if (!form.email.trim()) {
      e.email = "Email ID is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      e.email = "Enter a valid email address";
    }

    if (!form.amount.trim()) {
      e.amount = "Amount is required";
    } else if (
      isNaN(form.amount) ||
      parseFloat(form.amount) <= 0
    ) {
      e.amount = "Enter a valid amount";
    }

    if (!form.purpose.trim()) {
      e.purpose = "Purpose is required";
    }

    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  };

  const handlePurposeChange = (e) => {
    const purpose = e.target.value;

    const selectedPurpose = purposes.find(
      (item) => item.name === purpose
    );

    setForm((prev) => ({
      ...prev,
      purpose,
      amount:
        selectedPurpose?.amount !== null &&
          selectedPurpose?.amount !== undefined
          ? selectedPurpose.amount.toString()
          : "",
    }));

    setErrors((prev) => ({
      ...prev,
      purpose: "",
      amount: "",
    }));

    setServerError("");
  };

  const selectedPurpose = purposes.find(
    (item) => item.name === form.purpose
  );

  const isAmountFixed =
    selectedPurpose?.amount !== null &&
    selectedPurpose?.amount !== undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(
          data.message || "Something went wrong. Please try again."
        );
        setLoading(false);
        return;
      }

      window.location.href = data.redirectUrl;
    } catch {
      setServerError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="pay-page">
      <div className="pay-card">

        {/* Header */}
        <div className="pay-header">
          <div className="pay-logo-wrap">
            <img
              src="/images/MIU_Logo.webp"
              alt="MIU Logo"
              className="pay-logo"
            />
          </div>

          <h1 className="pay-title">
            Online Payment
          </h1>

          <p className="pay-subtitle">
            Manipur International University
          </p>
        </div>

        {/* Form */}
        <form
          className="pay-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Name */}
          <div className="pay-field">
            <label htmlFor="name">
              Full Name <span className="pay-req">*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />

            {errors.name && (
              <span className="pay-error">
                {errors.name}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="pay-field">
            <label htmlFor="phone">
              Mobile Number <span className="pay-req">*</span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={handleChange}
              maxLength={10}
              className={errors.phone ? "error" : ""}
            />

            {errors.phone && (
              <span className="pay-error">
                {errors.phone}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="pay-field">
            <label htmlFor="email">
              Email ID <span className="pay-req">*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />

            {errors.email && (
              <span className="pay-error">
                {errors.email}
              </span>
            )}
          </div>

          {/* Purpose */}
          <div className="pay-field">
            <label htmlFor="purpose">
              Purpose <span className="pay-req">*</span>
            </label>

            <select
              id="purpose"
              name="purpose"
              value={form.purpose}
              onChange={handlePurposeChange}
              className={errors.purpose ? "error" : ""}
            >
              <option value="">
                -- Select Purpose --
              </option>

              {purposes.map((item) => (
                <option
                  key={item.name}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>

            {errors.purpose && (
              <span className="pay-error">
                {errors.purpose}
              </span>
            )}
          </div>

          {/* Amount */}
          <div className="pay-field">
            <label htmlFor="amount">
              Amount (₹) <span className="pay-req">*</span>
            </label>

            <input
              id="amount"
              name="amount"
              type="number"
              placeholder={
                isAmountFixed
                  ? "Amount automatically selected"
                  : "Enter amount in INR"
              }
              value={form.amount}
              onChange={handleChange}
              min="1"
              step="1"
              readOnly={isAmountFixed}
              className={errors.amount ? "error" : ""}
            />

            {isAmountFixed && (
              <small className="pay-amount-note">
                Amount is fixed for the selected purpose.
              </small>
            )}

            {errors.amount && (
              <span className="pay-error">
                {errors.amount}
              </span>
            )}
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="pay-server-error">
              {serverError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="pay-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="pay-spinner">
                Processing...
              </span>
            ) : (
              <>
                🔒 Pay ₹
                {form.amount
                  ? parseFloat(form.amount).toLocaleString("en-IN")
                  : "0"}
              </>
            )}
          </button>

          <p className="pay-secure-note">
            🔐 Secured by <strong>Easebuzz</strong> Payment Gateway.
            Your payment information is encrypted and secure.
          </p>
        </form>
      </div>
    </div>
  );
}
