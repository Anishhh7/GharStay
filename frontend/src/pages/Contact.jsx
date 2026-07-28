import { useState } from 'react';
import PageHero from '../components/PageHero';
import { contact } from '../api/resources';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await contact.send(form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  }

  return (
    <>
      <PageHero eyebrow="Get in touch" title="Contact" text="Questions about a stay, a package, or a private event — the front desk answers directly." photoId="villaExterior" />
      <section className="section">
        <div className="container intro-split" style={{ alignItems: 'start' }}>
          <div>
            <h4>Send a message</h4>
            <form onSubmit={submit} style={{ marginTop: 'var(--sp-3)' }}>
              {status === 'success' && <div className="notice notice--success">Thanks — the team will reply within a day.</div>}
              {status === 'error' && <div className="notice notice--error">{errorMsg}</div>}
              <div className="two-col-form">
                <div className="form-field">
                  <label htmlFor="c-name">Name</label>
                  <input id="c-name" required value={form.name} onChange={update('name')} />
                </div>
                <div className="form-field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" type="email" required value={form.email} onChange={update('email')} />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="c-phone">Phone (optional)</label>
                <input id="c-phone" value={form.phone} onChange={update('phone')} />
              </div>
              <div className="form-field">
                <label htmlFor="c-message">Message</label>
                <textarea id="c-message" rows="5" required value={form.message} onChange={update('message')} />
              </div>
              <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </div>

          <div>
            <h4>Visit</h4>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.8rem', lineHeight: 1.9 }}>
              Kalap Village Road<br />Himal Valley, 44600<br /><br />
              +977 1 555 0142<br />
              stay@gharstay.com<br /><br />
              Front desk: 7am – 9pm daily
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
