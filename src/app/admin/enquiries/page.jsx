'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import API from '@/lib/api';

const STATUS_COLORS = {
  new: { bg: '#fff3cd', color: '#856404' },
  contacted: { bg: '#cce5ff', color: '#004085' },
  closed: { bg: '#d4edda', color: '#155724' },
};

export default function AdminEnquiries() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!authLoading && !user) router.push('/admin/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchEnquiries();
  }, [user]);

  const fetchEnquiries = async () => {
    try {
      const { data } = await API.get('/enquiries');
      setEnquiries(data);
    } catch {
      setEnquiries([]);
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/enquiries/${id}`, { status });
    setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status } : e));
  };

  const deleteEnquiry = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    await API.delete(`/enquiries/${id}`);
    setEnquiries(prev => prev.filter(e => e._id !== id));
  };

  const filtered = filter === 'all' ? enquiries : enquiries.filter(e => e.status === filter);

  if (authLoading || !user) return <div style={{ padding: '160px 20px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '80vh' }}>
      <div className="container">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: '900' }}>📋 Enquiries</h1>
            <p style={{ color: '#888', marginTop: '4px', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none' }}>
              {enquiries.length} total · {enquiries.filter(e => e.status === 'new').length} new
            </p>
          </div>
          <button onClick={() => router.push('/admin/dashboard')} className="btn btn-black">← Dashboard</button>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '25px', flexWrap: 'wrap' }}>
          {['all', 'new', 'contacted', 'closed'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontWeight: '700', fontSize: '0.85rem', textTransform: 'capitalize',
              background: filter === f ? 'var(--lpu-orange)' : 'white',
              color: filter === f ? 'white' : '#333',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
            }}>
              {f === 'all' ? `All (${enquiries.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${enquiries.filter(e => e.status === f).length})`}
            </button>
          ))}
        </div>

        {loading && <p style={{ textAlign: 'center', color: '#888' }}>Loading enquiries...</p>}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px' }}>
            <p style={{ color: '#888', fontSize: '1.1rem' }}>No enquiries found.</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(enq => (
            <div key={enq._id} style={{
              background: 'white', borderRadius: '12px', padding: '20px 24px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              flexWrap: 'wrap', gap: '15px',
              borderLeft: `4px solid ${enq.status === 'new' ? '#e8b919' : enq.status === 'contacted' ? '#3182ce' : '#38a169'}`
            }}>
              {/* Info */}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'none' }}>{enq.name}</h3>
                  <span style={{
                    padding: '2px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '700',
                    background: STATUS_COLORS[enq.status]?.bg,
                    color: STATUS_COLORS[enq.status]?.color
                  }}>
                    {enq.status.toUpperCase()}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: '#555', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none' }}>
                  <span>📞 {enq.phone}</span>
                  <span>✉️ {enq.email}</span>
                  <span>🎓 {enq.qualification}</span>
                  <span style={{ color: '#aaa' }}>🕐 {new Date(enq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <select
                  value={enq.status}
                  onChange={e => updateStatus(enq._id, e.target.value)}
                  style={{ padding: '7px 10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.82rem', cursor: 'pointer', fontWeight: '600' }}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
                <a href={`tel:${enq.phone}`} className="btn btn-orange" style={{ padding: '7px 14px', fontSize: '0.82rem' }}>Call</a>
                <button onClick={() => deleteEnquiry(enq._id)} className="btn btn-black" style={{ padding: '7px 14px', fontSize: '0.82rem' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
