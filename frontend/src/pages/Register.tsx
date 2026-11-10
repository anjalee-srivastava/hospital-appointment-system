import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '', email: '', fullName: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/auth/register', form);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.logo}>🏥</h1>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join MediBook today</p>
        </div>
        <form onSubmit={handleSubmit}>
          {['fullName', 'username', 'email', 'password'].map((field) => (
            <div style={styles.field} key={field}>
              <label style={styles.label}>{field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                style={styles.input}
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                placeholder={`Enter your ${field === 'fullName' ? 'full name' : field}`}
                value={(form as any)[field]}
                onChange={e => setForm({...form, [field]: e.target.value})}
                required
              />
            </div>
          ))}
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={styles.link}>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  card: { background: 'white', borderRadius: '16px', padding: '40px', width: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  header: { textAlign: 'center', marginBottom: '30px' },
  logo: { fontSize: '48px', margin: 0 },
  title: { margin: '8px 0 4px', color: '#333', fontSize: '28px' },
  subtitle: { color: '#666', margin: 0, fontSize: '14px' },
  field: { marginBottom: '16px' },
  label: { display: 'block', marginBottom: '6px', color: '#555', fontWeight: '600', fontSize: '14px' },
  input: { width: '100%', padding: '12px', border: '2px solid #e1e5eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' },
  error: { color: '#e74c3c', textAlign: 'center', fontSize: '14px' },
  success: { color: '#27ae60', textAlign: 'center', fontSize: '14px' },
  link: { textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' },
};

export default Register;
