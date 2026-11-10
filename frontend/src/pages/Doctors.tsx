import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { Doctor } from '../types';
import Navbar from '../components/Navbar';

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    API.get('/doctors').then(res => setDoctors(res.data));
  }, []);

  const specializations = Array.from(new Set(doctors.map(d => d.specialization)));
  const filtered = filter ? doctors.filter(d => d.specialization === filter) : doctors;

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={{margin: 0}}>Our Doctors</h2>
          <select style={styles.select} onChange={e => setFilter(e.target.value)} value={filter}>
            <option value="">All Specializations</option>
            {specializations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={styles.grid}>
          {filtered.map(doc => (
            <div key={doc.id} style={styles.card}>
              <div style={styles.avatar}>{doc.name.charAt(0)}</div>
              <h3 style={styles.name}>{doc.name}</h3>
              <p style={styles.spec}>{doc.specialization}</p>
              <p style={styles.qual}>{doc.qualification} • {doc.experienceYears} yrs exp</p>
              <p style={styles.bio}>{doc.bio}</p>
              <div style={styles.cardFooter}>
                <span style={{...styles.badge, background: doc.available ? '#27ae60' : '#e74c3c'}}>
                  {doc.available ? '✓ Available' : '✗ Unavailable'}
                </span>
                {doc.available && (
                  <Link to="/book" style={styles.bookBtn}>Book Now</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: { minHeight: '100vh', background: '#f5f7fb' },
  container: { maxWidth: '1100px', margin: '0 auto', padding: '30px 20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' },
  select: { padding: '10px 16px', border: '2px solid #e1e5eb', borderRadius: '8px', fontSize: '14px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
  card: { background: 'white', borderRadius: '16px', padding: '28px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', transition: 'transform 0.2s' },
  avatar: { width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '700', margin: '0 auto 16px' },
  name: { margin: '0 0 6px', color: '#333', fontSize: '18px' },
  spec: { margin: '0 0 4px', color: '#667eea', fontWeight: '600', fontSize: '14px' },
  qual: { margin: '0 0 12px', color: '#888', fontSize: '13px' },
  bio: { margin: '0 0 20px', color: '#666', fontSize: '13px', lineHeight: '1.5' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  badge: { color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  bookBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '8px 18px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' },
};

export default Doctors;
