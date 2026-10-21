'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '@/styles/PayOnline.css';

export default function PaymentFailed() {
  const [params, setParams] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setParams({
      txnid:       urlParams.get('txnid')      || '',
      amount:      urlParams.get('amount')      || '',
      productinfo: urlParams.get('productinfo') || '',
      firstname:   urlParams.get('firstname')   || '',
      error:       urlParams.get('error')       || 'Transaction could not be completed.',
    });
  }, []);

  return (
    <div className="pay-page">
      <div className="pay-card pay-result-card">
        <div className="pay-result-icon failed">✕</div>
        <h1 className="pay-result-title failed">Payment Failed</h1>
        <p className="pay-result-msg">
          {params.firstname ? `Sorry ${params.firstname}, your` : 'Your'} payment could not be processed. No amount has been deducted.
        </p>

        {params.error && (
          <div className="pay-error-box">{params.error}</div>
        )}

        {params.txnid && (
          <div className="pay-result-details">
            {params.txnid       && <div className="pay-detail-row"><span>Transaction ID</span><strong>{params.txnid}</strong></div>}
            {params.amount      && <div className="pay-detail-row"><span>Amount</span><strong>₹{parseFloat(params.amount).toLocaleString('en-IN')}</strong></div>}
            {params.productinfo && <div className="pay-detail-row"><span>Purpose</span><strong>{params.productinfo}</strong></div>}
          </div>
        )}

        <p className="pay-result-note">
          If any amount was deducted, it will be refunded within 5–7 business days. Please contact us at <a href="mailto:admission@miu.edu.in">admission@miu.edu.in</a> for assistance.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/payonline" className="pay-result-btn">Try Again</Link>
          <Link href="/" className="pay-result-btn pay-result-btn-outline">Return to Home</Link>
        </div>
      </div>
    </div>
  );
}
