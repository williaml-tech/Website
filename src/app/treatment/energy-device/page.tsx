'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CTA from '../../../components/CTA';
import ImageCarousel from '../../../components/ImageCarousel';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const EnergyDevicePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const heroImages = [
    {
      desktop: '/energy-device/hero_ed1.webp',
      mobile: '/energy-device/hero_m_ed1.webp',
      alt: 'Energy Device Treatments 1'
    },
    {
      desktop: '/energy-device/hero_ed2.webp',
      mobile: '/energy-device/hero_m_ed2.webp',
      alt: 'Energy Device Treatments 2'
    },
    {
      desktop: '/energy-device/hero_ed3.webp',
      mobile: '/energy-device/hero_m_ed3.webp',
      alt: 'Energy Device Treatments 3'
    },
    {
      desktop: '/energy-device/hero_ed4.webp',
      mobile: '/energy-device/hero_m_ed4.webp',
      alt: 'Energy Device Treatments 4'
    }
  ];

  const deviceImages = [
    '/energy-device/ed1.jpeg',
    '/energy-device/ed2.jpeg',
    '/energy-device/ed3.jpeg',
    '/energy-device/ed4.jpeg',
    '/energy-device/ed5.jpeg'
  ];

  const lumeccaPeakImages = [
    '/energy-device/il0.jpeg',
    '/energy-device/il1.jpeg',
    '/energy-device/il2.jpeg',
    '/energy-device/il3.jpg',
    '/energy-device/il4.jpeg'
  ];

  const indibaImages = [
    '/energy-device/i1.jpg',
    '/energy-device/i2.jpg',
    '/energy-device/i3.jpg',
    '/energy-device/i4.jpg',
    '/energy-device/i5.jpg',
    '/energy-device/i6.jpg',
    '/energy-device/i8.jpg'
  ];
  const ultherapyImages = [
    '/energy-device/u01.jpeg',
    '/energy-device/u02.jpeg',
    '/energy-device/u03.jpeg',
    '/energy-device/u04.jpeg'
  ];
  const devices = [
    {
      id: 1,
      name: 'Ultherapy® Prime',
      subtitle: 'Ultherapy® Treatment Introduction',
      image: '/services/ultherapy_device.jpg',
      imageSource: 'Image Source: Ultherapy',
      description:
        'Ultherapy® is a non-invasive anti-aging treatment that utilizes focused ultrasound energy to target deep layers of the skin. It precisely reaches the SMAS layer (the foundational layer), stimulating neocollagenesis and collagen remodeling to lift, tighten, and refine facial contours.',
      suitableFor: [
        'Individuals with mild to moderate skin laxity or sagging in the face and neck.',
        'Those wishing to improve jawline, cheek, and nasolabial fold definition.',
        'People seeking to address aging signs without surgery or downtime.'
      ],
      advantages: [
        'Non-surgical & non-invasive: no recovery period, resume daily activities immediately.',
        'Precise targeting: real-time visualization guides accurate, safe energy delivery.',
        'Natural results: gradual collagen stimulation for a subtle, lasting lift (typically 12–18 months).',
        'Comprehensive improvement: tightens skin, lifts contours, and softens fine lines.'
      ],
      treatmentExperience:
        'During treatment you may feel mild tingling, warmth, or brief discomfort as energy is delivered—these normal sensations subside quickly after the session.',
      effects: [
        'Immediate: Initial sense of tightening.',
        '2–3 Months: Visible improvements begin to appear as collagen remodels.',
        'Peak Results: Typically seen around 3–6 months.',
        'Duration: Results from a single treatment can last approximately 1–1.5 years.'
      ],
      summary:
        'Ultherapy Prime enhances comfort and personalization with integrated cooling, real-time feedback, and customizable depths (1.5mm, 3.0mm, 4.5mm) to target texture, tightening, and foundational SMAS lifting more efficiently in streamlined sessions while maintaining the proven safety of ultrasound imaging guidance.',
      website: 'https://www.ultherapy.com/'
    },
    {
      id: 2,
      name: 'Inmode Morpheus 8 Burst',
      subtitle: 'Advanced Fractional RF Technology',
      image: '/services/womens-health-dekstop.webp',
      imageSource: 'Image Source: InMode Australia (https://www.inmode.com.au/)',
      description: 'Morpheus8 Burst represents the latest evolution in fractional radiofrequency (FRF) technology. It utilizes specialized microneedles to deliver a powerful, single-pulse "Burst" of energy that can simultaneously target multiple layers of soft tissue.',
      additionalDescription: 'This innovative approach is designed to work at various depths, from the superficial dermis to deeper adipose tissue (between 2mm and 5mm). By precisely adjusting the needle depth, the treatment can be customized to address specific concerns across different areas: Improving Skin Texture & Laxity: By targeting the dermal layers, it helps promote skin tightening and refinement. Facial Contouring: The ability to reach deeper tissues supports the body\'s natural processes for facial remodeling. The treatment is highly versatile and can be safely applied across the face and neck, with finer settings (e.g., 2mm) used for delicate areas like the eyes, and deeper settings (up to 5mm) for more structural areas like the jawline and chin. Morpheus8 Burst is a comprehensive solution for those seeking to rejuvenate their appearance by addressing both skin quality and underlying structure.',
      suitableFor: [
        'Individuals with mild to moderate skin laxity or texture concerns on the face and neck.',
        'Those seeking refined facial contouring along cheeks, jawline, and chin.',
        'Clients wanting customizable treatment depths (2–5 mm), including delicate periorbital areas.',
        'People looking for non-surgical rejuvenation with minimal downtime.'
      ],
      advantages: [
        'Multi-layer "Burst" energy targets dermis to adipose tissue in a single pulse.',
        'Customizable microneedle depths (2–5 mm) to match area and indication.',
        'Fractional RF stimulates collagen for improved texture and firmness.',
        'Versatile application across face and neck, including delicate areas.',
        'Supports natural tissue remodeling for subtle, natural-looking results.'
      ],
      effects: [
        'Immediate: Subtle tightening due to thermal coagulation.',
        '4–6 Weeks: Visible improvements in texture and laxity as collagen remodels.',
        '3–6 Months: Peak refinement of contour and firmness.',
        'Duration: Results commonly maintained for ~12–18 months.'
      ],
      disclaimer: 'Please Note: Due to TGA and AHPRA regulations, specific therapeutic claims cannot be detailed online. We invite you to book a complementary consultation to discuss how Morpheus8 Burst can be tailored to your individual aesthetic goals and receive all necessary treatment information.',
      website: 'https://www.inmode.com.au/'
    },
    {
      id: 3,
      name: 'Inmode Lumecca Peak',
      image: '/services/ultherapy_device.webp',
      imageSource: 'Image Source: InMode Australia (https://www.inmode.com.au/)',
      description: 'Lumecca Peak represents the latest breakthrough in Intense Pulsed Light (IPL) technology from InMode. Building upon the foundation of the original Lumecca, it delivers significantly greater optical power and a shorter pulse duration, leading to a remarkable increase in treatment efficiency.',
      additionalDescription: 'This innovation means Lumecca Peak can achieve outstanding results in shorter session times, potentially reducing the total number of treatments required. It maintains the broad applicability of the Lumecca series and is clinically indicated for improving a variety of skin concerns, including benign pigmented lesions (such as hyperpigmentation and freckles), superficial vessels, skin texture, and photodamage. As a highly efficient and comprehensive skin rejuvenation device, Lumecca Peak is designed to help clients achieve improved skin appearance more rapidly.',
      suitableFor: [
        'Individuals with mild to moderate skin laxity or sagging in the face and neck.',
        'Those wishing to improve the definition of areas like the jawline, cheeks, and nasolabial folds.',
        'People seeking to combat signs of aging without surgery or downtime.'
      ],
      advantages: [
        'Non-surgical & Non-invasive: No recovery period needed; resume daily activities immediately.',
        'Precise Targeting: Real-time visualization ensures accurate energy delivery and enhances safety.',
        'Natural Results: Gradual collagen stimulation leads to a natural, lasting lift (typically 12-18 months).',
        'Comprehensive Improvement: Tightens skin, lifts contours, and reduces the appearance of fine lines.'
      ],
      effects: [
        'Immediate: Initial tightening effect.',
        '2-3 Months: Visible improvements begin to appear.',
        'Peak Results: Typically seen around 3-6 months.',
        'Duration: Results from a single treatment can last approximately 1-1.5 years.'
      ],
      website: 'https://www.inmode.com.au/'
    },
    {
      id: 4,
      name: 'Indiba Beauty and wellnes solution',
      subtitle: 'INDIBA: Technology-Powered Cellular Activation for Beauty & Wellness',
      image: '/services/Technology-3-1153x580.jpg',
      imageSource: 'Image Source: Indiba Asia (https://indibasia.com/ia-200-db)',
      description: 'INDIBA is a premium Spanish brand renowned for its patented CRET® (Capacitive Resistive Electric Transfer) technology. Unlike traditional lasers or radiofrequency, it uses a unique 448kHz frequency to deliver deep, controlled thermal energy for "Biological Activation" and "Cellular Repair," positioning itself as a "Cellular Activator."',
      coreTechnology: 'Capacitive Effect: Acts on water-rich tissues (muscles, blood) to promote circulation and metabolism.-Resistive Effect: Acts on higher-impedance tissues (fat, fascia) to soften them and improve texture.',
      mainBenefits: {
        facial: [
          'Lifts and tightens skin, reduces wrinkles, improves texture, and enhances hydration by boosting collagen and cellular function.'
        ],
        body: [
          'Tightens skin, reduces the appearance of cellulite, aids in localized slimming, and provides deep relaxation.'
        ]
      },
      typicalProjects: [
        'Safe & Comfortable: Non-invasive, painless, and requires no downtime.',
        'Long-Lasting Results: Achieves progressive, cumulative outcomes by activating the body\'s own cellular functions.',
        'High Compatibility: Suitable for all skin types and can be seamlessly combined with other treatments.'
      ],
      summary: 'INDIBA promotes a philosophy of "reviving your innate beauty" by empowering the body\'s natural repair and regeneration capabilities, offering a scientific and sustainable approach to beauty and wellness',
      website: 'https://indibasia.com/ia-200-db'
    }
  ];

  return (
    <div className="energy-device-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <Swiper
          effect={'fade'}
          grabCursor={true}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          fadeEffect={{
            crossFade: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[EffectFade, Pagination, Navigation, Autoplay]}
          className="hero-swiper"
        >
          {heroImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={isMobile ? image.mobile : image.desktop}
                  alt={image.alt}
                  width={isMobile ? 768 : 1920}
                  height={isMobile ? 1024 : 1080}
                  className="w-full h-full object-cover"
                  priority={index === 0}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Introduction Section */}
      <section className="introduction-section">
        <div className="container">
          <div className="introduction-content">
            
          </div>
        </div>
      </section>

      {/* Devices Section */}
      <section className="devices-section">
        <div className="container">
            <div className="section-header">
              <div className="title-container">
                <span className="section-subtitle">Advanced Technology</span>
                <h2 className="section-title">Energy Device Treatments</h2>
              <div className="title-decoration">
                <div className="decoration-line"></div>
                <div className="decoration-dot"></div>
                <div className="decoration-line"></div>
              </div>
            </div>
            <p className="section-description">
              Cutting-edge non-invasive solutions for enhanced skin firmness and texture
            </p>
          </div>

          <div className="devices-grid">
            {devices.map((device) => (
              <div key={device.id} className="device-card" id={device.id === 1 ? 'inmode-morpheus8' : device.id === 2 ? 'inmode-lumecca' : device.id === 3 ? 'ultherapy' : device.id === 4 ? 'indiba' : ''}>
                <div className="device-image-container">
                  <Image
                    src={device.image}
                    alt={device.name}
                    width={1200}
                    height={600}
                    className="device-image"
                  />
                  <div className="image-source">
                    <small>{device.imageSource}</small>
                  </div>
                </div>
                
                <div className="device-content">
                  <h3 className="device-title">{device.name}</h3>
                  {device.subtitle && <h4 className="device-subtitle">{device.subtitle}</h4>}
                  <p className="device-description">{device.description}</p>
                  {device.additionalDescription && <p className="device-description">{device.additionalDescription}</p>}
                  {device.summary && (
                    <div className="device-section">
                      <p className="device-summary">{device.summary}</p>
                      <div className="introduction-disclaimer" style={{ marginTop: '0.75rem' }}>
                        <p className="disclaimer-text">
                          <strong>Please Note:</strong> For detailed information on what this treatment can achieve for your specific concerns, we recommend a complimentary consultation. Our practitioners can then provide you with all the necessary information in a personal setting.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {device.suitableFor && (
                    <div className="device-section">
                      <h4 className="section-title-small">Ideal Candidates</h4>
                      <ul className="device-list">
                        {device.suitableFor.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {device.advantages && (
                    <div className="device-section">
                      <h4 className="section-title-small">Treatment Advantages</h4>
                      <ul className="device-list">
                        {device.advantages.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {device.coreTechnology && (
                    <div className="device-section">
                      <h4 className="section-title-small">Core Principle: CRET® technology generates a deep thermal effect with dual actions:</h4>
                      <p className="technology-description">{device.coreTechnology}</p>
                    </div>
                  )}

                  {device.mainBenefits && (
                    <div className="device-section">
                      <h4 className="section-title-small">Key Beauty & Wellness Efficacy</h4>
                      {device.mainBenefits.facial && (
                        <div className="benefit-category">
                          <h5 className="benefit-title">Facial Anti-Aging & Rejuvenation</h5>
                          <ul className="device-list">
                            {device.mainBenefits.facial.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {device.mainBenefits.body && (
                        <div className="benefit-category">
                          <h5 className="benefit-title">Body Contouring & Care</h5>
                          <ul className="device-list">
                            {device.mainBenefits.body.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}


                  {device.effects && (
                    <div className="device-section">
                      <h4 className="section-title-small">Treatment Results</h4>
                      <ul className="device-list">
                        {device.effects.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}


                  {device.typicalProjects && (
                    <div className="device-section">
                      <h4 className="section-title-small">Unique Advantages</h4>
                      <ul className="device-list">
                        {device.typicalProjects.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {device.summary && (
                    <div className="device-section">
                      <h4 className="section-title-small">Conclusion</h4>
                      <p className="device-summary">{device.summary}</p>
                    </div>
                  )}

                  {device.disclaimer && (
                    <div className="device-section disclaimer">
                      <p className="disclaimer-text">{device.disclaimer}</p>
                    </div>
                  )}

                  {/* Device Images Carousel */}
                  <ImageCarousel
                    images={device.id === 1 ? ultherapyImages : device.id === 3 ? lumeccaPeakImages : device.id === 4 ? indibaImages : deviceImages}
                    altText={`${device.name} Image`}
                    className="device-carousel"
                    height={{
                      mobile: 250,
                      desktop: 300
                    }}
                    autoplayDelay={3000}
                    showNavigation={true}
                    showPagination={true}
                    loop={true}
                    slidesPerView={{
                      mobile: 1,
                      tablet: 2,
                      desktop: 2
                    }}
                    spaceBetween={{
                      mobile: 15,
                      tablet: 20,
                      desktop: 20
                    }}
                    imageFit="contain"
                    aspectRatio="auto"
                  />

                  <div className="device-actions">
                    <a 
                      href={device.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="website-link"
                    >
                      Visit Website
                      <svg className="link-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                   <a 
  href="https://www.fresha.com/book-now/klinik-ka-aesthetic-clinic-fivxhb80/all-offer?share=true&pId=2723491" 
  target="_blank" 
  rel="noopener noreferrer"
  className="consultation-btn"
>
  Make an Appointment
  {/* SVG code... */}
</a>
                      Make an Appointment
                      <svg className="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <CTA
            label="Call to Action"
            title="Discover Your Possibilities. Schedule Your Complimentary Consultation Today"
            description="During this confidential session, we will discuss your goals and provide you with all the necessary information for a treatment plan that is tailored to your individual needs."
            buttonText="Make an Appointment"
            buttonLink="/appointment"
          />
        </div>
      </section>

      <Footer />


      <style jsx global>{`
        .hero-swiper {
          width: 100vw;
          height: 80vh;
          min-height: 600px;
        }

        .hero-swiper .swiper-slide {
          width: 100vw;
          height: 80vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-swiper .swiper-slide > div {
          width: 100%;
          height: 100%;
          position: relative;
        }

        /* Pagination styles */
        .hero-swiper .swiper-pagination {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          width: auto;
          z-index: 10;
        }

        .hero-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
          margin: 0 6px;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          background: rgba(255, 255, 255, 0.9);
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }

        /* Navigation button styles */
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: rgba(107, 114, 128, 0.95) !important; /* gray-500 */
          background: rgba(255, 255, 255, 0.1) !important;
          width: 38px !important;
          height: 38px !important;
          border-radius: 50% !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
          z-index: 999 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          transform: translateY(-2px) scale(1.05) !important;
          background: rgba(255, 255, 255, 0.25) !important;
          color: rgba(75, 85, 99, 1) !important; /* gray-600 */
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2) !important;
        }

        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after {
          font-size: 13px !important;
          font-weight: 600 !important;
          color: inherit !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .hero-swiper { height: 70vh; min-height: 500px; }

          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            width: 33px !important;
            height: 33px !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          .hero-swiper .swiper-button-next:after,
          .hero-swiper .swiper-button-prev:after {
            font-size: 11px !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          .hero-swiper .swiper-pagination { bottom: 30px; }

          .hero-swiper .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            margin: 0 4px;
          }
        }

        @media (max-width: 480px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            width: 30px !important;
            height: 30px !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          .hero-swiper .swiper-button-next:after,
          .hero-swiper .swiper-button-prev:after {
            font-size: 9px !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          .hero-swiper .swiper-pagination { bottom: 20px; }

          .hero-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            margin: 0 3px;
          }
        }
      `}</style>

      <style jsx>{`
        .energy-device-page {
          min-height: 100vh;
        }

        .hero-section {
          position: relative;
          width: 100vw;
          height: 80vh;
          min-height: 600px;
          margin-left: calc(-50vw + 50%);
          overflow: hidden;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .hero-text {
          text-align: center;
          color: white;
          max-width: 800px;
          margin: 0 auto;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .hero-subtitle {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #D4C4B0;
          margin-bottom: 1rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 300;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
          line-height: 1.1;
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.6;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .introduction-section {
          padding: 2.5rem 0; /* reduced spacing after hero */
          background: white;
          position: relative;
        }

        .introduction-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        /* Override hero text colors when used below the hero on white background */
        .introduction-section .hero-text { color: #3A3429; }
        .introduction-section .hero-subtitle { color: #8B7D6B; }
        .introduction-section .hero-title { color: #3A3429; font-size: 3rem; }
        .introduction-section .hero-description { color: #5A4F3A; }

        .introduction-title {
          font-size: 2.5rem;
          font-weight: 300;
          color: #3A3429;
          margin-bottom: 2rem;
          letter-spacing: -0.025em;
          line-height: 1.2;
        }

        .introduction-disclaimer {
          background: #F5F1EB;
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid #8B7D6B;
        }

        .disclaimer-text {
          font-size: 0.9rem;
          color: #5A4F3A;
          font-style: italic;
          margin: 0;
          line-height: 1.6;
        }

        .cta-section {
          padding: 5rem 0;
          background: white;
        }

        .devices-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="%23e2e8f0" opacity="0.3"/><circle cx="30" cy="30" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="50" cy="20" r="0.4" fill="%23e2e8f0" opacity="0.25"/><circle cx="70" cy="60" r="0.3" fill="%23cbd5e1" opacity="0.2"/><circle cx="90" cy="40" r="0.5" fill="%23e2e8f0" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
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
          font-size: 2.5rem;
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

        .devices-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          position: relative;
          z-index: 1;
        }

        .device-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s ease;
        }

        .device-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }

        .device-image-container {
          position: relative;
          aspect-ratio: 2.58 / 1;
          overflow: hidden;
          background: #F5F1EB;
        }

        .device-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .device-card:hover .device-image {
          transform: scale(1.05);
        }

        .image-source {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 1rem;
          color: white;
        }

        .image-source small {
          font-size: 0.75rem;
          opacity: 0.8;
        }

        .device-content {
          padding: 3rem;
        }

        .device-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #3A3429;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .device-subtitle {
          font-size: 1.125rem;
          font-weight: 500;
          color: #8B7D6B;
          margin-bottom: 1.5rem;
          line-height: 1.4;
          font-style: italic;
        }

        .device-description {
          color: #5A4F3A;
          line-height: 1.7;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .device-section {
          margin-bottom: 2rem;
        }

        .section-title-small {
          font-size: 1.25rem;
          font-weight: 600;
          color: #3A3429;
          margin-bottom: 1rem;
          border-bottom: 2px solid #D4C4B0;
          padding-bottom: 0.5rem;
        }

        .device-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .device-list li {
          color: #5A4F3A;
          line-height: 1.6;
          margin-bottom: 0.75rem;
          padding-left: 1.5rem;
          position: relative;
        }

        .device-list li::before {
          content: '•';
          color: #8B7D6B;
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .technology-description,
        .treatment-experience,
        .device-summary {
          color: #5A4F3A;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .benefit-category {
          margin-bottom: 1.5rem;
        }

        .benefit-title {
          font-size: 1rem;
          font-weight: 600;
          color: #8B7D6B;
          margin-bottom: 0.75rem;
        }

        .disclaimer {
          background: #F5F1EB;
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid #8B7D6B;
        }

        .disclaimer-text {
          color: #5A4F3A;
          font-style: italic;
          margin: 0;
          font-size: 0.9rem;
        }

        .device-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .website-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: transparent;
          color: #8B7D6B;
          border: 2px solid #D4C4B0;
          border-radius: 25px;
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .website-link:hover {
          background: #D4C4B0;
          color: #3A3429;
          transform: translateY(-2px);
        }

        .consultation-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #8B7D6B 0%, #C4A484 100%);
          color: white;
          border: none;
          border-radius: 25px;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(139, 125, 107, 0.3);
          text-decoration: none;
        }

        .consultation-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(139, 125, 107, 0.4);
          background: linear-gradient(135deg, #C4A484 0%, #B8956B 100%);
        }

        .link-arrow,
        .btn-arrow {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .website-link:hover .link-arrow,
        .consultation-btn:hover .btn-arrow {
          transform: translateX(3px);
        }

        @media (min-width: 768px) {
          .container {
            padding: 0 2rem;
          }
          
          .hero-title {
            font-size: 4rem;
          }
          
          .devices-grid {
            gap: 4rem;
          }
        }

        @media (min-width: 1024px) {
          .container {
            padding: 0 3rem;
          }
          
          .devices-grid {
            gap: 5rem;
          }
        }

        @media (max-width: 767px) {
          .hero-section {
            width: 100vw;
            height: 70vh;
            min-height: 500px;
            margin-left: calc(-50vw + 50%);
          }

          .hero-swiper {
            width: 100vw;
            height: 70vh;
            min-height: 500px;
          }

          .hero-swiper .swiper-slide {
            width: 100vw;
            height: 70vh;
            min-height: 500px;
          }

          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            width: 33px !important;
            height: 33px !important;
            color: rgba(107, 114, 128, 0.95) !important;
            background: rgba(255, 255, 255, 0.1) !important;
          }

          .hero-swiper .swiper-button-next:after,
          .hero-swiper .swiper-button-prev:after {
            font-size: 11px !important;
            color: inherit !important;
          }

          .hero-swiper .swiper-pagination {
            bottom: 30px;
          }

          .hero-swiper .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            margin: 0 4px;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            width: 30px !important;
            height: 30px !important;
            color: rgba(107, 114, 128, 0.95) !important;
            background: rgba(255, 255, 255, 0.1) !important;
          }

          .hero-swiper .swiper-button-next:after,
          .hero-swiper .swiper-button-prev:after {
            font-size: 9px !important;
            color: inherit !important;
          }

          .hero-swiper .swiper-pagination {
            bottom: 20px;
          }

          .hero-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            margin: 0 3px;
          }
          
          .hero-description {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .introduction-section {
            padding: 1.5rem 0; /* reduced spacing on mobile */
          }

          .introduction-title {
            font-size: 2rem;
          }

          .cta-section {
            padding: 3rem 0;
          }
          
          .devices-section {
            padding: 5rem 0 3rem 0;
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
          
          .device-image-container {
            aspect-ratio: 2.5 / 1;
          }
          
          .device-content {
            padding: 2rem;
          }
          
          .device-title {
            font-size: 1.5rem;
          }
          
          .device-subtitle {
            font-size: 1rem;
          }
          
          .device-description {
            font-size: 0.95rem;
          }
          
          .device-actions {
            flex-direction: column;
          }
          
          .website-link,
          .consultation-btn {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default EnergyDevicePage;
