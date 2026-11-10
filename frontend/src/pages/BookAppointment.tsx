import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { Doctor } from '../types';
import Navbar from '../components/Navbar';

const BookAppointment: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [form, setForm] = useState({ doctorId: '', appointmentDateTime: '', reason: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/doctors/available').then(res => setDoctors(res.data));
  }, []);

  const specializations = Array.from(new Set(doctors.map(d => d.specialization)));
  const filteredDoctors = filter ? doctors.filter(d => d.specialization === filter) : doctors;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/appointments', {
        doctorId: parseInt(form.doctorId),
        appointmentDateTime: form.appointmentDateTime,
        reason: form.reason,
      });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.successContainer}>
        <div style={styles.successCard}>
          <p style={{fontSize: '64px', margin: 0}}>✅</p>
          <h2>Appointment Booked!</h2>
          <p style={{color: '#666'}}>Redirecting to dashboard...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={{marginBottom: '24px'}}>Book an Appointment</h2>

        <div style={styles.grid}>
          {/* Doctor Selection */}
          <div style={styles.leftPanel}>
            <h3 style={{marginTop: 0}}>Choose a Doctor</h3>
            <select style={styles.select} onChange={e => setFilter(e.target.value)} value={filter}>
              <option value="">All Specializations</option>
              {specializations.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <div style={styles.doctorList}>
              {filteredDoctors.map(doc => (
                <div
                  key={doc.id}
                  style={{...styles.doctorCard, ...(selectedDoctor?.id === doc.id ? styles.selected : {})}}
                  onClick={() => { setSelectedDoctor(doc); setForm({...form, doctorId: doc.id.toString()}); }}
                >
                  <div style={styles.doctorAvatar}>{doc.name.charAt(0)}</div>
                  <div>
                    <h4 style={{margin: '0 0 4px'}}>{doc.name}</h4>
                    <p style={{margin: '0 0 2px', color: '#667eea', fontSize: '13px'}}>{doc.specialization}</p>
                    <p style={{margin: 0, color: '#888', fontSize: '12px'}}>{doc.experienceYears} years exp • {doc.qualification}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div style={styles.rightPanel}>
            <h3 style={{marginTop: 0}}>Appointment Details</h3>
            {selectedDoctor && (
              <div style={styles.selectedDoc}>
                <p style={{margin: '0 0 4px', fontWeight: '600'}}>{selectedDoctor.name}</p>
                <p style={{margin: 0, color: '#667eea', fontSize: '14px'}}>{selectedDoctor.specialization}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={styles.field}>
                <label style={styles.label}>Date & Time</label>
                <input
                  style={styles.input}
                  type="datetime-local"
                  value={form.appointmentDateTime}
                  onChange={e => setForm({...form, appointmentDateTime: e.target.value})}
                  min={new Date().toISOString().slice(0, 16)}
                  required
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Reason for Visit</label>
                <textarea
                  style={{...styles.input, height: '100px', resize: 'vertical'}}
                  placeholder="Describe your symptoms or reason..."
                  value={form.reason}
                  onChange={e => setForm({...form, reason: e.target.value})}
                  required
                />
              </div>
              <button
                style={{...styles.button, opacity: (!form.doctorId || loading) ? 0.6 : 1}}
                type="submit"
                disabled={!form.doctorId || loading}
              >
                {loading ? 'Booking...' : '📅 Confirm Appointment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: { minHeight: '100vh', background: '#f5f7fb' },
  container: { maxWidth: '1000px', margin: '0 auto', padding: '30px 20px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  leftPanel: { background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  rightPanel: { background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  select: { width: '100%', padding: '10px', border: '2px solid #e1e5eb', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' },
  doctorList: { maxHeight: '400px', overflowY: 'auto' },
  doctorCard: { display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', borderRadius: '10px', cursor: 'pointer', marginBottom: '8px', border: '2px solid transparent', transition: 'all 0.2s' },
  selected: { border: '2px solid #667eea', background: '#f0f2ff' },
  doctorAvatar: { width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '18px', flexShrink: 0 },
  selectedDoc: { background: '#f0f2ff', border: '2px solid #667eea', borderRadius: '10px', padding: '12px', marginBottom: '20px' },
  field: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '6px', color: '#555', fontWeight: '600', fontSize: '14px' },
  input: { width: '100%', padding: '12px', border: '2px solid #e1e5eb', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  successContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' },
  successCard: { background: 'white', borderRadius: '16px', padding: '60px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' },
};

export default BookAppointment;
