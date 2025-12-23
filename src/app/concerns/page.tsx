'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Define concern categories based on documentation
const concernCategories = [
  {
    id: 'anti-aging',
    category: 'Anti-Aging, Lifting & Tightening',
    subtitle: 'Restore Youthful Vitality',
    description: 'Addressing concerns related to skin laxity, fine lines, and the loss of youthful contour.',
    concerns: [
      {
        concern: 'Significant Skin Sagging',
        solutions: ['Ultherapy Prime (HIFU)'],
        outcome: 'Utilizes focused ultrasound to lift the foundational SMAS layer for powerful, non-surgical lifting.'
      },
      {
        concern: 'Skin Laxity & Contour Blur',
        solutions: ['Morpheus 8 Burst (RF Microneedling)', 'Indiba (CRET)'],
        outcome: 'Stimulates deep collagen production for firming, tightening, and improved facial definition.'
      },
      {
        concern: 'Fine Lines & Volume Loss',
        solutions: ['Cosmetic Injectables', 'Skin Peels & Microneedling'],
        outcome: 'Precision treatments for wrinkle reduction and restoring youthful volume. Refines texture and boosts collagen.'
      }
    ]
  },
  {
    id: 'pigmentation',
    category: 'Pigmentation & Brightening',
    subtitle: 'Reveal Your Natural Radiance',
    description: 'Solutions for treating sun damage, unwanted spots, and dull, uneven skin tone.',
    concerns: [
      {
        concern: 'Sun Spots & Pigmentation',
        solutions: ['Lumecca Peak IPL'],
        outcome: 'High-energy pulsed light precisely targets and breaks down melanin for a visibly brighter, clearer complexion.'
      },
      {
        concern: 'Dullness & Uneven Tone',
        solutions: ['Skin Peels', 'Lumecca Peak IPL'],
        outcome: 'Accelerates cell renewal to fade hyperpigmentation and reveal smoother, more radiant skin.'
      }
    ]
  },
  {
    id: 'complexion',
    category: 'Complexion, Acne & Scar Management',
    subtitle: 'Achieve Clear, Healthy Skin',
    description: 'Targeting chronic redness, active breakouts, and long-term textural damage.',
    concerns: [
      {
        concern: 'Acne Scars & Pitted Texture',
        solutions: ['Microneedling (and RF Microneedling)'],
        outcome: 'Stimulates intensive collagen regeneration to repair scars and refine enlarged pores.'
      },
      {
        concern: 'Active Acne & Clogged Pores',
        solutions: ['Chemical Peels (BHA focus)', 'Professional Facials'],
        outcome: 'Uses targeted acids to exfoliate, control oil, reduce inflammation, and minimize breakouts.'
      },
      {
        concern: 'Chronic Redness & Rosacea',
        solutions: ['Lumecca Peak IPL'],
        outcome: 'Targets and seals off visible blood vessels, significantly reducing facial flushing and rosacea symptoms.'
      },
      {
        concern: 'Sensitivity & Barrier Damage',
        solutions: ['Signature/Barrier Repair Facials'],
        outcome: 'Professional treatments to calm inflammation, stabilize the skin, and repair the natural moisture barrier.'
      }
    ]
  },
  {
    id: 'body-wellness',
    category: 'Body Contouring & Wellness',
    subtitle: 'Holistic Body Care',
    description: 'Focusing on skin firmness, localized fat, and holistic well-being with advanced technology.',
    concerns: [
      {
        concern: 'Body Laxity & Cellulite',
        solutions: ['Indiba (CRET)'],
        outcome: 'Deep thermal therapy (448kHz) to firm the body skin, improve circulation, and reduce the appearance of cellulite.'
      },
      {
        concern: 'Wellness & Circulation',
        solutions: ['Indiba (Specific Protocols)'],
        outcome: 'Aids in lymphatic drainage, muscle relaxation, and can be used for specific care such as Womb Care or Hair & Scalp treatments.'
      }
    ]
  }
];

const ConcernsPage: React.FC = () => {
  const [desktopImageLoaded, setDesktopImageLoaded] = useState(false);
  const [mobileImageLoaded, setMobileImageLoaded] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="concerns-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="desktop-hero">
            <Image
              src="/concerns/hero.jpg"
              alt="Skin Concerns Solutions"
              fill
              className={`hero-image ${desktopImageLoaded ? 'loaded' : ''}`}
              priority
              onLoad={() => setDesktopImageLoaded(true)}
            />
          </div>
          <div className="mobile-hero">
            <Image
              src="/concerns/hero_m.jpg"
              alt="Skin Concerns Solutions"
              fill
              className={`hero-image ${mobileImageLoaded ? 'loaded' : ''}`}
              priority
              onLoad={() => setMobileImageLoaded(true)}
            />
          </div>
          <div className="hero-overlay"></div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="content-section">
        <div className="container">
          {/* Section Header */}
          <div className="section-header">
            <div className="title-container">
              <span className="section-subtitle">Professional Medical Aesthetics</span>
              <h1 className="section-title">Solutions for Your Skin Concerns</h1>
              <div className="title-decoration">
                <div className="decoration-line"></div>
                <div className="decoration-dot"></div>
                <div className="decoration-line"></div>
              </div>
            </div>
            <p className="section-description">
              Founded on a medical background, we prioritize diagnosis first, treatment second.
              We combine advanced technology with medical expertise to deliver safe, effective, and personalized skin management.
            </p>
          </div>

          {/* Concern Categories */}
          <div className="categories-wrapper">
            {concernCategories.map((category, index) => (
              <div key={category.id} className="category-card">
                {/* Category Header - Clickable */}
                <div
                  className="category-header"
                  onClick={() => toggleCategory(category.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleCategory(category.id)}
                >
                  <div className="category-icon">
                    <div className="icon-image-wrapper">
                      <Image
                        src={`/concerns/0${index + 1}.jpg`}
                        alt={category.category}
                        width={134}
                        height={134}
                        className="category-icon-img"
                      />
                    </div>
                  </div>
                  <div className="category-header-content">
                    <div className="category-eyebrow">{category.subtitle}</div>
                    <h2 className="category-title">{category.category}</h2>
                    <p className="category-description">{category.description}</p>
                    <div className="category-actions">
                      <button
                        className="btn-expand"
                        aria-expanded={expandedCategory === category.id}
                      >
                        {expandedCategory === category.id ? 'Show Less' : 'View Details'}
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
                      <a className="btn-book" href="/appointment">Make an Appointment</a>
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                <div
                  className={`category-details ${expandedCategory === category.id ? 'expanded' : ''}`}
                >
                  <div className="details-content">
                    <div className="concerns-table">
                      <div className="table-header">
                        <div className="th-concern">Concern</div>
                        <div className="th-solutions">Core Solutions</div>
                        <div className="th-outcome">Key Outcome</div>
                      </div>
                      {category.concerns.map((concern, cIndex) => (
                        <div key={cIndex} className="table-row">
                          <div className="td-concern">
                            <div className="concern-badge">{concern.concern}</div>
                          </div>
                          <div className="td-solutions">
                            {concern.solutions.map((solution, sIndex) => (
                              <span key={sIndex} className="solution-tag">
                                {solution}
                              </span>
                            ))}
                          </div>
                          <div className="td-outcome">
                            <p className="outcome-text">{concern.outcome}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bottom-cta">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Begin Your Skin Journey?</h2>
              <p className="cta-description">
                We recommend a Professional Consultation first. Our experienced Australian Registered Nurse
                and professional team will assess your condition to develop the safest and most effective
                Combination Therapy plan.
              </p>
              <div className="cta-note">
                <strong>A Note on Injectables:</strong> Due to industry regulations, we cannot list specific
                product names or pricing for our non-surgical cosmetic medical treatments without a comprehensive
                consultation, as every patient&apos;s needs are unique.
              </div>
              <a className="cta-button" href="/appointment">Book Your Consultation</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .concerns-page {
          min-height: 100vh;
          background: #FCFBF8;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          height: 65vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%);
        }

        .hero-image {
          object-fit: cover;
          object-position: center;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }

        .hero-image.loaded {
          opacity: 1;
        }

        .desktop-hero {
          display: block;
          position: absolute;
          inset: 0;
        }

        .mobile-hero {
          display: none;
          position: absolute;
          inset: 0;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2));
          z-index: 2;
        }

        /* Content Section */
        .content-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #FCFBF8 0%, #F9F7F3 100%);
          position: relative;
        }

        .content-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="%23e2e8f0" opacity="0.3"/><circle cx="30" cy="30" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="50" cy="20" r="0.4" fill="%23e2e8f0" opacity="0.25"/><circle cx="70" cy="60" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="90" cy="40" r="0.5" fill="%23e2e8f0" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 1;
        }

        /* Section Header */
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
          font-size: 2.75rem;
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

        /* Categories */
        .categories-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 4rem;
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

        .category-icon {
          flex-shrink: 0;
        }

        .icon-image-wrapper {
          width: 134px;
          height: 134px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(139, 125, 107, 0.2);
          position: relative;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .category-icon-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .category-icon:hover .category-icon-img {
          transform: scale(1.1);
        }

        .category-header-content {
          flex: 1;
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

        .category-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
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

        .btn-book {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          background: white;
          color: #3A3429;
          font-weight: 600;
          font-size: 0.95rem;
          border: 2px solid #e2e8f0;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-book:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          transform: translateY(-2px);
        }

        /* Expandable Details */
        .category-details {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .category-details.expanded {
          max-height: 2000px;
        }

        .details-content {
          padding: 0 2.5rem 2.5rem 2.5rem;
          border-top: 1px solid rgba(226, 232, 240, 0.6);
          margin-top: -0.5rem;
        }

        /* Concerns Table */
        .concerns-table {
          margin-top: 2rem;
        }

        .table-header {
          display: grid;
          grid-template-columns: 1fr 1.2fr 1.5fr;
          gap: 1.5rem;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #F5F1EB 0%, #E8E3DB 100%);
          border-radius: 8px 8px 0 0;
          font-weight: 700;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #5A4F3A;
        }

        .table-row {
          display: grid;
          grid-template-columns: 1fr 1.2fr 1.5fr;
          gap: 1.5rem;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(226, 232, 240, 0.6);
          transition: background-color 0.2s ease;
        }

        .table-row:hover {
          background: rgba(252, 251, 248, 0.5);
        }

        .table-row:last-child {
          border-bottom: none;
          border-radius: 0 0 8px 8px;
        }

        .concern-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #fff5f0 0%, #ffe8e0 100%);
          border-radius: 6px;
          font-weight: 600;
          color: #8B7D6B;
          font-size: 0.95rem;
          border: 1px solid rgba(139, 125, 107, 0.2);
        }

        .td-solutions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: flex-start;
        }

        .solution-tag {
          display: inline-block;
          padding: 0.4rem 0.9rem;
          background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%);
          color: white;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .outcome-text {
          color: #5A4F3A;
          line-height: 1.7;
          font-size: 0.95rem;
          margin: 0;
        }

        /* Bottom CTA */
        .bottom-cta {
          background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%);
          border-radius: 16px;
          padding: 3rem;
          text-align: center;
          box-shadow: 0 12px 40px rgba(139, 125, 107, 0.3);
        }

        .cta-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 1.75rem;
          font-weight: 400;
          color: white;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .cta-description {
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
        }

        .cta-note {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          padding: 1rem 1.5rem;
          margin-bottom: 2rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          line-height: 1.6;
        }

        .cta-note strong {
          color: white;
          font-weight: 600;
        }

        .cta-button {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: white;
          color: #8B7D6B;
          font-weight: 700;
          font-size: 0.95rem;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
          background: #f8f8f8;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .table-header {
            display: none;
          }

          .table-row {
            display: flex;
            flex-direction: column;
          }

          .td-concern::before {
            content: 'Concern: ';
            font-weight: 700;
            color: #8B7D6B;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .td-solutions::before {
            content: 'Solutions: ';
            display: block;
            font-weight: 700;
            color: #8B7D6B;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.5rem;
          }

          .td-outcome::before {
            content: 'Outcome: ';
            display: block;
            font-weight: 700;
            color: #8B7D6B;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.5rem;
          }
        }

        @media (max-width: 767px) {
          .hero-section {
            height: 50vh;
            min-height: 400px;
          }

          .desktop-hero {
            display: none;
          }

          .mobile-hero {
            display: block;
          }

          .content-section {
            padding: 3rem 0;
          }

          .section-header {
            margin-bottom: 3rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .section-description {
            font-size: 1rem;
          }

          .category-header {
            flex-direction: column;
            padding: 2rem 1.5rem;
            align-items: center;
            text-align: center;
          }

          .category-icon {
            margin-bottom: 1.5rem;
          }

          .icon-image-wrapper {
            width: 101px;
            height: 101px;
          }

          .category-title {
            font-size: 1.4rem;
          }

          .category-actions {
            flex-direction: column;
          }

          .btn-expand,
          .btn-book {
            width: 100%;
            justify-content: center;
          }

          .details-content {
            padding: 0 1.5rem 2rem 1.5rem;
          }

          .bottom-cta {
            padding: 2rem 1.5rem;
          }

          .cta-title {
            font-size: 1.5rem;
          }

          .cta-description {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ConcernsPage;
