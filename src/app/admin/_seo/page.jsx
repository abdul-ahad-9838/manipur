'use client';

import React, { useState, useEffect, useContext } from 'react';
import API from '@/lib/api';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

const SEOManager = () => {
  const [seoData, setSeoData] = useState({ home: { title: '', description: '' }, admissions: { title: '', description: '' } });
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchSEO();
  }, [user]);

  const fetchSEO = async () => {
    try {
      const { data } = await API.get('/settings/seo');
      if (data && data.content) {
        setSeoData(data.content);
      }
    } catch (err) {
      console.log('No SEO data found');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      await API.post('/settings/seo', { content: seoData });
      alert('SEO settings updated!');
    } catch (err) {
      alert('Error updating SEO settings');
    }
  };

  const handleChange = (page, field, value) => {
    setSeoData({
      ...seoData,
      [page]: { ...seoData[page], [field]: value }
    });
  };

  if (authLoading || loading) return <div style={{ padding: '160px 20px', textAlign: 'center' }}>Loading SEO Settings...</div>;
  if (!user) return null;

  return (
    <div className="seo-manager" style={{ padding: '160px 20px', minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '900' }}>SEO & Metadata Control</h2>
          <button onClick={() => router.push('/admin/dashboard')} className="btn btn-black">Back to Dashboard</button>
        </div>
        
        {Object.keys(seoData).map(page => (
          <div key={page} style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
            <h4 style={{ textTransform: 'capitalize', marginBottom: '15px', color: 'var(--lpu-black)', fontSize: '1.2rem', fontWeight: '800' }}>{page} Page</h4>
            <div style={{ marginBottom: '15px' }}>
              <label style={{fontWeight: '600'}}>Meta Title</label>
              <input 
                type="text" 
                value={seoData[page].title} 
                onChange={(e) => handleChange(page, 'title', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{fontWeight: '600'}}>Meta Description</label>
              <textarea 
                value={seoData[page].description} 
                onChange={(e) => handleChange(page, 'description', e.target.value)}
                style={{...inputStyle, height: '60px'}}
              />
            </div>
          </div>
        ))}

        <button onClick={handleSave} className="btn btn-orange" style={{ width: '100%', marginTop: '20px', padding: '15px', fontSize: '1.1rem' }}>Update SEO Metadata</button>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  marginTop: '8px',
  fontSize: '1rem'
};

export default SEOManager;
