'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="terms-section">
          <div className="container">
            <div className="section-header">
              <div className="title-container">
                <h1 className="section-title">Terms of Service</h1>
                <div className="title-decoration">
                  <div className="decoration-line"></div>
                  <div className="decoration-dot"></div>
                  <div className="decoration-line"></div>
                </div>
              </div>
              <p className="section-description">
                Please read these terms carefully before using our services or website.
              </p>
            </div>

            <article className="terms-content">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Klinik.KA website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2>2. About Klinik.KA</h2>
              <p>
                Klinik.KA is a professional aesthetic clinic located at Level 10 / 503-505 Kent St, Sydney, NSW 2000, Australia. We specialize in medical injectable treatments, energy device treatments, and medical skincare services.
              </p>

              <h2>3. Medical Services Disclaimer</h2>
              <p>
                <strong>Important:</strong> All aesthetic treatments provided by Klinik.KA are medical procedures that should only be performed by qualified medical professionals. Results may vary between individuals, and no guarantees are made regarding specific outcomes.
              </p>
              <ul>
                <li>All treatments require a consultation with our medical professionals</li>
                <li>Individual results may vary based on skin type, age, and other factors</li>
                <li>Some treatments may require multiple sessions for optimal results</li>
                <li>Pre and post-treatment care instructions must be followed</li>
              </ul>

              <h2>4. Consultation and Booking</h2>
              <p>
                All appointments must be booked through our official channels. We reserve the right to:
              </p>
              <ul>
                <li>Reschedule appointments due to medical emergencies or unforeseen circumstances</li>
                <li>Require additional consultation before certain treatments</li>
                <li>Refuse service if deemed medically inappropriate</li>
                <li>Modify treatment plans based on individual assessment</li>
              </ul>

              <h2>5. Payment Terms</h2>
              <p>
                Payment is required at the time of service unless other arrangements have been made in advance. We accept:
              </p>
              <ul>
                <li>Cash</li>
                <li>Credit/Debit Cards</li>
                <li>Bank transfers (for advance payments)</li>
              </ul>
              <p>
                <strong>Cancellation Policy:</strong> Appointments cancelled with less than 24 hours notice may be subject to a cancellation fee.
              </p>

              <h2>6. Age Restrictions</h2>
              <p>
                You must be at least 18 years old to receive aesthetic treatments. Patients under 18 may receive treatments only with parental consent and appropriate medical justification.
              </p>

              <h2>7. Health and Safety</h2>
              <p>
                For your safety and the safety of our staff:
              </p>
              <ul>
                <li>You must disclose all medical conditions, medications, and allergies</li>
                <li>You must follow all pre and post-treatment instructions</li>
                <li>You must inform us of any changes in your health status</li>
                <li>We reserve the right to refuse treatment if there are safety concerns</li>
              </ul>

              <h2>8. Intellectual Property</h2>
              <p>
                The content on this website, including text, graphics, logos, images, and software, is the property of Klinik.KA and is protected by copyright laws. You may not reproduce, distribute, or use any content without our written permission.
              </p>

              <h2>9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Klinik.KA shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses resulting from your use of our services.
              </p>

              <h2>10. Privacy and Data Protection</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our services, you consent to the collection and use of information as described in our Privacy Policy.
              </p>

              <h2>11. Complaints and Feedback</h2>
              <p>
                We value your feedback and are committed to resolving any concerns. If you have a complaint about our services, please contact us at:
              </p>
              <ul>
                <li>Email: <a href="mailto:info@klinikka.com.au">info@klinikka.com.au</a></li>
                <li>Phone: <a href="tel:0299558181">(02) 9955 8181</a></li>
                <li>Address: Level 10 / 503-505 Kent St, Sydney, NSW, 2000</li>
              </ul>

              <h2>12. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any modifications constitutes acceptance of the updated terms.
              </p>

              <h2>13. Governing Law</h2>
              <p>
                These terms are governed by the laws of New South Wales, Australia. Any disputes arising from these terms or our services will be subject to the jurisdiction of the courts of New South Wales.
              </p>

              <h2>15. Medical Practice Compliance</h2>
              <p>
                Klinik.KA operates in compliance with Australian medical practice standards and regulations:
              </p>
              <ul>
                <li>All treatments are performed by qualified medical professionals</li>
                <li>We maintain appropriate medical insurance and professional indemnity</li>
                <li>All procedures comply with Therapeutic Goods Administration (TGA) requirements</li>
                <li>We follow Australian Medical Association (AMA) guidelines for aesthetic procedures</li>
                <li>Patient records are maintained according to NSW Health requirements</li>
              </ul>

              <h2>16. Consumer Rights Under Australian Consumer Law</h2>
              <p>
                Under the Australian Consumer Law, you have rights including:
              </p>
              <ul>
                <li>Services must be provided with due care and skill</li>
                <li>Services must be fit for purpose</li>
                <li>Services must be delivered within a reasonable time</li>
                <li>You have rights to remedies for faulty services</li>
              </ul>
              <p>
                These rights cannot be excluded by these terms and conditions.
              </p>

              <h2>17. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul>
                <li>Email: <a href="mailto:info@klinikka.com.au">info@klinikka.com.au</a></li>
                <li>Phone: <a href="tel:0299558181">(02) 9955 8181</a></li>
                <li>Address: Level 10 / 503-505 Kent St, Sydney, NSW, 2000</li>
              </ul>

              <p className="last-updated">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </article>
          </div>

          <style jsx>{`
            .terms-section { 
              background: linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.96) 100%); 
              padding: 6.5rem 0 5.5rem 0; 
              position: relative; 
            }
            .terms-section::before { 
              content: ''; 
              position: absolute; 
              inset: 0; 
              background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="%23e2e8f0" opacity="0.3"/><circle cx="30" cy="30" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="50" cy="20" r="0.4" fill="%23e2e8f0" opacity="0.25"/><circle cx="70" cy="60" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="90" cy="40" r="0.5" fill="%23e2e8f0" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>'); 
              pointer-events: none; 
            }
            @media (min-width: 769px) { .terms-section { padding-top: 8rem; } }
            .container { max-width: 800px; margin: 0 auto; padding: 0 1rem; }

            .section-header { text-align: center; margin-bottom: 3rem; }
            .title-container { margin-bottom: 1.25rem; }
            .section-title { 
              font-size: 2.2rem; 
              font-weight: 300; 
              color: #3A3429; 
              letter-spacing: -0.025em; 
              line-height: 1.1; 
              margin-bottom: 0.75rem; 
            }
            .title-decoration { 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              gap: 1rem; 
              margin-bottom: 1.1rem; 
            }
            .decoration-line { 
              width: 60px; 
              height: 1px; 
              background: linear-gradient(90deg, transparent 0%, #D4C4B0 50%, transparent 100%); 
            }
            .decoration-dot { 
              width: 8px; 
              height: 8px; 
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
              width: 20px; 
              height: 20px; 
              border: 1px solid rgba(139,125,107,0.2); 
              border-radius: 50%; 
              animation: pulse 2s infinite; 
            }
            @keyframes pulse { 
              0% { opacity: 1; transform: translate(-50%, -50%) scale(1);} 
              100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5);} 
            }
            .section-description { 
              font-size: 1.02rem; 
              color: #5A4F3A; 
              line-height: 1.85; 
              max-width: 560px; 
              margin: 0 auto; 
            }

            .terms-content { 
              background: #FBF7F0; 
              border: 1px solid rgba(212,196,176,0.45); 
              border-radius: 12px; 
              padding: 2rem; 
              box-shadow: 0 8px 26px rgba(0,0,0,0.05); 
            }
            @media (min-width: 768px) { .terms-content { padding: 2.5rem; } }

            .terms-content h2 { 
              font-size: 1.3rem; 
              font-weight: 600; 
              color: #3A3429; 
              margin: 2rem 0 1rem 0; 
              padding-bottom: 0.5rem; 
              border-bottom: 1px solid rgba(212,196,176,0.3); 
            }
            .terms-content h2:first-child { margin-top: 0; }

            .terms-content p { 
              color: #5A4F3A; 
              line-height: 1.7; 
              margin-bottom: 1rem; 
            }

            .terms-content ul { 
              color: #5A4F3A; 
              line-height: 1.7; 
              margin: 1rem 0; 
              padding-left: 1.5rem; 
            }

            .terms-content li { 
              margin-bottom: 0.5rem; 
            }

            .terms-content a { 
              color: #8B7D6B; 
              text-decoration: none; 
              font-weight: 500; 
            }
            .terms-content a:hover { 
              text-decoration: underline; 
            }

            .terms-content strong { 
              color: #3A3429; 
              font-weight: 600; 
            }

            .last-updated { 
              margin-top: 2rem; 
              padding-top: 1rem; 
              border-top: 1px solid rgba(212,196,176,0.3); 
              font-style: italic; 
              color: #8B7D6B; 
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
