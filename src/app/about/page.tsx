'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AboutIcon from '../../components/AboutIcon';

const AboutPage = () => {
  const [desktopImageLoaded, setDesktopImageLoaded] = useState(false);
  const [mobileImageLoaded, setMobileImageLoaded] = useState(false);

  const aboutSections = [
    {
      id: 1,
      title: 'About Us',
      content: 'Our clinic was founded by an Australian registered nurse with years of clinical experience, working alongside an experienced professional aesthetic team. With medical expertise at our core, combined with cutting-edge aesthetic concepts, we provide scientific, safe, and personalized skin management solutions for our clients.',
      icon: '/about/img01.jpg',
      iconAlt: 'Professional medical aesthetics - precision and care'
    },
    {
      id: 2,
      title: 'Our Philosophy',
      content: 'We adhere to the principle of "Medicine First, Safety Above All". Every treatment is based on comprehensive professional assessment and medical validation, ensuring natural and controllable results while achieving optimal improvement under safety assurance.',
      icon: '/about/img02.jpg',
      iconAlt: 'Pure and refined approach to beauty'
    },
    {
      id: 3,
      title: 'Our Commitment',
      content: 'Here, you will not only receive high-standard aeshetic treatments but also enjoy a reassuring experiencebacked by prefessional team. We are committedto becoming your long-term trusted skin health management partner.',
      icon: '/about/img03.jpg',
      iconAlt: 'Gentle touch and personalized care'
    }
  ];

  return (
    <div className="about-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          {/* Desktop Hero */}
          <div className="desktop-hero">
            <Image
              src="/about/hero_about.webp"
              alt="About Us"
              fill
              className={`hero-image ${desktopImageLoaded ? 'loaded' : ''}`}
              sizes="100vw"
              priority
              onLoad={() => setDesktopImageLoaded(true)}
            />
          </div>
          {/* Mobile Hero */}
          <div className="mobile-hero">
            <Image
              src="/about/hero_m_about.webp"
              alt="About Us"
              fill
              className={`hero-image ${mobileImageLoaded ? 'loaded' : ''}`}
              sizes="100vw"
              priority
              onLoad={() => setMobileImageLoaded(true)}
            />
          </div>
          <div className="hero-overlay"></div>
        </div>
      </section>
      
      <section className="about-us-section">
        <div className="container">
       


          {/* Section Header */}
          <div className="section-header">
            <div className="title-container">
              <span className="section-subtitle">Professional Medical Aesthetics</span>
              <h1 className="section-title">About Us</h1>
              <div className="title-decoration">
                <div className="decoration-line"></div>
                <div className="decoration-dot"></div>
                <div className="decoration-line"></div>
              </div>
            </div>
            <p className="section-description">
              Discover our story, philosophy, and commitment to excellence<br />
              <span className="description-highlight">Your trusted partner in aesthetic wellness</span>
            </p>
          </div>

          {/* About Content */}
          <div className="about-content">
            {aboutSections.map((section) => (
              <div key={section.id} className="about-card">
                <div className="about-icon">
                  <AboutIcon 
                    src={section.icon} 
                    alt={section.iconAlt}
                    className="section-icon"
                  />
                </div>
                <div className="about-text">
                  <h2 className="about-title">{section.title}</h2>
                  <p className="about-description">{section.content}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        <style jsx global>{`
          .about-page {
            min-height: 100vh;
          }

          .hero-section {
            position: relative;
            height: 80vh;
            min-height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .hero-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%);
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .hero-image {
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
            transform: scale(1);
            transition: opacity 0.5s ease-in-out, transform 0.3s ease-in-out;
          }

          .hero-image.loaded {
            opacity: 1;
            transform: scale(1);
          }

          .desktop-hero {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .mobile-hero {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: transparent;
            z-index: 2;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
          }

          .about-us-section {
            padding: 7rem 0 5rem 0;
            background: linear-gradient(135deg, #FCFBF8 0%, #F9F7F3 100%);
            position: relative;
          }

          .about-us-section::before {
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

          .about-image-section {
            margin-top: 3rem;
            margin-bottom: 4rem;
            display: flex;
            justify-content: center;
          }

          .image-container {
            position: relative;
            max-width: 600px;
            width: 100%;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }

          .image-container:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          }

          .about-main-image {
            width: 100%;
            height: auto;
            object-fit: cover;
            display: block;
          }

          .image-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
            padding: 2rem;
            color: white;
          }

          .overlay-content {
            text-align: center;
          }

          .overlay-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: white;
          }

          .overlay-description {
            font-size: 1rem;
            opacity: 0.9;
            line-height: 1.5;
          }

          .about-content {
            margin-bottom: 4rem;
          }

          .about-card {
            display: flex;
            align-items: flex-start;
            gap: 2rem;
            background: white;
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
            margin-bottom: 2rem;
            border: 1px solid rgba(226, 232, 240, 0.8);
            transition: all 0.3s ease;
          }

          .about-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          }

          .about-icon {
            flex-shrink: 0;
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg,rgb(255, 255, 255) 0%, #F5F1EB 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid rgba(139, 125, 107, 0.2);
            overflow: hidden;
            position: relative;
          }

          .about-icon-image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
            position: relative;
          }

          .icon-img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover;
            border-radius: 50%;
            transition: transform 0.3s ease;
          }

          .about-icon:hover .icon-img {
            transform: scale(1.1);
          }

          .about-text {
            flex: 1;
          }

          .about-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #3A3429;
            margin-bottom: 1rem;
            line-height: 1.3;
          }

          .about-description {
            color: #5A4F3A;
            line-height: 1.7;
            font-size: 1rem;
          }

          @media (min-width: 768px) {
            .container {
              padding: 0 2rem;
            }
          }

          @media (min-width: 1024px) {
            .container {
              padding: 0 3rem;
            }
          }

          @media (max-width: 767px) {
            .hero-section {
              height: 70vh;
              min-height: 500px;
            }

            .desktop-hero {
              display: none;
            }

            .mobile-hero {
              display: block;
            }

            .about-us-section {
              padding: 7rem 0 3rem 0;
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
            
            .about-image-section {
              margin-bottom: 3rem;
              padding: 0 1rem;
            }
            
            .image-container {
              max-width: 100%;
              border-radius: 12px;
            }
            
            .image-overlay {
              padding: 1.5rem;
            }
            
            .overlay-title {
              font-size: 1.25rem;
            }
            
            .overlay-description {
              font-size: 0.9rem;
            }
            
            .about-card {
              flex-direction: column;
              text-align: center;
              padding: 2rem;
            }
            
            .about-icon {
              align-self: center;
              width: 100px;
              height: 100px;
            }
            
            .about-title {
              font-size: 1.25rem;
            }
            
            .about-description {
              font-size: 0.95rem;
            }
          }
        `}</style>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
