'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CTA from '../../../components/CTA';

// Treatment categories
const treatmentCategories = [
  {
    id: 'signature-facials',
    title: 'Signature Facials',
    subtitle: 'Professional Foundation Care',
    description: 'Our signature facial treatments combine advanced techniques with medical-grade products to deliver comprehensive skin health and rejuvenation.',
    treatments: [
      {
        name: 'Oxygenceuticals Ceutisome Facial',
        tagline: 'Advanced Oxygenation Therapy',
        benefits: [
          'Deep hydration and skin barrier restoration',
          'Enhanced cellular oxygenation',
          'Immediate radiance and glow',
          'Ideal for sensitive and compromised skin'
        ],
        idealFor: 'Dehydrated skin, sensitivity, barrier repair, pre/post-procedure care'
      },
      {
        name: 'Faith Premium Facial',
        tagline: 'Luxury Rejuvenation Experience',
        benefits: [
          'Comprehensive anti-aging treatment',
          'Deep nourishment and firming',
          'Instant lifting and contouring effect',
          'Premium botanical active ingredients'
        ],
        idealFor: 'Mature skin, loss of elasticity, dullness, special occasions'
      },
      {
        name: 'Signature Facial',
        tagline: 'Classic Professional Care',
        benefits: [
          'Thorough cleansing and extraction',
          'Customized treatment based on skin condition',
          'Relaxing therapeutic massage',
          'Maintenance of healthy skin function'
        ],
        idealFor: 'All skin types, routine maintenance, general skin health'
      },
      {
        name: 'Barrier Repair Treatment',
        tagline: 'Specialized Restoration Therapy',
        benefits: [
          'Intensive barrier function restoration',
          'Reduces inflammation and redness',
          'Strengthens skin resilience',
          'Calms reactive and sensitized skin'
        ],
        idealFor: 'Compromised barrier, irritation, rosacea, post-treatment recovery'
      }
    ]
  },
  {
    id: 'chemical-peels',
    title: 'Chemical Peels',
    subtitle: 'Advanced Exfoliation & Renewal',
    description: 'Medical-grade chemical peels accelerate cellular turnover to address various skin concerns from acne to aging, revealing fresher, healthier skin.',
    treatments: [
      {
        name: 'BHA Peel (Salicylic Acid)',
        tagline: 'Deep Pore Clarifying Treatment',
        benefits: [
          'Penetrates oil-clogged pores',
          'Controls excess sebum production',
          'Reduces active acne and prevents breakouts',
          'Minimizes pore appearance'
        ],
        idealFor: 'Oily skin, acne, blackheads, enlarged pores'
      },
      {
        name: 'AHA Peel (Glycolic/Lactic Acid)',
        tagline: 'Surface Renewal & Brightening',
        benefits: [
          'Exfoliates dead skin cells',
          'Fades hyperpigmentation and sun damage',
          'Improves skin texture and tone',
          'Stimulates collagen production'
        ],
        idealFor: 'Dull skin, fine lines, uneven tone, sun damage'
      },
      {
        name: 'Combination Peel',
        tagline: 'Multi-Target Solution',
        benefits: [
          'Addresses multiple concerns simultaneously',
          'Customized blend based on assessment',
          'Enhanced efficacy through synergy',
          'Comprehensive skin improvement'
        ],
        idealFor: 'Complex skin concerns, combination skin, comprehensive treatment'
      }
    ]
  },
  {
    id: 'microneedling',
    title: 'Microneedling',
    subtitle: 'Collagen Induction Therapy',
    description: 'Precision micro-injuries trigger the skin\'s natural healing response, stimulating collagen and elastin production for structural improvement.',
    treatments: [
      {
        name: 'Classic Microneedling',
        tagline: 'Natural Skin Regeneration',
        benefits: [
          'Stimulates natural collagen synthesis',
          'Reduces acne scars and textural irregularities',
          'Refines pores and improves skin texture',
          'Enhances product absorption'
        ],
        idealFor: 'Acne scars, enlarged pores, fine lines, skin texture improvement'
      },
      {
        name: 'RF Microneedling (Morpheus 8 Burst)',
        tagline: 'Advanced Fractional Technology',
        benefits: [
          'Combines microneedling with radiofrequency energy',
          'Deeper collagen remodeling in dermis',
          'Tightening and lifting effect',
          'Superior results for scarring and laxity'
        ],
        idealFor: 'Deep acne scars, skin laxity, advanced aging, body skin concerns'
      }
    ]
  },
  {
    id: 'ipl-maintenance',
    title: 'IPL (Lumecca Peak)',
    subtitle: 'Light-Based Maintenance Therapy',
    description: 'High-energy Intense Pulsed Light targets pigmentation and vascular concerns while stimulating collagen for overall skin quality improvement.',
    treatments: [
      {
        name: 'IPL Photorejuvenation',
        tagline: 'Comprehensive Light Therapy',
        benefits: [
          'Eliminates sun spots and pigmentation',
          'Reduces redness and broken capillaries',
          'Evens skin tone and texture',
          'Stimulates collagen for ongoing improvement'
        ],
        idealFor: 'Pigmentation, redness, sun damage, routine maintenance for skin quality'
      }
    ]
  }
];

const SkincarePage: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="skincare-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-image-wrapper">
            <Image
              src="/skincare/hero.jpg"
              alt="Medical Skincare & Maintenance Care"
              fill
              className="hero-image"
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="container">
            <span className="hero-subtitle">Medical-Grade Skincare</span>
            <h1 className="hero-title">Medical Skincare & Maintenance Care</h1>
            <p className="hero-description">
              Professional treatments that deliver fundamental improvements in skin structure and function
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="container">
          <div className="section-header">
            <div className="title-container">
              <span className="section-subtitle">Our Approach</span>
              <h2 className="section-title">Diagnosis First, Treatment Second</h2>
              <div className="title-decoration">
                <div className="decoration-line"></div>
                <div className="decoration-dot"></div>
                <div className="decoration-line"></div>
              </div>
            </div>
            <p className="section-description">
              Medical skincare utilizes medical devices, pharmaceutical ingredients, and clinical techniques
              to achieve results far beyond conventional skincare products. Our core philosophy emphasizes
              thorough diagnosis before treatment, ensuring safe, effective, and personalized solutions
              for lasting skin health.
            </p>
          </div>

          {/* Philosophy Cards */}
          <div className="philosophy-cards">
            <div className="philosophy-card">
              <div className="card-icon">
                <div className="icon-image-container">
                  <Image
                    src="/skincare/4.jpg"
                    alt="Medical Foundation"
                    width={80}
                    height={80}
                    className="card-icon-img"
                  />
                </div>
              </div>
              <h3 className="card-title">Medical Foundation</h3>
              <p className="card-description">
                Treatments based on clinical evidence and medical-grade technology to address
                skin concerns at a structural level.
              </p>
            </div>
            <div className="philosophy-card">
              <div className="card-icon">
                <div className="icon-image-container">
                  <Image
                    src="/skincare/5.jpg"
                    alt="Personalized Assessment"
                    width={80}
                    height={80}
                    className="card-icon-img"
                  />
                </div>
              </div>
              <h3 className="card-title">Personalized Assessment</h3>
              <p className="card-description">
                Comprehensive skin analysis determines the most effective treatment protocol
                for your unique concerns and goals.
              </p>
            </div>
            <div className="philosophy-card">
              <div className="card-icon">
                <div className="icon-image-container">
                  <Image
                    src="/skincare/6.jpg"
                    alt="Long-Term Results"
                    width={80}
                    height={80}
                    className="card-icon-img"
                  />
                </div>
              </div>
              <h3 className="card-title">Long-Term Results</h3>
              <p className="card-description">
                Focus on sustainable improvement through maintenance care that preserves
                and enhances skin health over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Categories Section */}
      <section className="treatments-section">
        <div className="container">
          <div className="section-header">
            <div className="title-container">
              <span className="section-subtitle">Professional Treatments</span>
              <h2 className="section-title">Our Medical Skincare Services</h2>
              <div className="title-decoration">
                <div className="decoration-line"></div>
                <div className="decoration-dot"></div>
                <div className="decoration-line"></div>
              </div>
            </div>
            <p className="section-description">
              From foundational maintenance to advanced corrective treatments, each service
              is designed to deliver clinical results with medical precision.
            </p>
          </div>

          {/* Treatment Categories */}
          <div className="categories-wrapper">
            {treatmentCategories.map((category, idx) => (
              <div key={category.id} className="category-card">
                {/* Category Header */}
                <div
                  className="category-header"
                  onClick={() => toggleCategory(category.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleCategory(category.id)}
                >
                  <div className="category-header-left">
                    <div className="category-image">
                      <Image
                        src={`/skincare/${7 + idx}.jpg`}
                        alt={category.title}
                        width={160}
                        height={160}
                        className="category-img"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  <div className="category-header-right">
                    <div className="category-eyebrow">{category.subtitle}</div>
                    <h3 className="category-title">{category.title}</h3>
                    <p className="category-description">{category.description}</p>
                    <button
                      className="btn-expand"
                      aria-expanded={expandedCategory === category.id}
                    >
                      {expandedCategory === category.id ? 'Show Less' : 'View Treatments'}
                      <svg
                        className={`expand-icon ${expandedCategory === category.id ? 'rotated' : ''}`}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Expandable Treatment Details */}
                <div
                  className={`category-details ${expandedCategory === category.id ? 'expanded' : ''}`}
                >
                  <div className="details-content">
                    {category.treatments.map((treatment, index) => (
                      <div key={index} className="treatment-item">
                        <div className="treatment-header">
                          <h4 className="treatment-name">{treatment.name}</h4>
                          <span className="treatment-tagline">{treatment.tagline}</span>
                        </div>
                        <div className="treatment-body">
                          <div className="treatment-section">
                            <h5 className="treatment-section-title">Key Benefits</h5>
                            <ul className="benefits-list">
                              {treatment.benefits.map((benefit, bIndex) => (
                                <li key={bIndex}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="treatment-section">
                            <h5 className="treatment-section-title">Ideal For</h5>
                            <p className="ideal-for-text">{treatment.idealFor}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <CTA
            label="Call to Action"
            title="Start Your Personalized Skincare Journey"
            description="Book a professional consultation to receive a comprehensive skin assessment and customized treatment plan tailored to your unique needs."
            buttonText="Make an Appointment"
            buttonLink="/appointment"
          />
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .skincare-page {
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
          width: 100%;
          height: 100%;
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

        /* Philosophy Section */
        .philosophy-section {
          padding: 5rem 0;
          background: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
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

        /* Philosophy Cards */
        .philosophy-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .philosophy-card {
          background: #FCFBF8;
          padding: 2.5rem;
          border-radius: 12px;
          text-align: center;
          border: 1px solid rgba(226, 232, 240, 0.6);
          transition: all 0.3s ease;
        }

        .philosophy-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
        }

        .card-icon {
          margin-bottom: 1.5rem;
        }

        .icon-image-container {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(139, 125, 107, 0.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .card-icon-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .philosophy-card:hover .card-icon-img {
          transform: scale(1.1);
        }

        .card-title {
          font-size: 1.35rem;
          font-weight: 600;
          color: #3A3429;
          margin-bottom: 1rem;
        }

        .card-description {
          color: #5A4F3A;
          line-height: 1.7;
          font-size: 1rem;
        }

        /* Treatments Section */
        .treatments-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #FCFBF8 0%, #F9F7F3 100%);
          position: relative;
        }

        .treatments-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="%23e2e8f0" opacity="0.3"/><circle cx="30" cy="30" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="50" cy="20" r="0.4" fill="%23e2e8f0" opacity="0.25"/><circle cx="70" cy="60" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="90" cy="40" r="0.5" fill="%23e2e8f0" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }

        /* Category Cards */
        .categories-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 4rem;
          position: relative;
          z-index: 1;
        }

        .category-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s ease;
        }

        .category-card:hover {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .category-header {
          display: flex;
          gap: 2rem;
          padding: 2.5rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .category-header:hover {
          background: rgba(252, 251, 248, 0.5);
        }

        .category-header-left {
          flex-shrink: 0;
        }

        .category-image {
          width: 160px;
          height: 160px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .category-img {
          width: 100%;
          height: 100%;
          transition: transform 0.3s ease;
        }

        .category-header:hover .category-img {
          transform: scale(1.05);
        }

        .category-header-right {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .category-eyebrow {
          font-size: 0.875rem;
          font-weight: 600;
          color: #8B7D6B;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .category-title {
          font-size: 1.75rem;
          font-weight: 600;
          color: #3A3429;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .category-description {
          color: #5A4F3A;
          line-height: 1.7;
          margin-bottom: 1.5rem;
          font-size: 1.05rem;
        }

        .btn-expand {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          background: linear-gradient(135deg, #8B7D6B, #C4A484);
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(139, 125, 107, 0.3);
          align-self: flex-start;
        }

        .btn-expand:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(139, 125, 107, 0.4);
        }

        .expand-icon {
          transition: transform 0.3s ease;
        }

        .expand-icon.rotated {
          transform: rotate(180deg);
        }

        /* Expandable Details */
        .category-details {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .category-details.expanded {
          max-height: 5000px;
        }

        .details-content {
          padding: 0 2.5rem 2.5rem 2.5rem;
          border-top: 1px solid rgba(226, 232, 240, 0.6);
        }

        /* Treatment Items */
        .treatment-item {
          background: #FCFBF8;
          border-radius: 12px;
          padding: 2rem;
          margin-top: 2rem;
          border: 1px solid rgba(226, 232, 240, 0.6);
        }

        .treatment-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid rgba(139, 125, 107, 0.2);
        }

        .treatment-name {
          font-size: 1.5rem;
          font-weight: 600;
          color: #3A3429;
          margin-bottom: 0.5rem;
        }

        .treatment-tagline {
          font-size: 0.95rem;
          color: #8B7D6B;
          font-weight: 500;
          font-style: italic;
        }

        .treatment-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .treatment-section {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid rgba(226, 232, 240, 0.6);
        }

        .treatment-section-title {
          font-size: 1rem;
          font-weight: 700;
          color: #8B7D6B;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
        }

        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .benefits-list li {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          position: relative;
          color: #5A4F3A;
          line-height: 1.6;
        }

        .benefits-list li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #8B7D6B;
          font-weight: 700;
        }

        .benefits-list li:last-child {
          margin-bottom: 0;
        }

        .ideal-for-text {
          color: #5A4F3A;
          line-height: 1.7;
          margin: 0;
          font-style: italic;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .treatment-body {
            grid-template-columns: 1fr;
          }
        }

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

          .philosophy-section {
            padding: 3rem 0;
          }

          .section-title {
            font-size: 2rem;
          }

          .section-description {
            font-size: 1rem;
          }

          .philosophy-cards {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .treatments-section {
            padding: 3rem 0;
          }

          .category-header {
            flex-direction: column;
            padding: 2rem 1.5rem;
          }

          .category-image {
            width: 100%;
            height: 200px;
          }

          .details-content {
            padding: 0 1.5rem 2rem 1.5rem;
          }

          .treatment-item {
            padding: 1.5rem;
          }

          .treatment-name {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SkincarePage;
