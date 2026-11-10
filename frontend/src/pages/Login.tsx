import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login', form);
      login(res.data);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.logo}>🏥</h1>
          <h2 style={styles.title}>MediBook</h2>
          <p style={styles.subtitle}>Hospital Appointment System</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={e => setForm({...form, username: e.target.value})}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              required
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={styles.registerLink}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        <div style={styles.demo}>
          <p style={{margin: 0, fontSize: '12px', color: '#666'}}>Demo credentials:</p>
          <p style={{margin: '4px 0', fontSize: '12px'}}>Patient: <b>patient1 / patient123</b></p>
          <p style={{margin: 0, fontSize: '12px'}}>Admin: <b>admin / admin123</b></p>
        </div>
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
  field: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '6px', color: '#555', fontWeight: '600', fontSize: '14px' },
  input: { width: '100%', padding: '12px', border: '2px solid #e1e5eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box', outline: 'none' },
  button: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  error: { color: '#e74c3c', textAlign: 'center', marginBottom: '16px', fontSize: '14px' },
  registerLink: { textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' },
  demo: { marginTop: '20px', padding: '12px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' },
};

export default Login;
