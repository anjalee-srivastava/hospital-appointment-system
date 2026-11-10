import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Appointment } from '../types';
import Navbar from '../components/Navbar';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/appointments/my')
      .then(res => setAppointments(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statusColor: { [key: string]: string } = {
    PENDING: '#f39c12', CONFIRMED: '#27ae60', CANCELLED: '#e74c3c', COMPLETED: '#3498db'
  };

  const handleCancel = async (id: number) => {
    if (window.confirm('Cancel this appointment?')) {
      await API.delete(`/appointments/${id}`);
      setAppointments(appointments.map(a => a.id === id ? {...a, status: 'CANCELLED'} : a));
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.welcome}>
          <h2>Welcome back, {user?.fullName}! 👋</h2>
          <p style={{color: '#666', margin: '4px 0 0'}}>Manage your appointments</p>
        </div>

        <div style={styles.stats}>
          {[
            { label: 'Total', count: appointments.length, color: '#667eea' },
            { label: 'Pending', count: appointments.filter(a => a.status === 'PENDING').length, color: '#f39c12' },
            { label: 'Confirmed', count: appointments.filter(a => a.status === 'CONFIRMED').length, color: '#27ae60' },
            { label: 'Completed', count: appointments.filter(a => a.status === 'COMPLETED').length, color: '#3498db' },
          ].map(stat => (
            <div key={stat.label} style={{...styles.statCard, borderTop: `4px solid ${stat.color}`}}>
              <h3 style={{margin: 0, color: stat.color, fontSize: '32px'}}>{stat.count}</h3>
              <p style={{margin: '4px 0 0', color: '#666', fontSize: '14px'}}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={{margin: 0}}>My Appointments</h3>
            <Link to="/book" style={styles.bookBtn}>+ Book New</Link>
          </div>

          {loading ? <p>Loading...</p> : appointments.length === 0 ? (
            <div style={styles.empty}>
              <p style={{fontSize: '48px', margin: 0}}>📅</p>
              <p>No appointments yet. <Link to="/book">Book your first appointment!</Link></p>
            </div>
          ) : (
            <div>
              {appointments.map(apt => (
                <div key={apt.id} style={styles.appointmentCard}>
                  <div style={styles.aptLeft}>
                    <h4 style={{margin: '0 0 4px'}}>{apt.doctor?.name}</h4>
                    <p style={{margin: '0 0 4px', color: '#667eea', fontSize: '14px'}}>{apt.doctor?.specialization}</p>
                    <p style={{margin: 0, color: '#666', fontSize: '13px'}}>
                      📅 {new Date(apt.appointmentDateTime).toLocaleDateString('en-IN', {
                        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                    {apt.reason && <p style={{margin: '4px 0 0', color: '#888', fontSize: '13px'}}>Reason: {apt.reason}</p>}
                  </div>
                  <div style={styles.aptRight}>
                    <span style={{...styles.badge, background: statusColor[apt.status]}}>{apt.status}</span>
                    {apt.status === 'PENDING' && (
                      <button onClick={() => handleCancel(apt.id)} style={styles.cancelBtn}>Cancel</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: { minHeight: '100vh', background: '#f5f7fb' },
  container: { maxWidth: '900px', margin: '0 auto', padding: '30px 20px' },
  welcome: { marginBottom: '30px' },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '30px' },
  statCard: { background: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  section: { background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  bookBtn: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' },
  empty: { textAlign: 'center', padding: '40px', color: '#888' },
  appointmentCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #e1e5eb', borderRadius: '10px', marginBottom: '12px' },
  aptLeft: { flex: 1 },
  aptRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' },
  badge: { color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  cancelBtn: { background: 'none', border: '1px solid #e74c3c', color: '#e74c3c', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
};

export default Dashboard;
