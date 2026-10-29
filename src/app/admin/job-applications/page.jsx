'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import API from '@/lib/api';

const STATUS_COLORS = {
  new: { bg: '#fff3cd', color: '#856404' },
  reviewing: { bg: '#cce5ff', color: '#004085' },
  shortlisted: { bg: '#d4edda', color: '#155724' },
  rejected: { bg: '#f8d7da', color: '#721c24' },
};

export default function AdminJobApplications() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) router.push('/admin/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchApps();
  }, [user]);

  const fetchApps = async () => {
    try {
      const { data } = await API.get('/job-applications');
      setApps(data);
    } catch { setApps([]); }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/job-applications/${id}`, { status });
    setApps(prev => prev.map(a => a._id === id ? { ...a, status } : a));
  };

  const deleteApp = async (id) => {
    if (!confirm('Delete this application?')) return;
    await API.delete(`/job-applications/${id}`);
    setApps(prev => prev.filter(a => a._id !== id));
  };

  const jobs = ['all', ...new Set(apps.map(a => a.jobTitle))];

  const filtered = apps.filter(a => {
    const statusMatch = filter === 'all' || a.status === filter;
    const jobMatch = jobFilter === 'all' || a.jobTitle === jobFilter;
    return statusMatch && jobMatch;
  });

  if (authLoading || !user) return <div style={{ padding: '160px 20px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '80vh' }}>
      <div className="container">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: '900' }}>💼 Job Applications</h1>
            <p style={{ color: '#888', marginTop: '4px', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none' }}>
              {apps.length} total · {apps.filter(a => a.status === 'new').length} new · {apps.filter(a => a.status === 'shortlisted').length} shortlisted
            </p>
          </div>
          <button onClick={() => router.push('/admin/dashboard')} className="btn btn-black">← Dashboard</button>
        </div>

        {/* Status filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
          {['all', 'new', 'reviewing', 'shortlisted', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontWeight: '700', fontSize: '0.82rem', textTransform: 'capitalize',
              background: filter === f ? 'var(--lpu-orange)' : 'white',
              color: filter === f ? 'white' : '#333',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
            }}>
              {f === 'all' ? `All (${apps.length})` : `${f} (${apps.filter(a => a.status === f).length})`}
            </button>
          ))}
        </div>

        {/* Job filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {jobs.map(j => (
            <button key={j} onClick={() => setJobFilter(j)} style={{
              padding: '6px 14px', borderRadius: '20px', border: '1.5px solid #ddd', cursor: 'pointer',
              fontWeight: '600', fontSize: '0.75rem',
              background: jobFilter === j ? 'var(--lpu-black)' : 'white',
              color: jobFilter === j ? 'white' : '#555',
            }}>
              {j === 'all' ? 'All Positions' : j?.replace('Assistant Professor – ', 'Asst. Prof – ')}
            </button>
          ))}
        </div>

        {loading && <p style={{ textAlign: 'center', color: '#888' }}>Loading applications...</p>}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px' }}>
            <p style={{ color: '#888', fontSize: '1.1rem' }}>No applications found.</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(app => (
            <div key={app._id} style={{
              background: 'white', borderRadius: '12px', padding: '20px 24px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              borderLeft: `4px solid ${app.status === 'new' ? '#e8b919' : app.status === 'reviewing' ? '#3182ce' : app.status === 'shortlisted' ? '#38a169' : '#e53e3e'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', textTransform: 'none' }}>{app.name}</h3>
                    <span style={{
                      padding: '2px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '700',
                      background: STATUS_COLORS[app.status]?.bg, color: STATUS_COLORS[app.status]?.color
                    }}>{app.status.toUpperCase()}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#555', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none' }}>
                    <strong style={{ color: 'var(--lpu-orange)' }}>{app.jobTitle}</strong>
                    <span style={{ color: '#bbb', margin: '0 6px' }}>·</span>{app.department}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.82rem', color: '#666', marginTop: '6px', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none' }}>
                    <span>📞 {app.phone}</span>
                    <span>✉️ {app.email}</span>
                    {app.qualification && <span>🎓 {app.qualification}</span>}
                    {app.experience && <span>⏱ {app.experience}</span>}
                    <span style={{ color: '#bbb' }}>🕐 {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <select value={app.status} onChange={e => updateStatus(app._id, e.target.value)}
                    style={{ padding: '7px 10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.82rem', cursor: 'pointer', fontWeight: '600' }}>
                    <option value="new">New</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <a href={`mailto:${app.email}?subject=Re: Application for ${app.jobTitle}`} className="btn btn-orange" style={{ padding: '7px 14px', fontSize: '0.82rem' }}>Email</a>
                  <button onClick={() => setExpanded(expanded === app._id ? null : app._id)} className="btn btn-black" style={{ padding: '7px 14px', fontSize: '0.82rem' }}>
                    {expanded === app._id ? 'Less' : 'More'}
                  </button>
                  <button onClick={() => deleteApp(app._id)} style={{ padding: '7px 12px', background: '#fee', border: '1px solid #fcc', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', color: '#c00', fontWeight: '700' }}>✕</button>
                </div>
              </div>

              {expanded === app._id && app.message && (
                <div style={{ marginTop: '16px', padding: '14px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.85rem', color: '#555', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none', lineHeight: 1.6 }}>
                  <strong style={{ display: 'block', marginBottom: '6px', color: '#333' }}>Cover Letter / Message:</strong>
                  {app.message}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
