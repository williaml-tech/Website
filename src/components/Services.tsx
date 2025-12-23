'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const OurServices = () => {
  const services = [
    {
      id: 1,
      title: 'Medical Injectable Treatments',
      description: 'Precise procedures to improve fine lines and sculpt natural contours',
      image: '/services/medical-injectable-treatments.jpg',
      features: ['Precise Procedures', 'Fine Line Improvement', 'Natural Contour Sculpting']
    },
    {
      id: 2,
      title: 'Energy Device Treatments',
      description: 'Advanced technology to enhance skin firmness and texture',
      image: '/services/energy-device-treatments.webp',
      features: ['Ultherapy Prime', 'Inmode Microneedling', 'Lumecca Peak', 'Indiba']
    },
    {
      id: 3,
      title: 'Medical Skincare & Maintenance Care',
      description: 'Professional repair and maintenance to stabilize skin health and sustain youthfulness',
      image: '/services/medical-skincare-and-maintenance-care.jpg',
      features: ['Professional Repair', 'Skin Stabilization', 'Health & Youth Maintenance']
    }
  ];

  const router = useRouter();

  return (
    <section className="our-services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="title-container">
            <span className="section-subtitle">Professional Aesthetic Services</span>
            <h2 className="section-title">Core Services</h2>
            <div className="title-decoration">
              <div className="decoration-line"></div>
              <div className="decoration-dot"></div>
              <div className="decoration-line"></div>
            </div>
          </div>
          <p className="section-description">
            Providing professional, safe, and effective aesthetic medical services<br />
            <span className="description-highlight">Making beauty an integral part of your life</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card group">
              <div className="service-image-container">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="service-image"
                />
                <div className="service-overlay">
                  <div className="service-features">
                    {service.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-action">
                  <button
                    className="service-btn"
                    type="button"
                    onClick={() => {
                      if (service.id === 1) router.push('/treatment/injectable');
                      else if (service.id === 2) router.push('/treatment/energy-device');
                      else if (service.id === 3) router.push('/treatment/skincare');
                    }}
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                    <svg className="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .our-services-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #F5F1EB 0%, #E8DDD4 100%);
          position: relative;
        }

        .our-services-section::before {
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

        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .container {
            padding: 0 2rem;
          }
          
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        @media (min-width: 1024px) {
          .container {
            padding: 0 3rem;
          }
          
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 3rem;
          }
        }

        .service-card {
          background:rgb(243, 238, 227);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .service-image-container {
          position: relative;
          height: 250px;
          overflow: hidden;
          background: #F5F1EB;
        }

        .service-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .group:hover .service-image {
          transform: scale(1.05);
        }

        .service-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(139, 125, 107, 0.85) 0%, rgba(196, 164, 132, 0.85) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .group:hover .service-overlay {
          opacity: 1;
        }

        .service-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }

        .feature-tag {
          background: rgba(255, 255, 255, 0.9);
          color: #3A3429;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .service-content {
          padding: 2.5rem;
        }

        .service-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #3A3429;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .service-description {
          color: #5A4F3A;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .service-action {
          display: flex;
          justify-content: flex-start;
        }

        .service-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #D4C4B0 0%, #C4A484 100%);
          color: #3A3429;
          border: none;
          border-radius: 25px;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(196, 164, 132, 0.3);
        }

        .service-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(196, 164, 132, 0.4);
          background: linear-gradient(135deg, #C4A484 0%, #B8956B 100%);
        }

        .btn-arrow {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .service-btn:hover .btn-arrow {
          transform: translateX(3px);
        }

        @media (max-width: 767px) {
          .our-services-section {
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
          
          .service-image-container {
            height: 220px;
          }
          
          .service-content {
            padding: 2rem;
          }
          
          .service-title {
            font-size: 1.25rem;
          }
          
          .service-description {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default OurServices;