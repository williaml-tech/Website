'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type ContactForm = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialForm: ContactForm = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

const ContactPage: React.FC = () => {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const API_ENDPOINT = '/api/kliniksheets-direct';

  const setField = (key: keyof ContactForm, value: ContactForm[typeof key]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = 'Please enter your full name.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email.';
    if (form.phone && !/^[+\d][\d\s()-]{6,}$/.test(form.phone)) next.phone = 'Please enter a valid phone number.';
    if (!form.subject.trim()) next.subject = 'Please enter a subject.';
    if (!form.message.trim()) next.message = 'Please enter your message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      const payload = {
        action: 'submit_contact',
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message
      };
      const resp = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if (data?.success) {
        setSubmitted(true);
        setForm(initialForm);
      } else {
        setErrors(prev => ({ ...prev, submit: data?.error || 'Failed to send. Please try again.' }));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="contact-section">
          <div className="container">
            <div className="section-header">
              <div className="title-container">
                <span className="section-subtitle">We&#39;d love to hear from you</span>
                <h1 className="section-title">Contact us</h1>
                <div className="title-decoration">
                  <div className="decoration-line"></div>
                  <div className="decoration-dot"></div>
                  <div className="decoration-line"></div>
                </div>
              </div>
              <p className="section-description">Send us a message and our team will reach out soon.</p>
            </div>

            <div className="content-grid">
              <div className="card">
                {submitted ? (
                  <div className="success" role="status" aria-live="polite">
                    <h2>Message sent</h2>
                <p>Thanks for contacting us. We&#39;ll reply as soon as possible.</p>
                    <button className="btn-primary" onClick={() => setSubmitted(false)}>Send another</button>
                  </div>
                ) : (
                  <form className="form" onSubmit={onSubmit} noValidate>
                    <div className="grid">
                      <div className="field">
                        <label htmlFor="fullName">Full name</label>
                        <input id="fullName" name="fullName" type="text" autoComplete="name" value={form.fullName} onChange={(e) => setField('fullName', e.target.value)} aria-invalid={!!errors.fullName} />
                        {errors.fullName && <span className="error">{errors.fullName}</span>}
                      </div>
                      <div className="field">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={(e) => setField('email', e.target.value)} aria-invalid={!!errors.email} />
                        {errors.email && <span className="error">{errors.email}</span>}
                      </div>
                      <div className="field">
                        <label htmlFor="phone">Phone (optional)</label>
                        <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setField('phone', e.target.value)} aria-invalid={!!errors.phone} />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                      </div>
                      <div className="field field-full">
                        <label htmlFor="subject">Subject</label>
                        <input id="subject" name="subject" type="text" value={form.subject} onChange={(e) => setField('subject', e.target.value)} aria-invalid={!!errors.subject} />
                        {errors.subject && <span className="error">{errors.subject}</span>}
                      </div>
                      <div className="field field-full">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows={5} value={form.message} onChange={(e) => setField('message', e.target.value)} aria-invalid={!!errors.message} />
                        {errors.message && <span className="error">{errors.message}</span>}
                      </div>
                    </div>
                    <div className="actions">
                      <button type="submit" className="btn-primary" disabled={submitting} aria-busy={submitting}>
                        {submitting ? 'Sending…' : 'Send message'}
                      </button>
                    </div>
                    {errors.submit && <div className="form-error" role="alert">{errors.submit}</div>}
                  </form>
                )}
              </div>

              <div className="card info">
                <div className="info-item">
                  <div className="info-label">Email</div>
                  <a href="mailto:info@klinikka.com.au" className="info-value">info@klinikka.com.au</a>
                </div>
                <div className="info-item">
                  <div className="info-label">Phone</div>
                  <a href="tel:0299558181" className="info-value">(02) 9955 8181</a>
                </div>
                <div className="info-item">
                  <div className="info-label">Location</div>
                  <a 
                    href="https://www.google.com/maps/place/Klinik.KA+Aesthetic+Clinic/@-33.8738672,151.1858662,15z/data=!4m10!1m2!2m1!1sLevel+10+%2F+503%2F505+Kent+St+Sydney+NSW+2000!3m6!1s0x6b12af34c4e0550f:0x771b5ff5ba4ed521!8m2!3d-33.8738672!4d151.2049206!15sCipMZXZlbCAxMCAvIDUwMy81MDUgS2VudCBTdCBTeWRuZXkgTlNXIDIwMDCSARBza2luX2NhcmVfY2xpbmljqgFjEAEqECIMbGV2ZWwgMTAgNTAzKAAyHxABIhuYzYSz5CIAQcBu91p6LvXYj6LlrLl6VxRg_YQyLBACIihsZXZlbCAxMCA1MDMgNTA1IGtlbnQgc3Qgc3lkbmV5IG5zdyAyMDAw4AEA!16s%2Fg%2F11xzvmbvnk?hl=en-GB&entry=ttu&g_ep=EgoyMDI1MTAwNy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-value hover:underline"
                  >
                    Level 10 / 503 - 505 Kent St, Sydney, NSW, 2000
                  </a>
                </div>
                <div className="map-embed">
                  <iframe
                    title="Map - Klinik.KA Aesthetic Clinic, Level 10 / 503 - 505 Kent St, Sydney, NSW, 2000"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.5!2d151.2049206!3d-33.8738672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12af34c4e0550f%3A0x771b5ff5ba4ed521!2sKlinik.KA%20Aesthetic%20Clinic!5e0!3m2!1sen!2sau!4v1699123456789!5m2!1sen!2sau"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            .contact-section { background: linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.96) 100%); padding: 6.5rem 0 5.5rem 0; position: relative; }
            .contact-section::before { content: ''; position: absolute; inset: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="%23e2e8f0" opacity="0.3"/><circle cx="30" cy="30" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="50" cy="20" r="0.4" fill="%23e2e8f0" opacity="0.25"/><circle cx="70" cy="60" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="90" cy="40" r="0.5" fill="%23e2e8f0" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>'); pointer-events: none; }
            @media (min-width: 769px) { .contact-section { padding-top: 8rem; } }
            .container { max-width: 1000px; margin: 0 auto; padding: 0 1rem; }

            .section-header { text-align: center; margin-bottom: 2rem; max-width: 820px; margin-left: auto; margin-right: auto; }
            .title-container { margin-bottom: 1.25rem; }
            .section-subtitle { display: inline-block; font-size: 0.82rem; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: #8B7D6B; background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.55rem; }
            .section-title { font-size: 2.2rem; font-weight: 300; color: #3A3429; letter-spacing: -0.025em; line-height: 1.1; margin-bottom: 0.75rem; }
            .title-decoration { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1.1rem; }
            .decoration-line { width: 60px; height: 1px; background: linear-gradient(90deg, transparent 0%, #D4C4B0 50%, transparent 100%); }
            .decoration-dot { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%); position: relative; }
            .decoration-dot::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; border: 1px solid rgba(139,125,107,0.2); border-radius: 50%; animation: pulse 2s infinite; }
            @keyframes pulse { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1);} 100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5);} }
            .section-description { font-size: 1.02rem; color: #5A4F3A; line-height: 1.85; max-width: 560px; margin: 0 auto; }

            .content-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
            @media (min-width: 992px) { .content-grid { grid-template-columns: 1.2fr 0.8fr; } }

            .card { background: #FBF7F0; border: 1px solid rgba(212,196,176,0.45); border-radius: 12px; padding: 1.25rem; box-shadow: 0 8px 26px rgba(0,0,0,0.05); }
            @media (min-width: 768px) { .card { padding: 1.5rem; } }

            .form .grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
            @media (min-width: 768px) { .form .grid { grid-template-columns: 1fr 1fr; } }
            .field-full { grid-column: 1 / -1; }

            .field label { display: block; font-weight: 600; color: #374151; margin-bottom: 0.4rem; }
            .field input, .field select, .field textarea { width: 100%; border: 1px solid #E5E7EB; border-radius: 3px; padding: 0.65rem 0.75rem; background: #F9FAFB; color: #111827; transition: border-color .15s ease, background .15s ease, box-shadow .15s ease; }
            .field input:focus, .field select:focus, .field textarea:focus { outline: none; border-color: #D1D5DB; background: #FFFFFF; box-shadow: 0 0 0 3px rgba(209,213,219,0.35); }
            .field .error { display: block; color: #B91C1C; font-size: 0.85rem; margin-top: 0.35rem; }

            .actions { display: flex; justify-content: flex-end; margin-top: 0.75rem; }
            .btn-primary { display: inline-block; padding: 0.7rem 1.25rem; border-radius: 999px; color: #ffffff; font-weight: 700; font-size: 0.9rem; text-decoration: none; background: linear-gradient(135deg, #8B7D6B, #C4A484); border: 1px solid rgba(139,125,107,0.35); box-shadow: 0 8px 20px rgba(139,125,107,0.35); transition: transform .15s ease, box-shadow .15s ease, filter .15s ease; }
            .btn-primary:hover { filter: brightness(1.05); transform: translateY(-1px); box-shadow: 0 10px 24px rgba(139,125,107,0.42); }
            .btn-primary[disabled] { opacity: .75; cursor: not-allowed; transform: none; box-shadow: none; }

            .info { display: grid; gap: 1rem; }
            .info-item { display: grid; grid-template-columns: 110px 1fr; align-items: center; gap: 0.5rem; }
            .info-label { color: #6b7280; font-weight: 600; }
            .info-value { color: #1f2937; }
            .map-embed { height: 220px; border-radius: 3px; overflow: hidden; border: 1px solid #E6E0D8; }
            .map-embed iframe { width: 100%; height: 100%; border: 0; display: block; }
            
            .success { text-align: center; }
            .success h2 { font-size: 1.2rem; font-weight: 700; color: #111827; margin-bottom: 0.35rem; }
            .success p { color: #4b5563; margin-bottom: 0.8rem; }
          `}</style>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;


