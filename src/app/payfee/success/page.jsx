'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '@/styles/PayOnline.css';

export default function PaymentSuccess() {
  const [params, setParams] = useState({});

  useEffect(() => {
    // Easebuzz posts back to this URL — read from URL search params or sessionStorage
    const urlParams = new URLSearchParams(window.location.search);
    setParams({
      txnid:       urlParams.get('txnid')       || '',
      amount:      urlParams.get('amount')       || '',
      productinfo: urlParams.get('productinfo')  || '',
      firstname:   urlParams.get('firstname')    || '',
      email:       urlParams.get('email')        || '',
      status:      urlParams.get('status')       || 'success',
    });
  }, []);

  return (
    <div className="pay-page">
      <div className="pay-card pay-result-card">
        <div className="pay-result-icon success">✓</div>
        <h1 className="pay-result-title success">Payment Successful</h1>
        <p className="pay-result-msg">
          Thank you{params.firstname ? `, ${params.firstname}` : ''}! Your payment has been received successfully.
        </p>

        {params.txnid && (
          <div className="pay-result-details">
            {params.txnid      && <div className="pay-detail-row"><span>Transaction ID</span><strong>{params.txnid}</strong></div>}
            {params.amount     && <div className="pay-detail-row"><span>Amount Paid</span><strong>₹{parseFloat(params.amount).toLocaleString('en-IN')}</strong></div>}
            {params.productinfo && <div className="pay-detail-row"><span>Purpose</span><strong>{params.productinfo}</strong></div>}
            {params.email      && <div className="pay-detail-row"><span>Email</span><strong>{params.email}</strong></div>}
          </div>
        )}

        <p className="pay-result-note">
          A confirmation will be sent to your registered email. Please keep your Transaction ID for future reference.
        </p>

        <Link href="/" className="pay-result-btn">Return to Home</Link>
      </div>
    </div>
  );
}
