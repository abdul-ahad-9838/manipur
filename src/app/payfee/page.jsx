"use client";

import React, { useState } from "react";
import "@/styles/PayOnline.css";

const PAYMENT_AMOUNT = 10000;
const PAYMENT_PURPOSE = "Verification Fee";

export default function PayOnlinePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

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
    } else if (!/\S+@\S+\.\S+/.test(form.email.trim())) {
      e.email = "Enter a valid email address";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length > 0) {
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
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          amount: PAYMENT_AMOUNT,
          purpose: PAYMENT_PURPOSE,
        }),
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
    } catch (error) {
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

          <h1 className="pay-title">Online Payment</h1>

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
          {/* Full Name */}
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
              autoComplete="name"
            />

            {errors.name && (
              <span className="pay-error">
                {errors.name}
              </span>
            )}
          </div>

          {/* Mobile Number */}
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
              inputMode="numeric"
              autoComplete="tel"
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
              autoComplete="email"
              className={errors.email ? "error" : ""}
            />

            {errors.email && (
              <span className="pay-error">
                {errors.email}
              </span>
            )}
          </div>

          {/* Fixed Amount */}
          <div className="pay-field">
            <label htmlFor="amount">
              Amount (₹) <span className="pay-req">*</span>
            </label>

            <input
              id="amount"
              name="amount"
              type="number"
              value={PAYMENT_AMOUNT}
              readOnly
              className={errors.amount ? "error" : ""}
            />

            {errors.amount && (
              <span className="pay-error">
                {errors.amount}
              </span>
            )}
          </div>

          {/* Fixed Purpose */}
          <div className="pay-field">
            <label htmlFor="purpose">
              Purpose <span className="pay-req">*</span>
            </label>

            <input
              id="purpose"
              name="purpose"
              type="text"
              value={PAYMENT_PURPOSE}
              readOnly
              className={errors.purpose ? "error" : ""}
            />

            {errors.purpose && (
              <span className="pay-error">
                {errors.purpose}
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
                {PAYMENT_AMOUNT.toLocaleString("en-IN")}
              </>
            )}
          </button>

          {/* Security Note */}
          <p className="pay-secure-note">
            🔐 Secured by <strong>Easebuzz</strong> Payment Gateway.
            Your payment information is encrypted and secure.
          </p>
        </form>
      </div>
    </div>
  );
}
