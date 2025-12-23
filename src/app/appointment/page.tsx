'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import concerns from '@/data/concerns.json';

// Regex constants
const AU_PHONE_REGEX = /^(\+61|0)[2-478]\d{8}$/;

// Minimal form state for intake
type FormState = {
  // legacy fields (kept for compatibility)
  fullName: string;
  preferredDate: string;
  preferredTime: string;
  concern: string;
  message: string;
  // new intake fields
  firstName: string;
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
  concerns: string[];
  enquiries: string;
  isFirstTime: boolean;
  durationMinutes: string;
  // appointment booking fields
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:MM
  // shared
  email: string;
  phone: string;
  agree: boolean;
};

const initialForm: FormState = {
  // legacy
  fullName: '',
  preferredDate: '',
  preferredTime: '',
  concern: '',
  message: '',
  // new intake
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  concerns: [],
  enquiries: '',
  isFirstTime: false,
  durationMinutes: '',
  // appointment booking
  appointmentDate: '',
  appointmentTime: '',
  // shared
  email: '',
  phone: '',
  agree: false,
};

// removed DOB requirement

// API endpoint
const API_ENDPOINT = '/api/kliniksheets-direct';

const MakeAppointmentPage: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasSelectedFirstTime, setHasSelectedFirstTime] = useState(false);
  
  // Available dates and times
  const [availableDates, setAvailableDates] = useState<Array<{ date: string; hasSlots: boolean; slotCount: number }>>([]);
  const [availableTimes, setAvailableTimes] = useState<Array<{ start: string; end: string; value: string }>>([]);
  const [loadingDates, setLoadingDates] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);
  
  // Refs for immediate refocus on invalid blur
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const onBlurValidate = (field: keyof FormState) => (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const next: Record<string, string> = { ...errors };
    if (field === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        next.email = 'Please enter a valid email address.';
        setErrors(next);
        // refocus to field
        emailRef.current?.focus();
        return;
      } else {
        next.email = '';
      }
    }
    if (field === 'phone') {
      if (!AU_PHONE_REGEX.test(val.replace(/\s+/g, ''))) {
        next.phone = 'Please enter a valid AU phone number (+61 or 0...).';
        setErrors(next);
        phoneRef.current?.focus();
        return;
      } else {
        next.phone = '';
      }
    }
    setErrors(next);
  };
  const [isFormValid, setIsFormValid] = useState(false);
  
  // const todayStr = getLocalTodayString();
  // intake only (no slots)

  const computeIsValid = React.useCallback((): boolean => {
    return !!(
      form.firstName.trim() &&
      form.lastName.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      AU_PHONE_REGEX.test(form.phone.replace(/\s+/g, '')) &&
      form.concerns.length > 0 &&
      (!form.durationMinutes || /^\d{1,3}$/.test(form.durationMinutes)) &&
      form.appointmentDate &&
      form.appointmentTime &&
      form.agree
    );
  }, [form]);

  // Real-time form validation
  useEffect(() => {
    setIsFormValid(computeIsValid());
  }, [form, computeIsValid]);

  // Scroll to title after successful submit
  useEffect(() => {
    if (submitted) {
      titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [submitted]);

  // Function to fetch available dates (reusable)
  const fetchAvailableDates = React.useCallback(() => {
    if (form.durationMinutes && /^\d{1,3}$/.test(form.durationMinutes)) {
      setLoadingDates(true);
      fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        cache: 'no-store', // Disable Next.js fetch cache
        body: JSON.stringify({ 
          action: 'get_available_dates', 
          weeks: 4,
          _t: Date.now() // Add timestamp to prevent caching
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setAvailableDates(data.dates || []);
          } else {
            console.error('Failed to fetch available dates:', data.error);
            setAvailableDates([]);
          }
        })
        .catch(err => {
          console.error('Error fetching available dates:', err);
          setAvailableDates([]);
        })
        .finally(() => setLoadingDates(false));
    } else {
      setAvailableDates([]);
      setForm(prev => ({ ...prev, appointmentDate: '', appointmentTime: '' }));
      setAvailableTimes([]);
    }
  }, [form.durationMinutes]);

  // Fetch available dates when duration is selected
  useEffect(() => {
    fetchAvailableDates();
  }, [fetchAvailableDates]);

  // Fetch available times when date is selected
  useEffect(() => {
    if (form.appointmentDate) {
      setLoadingTimes(true);
      fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        cache: 'no-store', // Disable Next.js fetch cache
        body: JSON.stringify({ 
          action: 'day_availability', 
          date: form.appointmentDate,
          _t: Date.now() // Add timestamp to prevent caching
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setAvailableTimes(data.slots || []);
            // Clear any previous 24-hour error
            setErrors(prev => {
              if (prev.appointmentDate && prev.appointmentDate.includes('24 hours')) {
                const next = { ...prev };
                delete next.appointmentDate;
                return next;
              }
              return prev;
            });
          } else {
            console.error('Failed to fetch available times:', data.error);
            setAvailableTimes([]);
            // If error is about 24 hours, set it in errors
            if (data.error && data.error.includes('24 hours')) {
              setErrors(prev => ({ ...prev, appointmentDate: data.error }));
              setForm(prev => ({ ...prev, appointmentTime: '' }));
            }
          }
        })
        .catch(err => {
          console.error('Error fetching available times:', err);
          setAvailableTimes([]);
        })
        .finally(() => setLoadingTimes(false));
    } else {
      setAvailableTimes([]);
      setForm(prev => ({ ...prev, appointmentTime: '' }));
    }
  }, [form.appointmentDate]);

  const setField = (key: keyof FormState, value: FormState[typeof key]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  // Intake form: no availability probing needed

  // Real-time validation function (kept inline via computeIsValid)

  // no slots function for intake

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.firstName.trim()) next.firstName = 'Please enter your first name.';
    if (!form.lastName.trim()) next.lastName = 'Please enter your last name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email address.';
    if (!AU_PHONE_REGEX.test(form.phone.replace(/\s+/g, ''))) next.phone = 'Please enter a valid AU phone number (+61 or 0...).';
    if (!form.concerns || form.concerns.length === 0) next.concerns = 'Please select at least one concern.';
    if (!hasSelectedFirstTime) next.isFirstTime = 'Please choose Yes or No.';
    if (!form.appointmentDate) next.appointmentDate = 'Please select an appointment date.';
    if (!form.appointmentTime) next.appointmentTime = 'Please select an appointment time.';
    
    // Validate 24-hour advance booking requirement
    if (form.appointmentDate && form.appointmentTime) {
      const now = new Date();
      const minBookingTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
      const appointmentDate = new Date(form.appointmentDate);
      const [hours, minutes] = form.appointmentTime.split(':').map(Number);
      appointmentDate.setHours(hours || 10, minutes || 0, 0, 0);
      
      if (appointmentDate < minBookingTime) {
        next.appointmentDate = 'Appointments must be booked at least 24 hours in advance. Please select a later date and time.';
      }
    }
    
    if (!form.agree) next.agree = 'Please agree to our privacy policy.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      setSubmitting(true);
      
      // Submit appointment booking
      try {
        const concernsStr = form.concerns.join('; ');
        const customerName = `${form.firstName} ${form.lastName}`;
        const message = `Intake Info:\n- First Time: ${form.isFirstTime ? 'Yes' : 'No'}\n- Duration: ${form.durationMinutes || 'N/A'} minutes\n- Concerns: ${concernsStr}\n- Enquiries: ${form.enquiries || 'None'}`;
        
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'book_appointment',
            customer_name: customerName,
            customer_email: form.email,
            customer_phone: form.phone,
            appointment_date: form.appointmentDate,
            appointment_time: form.appointmentTime,
            concern: concernsStr,
            message: message
          })
        });
        
        const data = await response.json();
        if (data.success) {
          setSubmitted(true);
          setForm(initialForm);
          setHasSelectedFirstTime(false);
          // Clear available dates and times - they will be refetched when user selects duration again
          setAvailableDates([]);
          setAvailableTimes([]);
          return;
        }
        setErrors({ submit: data.error || 'Failed to submit. Please try again.' });
        return;
      } catch (apiError) {
        console.error('Appointment API error:', apiError);
        setErrors({ submit: 'Submit failed. Please try again.' });
        return;
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Helper: format date to yyyy-mm-dd (left for future use)
  // const toISODate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="appointment-section">
          <div className="container">
            <div className="section-header">
              <div className="title-container">
                <span className="section-subtitle">Book Your Visit</span>
                <h1 ref={titleRef} className="section-title">Make an Appointment</h1>
                <div className="title-decoration">
                  <div className="decoration-line"></div>
                  <div className="decoration-dot"></div>
                  <div className="decoration-line"></div>
                </div>
              </div>
              <p className="section-description">Please fill in the form below and we’ll contact you shortly.</p>
            </div>

            {submitted ? (
              <div ref={successRef} className="success-container" role="status" aria-live="polite">
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#10B981" stroke="#10B981" strokeWidth="2"/>
                    <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="success-title">Submitted Successfully!</h2>
                <p className="success-message">Thank you. Our team will contact you shortly.</p>
                <div className="success-info">
                  <p>📞 Our team will contact you within 24 hours to confirm the details.</p>
                </div>
                <button className="btn-secondary" onClick={() => {
                  setSubmitted(false);
                }}>
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form className="form" onSubmit={onSubmit} noValidate>
                <div className="form-header">
                  <h3>Personal Information</h3>
                  <p>Please provide your contact details</p>
                </div>
                
                <div className="form-section">
                  <div className="grid">
                    <div className="field">
                      <label htmlFor="firstName" className={errors.firstName ? 'error-label' : ''}>
                        First Name <span className="required">*</span>
                      </label>
                      <input 
                        id="firstName" 
                        name="firstName" 
                        type="text" 
                        autoComplete="given-name" 
                        value={form.firstName} 
                        onChange={(e) => setField('firstName', e.target.value)} 
                        aria-invalid={!!errors.firstName}
                        className={errors.firstName ? 'error-input' : ''}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>

                    <div className="field">
                      <label htmlFor="lastName" className={errors.lastName ? 'error-label' : ''}>
                        Last Name <span className="required">*</span>
                      </label>
                      <input 
                        id="lastName" 
                        name="lastName" 
                        type="text" 
                        autoComplete="family-name" 
                        value={form.lastName} 
                        onChange={(e) => setField('lastName', e.target.value)} 
                        aria-invalid={!!errors.lastName}
                        className={errors.lastName ? 'error-input' : ''}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>

                    <div className="field">
                      <label htmlFor="email" className={errors.email ? 'error-label' : ''}>
                        Email Address <span className="required">*</span>
                      </label>
                      <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        autoComplete="email" 
                        value={form.email} 
                        ref={emailRef}
                        onBlur={onBlurValidate('email')}
                        onChange={(e) => setField('email', e.target.value)} 
                        aria-invalid={!!errors.email}
                        className={errors.email ? 'error-input' : ''}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    
                    <div className="field">
                      <label htmlFor="phone" className={errors.phone ? 'error-label' : ''}>
                        Phone Number <span className="required">*</span>
                      </label>
                      <input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        autoComplete="tel" 
                        value={form.phone} 
                        ref={phoneRef}
                        onBlur={onBlurValidate('phone')}
                        onChange={(e) => setField('phone', e.target.value)} 
                        aria-invalid={!!errors.phone}
                        className={errors.phone ? 'error-input' : ''}
                        placeholder="(02) 9955 8181"
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                    

                    <div className="field">
                      <label className={`${errors.isFirstTime ? 'error-label' : ''}`}>
                        First Time Visit? <span className="required">*</span>
                      </label>
                      <div role="radiogroup" aria-label="First Time Visit" className="inline-options">
                        <label className="checkbox-item">
                          <input
                            type="radio"
                            name="isFirstTime"
                            value="yes"
                            checked={form.isFirstTime === true}
                            onChange={() => { setField('isFirstTime', true); setHasSelectedFirstTime(true); }}
                          />
                          <span>Yes, this is my first visit</span>
                        </label>
                        <label className="checkbox-item">
                          <input
                            type="radio"
                            name="isFirstTime"
                            value="no"
                            checked={form.isFirstTime === false && hasSelectedFirstTime}
                            onChange={() => { setField('isFirstTime', false); setHasSelectedFirstTime(true); }}
                          />
                          <span>No, I have visited before</span>
                        </label>
                      </div>
                      {errors.isFirstTime && <span className="error-message">{errors.isFirstTime}</span>}
                    </div>
                  </div>
                </div>
                <div className="form-header">
                  <h3>Concerns</h3>
                  <p>Select one or more concerns</p>
                </div>
                <div className="form-section">
                  <div className="grid">
                    <div className="field field-full">
                      <label className={errors.concerns ? 'error-label' : ''}>
                        Concerns <span className="required">*</span>
                      </label>
                      <div className="checkbox-group">
                        {concerns.map((c) => (
                          <label key={c.value} className="checkbox-item">
                            <input
                              type="checkbox"
                              checked={form.concerns.includes(c.value)}
                              onChange={(e) => {
                                const next = new Set(form.concerns);
                                if (e.target.checked) next.add(c.value); else next.delete(c.value);
                                setField('concerns', Array.from(next));
                              }}
                            />
                            <span>{c.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.concerns && <span className="error-message">{errors.concerns}</span>}
                    </div>
                  </div>
                </div>

                
                <div className="form-header">
                  <h3>Service Information</h3>
                  <p>Let us know the estimated time and any additional details</p>
                </div>
                <div className="form-section">
                  <div className="grid">
                    <div className="field">
                      <label htmlFor="duration">
                        Project Duration (minutes)
                      </label>
                      <input
                        id="duration"
                        name="duration"
                        type="number"
                        min={0}
                        inputMode="numeric"
                        placeholder="e.g. 30"
                        value={form.durationMinutes}
                        onChange={(e) => setField('durationMinutes', e.target.value.replace(/[^0-9]/g, ''))}
                      />
                      {Number(form.durationMinutes) > 45 && (
                        <div className="info-banner" role="status" aria-live="polite">
                          <span className="info-text">For durations over 45 minutes, a $50 deposit is required.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Appointment Date and Time Selection */}
                  {form.durationMinutes && /^\d{1,3}$/.test(form.durationMinutes) && (
                    <>
                      <div className="field field-full">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <label htmlFor="appointmentDate" className={errors.appointmentDate ? 'error-label' : ''} style={{ marginBottom: 0 }}>
                            Appointment Date <span className="required">*</span>
                          </label>
                          {form.durationMinutes && /^\d{1,3}$/.test(form.durationMinutes) && (
                            <button
                              type="button"
                              onClick={fetchAvailableDates}
                              disabled={loadingDates}
                              style={{
                                padding: '0.25rem 0.75rem',
                                fontSize: '0.85rem',
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                                cursor: loadingDates ? 'not-allowed' : 'pointer',
                                color: '#64748b',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                opacity: loadingDates ? 0.6 : 1
                              }}
                              title="Refresh available dates"
                            >
                              <span>🔄</span>
                              <span>Refresh</span>
                            </button>
                          )}
                        </div>
                        {loadingDates ? (
                          <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <span>Loading available dates...</span>
                          </div>
                        ) : availableDates.length > 0 ? (
                          <select
                            id="appointmentDate"
                            name="appointmentDate"
                            value={form.appointmentDate}
                            onChange={(e) => setField('appointmentDate', e.target.value)}
                            aria-invalid={!!errors.appointmentDate}
                            className={errors.appointmentDate ? 'error-input' : ''}
                          >
                            <option value="">Select a date</option>
                            {availableDates
                              .filter(d => d.hasSlots)
                              .map((d) => {
                                const date = new Date(d.date);
                                const dateStr = date.toLocaleDateString('en-AU', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
                                return (
                                  <option key={d.date} value={d.date}>
                                    {dateStr} ({d.slotCount} slots available)
                                  </option>
                                );
                              })}
                          </select>
                        ) : (
                          <div className="info-banner">
                            <span className="info-text">No available dates found. Please try a different duration or contact us directly.</span>
                          </div>
                        )}
                        {errors.appointmentDate && <span className="error-message">{errors.appointmentDate}</span>}
                      </div>

                      {form.appointmentDate && (
                        <div className="field field-full">
                          <label htmlFor="appointmentTime" className={errors.appointmentTime ? 'error-label' : ''}>
                            Appointment Time <span className="required">*</span>
                          </label>
                          {loadingTimes ? (
                            <div className="loading-container">
                              <div className="loading-spinner"></div>
                              <span>Loading available times...</span>
                            </div>
                          ) : availableTimes.length > 0 ? (
                            <div className="slots-grid">
                              {availableTimes.map((slot) => (
                                <button
                                  key={slot.value}
                                  type="button"
                                  className={`slot-btn ${form.appointmentTime === slot.value ? 'selected' : ''}`}
                                  onClick={() => setField('appointmentTime', slot.value)}
                                >
                                  {slot.value}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="info-banner">
                              <span className="info-text">No available times for this date. Please select another date.</span>
                            </div>
                          )}
                          {errors.appointmentTime && <span className="error-message">{errors.appointmentTime}</span>}
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="field field-full">
                    <label htmlFor="enquiries">Enquiries (Optional)</label>
                    <textarea 
                      id="enquiries" 
                      name="enquiries" 
                      rows={4} 
                      value={form.enquiries} 
                      onChange={(e) => setField('enquiries', e.target.value)}
                      placeholder="Share any additional information that might help us..."
                    />
                  </div>
                  
                  <div className="field field-full checkbox">
                    <label className={`checkbox-label ${errors.agree ? 'error-label' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={form.agree} 
                        onChange={(e) => setField('agree', e.target.checked)} 
                        className={errors.agree ? 'error-checkbox' : ''}
                      />
                      <span className="checkbox-text">
                        I agree to the <a href="/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a> and terms of service.
                        <span className="required">*</span>
                      </span>
                    </label>
                    {errors.agree && <span className="error-message">{errors.agree}</span>}
                  </div>
                </div>
                {errors.submit && (
                  <div className="submit-error">
                    <div className="error-icon">⚠️</div>
                    <span className="error-text">{errors.submit}</span>
                  </div>
                )}
                
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className={`btn-primary ${!isFormValid ? 'btn-disabled' : ''}`} 
                    disabled={submitting || !isFormValid} 
                    aria-busy={submitting}
                  >
                    {submitting ? (
                      <>
                        <div className="btn-spinner"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        📩 Submit
                      </>
                    )}
                  </button>
                  <p className="form-note">
                    By submitting this form, you agree to our terms and conditions.
                  </p>
                </div>
              </form>
            )}
          </div>

          <style jsx>{`
            .appointment-section { 
              background: linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.96) 100%);
              padding: 6.5rem 0 5.5rem 0; 
              min-height: 100vh;
              position: relative;
            }
            .appointment-section::before {
              content: '';
              position: absolute;
              inset: 0;
              background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="%23e2e8f0" opacity="0.3"/><circle cx="30" cy="30" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="50" cy="20" r="0.4" fill="%23e2e8f0" opacity="0.25"/><circle cx="70" cy="60" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="90" cy="40" r="0.5" fill="%23e2e8f0" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
              pointer-events: none;
            }
            @media (min-width: 769px) { .appointment-section { padding-top: 8rem; } }
            .container { max-width: 900px; margin: 0 auto; padding: 0 1rem; }

            .section-header { 
              text-align: center; 
              margin-bottom: 3rem; 
              max-width: 760px; 
              margin-left: auto; 
              margin-right: auto; 
            }
            .title-container { margin-bottom: 1.5rem; }
            .section-subtitle { 
              display: inline-block; 
              font-size: 0.9rem; 
              font-weight: 600; 
              letter-spacing: 2px; 
              text-transform: uppercase; 
              color: #8B7D6B; 
              background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%); 
              -webkit-background-clip: text; 
              -webkit-text-fill-color: transparent; 
              background-clip: text; 
              margin-bottom: 0.75rem; 
            }
            .section-title { 
              font-size: 2.5rem; 
              font-weight: 300; 
              color: #1e293b; 
              letter-spacing: -0.025em; 
              line-height: 1.2; 
              margin-bottom: 1rem; 
            }
            .title-decoration { 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              gap: 1.2rem; 
              margin-bottom: 1.5rem; 
            }
            .decoration-line { 
              width: 80px; 
              height: 2px; 
              background: linear-gradient(90deg, transparent 0%, #D4C4B0 50%, transparent 100%); 
            }
            .decoration-dot { 
              width: 10px; 
              height: 10px; 
              border-radius: 50%; 
              background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%); 
              position: relative; 
            }
            .decoration-dot::before { 
              content: ''; 
              position: absolute; 
              top: 50%; 
              left: 50%; 
              transform: translate(-50%, -50%); 
              width: 24px; 
              height: 24px; 
              border: 2px solid rgba(139,125,107,0.2); 
              border-radius: 50%; 
              animation: pulse 2s infinite; 
            }
            @keyframes pulse { 
              0% { opacity: 1; transform: translate(-50%, -50%) scale(1);} 
              100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5);} 
            }
            .section-description { 
              font-size: 1.1rem; 
              color: #64748b; 
              line-height: 1.7; 
              max-width: 600px; 
              margin: 0 auto; 
            }

            /* Success Page Styles */
            .success-container {
              background: #fff;
              border-radius: 12px;
              padding: 3rem 2rem;
              text-align: center;
              box-shadow: 0 20px 40px rgba(0,0,0,0.08);
              border: 1px solid rgba(226,232,240,0.8);
            }
            .success-icon {
              margin-bottom: 1.5rem;
              animation: successBounce 0.6s ease-out;
            }
            @keyframes successBounce {
              0% { transform: scale(0); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
            .success-title {
              font-size: 1.8rem;
              font-weight: 700;
              color: #059669;
              margin-bottom: 1rem;
            }
            .success-message {
              font-size: 1.1rem;
              color: #64748b;
              margin-bottom: 2rem;
              line-height: 1.6;
            }
            .appointment-details {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 1.5rem;
              margin: 2rem 0;
              text-align: left;
            }
            .detail-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0.5rem 0;
              border-bottom: 1px solid #e2e8f0;
            }
            .detail-item:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: 600;
              color: #374151;
            }
            .detail-value {
              color: #059669;
              font-weight: 500;
            }
            .success-info {
              background: #ecfdf5;
              border: 1px solid #a7f3d0;
              border-radius: 8px;
              padding: 1rem;
              margin: 1.5rem 0;
            }
            .success-info p {
              margin: 0.5rem 0;
              color: #065f46;
              font-size: 0.95rem;
            }

            /* Form Styles */
            .form { 
              background: #FBF7F0; 
              border-radius: 12px; 
              padding: 2rem; 
              box-shadow: 0 20px 40px rgba(0,0,0,0.08); 
              border: 1px solid rgba(212,196,176,0.45);
            }
            @media (min-width: 768px) { .form { padding: 2.5rem; } }

            .form-header {
              margin-bottom: 1.5rem;
              padding-bottom: 1rem;
              border-bottom: 2px solid #f1f5f9;
            }
            .form-header h3 {
              font-size: 1.3rem;
              font-weight: 600;
              color: #1e293b;
              margin-bottom: 0.5rem;
            }
            .form-header p {
              color: #64748b;
              font-size: 0.95rem;
              margin: 0;
            }

            .form-section {
              margin-bottom: 2rem;
            }

            .grid { 
              display: grid; 
              grid-template-columns: 1fr; 
              gap: 1.5rem; 
            }
            @media (min-width: 768px) { .grid { grid-template-columns: 1fr 1fr; } }
            .field-full { grid-column: 1 / -1; }

            .field { margin-bottom: 1rem; }
            .field label { 
              display: block; 
              font-weight: 600; 
              color: #374151; 
              margin-bottom: 0.5rem; 
              font-size: 0.95rem;
            }
            .required {
              color: #dc2626;
              margin-left: 0.25rem;
            }
            .error-label {
              color: #dc2626 !important;
            }

            .field input, .field select, .field textarea { 
              width: 100%; 
              border: 2px solid #e2e8f0; 
              border-radius: 8px; 
              padding: 0.75rem 1rem; 
              background: #f8fafc; 
              color: #1e293b; 
              font-size: 1rem;
              transition: all 0.2s ease; 
            }
            .field input:focus, .field select:focus, .field textarea:focus { 
              outline: none; 
              border-color: #3b82f6; 
              background: #ffffff; 
              box-shadow: 0 0 0 3px rgba(59,130,246,0.1); 
            }
            .field input:hover, .field select:hover, .field textarea:hover {
              border-color: #cbd5e1;
            }
            .error-input {
              border-color: #dc2626 !important;
              background: #fef2f2 !important;
            }
            .error-input:focus {
              box-shadow: 0 0 0 3px rgba(220,38,38,0.1) !important;
            }

            .select-wrapper {
              position: relative;
            }
            .time-slots { position: relative; min-height: 2rem; }
            .helper-text { color: #64748b; font-size: 0.95rem; }
            .slots-grid {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 0.5rem;
            }
            @media (min-width: 640px) { .slots-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
            @media (min-width: 1024px) { .slots-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
            .slot-btn {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 0.5rem 0.75rem;
              border-radius: 8px;
              border: 2px solid #e2e8f0;
              background: #f8fafc;
              color: #1e293b;
              font-weight: 600;
              font-size: 0.95rem;
              cursor: pointer;
              transition: all 0.15s ease;
            }
            .slot-btn:hover { border-color: #cbd5e1; background: #ffffff; }
            .slot-btn.selected { border-color: #3b82f6; background: #eff6ff; color: #1d4ed8; }
            .loading-spinner {
              position: absolute;
              right: 1rem;
              top: 50%;
              transform: translateY(-50%);
              width: 20px;
              height: 20px;
              border: 2px solid #e2e8f0;
              border-top: 2px solid #3b82f6;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: translateY(-50%) rotate(0deg); }
              100% { transform: translateY(-50%) rotate(360deg); }
            }

            .error-message { 
              display: block; 
              color: #dc2626; 
              font-size: 0.85rem; 
              margin-top: 0.5rem; 
              font-weight: 500;
            }

            .checkbox { 
              display: flex; 
              align-items: flex-start; 
              gap: 0.75rem; 
            }
            .checkbox-label { 
              display: flex; 
              align-items: flex-start; 
              gap: 10px; 
              color: #374151; 
              cursor: pointer;
              line-height: 1.5;
            }
            .checkbox-label input[type="checkbox"] { 
              width: 20px; 
              height: 20px; 
              flex: 0 0 auto; 
              margin: 0; 
              margin-top: 0.1rem;
              accent-color: #3b82f6;
            }
            .error-checkbox {
              accent-color: #dc2626;
            }
            .checkbox-text {
              font-size: 0.95rem;
              margin-left: 10px;
            }
            .checkbox-text a {
              color: #3b82f6;
              text-decoration: none;
              font-weight: 500;
            }
            .checkbox-text a:hover {
              text-decoration: underline;
            }

            /* Concerns compact list */
            .checkbox-group {
              display: grid;
              grid-template-columns: 1fr;
              gap: 0.25rem;
            }
            @media (min-width: 768px) {
              .checkbox-group { grid-template-columns: 1fr 1fr; }
            }
            /* Increase spacing between selector and text in Concerns list */
            .checkbox-group .checkbox-item { 
              gap: 1rem; /* larger gap for concerns */
              margin: 0.15rem 0; 
            }
            .checkbox-group .checkbox-item input[type="checkbox"] {
              margin-right: 0.35rem; /* extra breathing room before label text */
            }
            .checkbox-item {
              display: inline-flex;
              align-items: center;
              gap: 2rem; /* increase spacing between selector and text */
              margin: 0; /* reduce vertical spacing */
              line-height: 1.2;
              white-space: nowrap; /* keep input and text on one line */
            }
            .inline-options {
              display: inline-flex;
              align-items: center;
              justify-content: flex-start; /* left align options */
              column-gap: 0.75rem; /* horizontal spacing between options */
              row-gap: 0.25rem; /* smaller vertical gap if wrap */
              gap: 0.75rem 0.25rem; /* fallback gap */
              flex-wrap: wrap;
              text-align: left;
            }
            .checkbox-item input[type="checkbox"],
            .checkbox-item input[type="radio"] {
              width: 16px;
              height: 16px;
              margin: 0 0.25rem 0 0; /* increase spacing to text */
            }

            .checkbox-item span {
              white-space: nowrap; /* prevent label text from wrapping */
            }

            .form-actions { 
              display: flex; 
              flex-direction: column;
              align-items: center;
              margin-top: 2rem; 
              gap: 1rem;
            }
            .btn-primary { 
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.75rem 1.5rem; 
              border-radius: 999px; 
              background: linear-gradient(135deg, #8B7D6B, #C4A484);
              color: #ffffff; 
              font-weight: 700; 
              font-size: 0.9rem;
              border: 1px solid rgba(139,125,107,0.35); 
              transition: all 0.2s ease; 
              cursor: pointer;
              min-width: 200px;
              justify-content: center;
              box-shadow: 0 8px 20px rgba(139,125,107,0.35);
            }
            .btn-primary:hover:not(:disabled) { 
              filter: brightness(1.05);
              transform: translateY(-2px); 
              box-shadow: 0 10px 24px rgba(139,125,107,0.42); 
            }
            .btn-primary:active:not(:disabled) {
              transform: translateY(0);
            }
            .btn-disabled {
              background: #94a3b8 !important;
              cursor: not-allowed;
              transform: none !important;
              box-shadow: none !important;
            }
            .btn-spinner {
              width: 16px;
              height: 16px;
              border: 2px solid transparent;
              border-top: 2px solid #ffffff;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }

            .btn-secondary {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.75rem 1.5rem;
              border-radius: 8px;
              background: #f8fafc;
              color: #374151;
              font-weight: 600;
              border: 2px solid #e2e8f0;
              transition: all 0.2s ease;
              cursor: pointer;
              text-decoration: none;
            }
            .btn-secondary:hover {
              background: #f1f5f9;
              border-color: #cbd5e1;
              transform: translateY(-1px);
            }

            .form-note {
              color: #64748b;
              font-size: 0.85rem;
              text-align: center;
              margin: 0;
            }

            .submit-error {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              padding: 1rem;
              background: #fef2f2;
              border: 1px solid #fecaca;
              border-radius: 8px;
              margin-bottom: 1rem;
            }
            .error-icon {
              font-size: 1.2rem;
            }
            .error-text {
              color: #dc2626;
              font-weight: 500;
            }

            .info-banner {
              margin-top: 0.5rem;
              background: #eef2ff;
              border: 1px solid #c7d2fe;
              color: #3730a3;
              border-radius: 8px;
              padding: 0.5rem 0.75rem;
            }
            .info-text { font-size: 0.9rem; }

            .loading-container {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              padding: 1rem;
              background: #f8fafc;
              border: 2px solid #e2e8f0;
              border-radius: 8px;
              color: #64748b;
              font-size: 0.95rem;
            }
            .loading-container .loading-spinner {
              position: static;
              transform: none;
              width: 20px;
              height: 20px;
              border: 2px solid #e2e8f0;
              border-top: 2px solid #3b82f6;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MakeAppointmentPage;


