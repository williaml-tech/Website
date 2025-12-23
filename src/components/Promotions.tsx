'use client';

import React from 'react';
import Image from 'next/image';

const Promotions = () => {
  const promotions = [
    {
      id: 1,
      image: '/promotion/Promotional Activity 1.jpeg',
      alt: 'Current Promotion 1'
    },
    {
      id: 2,
      image: '/promotion/Promotional Activity 2.jpeg',
      alt: 'Current Promotion 2'
    }
  ];

  return (
    <section className="promotions-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="title-container">
            <span className="section-subtitle">Limited Time Offers</span>
            <h2 className="section-title">Current Promotions</h2>
            <div className="title-decoration">
              <div className="decoration-line"></div>
              <div className="decoration-dot"></div>
              <div className="decoration-line"></div>
            </div>
          </div>
          <p className="section-description">
            Discover our exclusive promotions and special offers<br />
            <span className="description-highlight">Experience premium treatments at exceptional value</span>
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="promotions-grid">
          {promotions.map((promo) => (
            <div key={promo.id} className="promo-card">
              <div className="promo-image-container">
                <Image
                  src={promo.image}
                  alt={promo.alt}
                  width={600}
                  height={800}
                  className="promo-image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .promotions-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #F5F1EB 0%, #E8DDD4 100%);
          position: relative;
        }

        .promotions-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="%23e2e8f0" opacity="0.3"/><circle cx="30" cy="30" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="50" cy="20" r="0.4" fill="%23e2e8f0" opacity="0.25"/><circle cx="70" cy="60" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="90" cy="40" r="0.5" fill="%23e2e8f0" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .title-container {
          margin-bottom: 2rem;
        }

        .section-subtitle {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 500;
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
          font-size: 3rem;
          font-weight: 300;
          color: #3A3429;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
          line-height: 1.1;
        }

        .title-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
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
          font-size: 1.125rem;
          line-height: 1.8;
          color: #5A4F3A;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 400;
        }

        .description-highlight {
          font-weight: 500;
          background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .promotions-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .container {
            padding: 0 2rem;
          }

          .promotions-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        @media (min-width: 1024px) {
          .container {
            padding: 0 3rem;
          }

          .promotions-grid {
            gap: 3rem;
          }
        }

        .promo-card {
          background: rgb(243, 238, 227);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .promo-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .promo-image-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #F5F1EB;
        }

        .promo-image {
          width: 100%;
          height: auto;
          object-fit: contain;
          transition: transform 0.4s ease;
          display: block;
        }

        .promo-card:hover .promo-image {
          transform: scale(1.02);
        }

        @media (max-width: 767px) {
          .promotions-section {
            padding: 3rem 0;
          }

          .section-header {
            margin-bottom: 3rem;
          }

          .section-title {
            font-size: 2.25rem;
          }

          .section-description {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .decoration-line {
            width: 40px;
          }
        }
      `}</style>
    </section>
  );
};

export default Promotions;
