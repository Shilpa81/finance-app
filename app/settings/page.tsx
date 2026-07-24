'use client';

import { useState } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (k: keyof typeof form, v: string) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '' });
    } catch (e: any) {
      setStatus('error');
      setErrorMsg(e.message || 'Something went wrong. Please try again.');
    }
  };

  const reset = () => { setStatus('idle'); setErrorMsg(''); };

  return (
    <>
     <div className="cf-wrap">
        <div className="cf-card">

          <div className="cf-logo">
            <div className="cf-logo-icon">🏦</div>
            <span className="cf-logo-text">ProsperPath</span>
          </div>

          {/* ── Success state ── */}
          {status === 'success' ? (
            <div className="cf-success">
              <div className="cf-success-icon">✅</div>
              <div className="cf-success-title">We received your info!</div>
              <p className="cf-success-sub">
                Thank you, <strong style={{ color: '#c8d8f8' }}>{form.name || 'there'}</strong>.<br />
                A NAIN advisor will reach out to you shortly.
              </p>
              <button className="cf-success-btn" onClick={reset}>Submit another</button>
            </div>
          ) : (
            <>
              <h2 className="cf-title">Get in touch</h2>
              <p className="cf-sub">
                Fill in your details and a ProsperPath advisor will contact you about the right product for your needs.
              </p>

              {/* Name */}
              <div className="cf-field">
                <label className="cf-label">Full name <span>*</span></label>
                <input
                  className="cf-input"
                  type="text"
                  placeholder="John Smith"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  disabled={status === 'loading'}
                />
              </div>

              {/* Email */}
              <div className="cf-field">
                <label className="cf-label">Email address <span>*</span></label>
                <input
                  className="cf-input"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  disabled={status === 'loading'}
                />
              </div>

              {/* Phone */}
              <div className="cf-field">
                <label className="cf-label">Phone number <span style={{ color: '#3d5a99' }}>(optional)</span></label>
                <input
                  className="cf-input"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={e => update('phone', e.target.value)}
                  disabled={status === 'loading'}
                />
              </div>

              {/* Submit */}
              <button
                className="cf-btn"
                onClick={handleSubmit}
                disabled={status === 'loading' || !form.name.trim() || !form.email.trim()}
              >
                {status === 'loading' ? (
                  <><div className="cf-spinner" /> Sending…</>
                ) : (
                  'Send my details →'
                )}
              </button>

              {/* Error */}
              {status === 'error' && (
                <div className="cf-error">⚠️ {errorMsg}</div>
              )}
            </>
          )}

        </div>
      </div>
    </>
  );
}