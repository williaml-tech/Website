'use client';

import React from 'react';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CTA from '../../../components/CTA';

// Treatment offerings based on new content
const treatmentOfferings = [
  'Facial Rejuvenation & Skin Quality',
  'Facial Volume & Structure Enhancement',
  'Bio-remodelling & Skin Boosters',
  'PRP (Platelet-Rich Plasma) Therapies',
  'Wellness IV Drips'
];

const InjectablePage: React.FC = () => {

  return (
    <div className="injectable-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-image-wrapper">
            <Image src="/injectable/hero.jpg" alt="Injectable Hero" fill className="hero-image" priority />
          </div>
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="container">
            <span className="hero-subtitle">Medical Injectables Treatment</span>
            <h1 className="hero-title">Aesthetic Enhancements Tailored to You</h1>
            <p className="hero-description">
              We specialise in a range of advanced aesthetic treatments designed to help you look and feel your best.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="content-section">
        <div className="container">
          {/* Treatment Offerings */}
          <div className="offerings-section">
            <h2 className="offerings-title">Our Offerings Include Solutions For:</h2>
            <div className="offerings-list">
              {treatmentOfferings.map((offering, index) => (
                <div key={index} className="offering-item">
                  <div className="offering-bullet"></div>
                  <span className="offering-text">{offering}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Regulatory Notice */}
          <div className="regulatory-notice">
            <div className="notice-content">
              <p className="regulatory-text">
                Friendly Reminder: Before undergoing any injectable treatment, please be sure to choose a certified beauty institution and undergo a consultation with a professional therapist to develop a personalized treatment plan.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <CTA
  label="Call to Action"
  title="Discover Your Possibilities. Schedule Your Complimentary Consultation Today"
  description="During this confidential session..."
  buttonText="Make an Appointment"
  buttonLink="https://www.fresha.com/book-now/klinik-ka-aesthetic-clinic-fivxhb80/all-offer?share=true&pId=2723491" // <--- 修改这里
/>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .injectable-page {
          min-height: 100vh;
          background: #FCFBF8;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          height: 60vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-image-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .hero-image {
          object-fit: cover;
          object-position: center;
        }

        .hero-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: 300;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4));
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          color: white;
        }

        .hero-subtitle {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1rem;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 300;
          letter-spacing: -0.025em;
          line-height: 1.2;
          margin-bottom: 1rem;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto;
          color: rgba(255, 255, 255, 0.95);
        }

        /* Content Section */
        .content-section {
          padding: 5rem 0;
          background: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Section Header */
        .section-header {
          text-align: center;
          margin-bottom: 5rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .title-container {
          margin-bottom: 1.5rem;
        }

        .section-subtitle {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8B7D6B;
          background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 300;
          color: #3A3429;
          letter-spacing: -0.025em;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .title-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
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
          border: 1px solid rgba(139, 125, 107, 0.2);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        .section-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #5A4F3A;
          max-width: 700px;
          margin: 0 auto;
        }

        /* Offerings Section */
        .offerings-section {
          margin-bottom: 5rem;
          text-align: center;
        }

        .offerings-title {
          font-size: 2rem;
          font-weight: 400;
          color: #3A3429;
          margin-bottom: 3rem;
          line-height: 1.3;
        }

        .offerings-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .offering-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: #FCFBF8;
          border-radius: 12px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s ease;
        }

        .offering-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .offering-bullet {
          flex-shrink: 0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%);
        }

        .offering-text {
          font-size: 1.1rem;
          color: #3A3429;
          font-weight: 500;
          text-align: left;
        }

        /* Regulatory Notice */
        .regulatory-notice {
          background: #F5F1EB;
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid #8B7D6B;
          margin-bottom: 4rem;
        }

        .notice-content {
          text-align: left;
        }

        .regulatory-text {
          font-size: 0.9rem;
          color: #5A4F3A;
          font-style: italic;
          margin: 0;
          line-height: 1.6;
        }

        /* Responsive Design */
        @media (max-width: 767px) {
          .hero-section {
            height: 50vh;
            min-height: 400px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .content-section {
            padding: 3rem 0;
          }

          .section-title {
            font-size: 2rem;
          }

          .offerings-title {
            font-size: 1.75rem;
          }

          .offering-text {
            font-size: 1rem;
          }

          .offerings-list {
            gap: 1rem;
          }

          .offering-item {
            padding: 1rem;
          }

          .regulatory-notice {
            padding: 1.25rem;
            margin: 0 1rem 3rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default InjectablePage;
