import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function submit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      await login(email, password);
      const dest = location.state?.from?.pathname || '/admin';
      navigate(dest, { replace: true });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Login failed');
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--color-forest-deep)', padding: '1.5rem',
    }}>
      <div style={{ width: '100%', maxWidth: 400, background: 'var(--color-cream)', padding: '2.5rem', border: '1px solid var(--color-border)' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <Logo />
        </div>
        <h4 style={{ textAlign: 'center', marginBottom: '0.4rem' }}>Staff sign in</h4>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.8rem' }}>
          Admin panel access only.
        </p>

        {status === 'error' && <div className="notice notice--error">{errorMsg}</div>}

        <form onSubmit={submit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={status === 'submitting'} style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
            {status === 'submitting' ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
