'use client';

import React from 'react';

interface CTAProps {
  label?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  className?: string;
}

const CTA: React.FC<CTAProps> = ({
  label = "Call to Action",
  title,
  description,
  buttonText,
  buttonLink,
  className = ""
}) => {
  return (
    <div className={`bottom-cta ${className}`}>
      <div className="cta-content">
        <span className="cta-label">{label}</span>
        <h2 className="cta-title">{title}</h2>
        <p className="cta-description">{description}</p>
        <a className="cta-button" href={buttonLink}>{buttonText}</a>
      </div>

      <style jsx>{`
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

        .cta-label {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1rem;
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
          margin-bottom: 2rem;
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
        @media (max-width: 767px) {
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

export default CTA;
