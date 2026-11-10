import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/dashboard" style={styles.brand}>🏥 MediBook</Link>
      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/book" style={styles.link}>Book Appointment</Link>
        <Link to="/doctors" style={styles.link}>Doctors</Link>
      </div>
      <div style={styles.user}>
        <span style={styles.username}>👤 {user?.fullName}</span>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  nav: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' },
  brand: { color: 'white', textDecoration: 'none', fontWeight: '700', fontSize: '20px' },
  links: { display: 'flex', gap: '24px' },
  link: { color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '15px', fontWeight: '500' },
  user: { display: 'flex', alignItems: 'center', gap: '16px' },
  username: { color: 'rgba(255,255,255,0.9)', fontSize: '14px' },
  logoutBtn: { background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
};

export default Navbar;
