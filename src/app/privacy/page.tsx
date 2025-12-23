'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="privacy-section">
          <div className="container">
            <div className="section-header">
              <div className="title-container">
                <h1 className="section-title">Privacy Policy</h1>
                <div className="title-decoration">
                  <div className="decoration-line"></div>
                  <div className="decoration-dot"></div>
                  <div className="decoration-line"></div>
                </div>
              </div>
              <p className="section-description">
                We are committed to protecting your privacy and handling your personal information responsibly.
              </p>
            </div>

            <article className="privacy-content">
              <h2>1. Who we are</h2>
              <p>
                This Privacy Policy applies to Klinik.KA (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). We provide aesthetic and wellness services in New South Wales, Australia. We are committed to protecting your privacy and handling your personal information in an open and transparent way.
              </p>

              <h2>2. The laws that apply</h2>
              <p>
                We handle personal information in accordance with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). To the extent health information is handled in NSW, we also comply with the NSW Health Records and Information Privacy Act 2002 (HRIP Act) and the Health Privacy Principles (HPPs).
              </p>

              <h2>3. What information we collect</h2>
              <ul>
                <li>Identity and contact details (name, email, phone).</li>
                <li>Appointment and service details (preferred dates, concerns, treatment history).</li>
                <li>Health information you choose to provide that is reasonably necessary for care (e.g., medical history, allergies, medications) — treated as &quot;health information&quot; under the HRIP Act.</li>
                <li>Payment and billing details as required to process transactions.</li>
                <li>Website usage data (device, browser, pages viewed, and similar analytics).</li>
              </ul>

              <h2>4. How we collect information</h2>
              <ul>
                <li>Directly from you when you submit forms, book appointments, contact us, or attend consultations.</li>
                <li>From your authorised representatives with your consent.</li>
                <li>Automatically through our website via cookies and similar technologies (for analytics and performance).</li>
              </ul>

              <h2>5. Why we collect and use your information</h2>
              <ul>
                <li>To provide and manage our services, including bookings and clinical care.</li>
                <li>To assess suitability for treatments and ensure safety.</li>
                <li>To communicate confirmations, reminders, and updates related to your care.</li>
                <li>To improve our services, website, and user experience.</li>
                <li>To comply with legal, regulatory, and clinical record-keeping obligations in NSW and Australia.</li>
              </ul>

              <h2>6. Consent, marketing and cookies</h2>
              <p>
                We rely on your consent or other lawful bases to process personal information where required. You may opt-out of non-essential marketing at any time. Our website may use cookies and analytics; you can adjust your browser settings to refuse cookies, though some features may not function properly without them.
              </p>

              <h2>7. Disclosure of information</h2>
              <ul>
                <li>Within our clinic team strictly on a need-to-know basis.</li>
                <li>Service providers who assist us (e.g., practice management, IT hosting, payment processing) under confidentiality obligations.</li>
                <li>Regulators or as required by law, court order, or to address a serious threat to life, health, or safety.</li>
                <li>We do not sell your personal information.</li>
              </ul>

              <h2>8. Security and retention</h2>
              <p>
                We implement administrative, technical, and physical safeguards to protect personal and health information against misuse, interference, loss, and unauthorised access. We retain records only for as long as necessary for our functions and to meet legal and clinical record-keeping requirements, after which we securely destroy or de-identify them.
              </p>

              <h2>9. Access and correction</h2>
              <p>
                You may request access to, or correction of, your personal and health information held by us. We will respond within a reasonable period and may require verification of identity. In limited cases permitted by law, we may refuse access and will provide reasons if we do so.
              </p>

              <h2>10. Children and sensitive information</h2>
              <p>
                We only collect health information that is reasonably necessary for care and with appropriate consent. For minors, we obtain consent from a parent or legal guardian as required by law and professional standards.
              </p>

              <h2>11. Complaints</h2>
              <p>
                If you have concerns about how we handle your information, please contact us first so we can assist.
              </p>

              <h2>12. Your Rights Under Australian Privacy Law</h2>
              <p>
                Under the Privacy Act 1988 and Australian Privacy Principles (APPs), you have the right to:
              </p>
              <ul>
                <li><strong>Access:</strong> Request access to your personal information we hold</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Complaint:</strong> Make a complaint about our privacy practices</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for certain uses of your information</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the details below.
              </p>

              <h2>13. Complaints and Dispute Resolution</h2>
              <p>
                If you have a complaint about how we handle your personal information, you can:
              </p>
              <ul>
                <li>Contact us directly using the details below</li>
                <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
                <li>Contact the NSW Privacy Commissioner if applicable</li>
              </ul>
              <p>
                We will investigate all complaints and respond within 30 days.
              </p>

              <h2>14. Contact us</h2>
              <p>
                Email: <a href="mailto:info@klinikka.com.au">info@klinikka.com.au</a><br />
                Phone: <a href="tel:0299558181">(02) 9955 8181</a><br />
                Address: Level 10 / 503 - 505 Kent St, Sydney, NSW, 2000
              </p>

              <h2>15. Updates to this Policy</h2>
              <p>
                We may update this Policy from time to time to reflect changes in our practices or legal requirements. The updated version will be posted on this page with the effective date.
              </p>
            </article>
          </div>

          <style jsx>{`
            .privacy-section { 
              background: linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.96) 100%); 
              padding: 6.5rem 0 5.5rem 0; 
              position: relative; 
            }
            .privacy-section::before { 
              content: ''; 
              position: absolute; 
              inset: 0; 
              background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="%23e2e8f0" opacity="0.3"/><circle cx="30" cy="30" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="50" cy="20" r="0.4" fill="%23e2e8f0" opacity="0.25"/><circle cx="70" cy="60" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="90" cy="40" r="0.5" fill="%23e2e8f0" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>'); 
              pointer-events: none; 
            }
            @media (min-width: 769px) { .privacy-section { padding-top: 8rem; } }
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

            .privacy-content { 
              background: #FBF7F0; 
              border: 1px solid rgba(212,196,176,0.45); 
              border-radius: 12px; 
              padding: 2rem; 
              box-shadow: 0 8px 26px rgba(0,0,0,0.05); 
            }
            @media (min-width: 768px) { .privacy-content { padding: 2.5rem; } }

            .privacy-content h2 { 
              font-size: 1.3rem; 
              font-weight: 600; 
              color: #3A3429; 
              margin: 2rem 0 1rem 0; 
              padding-bottom: 0.5rem; 
              border-bottom: 1px solid rgba(212,196,176,0.3); 
            }
            .privacy-content h2:first-child { margin-top: 0; }

            .privacy-content p { 
              color: #5A4F3A; 
              line-height: 1.7; 
              margin-bottom: 1rem; 
            }

            .privacy-content ul { 
              color: #5A4F3A; 
              line-height: 1.7; 
              margin: 1rem 0; 
              padding-left: 1.5rem; 
            }

            .privacy-content li { 
              margin-bottom: 0.5rem; 
            }

            .privacy-content a { 
              color: #8B7D6B; 
              text-decoration: none; 
              font-weight: 500; 
            }
            .privacy-content a:hover { 
              text-decoration: underline; 
            }

            .privacy-content strong { 
              color: #3A3429; 
              font-weight: 600; 
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;


