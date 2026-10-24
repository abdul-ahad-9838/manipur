
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    enrollmentNo: '',
    dob: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/students/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Navigate to dashboard without a full page reload
      router.replace('/student/dashboard');
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f4f4f4',
        padding: 'clamp(80px, 15vw, 120px) 20px 40px',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '420px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img
            src="/emblem.webp"
            alt="MIU"
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'contain',
              marginBottom: '12px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />

          <h2
            style={{
              fontSize: '1.6rem',
              fontWeight: '900',
              color: 'var(--lpu-black)',
              margin: 0,
            }}
          >
            Login
          </h2>
        </div>

        {error && (
          <div
            role="alert"
            style={{
              background: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '20px',
              color: '#856404',
              fontSize: '0.88rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              textTransform: 'none',
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div>
            <label
              htmlFor="enrollmentNo"
              style={{
                display: 'block',
                fontWeight: '700',
                fontSize: '0.85rem',
                marginBottom: '6px',
              }}
            >
              Enrollment Number
            </label>

            <input
              id="enrollmentNo"
              type="text"
              value={form.enrollmentNo}
              onChange={(e) =>
                setForm({ ...form, enrollmentNo: e.target.value })
              }
              placeholder="e.g. MIU2024001"
              autoComplete="username"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1.5px solid #e0e0e0',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label
              htmlFor="dob"
              style={{
                display: 'block',
                fontWeight: '700',
                fontSize: '0.85rem',
                marginBottom: '6px',
              }}
            >
              Date of Birth (DD-MM-YYYY)
            </label>

            <input
              id="dob"
              type="date"
              value={
                form.dob
                  ? (() => {
                    const [dd, mm, yyyy] = form.dob.split('-');
                    return `${yyyy}-${mm}-${dd}`;
                  })()
                  : ''
              }
              onChange={(e) => {
                const value = e.target.value;

                if (value) {
                  const [yyyy, mm, dd] = value.split('-');

                  setForm({
                    ...form,
                    dob: `${dd}-${mm}-${yyyy}`,
                  });
                } else {
                  setForm({ ...form, dob: '' });
                }
              }}
              autoComplete="bday"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1.5px solid #e0e0e0',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-orange"
            style={{
              width: '100%',
              padding: '13px',
              fontSize: '1rem',
              borderRadius: '10px',
              marginTop: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login to Portal'}
          </button>
        </form>
      </div>
    </div>
  );
}
