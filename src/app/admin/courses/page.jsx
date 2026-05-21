'use client';

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import API from '@/lib/api';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import ImageUploader from '@/components/ImageUploader';

const DEFAULT_SCHOOLS = [
  'School Of Commerce','School Of Information Technology','School Of Engineering',
  'School Of Management','School Of Science','School Of Vocational Studies',
  'School Of Humanities','School Of Allied Health Science',
];

const EMPTY = {
  title: '', specialisation: '', icon: '🎓', description: '', highlight: '',
  duration: '3 Years', eligibility: '10+2 / Equivalent',
  school: 'School Of Commerce', slug: '', coverImage: '', cardImage: '',
  overview: '', objectives: '', careerProspects: '',
  syllabus: '', fee: '', seats: '', mode: 'Full Time',
  affiliation: 'Manipur International University',
};

const inp = { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.93rem', marginTop: '6px', boxSizing: 'border-box' };
const lbl = { fontWeight: '600', fontSize: '0.88rem', display: 'block', color: '#444' };
const ta  = { ...inp, resize: 'vertical', minHeight: '90px' };

export default function CoursesManager() {
  const [courses, setCourses] = useState([]);
  const [schools, setSchools] = useState(DEFAULT_SCHOOLS);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [expandedSchools, setExpandedSchools] = useState({});
  const [filterSchool, setFilterSchool] = useState('All Schools');
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();
  const submittingRef = React.useRef(false);

  useEffect(() => {
    if (!authLoading && !user) router.push('/admin/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchCourses();
      // Fetch dynamic schools list from DB
      API.get('/settings/schools-section')
        .then(({ data }) => {
          const list = data?.content?.schools;
          if (list?.length) {
            // Convert "School of Fire & Safety" → "School Of Fire & Safety" (title case first word)
            const dbNames = list.map(s => s.name.replace(/\b\w/g, c => c.toUpperCase()));
            const dbNamesSet = new Set(dbNames.map(n => n.toLowerCase()));
            // Merge: append any DEFAULT_SCHOOLS not already in DB list
            const missing = DEFAULT_SCHOOLS.filter(s => !dbNamesSet.has(s.toLowerCase()));
            setSchools([...dbNames, ...missing]);
          }
        })
        .catch(() => {});
    }
  }, [user]);

  const fetchCourses = async () => {
    try { const { data } = await API.get('/courses'); setCourses(data); } catch {}
  };

  const autoSlug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && !editingId ? { slug: autoSlug(value) } : {}),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (submittingRef.current) return; // prevent double submit
    submittingRef.current = true;
    setSaving(true); setMsg('');
    try {
      const payload = {
        ...form,
        objectives: form.objectives ? form.objectives.split('\n').filter(Boolean) : [],
        careerProspects: form.careerProspects ? form.careerProspects.split('\n').filter(Boolean) : [],
      };
      if (editingId) {
        await API.put(`/courses/${editingId}`, payload);
        setMsg('✅ Program updated.');
      } else {
        await API.post('/courses', payload);
        setMsg('✅ Program created.');
      }
      setForm(EMPTY); setEditingId(null); setShowForm(false);
      fetchCourses();
    } catch { setMsg('❌ Error saving program.'); }
    setSaving(false);
    submittingRef.current = false;
    setTimeout(() => setMsg(''), 4000);
  };

  const handleEdit = course => {
    setForm({
      title: course.title || '', specialisation: course.specialisation || '', icon: course.icon || '🎓',
      description: course.description || '', highlight: course.highlight || '',
      duration: course.duration || '3 Years', eligibility: course.eligibility || '10+2 / Equivalent',
      school: course.school || 'School Of Commerce', slug: course.slug || '',
      coverImage: course.coverImage || '', cardImage: course.cardImage || '', overview: course.overview || '',
      objectives: (course.objectives || []).join('\n'),
      careerProspects: (course.careerProspects || []).join('\n'),
      syllabus: course.syllabus || '', fee: course.fee || '',
      seats: course.seats || '', mode: course.mode || 'Full Time',
      affiliation: course.affiliation || 'Manipur International University',
    });
    setEditingId(course._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async id => {
    if (!confirm('Delete this program?')) return;
    await API.delete(`/courses/${id}`);
    fetchCourses();
  };

  const handleMoveUp = async (course, school) => {
    const schoolCourses = coursesBySchool[school];
    const currentIndex = schoolCourses.findIndex(c => c._id === course._id);
    
    if (currentIndex <= 0) return; // Already at top
    
    // Swap with previous course
    const reorderedCourses = [...schoolCourses];
    [reorderedCourses[currentIndex - 1], reorderedCourses[currentIndex]] = 
    [reorderedCourses[currentIndex], reorderedCourses[currentIndex - 1]];
    
    // Update order field for all courses in this school
    const updates = reorderedCourses.map((c, index) => ({
      id: c._id,
      order: index
    }));
    
    try {
      await Promise.all(
        updates.map(({ id, order }) => 
          API.put(`/courses/${id}`, { order })
        )
      );
      fetchCourses();
    } catch (error) {
      console.error('Error reordering courses:', error);
      setMsg('❌ Failed to reorder courses.');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  const handleMoveDown = async (course, school) => {
    const schoolCourses = coursesBySchool[school];
    const currentIndex = schoolCourses.findIndex(c => c._id === course._id);
    
    if (currentIndex >= schoolCourses.length - 1) return; // Already at bottom
    
    // Swap with next course
    const reorderedCourses = [...schoolCourses];
    [reorderedCourses[currentIndex], reorderedCourses[currentIndex + 1]] = 
    [reorderedCourses[currentIndex + 1], reorderedCourses[currentIndex]];
    
    // Update order field for all courses in this school
    const updates = reorderedCourses.map((c, index) => ({
      id: c._id,
      order: index
    }));
    
    try {
      await Promise.all(
        updates.map(({ id, order }) => 
          API.put(`/courses/${id}`, { order })
        )
      );
      fetchCourses();
    } catch (error) {
      console.error('Error reordering courses:', error);
      setMsg('❌ Failed to reorder courses.');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  const handleInlineImageUpload = async (courseId, file) => {
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setMsg('❌ Please select an image file.');
      setTimeout(() => setMsg(''), 3000);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setMsg('❌ Image must be under 2MB.');
      setTimeout(() => setMsg(''), 3000);
      return;
    }

    // Show loading state
    setMsg('📤 Uploading image...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Attach auth token from localStorage
      const headers = {};
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
      if (userInfo?.token) headers['Authorization'] = `Bearer ${userInfo.token}`;

      // Upload to server
      const uploadResponse = await fetch('/api/upload', { 
        method: 'POST', 
        body: formData, 
        headers 
      });

      const uploadData = await uploadResponse.json();
      
      if (!uploadResponse.ok) {
        throw new Error(uploadData.message || 'Upload failed');
      }

      const imageUrl = uploadData.url;

      // Update course with new image
      await API.put(`/courses/${courseId}`, { cardImage: imageUrl });

      setMsg('✅ Image updated successfully!');
      fetchCourses();
    } catch (error) {
      console.error('Error uploading image:', error);
      setMsg('❌ Failed to upload image. Please try again.');
    }

    setTimeout(() => setMsg(''), 3000);
  };

  const handleToggleActive = async (courseId, currentStatus) => {
    try {
      await API.put(`/courses/${courseId}`, { isActive: !currentStatus });
      setMsg(`✅ Course ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
      fetchCourses();
    } catch (error) {
      console.error('Error toggling course status:', error);
      setMsg('❌ Failed to update course status.');
    }
    setTimeout(() => setMsg(''), 3000);
  };

  if (authLoading || !user) return <div style={{ padding: '160px 20px', textAlign: 'center' }}>Loading...</div>;

  // Group courses by school and sort by order
  const coursesBySchool = courses.reduce((acc, course) => {
    const school = course.school || 'Uncategorized';
    if (!acc[school]) acc[school] = [];
    acc[school].push(course);
    return acc;
  }, {});

  // Also ensure all schools from DB appear even with 0 courses
  // Normalize to title case to match course school field format
  schools.forEach(s => {
    // Convert "School of Fire & Safety" → "School Of Fire & Safety"
    const normalized = s.replace(/\b\w/g, c => c.toUpperCase());
    if (!coursesBySchool[normalized]) coursesBySchool[normalized] = [];
  });

  // Sort courses within each school by order field
  Object.keys(coursesBySchool).forEach(school => {
    coursesBySchool[school].sort((a, b) => (a.order || 0) - (b.order || 0));
  });

  // Get filtered schools
  const schoolsToShow = filterSchool === 'All Schools'
    ? Object.keys(coursesBySchool).sort()
    : [filterSchool];

  const toggleSchool = (school) => {
    setExpandedSchools(prev => ({ ...prev, [school]: !prev[school] }));
  };

  const expandAll = () => {
    const allExpanded = {};
    Object.keys(coursesBySchool).forEach(school => { allExpanded[school] = true; });
    setExpandedSchools(allExpanded);
  };

  const collapseAll = () => {
    setExpandedSchools({});
  };

  return (
    <div style={{ padding: 'clamp(100px,15vw,160px) 20px 60px', minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="container">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: '900' }}>🎓 Manage Programs</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(EMPTY); }} className="btn btn-orange">
              {showForm ? 'Cancel' : '+ Add Program'}
            </button>
            <button onClick={() => router.push('/admin/dashboard')} className="btn btn-black">← Dashboard</button>
          </div>
        </div>

        {msg && <p style={{ background: msg.startsWith('✅') ? '#d4edda' : '#f8d7da', color: msg.startsWith('✅') ? '#155724' : '#721c24', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', fontWeight: '600' }}>{msg}</p>}

        {showForm && (
          <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '25px', fontSize: '1.3rem' }}>{editingId ? 'Edit Program' : 'New Program'}</h2>

            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div><label style={lbl}>Program Title *</label><input name="title" value={form.title} onChange={handleChange} required style={inp} /></div>
              <div><label style={lbl}>School *</label>
                <select name="school" value={form.school} onChange={handleChange} style={inp}>
                  {schools.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Specialisation Field */}
            <div style={{ marginBottom: '16px' }}>
              <label style={lbl}>Specialisation (optional)</label>
              <input name="specialisation" value={form.specialisation || ''} onChange={handleChange} style={inp} placeholder="e.g., Computer Science, Finance, Marketing" />
              <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none' }}>
                This will be displayed in brackets below the program name on cards
              </p>
            </div>

            {/* Row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div><label style={lbl}>Icon (emoji)</label><input name="icon" value={form.icon} onChange={handleChange} style={inp} /></div>
              <div><label style={lbl}>Duration</label><input name="duration" value={form.duration} onChange={handleChange} style={inp} placeholder="3 Years" /></div>
              <div><label style={lbl}>Mode</label>
                <select name="mode" value={form.mode} onChange={handleChange} style={inp}>
                  <option>Full Time</option><option>Part Time</option><option>Online</option>
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div><label style={lbl}>Eligibility</label><input name="eligibility" value={form.eligibility} onChange={handleChange} style={inp} /></div>
              <div><label style={lbl}>Seats</label><input name="seats" value={form.seats} onChange={handleChange} style={inp} placeholder="60" /></div>
              <div><label style={lbl}>Fee</label><input name="fee" value={form.fee} onChange={handleChange} style={inp} placeholder="₹ 50,000 / year" /></div>
            </div>

            {/* Row 4 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={{ gridColumn: '1 / -1' }}><label style={lbl}>URL Slug</label><input name="slug" value={form.slug} onChange={handleChange} style={inp} placeholder="bca-bachelor-of-computer-application" /></div>
              <div>
                <ImageUploader
                  label="Card Image (for program listings)"
                  value={form.cardImage}
                  onChange={url => setForm(prev => ({ ...prev, cardImage: url }))}
                  placeholder="Thumbnail image for cards"
                  height={140}
                />
              </div>
              <div>
                <ImageUploader
                  label="Cover Image (for detail page hero)"
                  value={form.coverImage}
                  onChange={url => setForm(prev => ({ ...prev, coverImage: url }))}
                  placeholder="Large hero image"
                  height={140}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}><label style={lbl}>Short Description *</label><textarea name="description" value={form.description} onChange={handleChange} required style={{ ...ta, minHeight: '70px' }} /></div>
            <div style={{ marginBottom: '16px' }}><label style={lbl}>Full Overview</label><textarea name="overview" value={form.overview} onChange={handleChange} style={ta} placeholder="Detailed program overview..." /></div>
            <div style={{ marginBottom: '16px' }}><label style={lbl}>Highlight (e.g. 64 LPA Package)</label><input name="highlight" value={form.highlight} onChange={handleChange} style={inp} /></div>
            <div style={{ marginBottom: '16px' }}><label style={lbl}>Learning Objectives (one per line)</label><textarea name="objectives" value={form.objectives} onChange={handleChange} style={ta} placeholder="Understand core concepts&#10;Develop practical skills&#10;..." /></div>
            <div style={{ marginBottom: '16px' }}><label style={lbl}>Career Prospects (one per line)</label><textarea name="careerProspects" value={form.careerProspects} onChange={handleChange} style={ta} placeholder="Software Developer&#10;Data Analyst&#10;..." /></div>
            <div style={{ marginBottom: '16px' }}><label style={lbl}>Syllabus (text or HTML)</label><textarea name="syllabus" value={form.syllabus} onChange={handleChange} style={{ ...ta, minHeight: '150px', fontFamily: 'monospace', fontSize: '0.88rem' }} placeholder="Semester 1: ..." /></div>
            <div style={{ marginBottom: '24px' }}><label style={lbl}>Affiliation</label><input name="affiliation" value={form.affiliation} onChange={handleChange} style={inp} /></div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" disabled={saving} className="btn btn-orange">{saving ? 'Saving...' : editingId ? 'Update Program' : 'Create Program'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm(EMPTY); }} className="btn btn-black">Cancel</button>
            </div>
          </form>
        )}

        {/* Program list */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>All Programs ({courses.length})</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select 
              value={filterSchool} 
              onChange={e => setFilterSchool(e.target.value)}
              style={{ ...inp, marginTop: 0, width: 'auto', minWidth: '200px' }}
            >
              <option>All Schools</option>
              {schools.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={expandAll} className="btn btn-black" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Expand All</button>
            <button onClick={collapseAll} className="btn btn-black" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Collapse All</button>
          </div>
        </div>

        {schoolsToShow.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', color: '#888' }}>
            No programs yet. Click "+ Add Program" to create one.
          </div>
        )}

        {schoolsToShow.map(school => {
          const schoolCourses = coursesBySchool[school] || [];
          const isExpanded = expandedSchools[school];
          
          return (
            <div key={school} style={{ marginBottom: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              {/* School Header */}
              <div 
                onClick={() => toggleSchool(school)}
                style={{ 
                  padding: '20px 24px', 
                  background: 'linear-gradient(135deg, var(--lpu-black) 0%, #1a2a4a 100%)', 
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <div>
                  <h4 style={{ margin: 0, color: 'white', fontSize: '1.1rem', fontWeight: '800' }}>
                    {school}
                  </h4>
                  <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none' }}>
                    {schoolCourses.length} {schoolCourses.length === 1 ? 'Program' : 'Programs'}
                  </p>
                </div>
                <div style={{ 
                  color: 'var(--lpu-orange)', 
                  fontSize: '1.5rem', 
                  fontWeight: '700',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </div>
              </div>

              {/* School Courses */}
              {isExpanded && (
                <div style={{ padding: '12px' }}>
                  <div style={{ marginBottom: '12px', padding: '10px 12px', background: '#fff3cd', borderRadius: '8px', fontSize: '0.85rem', color: '#856404', border: '1px solid #ffeaa7' }}>
                    💡 <strong>Tip:</strong> Use arrow buttons (↑ ↓) to reorder programs within this school. Click on the image area to upload/change card images.
                  </div>
                  {schoolCourses.map((course, index) => (
                    <div 
                      key={course._id}
                      style={{ 
                        background: '#f8f9fa', 
                        padding: '18px 20px', 
                        borderRadius: '10px', 
                        marginBottom: '10px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        flexWrap: 'wrap', 
                        gap: '12px', 
                        border: '1px solid #e0e0e0',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '200px' }}>
                        {/* Arrow buttons for reordering */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveUp(course, school);
                            }}
                            disabled={index === 0}
                            style={{
                              background: index === 0 ? '#e0e0e0' : 'var(--lpu-orange)',
                              color: index === 0 ? '#999' : 'var(--lpu-black)',
                              border: 'none',
                              borderRadius: '4px',
                              width: '28px',
                              height: '24px',
                              cursor: index === 0 ? 'not-allowed' : 'pointer',
                              fontSize: '0.9rem',
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (index !== 0) {
                                e.currentTarget.style.transform = 'scale(1.1)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(232, 185, 25, 0.4)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                            title="Move up"
                          >
                            ↑
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveDown(course, school);
                            }}
                            disabled={index === schoolCourses.length - 1}
                            style={{
                              background: index === schoolCourses.length - 1 ? '#e0e0e0' : 'var(--lpu-orange)',
                              color: index === schoolCourses.length - 1 ? '#999' : 'var(--lpu-black)',
                              border: 'none',
                              borderRadius: '4px',
                              width: '28px',
                              height: '24px',
                              cursor: index === schoolCourses.length - 1 ? 'not-allowed' : 'pointer',
                              fontSize: '0.9rem',
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (index !== schoolCourses.length - 1) {
                                e.currentTarget.style.transform = 'scale(1.1)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(232, 185, 25, 0.4)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                            title="Move down"
                          >
                            ↓
                          </button>
                        </div>
                        <div style={{ 
                          background: 'var(--lpu-orange)', 
                          color: 'var(--lpu-black)', 
                          width: '28px', 
                          height: '28px', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontWeight: '700', 
                          fontSize: '0.85rem',
                          flexShrink: 0
                        }}>
                          {index + 1}
                        </div>
                        
                        {/* Inline Image Upload */}
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = async (event) => {
                              const file = event.target.files[0];
                              if (file) {
                                await handleInlineImageUpload(course._id, file);
                              }
                            };
                            input.click();
                          }}
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '2px solid #e0e0e0',
                            cursor: 'pointer',
                            flexShrink: 0,
                            position: 'relative',
                            background: course.cardImage ? 'transparent' : '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--lpu-orange)';
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#e0e0e0';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          {course.cardImage ? (
                            <>
                              <img 
                                src={course.cardImage} 
                                alt={course.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                              <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: '600'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                              onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                              >
                                📷 Change
                              </div>
                            </>
                          ) : (
                            <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#999', padding: '8px' }}>
                              <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>📷</div>
                              <div>Add Image</div>
                            </div>
                          )}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111' }}>
                            {course.icon} {course.title}
                            {course.specialisation && (
                              <span style={{ fontWeight: '500', color: '#666', fontSize: '0.9rem', marginLeft: '6px' }}>
                                ({course.specialisation})
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: '#666', marginTop: '4px', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none' }}>
                            {course.duration} · {course.mode || 'Full Time'}
                            {course.eligibility && <span> · {course.eligibility}</span>}
                            {course.slug && <span style={{ marginLeft: '8px', color: '#999' }}>/{course.slug}</span>}
                          </div>
                          {course.highlight && (
                            <div style={{ marginTop: '6px', display: 'inline-block', background: 'var(--lpu-orange)', color: 'var(--lpu-black)', padding: '3px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>
                              {course.highlight}
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleActive(course._id, course.isActive);
                          }}
                          className="btn"
                          style={{ 
                            padding: '7px 14px', 
                            fontSize: '0.82rem',
                            background: course.isActive ? '#28a745' : '#6c757d',
                            color: 'white',
                            border: 'none'
                          }}
                        >
                          {course.isActive ? '✓ Active' : '✕ Inactive'}
                        </button>
                        {course.slug && (
                          <Link href={`/courses/${course.slug}`} target="_blank" className="btn btn-black" style={{ padding: '7px 14px', fontSize: '0.82rem' }}>View</Link>
                        )}
                        <button onClick={() => handleEdit(course)} className="btn btn-orange" style={{ padding: '7px 14px', fontSize: '0.82rem' }}>Edit</button>
                        <button onClick={() => handleDelete(course._id)} className="btn btn-black" style={{ padding: '7px 14px', fontSize: '0.82rem', background: '#dc3545' }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}
