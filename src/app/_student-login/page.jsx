'use client';

import React, { useState } from 'react';

export default function StudentLogin() {
  const [form, setForm] = useState({ enrollment_no: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/student-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Create a form to POST data to external URL
        const externalForm = document.createElement('form');
        externalForm.method = 'POST';
        externalForm.action = 'https://student.miu.edu.in';
        
        // Add enrollment_no field
        const enrollmentInput = document.createElement('input');
        enrollmentInput.type = 'hidden';
        enrollmentInput.name = 'enrollment_no';
        enrollmentInput.value = data.data.enrollment_no;
        externalForm.appendChild(enrollmentInput);
        
        // Add password field
        const passwordInput = document.createElement('input');
        passwordInput.type = 'hidden';
        passwordInput.name = 'password';
        passwordInput.value = form.password;
        externalForm.appendChild(passwordInput);
        
        // Add token field
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'token';
        tokenInput.value = data.data.token;
        externalForm.appendChild(tokenInput);
        
        // Submit the form
        document.body.appendChild(externalForm);
        externalForm.submit();
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f4f4', padding: 'clamp(80px,15vw,120px) 20px 40px' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img src="/emblem.png" alt="MIU" style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '12px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
          <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--lpu-black)' }}>Login</h2>
        </div>

        {error && (
          <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', color: '#856404', fontSize: '0.88rem', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px' }}>Enrollment Number</label>
            <input
              type="text"
              value={form.enrollment_no}
              onChange={e => setForm({ ...form, enrollment_no: e.target.value })}
              placeholder="e.g. MIU2024001"
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #e0e0e0', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #e0e0e0', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" className="btn btn-orange" style={{ width: '100%', padding: '13px', fontSize: '1rem', borderRadius: '10px', marginTop: '4px' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Portal'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="mailto:admission@miu.edu.in" style={{ color: 'var(--lpu-orange)', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
